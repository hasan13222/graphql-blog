import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";
import { Prisma, PrismaClient } from "@prisma/client";
import { verifyToken } from "./utils/verifyToken";
import { DefaultArgs } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export interface TContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  userData: {userId: number}
}

async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<TContext> => {
      const userData = await verifyToken(req.headers.authorization as string) as {userId: number};
      return { prisma, userData };
    },
  });

  console.log(`🚀  Server ready at: ${url}/`);
}

main();
