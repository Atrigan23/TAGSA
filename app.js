const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const userRouter = require("./routes/users");
const photoRouter = require("./routes/photos");
const { json } = require("body-parser");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://tagsa:" +
      process.env.DB_PASSWORD +
      "@tagsa-user-shard-00-00.uxrul.mongodb.net:27017,tagsa-user-shard-00-01.uxrul.mongodb.net:27017,tagsa-user-shard-00-02.uxrul.mongodb.net:27017/" +
      process.env.DB_NAME +
      "?ssl=true&replicaSet=atlas-qwr5uo-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useMongoClient: true,
    }
  );
};

connectDB();

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(json());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/users", userRouter);
app.use("/photos", photoRouter);

app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
