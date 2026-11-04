const Application = require('../models/Application');
const mongoose = require('mongoose');
const fileStore = require('../utils/fileStore');

function pick(obj, keys) {
  const out = {};
  for (const k of keys) out[k] = obj[k];
  return out;
}

function mongoReady() {
  return mongoose.connection.readyState === 1;
}

async function submitApplication(req, res) {
  try {
    // multer parses multipart fields into req.body
    const body = req.body || {};

    // photo filename or null
    const photo = req.file ? req.file.filename : undefined;

    const payload = {
      studentName: body.studentName,
      dob: body.dob,
      classApplying: body.classApplying,
      previousSchool: body.previousSchool,

      parentName: body.parentName,
      phone: body.phone,
      email: body.email,
      address: body.address,

      additionalInfo: body.additionalInfo,

      aadharNumber: body.aadharNumber,
      photo,

      city: body.city,
      district: body.district,
      state: body.state,
      pinCode: body.pinCode,

      category: body.category,

      fatherOccupation: body.fatherOccupation,
      motherOccupation: body.motherOccupation,
      nationality: body.nationality
    };

    if (!mongoReady()) {
      const saved = fileStore.addApplication(payload);
      return res.status(201).json({
        ok: true,
        applicationId: saved._id,
        mode: 'local-file'
      });
    }

    const saved = await Application.create(payload);

    res.status(201).json({
      ok: true,
      applicationId: saved._id
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, error: err.message || 'Submission failed' });
  }
}

async function listApplications(req, res) {
  try {
    if (!mongoReady()) {
      return res.json({ ok: true, items: fileStore.listApplications(), mode: 'local-file' });
    }

    const items = await Application.find().sort({ createdAt: -1 }).limit(100);
    res.json({ ok: true, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to fetch applications' });
  }
}

module.exports = { submitApplication, listApplications };

