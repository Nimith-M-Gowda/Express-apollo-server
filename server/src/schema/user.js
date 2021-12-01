const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    me: User!
    user(id: ID!): User
    users: [User!]
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message]
    email: String!
  }
`;
