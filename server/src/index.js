require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
// const { USERS, MESSAGES } = require("./models");
const resolvers = require("./resolvers");
const schema = require("./schema");
const { sequelize, models } = require("./models");

(async () => {
  const app = express();
  // app.use(cors);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async () => ({
      models,
      me: await models.User.findByLogin("Nimith"),
    }),
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  const eraseDatabaseOnSync = false;
  //First time its true and once the data is entered on db then set to false
  sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
      createUsersWithMessages();
    }

    app.listen({ port: 8000 }, () => {
      console.log("Apollo Server on http://localhost:8000/graphql");
    });
  });

  const createUsersWithMessages = async () => {
    await models.User.create(
      {
        username: "Nimith",
        messages: [
          {
            text: "Published the Road to learn React",
          },
        ],
        email: "nimithbbz10@gmail.com",
        password: "password",
      },
      {
        include: [models.Message],
      }
    );
    await models.User.create(
      {
        username: "ddavids",
        messages: [
          {
            text: "Happy to release ...",
          },
          {
            text: "Published a complete ...",
          },
        ],
        email: "hello@david.com",
        password: "ddavids",
      },
      {
        include: [models.Message],
      }
    );
  };
})();
