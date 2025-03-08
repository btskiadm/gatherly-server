import { Prisma } from "@prisma/client";

export const categoryValidator = Prisma.validator<Prisma.CategoryInclude>()({});
