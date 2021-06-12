const userResolver = require("./resolvers/user");
const roomResolver = require("./resolvers/room");
const g_userResolver = require("./resolvers/guser");

module.exports = {
  ...userResolver,
  ...roomResolver,
  ...g_userResolver,
};
