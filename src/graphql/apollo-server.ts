import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import { app } from "../index";
import { logger } from "../logger";

export async function apolloConnection() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({ app });
  logger.info(`${process.pid} Apollo server started `);
}
