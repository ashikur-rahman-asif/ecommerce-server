const express = require("express");
const {
  handleImageUpload,
} = require("../../controllers/admin/products-controller");
const { upload } = require("../../helpers/cloundinary");
const router = express.Router();

router.post("/upload-image", upload.single("file"), handleImageUpload);

module.exports = router;
