require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.C_NAME,
  api_key: process.env.C_API_KEY,
  api_secret: process.env.C_API_SECRET,
});

// Multer configuration (memory storage for direct upload to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage }); // Middleware for handling file uploads

// Function to handle image upload to Cloudinary
const imageUploadUtils = async (fileBuffer) => {
  try {
    const result = await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto", // Automatically detects file type
        },
        (error, result) => {
          if (error) throw new Error(error.message);
          return result;
        }
      )
      .end(fileBuffer);

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

module.exports = { upload, imageUploadUtils };
