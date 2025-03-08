import { Prisma } from "@prisma/client";

export const cityValidator = Prisma.validator<Prisma.CityInclude>()({});
