const userResolver = require("./resolvers/user");
const roomResolver = require("./resolvers/room");

module.exports = {
  ...userResolver,
  ...roomResolver,
};
