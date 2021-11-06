const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const { USERS, MESSAGES } = require("./models");
const resolvers = require("./resolvers");
const schema = require("./schema");

(async () => {
  const app = express();

  // app.use(cors);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      USERS,
      MESSAGES,
      me: USERS[1],
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
})();
