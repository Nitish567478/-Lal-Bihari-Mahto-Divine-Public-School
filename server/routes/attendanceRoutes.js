const express = require('express');
const router = express.Router();
const fileStore = require('../utils/fileStore');

function getAttendanceRecords() {
  const stored = fileStore.getContent('standaloneAttendanceRecords');
  return Array.isArray(stored) ? stored : [];
}

function saveAttendanceRecords(records) {
  fileStore.setContent('standaloneAttendanceRecords', records);
}

router.get('/attendance', (req, res) => {
  const { className, date } = req.query;
  const attendanceRecords = getAttendanceRecords();
  const filtered = attendanceRecords.filter((r) => {
    if (className && r.className !== className) return false;
    if (date && r.date !== date) return false;
    return true;
  });
  res.json({ ok: true, records: filtered });
});

router.post('/attendance', (req, res) => {
  const { className, date, students } = req.body || {};
  if (!className || !students) {
    return res.status(400).json({ ok: false, error: 'Missing className or students payload' });
  }

  const attendanceRecords = getAttendanceRecords();
  const record = {
    id: `ATT-${Date.now()}`,
    className,
    date: date || new Date().toISOString().split('T')[0],
    students,
    updatedAt: new Date().toISOString()
  };

  // Upsert record for the class and date
  const existingIdx = attendanceRecords.findIndex(
    (r) => r.className === className && r.date === record.date
  );

  if (existingIdx >= 0) {
    attendanceRecords[existingIdx] = record;
  } else {
    attendanceRecords.push(record);
  }

  saveAttendanceRecords(attendanceRecords);
  res.status(201).json({ ok: true, record });
});

module.exports = router;
