const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

// Middleware - Allow Vercel frontend, local dev, and configured origins
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
// Student tutor accepts compressed question photos as inline image data.
app.use(express.json({ limit: '5mb' }));

// Static uploaded files
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));
app.use(express.static(__dirname));

const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contentRoutes = require('./routes/contentRoutes');
const feeRoutes = require('./routes/feeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const debugRoutes = require('./routes/debugRoutes');
const portalRoutes = require('./routes/portalRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const staffProvisionRoutes = require('./routes/staffProvisionRoutes');
const crmRoutes = require('./routes/crmRoutes');
const aiChatRoutes = require('./routes/aiChatRoutes');

app.use('/api', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api', feeRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', debugRoutes);
app.use('/api', portalRoutes);
app.use('/api', enrollmentRoutes);
app.use('/api', staffProvisionRoutes);
app.use('/api', crmRoutes);
app.use('/api/ai', aiChatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'my-school-server' });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(400).json({ ok: false, error: err.message || 'Request failed' });
});

// MongoDB
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/my_school';

const { ensureDefaultAdmin } = require('./controllers/adminController');

function startServer(mode) {
  app.locals.storageMode = mode;
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Storage mode: ${mode}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please terminate existing process or choose another port.`);
    } else {
      console.error('Server listen error:', err);
    }
  });
}

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(async () => {
    console.log('MongoDB connected');
    // Seed admin credentials once DB is ready
    await ensureDefaultAdmin();
    startServer('mongodb');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.warn('Starting server with local JSON storage because MongoDB is unavailable.');
    startServer('local-file');
  });
