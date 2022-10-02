import "reflect-metadata";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DataModel, DataResolver } from "./apollo";
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "rafael",
    entities: [DataModel],
    logging: true,
    synchronize: true,
    username: "postgres",
    password: "postgres",
    port: 5432,
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [DataResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  const PORT = 8000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

main().catch((err) => console.error(err));
