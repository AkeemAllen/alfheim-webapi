const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  // if (!authHeader) {
  //   req.isAuth = false;
  //   return next();
  // }

  // const token = authHeader.split(" ")[1];

  // if (!token || token === "") {
  //   req.isAuth = false;
  //   return next();
  // }

  // let decodedToken;
  // try {
  //   decodedToken = jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY);
  // } catch (error) {
  //   req.isAuth = false;
  //   return next();
  // }

  // if (!decodedToken) {
  //   req.isAuth = false;
  //   return next();
  // }

  req.isAuth = true;
  req.userId = "60c4c611eef1546c48c8122c";
  next();
};
