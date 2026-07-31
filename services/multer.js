const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
  try {
    const response = await cloudinary.uploader.upload(filePath);
    return response.secure_url;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// local directory project folder path
const multerHandler = multer({ dest: "assets/images/" });
module.exports = { multerHandler, uploadImage };
