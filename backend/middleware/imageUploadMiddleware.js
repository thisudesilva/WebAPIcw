// middleware/imageUploadMiddleware.js
const multer = require("multer");

const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });

module.exports = upload;
