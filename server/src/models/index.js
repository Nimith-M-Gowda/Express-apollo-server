import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  }
);
const models = {
  // User: sequelize.import("./user.js"),
  User: require("./user")(sequelize, Sequelize),
  Message: require("./message")(sequelize, Sequelize),
  // Message: sequelize.import("./message.js"),
};
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});
module.exports = { sequelize, models };

// let USERS = {
//   1: {
//     id: "1",
//     username: "Nimith",
//     messageId: [1],
//   },
//   2: {
//     id: "2",
//     username: "Dave Davids",
//     messageId: [2, 3],
//   },
// };

// let MESSAGES = {
//   1: {
//     id: "1",
//     text: "message1",
//     userId: "1",
//   },
//   2: {
//     id: "2",
//     text: "message2",
//     userId: "2",
//   },
//   3: {
//     id: "3",
//     text: "message3",
//     userId: "2",
//   },
// };

// module.exports= { USERS, MESSAGES };
