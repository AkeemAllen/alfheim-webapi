const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async ({ userInput }, req) => {
    const userExists = await User.findOne({ email: userInput.email });
    if (userExists) {
      throw new Error("User Already Exists");
    }

    return await bcrypt
      .hash(userInput.password, 12)
      .then((hashedPassword) => {
        const user = new User({
          username: userInput.username,
          email: userInput.email,
          firstname: userInput.firstname,
          lastname: userInput.lastname,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result) => {
        return { ...result._doc, password: null, id: result.id };
      })
      .catch((err) => {
        console.log(err);
      });
  },
  login: async ({ email, password }, req) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User Does Not Exist");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Invalid Credentials");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JSON_WEB_TOKEN_KEY,
      { expiresIn: "1h" }
    );

    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
  allUsers: async (req) => {
    const result = await User.find().populate("roomsOwned");
    result.forEach((element) => {
      element.password = null;
    });
    return result;
  },
  getUserByEmail: async ({ email }, req) => {
    return await User.findOne({ email: email })
      .populate("roomsOwned")
      .then((result) => {
        return { ...result._doc, password: null, id: result.id };
      });
  },
  getUserById: async ({ id }, req) => {
    return await User.findById(id)
      .populate("roomsOwned")
      .then((result) => {
        return { ...result._doc, password: null, id: result.id };
      });
  },
};
