export default {
  // Mutation: {
  //   addGroupComment: async (
  //     _: unknown,
  //     {
  //       groupId,
  //       addGroupCommentInput,
  //     }: {
  //       groupId: string;
  //       addGroupCommentInput: {
  //         rate: number;
  //         content: string;
  //       };
  //     },
  //     { dataSource: { commentDataSource } }: MercuriusContext
  //   ): Promise<{ success: boolean; comment: CommentDto | null }> => {
  //     // only (group / event) participant
  //     try {
  //       const comment: Comment = {
  //         id: new Date().toISOString(),
  //         content: addGroupCommentInput.content,
  //         createdAt: new Date().toISOString(),
  //         rate: addGroupCommentInput.rate,
  //         user: DBUsers[0],
  //       };
  //       const savedModel = await commentDataSource.addGroupComment(groupId, comment);
  //       return {
  //         success: true,
  //         comment: toCommentDto(savedModel),
  //       };
  //     } catch (error) {
  //       return { success: false, comment: null };
  //     }
  //   },
  // },
};
