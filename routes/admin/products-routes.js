const express = require("express");
const { upload } = require("../../helpers/cloundinary");
const {
  handleImageUpload,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchAllProducts,
} = require("../../controllers/admin/products-controller");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

module.exports = router;
