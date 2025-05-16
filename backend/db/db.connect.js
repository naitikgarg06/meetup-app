const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initialiseDatabase = async () => {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

module.exports = { initialiseDatabase };
