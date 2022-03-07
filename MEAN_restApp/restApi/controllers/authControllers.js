const User = require("../models/user");
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1]; //0[Bearer],1[header.payload.signature]
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "somethingSomething");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

const register = async (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  if (!userData) {
    return res.status(403).json({
      message: "No data",
    });
  } else {
    await user
      .save()
      .then((registeredUser) => {
        let payload = { subject: registeredUser._id }; //sub should be unique, setting the _id of user in mongoDB
        let token = jwt.sign(payload, "somethingSomething", {
          expiresIn: "1h",
        }); //setting the payload and signature
        return res.status(200).json({
          token: token,
          message: "Registered",
          user: registeredUser,
        });
      })
      .catch((err) => {
        return res.json({
          message: err.message,
        });
      });
  }
};
const login = async (req, res) => {
  let userData = req.body;
  await User.findOne({ email: userData.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "no user data",
        });
      } else if (user.password !== userData.password) {
        return res.status(401).json({
          message: "Invalid password",
        });
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "somethingSomething", {
          expiresIn: "1h",
        });

        return res.status(200).json({
          message: "LoggedIn",
          token: token,
          user: user,
        });
      }
    })
    .catch((err) => {
      return res.json({
        message: err.message,
      });
    });
};
module.exports = {
  register,
  login,
  verifyToken,
};
