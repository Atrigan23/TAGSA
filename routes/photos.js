const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

const PhotoController = require("../controllers/photos");

require("dotenv").config();

router.get("/searchPhoto/:imagename", PhotoController.searchPhoto);

router.get("/getAllPhotoInfo", PhotoController.getAllPhotoInfo);

router.get("/getAllPhotos", PhotoController.getAllPhotos);


router.patch("/createPhoto/:username", upload.single("image"), PhotoController.createPhoto);

router.get("/getPhotosInfo/:username", PhotoController.getPhotosInfo);

router.patch("/updatephoto/:username/:imagename", PhotoController.updatePhoto);

router.patch("/deletephoto/:username/:imagename", PhotoController.deletePhoto);

module.exports = router;
