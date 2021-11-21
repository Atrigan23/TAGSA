const Photo = require("../models/user");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

exports.createPhoto = (req, res, next) => {
  Photo.updateOne(
    { username: req.params.username },
    { $push: { photos: req.body } }
  )
    .exec()
    .then((result) => {
      res.status(201).json({
        message: "photo created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getPhotosInfo = (req, res, next) => {
  Photo.find({ username: req.params.username })
    .select("photos")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(201).json({
          content: doc,
          message: "Photo info found",
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

exports.getAllPhotos = async (req, res, next) => {
  const CLOUD_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/resources/image`;

  const auth = {
    username: process.env.API_KEY,
    password: process.env.API_SECRET,
  };

  const response = await axios.get(CLOUD_URL, {auth})
  return res.send(response.data);
};

exports.getAllPhotoInfo = (req, res, next) => {
  Photo.find()
    .select("photos")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(201).json({
          content: doc,
          message: "All photo info found",
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

exports.updatePhoto = (req, res, next) => {
  Photo.updateOne(
    { username: req.params.username, "photos.imagename": req.params.imagename },
    { $set: { "photos.$": req.body } }
  )
    .exec()
    .then((result) => {
      res.status(201).json({
        message: "Photo updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deletePhoto = (req, res, next) => {
  Photo.updateOne(
    { username: req.params.username },
    { $pull: { photos: { imagename: req.params.imagename } } },
    { safe: true }
  )
    .exec()
    .then((result) => {
      res.status(201).json({
        message: "Photo deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
