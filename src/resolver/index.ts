import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
    Query: {
      
    },
    Mutation: {
      signup: async (parent: any, args: any) => {
        return await prisma.user.create({data: args})
      }
    }
  };
