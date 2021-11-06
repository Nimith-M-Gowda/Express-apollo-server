const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

const uuid = require("uuid");

let USERS = {
  1: {
    id: "1",
    username: "Nimith",
    messageId: [1],
  },
  2: {
    id: "2",
    username: "Dave Davids",
    messageId: [2, 3],
  },
};

let MESSAGES = {
  1: {
    id: "1",
    text: "message1",
    userId: "1",
  },
  2: {
    id: "2",
    text: "message2",
    userId: "2",
  },
  3: {
    id: "3",
    text: "message2",
    userId: "2",
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
      messages: [Message!]
      message(id: ID!): Message!
    }
    type User {
      id: ID!
      username: String!
      messages: [Message]
    }
    type Message {
      id: ID!
      text: String!
      user: User!
    }

    type Mutation {
      createMessage(text: String!): Message!
      deleteMessage(id: ID!): Boolean!
      updateMessage(id: ID!, text: String!): Message!
    }
  `;

  const resolvers = {
    Query: {
      me: (parent, args, { me }) => {
        return me;
      },
      user: (parent, { id }) => {
        return USERS[id];
      },
      users: () => {
        return Object.values(USERS);
      },
      messages: () => {
        return Object.values(MESSAGES);
      },
      message: (parent, { id }) => {
        return MESSAGES[id];
      },
    },
    Message: {
      user: (parent, { id }) => {
        return USERS[parent.userId];
      },
    },
    User: {
      messages: (parent, { id }) => {
        let resultArray = [];
        parent.messageId.map((e) => {
          resultArray.push(MESSAGES[e]);
        });
        return resultArray;
        // return Object.values(messages).filter(
        //   (eachmessage) => eachmessage.userId === parent.id
        // );
      },
    },

    // User: {
    //   username: (parent) => {
    //     parent.username = `${parent.username}+rock`;
    //     return parent.username;
    //   },
    // },
    Mutation: {
      createMessage: (parent, { text }, { me }) => {
        const id = uuid.v4();
        const message = {
          id,
          text,
          userId: me.id,
        };
        MESSAGES[id] = message;
        USERS[me.id].messageId.push(id);
        return message;
      },

      // deleteMessage: (parent, { id }, { me }) => {
      //   if (Object.keys(MESSAGES).includes(id)) {
      //     delete MESSAGES[`${id}`];
      //     // USERS[me.id].messageId.filter((e) => e != id);

      //     return true;
      //   }
      //   return false;
      // },

      deleteMessage: (parent, { id }, { me }) => {
        const { [id]: message, ...otherMessages } = MESSAGES;
        if (!message) {
          return false;
        }
        MESSAGES = otherMessages;
        return true;
      },

      updateMessage: (parent, { id, text }, { me }) => {
        const message = {
          id,
          text,
          userId: me.id,
        };

        MESSAGES[id] = message;
        return message;
      },
    },
  };

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      me: USERS[1],
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
})();
