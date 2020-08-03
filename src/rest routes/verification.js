const router = require("express").Router();
const Token = require("../models/VerificationToken");
const User = require("../models/User");

router.route("/").post((req, res) => {
  Token.findOne({ token: req.body.token }, (err, token) => {
    if (!token) {
      res.status(404).json({
        type: "Not Verified",
        msg:
          "We were unable to find a valid token. Your token my have expired.",
      });
    }

    console.log(req.body);

    User.findOne({ email: req.body.email, _id: token._userId }, (err, user) => {
      if (!user) {
        res.status(404).json("User Not Found");
      }
      if (user.isVerified) {
        res.status(409).json("User Already Verified");
      }

      user.isVerified = true;
      user.save((err) => {
        if (err) {
          res.status(400).json(err.message);
        }
        res.status(200).json("User Verified");
      });
    });
  });
});

module.exports = router;
