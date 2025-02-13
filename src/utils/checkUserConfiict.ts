import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const checkUserConflict = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  postAuthorId: number,
  postId: number
) => {
  const postToUpdate = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!postToUpdate) {
    return { updatePostError: "post not found", post: null };
  }

  if (postAuthorId !== postToUpdate.authorId) {
    return { updatePostError: "this is not your post to update", post: null };
  }
};
