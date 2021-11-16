const uuid = require("uuid");

module.exports = {
  Query: {
    me: async (parent, args, { me, models }) => {
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
      // );
    },
  },

  // User: {
  //   username: (parent) => {
  //     parent.username = `${parent.username}+rock`;
  //     return parent.username;
  //   },
  // },
};
