import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import config from "./config/config";
import Mongoose from "mongoose";
const log = require("simple-node-logger").createSimpleLogger();
import index from "./routes/index";
const cors = require("cors");
const https = require("https");
const fs = require("fs");
// import { saveRequests } from './common/common';

// * local mongo config

Mongoose.connect(
  config[config.ENV].DATABASE.URI +
    ":" +
    config[config.ENV].DATABASE.PORT +
    "/" +
    config[config.ENV].DATABASE.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then((result) => {
    log.info("DATABASE CONNECTED");
  })
  .catch(log.error);
//* heroku mongo config

// Mongoose.connect(config[config.ENV].DATABASE.URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then((result) => {
//     log.info("DATABASE CONNECTED");
//   })
//   .catch(log.error);

var app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// image upload
app.use(express.static("./public"));
app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname, "public")));
// app.use(saveRequests);
app.use("", index);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ message: err });
});

// //* local host port config

app.listen(config.PORT, () => {
  log.info(`APP IS RUNNING ${config.PORT} `);
});

// ssl server port(httpsServer) port config

// * heroku port config

// app.listen(process.env.PORT || 3000, () => {
//   log.info(`APP IS RUNNING ${config.PORT} `);
// });
