const Users = require("../models/user");
const mongoose = require("mongoose");
const { creatHash, createHash } = require("crypto");

exports.createUser =  (req, res, next) => {
  Users.find({ username: req.body.username })
    .exec()
    .then(() => {
      const hashedPassword = createHash("md5")
        .update(req.body.password)
        .digest("hex");

      const user = new Users({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
        photos: [],
      });

      user
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({
            message: "User created",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    });
};

exports.getUser =  (req, res, next) => {
   Users.find({ username: req.params.username })
    .select("username name surname email")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(201).json({
          doc,
          message: "User found",
        });
      } else {
        res.status(404).json({
          message: "Entry not found in database",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
