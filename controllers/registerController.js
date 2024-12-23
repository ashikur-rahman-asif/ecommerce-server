const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User=require("../models/User")

const register = async (req, res, next) => {
  const { userName, email, passowrd } = req.body;
  try {

  } catch (error) {
    res.status(500).json({
        success:false,
        message:"Error occured"
    })
  }
};
