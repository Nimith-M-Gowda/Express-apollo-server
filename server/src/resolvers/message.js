const uuid = require("uuid");

module.exports = {
  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findByPk(id);
    },
  },
  Message: {
    user: async (parent, args, { models }) => {
      return await models.Users.findByPk(parent.userId);
    },
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      // const id = uuid.v4();
      // const message = {
      //   id,
      //   text,
      //   userId: me.id,
      // };
      // models.messages[id] = message;
      // models.users[me.id].messageId.push(id);
      // return message;
      return await models.Message.create({
        text,
        userId: me.id,
      });
    },

    // deleteMessage: (parent, { id }, { me }) => {
    //   if (Object.keys(MESSAGES).includes(id)) {
    //     delete MESSAGES[`${id}`];
    //     // USERS[me.id].messageId.filter((e) => e != id);

    //     return true;
    //   }
    //   return false;
    // },

    deleteMessage: async (parent, { id }, { me, models }) => {
      return await models.Message.destroy({
        where: { id },
      });
      // const { [id]: message, ...otherMessages } = models.messages;
      // if (!message) {
      //   return false;
      // }
      // models.messages = otherMessages;
      // return otherMessages;
    },

    updateMessage: async (parent, { id, text }, { me, models }, info) => {
      await models.Message.update(
        {
          text,
          userId: me.id,
        },
        { where: { id } }
      );
      return await models.Message.findByPk(id);
      // const message = {
      //   id,
      //   text,
      //   userId: me.id,
      // };
      // models.messages[id] = message;
      // return message;
    },
  },
};
