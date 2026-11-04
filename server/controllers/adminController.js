const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const DEFAULT_USERS = [
  { username: 'superadmin', password: process.env.SUPERADMIN_PASSWORD || 'super123', role: 'super_admin' },
  { username: process.env.ADMIN_USERNAME || 'admin', password: process.env.ADMIN_PASSWORD || 'admin123', role: 'admin' },
  { username: 'accountant', password: process.env.ACCOUNTANT_PASSWORD || 'acc123', role: 'accountant' },
  { username: 'teacher', password: process.env.TEACHER_PASSWORD || 'teach123', role: 'teacher' },
  { username: 'student', password: process.env.STUDENT_PASSWORD || 'student123', role: 'student' },
  { username: 'parent', password: process.env.PARENT_PASSWORD || 'parent123', role: 'parent' }
];

function signToken(user) {
  return jwt.sign(
    { sub: user._id ? user._id.toString() : `local-${user.username}`, username: user.username, role: user.role || 'admin' },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function mongoReady() {
  return mongoose.connection.readyState === 1;
}

// Seed default accounts (Super Admin, Admin, Accountant, Teacher)
async function ensureDefaultAdmin() {
  if (!mongoReady()) return;

  for (const user of DEFAULT_USERS) {
    let existing = await Admin.findOne({ username: user.username });
    if (!existing) {
      const passwordHash = await bcrypt.hash(user.password, 10);
      await Admin.create({ username: user.username, passwordHash, role: user.role });
      console.log(`Seeded default ${user.role}: ${user.username}`);
    }
  }
}

async function login(req, res) {
  try {
    const { username, password, requestedRole } = req.body || {};

    if (!mongoReady()) {
      const matched = DEFAULT_USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (!matched) {
        return res.status(401).json({ ok: false, error: 'Invalid username or password' });
      }

      const token = signToken({ _id: `local-${matched.username}`, username: matched.username, role: matched.role });
      return res.json({ ok: true, token, user: { username: matched.username, role: matched.role }, mode: 'local-file' });
    }

    let admin = await Admin.findOne({ username });
    if (!admin) {
      // Auto-fallback check against DEFAULT_USERS for instant seeding
      const matched = DEFAULT_USERS.find(
        (u) => u.username === username && u.password === password
      );
      if (matched) {
        const passwordHash = await bcrypt.hash(matched.password, 10);
        admin = await Admin.create({ username: matched.username, passwordHash, role: matched.role });
      } else {
        return res.status(401).json({ ok: false, error: 'Invalid username or password' });
      }
    }

    const ok = admin.passwordHash
      ? await bcrypt.compare(password || '', admin.passwordHash)
      : false;
    if (!ok) return res.status(401).json({ ok: false, error: 'Invalid username or password' });

    const token = signToken(admin);
    res.json({ ok: true, token, user: { username: admin.username, role: admin.role || 'admin' } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Login failed' });
  }
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ ok: false, error: 'Missing token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.admin = payload;
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: 'Invalid token' });
  }
}

function requireRole(allowedRoles) {
  return (req, res, next) => {
    requireAdmin(req, res, () => {
      const role = req.user?.role || 'admin';
      if (role === 'super_admin' || allowedRoles.includes(role)) {
        return next();
      }
      return res.status(403).json({ ok: false, error: `Access denied. Requires one of: ${allowedRoles.join(', ')}` });
    });
  };
}

module.exports = { login, requireAdmin, requireRole, ensureDefaultAdmin, DEFAULT_USERS };
