import { TContext } from "../../server";
import { checkUserAccess } from "../../utils/checkUserAccess";
import { checkUserConflict } from "../../utils/checkUserConfiict";

export const postResolvers = {
  createPost: async (
    parent: any,
    args: any,
    { prisma, userData }: TContext
  ) => {
    const { post } = args;

    const user = await checkUserAccess({ prisma, userData });
    if (user?.error) {
      return user.error;
    }

    if (!post?.title || !post?.content) {
      return { createPostError: "title and content is required", post: null };
    }

    const newPost = await prisma.post.create({
      data: { ...post, authorId: user?.postAuthor.id },
    });

    return {
      createPostError: null,
      post: { ...newPost, author: user.postAuthor },
    };
  },

  updatePost: async (
    parent: any,
    args: any,
    { prisma, userData }: TContext
  ) => {
    const { post, postId } = args;

    const user = await checkUserAccess({ prisma, userData });
    if (user?.error) {
      return user.error;
    }

    const userConflict = await checkUserConflict(
      prisma,
      user.postAuthor.id,
      postId
    );
    if (userConflict) {
      return userConflict;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: post,
    });

    return { updatePostError: null, post: updatedPost };
  },
  publishPost: async (
    parent: any,
    args: any,
    { prisma, userData }: TContext
  ) => {
    const { postId } = args;

    const user = await checkUserAccess({ prisma, userData });
    if (user?.error) {
      return user.error;
    }

    const userConflict = await checkUserConflict(
      prisma,
      user.postAuthor.id,
      postId
    );
    if (userConflict) {
      return userConflict;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {published: true},
    });

    return { updatePostError: null, post: updatedPost };
  },
  deletePost: async (
    parent: any,
    args: any,
    { prisma, userData }: TContext
  ) => {
    const { post, postId } = args;

    const user = await checkUserAccess({ prisma, userData });
    if (user?.error) {
      return user.error;
    }

    const userConflict = await checkUserConflict(
      prisma,
      user.postAuthor.id,
      postId
    );
    if (userConflict) {
      return userConflict;
    }

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return { updatePostError: null, post: deletedPost };
  },
};
