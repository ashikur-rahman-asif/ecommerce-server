const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { checkIfUserExists, hashPassword } = require("../helpers/authHelpers");

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  console.log(req.body);

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await checkIfUserExists(userName, email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this username or email",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        id: savedUser._id,
        userName: savedUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // success
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

module.exports = {
  register,
};
