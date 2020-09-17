const User = require("../../models/G_User");

module.exports = {
  addUser: async ({ input }) => {
    const userExists = await User.findOne({ uuid: input.uuid });
    if (userExists) {
      throw new Error("User Already Exists");
    }

    const user = new User({
      uuid: input.uuid,
    });

    return user.save();
  },
};
