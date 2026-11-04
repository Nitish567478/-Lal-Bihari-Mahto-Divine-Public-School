const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.join(__dirname, '..', 'data');
const storePath = path.join(dataDir, 'local-store.json');

function ensureStore() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify({ content: {}, applications: [], students: [], parents: [], staff: [], crmLeads: [], attendanceLogs: [], feeLedger: [], dispatches: [] }, null, 2));
  }
}

function readStore() {
  ensureStore();
  try {
    const raw = fs.readFileSync(storePath, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      content: parsed.content || {},
      applications: Array.isArray(parsed.applications) ? parsed.applications : [],
      students: Array.isArray(parsed.students) ? parsed.students : [],
      parents: Array.isArray(parsed.parents) ? parsed.parents : [],
      staff: Array.isArray(parsed.staff) ? parsed.staff : [],
      crmLeads: Array.isArray(parsed.crmLeads) ? parsed.crmLeads : [],
      attendanceLogs: Array.isArray(parsed.attendanceLogs) ? parsed.attendanceLogs : [],
      feeLedger: Array.isArray(parsed.feeLedger) ? parsed.feeLedger : [],
      dispatches: Array.isArray(parsed.dispatches) ? parsed.dispatches : []
    };
  } catch (err) {
    return { content: {}, applications: [], students: [], parents: [], staff: [], crmLeads: [], attendanceLogs: [], feeLedger: [], dispatches: [] };
  }
}

