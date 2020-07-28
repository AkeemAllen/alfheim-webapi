const userResolver = require("./resolvers/user");
const roomResolver = require("./resolvers/room");
const locationResolver = require("./resolvers/location");

module.exports = {
  ...userResolver,
  ...roomResolver,
  ...locationResolver,
};
