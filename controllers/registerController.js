const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { checkIfUserExists, hashPassword } = require("../helpers/authHelpers");

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  console.log("Request Body:", req.body);

  try {
    // Validate input
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await checkIfUserExists(userName, email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this username or email",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      {
        id: savedUser._id,
        userName: savedUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Registration error:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
      error: error.message, // Send the error message for debugging
    });
  }
};

module.exports = {
  register,
};
