import { Prisma } from "@prisma/client";
import { MercuriusContext } from "mercurius";
import {
  Category,
  City,
  CreateGroupInput,
  CreateGroupReponse,
  EventGroup,
  GroupDetails,
  GroupedEvents,
  GroupTile,
  Mutation,
  MutationCreateGroupArgs,
  MutationJoinGroupArgs,
  MutationLeaveGroupArgs,
  Query,
  QueryGetGroupTilesArgs,
  QueryGetGroupTitlesArgs,
  Title,
} from "../model/model";
import { env } from "../utils/env";

// Typy dla sortowania.
type NumberOfMembers = "ascending" | "descending";
type DateOfAdding = "newest" | "oldest";

// Interfejs reprezentujący surowy wynik zapytania SQL dla grupy.
interface RawGroupRow {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  sponsoredUntil: Date | null;
  smallPhoto: string;
  mediumPhoto: string;
  largePhoto: string;
  usersCount: number;
  eventsCount: number;
  categories: Category[];
  cities: City[];
}

/* =======================
   FUNKCJE POMOCNICZE
======================= */

/**
 * Buduje warunek SQL dla wyszukiwania tytułów.
 */
const buildTitleCondition = (titles: string[]): Prisma.Sql => {
  if (!titles || titles.length === 0) return Prisma.empty;
  // Redukujemy tablicę warunków, łącząc je operatorem OR.
  const condition = titles
    .map((t) => Prisma.sql`g."title" ILIKE ${`%${t}%`}`)
    .reduce((prev, curr) => Prisma.sql`${prev} OR ${curr}`);
  return Prisma.sql`(${condition})`;
};

/**
 * Buduje warunek SQL dla filtrowania po kategoriach.
 */
const buildCategoryCondition = (categories: string[]): Prisma.Sql =>
  categories && categories.length > 0
    ? Prisma.sql`EXISTS (
        SELECT 1 FROM "CategoryGroup" cg_f
        JOIN "Category" c_f ON c_f."id" = cg_f."categoryId"
        WHERE cg_f."groupId" = g."id" 
          AND c_f."value" = ANY(${categories}::text[])
      )`
    : Prisma.empty;

/**
 * Buduje warunek SQL dla filtrowania po miastach.
 */
const buildCitiesCondition = (cities: string[]): Prisma.Sql =>
  cities && cities.length > 0
    ? Prisma.sql`EXISTS (
        SELECT 1 FROM "CityGroup" cg_f
        JOIN "City" ci_f ON ci_f."id" = cg_f."cityId"
        WHERE cg_f."groupId" = g."id" 
          AND ci_f."value" = ANY(${cities}::text[])
      )`
    : Prisma.empty;

/**
 * Łączy niepuste warunki SQL przy pomocy operatora AND.
 */
const combineConditions = (conditions: Prisma.Sql[]): Prisma.Sql => {
  const validConditions = conditions.filter((cond) => cond !== Prisma.empty);
  if (validConditions.length === 0) return Prisma.empty;
  const combined = validConditions.reduce((prev, curr) => Prisma.sql`${prev} AND ${curr}`);
  return Prisma.sql`WHERE ${combined}`;
};

/* =======================
   REZOLWERY GRAPHQL
======================= */

