const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  const { id, username, email } = user;
  return await jwt.sign({ id, username, email });
};
module.exports = {
  Query: {
    me: async (parent, args, { me, models }) => {
      if (!me) {
        return null;
      }
      return await models.User.findByPk(me.id);
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
  },

  User: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: parent.id,
        },
      });
      // return Object.values(messages).filter(
      //   (eachmessage) => eachmessage.userId === parent.id
      // );x``
    },
  },
  Mutation: {
    signUp: async (parent, { username, email, password }, { models }) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return { token: createToken(user) };
    },
  },
  // User: {
  //   username: (parent) => {
  //     parent.username = `${parent.username}+rock`;
  //     return parent.username;
  //   },
  // },
};
