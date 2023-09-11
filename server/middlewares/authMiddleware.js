const JWT = require("jsonwebtoken");

const userModel = require("../models/userModel.js");

//Protected Routes token base
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    //decode the user 
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "you are not authorized as an Admin",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { requireSignIn, isAdmin };
