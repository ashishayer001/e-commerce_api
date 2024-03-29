import express, { json } from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.route.js";
import productRoutes from "./product/product.routes.js";

const app = express();

// to make app understand json
app.use(express.json());

//connect database
connectDB();

//register routes
app.use(userRoutes);
app.use(productRoutes);

//server  and network port
const port = 8000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
