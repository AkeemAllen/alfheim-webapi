const User = require("../../models/User");
const Token = require("../../models/VerificationToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { info } = require("console");
const { result } = require("lodash");

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
        // Sending Token
        const token = new Token({
          _userId: result.id,
          token: crypto.randomBytes(16).toString("hex"),
        });
        token.save(async (err) => {
          if (err) throw new Error("Token Not Saved");

          let transporter = nodemailer.createTransport({
            service: process.env.GMAIL_SERVICE_NAME,
            host: process.env.GMAIL_SERVICE_HOST,
            port: process.env.GMAIL_SERVICE_PORT,
            secure: process.env.GMAIL_SERVICE_SECURE, // true for 465, false for other ports
            auth: {
              user: process.env.GMAIL_USER_NAME, // generated ethereal user
              pass: process.env.GMAIL_USER_PASSWORD, // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          const mailOptions = {
            from: "no-reply@yourwebapplication.com",
            to: result.email,
            subject: "Account Verification Token",
            text:
              "Hello,\n\n" +
              "Please verify your account by clicking the link: \nhttp://" +
              req.headers.host +
              "/confirmation?" +
              "token=" +
              token.token,
          };

          const info = await transporter.sendMail(mailOptions, (err) => {
            if (err) {
              throw new Error(err.message);
            }
            verificationMsg =
              "A verification email has been sent to " + user.email + ".";
          });
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        });

        return {
          ...result._doc,
          password: null,
          id: result.id,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateUser: async ({ userInput }, req) => {
    const user = await User.findOne({ email: userInput.email });
    if (!user) {
      throw new Error("User Not Found");
    }

    try {
      (userInput.username !== null) | undefined | ""
        ? (user.username = userInput.username)
        : null;
      (userInput.firstname !== null) | undefined | ""
        ? (user.firstname = userInput.firstname)
        : null;
      (userInput.lastname !== null) | undefined | ""
        ? (user.lastname = userInput.lastname)
        : null;
      (userInput.contact !== null) | undefined | ""
        ? (user.contact = userInput.contact)
        : null;
      return user.save();
    } catch (error) {
      throw new Error(error);
    }
  },
  login: async ({ email, password }, req, res) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User Does Not Exist");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Invalid Credentials");
    }

    if (!user.isVerified) {
      throw new Error("Use Not Verified");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        isVerified: user.isVerified,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        contact: user.contact,
      },
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
