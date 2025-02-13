import { error } from "console";
import { TContext } from "../server";

export const checkUserAccess = async ({ userData, prisma }: TContext) => {
  if (!userData) {
    return {
      error: { createPostError: "unauthorized access", post: null },
      postAuthor: null,
    };
  }
  const postAuthor = await prisma.user.findUnique({
    where: { id: userData.userId },
  });

  if (!postAuthor) {
    return {
      error: { createPostError: "user not found", post: null },
      postAuthor: null,
    };
  }

  return { error: null, postAuthor };
};
