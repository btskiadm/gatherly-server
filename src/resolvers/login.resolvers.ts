import { MercuriusContext } from "mercurius";
import { Mutation, MutationLoginArgs } from "../model/model";
import { env } from "../utils/env";
import { CookieSerializeOptions } from "@fastify/cookie";
import { UserNotFound } from "../errors/userNotFound.error";

export default {
  Mutation: {
    login: async (
      _: unknown,
      { username, password }: MutationLoginArgs,
      { prisma, reply, app }: MercuriusContext
    ): Promise<Mutation["login"]> => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            username,
          },
        });

        // todo: check if password is valid
        if (user) {
          const accessToken = app.jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            { expiresIn: env.ACCESS_TOKEN_EXPIRES_IN }
          );
          const refreshToken = app.jwt.sign({ id: user.id }, { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN });

          const tokenCookieOption: CookieSerializeOptions = {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            path: "/",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          };

          reply.setCookie("refreshToken", refreshToken, tokenCookieOption);

          reply.setCookie("loggedIn", "true", {
            ...tokenCookieOption,
            httpOnly: false,
          });

          return { accessToken, user };
        }

        throw new UserNotFound();
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
  },
};
