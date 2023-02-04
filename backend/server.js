import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// app.get("/api/config/paypal", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`.bgYellow
      .bold
  )
);
