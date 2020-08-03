const Token = require("../models/VerificationToken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  console.log(req.query.token);
  await Token.findOne({ token: req.query.token }, async (err, token) => {
    if (!token) {
      res.status(404).json({
        type: "Not Verified",
        msg:
          "We were unable to find a valid token. Your token my have expired.",
      });
    }

    await User.findById(token._userId, (err, user) => {
      if (!user) {
        return res.status(404).json("User Not Found");
      }
      if (user.isVerified) {
        return res.status(409).json("User Already Verified");
      }

      try {
        user.isVerified = true;
        user.save((err) => {
          if (err) {
            res.status(400).json(err.message);
          }
          res.status(200).json("User Verified");
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
};
