const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    dob: { type: String, default: '' },
    classApplying: { type: String, required: true },
    previousSchool: { type: String, default: '' },

    parentName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    address: { type: String, default: '' },

    additionalInfo: { type: String, default: '' },

    aadharNumber: { type: String, default: '' },
    photo: { type: String, default: '' }, // stored filename

    city: { type: String, default: '' },
    district: { type: String, default: '' },
    state: { type: String, default: '' },
    pinCode: { type: String, default: '' },

    category: { type: String, default: '' },

    fatherOccupation: { type: String, default: '' },
    motherOccupation: { type: String, default: '' },
    nationality: { type: String, default: 'Indian' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', ApplicationSchema);

