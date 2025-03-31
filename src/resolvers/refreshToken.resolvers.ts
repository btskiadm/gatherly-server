import { MercuriusContext } from "mercurius";
import { Mutation } from "../model/model";
import { env } from "../utils/env";

export default {
  Mutation: {
    refreshToken: async (
      _: unknown,
      __: unknown,
      { prisma, app, req }: MercuriusContext
    ): Promise<Mutation["refreshToken"]> => {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        throw new Error("No refresh token is given.");
      }

      try {
        const payload = app.jwt.verify<{ id: string }>(refreshToken);

        const user = await prisma.user.findFirst({
          where: {
            id: payload.id,
          },
        });

        if (!user) {
          throw new Error("User does not exist.");
        }

        const accessToken = app.jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          { expiresIn: env.ACCESS_TOKEN_EXPIRES_IN }
        );

        return {
          accessToken,
          user,
        };
      } catch (error) {
        console.error("refreshToken error: ", error);
      }
    },
  },
};