function writeStore(store) {
  ensureStore();
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

function getContent(key) {
  const store = readStore();
  return store.content?.[key] || {};
}

function setContent(key, json) {
  const store = readStore();
  store.content = store.content || {};
  store.content[key] = json;
  writeStore(store);
  return json;
}

function listApplications() {
  const store = readStore();
  return store.applications || [];
}

function addApplication(payload) {
  const store = readStore();
  const item = {
    _id: `local-${Date.now()}`,
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.applications = [item, ...(store.applications || [])];
  writeStore(store);
  return item;
}

// -----------------------------------------------------------------------------
// SEED INITIAL DATABASE RECORDS (Students, Linked Parents, Attendance, Fees)
// -----------------------------------------------------------------------------
function seedDatabaseIfEmpty() {
  const store = readStore();
  let modified = false;

  // Initial Real Student Table
  if (!store.students || store.students.length === 0) {
    store.students = [
      {
        id: 'std-1001',
        legalName: 'Aarav Kumar',
        admissionNo: 'LBM-2023-1041',
        rollNo: '01',
        grade: 'Class 10-A',
        academicSession: '2026–2027',
        dob: '2011-05-14',
        gender: 'Male',
        bloodGroup: 'B+',
        house: 'Tagore House (Red)',
        busRoute: 'Route #4 (Giridih Town - Pachamba - Naitand)',
        lockerNo: 'B-24',
        aadhaarMasked: 'XXXX-XXXX-8921',
        fatherName: 'Mr. Sunil Kumar',
        fatherOccupation: 'Executive Civil Engineer',
        motherName: 'Mrs. Anita Devi',
        motherOccupation: 'High School Educator',
        primaryPhone: '+91 94313 78901',
        emergencyContact: '+91 98351 22419',
        email: 'aarav.student@lbmdps.edu.in',
        parentEmail: 'sunil.kumar.pwd@gmail.com',
        parentPhone: '+91 94313 78901',
        address: 'H.No 42, Shanti Nagar, Near Jamua Road, Naitand, Giridih - 815318',
        classTeacher: 'Mr. R.K. Sharma',
        subjects: [
          { code: '041', name: 'Mathematics', theoryMax: 80, theoryObt: 75, intMax: 20, intObt: 19, total: 94, grade: 'A1', remarks: 'Exceptional mathematical rigor' },
          { code: '086', name: 'Science', theoryMax: 80, theoryObt: 76, intMax: 20, intObt: 20, total: 96, grade: 'A1', remarks: 'Outstanding analytical & lab skills' },
          { code: '184', name: 'English Communicative', theoryMax: 80, theoryObt: 72, intMax: 20, intObt: 19, total: 91, grade: 'A1', remarks: 'Eloquent prose and rich vocabulary' },
          { code: '002', name: 'Hindi Course-A', theoryMax: 80, theoryObt: 74, intMax: 20, intObt: 18, total: 92, grade: 'A1', remarks: 'Neat calligraphy & strong grammar' },
          { code: '087', name: 'Social Science', theoryMax: 80, theoryObt: 75, intMax: 20, intObt: 19, total: 94, grade: 'A1', remarks: 'Deep grasp of historical timeline' },
          { code: '165', name: 'Computer Applications', theoryMax: 50, theoryObt: 48, intMax: 50, intObt: 50, total: 98, grade: 'A1', remarks: 'First class programming capabilities' }
        ],
        createdAt: '2023-04-10T10:00:00.000Z'
      },
      {
        id: 'std-1002',
        legalName: 'Ananya Kumar',
        admissionNo: 'LBM-2025-0614',
        rollNo: '14',
        grade: 'Class 6-B',
        academicSession: '2026–2027',
        dob: '2015-08-22',
        gender: 'Female',
        bloodGroup: 'O+',
        house: 'Ashoka House (Green)',
        busRoute: 'Route #4 (Giridih Town - Pachamba - Naitand)',
        lockerNo: 'M-12',
        aadhaarMasked: 'XXXX-XXXX-4412',
        fatherName: 'Mr. Sunil Kumar',
        fatherOccupation: 'Executive Civil Engineer',
        motherName: 'Mrs. Anita Devi',
        motherOccupation: 'High School Educator',
        primaryPhone: '+91 94313 78901',
        emergencyContact: '+91 98351 22419',
        email: 'ananya.student@lbmdps.edu.in',
        parentEmail: 'sunil.kumar.pwd@gmail.com',
        parentPhone: '+91 94313 78901',
        address: 'H.No 42, Shanti Nagar, Near Jamua Road, Naitand, Giridih - 815318',
        classTeacher: 'Mrs. Vandana Kumari',
        subjects: [
          { code: '041', name: 'Mathematics', theoryMax: 80, theoryObt: 70, intMax: 20, intObt: 18, total: 88, grade: 'A2', remarks: 'Practicing fractions and algebra daily' },
          { code: '086', name: 'General Science', theoryMax: 80, theoryObt: 75, intMax: 20, intObt: 19, total: 94, grade: 'A1', remarks: 'Loves nature & science experiments' },
          { code: '184', name: 'English Literature', theoryMax: 80, theoryObt: 74, intMax: 20, intObt: 19, total: 93, grade: 'A1', remarks: 'Enthusiastic reader and story writer' },
          { code: '002', name: 'Hindi Vyakaran', theoryMax: 80, theoryObt: 72, intMax: 20, intObt: 18, total: 90, grade: 'A1', remarks: 'Neat handwriting and spelling' },
          { code: '087', name: 'Social Studies', theoryMax: 80, theoryObt: 71, intMax: 20, intObt: 18, total: 89, grade: 'A2', remarks: 'Good understanding of maps & states' },
          { code: '165', name: 'General Knowledge & Art', theoryMax: 50, theoryObt: 47, intMax: 50, intObt: 49, total: 96, grade: 'A1', remarks: 'Talented in sketching and painting' }
        ],
        createdAt: '2025-04-12T10:00:00.000Z'
      }
    ];
    modified = true;
  }

  // Linked Parent Record
  if (!store.parents || store.parents.length === 0) {
    store.parents = [
      {
        id: 'par-5001',
        username: 'parent',
        fatherName: 'Mr. Sunil Kumar',
        fatherOccupation: 'Executive Civil Engineer (PWD Giridih)',
        motherName: 'Mrs. Anita Devi',
        motherOccupation: 'High School Educator',
        primaryPhone: '+91 94313 78901',
        email: 'sunil.kumar.pwd@gmail.com',
        address: 'H.No 42, Shanti Nagar, Near Jamua Road, Naitand, Giridih - 815318',
        verifiedParentId: 'PAR-2023-7749',
        linkedStudentAdmissionNos: ['LBM-2023-1041', 'LBM-2025-0614'],
        createdAt: '2023-04-10T10:00:00.000Z'
      }
    ];
    modified = true;
  }

  // Attendance Log Entries for dynamic calculation
  if (!store.attendanceLogs || store.attendanceLogs.length === 0) {
    const logs = [];
    // 116 days of attendance log entries for Aarav (110 Present, 6 Absent)
    for (let i = 1; i <= 116; i++) {
      const isAbsent = [14, 38, 62, 85, 99, 107].includes(i);
      logs.push({
        id: `att-log-aarav-${i}`,
        admissionNo: 'LBM-2023-1041',
        dayNumber: i,
        status: isAbsent ? 'Absent' : 'Present',
        date: `2026-${String(Math.floor(i / 30) + 6).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
      });
    }
    // 116 days for Ananya (112 Present, 4 Absent)
    for (let i = 1; i <= 116; i++) {
      const isAbsent = [22, 54, 88, 102].includes(i);
      logs.push({
        id: `att-log-ananya-${i}`,
        admissionNo: 'LBM-2025-0614',
        dayNumber: i,
        status: isAbsent ? 'Absent' : 'Present',
        date: `2026-${String(Math.floor(i / 30) + 6).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
      });
    }
    store.attendanceLogs = logs;
    modified = true;
  }

  // Financial / Fee Ledger Module
  if (!store.feeLedger || store.feeLedger.length === 0) {
    store.feeLedger = [
      {
        receiptNo: 'REC-74912',
        admissionNo: 'LBM-2023-1041',
        studentName: 'Aarav Kumar',
        className: 'Class 10-A',
        billingHead: 'Quarter 2 Tuition & Smart Class Charges',
        amount: 3850,
        paidAmount: 3850,
        dueAmount: 0,
        paymentMode: 'UPI / PhonePe',
        txnRef: 'UPI-983104-LBMDPS',
        status: 'Verified & Cleared',
        date: '2026-10-10'
      },
      {
        receiptNo: 'REC-68194',
        admissionNo: 'LBM-2025-0614',
        studentName: 'Ananya Kumar',
        className: 'Class 6-B',
        billingHead: 'Quarter 2 Tuition & Activities Fee',
        amount: 3250,
        paidAmount: 3250,
        dueAmount: 0,
        paymentMode: 'Net Banking / HDFC',
        txnRef: 'NEFT-551940-LBM',
        status: 'Verified & Cleared',
        date: '2026-10-10'
      },
      {
        receiptNo: 'REC-51208',
        admissionNo: 'LBM-2023-1041',
        studentName: 'Aarav Kumar',
        className: 'Class 10-A',
        billingHead: 'Quarter 1 Composite School & Lab Fee',
        amount: 4500,
        paidAmount: 4500,
        dueAmount: 0,
        paymentMode: 'Counter Cash Desk',
        txnRef: 'CASH-COUNTER-01',
        status: 'Verified & Cleared',
        date: '2026-07-08'
      }
    ];
    modified = true;
  }

  // Provisioned Staff Table
  if (!store.staff || store.staff.length === 0) {
    store.staff = [
      {
        id: 'stf-01',
        username: 'teacher',
        fullName: 'Mr. R.K. Sharma',
        subject: 'Senior Mathematics',
        department: 'Academic Faculty',
        designation: 'Senior Faculty / PGT Math',
        assignedClasses: ['Class 10-A', 'Class 10-B'],
        phone: '+91 94313 11223',
        email: 'rk.sharma@lbmdps.edu.in',
        status: 'Active',
        provisionedBy: 'superadmin',
        createdAt: '2024-06-01T09:00:00.000Z'
      },
      {
        id: 'stf-02',
        username: 'tch_sunitadevi',
        fullName: 'Mrs. Sunita Devi',
        subject: 'General Science',
        department: 'Science & Physics Lab',
        designation: 'TGT Science Incharge',
        assignedClasses: ['Class 9-A', 'Class 10-A'],
        phone: '+91 94313 44556',
        email: 'sunita.devi@lbmdps.edu.in',
        status: 'Active',
        provisionedBy: 'superadmin',
        createdAt: '2024-06-05T09:00:00.000Z'
      }
    ];
    modified = true;
  }

  // CRM Leads Table
  if (!store.crmLeads || store.crmLeads.length === 0) {
    store.crmLeads = [
      {
        leadId: 'CRM-10021',
        source: 'AI_CHATBOT_24_7',
        parentName: 'Manoj Kumar Gupta',
        phone: '+91 98351 99882',
        email: 'manoj.gupta.giridih@gmail.com',
        targetClass: 'Class 9',
        intentCategory: 'Fee Inquiry & Installments',
        transcriptSnippet: 'Parent inquired about Class 9 annual fees and computer lab installments.',
        priority: 'HIGH',
        status: 'New Lead',
        createdAt: '2026-10-31T14:30:00.000Z'
      },
      {
        leadId: 'CRM-10022',
        source: 'AI_CHATBOT_24_7',
        parentName: 'Dr. Priya Murmu',
        phone: '+91 94701 55667',
        email: 'priya.murmu.md@yahoo.com',
        targetClass: 'Class 1',
        intentCategory: 'Eligibility & Age Criteria',
        transcriptSnippet: 'Parent checked minimum age eligibility for Class 1 admission 2026-27.',
        priority: 'MEDIUM',
        status: 'In Contact',
        createdAt: '2026-10-30T11:15:00.000Z'
      }
    ];
    modified = true;
  }

  if (modified) {
    writeStore(store);
  }
}

// Auto-seed on load
seedDatabaseIfEmpty();

module.exports = {
  readStore,
  writeStore,
  getContent,
  setContent,
  listApplications,
  addApplication,
  seedDatabaseIfEmpty
};
