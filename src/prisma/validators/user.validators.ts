import { Prisma } from "@prisma/client";

export const userValidator = Prisma.validator<Prisma.UserInclude>()({});

export const userWithProfileValidator = Prisma.validator<Prisma.UserInclude>()({
  profile: true,
});
