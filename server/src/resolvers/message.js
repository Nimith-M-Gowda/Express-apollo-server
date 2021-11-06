const uuid = require("uuid");

module.exports = {
  Query: {
    messages: (parent, args, { MESSAGES }) => {
      return Object.values(MESSAGES);
    },
    message: (parent, { id }, { MESSAGES }) => {
      return MESSAGES[id];
    },
  },
  Message: {
    user: (parent, { id }, { USERS }) => {
      return USERS[parent.userId];
    },
  },

  Mutation: {
    createMessage: (parent, { text }, { me, MESSAGES, USERS }) => {
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

    deleteMessage: (parent, { id }, { me, MESSAGES }) => {
      const { [id]: message, ...otherMessages } = MESSAGES;
      if (!message) {
        return false;
      }
      MESSAGES = otherMessages;
      return otherMessages;
    },

    updateMessage: (parent, { id, text }, { me, MESSAGES }) => {
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
