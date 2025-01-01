const handleImageUpload = async (req, res) => {
  try {
    // Ensure a file is present in the request
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }
    // Call the utility function to upload the file to Cloudinary
    const uploadResult = await imageUploadUtils(req.file.buffer);

    // Respond with success and the Cloudinary result
    res.json({
      success: true,
      message: "Image uploaded successfully.",
      data: uploadResult,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Image upload failed.",
      error: error.message,
    });
  }
};

module.exports = { handleImageUpload };
