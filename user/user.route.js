import express from "express";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "./user.validation.js";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//!register user
router.post(
  "/user/register",
  async (req, res, next) => {
    //extract user from req.body
    const newUser = req.body;

    //validate user data
    try {
      const validatedData = await registerUserValidationSchema.validate(
        newUser
      );
      req.body = validatedData;
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
    next();
  },
  async (req, res) => {
    // extract newUser from req.body
    const newUser = req.body;

    // find user using email
    const user = await User.findOne({ emil: newUser.email });

    // if user,throw error
    if (user) {
      return res.status(401).send({ message: "user is already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    // console.log(hashedPassword);

    // create user
    await User.create(newUser);

    // send response
    return res
      .status(201)
      .send({ message: "user is created successfully", user: User });
  }
);

//! login
router.post(
  "/user/login",
  async (req, res, next) => {
    const loginCredentials = req.body;

    try {
      const validatedData = await loginUserValidationSchema.validate(
        loginCredentials
      );
      req.body = validatedData;
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
    next();
  },
  async (req, res) => {
    // console.log(req.body);

    //extract user credential from req.body
    const loginCredentials = req.body;

    // find user with email
    const user = await User.findOne({ email: loginCredentials.email });
    // if not user,throw error
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials" });
    }
    // console.log(user);
    // check password match
    const isPasswordMatch = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );
    // console.log(match);
    // if not password match,throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credentials" });
    }
    //generate token
    const token = jwt.sign({ email: user.email }, "Thisissecretkey");
    // generate response
    user.password = undefined;
    return res
      .status(200)
      .send({ message: "logged in", user: user, token: token });
  }
);
// account detail
export default router;
