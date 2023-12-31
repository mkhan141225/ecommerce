const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to database ${conn.connection.host}`.bgMagenta .bgWhite);
  } catch (error) {
    console.log(`Error in MongoDb ${error}`.bgRed.white);
  }
};
module.exports = connectDB;
 