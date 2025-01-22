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
  const { image, title, description, category, band, salePrice, totalStock } =
    req.body;
  console.log(req.body);

  try {
    // validate the inputs
    if (
      !image ||
      !title ||
      !description ||
      !category ||
      !band ||
      !salePrice ||
      !totalStock
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      band,
      salePrice,
      totalStock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// fetch all product
const fetchAllProducts = async (req, res) => {
  try {
    const getProduct = Product.find({});
    res.status(200).json({
      success: true,
      data: getProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  updateProduct,
  deleteProduct,
};
