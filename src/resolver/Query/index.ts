import { TContext } from "../../server";

export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  me: async (parent: any, args: any, { prisma, userData }: TContext) => {
    return await prisma.user.findUnique({ where: { id: userData.userId } });
  },
  posts: async (parent: any, args: any, { prisma, userData }: TContext) => {
    return await prisma.post.findMany({
      where: { authorId: userData.userId, published: true },
    });
  },
  myProfile: async (parent: any, args: any, {prisma, userData}: TContext) => {
    return await prisma.profile.findUnique({where: {userId: userData.userId}})
  }
};
