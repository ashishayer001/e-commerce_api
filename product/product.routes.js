import express from "express";
import { isSeller } from "../middleware/authentication.middleware.js";
import { productSchema } from "./product.validation.js";
import Product from "./product.model.js";
const router = express.Router();

// add product
// should be a seller
router.post(
  "/product/add",
  isSeller,
  async (req, res, next) => {
    // extract new product from req.body
    const newProduct = req.body;

    // validate new product
    try {
      const validatedData = await productSchema.validate(newProduct);

      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new product from req.body
    const newProduct = req.body;

    //get logged in user id
    const loggedInUserId = req.loggedInUserId;

    // add product
    newProduct.sellerId = loggedInUserId;

    await Product.create(newProduct);

    // send response
    return res.status(200).send({ message: "Product is added successfully." });
  }
);

export default router;
