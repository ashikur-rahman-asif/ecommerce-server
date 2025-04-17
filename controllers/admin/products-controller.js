const { imageUploadUtil } = require("../../helpers/cloundinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// add a product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    console.log(averageReview, "averageReview");

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, category, band, salePrice, totalStock } =
      req.body;

    const findProductById = await Product.findById(id);
    console.log(findProductById);

    if (!findProductById) {
      return res.status(400).json({
        success: false,
        message: "Product not found!!!!",
      });
    }

    // Update product fields
    findProductById.image = image || findProductById.image;
    findProductById.title = title || findProductById.title;
    findProductById.description = description || findProductById.description;
    findProductById.category = category || findProductById.category;
    findProductById.band = band || findProductById.band;
    findProductById.salePrice = salePrice || findProductById.salePrice;
    findProductById.totalStock = totalStock || findProductById.totalStock;

    // Save updated product
    await findProductById.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: findProductById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the product by ID
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: product,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  updateProduct,
  deleteProduct,
};
