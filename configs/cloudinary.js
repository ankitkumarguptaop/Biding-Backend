const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { Readable } = require("stream");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF and WebP are allowed."), false);
    }
  },
});

const uploadToCloudinary = (buffer, folder = "bidding-system/users") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    
    const readableStream = Readable.from(buffer);
    readableStream.pipe(uploadStream);
  });
};

module.exports = { cloudinary, upload, uploadToCloudinary };
