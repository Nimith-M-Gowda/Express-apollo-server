const { gql } = require("apollo-server-express");

module.exports = gql`
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
