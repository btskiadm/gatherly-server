export default {
  Query: {
    getGroupTiles: (
      _: unknown,
      {
        categories,
        titles,
        sponsored,
        verified,
        remote,
        minMembers,
        maxMembers,
      }: {
        locations: string[];
        categories: string[];
        titles: string[];
        sponsored: boolean;
        verified: boolean;
        remote: boolean;
        minMembers: number;
        maxMembers: number;
      }
    ) => {
      return [];
    },
  },
};
