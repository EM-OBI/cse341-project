const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "cse341-project"
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectToDb;
