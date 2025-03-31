import { MercuriusContext } from "mercurius";
import { Mutation } from "../model/model";

export default {
  Mutation: {
    logout: async (_: unknown, __: unknown, { reply }: MercuriusContext): Promise<Mutation["logout"]> => {
      reply.clearCookie("refreshToken", { path: "/" });
      reply.clearCookie("loggedIn", { path: "/" });
      return {
        status: "ok",
      };
    },
  },
};
