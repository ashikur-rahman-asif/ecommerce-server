const bcrypt = require("bcryptjs");
const User = require("../models/User");

const checkIfUserExists = async (userName, email) => {
  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  return existingUser;
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (plainPassword, hashdPassword) => {
  const isMatch = bcrypt.compare(plainPassword, comparedPassword);
  return isMatch;
};

module.exports = {
  checkIfUserExists,
  hashPassword,
  comparePassword,
};
