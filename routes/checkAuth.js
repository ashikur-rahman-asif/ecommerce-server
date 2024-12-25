const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "User is authenticated",
    user,
  });
});

module.exports = router;
