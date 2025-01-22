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

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    // Await the result of the find operation
    const getProduct = await Product.find({});

    if (getProduct.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found!",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: getProduct,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
