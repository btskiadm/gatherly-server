import { Prisma } from "@prisma/client";

export const groupTitleValidator = Prisma.validator<Prisma.GroupSelect>()({
  id: true,
  title: true,
});
