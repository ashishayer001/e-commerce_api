import mongoose from "mongoose";

const dbUserName = "ashishayer";
const dbPassword = "hellomongo";
const dbName = "e-commerce";
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.whlrgtz.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("DB connection success");
  } catch (error) {
    console.log("DB connection failed..");
    console.log(error.message);
  }
};

export default connectDB;
