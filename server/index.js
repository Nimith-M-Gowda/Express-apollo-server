const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

let users = {
  1: {
    id: "1",
    username: "Nimith",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

(async () => {
  const app = express();

  // app.use(cors);

  const schema = gql`
    type Query {
      me: User!
      user(id: ID!): User
      users: [User!]
    }
    type User {
      username: String!
      age: Int
      id: ID!
    }
  `;

  const resolvers = {
    Query: {
      me: (parent, args, { me }) => {
        return me;
      },
      user: (parent, { id }) => {
        return users[id];
      },
      users: () => {
        return Object.values(users);
      },
    },
    // User: {
    //   username: (parent) => {
    //     parent.username = `${parent.username}+rock`;
    //     return parent.username;
    //   },
    // },
  };

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      me: {
        id: 1,
        username: "Nimith M Gowda",
        age: 24,
      },
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
})();
