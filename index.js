const express = require("express");
const mongoose = require("mongoose");
const { register } = require("./controllers/registerController");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

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
app.use("/api/register",register)

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});