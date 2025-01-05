export const healthCheckResolver = {
  Query: {
    healthCheck: () => {
      return { status: "ok" };
    },
  },
};
