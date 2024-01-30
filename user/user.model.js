import mongoose from "mongoose";

//set schema

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  lastName: { type: String, required: true, maxlength: 25, trim: true },
  email: {
    type: String,
    trim: true,
    maxlength: 55,
    lowercase: true,
    unique: true,
  },
  password: { type: String, trim: true, required: true },
  dbo: { type: Date, required: false, default: null },
  gender: {
    type: String,
    required: false,
    default: null,
    trim: true,
    enum: ["male", "female", "other"],
  },
  role: {
    type: String,
    required: true,
    enum: ["buyer", "seller"],
  },
});

// create table
const User = mongoose.model("User", userSchema);
export default User;
