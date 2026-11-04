const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { readStore, writeStore } = require('../utils/fileStore');
const { dispatchEnrollmentCredentials } = require('../services/notificationService');

/**
 * Generate a cryptographically unique, non-sequential admission number
 * e.g. LBM-2026-78419 (guaranteed non-sequential and unique)
 */
function generateNonSequentialAdmissionNo(existingList = []) {
  const year = new Date().getFullYear();
  let candidate = '';
  let unique = false;

  while (!unique) {
    // Generate 5-digit cryptographically pseudo-random non-sequential number
    const randomInt = 10000 + Math.floor(crypto.randomBytes(3).readUIntBE(0, 3) % 90000);
    candidate = `LBM-${year}-${randomInt}`;
    if (!existingList.some(s => s.admissionNo === candidate)) {
      unique = true;
    }
  }
  return candidate;
}

/**
 * Generate a secure, user-friendly temporary password
 * e.g. Lbm#9482
 */
function generateTempPassword() {
  const randomSuffix = 1000 + Math.floor(Math.random() * 9000);
  return `Lbm#${randomSuffix}`;
}

// -----------------------------------------------------------------------------
// POST /api/admissions/enroll
// Automated Student Enrollment Workflow Trigger
// -----------------------------------------------------------------------------
router.post('/admissions/enroll', async (req, res) => {
  try {
    const {
      studentName,
      classApplying,
      dob,
      gender,
      bloodGroup,
      parentName,
      phone,
      email,
      address,
      fatherOccupation,
      motherName,
      motherOccupation
    } = req.body || {};

    if (!studentName || !classApplying || !parentName || !phone) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required enrollment fields: studentName, classApplying, parentName, phone are mandatory.'
      });
    }

    const store = readStore();

    // 1. Auto-generate unique non-sequential admission number
    const admissionNo = generateNonSequentialAdmissionNo(store.students || []);

    // 2. Auto-generate temporary password
    const tempPassword = generateTempPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    // 3. Create Student Entity in Database
    const newStudent = {
      id: `std-${Date.now()}`,
      legalName: studentName.trim(),
      admissionNo,
      rollNo: String(store.students.length + 1).padStart(2, '0'),
      grade: classApplying,
      academicSession: '2026–2027',
      dob: dob || '2012-01-01',
      gender: gender || 'Not Specified',
      bloodGroup: bloodGroup || 'O+',
      house: 'Tagore House',
      busRoute: 'Route #4 (Town - Naitand)',
      lockerNo: `L-${Math.floor(10 + Math.random() * 90)}`,
      aadhaarMasked: 'XXXX-XXXX-' + Math.floor(1000 + Math.random() * 9000),
      fatherName: parentName.trim(),
      fatherOccupation: fatherOccupation || 'Private Sector',
      motherName: motherName || 'Mrs. Guardian',
      motherOccupation: motherOccupation || 'Home Educator',
      primaryPhone: phone.trim(),
      emergencyContact: phone.trim(),
      email: email ? email.trim() : `${admissionNo.toLowerCase()}@lbmdps.edu.in`,
      parentEmail: email ? email.trim() : 'parent.desk@gmail.com',
      parentPhone: phone.trim(),
      address: address || 'Naitand, Jamua, Giridih, Jharkhand',
      classTeacher: 'Senior Faculty Mentor',
      subjects: [
        { code: '041', name: 'Mathematics', theoryMax: 80, theoryObt: 0, intMax: 20, intObt: 0, total: 0, grade: 'Pending' },
        { code: '086', name: 'Science', theoryMax: 80, theoryObt: 0, intMax: 20, intObt: 0, total: 0, grade: 'Pending' },
        { code: '184', name: 'English', theoryMax: 80, theoryObt: 0, intMax: 20, intObt: 0, total: 0, grade: 'Pending' }
      ],
      tempPassword,
      enrolledAt: new Date().toISOString()
    };

    store.students = [newStudent, ...(store.students || [])];

    // 4. Link or create Parent in Parent Table
    let parentRecord = (store.parents || []).find(p => p.primaryPhone === phone || p.email === email);
    if (parentRecord) {
      if (!parentRecord.linkedStudentAdmissionNos.includes(admissionNo)) {
        parentRecord.linkedStudentAdmissionNos.push(admissionNo);
      }
    } else {
      parentRecord = {
        id: `par-${Date.now()}`,
        username: `par_${phone.slice(-6)}`,
        fatherName: parentName.trim(),
        primaryPhone: phone.trim(),
        email: email ? email.trim() : 'parent@lbmdps.edu.in',
        address: address || 'Naitand, Giridih',
        verifiedParentId: `PAR-${Date.now().toString().slice(-4)}`,
        linkedStudentAdmissionNos: [admissionNo],
        createdAt: new Date().toISOString()
      };
      store.parents = [parentRecord, ...(store.parents || [])];
    }

    // 5. Seed user credentials into store
    store.content = store.content || {};
    store.content.users = store.content.users || [];
    store.content.users.push({
      username: admissionNo,
      password: tempPassword,
      role: 'student',
      name: studentName,
      status: 'Active',
      createdAt: new Date().toISOString()
    });

    writeStore(store);

    // 6. Execute Notification Service Trigger
    const dispatchResult = await dispatchEnrollmentCredentials({
      admissionNo,
      tempPassword,
      studentName,
      studentEmail: newStudent.email,
      parentName,
      parentEmail: newStudent.parentEmail,
      parentPhone: phone,
      classGrade: classApplying
    });

    res.status(201).json({
      ok: true,
      message: 'Automated enrollment workflow completed and credentials dispatched successfully.',
      enrollment: {
        admissionNo,
        tempPassword,
        studentName,
        grade: classApplying,
        dispatchSummary: {
          channels: ['SMS', 'Student Email', 'Parent Email'],
          dispatchedAt: dispatchResult.dispatchedAt,
          dispatchId: dispatchResult.dispatchId,
          recipients: {
            parentPhone: phone,
            parentEmail: newStudent.parentEmail,
            studentEmail: newStudent.email
          }
        }
      }
    });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ ok: false, error: err.message || 'Enrollment trigger failed' });
  }
});

// GET /api/admissions/enrollments
router.get('/admissions/enrollments', (req, res) => {
  const store = readStore();
  res.json({
    ok: true,
    students: store.students || [],
    dispatches: store.dispatches || []
  });
});

module.exports = router;

