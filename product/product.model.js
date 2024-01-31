import  mongoose, { Schema }  from "mongoose";

// set rule
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "electronics",
      "grocery",
      "clothing",
      "auto",
      "sports",
      "stationery",
      "furniture",
      "toys",
      "kitchen",
    ],
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  freeShipping: {
    type: Boolean,
    required: false,
    default: false,
  },

  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

// create table
const Product = mongoose.model("Product", productSchema);

export default Product;