export default {
  Query: {
    // Wyszukuje grupy, których tytuł zawiera podany ciąg znaków.
    getGroupTitles: async (
      _: unknown,
      { title }: QueryGetGroupTitlesArgs,
      { prisma }: MercuriusContext
    ): Promise<Query["getGroupTitles"]> => {
      const groups = await prisma.group.findMany({
        where: {
          title: { contains: title },
        },
        select: { id: true, title: true },
      });

      return groups.map(({ id, title }) => ({
        id,
        label: title,
        value: title,
      }));
    },

    // Pobiera kafelki grup z wieloma opcjami filtrowania i sortowania.
    getGroupTiles: async (
      _: unknown,
      {
        categories,
        titles,
        cities,
        sponsored,
        verified,
        remote,
        minMembers,
        maxMembers,
        numberOfMembers,
        dateOfAdding,
      }: QueryGetGroupTilesArgs,
      { prisma }: MercuriusContext
    ): Promise<Query["getGroupTiles"]> => {
      const skip = 0,
        take = 50;

      // Budowanie warunków filtrowania.
      const titleCondition = buildTitleCondition(titles);
      const categoryCondition = buildCategoryCondition(categories);
      const citiesCondition = buildCitiesCondition(cities);
      const sponsoredCondition = sponsored ? Prisma.sql`g."sponsoredUntil" >= NOW()` : Prisma.empty;
      const verifiedCondition = verified ? Prisma.sql`g."isVerified" = true` : Prisma.empty;
      const remoteCondition = remote
        ? Prisma.sql`NOT EXISTS (
            SELECT 1 FROM "CityGroup" cg_r
            WHERE cg_r."groupId" = g."id"
          )`
        : Prisma.empty;

      const whereClause = combineConditions([
        titleCondition,
        categoryCondition,
        citiesCondition,
        sponsoredCondition,
        verifiedCondition,
        remoteCondition,
      ]);

      // Ustalenie kolejności sortowania.
      const membersOrder = numberOfMembers === "ascending" ? Prisma.sql`ASC` : Prisma.sql`DESC`;
      const dateOrder = dateOfAdding === "newest" ? Prisma.sql`DESC` : Prisma.sql`ASC`;

      // Finalne zapytanie SQL.
      const query = Prisma.sql`
        SELECT
          g."id",
          g."title",
          g."description",
          g."createdAt",
          g."updatedAt",
          g."isVerified",
          g."sponsoredUntil",
          g."smallPhoto",
          g."mediumPhoto",
          g."largePhoto",
          COUNT(DISTINCT gu."id")::int AS "usersCount",
          COUNT(DISTINCT ev."id")::int AS "eventsCount",
          COALESCE(
            JSON_AGG(
              DISTINCT JSONB_BUILD_OBJECT(
                'id', c."id",
                'value', c."value",
                'label', c."label"
              )
            ) FILTER (WHERE c."id" IS NOT NULL),
            '[]'
          ) AS "categories",
          COALESCE(
            JSON_AGG(
              DISTINCT JSONB_BUILD_OBJECT(
                'id', ci."id",
                'value', ci."value",
                'label', ci."label"
              )
            ) FILTER (WHERE ci."id" IS NOT NULL),
            '[]'
          ) AS "cities"
        FROM "Group" g
        LEFT JOIN "GroupUser" gu ON gu."groupId" = g."id"
        LEFT JOIN "Event" ev ON ev."groupId" = g."id"
        LEFT JOIN "CategoryGroup" cg ON cg."groupId" = g."id"
        LEFT JOIN "Category" c ON c."id" = cg."categoryId"
        LEFT JOIN "CityGroup" cg2 ON cg2."groupId" = g."id"
        LEFT JOIN "City" ci ON ci."id" = cg2."cityId"
        ${whereClause}
        GROUP BY g."id"
        HAVING COUNT(DISTINCT gu."id") >= ${minMembers} AND COUNT(DISTINCT gu."id") <= ${maxMembers}
        ORDER BY COUNT(DISTINCT gu."id") ${membersOrder}, g."createdAt" ${dateOrder}
        OFFSET ${skip} LIMIT ${take}
      `;

      const rawGroups = await prisma.$queryRaw<RawGroupRow[]>(query);
      const now = new Date();

      return rawGroups.map((group) => ({
        id: group.id,
        title: group.title,
        description: group.description,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
        isVerified: group.isVerified,
        sponsoredUntil: group.sponsoredUntil,
        cities: group.cities,
        categories: group.categories,
        eventsCount: group.eventsCount,
        membersCount: group.usersCount,
        isSponsored: !!(group.sponsoredUntil && group.sponsoredUntil >= now),
        largePhoto: `${env.PHOTOS_BUCKET_URL}/${group.largePhoto}`,
        mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${group.mediumPhoto}`,
        smallPhoto: `${env.PHOTOS_BUCKET_URL}/${group.smallPhoto}`,
      }));
    },

    // Pobiera szczegóły grupy wraz z jej zdarzeniami, komentarzami i informacjami o użytkownikach.
    getGroupDetails: async (
      _: unknown,
      { groupId }: { groupId: string },
      { prisma }: MercuriusContext
    ): Promise<GroupDetails | null> => {
      // Typ dla zdarzenia z dołączonymi danymi.
      type EventWithInclude = Prisma.EventGetPayload<{ include: typeof eventValidator }>;

      const eventValidator = Prisma.validator<Prisma.EventInclude>()({
        categories: { include: { category: true } },
        users: { include: { user: true } },
        cities: { include: { city: true } },
      });

      const groupDetailsValidator = Prisma.validator<Prisma.GroupInclude>()({
        categories: { include: { category: true } },
        cities: { include: { city: true } },
        users: { include: { user: true } },
        comments: { include: { user: true } },
        events: { include: eventValidator },
      });

      const group = await prisma.group.findFirst({
        where: { id: groupId },
        include: groupDetailsValidator,
      });

      if (!group) return null;

      const now = new Date();
      const isSponsored = !!(group.sponsoredUntil && group.sponsoredUntil >= now);

      // Funkcja grupująca zdarzenia według statusu.
      const getGroupedEvents = (
        events: EventWithInclude[]
      ): {
        upcoming: EventWithInclude[];
        pending: EventWithInclude[];
        past: EventWithInclude[];
        cancelled: EventWithInclude[];
      } => {
        const grouped = {
          upcoming: [] as EventWithInclude[],
          pending: [] as EventWithInclude[],
          past: [] as EventWithInclude[],
          cancelled: [] as EventWithInclude[],
        };

        events.forEach((event) => {
          if (event.canceled) {
            grouped.cancelled.push(event);
            return;
          }
          const startAt = new Date(event.startAt);
          const endAt = new Date(event.endAt);

          if (now < startAt) {
            grouped.upcoming.push(event);
          } else if (startAt <= now && now <= endAt) {
            grouped.pending.push(event);
          } else if (now >= endAt) {
            grouped.past.push(event);
          }
        });
        return grouped;
      };

      // Grupowanie zdarzeń według miesiąca i roku.
      const groupEventsByMonth = (events: EventWithInclude[]): GroupedEvents[] => {
        const sorted = events.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        const eventMap = new Map<string, EventWithInclude[]>();

        sorted.forEach((event) => {
          const date = new Date(event.createdAt);
          const key = `${date.getFullYear()}-${date.getMonth()}`;
          if (!eventMap.has(key)) eventMap.set(key, []);
          eventMap.get(key)?.push(event);
        });

        return Array.from(eventMap.entries()).map(([key, events]) => {
          const [year, month] = key.split("-").map(Number);
          return {
            __typename: "GroupedEvents",
            monthReference: new Date(year, month, 1).toISOString(),
            events: events.map(
              (event): EventGroup => ({
                __typename: "EventGroup",
                id: event.id,
                canceled: event.canceled,
                createdAt: event.createdAt,
                description: event.description,
                endAt: event.endAt,
                startAt: event.startAt,
                title: event.title,
                sponsored: false, // todo: not implemented
                verified: false, // todo: not implemented
                remote: event.cities.length <= 0,
                categories: event.categories.map(({ category }) => category),
                cities: event.cities.map(({ city }) => city),
                users: event.users.map(({ id, user, isHost, isModerator }) => ({
                  id,
                  isHost,
                  isModerator,
                  user,
                })),
              })
            ),
          };
        });
      };

      const { upcoming, pending, past, cancelled } = getGroupedEvents(group.events);
      const upcomingGrouped = groupEventsByMonth(upcoming);
      const pendingGrouped = groupEventsByMonth(pending);
      const pastGrouped = groupEventsByMonth(past);
      const cancelledGrouped = groupEventsByMonth(cancelled);

      // Mapowanie zdarzeń do formatu EventGroup.
      const mapEventToGroup = (event: EventWithInclude): EventGroup => ({
        __typename: "EventGroup",
        id: event.id,
        canceled: event.canceled,
        createdAt: event.createdAt,
        description: event.description,
        endAt: event.endAt,
        startAt: event.startAt,
        title: event.title,
        sponsored: false,
        verified: false,
        remote: event.cities.length <= 0,
        categories: event.categories.map(({ category }) => category),
        cities: event.cities.map(({ city }) => city),
        users: event.users.map(({ id, user, isHost, isModerator }) => ({
          id,
          isHost,
          isModerator,
          user,
        })),
      });

      const eventsMapped: EventGroup[] = group.events.map(mapEventToGroup);

      // Obliczanie sumarycznej liczby zdarzeń.
      const numOfEvents = (groups: GroupedEvents[]): number => groups.reduce((sum, g) => sum + g.events.length, 0);
      const roundToQuarter = (value: number): number => Math.round(value * 4) / 4;

      const cancelledLength = numOfEvents(cancelledGrouped);
      const pastLength = numOfEvents(pastGrouped);
      const upcomingLength = numOfEvents(upcomingGrouped);
      const pendingLength = numOfEvents(pendingGrouped);
      const eventsLength = cancelledLength + pastLength + upcomingLength + pendingLength;
      // Rzutowanie comments na tablicę z rate (przyjmujemy, że każdy komentarz posiada pole rate).
      const comments = group.comments as Array<{ rate: number }>;
      const averageRate =
        comments.length > 0
          ? roundToQuarter(comments.reduce((sum, comment) => sum + comment.rate, 0) / comments.length)
          : 0;

      return {
        id: group.id,
        title: group.title,
        description: group.description,
        createdAt: group.createdAt,
        sponsored: isSponsored,
        verified: group.isVerified,
        remote: group.cities.length <= 0,
        cities: group.cities.map(({ city }) => city),
        categories: group.categories.map(({ category }) => category),
        members: group.users.map(({ id, isHost, isModerator, user }) => ({
          id,
          isHost,
          isModerator,
          user,
        })),
        comments: group.comments,
        upcoming: upcomingGrouped,
        pending: pendingGrouped,
        past: pastGrouped,
        cancelled: cancelledGrouped,
        events: eventsMapped,
        upcomingLength,
        pendingLength,
        pastLength,
        cancelledLength,
        eventsLength,
        rate: averageRate,
        largePhoto: `${env.PHOTOS_BUCKET_URL}/${group.largePhoto}`,
        mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${group.mediumPhoto}`,
        smallPhoto: `${env.PHOTOS_BUCKET_URL}/${group.smallPhoto}`,
      };
    },
  },

  Mutation: {
    createGroup: async (
      _: unknown,
      { createGroupInput }: MutationCreateGroupArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["createGroup"]> => {
      const { title, description, categories, cities } = createGroupInput;

      try {
        const newGroup = await prisma.group.create({
          data: {
            title,
            description,
            smallPhoto: "128x128",
            mediumPhoto: "256x256",
            largePhoto: "512x512",
            categories: {
              create: categories.map((catValue) => ({
                category: { connect: { value: catValue } },
              })),
            },
            cities: {
              create: cities.map((cityValue) => ({
                city: { connect: { value: cityValue } },
              })),
            },
            users: {
              create: {
                isHost: true,
                isModerator: false,
                user: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            },
          },
        });

        return { success: true, groupId: newGroup.id };
      } catch (error) {
        console.error("Error creating group:", error);
        return { success: false };
      }
    },

    joinGroup: async (
      _: unknown,
      { groupId }: MutationJoinGroupArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["joinGroup"]> => {
      try {
        await prisma.groupUser.create({
          data: {
            user: { connect: { id: user.id } },
            group: { connect: { id: groupId } },
          },
        });

        return { success: true };
      } catch (error) {
        console.error("Error joining group:", error);
        return { success: false };
      }
    },

    leaveGroup: async (
      _: unknown,
      { groupId }: MutationLeaveGroupArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["leaveGroup"]> => {
      try {
        await prisma.groupUser.delete({
          where: {
            userId_groupId: {
              userId: user.id,
              groupId: groupId,
            },
          },
        });

        return { success: true };
      } catch (error) {
        console.error("Error leaving group:", error);
        return { success: false };
      }
    },
  },
};
