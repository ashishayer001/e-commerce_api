import Yup from "yup";

export let productSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .trim()
    .max(55, "Name must be at max 55 characters."),
  company: Yup.string()
    .required("Company is required.")
    .trim()
    .max(55, "Company must be at max 55 characters."),
  price: Yup.number().min(0).required("Price is required."),
  category: Yup.string()
    .required("Category is required.")
    .trim()
    .oneOf([
      "electronics",
      "grocery",
      "clothing",
      "auto",
      "sports",
      "stationery",
      "furniture",
      "toys",
      "kitchen",
    ]),
  freeShipping: Yup.boolean().default(false),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1.")
    .required("Quantity is required."),
  description: Yup.string()
    .required("Description is required.")
    .trim()
    .max(1000, "Description must be at max 1000 characters."),
});
