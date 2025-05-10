const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoute");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const checkAuth = require("./routes/checkAuth");
const adminProductUpload = require("./routes/admin/products-routes");

const shopProductsRouter = require("./routes/shop/products-route");
const shopCartRouter = require("./routes/shop/cart-routes");

require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// database connection with mongoose
const dbURL = process.env.DB_URI;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("momgoose connect successfully");
  })
  .catch((error) => console.error("MongoDB connection error:", error));

app.get("/", (req, res) => {
  res.send("Hello server");
});

// route
app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRoute);
app.use("/api/auth", logoutRoute);
app.use("/api/auth", checkAuth);

//  admin route
app.use("/api/admin/products", adminProductUpload);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
