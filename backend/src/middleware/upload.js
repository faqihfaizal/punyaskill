const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname || '');
        cb(null, `foto_${unique}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file) return cb(null, true);
    const ok = /jpeg|jpg|png|webp|gif/i.test(file.mimetype);
    cb (ok ? null : new Error('File harus gambar (jpeg|jpg|png|webp|gif).'), ok);
};

module.exports = multer({ storage, fileFilter });