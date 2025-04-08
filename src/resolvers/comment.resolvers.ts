import { MercuriusContext } from "mercurius";
import {
  AddGroupCommentResponse,
  GetGroupCommentsResponse,
  MutationAddGroupCommentArgs,
  QueryGetGroupCommentsArgs,
} from "../model/model";

export default {
  Query: {
    getGroupComments: async (
      _: unknown,
      { groupId }: QueryGetGroupCommentsArgs,
      { prisma }: MercuriusContext
    ): Promise<GetGroupCommentsResponse> => {
      const comments = await prisma.comment.findMany({
        where: {
          groupId: groupId,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        comments,
      };
    },
  },
  Mutation: {
    addGroupComment: async (
      _: unknown,
      { groupId, addGroupCommentInput }: MutationAddGroupCommentArgs,
      { prisma, user }: MercuriusContext
    ): Promise<AddGroupCommentResponse> => {
      const { content, rate } = addGroupCommentInput;
      const { id } = user!;

      try {
        const comment = await prisma.comment.create({
          data: {
            rate,
            content,
            user: {
              connect: {
                id: id,
              },
            },
            group: {
              connect: {
                id: groupId,
              },
            },
          },
          select: {
            id: true,
            rate: true,
            content: true,
            createdAt: true,
            user: true,
          },
        });

        return {
          success: !!comment,
          comment,
        };
      } catch (error) {
        console.error("Error adding group comment:", error);
        return { success: false, comment: null };
      }
    },
  },
};
