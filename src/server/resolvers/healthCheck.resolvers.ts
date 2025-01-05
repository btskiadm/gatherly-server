export default {
  Query: {
    healthCheck: () => {
      return { status: "ok" };
    },
  },
};
