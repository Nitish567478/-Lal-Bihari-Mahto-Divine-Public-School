const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { submitApplication, listApplications } = require('../controllers/applicationController');

const router = express.Router();

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const resolvedUploadDir = path.join(__dirname, '..', uploadDir);
fs.mkdirSync(resolvedUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolvedUploadDir);
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed for photo.'));
    }
    cb(null, true);
  }
});

// Admission form sends multipart/form-data with field name: photo
router.post(
  '/submit-application',
  upload.single('photo'),
  submitApplication
);

router.get('/applications', listApplications);

module.exports = router;

