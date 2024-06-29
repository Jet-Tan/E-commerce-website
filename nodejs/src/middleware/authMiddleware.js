const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      errCode: 1,
      message: "Token is missing",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        errCode: 1,
        message: "Token is invalid or expired",
      });
    }
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        errCode: 1,
        message: "The authemtication",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = req.params.id;
  if (!token) {
    return res.status(401).json({
      errCode: 1,
      message: "Token is missing",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        errCode: 1,
        message: "Token is invalid or expired",
      });
    }
    console.log("user", user);
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        errCode: 1,
        message: "The authemtication",
      });
    }
  });
};
module.exports = { authMiddleWare, authUserMiddleWare };
