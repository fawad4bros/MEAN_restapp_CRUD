module.exports = function createServer() {
  const express = require("express");
  const cors = require("cors");
  const { json } = require("body-parser");
  const mongoose = require("mongoose");
  const { db } = require("../lib/config/config");
  const apis = require("../apis/api");
  const app = express();

  const corsOptions = {
    origin: "http://localhost:4200",
  };
  app.use(cors(corsOptions)); //Accepting requests from this domain
  app.use("/upload", express.static("./public/images"));
  app.use(json()); //server accept JSON data
  app.use(express.urlencoded({ extended: true })); //if true: object as string/arrays
  app.use(apis);

  mongoose.connect(db, (err) => {
    if (err) {
      console.error("Error Found! " + err);
    } else {
      console.log("Connected to mongoDB");
    }
  });
  return app;
};
