const express = require('express');
const router = express.Router();

router.get('/admin/login-test', (req, res) => {
  res.json({
    ok: true,
    message: 'Use POST /api/admin/login with JSON body',
    tips: {
      url: '/api/admin/login',
      method: 'POST',
      body: { username: 'admin', password: 'admin123' }
    }
  });
});

module.exports = router;

