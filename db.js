// const { default: mongoose } = require("mongoose")
// const MONGO_DB = process.env.MONGO_DB
const dotenv = require ('dotenv')
dotenv.config();
const mongoose = require("mongoose");

mongoose.set('bufferCommands', false);

// const mongoURI = {MONGO_DB}
const connectTOMongo = async () => {
    try {
       await mongoose.connect(process.env.MONGO_DB);
      } catch (error) {
        handleError(error);
      }
}
module.exports = connectTOMongo