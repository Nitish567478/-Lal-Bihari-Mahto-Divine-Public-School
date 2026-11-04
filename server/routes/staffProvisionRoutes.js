const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { readStore, writeStore } = require('../utils/fileStore');

function generateTeacherUsername(fullName, existingStaff = []) {
  const base = fullName.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8) || 'teacher';
  let candidate = `tch_${base}`;
  let count = 1;

  while (existingStaff.some(s => s.username === candidate)) {
    candidate = `tch_${base}${count++}`;
  }
  return candidate;
}

function generateTeacherPassword() {
  const num = 1000 + Math.floor(Math.random() * 9000);
  return `Teach#${num}`;
}

// -----------------------------------------------------------------------------
// POST /api/admin/staff/provision
// Super Admin Staff Manual Provisioning Tool
// -----------------------------------------------------------------------------
router.post('/admin/staff/provision', async (req, res) => {
  try {
    const {
      fullName,
      subject,
      department,
      designation,
      assignedClasses,
      phone,
      email
    } = req.body || {};

    if (!fullName || !subject) {
      return res.status(400).json({
        ok: false,
        error: 'Teacher full name and primary teaching subject are mandatory.'
      });
    }

    const store = readStore();
    const existingStaff = store.staff || [];

    // Generate unique username & password
    const username = generateTeacherUsername(fullName, existingStaff);
    const password = generateTeacherPassword();
    const passwordHash = await bcrypt.hash(password, 10);

    const newStaffMember = {
      id: `stf-${Date.now()}`,
      username,
      fullName: fullName.trim(),
      subject: subject.trim(),
      department: department || 'Secondary & Senior Wing',
      designation: designation || 'TGT Subject Mentor',
      assignedClasses: Array.isArray(assignedClasses) ? assignedClasses : (assignedClasses ? [assignedClasses] : ['Class 10-A']),
      phone: phone || '+91 94313 00000',
      email: email || `${username}@lbmdps.edu.in`,
      status: 'Active',
      provisionedBy: 'superadmin',
      provisionedAt: new Date().toISOString(),
      tempPassword: password // Presented to super admin for distribution
    };

    store.staff = [newStaffMember, ...existingStaff];

    // Seed into auth store
    store.content = store.content || {};
    store.content.users = store.content.users || [];
    store.content.users.push({
      username,
      password,
      role: 'teacher',
      name: fullName,
      status: 'Active',
      createdAt: new Date().toISOString()
    });

    writeStore(store);

    res.status(201).json({
      ok: true,
      message: `Teacher ${fullName} provisioned successfully with login credentials.`,
      staff: newStaffMember
    });
  } catch (err) {
    console.error('Staff provisioning error:', err);
    res.status(500).json({ ok: false, error: err.message || 'Provisioning failed' });
  }
});

// GET /api/admin/staff
router.get('/admin/staff', (req, res) => {
  const store = readStore();
  res.json({
    ok: true,
    staff: store.staff || []
  });
});

module.exports = router;

