const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { login, requireAdmin } = require('../controllers/adminController');
const {
  getContent,
  upsertContent
} = require('../controllers/contentController');

const router = express.Router();

// Image upload storage for admin
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const resolvedUploadDir = path.join(__dirname, '..', uploadDir);
fs.mkdirSync(resolvedUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: resolvedUploadDir,
  filename(req, file, cb) {
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, safeName);
  }
});

const upload = multer({ storage });

router.post('/login', login);

// CMS content - admin only
router.get('/content/:key', requireAdmin, getContent);
router.post('/content/:key', requireAdmin, upsertContent);

router.post('/upload-image', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: 'Missing file upload' });
  }

  const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
  const url = `${serverUrl}/uploads/${encodeURIComponent(req.file.filename)}`;
  res.json({ ok: true, url });
});

module.exports = router;

