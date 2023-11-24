// const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const authentication = async function (req, res, next) {
  try {


    const token = req.body.token
    // console.log('token', req.body.token);
    // const token = req.rawHeaders[1].replace("Bearer ", "");

    // this lines not running at any time
    // if (!token) return res.status(400).send({ status: false, message: "required token" });

    jwt.verify(token, "FunctionUp Group No 57", function (err, decoded) {
      if (err) {
        console.log(err.message);

        return res.status(401).send({ status: false, message: 'Authentication Failed!!' })
      }

      // console.log('decoded.userId', decoded.userId);
      req.userId = decoded.userId;

      next();
    });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};




async function authorization(req, res, next) {

  try {
    userId = req.params.userId;

    if (userId === ":userId") return res.status(400).send({ status: false, message: "userId required" });

    if (!ObjectId.isValid(userId)) return res.status(400).send({ status: false, message: "Please Enter Valid userId" });

    if (req.decoded.userId !== userId) return res.status(403).send({ status: false, message: "not authorized" });

    next();

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}

module.exports = { authentication, authorization }