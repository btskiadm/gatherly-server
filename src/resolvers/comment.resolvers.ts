import { MercuriusContext } from "mercurius";
import {
  AddGroupCommentResponse,
  GetGroupCommentsResponse,
  MutationAddGroupCommentArgs,
  QueryGetGroupCommentsArgs,
} from "../model/model";
import { env } from "../utils/env";

export default {
  Query: {
    getGroupComments: async (
      _: unknown,
      { groupId, skip, take }: QueryGetGroupCommentsArgs,
      { prisma }: MercuriusContext
    ): Promise<GetGroupCommentsResponse> => {
      const [comments, count] = await Promise.all([
        prisma.comment.findMany({
          where: {
            groupId: groupId,
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: skip ?? 0,
          take: take ?? 0,
        }),
        prisma.comment.count({
          where: {
            groupId: groupId,
          },
        }),
      ]);

      return {
        comments: comments.map((comment) => ({
          ...comment,
          user: {
            ...comment.user,
            largePhoto: `${env.PHOTOS_BUCKET_URL}/${comment.user.largePhoto}`,
            mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${comment.user.mediumPhoto}`,
            smallPhoto: `${env.PHOTOS_BUCKET_URL}/${comment.user.smallPhoto}`,
          },
        })),
        count: count,
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
