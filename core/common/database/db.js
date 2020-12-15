const mongoose = require("mongoose");

const connectDB = async () => {

  const MONGO_URL = process.env.MONGO_DB_URL;
  const conn = await mongoose.connect(MONGO_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // auth: { authSource: "admin" },
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
