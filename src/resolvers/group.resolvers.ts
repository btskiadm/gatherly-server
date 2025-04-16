import { Prisma, Role } from "@prisma/client";
import { MercuriusContext } from "mercurius";
import {
  Category,
  City,
  EventTile,
  GroupDetails,
  GroupedEvents,
  GroupStatus,
  GroupTileWithUsers,
  Mutation,
  MutationAcceptJoinRequestGroupArgs,
  MutationAcceptSentGroupInvitationArgs,
  MutationCancelJoinGroupArgs,
  MutationCancelJoinRequestGroupArgs,
  MutationCancelSentGroupInvitationArgs,
  MutationCreateGroupArgs,
  MutationJoinGroupArgs,
  MutationLeaveGroupArgs,
  MutationSendGroupInvitationArgs,
  Query,
  QueryCheckUserGroupPermissionsArgs,
  QueryGetGroupJoinRequestsArgs,
  QueryGetGroupTilesArgs,
  QueryGetGroupTilesByUserIdArgs,
  QueryGetGroupTitlesArgs,
} from "../model/model";
import { getPhotoUrl } from "../utils/photoUrl";
import { userWithEnvPhotoPrefix } from "../utils/user";
import { AuthError } from "../errors/auth.error";

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
  smallPhoto: string;
  mediumPhoto: string;
  largePhoto: string;
  isPrivate: boolean;
  status: GroupStatus;
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
    getGroupTilesByUserId: async (
      _: unknown,
      { userId: _userId, skip, take }: QueryGetGroupTilesByUserIdArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Query["getGroupTilesByUserId"]> => {
      const userId = user?.id ?? _userId ?? "";

      const [userGroups, count] = await Promise.all([
        prisma.groupUser.findMany({
          where: {
            userId,
          },
          include: {
            group: {
              include: {
                categories: { include: { category: true } },
                cities: { include: { city: true } },
                users: {
                  include: {
                    user: true,
                  },
                  take: 5,
                },
                _count: {
                  select: {
                    users: true,
                    events: true,
                  },
                },
              },
            },
          },
          skip,
          take,
          orderBy: {
            group: {
              createdAt: "desc",
            },
          },
        }),
        prisma.groupUser.count({
          where: {
            userId,
          },
        }),
      ]);

      const groups: GroupTileWithUsers[] = userGroups.map(({ group }) => ({
        id: group.id,
        title: group.title,
        description: group.description,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
        isPrivate: group.isPrivate,

        categories: group.categories.map((c) => c.category),
        cities: group.cities.map((c) => c.city),

        largePhoto: getPhotoUrl(group.largePhoto),
        mediumPhoto: getPhotoUrl(group.mediumPhoto),
        smallPhoto: getPhotoUrl(group.smallPhoto),

        status: group.status,
        users: group.users.map((groupUser) => userWithEnvPhotoPrefix(groupUser.user)),

        eventsCount: group._count.events,
        usersCount: group._count.users,
      }));

      return {
        groups,
        count,
      };
    },

    checkUserGroupPermissions: async (
      _: unknown,
      { groupId }: QueryCheckUserGroupPermissionsArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Query["checkUserGroupPermissions"]> => {
      if (!user) {
        return {
          role: null,
        };
      }

      const groupUser = await prisma.groupUser.findFirst({
        where: {
          user: {
            id: user?.id,
          },
          group: {
            id: groupId,
          },
        },
      });

      return {
        role: groupUser?.role,
      };
    },

    // Wyszukuje grupy, których tytuł zawiera podany ciąg znaków.
    getGroupTitles: async (_: unknown, { title }: QueryGetGroupTitlesArgs, { prisma }: MercuriusContext) => {
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
      { categories, titles, cities, minMembers, maxMembers, numberOfMembers, dateOfAdding }: QueryGetGroupTilesArgs,
      { prisma }: MercuriusContext
    ): Promise<Query["getGroupTiles"]> => {
      const skip = 0,
        take = 50;

      // Budowanie warunków filtrowania.
      const titleCondition = buildTitleCondition(titles);
      const categoryCondition = buildCategoryCondition(categories);
      const citiesCondition = buildCitiesCondition(cities);
      // const sponsoredCondition = sponsored ? Prisma.sql`g."sponsoredUntil" >= NOW()` : Prisma.empty;
      // const verifiedCondition = verified ? Prisma.sql`g."isVerified" = true` : Prisma.empty;
      // const remoteCondition = remote
      //   ? Prisma.sql`NOT EXISTS (
      //       SELECT 1 FROM "CityGroup" cg_r
      //       WHERE cg_r."groupId" = g."id"
      //     )`
      //   : Prisma.empty;

      const whereClause = combineConditions([titleCondition, categoryCondition, citiesCondition]);

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
          g."smallPhoto",
          g."mediumPhoto",
          g."largePhoto",
          g."status",
          g."isPrivate",
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
        status: group.status,
        cities: group.cities,
        categories: group.categories,
        eventsCount: group.eventsCount,
        usersCount: group.usersCount,
        largePhoto: getPhotoUrl(group.largePhoto),
        mediumPhoto: getPhotoUrl(group.mediumPhoto),
        smallPhoto: getPhotoUrl(group.smallPhoto),
        isPrivate: group.isPrivate,
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
        _count: {
          select: {
            users: true,
          },
        },
        // users: {
        //   include: {
        //     user: {
        //       include: {
        //         _count: {
        //           select: {
        //             groups: true,
        //             events: true,
        //             hostEvents: true,
        //             friendshipUser1: true,
        //             friendshipUser2: true,
        //           },
        //         },
        //       },
        //     },
        //   },
        // },
        comments: {
          select: {
            id: true,
          },
        },
        users: {
          select: {
            id: true,
          },
        },
        events: { include: eventValidator },
      });

      const [group, rate] = await Promise.all([
        prisma.group.findFirst({
          where: { id: groupId },
          include: groupDetailsValidator,
        }),
        prisma.comment.aggregate({
          where: { groupId },
          _avg: { rate: true },
        }),
      ]);

      if (!group) {
        return null;
      }

      const now = new Date();

      // Funkcja grupująca zdarzenia według statusu.
      const getGroupedEvents = (
        events: EventWithInclude[]
      ): {
        upcoming: EventWithInclude[];
        pending: EventWithInclude[];
        past: EventWithInclude[];
        canceled: EventWithInclude[];
      } => {
        const grouped = {
          upcoming: [] as EventWithInclude[],
          pending: [] as EventWithInclude[],
          past: [] as EventWithInclude[],
          canceled: [] as EventWithInclude[],
        };

        for (const event of events) {
          if (event.canceled) {
            grouped.canceled.push(event);
          } else {
            const startAt = new Date(event.startAt);
            const endAt = new Date(event.endAt);

            if (now < startAt) {
              grouped.upcoming.push(event);
            } else if (startAt <= now && now <= endAt) {
              grouped.pending.push(event);
            } else if (now >= endAt) {
              grouped.past.push(event);
            }
          }
        }

        return grouped;
      };

      // Mapowanie zdarzeń do formatu EventGroup.
      const mapEventToGroup = (event: EventWithInclude): EventTile => ({
        id: event.id,
        canceled: event.canceled,
        createdAt: event.createdAt,
        description: event.description,
        endAt: event.endAt,
        startAt: event.startAt,
        title: event.title,
        categories: event.categories.map(({ category }) => category),
        cities: event.cities.map(({ city }) => city),
        usersCount: event.users.length,
        eventType: event.eventType,
        largePhoto: getPhotoUrl(group.largePhoto),
        mediumPhoto: getPhotoUrl(group.mediumPhoto),
        smallPhoto: getPhotoUrl(group.smallPhoto),
        updatedAt: event.updatedAt,
      });

      // Grupowanie zdarzeń według miesiąca i roku.
      const groupEventsByMonth = (events: EventWithInclude[]): GroupedEvents[] => {
        const sorted = events.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
        const eventMap = new Map<string, EventWithInclude[]>();

        sorted.forEach((event) => {
          const date = new Date(event.startAt);
          const key = `${date.getFullYear()}-${date.getMonth()}`;
          if (!eventMap.has(key)) eventMap.set(key, []);
          eventMap.get(key)?.push(event);
        });

        return Array.from(eventMap.entries()).map(([key, events]) => {
          const [year, month] = key.split("-").map(Number);
          return {
            __typename: "GroupedEvents",
            monthReference: new Date(year, month, 1).toISOString(),
            events: events.map(mapEventToGroup),
          };
        });
      };

      const { upcoming, pending, past, canceled } = getGroupedEvents(group.events);
      const upcomingGrouped = groupEventsByMonth(upcoming);
      const pendingGrouped = groupEventsByMonth(pending);
      const pastGrouped = groupEventsByMonth(past);
      const canceledGrouped = groupEventsByMonth(canceled);

      const eventsMapped: EventTile[] = group.events.map(mapEventToGroup);

      // Obliczanie sumarycznej liczby zdarzeń.
      const numOfEvents = (groups: GroupedEvents[]): number => groups.reduce((sum, g) => sum + g.events.length, 0);
      const roundToQuarter = (value: number): number => Math.round(value * 4) / 4;

      const canceledLength = numOfEvents(canceledGrouped);
      const pastLength = numOfEvents(pastGrouped);
      const upcomingLength = numOfEvents(upcomingGrouped);
      const pendingLength = numOfEvents(pendingGrouped);
      const eventsLength = canceledLength + pastLength + upcomingLength + pendingLength;

      return {
        id: group.id,
        title: group.title,
        description: group.description,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
        cities: group.cities.map(({ city }) => city),
        categories: group.categories.map(({ category }) => category),
        usersData: {
          count: group._count.users,
        },
        status: group.status,
        isPrivate: group.isPrivate,
        isHidden: group.isHidden,
        membersApprover: group.membersApprover,
        commentsData: {
          rate: roundToQuarter(rate._avg.rate ?? 0),
        },
        upcoming: upcomingGrouped,
        pending: pendingGrouped,
        past: pastGrouped,
        canceled: canceledGrouped,
        events: eventsMapped,
        upcomingLength,
        pendingLength,
        pastLength,
        canceledLength,
        eventsLength,
        largePhoto: getPhotoUrl(group.largePhoto),
        mediumPhoto: getPhotoUrl(group.mediumPhoto),
        smallPhoto: getPhotoUrl(group.smallPhoto),
      };
    },
    getGroupJoinRequests: async (
      _: unknown,
      { groupId, status = [] }: QueryGetGroupJoinRequestsArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Query["getGroupJoinRequests"]> => {
      const where: Prisma.GroupJoinRequestWhereInput = {
        groupId: groupId,
        sender: null,
      };

      if (status && status?.length > 0) {
        where.status = {
          in: status,
        };
      }

      const requests = await prisma.groupJoinRequest.findMany({
        where: where,
        include: {
          user: true,
          sender: true,
        },
      });

      return requests.map((request) => ({
        ...request,
        user: userWithEnvPhotoPrefix(request.user),
        sender: request.sender ? userWithEnvPhotoPrefix(request.sender) : null,
      }));
    },

    getGroupJoinInvitationRequests: async (
      _: unknown,
      { groupId, status = [] }: QueryGetGroupJoinRequestsArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Query["getGroupJoinRequests"]> => {
      const where: Prisma.GroupJoinRequestWhereInput = {
        groupId: groupId,
        sender: {
          isNot: null, // Tylko rekordy, które mają przypisanego sendera
        },
      };

      if (status && status?.length > 0) {
        where.status = {
          in: status,
        };
      }

      const requests = await prisma.groupJoinRequest.findMany({
        where: where,
        include: {
          user: true,
          sender: true,
        },
      });

      return requests.map((request) => ({
        ...request,
        user: userWithEnvPhotoPrefix(request.user),
        sender: request.sender ? userWithEnvPhotoPrefix(request.sender) : null,
      }));
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
            isHidden: true, //todo
            isPrivate: true, //todo
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
                role: Role.HOST,
                user: {
                  connect: {
                    id: user!.id,
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
      const userId = user?.id;

      if (!userId) {
        throw new AuthError();
      }

      const group = await prisma.group.findFirst({
        where: {
          id: groupId,
        },
        select: {
          isPrivate: true,
          users: {
            where: {
              userId: userId,
            },
          },
          joinRequests: {
            where: {
              userId: userId,
            },
          },
        },
      });

      if (!group) {
        throw new Error(`group:${groupId} does not exist`);
      }

      if (group.users.some((u) => u.id === userId)) {
        throw new Error(`user:${userId} already exist in group:${groupId}`);
      }
      // todo: sprawdzać kto moze zaakceptowac dla grupy publicznej i prywatnej, rozwarzyc admin only, members, nie wymagane
      if (group?.isPrivate) {
        if (group.joinRequests.some((u) => u.id === userId)) {
          throw new Error(`user:${userId} has already sent join request`);
        }

        await prisma.groupJoinRequest.create({
          data: {
            user: { connect: { id: userId } },
            group: { connect: { id: groupId } },
          },
        });
      } else {
        prisma.$transaction(
          async (tx) => {
            await tx.groupUser.create({
              data: {
                user: { connect: { id: userId } },
                group: { connect: { id: groupId } },
              },
            });
          },
          {
            maxWait: 10_000,
            timeout: 20_000,
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          }
        );
      }

      return true;
    },

    cancelJoinGroup: async (
      _: unknown,
      { groupId }: MutationCancelJoinGroupArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["cancelJoinGroup"]> => {
      const userId = user?.id;

      if (!userId) {
        throw new AuthError();
      }

      await prisma.groupJoinRequest.create({
        data: {
          user: { connect: { id: userId } },
          group: { connect: { id: groupId } },
        },
      });

      return true;
    },

    leaveGroup: async (
      _: unknown,
      { groupId }: MutationLeaveGroupArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["leaveGroup"]> => {
      await prisma.groupUser.delete({
        where: {
          userId_groupId: {
            userId: user!.id,
            groupId: groupId,
          },
        },
      });

      return true;
    },

    sendGroupInvitation: async (
      _: unknown,
      { groupId, userId }: MutationSendGroupInvitationArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["acceptJoinRequestGroup"]> => {
      if (!user?.id) {
        throw new AuthError();
      }

      const senderGroupUser = await prisma.groupUser.findFirst({
        where: {
          groupId: groupId,
          userId: user?.id,
        },
      });

      if (!senderGroupUser) {
        throw new AuthError(`user:${user?.id} is not member of group:${groupId}`);
      }

      // todo: sprawdzać kto moze zaakceptowac dla grupy publicznej i prywatnej, rozwarzyc admin only, members, nie wymagane
      const receiverGroupUser = await prisma.groupUser.findFirst({
        where: {
          groupId: groupId,
          userId: userId,
        },
      });

      if (receiverGroupUser) {
        throw new AuthError(`user:${userId} is group:${groupId} member`);
      }

      await prisma.groupJoinRequest.create({
        data: {
          user: { connect: { id: userId } },
          group: { connect: { id: groupId } },
          sender: { connect: { id: user.id } },
        },
      });

      return true;
    },

    acceptSentGroupInvitation: async (
      _: unknown,
      { groupId }: MutationAcceptSentGroupInvitationArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["acceptSentGroupInvitation"]> => {
      const userId = user?.id;

      if (!userId) {
        throw new AuthError();
      }

      await prisma.groupJoinRequest.deleteMany({
        where: {
          groupId: groupId,
          userId: userId,
        },
      });

      await prisma.groupUser.create({
        data: {
          user: { connect: { id: userId } },
          group: { connect: { id: groupId } },
        },
      });

      return true;
    },

    cancelSentGroupInvitation: async (
      _: unknown,
      { groupId }: MutationCancelSentGroupInvitationArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["cancelSentGroupInvitation"]> => {
      const userId = user?.id;

      if (!userId) {
        throw new AuthError();
      }

      await prisma.groupJoinRequest.deleteMany({
        where: {
          groupId,
          userId,
        },
      });

      return true;
    },

    acceptJoinRequestGroup: async (
      _: unknown,
      { groupId, userId }: MutationAcceptJoinRequestGroupArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["acceptJoinRequestGroup"]> => {
      // todo: sprawdzać kto moze zaakceptowac dla grupy publicznej i prywatnej, rozwarzyc admin only, members, nie wymagane

      // delete or request for specific user in specific group
      await prisma.groupJoinRequest.deleteMany({
        where: {
          groupId,
          userId,
        },
      });

      // it will throw error if user is already in group
      await prisma.groupUser.create({
        data: {
          user: { connect: { id: userId } },
          group: { connect: { id: groupId } },
        },
      });

      return true;
    },

    cancelJoinRequestGroup: async (
      _: unknown,
      { groupId, userId }: MutationAcceptJoinRequestGroupArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["cancelJoinRequestGroup"]> => {
      // delete or request for specific user in specific group
      await prisma.groupJoinRequest.deleteMany({
        where: {
          groupId,
          userId,
        },
      });

      return true;
    },
  },
};
