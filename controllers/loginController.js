const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res, next) => {
  res.send("Hello login page");
};

module.exports = {
  login,
};
