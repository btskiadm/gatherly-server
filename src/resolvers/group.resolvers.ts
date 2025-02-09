import { MercuriusContext } from "mercurius";
import { toGroupDetailsDto, toGroupDto, toGroupTileDto } from "../utils/mappers";
import { Group } from "../models";
import { DBUsers } from "../dataSources/mock";
import { GroupDetailsDto, GroupDto, GroupTileDto } from "../dtos";

type NumberOfMembers = "ascending" | "decending";
type DateOfAdding = "newest" | "oldest";

export default {
  Query: {
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
      }: {
        cities: string[];
        categories: string[];
        titles: string[];
        sponsored: boolean;
        verified: boolean;
        remote: boolean;
        minMembers: number;
        maxMembers: number;
        numberOfMembers: NumberOfMembers;
        dateOfAdding: DateOfAdding;
      },
      { dataSource: { groupDataSource } }: MercuriusContext
    ): Promise<GroupTileDto[]> => {
      const groups = await groupDataSource.getGroups();

      return groups.map(toGroupTileDto);
    },
    getGroupDetails: async (
      _: unknown,
      { groupId }: { groupId: string },
      { dataSource: { groupDataSource } }: MercuriusContext
    ): Promise<GroupDetailsDto | null> => {
      const group = await groupDataSource.getGroup(groupId);
      if (!group) {
        return null;
      }

      return Promise.resolve(toGroupDetailsDto(group));
    },
  },
  Mutation: {
    deleteGroup: async (
      _: unknown,
      { groupId }: { groupId: string },
      { dataSource: { groupDataSource } }: MercuriusContext
    ): Promise<{ success: boolean }> => {
      try {
        await groupDataSource.deleteGroup(groupId);
        return { success: true };
      } catch (error) {
        return { success: false };
      }
    },
    createGroup: async (
      _: unknown,
      {
        createGroupInput: { categories, cities, description, remote, title },
      }: {
        createGroupInput: {
          title: string;
          description: string;
          categories: string[];
          cities: string[];
          remote: string[];
        };
      },
      { dataSource: { groupDataSource } }: MercuriusContext
    ): Promise<{ success: boolean; group: GroupDto | null }> => {
      try {
        const id = `group-${new Date().toISOString()}`;
        const group: Group = {
          id,
          title,
          description,
          createdAt: new Date().toISOString(),
          verified: {
            id: id + "-verified",
            value: false,
          },
          sponsored: {
            id: id + "-sponsored",
            value: false,
          },
          remote: {
            id: id + "-remote",
            value: false,
          },
          thumbnail: {
            id: id + "-thumbnail",
            thumb: "#",
          },
          users: [
            {
              id: id + "-user-" + DBUsers[0].id,
              isHost: true,
              isModerator: false,
              user: DBUsers[0],
            },
          ],
          categories: categories.map((c) => ({ label: c, value: c })),
          cities: cities.map((c) => ({ label: c, value: c })),
          events: [],
          comments: [],
        };

        const createdGroup = await groupDataSource.createGroup(group);

        console.dir({ createdGroup });

        return { success: true, group: toGroupDto(createdGroup) };
      } catch (error) {
        console.dir({ error });
        return { success: false, group: null };
      }
    },
  },
};
