const express = require('express');
const { getContent } = require('../controllers/contentController');

const router = express.Router();

// Public content lookup for pages
router.get('/:key', getContent);

module.exports = router;
