const mongoose = require("mongoose");
const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.DATA_BASE_URI);
    console.log("connect to data base");
  } catch (error) {
    console.log(error);
    console.log("error");
  }
};
module.exports = connectToDataBase;
