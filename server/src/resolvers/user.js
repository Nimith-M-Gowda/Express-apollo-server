const uuid = require("uuid");

module.exports = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }, { USERS }) => {
      return USERS[id];
    },
    users: (parent, args, { USERS }) => {
      return Object.values(USERS);
    },
  },

  User: {
    messages: (parent, { id }, { MESSAGES }) => {
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
};
