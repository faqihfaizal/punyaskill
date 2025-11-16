const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDir = path.join(__dirname, "../../uploads/files");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname || "");
    cb(null, `file_${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file) return cb(null, true);

  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/zip",
    "video/mp4",
  ];

  const isValid = allowed.includes(file.mimetype);
  cb(isValid ? null : new Error("File tidak diizinkan."), isValid);
};

module.exports = multer({ storage, fileFilter });
