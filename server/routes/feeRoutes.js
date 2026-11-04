const express = require('express');
const router = express.Router();
const fileStore = require('../utils/fileStore');

// Default initial fee receipts
const defaultFeeRecords = [
  { id: 'REC-101', studentName: 'Aarav Kumar', rollNo: '101', className: 'Class 10', month: 'August', amount: 3500, mode: 'Online UPI', date: '2026-08-28', status: 'Paid' },
  { id: 'REC-102', studentName: 'Sneha Kumari', rollNo: '102', className: 'Class 9', month: 'August', amount: 4500, mode: 'Cash', date: '2026-08-27', status: 'Paid' },
  { id: 'REC-103', studentName: 'Rahul Verma', rollNo: '103', className: 'Class 8', month: 'August', amount: 3000, mode: 'Cheque', date: '2026-08-26', status: 'Paid' }
];

function getFeeRecords() {
  const stored = fileStore.getContent('standaloneFeeRecords');
  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  return defaultFeeRecords;
}

function saveFeeRecords(records) {
  fileStore.setContent('standaloneFeeRecords', records);
}

router.get('/fees', (req, res) => {
  res.json({ ok: true, records: getFeeRecords() });
});

router.post('/fees', (req, res) => {
  const { studentName, rollNo, className, month, amount, mode } = req.body || {};
  if (!studentName || !amount) {
    return res.status(400).json({ ok: false, error: 'Missing required studentName or amount' });
  }

  const currentRecords = getFeeRecords();
  const newReceipt = {
    id: `REC-${Date.now().toString().slice(-5)}`,
    studentName,
    rollNo: rollNo || 'N/A',
    className: className || 'Class 10',
    month: month || 'August',
    amount: Number(amount),
    mode: mode || 'Cash',
    date: new Date().toISOString().split('T')[0],
    status: 'Paid'
  };

  const updatedRecords = [newReceipt, ...currentRecords];
  saveFeeRecords(updatedRecords);
  res.status(201).json({ ok: true, receipt: newReceipt });
});

module.exports = router;
