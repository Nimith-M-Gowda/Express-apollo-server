const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

(async () => {
  const app = express();
  const schema = gql`
    type Query {
      me: User
    }
    type User {
      username: String!
      age: Int
    }
  `;

  const resolvers = {
    Query: {
      me: () => {
        return {
          username: "Nimith",
          age: 26,
        };
      },
    },
  };

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
})();
