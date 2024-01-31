import User from "../user/user.model.js";
import { extractTokenFromHeader } from "../utils/extract.token.from.header.js";
import jwt from "jsonwebtoken";

export const isSeller = async (req, res, next) => {
  const token = extractTokenFromHeader(req.headers);

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(token, "Thisissecretkey");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //find user using email from token
  const user = await User.findOne({ email: payload.email });

  // if not user
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "seller") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUserId = user._id;

  next();
};

export const isBuyer = async (req, res, next) => {
  const token = extractTokenFromHeader(req.headers);

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(token, "Thisissecretkey");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //find user using email from token
  const user = await User.findOne({ email: payload.email });

  // if not user
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "buyer") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUserId = user._id;

  next();
};

export const isUser = async (req, res, next) => {
  const token = extractTokenFromHeader(req.headers);

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(token, "Thisissecretkey");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //find user using email from token
  const user = await User.findOne({ email: payload.email });

  // if not user
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUserId = user._id;

  next();
};
