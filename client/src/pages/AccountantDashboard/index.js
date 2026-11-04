import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import logo from '../../components/AllImage/school-logo.jpg';
import RoleSwitcher from '../../components/RoleSwitcher';
import { fetchAdminContent, saveAdminContent } from '../../utils/api';
import './index.css';

// LBMDPS CBSE fee schedule matrix
export const getStandardFeeForClass = (className) => {
  if (!className) return 1350;
  const c = className.toString().trim();
  if (c.includes('10') || c.includes('9')) return 1850;
  if (c.includes('8') || c.includes('7') || c.includes('6')) return 1550;
  if (c.includes('5') || c.includes('4') || c.includes('3') || c.includes('2') || c.includes('1')) return 1350;
  if (c.toLowerCase().includes('lkg') || c.toLowerCase().includes('ukg') || c.toLowerCase().includes('l.k.g') || c.toLowerCase().includes('u.k.g')) return 1100;
  return 950;
};

// Indian Currency to Words Converter for CBSE Official Receipts & Vouchers
export const numberToWords = (num) => {
  if (!num || isNaN(num) || num <= 0) return '';
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + inWords(n % 100) : '');
    if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + inWords(n % 1000) : '');
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + inWords(n % 100000) : '');
    return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + inWords(n % 10000000) : '');
  };
  return inWords(Math.floor(num)) + ' Rupees Only';
};

const normalizeFee = (f) => ({
  id: f.receiptNo || f.id || f._id || '',
  receiptNo: f.receiptNo || f.id || f._id || '',
  serialNo: f.serialNo || f.receiptNo || f.id || '',
  feeBreakdown: f.feeBreakdown || null,
  studentName: f.studentName || '',
  rollNo: f.rollNo || (f.admissionNo ? String(f.admissionNo) : ''),
  className: f.className || '',
  month: f.month || f.dueMonths || '',
  amount: Number(f.amount || f.dueAmount) || 0,
  mode: f.mode || '',
  date: f.date || (f.createdAt ? f.createdAt.split('T')[0] : ''),
  status: ['paid', 'unpaid'].includes(String(f.status || '').toLowerCase())
    ? (String(f.status).toLowerCase() === 'unpaid' ? 'Unpaid' : 'Paid')
    : 'Unknown',
  session: f.session || '',
  remarks: f.remarks || f.note || '',
  phone: f.phone || ''
});

const getAcademicSession = (date = new Date()) => {
  const startYear = date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
  return {
    label: `${startYear}-${String(startYear + 1).slice(-2)}`,
    start: `${startYear}-04-01`,
    end: `${startYear + 1}-03-31`
  };
};

const getCurrentMonth = () => new Intl.DateTimeFormat('en-IN', { month: 'long' }).format(new Date());
const getLocalDateString = (date = new Date()) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

const normalizeStudent = (student) => ({
  ...student,
  id: student.id || student._id || student.rollNo || student.admissionNo || '',
  rollNo: String(student.rollNo || student.admissionNo || ''),
  studentName: student.studentName || student.name || '',
  className: student.className || student.class || student.classApplying || '',
  phone: student.phone || student.contact || '+91 94313 78901'
});

// Default realistic school operational expenses
const initialExpenses = [
  { id: 'VCH-2026-001', title: 'Generator Diesel for Examination Power Backup', category: 'Electricity & Fuel', amount: 3200, mode: 'Cash', payee: 'Kisan Fuel Centre', date: '2026-10-24', billNo: 'INV-8821', remarks: '50 Litres diesel for campus generator' },
  { id: 'VCH-2026-002', title: 'CBSE Term Examination Question Papers & Answer Booklets', category: 'Stationery & Printing', amount: 4850, mode: 'Online UPI', payee: 'Modern Stationers Giridih', date: '2026-10-22', billNo: 'BIL-4412', remarks: 'Main exam answer booklets and graph sheets' },
  { id: 'VCH-2026-003', title: 'Science Laboratory Reagents & Glass Test Tubes', category: 'Lab & Science', amount: 2600, mode: 'Cheque', payee: 'Scientific Equipment Corp', date: '2026-10-20', billNo: 'SEC-109', remarks: 'Chemistry & Biology lab consumables Class 9-10' },
  { id: 'VCH-2026-004', title: 'Campus Water Purification Filter Maintenance', category: 'Sanitation', amount: 1500, mode: 'Cash', payee: 'Clean Care Services', date: '2026-10-18', billNo: 'CC-332', remarks: 'RO filter replacement for drinking water blocks' },
  { id: 'VCH-2026-005', title: 'Inter-School Sports Meet Equipment & Jerseys', category: 'Sports & Events', amount: 3800, mode: 'Online UPI', payee: 'Champion Sports Giridih', date: '2026-10-15', billNo: 'CS-904', remarks: 'Football, volleyball kit and medals' }
];

// Default student fee concessions
const initialConcessions = [
  { id: 'CON-001', studentName: 'Aarav Kumar', rollNo: '101', className: 'Class 10', type: 'Sibling Concession', discountPct: 10, discountAmount: 185, approvedBy: 'Principal', reason: 'Younger sibling enrolled in Class 6', date: '2026-04-10' },
  { id: 'CON-002', studentName: 'Riya Kumari', rollNo: '102', className: 'Class 9', type: 'Merit Scholarship', discountPct: 25, discountAmount: 462, approvedBy: 'SMC Committee', reason: 'Class 8 Board Exam Topper (98.4%)', date: '2026-04-15' },
  { id: 'CON-003', studentName: 'Kavita Kumari', rollNo: '104', className: 'Class 7', type: 'Staff Ward Concession', discountPct: 50, discountAmount: 775, approvedBy: 'Secretary', reason: 'Ward of Senior Science Teacher', date: '2026-04-12' },
  { id: 'CON-004', studentName: 'Sanjay Kumar', rollNo: '105', className: 'Class 6', type: 'EWS / RTE Waiver', discountPct: 100, discountAmount: 1550, approvedBy: 'Management', reason: 'Economically Weaker Section RTE quota', date: '2026-04-05' }
];

// Default Staff Payroll Register
const initialPayroll = [
  { id: 'PAY-001', staffName: 'Rajesh Sharma', role: 'PGT Mathematics', baseSalary: 28000, status: 'Disbursed', mode: 'Bank NEFT', date: '2026-10-01', month: 'October 2026' },
  { id: 'PAY-002', staffName: 'Priyanka Verma', role: 'TGT Science', baseSalary: 22000, status: 'Disbursed', mode: 'Bank NEFT', date: '2026-10-01', month: 'October 2026' },
  { id: 'PAY-003', staffName: 'Amitabh Sen', role: 'PRT English', baseSalary: 18000, status: 'Disbursed', mode: 'Cheque', date: '2026-10-02', month: 'October 2026' },
  { id: 'PAY-004', staffName: 'Sunita Devi', role: 'Primary Teacher (Hindi)', baseSalary: 16000, status: 'Disbursed', mode: 'Bank NEFT', date: '2026-10-01', month: 'October 2026' },
  { id: 'PAY-005', staffName: 'Manoj Mahto', role: 'Accountant & Cashier', baseSalary: 20000, status: 'Disbursed', mode: 'Bank NEFT', date: '2026-10-01', month: 'October 2026' },
  { id: 'PAY-006', staffName: 'Ramesh Singh', role: 'Lab Assistant & Sports', baseSalary: 12000, status: 'Pending', mode: 'Cash', date: '', month: 'October 2026' },
  { id: 'PAY-007', staffName: 'Deepak Kumar', role: 'School Bus Driver', baseSalary: 11000, status: 'Pending', mode: 'Cash', date: '', month: 'October 2026' }
];

// Unique Serial Number Generator: Exactly 5 UNIQUE digits (e.g. '84925', '73104', '92658')
const generateUniqueSerialNo = () => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const first = digits.splice(Math.floor(Math.random() * digits.length), 1)[0];
  const pool = ['0', ...digits];
  const chosen = [first];
  for (let i = 0; i < 4; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    chosen.push(pool.splice(idx, 1)[0]);
  }
  return chosen.join('');
};

// 1. Bank Reconciliation & SBI Deposit Challans
const initialBankDeposits = [
  { id: 'BNK-2026-081', bankName: 'State Bank of India (SBI)', accountNo: '34910284729', ifsc: 'SBIN0000084', branch: 'Giridih Main Branch', amount: 35000, date: '2026-10-25', status: 'Verified by Bank', depositType: 'Cash Counter Remittance', utrNo: 'SBI99482019482', cashier: 'Manoj Mahto', denominations: '₹500x50, ₹200x40, ₹100x20' },
  { id: 'BNK-2026-082', bankName: 'State Bank of India (SBI)', accountNo: '34910284729', ifsc: 'SBIN0000084', branch: 'Giridih Main Branch', amount: 28400, date: '2026-10-21', status: 'Verified by Bank', depositType: 'Cheque Clearance Batch', utrNo: 'CLR88392019401', cashier: 'Manoj Mahto', denominations: '3 Cheques (Punjab National Bank)' },
  { id: 'BNK-2026-083', bankName: 'Punjab National Bank (PNB)', accountNo: '0912002100045612', ifsc: 'PUNB0091200', branch: 'Court Road Giridih', amount: 18500, date: '2026-10-18', status: 'Verified by Bank', depositType: 'Term Exam Fee Remittance', utrNo: 'PNB44910294821', cashier: 'Manoj Mahto', denominations: '₹500x30, ₹200x15, ₹100x5' },
  { id: 'BNK-2026-084', bankName: 'State Bank of India (SBI)', accountNo: '34910284729', ifsc: 'SBIN0000084', branch: 'Giridih Main Branch', amount: 10500, date: '2026-10-28', status: 'Pending Deposit', depositType: 'Daily Counter Cash Batch', utrNo: 'PENDING-CHALLAN', cashier: 'Manoj Mahto', denominations: '₹500x16, ₹200x10, ₹100x5' }
];

// 2. Transport Fleet & Route Billing
const initialTransportRoutes = [
  { id: 'RT-1', name: 'Route 1: Giridih Town & Station', busNo: 'JH-11-AK-4421', driver: 'Deepak Kumar', phone: '+91 94311 82910', capacity: 36, enrolled: 28, monthlyFee: 650, stops: 'Giridih Station, Bada Chowk, Mohanpur, Sirsia, Naitand Campus' },
  { id: 'RT-2', name: 'Route 2: Naitand, Bandiyabad & Rajdhanwar', busNo: 'JH-11-BM-8832', driver: 'Manoj Yadav', phone: '+91 94312 44781', capacity: 36, enrolled: 31, monthlyFee: 550, stops: 'Rajdhanwar Stand, Khorimahua, Bandiyabad, Naitand Main Gate' },
  { id: 'RT-3', name: 'Route 3: Bengabad & Pando Chawk', busNo: 'JH-11-CT-1090', driver: 'Suresh Murmu', phone: '+91 94315 90123', capacity: 32, enrolled: 22, monthlyFee: 700, stops: 'Bengabad Block, Motileda, Pando Chawk, Naitand Campus' },
  { id: 'RT-4', name: 'Route 4: Jamua & Deori Bypass', busNo: 'JH-11-DL-7734', driver: 'Ashok Prasad', phone: '+91 94317 66290', capacity: 32, enrolled: 19, monthlyFee: 750, stops: 'Jamua Thana, Deori Mor, Chhachhandi, Naitand Campus' }
];

const initialTransportStudents = [
  { id: 'TRP-101', studentName: 'Aarav Kumar', rollNo: '101', className: 'Class 10', routeId: 'RT-1', stop: 'Giridih Station', monthlyFee: 650, status: 'Paid', busPassNo: 'BP-2026-101' },
  { id: 'TRP-102', studentName: 'Riya Kumari', rollNo: '102', className: 'Class 9', routeId: 'RT-2', stop: 'Bandiyabad Chowk', monthlyFee: 550, status: 'Paid', busPassNo: 'BP-2026-102' },
  { id: 'TRP-103', studentName: 'Amit Verma', rollNo: '103', className: 'Class 8', routeId: 'RT-1', stop: 'Mohanpur Mor', monthlyFee: 650, status: 'Pending', busPassNo: 'BP-2026-103' },
  { id: 'TRP-104', studentName: 'Kavita Kumari', rollNo: '104', className: 'Class 7', routeId: 'RT-3', stop: 'Bengabad Block', monthlyFee: 700, status: 'Paid', busPassNo: 'BP-2026-104' },
  { id: 'TRP-105', studentName: 'Sanjay Kumar', rollNo: '105', className: 'Class 6', routeId: 'RT-2', stop: 'Khorimahua', monthlyFee: 550, status: 'Pending', busPassNo: 'BP-2026-105' },
  { id: 'TRP-106', studentName: 'Priya Sharma', rollNo: '106', className: 'Class 5', routeId: 'RT-4', stop: 'Jamua Thana', monthlyFee: 750, status: 'Paid', busPassNo: 'BP-2026-106' }
];

// 3. Hostel Residency & Mess Dining
const initialHostelRooms = [
  { roomNo: 'A-101', wing: 'Boys Hostel Wing A', floor: 'Ground Floor', capacity: 4, occupied: 3, warden: 'Mr. Rajesh Sharma' },
  { roomNo: 'A-102', wing: 'Boys Hostel Wing A', floor: 'Ground Floor', capacity: 4, occupied: 4, warden: 'Mr. Rajesh Sharma' },
  { roomNo: 'A-201', wing: 'Boys Hostel Wing A', floor: '1st Floor', capacity: 4, occupied: 2, warden: 'Mr. Rajesh Sharma' },
  { roomNo: 'B-101', wing: 'Girls Hostel Wing B', floor: 'Ground Floor', capacity: 4, occupied: 4, warden: 'Mrs. Sunita Devi' },
  { roomNo: 'B-102', wing: 'Girls Hostel Wing B', floor: 'Ground Floor', capacity: 4, occupied: 3, warden: 'Mrs. Sunita Devi' },
  { roomNo: 'B-201', wing: 'Girls Hostel Wing B', floor: '1st Floor', capacity: 4, occupied: 1, warden: 'Mrs. Sunita Devi' }
];

const initialHostelBoarders = [
  { id: 'HST-01', studentName: 'Vikas Kumar', rollNo: '112', className: 'Class 10', roomNo: 'A-101', bedNo: 'Bed 1', messPlan: 'North Indian Veg + Egg', monthlyHostelFee: 4500, cautionDeposit: 5000, cautionStatus: 'Deposited', feeStatus: 'Paid', guardianPhone: '+91 94314 20194' },
  { id: 'HST-02', studentName: 'Rahul Singh', rollNo: '115', className: 'Class 9', roomNo: 'A-101', bedNo: 'Bed 2', messPlan: 'Standard Pure Veg', monthlyHostelFee: 4200, cautionDeposit: 5000, cautionStatus: 'Deposited', feeStatus: 'Paid', guardianPhone: '+91 94318 77291' },
  { id: 'HST-03', studentName: 'Anjali Soren', rollNo: '118', className: 'Class 10', roomNo: 'B-101', bedNo: 'Bed 1', messPlan: 'Standard Pure Veg', monthlyHostelFee: 4200, cautionDeposit: 5000, cautionStatus: 'Deposited', feeStatus: 'Paid', guardianPhone: '+91 94311 33490' },
  { id: 'HST-04', studentName: 'Sneha Pandey', rollNo: '121', className: 'Class 8', roomNo: 'B-102', bedNo: 'Bed 2', messPlan: 'North Indian Veg + Milk Special', monthlyHostelFee: 4500, cautionDeposit: 5000, cautionStatus: 'Deposited', feeStatus: 'Pending', guardianPhone: '+91 94319 88102' }
];

// 4. Online UPI & Gateway Settlements
const initialOnlineTransactions = [
  { id: 'TXN-UPI-984210', orderId: 'ORD-2026-891', studentName: 'Aarav Kumar', rollNo: '101', amount: 1850, payerVpa: 'aarav.parent@oksbi', gateway: 'PhonePe UPI QR', date: '2026-10-28 10:14 AM', status: 'Settled to SBI', utr: 'UTR99482019482', settlementDate: '2026-10-28' },
  { id: 'TXN-UPI-984211', orderId: 'ORD-2026-892', studentName: 'Riya Kumari', rollNo: '102', amount: 1850, payerVpa: 'riya.k@paytm', gateway: 'Google Pay UPI', date: '2026-10-28 11:22 AM', status: 'Settled to SBI', utr: 'UTR99482019483', settlementDate: '2026-10-28' },
  { id: 'TXN-UPI-984212', orderId: 'ORD-2026-893', studentName: 'Amit Verma', rollNo: '103', amount: 1550, payerVpa: 'amit.verma@icici', gateway: 'SBI Collect Portal', date: '2026-10-28 11:45 AM', status: 'Processing Settlement', utr: 'UTR99482019484', settlementDate: 'T+1 (Tomorrow)' },
  { id: 'TXN-UPI-984213', orderId: 'ORD-2026-894', studentName: 'Priya Sharma', rollNo: '106', amount: 1350, payerVpa: 'priya.sharma@ybl', gateway: 'PhonePe UPI QR', date: '2026-10-27 03:15 PM', status: 'Settled to SBI', utr: 'UTR99482018271', settlementDate: '2026-10-27' },
  { id: 'TXN-UPI-984214', orderId: 'ORD-2026-895', studentName: 'Kavita Kumari', rollNo: '104', amount: 775, payerVpa: 'kavita.k@okhdfcbank', gateway: 'BHIM UPI QR', date: '2026-10-27 04:30 PM', status: 'Settled to SBI', utr: 'UTR99482018272', settlementDate: '2026-10-27' }
];

// 10 Official Fee Breakdown Categories
const feeHeadDefinitions = [
  { key: 'tuitionFee', label: 'Tuition Fees', icon: 'fa-solid fa-graduation-cap', defaultDesc: 'Monthly academic instruction & classroom amenities' },
  { key: 'developmentFee', label: 'Development Fees', icon: 'fa-solid fa-building-columns', defaultDesc: 'Campus infrastructure & academic facilities development' },
  { key: 'libraryCardFee', label: 'Library Card Fee', icon: 'fa-solid fa-book-open', defaultDesc: 'Digital library card issuance & reading hall access' },
  { key: 'hostelCharges', label: 'Hostel Charges', icon: 'fa-solid fa-bed', defaultDesc: 'Boarding residency & residential hostel maintenance' },
  { key: 'messCharges', label: 'Mess Charges', icon: 'fa-solid fa-utensils', defaultDesc: 'Nutritious student dining & meal catering charges' },
  { key: 'lateFineFee', label: 'Late Fine Fee', icon: 'fa-solid fa-clock-rotate-left', defaultDesc: 'Late payment surcharge past the 10th of the month' },
  { key: 'admissionFee', label: 'Admission Fee', icon: 'fa-solid fa-file-signature', defaultDesc: 'New student registration, admission kit & documentation' },
  { key: 'transportFee', label: 'Transportation Charges', icon: 'fa-solid fa-bus', defaultDesc: 'School bus fleet route & daily pickup-drop service' },
  { key: 'examFee', label: 'Exam Fee', icon: 'fa-solid fa-file-lines', defaultDesc: 'CBSE assessment test question papers & answer booklets' },
  { key: 'otherFee', label: 'Other Charges', icon: 'fa-solid fa-asterisk', defaultDesc: 'Activity, laboratory consumables & miscellaneous amenities' }
];

const computeFeeTotal = (data) => {
  let sum = 0;
  feeHeadDefinitions.forEach(h => {
    sum += Number(data[h.key]) || 0;
  });
  return sum;
};

const AccountantDashboard = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('collect');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('accountantSidebarCollapsed') === 'true' || window.innerWidth <= 768
  );
  
  const [allFees, setAllFees] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [remindersSent, setRemindersSent] = useState({});
  const [collectionAlert, setCollectionAlert] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [copiedReceiptId, setCopiedReceiptId] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [dataLoadError, setDataLoadError] = useState('');

  // 1. EXPENSES & PETTY CASH STATE
  const [expensesList, setExpensesList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_expenses');
      return saved ? JSON.parse(saved) : initialExpenses;
    } catch (e) {
      return initialExpenses;
    }
  });
  const [expenseFilterCat, setExpenseFilterCat] = useState('ALL');
  const [expenseFormData, setExpenseFormData] = useState({
    title: '',
    category: 'Stationery & Printing',
    amount: '',
    mode: 'Cash',
    payee: '',
    billNo: '',
    remarks: ''
  });
  const [selectedExpenseVoucher, setSelectedExpenseVoucher] = useState(null);

  // 2. FEE CONCESSIONS STATE
  const [concessionsList, setConcessionsList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_concessions');
      return saved ? JSON.parse(saved) : initialConcessions;
    } catch (e) {
      return initialConcessions;
    }
  });
  const [concessionFormData, setConcessionFormData] = useState({
    studentName: '',
    rollNo: '',
    className: 'Class 10',
    type: 'Sibling Concession',
    discountPct: '10',
    approvedBy: 'Principal',
    reason: ''
  });

  // 3. STAFF PAYROLL STATE
  const [payrollList, setPayrollList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_payroll');
      return saved ? JSON.parse(saved) : initialPayroll;
    } catch (e) {
      return initialPayroll;
    }
  });
  const [selectedPaySlip, setSelectedPaySlip] = useState(null);

  // Sidebar live search filter
  const [navSearchQuery, setNavSearchQuery] = useState('');

  // 4. BANK RECONCILIATION & SBI DEPOSIT SLIPS
  const [bankDepositsList, setBankDepositsList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_bank_deposits');
      return saved ? JSON.parse(saved) : initialBankDeposits;
    } catch (e) {
      return initialBankDeposits;
    }
  });
  const [bankChallanModalOpen, setBankChallanModalOpen] = useState(false);
  const [selectedBankChallan, setSelectedBankChallan] = useState(null);
  const [bankDenominations, setBankDenominations] = useState({
    n500: '20', n200: '10', n100: '15', n50: '10', n20: '0', n10: '0'
  });
  const [bankChallanForm, setBankChallanForm] = useState({
    bankName: 'State Bank of India (SBI)',
    accountNo: '34910284729',
    branch: 'Giridih Main Branch',
    ifsc: 'SBIN0000084',
    depositType: 'Daily Counter Cash Batch',
    cashier: 'Manoj Mahto',
    remarks: 'Counter cash collections remittance'
  });

  // 5. TRANSPORT FLEET & ROUTE BILLING
  const transportRoutesList = initialTransportRoutes;
  const [transportStudentsList, setTransportStudentsList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_transport_students');
      return saved ? JSON.parse(saved) : initialTransportStudents;
    } catch (e) {
      return initialTransportStudents;
    }
  });
  const [transportFilterRoute, setTransportFilterRoute] = useState('ALL');
  const [transportSearch, setTransportSearch] = useState('');
  const [assignRouteModalOpen, setAssignRouteModalOpen] = useState(false);
  const [newRouteStudentForm, setNewRouteStudentForm] = useState({
    studentName: '',
    rollNo: '',
    className: 'Class 10',
    routeId: 'RT-1',
    stop: 'Giridih Station',
    monthlyFee: '650'
  });
  const [selectedBusPass, setSelectedBusPass] = useState(null);

  // 6. HOSTEL RESIDENCY & MESS DINING
  const hostelRoomsList = initialHostelRooms;
  const [hostelBoardersList, setHostelBoardersList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_hostel_boarders');
      return saved ? JSON.parse(saved) : initialHostelBoarders;
    } catch (e) {
      return initialHostelBoarders;
    }
  });
  const [hostelSearch, setHostelSearch] = useState('');
  const [admitBoarderModalOpen, setAdmitBoarderModalOpen] = useState(false);
  const [newBoarderForm, setNewBoarderForm] = useState({
    studentName: '',
    rollNo: '',
    className: 'Class 10',
    roomNo: 'A-101',
    bedNo: 'Bed 3',
    messPlan: 'Standard Pure Veg',
    monthlyHostelFee: '4200',
    cautionDeposit: '5000',
    guardianPhone: '+91 94314 55812'
  });
  const [selectedHostelCert, setSelectedHostelCert] = useState(null);

  // 7. ONLINE FEE GATEWAY & QR SETTLEMENTS
  const [onlineTransactionsList, setOnlineTransactionsList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_online_txns');
      return saved ? JSON.parse(saved) : initialOnlineTransactions;
    } catch (e) {
      return initialOnlineTransactions;
    }
  });
  const [onlineGatewayFilter, setOnlineGatewayFilter] = useState('ALL');
  const [qrAmountModalOpen, setQrAmountModalOpen] = useState(false);
  const [qrAmountForm, setQrAmountForm] = useState({
    studentName: 'Aarav Kumar',
    className: 'Class 10',
    amount: '1850'
  });

  // 8. ANNUAL FINANCIAL STATEMENT & AUDIT
  const [auditYearFilter, setAuditYearFilter] = useState('2026-27');
  const [selectedAuditReportModal, setSelectedAuditReportModal] = useState(false);

  // Live IST Clock
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    localStorage.setItem('accountantSidebarCollapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    const handleViewportChange = () => {
      if (window.innerWidth <= 768) setSidebarCollapsed(true);
    };
    window.addEventListener('resize', handleViewportChange);
    return () => window.removeEventListener('resize', handleViewportChange);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) + ' • ' + now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save new modules to localStorage
  useEffect(() => {
    localStorage.setItem('lbmdps_expenses', JSON.stringify(expensesList));
  }, [expensesList]);

  useEffect(() => {
    localStorage.setItem('lbmdps_concessions', JSON.stringify(concessionsList));
  }, [concessionsList]);

  useEffect(() => {
    localStorage.setItem('lbmdps_payroll', JSON.stringify(payrollList));
  }, [payrollList]);

  useEffect(() => {
    localStorage.setItem('lbmdps_bank_deposits', JSON.stringify(bankDepositsList));
  }, [bankDepositsList]);

  useEffect(() => {
    localStorage.setItem('lbmdps_transport_students', JSON.stringify(transportStudentsList));
  }, [transportStudentsList]);

  useEffect(() => {
    localStorage.setItem('lbmdps_hostel_boarders', JSON.stringify(hostelBoardersList));
  }, [hostelBoardersList]);

  useEffect(() => {
    localStorage.setItem('lbmdps_online_txns', JSON.stringify(onlineTransactionsList));
  }, [onlineTransactionsList]);

  // Filters for Transaction History
  const [historySearch, setHistorySearch] = useState('');
  const [historyClassFilter, setHistoryClassFilter] = useState('ALL');
  const [historyModeFilter, setHistoryModeFilter] = useState('ALL');
  const [historyTypeFilter, setHistoryTypeFilter] = useState('ALL');

  // Filters for Dues List
  const [duesSearch, setDuesSearch] = useState('');

  const [formData, setFormData] = useState({
    serialNo: generateUniqueSerialNo(),
    studentName: '',
    rollNo: '',
    className: '',
    month: getCurrentMonth(),
    mode: 'Cash',
    remarks: '',
    tuitionFee: '',
    developmentFee: '',
    libraryCardFee: '',
    hostelCharges: '',
    messCharges: '',
    lateFineFee: '',
    admissionFee: '',
    transportFee: '',
    examFee: '',
    otherFee: '',
    amount: ''
  });

  // Load backend records
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const loadRealData = async () => {
      if (!token) {
        setDataLoadError('Sign in again to load finance records.');
        setIsDataLoaded(true);
        return;
      }

      const [feesResult, studentsResult] = await Promise.allSettled([
        fetchAdminContent('fees', token),
        fetchAdminContent('students', token)
      ]);

      const isUnauthorized = [feesResult, studentsResult].some(
        result => result.status === 'rejected' && result.reason?.status === 401
      );
      if (isUnauthorized) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('authUser');
        setDataLoadError('Your session expired. Please sign in again.');
        setIsDataLoaded(true);
        history.replace('/login');
        return;
      }

      if (feesResult.status === 'fulfilled') {
        const items = feesResult.value.json?.items;
        setAllFees(Array.isArray(items) ? items.map(normalizeFee) : []);
      } else {
        setAllFees([]);
        setDataLoadError('Fee records could not be loaded. Check the server connection and retry.');
      }

      if (studentsResult.status === 'fulfilled') {
        const items = studentsResult.value.json?.items;
        setStudentsList(Array.isArray(items) ? items.map(normalizeStudent).filter(s => s.studentName) : []);
      } else {
        setStudentsList([]);
        setDataLoadError('Student roster could not be loaded. Check the server connection and retry.');
      }
      setIsDataLoaded(true);
    };
    loadRealData();
  }, [history]);

  const academicSession = getAcademicSession();
  const isInAcademicSession = (record) => {
    if (record.session) return record.session === academicSession.label || record.session === `${academicSession.label.split('-')[0]}-${Number(academicSession.label.split('-')[0]) + 1}`;
    return Boolean(record.date && record.date >= academicSession.start && record.date <= academicSession.end);
  };
  const sessionFees = allFees.filter(isInAcademicSession);
  const feeRecords = sessionFees.filter(f => f.status === 'Paid');
  const duesList = sessionFees.filter(f => f.status === 'Unpaid');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    history.replace('/login');
  };

  // Handlers for Unique Serial Number & Fee Breakdown
  const handleRegenerateSerialNo = () => {
    const newSerial = generateUniqueSerialNo();
    setFormData(prev => ({ ...prev, serialNo: newSerial }));
  };

  const handleFeeHeadChange = (headKey, value) => {
    const updated = { ...formData, [headKey]: value };
    const total = computeFeeTotal(updated);
    setFormData({
      ...updated,
      amount: total > 0 ? String(total) : (updated.tuitionFee ? String(updated.tuitionFee) : '')
    });
  };

  const applyFeePreset = (type) => {
    const std = getStandardFeeForClass(formData.className) || 1850;
    let updated = { ...formData };
    if (type === 'tuitionOnly') {
      feeHeadDefinitions.forEach(h => { updated[h.key] = ''; });
      updated.tuitionFee = String(std);
    } else if (type === 'newAdmission') {
      updated.admissionFee = '2500';
      updated.developmentFee = '1000';
      updated.libraryCardFee = '200';
      updated.tuitionFee = String(std);
    } else if (type === 'withTransport') {
      updated.tuitionFee = String(std);
      updated.transportFee = '850';
    } else if (type === 'hostelMess') {
      updated.tuitionFee = String(std);
      updated.hostelCharges = '3500';
      updated.messCharges = '2500';
    } else if (type === 'addExam') {
      updated.examFee = '500';
    } else if (type === 'addLateFine') {
      updated.lateFineFee = '150';
    } else if (type === 'clear') {
      feeHeadDefinitions.forEach(h => { updated[h.key] = ''; });
      updated.amount = '';
    }
    const total = computeFeeTotal(updated);
    updated.amount = total > 0 ? String(total) : '';
    setFormData(updated);
  };

  // Student Quick-Select from Enrolled Students
  const handleStudentSelect = (studentId) => {
    setSelectedStudentId(studentId);
    if (!studentId) {
      setFormData({
        serialNo: generateUniqueSerialNo(),
        studentName: '',
        rollNo: '',
        className: '',
        month: getCurrentMonth(),
        mode: 'Cash',
        remarks: '',
        tuitionFee: '',
        developmentFee: '',
        libraryCardFee: '',
        hostelCharges: '',
        messCharges: '',
        lateFineFee: '',
        admissionFee: '',
        transportFee: '',
        examFee: '',
        otherFee: '',
        amount: ''
      });
      return;
    }

    const student = studentsList.find(s => s.id === studentId || s.rollNo === studentId);
    if (student) {
      const cls = student.className || student.classApplying || '';
      let stdFee = cls ? getStandardFeeForClass(cls) : 0;

      // Check if student has an active approved concession
      const activeConcession = concessionsList.find(
        c => (student.rollNo && c.rollNo === student.rollNo) ||
             c.studentName.toLowerCase() === student.studentName.toLowerCase()
      );
      if (activeConcession && stdFee) {
        const discount = Math.round((stdFee * Number(activeConcession.discountPct)) / 100);
        stdFee = Math.max(0, stdFee - discount);
      }

      // Check if student has pending dues
      const dueRecord = duesList.find(
        d => (student.rollNo && d.rollNo === student.rollNo) ||
             d.studentName.toLowerCase() === student.studentName.toLowerCase()
      );

      const tuitionVal = dueRecord ? Number(dueRecord.amount || stdFee) : Number(stdFee);
      const lateFineVal = dueRecord ? 150 : 0;
      const totalVal = tuitionVal + lateFineVal;

      setFormData({
        serialNo: generateUniqueSerialNo(),
        studentName: student.studentName,
        rollNo: student.rollNo || '',
        className: cls,
        month: dueRecord ? (dueRecord.month || getCurrentMonth()) : getCurrentMonth(),
        tuitionFee: tuitionVal > 0 ? String(tuitionVal) : '',
        developmentFee: '',
        libraryCardFee: '',
        hostelCharges: '',
        messCharges: '',
        lateFineFee: lateFineVal > 0 ? String(lateFineVal) : '',
        admissionFee: '',
        transportFee: '',
        examFee: '',
        otherFee: '',
        amount: totalVal > 0 ? String(totalVal) : '',
        mode: 'Cash',
        remarks: dueRecord 
          ? `Cleared pending dues (${dueRecord.month}) + Late fine surcharge` 
          : (activeConcession ? `${activeConcession.type} applied (${activeConcession.discountPct}% off)` : `Tuition fee (${cls})`)
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.amount) return;

    const receiptNum = formData.serialNo || generateUniqueSerialNo();
    const feeBreakdown = {
      tuitionFee: Number(formData.tuitionFee) || (computeFeeTotal(formData) === 0 ? Number(formData.amount) : 0),
      developmentFee: Number(formData.developmentFee) || 0,
      libraryCardFee: Number(formData.libraryCardFee) || 0,
      hostelCharges: Number(formData.hostelCharges) || 0,
      messCharges: Number(formData.messCharges) || 0,
      lateFineFee: Number(formData.lateFineFee) || 0,
      admissionFee: Number(formData.admissionFee) || 0,
      transportFee: Number(formData.transportFee) || 0,
      examFee: Number(formData.examFee) || 0,
      otherFee: Number(formData.otherFee) || 0
    };

    const newReceipt = {
      id: receiptNum,
      receiptNo: receiptNum,
      serialNo: receiptNum,
      studentName: formData.studentName,
      rollNo: formData.rollNo || 'N/A',
      className: formData.className,
      month: formData.month,
      amount: Number(formData.amount),
      mode: formData.mode,
      date: getLocalDateString(),
      status: 'Paid',
      session: academicSession.label,
      remarks: formData.remarks || '',
      phone: '+91 94313 78901',
      feeBreakdown,
      createdAt: new Date().toISOString()
    };

    let updatedAllFees = allFees.map(f => {
      const matchRoll = formData.rollNo && formData.rollNo !== 'N/A' && f.rollNo === formData.rollNo;
      const matchName = f.studentName.toLowerCase() === formData.studentName.toLowerCase();
      if ((matchRoll || matchName) && f.status === 'Unpaid') {
        return { ...f, status: 'Paid', date: getLocalDateString(), session: f.session || academicSession.label };
      }
      return f;
    });

    updatedAllFees = [newReceipt, ...updatedAllFees.filter(f => f.id !== newReceipt.id)];
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        await saveAdminContent('fees', { items: updatedAllFees }, token);
      } catch (err) {
        console.warn('Backend fee save note:', err.message);
      }
    }

    setAllFees(updatedAllFees);
    setSelectedReceipt(newReceipt);
    setCollectionAlert(`✓ Payment of ₹${Number(formData.amount).toLocaleString()} accepted for ${formData.studentName}! Official Verified CBSE Receipt #${receiptNum} issued.`);
    setTimeout(() => setCollectionAlert(''), 7000);

    setSelectedStudentId('');
    setFormData({
      serialNo: generateUniqueSerialNo(),
      studentName: '',
      rollNo: '',
      className: '',
      month: getCurrentMonth(),
      mode: 'Cash',
      remarks: '',
      tuitionFee: '',
      developmentFee: '',
      libraryCardFee: '',
      hostelCharges: '',
      messCharges: '',
      lateFineFee: '',
      admissionFee: '',
      transportFee: '',
      examFee: '',
      otherFee: '',
      amount: ''
    });
  };

  const handleCollectDue = (due) => {
    const firstMonth = (due.month || getCurrentMonth()).includes(',')
      ? due.month.split(',')[0].trim()
      : (due.month || getCurrentMonth());
    const tVal = Number(due.amount || 0);
    const lVal = 150;
    const tot = tVal + lVal;
    setFormData({
      serialNo: generateUniqueSerialNo(),
      studentName: due.studentName,
      rollNo: due.rollNo,
      className: due.className,
      month: firstMonth,
      tuitionFee: tVal > 0 ? String(tVal) : '',
      developmentFee: '',
      libraryCardFee: '',
      hostelCharges: '',
      messCharges: '',
      lateFineFee: String(lVal),
      admissionFee: '',
      transportFee: '',
      examFee: '',
      otherFee: '',
      amount: String(tot),
      mode: 'Cash',
      remarks: `Cleared pending dues (${due.month}) + Late fine surcharge included`
    });
    setSelectedStudentId(due.rollNo);
    setActiveTab('collect');
    setCollectionAlert(`Pre-filled payment form for ${due.studentName} (Pending: ₹${due.amount.toLocaleString()} + Late fine). Ready to issue receipt.`);
    setTimeout(() => setCollectionAlert(''), 6000);
  };

  const handleSendReminder = (due) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRemindersSent(prev => ({ ...prev, [due.rollNo]: timeNow }));
    setCollectionAlert(`Reminder marked for ${due.studentName}. Contact: ${due.phone || 'Phone record saved'}`);
  };

  const handleBulkReminders = () => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated = {};
    duesList.forEach(d => {
      if (d.rollNo) updated[d.rollNo] = timeNow;
    });
    setRemindersSent(prev => ({ ...prev, ...updated }));
    setCollectionAlert(`Marked ${duesList.length} fee accounts for parent follow-up with timestamp.`);
    setTimeout(() => setCollectionAlert(''), 6000);
  };

  const handleCopyReceipt = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedReceiptId(id);
    setTimeout(() => setCopiedReceiptId(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = ['Receipt No', 'Student Name', 'Roll No', 'Class', 'Month', 'Amount (INR)', 'Payment Mode', 'Date', 'Status', 'Remarks'];
    const rows = filteredFeeRecords.map(r => [
      r.id,
      `"${r.studentName}"`,
      r.rollNo,
      r.className,
      r.month,
      r.amount,
      r.mode,
      r.date,
      r.status,
      `"${r.remarks || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LBMDPS_Fee_Ledger_${getLocalDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4. BANK DEPOSIT & RECONCILIATION HANDLERS
  const computeBankDenomTotal = () => {
    return (
      (Number(bankDenominations.n500) || 0) * 500 +
      (Number(bankDenominations.n200) || 0) * 200 +
      (Number(bankDenominations.n100) || 0) * 100 +
      (Number(bankDenominations.n50) || 0) * 50 +
      (Number(bankDenominations.n20) || 0) * 20 +
      (Number(bankDenominations.n10) || 0) * 10
    );
  };

  const handleCreateBankChallan = (e) => {
    e.preventDefault();
    const totalAmount = computeBankDenomTotal();
    if (totalAmount <= 0) return;
    const slipId = `BNK-${new Date().getFullYear()}-${String(bankDepositsList.length + 85).padStart(3, '0')}`;
    const denomSummary = [
      bankDenominations.n500 > 0 ? `₹500x${bankDenominations.n500}` : '',
      bankDenominations.n200 > 0 ? `₹200x${bankDenominations.n200}` : '',
      bankDenominations.n100 > 0 ? `₹100x${bankDenominations.n100}` : '',
      bankDenominations.n50 > 0 ? `₹50x${bankDenominations.n50}` : '',
    ].filter(Boolean).join(', ');

    const newSlip = {
      id: slipId,
      bankName: bankChallanForm.bankName,
      accountNo: bankChallanForm.accountNo,
      branch: bankChallanForm.branch,
      ifsc: bankChallanForm.ifsc,
      amount: totalAmount,
      date: getLocalDateString(),
      status: 'Verified by Bank',
      depositType: bankChallanForm.depositType,
      utrNo: `SBI${Date.now().toString().slice(-8)}`,
      cashier: bankChallanForm.cashier,
      denominations: denomSummary || 'Cash Counter Batch'
    };
    setBankDepositsList([newSlip, ...bankDepositsList]);
    setBankChallanModalOpen(false);
    setCollectionAlert(`✓ Bank Deposit Challan ${slipId} for ₹${totalAmount.toLocaleString()} generated and verified successfully!`);
    setTimeout(() => setCollectionAlert(''), 6000);
  };

  const handleToggleBankVerify = (id) => {
    setBankDepositsList(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Verified by Bank' ? 'Pending Deposit' : 'Verified by Bank';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  // 5. TRANSPORT FLEET HANDLERS
  const handleAssignTransportStudent = (e) => {
    e.preventDefault();
    if (!newRouteStudentForm.studentName) return;
    const passNum = `BP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newStudent = {
      id: `TRP-${Date.now().toString().slice(-4)}`,
      studentName: newRouteStudentForm.studentName,
      rollNo: newRouteStudentForm.rollNo || 'N/A',
      className: newRouteStudentForm.className,
      routeId: newRouteStudentForm.routeId,
      stop: newRouteStudentForm.stop,
      monthlyFee: Number(newRouteStudentForm.monthlyFee) || 650,
      status: 'Paid',
      busPassNo: passNum
    };
    setTransportStudentsList([newStudent, ...transportStudentsList]);
    setAssignRouteModalOpen(false);
    setCollectionAlert(`✓ Student ${newStudent.studentName} assigned to ${newStudent.routeId} with Bus Pass #${passNum}!`);
    setTimeout(() => setCollectionAlert(''), 6000);
  };

  const handleToggleTransportFee = (id) => {
    setTransportStudentsList(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Paid' ? 'Pending' : 'Paid' };
      }
      return s;
    }));
  };

  // 6. HOSTEL RESIDENCY HANDLERS
  const handleAdmitHostelBoarder = (e) => {
    e.preventDefault();
    if (!newBoarderForm.studentName) return;
    const newBoarder = {
      id: `HST-${String(hostelBoardersList.length + 1).padStart(2, '0')}`,
      studentName: newBoarderForm.studentName,
      rollNo: newBoarderForm.rollNo || 'N/A',
      className: newBoarderForm.className,
      roomNo: newBoarderForm.roomNo,
      bedNo: newBoarderForm.bedNo,
      messPlan: newBoarderForm.messPlan,
      monthlyHostelFee: Number(newBoarderForm.monthlyHostelFee) || 4200,
      cautionDeposit: Number(newBoarderForm.cautionDeposit) || 5000,
      cautionStatus: 'Deposited',
      feeStatus: 'Paid',
      guardianPhone: newBoarderForm.guardianPhone
    };
    setHostelBoardersList([newBoarder, ...hostelBoardersList]);
    setAdmitBoarderModalOpen(false);
    setCollectionAlert(`✓ Boarder ${newBoarder.studentName} allocated Room ${newBoarder.roomNo} (${newBoarder.bedNo})!`);
    setTimeout(() => setCollectionAlert(''), 6000);
  };

  const handleToggleBoarderFee = (id) => {
    setHostelBoardersList(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, feeStatus: b.feeStatus === 'Paid' ? 'Pending' : 'Paid' };
      }
      return b;
    }));
  };

  // 7. ONLINE GATEWAY HANDLERS
  const handleSettleTransaction = (id) => {
    setOnlineTransactionsList(prev => prev.map(tx => {
      if (tx.id === id) {
        return {
          ...tx,
          status: 'Settled to SBI',
          settlementDate: getLocalDateString(),
          utr: `UTR${Date.now().toString().slice(-8)}`
        };
      }
      return tx;
    }));
    setCollectionAlert(`✓ Transaction ${id} reconciled and settled to SBI School Treasury Account!`);
    setTimeout(() => setCollectionAlert(''), 6000);
  };

  // 1. EXPENSE HANDLERS
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseFormData.title || !expenseFormData.amount) return;

    const vchNum = `VCH-${new Date().getFullYear()}-${String(expensesList.length + 1).padStart(3, '0')}`;
    const newExpense = {
      id: vchNum,
      title: expenseFormData.title,
      category: expenseFormData.category,
      amount: Number(expenseFormData.amount),
      mode: expenseFormData.mode,
      payee: expenseFormData.payee || 'Vendor / Payee',
      billNo: expenseFormData.billNo || `BIL-${Math.floor(1000 + Math.random() * 9000)}`,
      date: getLocalDateString(),
      remarks: expenseFormData.remarks || ''
    };

    setExpensesList([newExpense, ...expensesList]);
    setCollectionAlert(`✓ Expense Voucher #${vchNum} of ₹${Number(expenseFormData.amount).toLocaleString()} recorded successfully!`);
    setTimeout(() => setCollectionAlert(''), 6000);

    setExpenseFormData({
      title: '',
      category: 'Stationery & Printing',
      amount: '',
      mode: 'Cash',
      payee: '',
      billNo: '',
      remarks: ''
    });
  };

  // 2. CONCESSION HANDLERS
  const handleAddConcession = (e) => {
    e.preventDefault();
    if (!concessionFormData.studentName) return;

    const stdFee = getStandardFeeForClass(concessionFormData.className);
    const discAmount = Math.round((stdFee * Number(concessionFormData.discountPct)) / 100);

    const newConcession = {
      id: `CON-${String(concessionsList.length + 1).padStart(3, '0')}`,
      studentName: concessionFormData.studentName,
      rollNo: concessionFormData.rollNo || 'N/A',
      className: concessionFormData.className,
      type: concessionFormData.type,
      discountPct: Number(concessionFormData.discountPct),
      discountAmount: discAmount,
      approvedBy: concessionFormData.approvedBy || 'Principal',
      reason: concessionFormData.reason || 'Management approval',
      date: getLocalDateString()
    };

    setConcessionsList([newConcession, ...concessionsList]);
    setCollectionAlert(`✓ Fee Concession of ${concessionFormData.discountPct}% registered for ${concessionFormData.studentName}!`);
    setTimeout(() => setCollectionAlert(''), 6000);

    setConcessionFormData({
      studentName: '',
      rollNo: '',
      className: 'Class 10',
      type: 'Sibling Concession',
      discountPct: '10',
      approvedBy: 'Principal',
      reason: ''
    });
  };

  // 3. PAYROLL HANDLERS
  const handleDisburseSalary = (staff) => {
    const updated = payrollList.map(s => {
      if (s.id === staff.id) {
        return {
          ...s,
          status: 'Disbursed',
          date: getLocalDateString(),
          mode: s.mode || 'Bank NEFT'
        };
      }
      return s;
    });
    setPayrollList(updated);
    setCollectionAlert(`✓ Salary of ₹${staff.baseSalary.toLocaleString()} disbursed to ${staff.staffName} for ${staff.month}!`);
    setTimeout(() => setCollectionAlert(''), 6000);
  };

  const authUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('authUser') || '{}');
    } catch (e) {
      return {};
    }
  })();
  const isSuperAdmin = authUser.role === 'super_admin' || localStorage.getItem('userRole') === 'super_admin';

  // Dynamic calculations from real records
  const todayStr = getLocalDateString();
  const todayReceipts = feeRecords.filter(r => r.date === todayStr);
  const todayTotal = todayReceipts.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const totalCollectedSession = feeRecords.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const totalOutstandingDues = duesList.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  // Expense Totals
  const totalExpenses = expensesList.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const todayExpenses = expensesList.filter(e => e.date === todayStr).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const netTreasuryBalance = totalCollectedSession - totalExpenses;

  // Payment Breakdown
  const cashTotal = feeRecords.filter(r => (r.mode || '').toLowerCase().includes('cash')).reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const upiTotal = feeRecords.filter(r => (r.mode || '').toLowerCase().includes('upi') || (r.mode || '').toLowerCase().includes('qr') || (r.mode || '').toLowerCase().includes('online')).reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const chequeTotal = feeRecords.filter(r => (r.mode || '').toLowerCase().includes('cheque') || (r.mode || '').toLowerCase().includes('dd') || (r.mode || '').toLowerCase().includes('net')).reduce((sum, r) => sum + Number(r.amount || 0), 0);

  // Proportional percentages
  const grandTotal = totalCollectedSession || 1;
  const cashPct = Math.round((cashTotal / grandTotal) * 100);
  const upiPct = Math.round((upiTotal / grandTotal) * 100);
  const chequePct = totalCollectedSession ? Math.round((chequeTotal / totalCollectedSession) * 100) : 0;

  // Filtered Fee Records with Quick Pill Type Support
  const filteredFeeRecords = feeRecords.filter(item => {
    const matchesSearch = !historySearch ||
      item.studentName.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.rollNo.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.id.toLowerCase().includes(historySearch.toLowerCase());
    const matchesClass = historyClassFilter === 'ALL' || item.className === historyClassFilter;
    const matchesMode = historyModeFilter === 'ALL' || item.mode === historyModeFilter;
    const matchesType = historyTypeFilter === 'ALL' ||
      (historyTypeFilter === 'TODAY' && item.date === todayStr) ||
      (historyTypeFilter === 'CASH' && (item.mode || '').toLowerCase().includes('cash')) ||
      (historyTypeFilter === 'UPI' && (item.mode || '').toLowerCase().includes('upi')) ||
      (historyTypeFilter === 'CHEQUE' && ((item.mode || '').toLowerCase().includes('cheque') || (item.mode || '').toLowerCase().includes('dd')));
    return matchesSearch && matchesClass && matchesMode && matchesType;
  });

  // Filtered Dues
  const filteredDues = duesList.filter(due => {
    return !duesSearch ||
      due.studentName.toLowerCase().includes(duesSearch.toLowerCase()) ||
      due.rollNo.toLowerCase().includes(duesSearch.toLowerCase()) ||
      due.className.toLowerCase().includes(duesSearch.toLowerCase());
  });

  // Filtered Expenses
  const filteredExpenses = expensesList.filter(e => {
    return expenseFilterCat === 'ALL' || e.category === expenseFilterCat;
  });

  // Check if current form student has pending dues
  const activeStudentDue = formData.studentName && duesList.find(
    d => (formData.rollNo && formData.rollNo !== 'N/A' && d.rollNo === formData.rollNo) ||
         d.studentName.toLowerCase() === formData.studentName.toLowerCase()
  );

  const activeStudentObj = studentsList.find(s => s.id === selectedStudentId || s.rollNo === selectedStudentId);

  // Active concession for selected student
  const activeStudentConcession = formData.studentName && concessionsList.find(
    c => (formData.rollNo && formData.rollNo !== 'N/A' && c.rollNo === formData.rollNo) ||
         c.studentName.toLowerCase() === formData.studentName.toLowerCase()
  );

  return (
    <div className={`accountant-portal-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Executive Obsidian-Emerald Glass Sidebar (Cleaned: Quick Actions deleted, New Functions added) */}
      <aside className="acc-sidebar no-print">
        <button
          type="button"
          className="acc-sidebar-toggle"
          onClick={() => setSidebarCollapsed(value => !value)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!sidebarCollapsed}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <i className={`fa-solid ${sidebarCollapsed ? 'fa-angles-right' : 'fa-angles-left'}`} aria-hidden="true"></i>
        </button>
        <div className="acc-brand">
          <div className="acc-brand-content">
            <div className="acc-brand-badge">
              <i className="fa-solid fa-building-columns"></i>
            </div>
            <div className="acc-brand-info">
              <h3>LBMDPS</h3>
              <span>Accounts & Treasury</span>
            </div>
          </div>
          <div className="acc-system-pill">
            <span className="live-pulse"></span>
            <span>FinTech Desk Live</span>
          </div>
        </div>

        {/* Core Financial Navigation (Enhanced with Expenses, Concessions, Cashbook & Payroll) */}
        <div className="acc-sidebar-search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search financial desk..."
            value={navSearchQuery}
            onChange={(e) => setNavSearchQuery(e.target.value)}
          />
          {navSearchQuery && (
            <button
              type="button"
              className="acc-search-clear"
              onClick={() => setNavSearchQuery('')}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <nav className="acc-nav">
          {(() => {
            const sections = [
              {
                title: 'Fee Operations',
                items: [
                  { id: 'collect', label: 'Fee Collection Desk', icon: 'fa-solid fa-receipt', badge: null },
                  { id: 'history', label: 'Transaction Ledger', icon: 'fa-solid fa-clock-rotate-left', badge: feeRecords.length, badgeClass: '' },
                  { id: 'dues', label: 'Defaulters & Dues', icon: 'fa-solid fa-triangle-exclamation', badge: duesList.length, badgeClass: 'badge-amber' },
                  { id: 'concessions', label: 'Fee Concessions', icon: 'fa-solid fa-hand-holding-dollar', badge: concessionsList.length, badgeClass: 'badge-purple' },
                ]
              },
              {
                title: 'Treasury & Banking',
                items: [
                  { id: 'cashbook', label: 'Cashbook & Day Audit', icon: 'fa-solid fa-scale-balanced', badge: null },
                  { id: 'bankRecon', label: 'Bank Deposit & SBI Challans', icon: 'fa-solid fa-building-columns', badge: bankDepositsList.length, badgeClass: 'badge-blue' },
                  { id: 'onlineGateway', label: 'Online UPI & Gateway', icon: 'fa-solid fa-qrcode', badge: onlineTransactionsList.length, badgeClass: 'badge-emerald' },
                  { id: 'expenses', label: 'Expense & Petty Cash', icon: 'fa-solid fa-wallet', badge: expensesList.length, badgeClass: 'badge-rose' },
                ]
              },
              {
                title: 'Campus & Facilities',
                items: [
                  { id: 'transport', label: 'Transport & Bus Routes', icon: 'fa-solid fa-bus', badge: transportStudentsList.length, badgeClass: 'badge-amber' },
                  { id: 'hostelMess', label: 'Hostel Residency & Mess', icon: 'fa-solid fa-bed', badge: hostelBoardersList.length, badgeClass: 'badge-indigo' },
                  { id: 'payroll', label: 'Staff Salary Register', icon: 'fa-solid fa-money-check-dollar', badge: payrollList.length, badgeClass: '' },
                ]
              },
              {
                title: 'Audit & Reference',
                items: [
                  { id: 'auditReports', label: 'CBSE Annual Audit & P&L', icon: 'fa-solid fa-chart-line', badge: 'CBSE', badgeClass: 'badge-emerald' },
                  { id: 'structure', label: 'School Fee Reference', icon: 'fa-solid fa-table-list', badge: null },
                ]
              }
            ];

            const q = navSearchQuery.toLowerCase().trim();

            return sections.map((sec, secIdx) => {
              const matchedItems = q
                ? sec.items.filter(it => it.label.toLowerCase().includes(q))
                : sec.items;

              if (matchedItems.length === 0) return null;

              return (
                <div key={secIdx} className="acc-nav-group">
                  {!sidebarCollapsed && <span className="acc-nav-group-title">{sec.title}</span>}
                  {matchedItems.map(item => (
                    <button
                      key={item.id}
                      title={item.label}
                      className={`acc-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <div className="nav-icon-wrap"><i className={item.icon}></i></div>
                      <span>{item.label}</span>
                      {item.badge !== null && (
                        <span className={`nav-count-badge ${item.badgeClass || ''}`}>{item.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              );
            });
          })()}
        </nav>

        {/* Sidebar Footer */}
        <div className="acc-sidebar-footer">
          <div className="user-badge">
            <div className="user-avatar-circle">
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <div className="user-meta">
              <span className="role-lbl">Current Session</span>
              <strong>Senior Accountant</strong>
              <small>LBMDPS Giridih</small>
            </div>
          </div>
          <button className="acc-logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="acc-main">
        {/* Glassmorphic Top Command Bar */}
        <header className="acc-topbar no-print">
          <div className="acc-topbar-info">
            <div className="acc-topbar-title-row">
              <span className="acc-school-tag">CBSE AFFILIATED #3430398</span>
              <h1>Financial Management & Fee Desk</h1>
              <span className="acc-session-tag">Academic Session {academicSession.label}</span>
            </div>
            <div className="acc-topbar-meta-strip">
              <span className="clock-chip">
                <i className="fa-solid fa-clock"></i> {currentDateTime || 'Connecting...'}
              </span>
              <span className="location-chip">
                <i className="fa-solid fa-location-dot"></i> Village Naitand, Giridih
              </span>
            </div>
          </div>

          <div className="acc-topbar-right">
            <div className="acc-nav-chips">
              {isSuperAdmin && (
                <>
                  <Link to="/admin/dashboard" className="acc-chip-link chip-blue" title="Open Admin Portal (Super Admin Exclusive)">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Admin Portal</span>
                  </Link>
                  <Link to="/teacher/dashboard" className="acc-chip-link chip-amber" title="Open Faculty Portal (Super Admin Exclusive)">
                    <i className="fa-solid fa-chalkboard-user"></i>
                    <span>Teacher Portal</span>
                  </Link>
                </>
              )}
              <Link to="/" target="_blank" rel="noopener noreferrer" className="acc-chip-link chip-green" title="Open Live School Website">
                <i className="fa-solid fa-globe"></i>
                <span>School Website</span>
              </Link>
            </div>

            <button type="button" className="acc-summary-btn" onClick={() => setShowSummaryModal(true)} title="View Daily Collection Summary">
              <i className="fa-solid fa-chart-pie"></i>
              <span>Day Book Audit</span>
            </button>

            <button className="acc-topbar-logout" onClick={handleLogout} title="Sign Out">
              <i className="fa-solid fa-power-off"></i>
            </button>
          </div>
        </header>

        {dataLoadError && (
          <div className="acc-data-warning no-print" role="status">
            <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
            <span>{dataLoadError}</span>
            <button type="button" onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}
        {!isDataLoaded && (
          <div className="acc-data-loading no-print" role="status">
            Loading current session finance and student records…
          </div>
        )}

        {/* Dynamic Status / Alert Toast Banner */}
        {collectionAlert && (
          <div className="acc-status-banner no-print">
            <div className="banner-icon"><i className="fa-solid fa-circle-check"></i></div>
            <div className="banner-text">
              <strong>Notice:</strong> {collectionAlert}
            </div>
            <button className="banner-close" onClick={() => setCollectionAlert('')}>×</button>
          </div>
        )}

        {/* Executive FinTech KPI Cards (Gross Collection, Operational Expenses, Net Treasury Balance, Defaulters) */}
        <section className="acc-metrics-grid no-print">
          <div className="metric-card green">
            <div className="metric-decor-blob"></div>
            <div className="metric-icon-box green">
              <i className="fa-solid fa-indian-rupee-sign"></i>
            </div>
            <div className="metric-details">
              <p>Session Gross Collection</p>
              <h3>₹ {totalCollectedSession.toLocaleString()}</h3>
              <div className="metric-badge green">
                <i className="fa-solid fa-receipt"></i> {feeRecords.length} saved receipts
              </div>
            </div>
          </div>

          <div className="metric-card rose">
            <div className="metric-decor-blob"></div>
            <div className="metric-icon-box rose">
              <i className="fa-solid fa-receipt"></i>
            </div>
            <div className="metric-details">
              <p>Total School Expenses</p>
              <h3>₹ {totalExpenses.toLocaleString()}</h3>
              <div className="metric-badge rose">
                <i className="fa-solid fa-arrow-trend-down"></i> {expensesList.length} Vouchers Issued
              </div>
            </div>
          </div>

          <div className="metric-card blue">
            <div className="metric-decor-blob"></div>
            <div className="metric-icon-box blue">
              <i className="fa-solid fa-vault"></i>
            </div>
            <div className="metric-details">
              <p>Net Treasury Balance</p>
              <h3 style={{ color: netTreasuryBalance >= 0 ? '#059669' : '#dc2626' }}>
                ₹ {netTreasuryBalance.toLocaleString()}
              </h3>
              <div className="metric-badge blue">
                <i className="fa-solid fa-shield-check"></i> Net In-Hand Balance
              </div>
            </div>
          </div>

          <div className="metric-card amber">
            <div className="metric-decor-blob"></div>
            <div className="metric-icon-box amber">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="metric-details">
              <p>Outstanding Defaulter Dues</p>
              <h3>₹ {totalOutstandingDues.toLocaleString()}</h3>
              <div className="metric-badge amber">
                <i className="fa-solid fa-user-xmark"></i> {duesList.length} Defaulters Pending
              </div>
            </div>
          </div>
        </section>

        {/* Real-time FinTech Payment Mode Breakdown Strip */}
        <div className="acc-breakdown-card no-print">
          <div className="breakdown-header">
            <div className="breakdown-title">
              <i className="fa-solid fa-chart-simple"></i>
              <span>Live Collection Distribution (Session {academicSession.label})</span>
            </div>
            <div className="breakdown-progress-bar">
              <div className="bar-segment green" style={{ width: `${cashPct}%` }} title={`Cash: ${cashPct}%`}></div>
              <div className="bar-segment purple" style={{ width: `${upiPct}%` }} title={`UPI: ${upiPct}%`}></div>
              <div className="bar-segment blue" style={{ width: `${chequePct}%` }} title={`Cheque: ${chequePct}%`}></div>
            </div>
          </div>
          <div className="breakdown-ribbon-grid">
            <div className="ribbon-pill green">
              <div className="pill-dot"></div>
              <div className="pill-info">
                <span>Cash Counter:</span>
                <strong>₹ {cashTotal.toLocaleString()} ({cashPct}%)</strong>
              </div>
            </div>
            <div className="ribbon-pill purple">
              <div className="pill-dot"></div>
              <div className="pill-info">
                <span>UPI / QR Scan:</span>
                <strong>₹ {upiTotal.toLocaleString()} ({upiPct}%)</strong>
              </div>
            </div>
            <div className="ribbon-pill blue">
              <div className="pill-dot"></div>
              <div className="pill-info">
                <span>Cheque / DD:</span>
                <strong>₹ {chequeTotal.toLocaleString()} ({chequePct}%)</strong>
              </div>
            </div>
            <div className="ribbon-pill amber">
              <div className="pill-dot"></div>
              <div className="pill-info">
                <span>Pending Defaulters:</span>
                <strong style={{ color: '#b45309' }}>₹ {totalOutstandingDues.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Collect Fee & Issue Receipt */}
        {activeTab === 'collect' && (
          <section className="acc-content-card">
            <div className="acc-card-header">
              <div>
                <h2>Accept Student Fee Payment & Generate Receipt</h2>
                <p className="card-subtitle">Select a registered student or enter their details to save a fee payment and issue a receipt.</p>
              </div>
              <div className="card-header-badge">
                <span className="live-beacon"></span>
                <span>Counter Desk #01 Active</span>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="fee-entry-form">
              {/* Enrolled Student Selector */}
              <div className="student-quick-picker-box">
                <div className="picker-header">
                  <label>
                    <i className="fa-solid fa-user-graduate"></i>
                    <span>Quick-select a student from the saved roster to fill their class and outstanding fee:</span>
                  </label>
                  <span className="picker-count">{studentsList.length} Students in Roster</span>
                </div>
                <select
                  value={selectedStudentId}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                >
                  <option value="">-- Choose Registered Student or Type Manually Below --</option>
                  {studentsList.map((st) => {
                    const due = duesList.find(
                      d => (st.rollNo && d.rollNo === st.rollNo) ||
                           d.studentName.toLowerCase() === st.studentName.toLowerCase()
                    );
                    const conc = concessionsList.find(
                      c => (st.rollNo && c.rollNo === st.rollNo) ||
                           c.studentName.toLowerCase() === st.studentName.toLowerCase()
                    );
                    return (
                      <option key={st.id || st.rollNo} value={st.id || st.rollNo}>
                        {st.studentName} — Roll #{st.rollNo || 'N/A'} ({st.className || 'Class 10'})
                        {due ? ` [⚠️ Pending Dues: ₹${due.amount.toLocaleString()} for ${due.month}]` : ''}
                        {conc ? ` [🎉 ${conc.type}: ${conc.discountPct}% off]` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Student Details Mini Card */}
              {activeStudentObj && (
                <div className="selected-student-mini-card">
                  <div className="mini-card-avatar">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <div className="mini-card-info">
                    <h4>{activeStudentObj.studentName}</h4>
                    <div className="mini-card-badges">
                      <span className="mini-badge">Roll #{activeStudentObj.rollNo || 'N/A'}</span>
                      <span className="mini-badge blue">{activeStudentObj.className || 'Class 10'}</span>
                      <span className="mini-badge slate"><i className="fa-solid fa-phone"></i> {activeStudentObj.phone || '+91 94313 78901'}</span>
                      {activeStudentConcession && (
                        <span className="mini-badge purple">
                          <i className="fa-solid fa-tag"></i> {activeStudentConcession.type} ({activeStudentConcession.discountPct}% Concession)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mini-card-rate">
                    <span className="rate-lbl">Standard CBSE Fee</span>
                    <span className="rate-val">₹ {getStandardFeeForClass(activeStudentObj.className).toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Defaulter Warning Banner */}
              {activeStudentDue && (
                <div className="pending-due-notice">
                  <div className="due-icon"><i className="fa-solid fa-triangle-exclamation"></i></div>
                  <div className="due-info">
                    <strong>Outstanding Defaulter Alert:</strong> {formData.studentName} has unpaid dues of <strong>₹{(activeStudentDue.amount || activeStudentDue.dueAmount || 0).toLocaleString()}</strong> for <strong>{activeStudentDue.month || 'Tuition'}</strong>. Submitting this transaction will automatically mark this due account as PAID!
                  </div>
                  <button
                    type="button"
                    className="due-settle-btn"
                    onClick={() => setFormData({ ...formData, amount: String(activeStudentDue.amount || activeStudentDue.dueAmount) })}
                  >
                    Settle Full Due
                  </button>
                </div>
              )}

              <div className="form-split-grid">
                {/* Left Form Column */}
                <div className="form-main-inputs">
                  {/* Top Official CBSE Receipt Serial Number Bar */}
                  <div className="receipt-serial-bar">
                    <div className="serial-left">
                      <span className="serial-tag">
                        <i className="fa-solid fa-barcode"></i> OFFICIAL RECEIPT SERIAL NO. (5 UNIQUE DIGITS)
                      </span>
                      <strong className="serial-code">{formData.serialNo}</strong>
                      <span className="serial-status-pill">5 Unique Digits • Verified</span>
                    </div>
                    <button
                      type="button"
                      className="serial-refresh-btn"
                      onClick={handleRegenerateSerialNo}
                      title="Generate new 5 unique digit serial number"
                    >
                      <i className="fa-solid fa-arrows-rotate"></i>
                      <span>Generate New 5-Digit Serial</span>
                    </button>
                  </div>

                  <div className="form-row-2">
                    <label>
                      <span>Student Full Name *</span>
                      <div className="input-with-icon">
                        <i className="fa-solid fa-user"></i>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aarav Kumar"
                          value={formData.studentName}
                          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        />
                      </div>
                    </label>
                    <label>
                      <span>Roll Number / Admission No. *</span>
                      <div className="input-with-icon">
                        <i className="fa-solid fa-id-card"></i>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 104"
                          value={formData.rollNo}
                          onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="form-row-2">
                    <label>
                      <span>Class / Standard *</span>
                      <div className="input-with-icon">
                        <i className="fa-solid fa-school"></i>
                        <select
                          value={formData.className}
                          onChange={(e) => {
                            const newCls = e.target.value;
                            const stdFee = getStandardFeeForClass(newCls);
                            const updated = {
                              ...formData,
                              className: newCls,
                              tuitionFee: String(stdFee)
                            };
                            const total = computeFeeTotal(updated);
                            setFormData({
                              ...updated,
                              amount: String(total || stdFee)
                            });
                          }}
                        >
                          <option value="">Select class</option>
                          <option value="Pre-Nursery">Pre-Nursery (₹950/mo)</option>
                          <option value="Nursery">Nursery (₹950/mo)</option>
                          <option value="LKG">L.K.G (₹1,100/mo)</option>
                          <option value="UKG">U.K.G (₹1,100/mo)</option>
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={`Class ${i + 1}`}>
                              Class {i + 1} (₹{getStandardFeeForClass(`Class ${i + 1}`)}/mo)
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>

                    <label>
                      <span>Fee Month *</span>
                      <div className="input-with-icon">
                        <i className="fa-solid fa-calendar"></i>
                        <select
                          value={formData.month}
                          onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                        >
                          {['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'].map((m) => (
                            <option key={m} value={m}>{m} ({academicSession.label})</option>
                          ))}
                        </select>
                      </div>
                    </label>
                  </div>

                  {/* Payment Mode Selector */}
                  <div className="payment-mode-section">
                    <span className="payment-mode-section-title">
                      <i className="fa-solid fa-credit-card"></i> Payment Collection Mode *
                    </span>
                    <div className="payment-mode-cards-grid">
                      {[
                        { id: 'Cash', label: 'Cash Register', icon: 'fa-solid fa-money-bill-1-wave', sub: 'Counter Physical Cash' },
                        { id: 'Online UPI', label: 'UPI / QR Code', icon: 'fa-solid fa-qrcode', sub: 'Instant PhonePe, GPay' },
                        { id: 'Cheque', label: 'Bank Cheque / DD', icon: 'fa-solid fa-money-check-dollar', sub: 'Clearing / Demand Draft' },
                        { id: 'NetBanking', label: 'Net Banking / NEFT', icon: 'fa-solid fa-building-columns', sub: 'Bank Wire Transfer' },
                      ].map(m => (
                        <button
                          type="button"
                          key={m.id}
                          className={`payment-mode-tile ${formData.mode === m.id ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, mode: m.id })}
                        >
                          <div className="tile-icon-box">
                            <i className={m.icon}></i>
                          </div>
                          <div className="tile-text">
                            <strong>{m.label}</strong>
                            <small>{m.sub}</small>
                          </div>
                          {formData.mode === m.id && <i className="fa-solid fa-circle-check check-dot"></i>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 10 Official Fee Breakdown Categories */}
                  <div className="fee-breakdown-section">
                    <div className="breakdown-header">
                      <div>
                        <span className="breakdown-title">
                          <i className="fa-solid fa-receipt"></i> Fee Particulars & Breakdown (10 Categories)
                        </span>
                        <p className="breakdown-subtitle">
                          Enter individual fee amounts or use quick preset bundles below. Total amount calculates automatically in real-time.
                        </p>
                      </div>

                      {/* Quick Preset Action Buttons */}
                      <div className="preset-buttons-row">
                        <span className="preset-lbl"><i className="fa-solid fa-wand-magic-sparkles"></i> Quick Presets:</span>
                        <button type="button" className="preset-btn" onClick={() => applyFeePreset('tuitionOnly')}>
                          Tuition Only
                        </button>
                        <button type="button" className="preset-btn" onClick={() => applyFeePreset('newAdmission')}>
                          + New Admission
                        </button>
                        <button type="button" className="preset-btn" onClick={() => applyFeePreset('withTransport')}>
                          + Transport
                        </button>
                        <button type="button" className="preset-btn" onClick={() => applyFeePreset('hostelMess')}>
                          + Hostel & Mess
                        </button>
                        <button type="button" className="preset-btn" onClick={() => applyFeePreset('addExam')}>
                          + Exam (₹500)
                        </button>
                        <button type="button" className="preset-btn" onClick={() => applyFeePreset('addLateFine')}>
                          + Late Fine (₹150)
                        </button>
                        <button type="button" className="preset-btn clear" onClick={() => applyFeePreset('clear')}>
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* 10 Fee Heads Input Grid */}
                    <div className="fee-heads-inputs-grid">
                      {feeHeadDefinitions.map(head => (
                        <div key={head.key} className={`fee-head-field ${formData[head.key] > 0 ? 'active' : ''}`}>
                          <label>
                            <span className="head-label-text">
                              <i className={head.icon}></i> {head.label}
                            </span>
                            <div className="head-input-wrap">
                              <span className="currency-sign">₹</span>
                              <input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={formData[head.key]}
                                onChange={(e) => handleFeeHeadChange(head.key, e.target.value)}
                              />
                              {formData[head.key] > 0 && (
                                <button
                                  type="button"
                                  className="head-clear-btn"
                                  onClick={() => handleFeeHeadChange(head.key, '')}
                                  title="Clear fee"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amount Input with Total Calculation & Narration */}
                  <div className="form-row-2">
                    <label>
                      <span>Total Amount Received (₹) *</span>
                      <div className="amount-input-wrapper">
                        <span className="currency-prefix">₹</span>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 1850"
                          value={formData.amount}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({
                              ...formData,
                              amount: val,
                              tuitionFee: val
                            });
                          }}
                        />
                      </div>

                      {/* In Words Display */}
                      {formData.amount > 0 && (
                        <div className="amount-in-words-pill">
                          <i className="fa-solid fa-spell-check"></i>
                          <span>{numberToWords(Number(formData.amount))}</span>
                        </div>
                      )}
                    </label>

                    <label>
                      <span>Narration / Transaction Ref.</span>
                      <div className="input-with-icon">
                        <i className="fa-solid fa-pen-to-square"></i>
                        <input
                          type="text"
                          placeholder="Optional notes or UPI / Cheque reference number"
                          value={formData.remarks}
                          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                        />
                      </div>
                      <small className="field-hint">
                        Tip: Enter UPI Ref # or Cheque Number for verified bank reconciliation.
                      </small>
                    </label>
                  </div>
                </div>

                {/* Right Column: Real Official School Fee Receipt Preview */}
                <div className="form-voucher-preview-col">
                  <div className="real-fee-receipt-card">
                    {/* Security Border Inner Frame */}
                    <div className="real-receipt-inner-frame">
                      {/* Top Header with School Emblem */}
                      <div className="real-receipt-header">
                        <div className="real-receipt-logo-wrap">
                          <img src={logo} alt="School Logo" className="real-receipt-logo" />
                        </div>
                        <div className="real-receipt-school-title">
                          <h3>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h3>
                          <p className="real-receipt-affiliation">
                            AFFILIATED TO CBSE, NEW DELHI • AFFILIATION NO. 3430398 • UDISE: 20060105502 • SCHOOL CODE: 08123
                          </p>
                          <p className="real-receipt-address">
                            Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316
                          </p>
                        </div>
                      </div>

                      {/* Receipt Title Banner */}
                      <div className="real-receipt-banner">
                        <span className="banner-title">OFFICIAL STUDENT FEE PAYMENT RECEIPT</span>
                        <span className="banner-copy-tag">[OFFICE & STUDENT COPY]</span>
                      </div>

                      {/* Metadata Grid */}
                      <div className="real-receipt-meta-grid">
                        <div className="meta-cell">
                          <span className="meta-lbl">UNIQUE SERIAL NO:</span>
                          <strong className="meta-val mono">
                            {formData.serialNo}
                          </strong>
                        </div>
                        <div className="meta-cell">
                          <span className="meta-lbl">DATE ISSUED:</span>
                          <strong className="meta-val">
                            {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </strong>
                        </div>
                        <div className="meta-cell">
                          <span className="meta-lbl">ACADEMIC SESSION:</span>
                          <strong className="meta-val">{academicSession.label}</strong>
                        </div>
                      </div>

                      {/* Student Details Ledger */}
                      <div className="real-receipt-student-box">
                        <div className="student-info-row">
                          <div className="info-item">
                            <span className="info-lbl">STUDENT FULL NAME:</span>
                            <strong className="info-val student-name">
                              {formData.studentName ? formData.studentName.toUpperCase() : '— WAITING FOR STUDENT SELECTION —'}
                            </strong>
                          </div>
                          <div className="info-item">
                            <span className="info-lbl">ROLL / ADM NO:</span>
                            <strong className="info-val">
                              {formData.rollNo ? `#${formData.rollNo}` : '—'}
                            </strong>
                          </div>
                        </div>

                        <div className="student-info-row">
                          <div className="info-item">
                            <span className="info-lbl">CLASS & STANDARD:</span>
                            <strong className="info-val">
                              {formData.className || '— Not Selected —'}
                            </strong>
                          </div>
                          <div className="info-item">
                            <span className="info-lbl">FEE BILLING MONTH:</span>
                            <strong className="info-val highlight">
                              {formData.month} {academicSession.label.split('-')[0]}
                            </strong>
                          </div>
                        </div>

                        <div className="student-info-row">
                          <div className="info-item">
                            <span className="info-lbl">PAYMENT METHOD:</span>
                            <span className="payment-mode-pill">
                              <i className={
                                formData.mode === 'Cash Register' ? 'fa-solid fa-money-bill-wave' :
                                formData.mode === 'Online UPI' ? 'fa-solid fa-qrcode' :
                                formData.mode === 'Cheque' ? 'fa-solid fa-money-check' : 'fa-solid fa-building-columns'
                              }></i> {formData.mode}
                            </span>
                          </div>
                          <div className="info-item">
                            <span className="info-lbl">TXN / CHEQUE REF:</span>
                            <span className="info-val small-ref">
                              {formData.remarks || 'Main Cash Counter'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Itemized Fee Particulars Table (10 Categories Breakdown) */}
                      <table className="real-receipt-table">
                        <thead>
                          <tr>
                            <th style={{ width: '32px' }}>Sl.</th>
                            <th>Fee Particulars Description</th>
                            <th>Category</th>
                            <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const activeHeads = feeHeadDefinitions.filter(h => Number(formData[h.key]) > 0);
                            if (activeHeads.length > 0) {
                              return activeHeads.map((head, idx) => (
                                <tr key={head.key}>
                                  <td>{String(idx + 1).padStart(2, '0')}.</td>
                                  <td>
                                    <strong>{head.label}</strong>
                                    <small>{head.defaultDesc}</small>
                                  </td>
                                  <td>{head.key === 'tuitionFee' ? formData.month : (head.key === 'admissionFee' ? 'Registration' : (head.key === 'lateFineFee' ? 'Surcharge' : 'Term Fee'))}</td>
                                  <td style={{ textAlign: 'right', fontWeight: 700 }}>
                                    ₹ {Number(formData[head.key]).toLocaleString()}
                                  </td>
                                </tr>
                              ));
                            }
                            return (
                              <tr>
                                <td>01.</td>
                                <td>
                                  <strong>Tuition Fees & Composite Academic Amenities</strong>
                                  <small>Classroom instruction, CBSE curriculum & library access</small>
                                </td>
                                <td>{formData.month}</td>
                                <td style={{ textAlign: 'right', fontWeight: 700 }}>
                                  ₹ {Number(formData.amount || 0).toLocaleString()}
                                </td>
                              </tr>
                            );
                          })()}
                          <tr className="real-receipt-total-row">
                            <td colSpan="3" style={{ textAlign: 'right' }}>
                              <strong>TOTAL AMOUNT RECEIVED (NET):</strong>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <span className="total-figure">
                                ₹ {Number(formData.amount || 0).toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Amount In Words Line */}
                      <div className="real-receipt-words-line">
                        <span className="words-lbl">Amount in Words:</span>
                        <strong className="words-val">
                          {numberToWords(Number(formData.amount)) || 'Zero Rupees Only'}
                        </strong>
                      </div>

                      {/* Official Stamp & Signatures */}
                      <div className="real-receipt-footer-row">
                        <div className="stamp-col">
                          <div className="real-school-stamp">
                            <div className="stamp-ring">
                              <span className="stamp-top">LBM DIVINE PUBLIC SCHOOL</span>
                              <span className="stamp-center">★ PAID & VERIFIED ★</span>
                              <span className="stamp-bottom">ACCOUNTS DESK • GIRIDIH</span>
                            </div>
                          </div>
                        </div>

                        <div className="signatures-col">
                          <div className="signature-item">
                            <div className="sig-line-dotted"></div>
                            <span>Depositor / Parent Signature</span>
                          </div>
                          <div className="signature-item">
                            <div className="accountant-sign-mock">
                              <i className="fa-solid fa-signature"></i> Verified
                            </div>
                            <div className="sig-line-dotted"></div>
                            <span>Authorized Cashier / Accountant</span>
                          </div>
                        </div>
                      </div>

                      {/* Barcode Strip with Unique Serial Number */}
                      <div className="real-receipt-barcode-row">
                        <div className="barcode-graphic"></div>
                        <span className="barcode-serial-text">{formData.serialNo}</span>
                      </div>

                      {/* Computer Generated Legal Disclaimer */}
                      <div className="real-receipt-disclaimer">
                        <i className="fa-solid fa-circle-info"></i> This is a computer-verified official payment receipt generated by LBMDPS Accounts Treasury. Fees once remitted are non-refundable. Please retain this receipt for documentation and tuition rebate records.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-action-footer">
                <button type="submit" className="submit-fee-btn">
                  <i className="fa-solid fa-file-circle-check"></i>
                  <span>Accept Payment & Issue Official Verified Receipt</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Tab 2: Transaction Ledger & History */}
        {activeTab === 'history' && (
          <section className="acc-content-card">
            <div className="acc-card-header">
              <div>
                <h2>Verified Transaction Ledger & Receipts</h2>
                <p className="card-subtitle">Search, inspect, export, and reprint official receipts generated by the Accounts Counter.</p>
              </div>
              <div className="header-action-group">
                <button type="button" className="acc-export-btn" onClick={handleExportCSV} title="Download CSV Spreadsheet">
                  <i className="fa-solid fa-file-csv"></i> Export CSV
                </button>
                <button type="button" className="acc-secondary-action-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Ledger
                </button>
              </div>
            </div>

            {/* Quick Filter Pill Buttons */}
            <div className="history-quick-pills-row">
              {[
                { id: 'ALL', label: `All Receipts (${feeRecords.length})`, icon: 'fa-solid fa-receipt' },
                { id: 'TODAY', label: `Today's (${todayReceipts.length})`, icon: 'fa-solid fa-calendar-day' },
                { id: 'CASH', label: `Cash (${feeRecords.filter(r => (r.mode || '').toLowerCase().includes('cash')).length})`, icon: 'fa-solid fa-money-bill-wave' },
                { id: 'UPI', label: `UPI / QR (${feeRecords.filter(r => (r.mode || '').toLowerCase().includes('upi') || (r.mode || '').toLowerCase().includes('qr')).length})`, icon: 'fa-solid fa-qrcode' },
                { id: 'CHEQUE', label: `Cheque / DD (${feeRecords.filter(r => (r.mode || '').toLowerCase().includes('cheque') || (r.mode || '').toLowerCase().includes('dd')).length})`, icon: 'fa-solid fa-money-check-dollar' },
              ].map(p => (
                <button
                  type="button"
                  key={p.id}
                  className={`history-pill-btn ${historyTypeFilter === p.id ? 'active' : ''}`}
                  onClick={() => setHistoryTypeFilter(p.id)}
                >
                  <i className={p.icon}></i>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Filter and Search Bar */}
            <div className="acc-filter-bar">
              <div className="acc-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search ledger by student name, roll #, or receipt ID..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                />
                {historySearch && (
                  <button type="button" className="clear-btn" onClick={() => setHistorySearch('')}>×</button>
                )}
              </div>

              <div className="acc-filter-group">
                <label>
                  <span>Class:</span>
                  <select value={historyClassFilter} onChange={(e) => setHistoryClassFilter(e.target.value)}>
                    <option value="ALL">All Classes</option>
                    {[...new Set(sessionFees.map(f => f.className).filter(Boolean))].sort().map(className => (
                      <option key={className} value={className}>{className}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Payment Mode:</span>
                  <select value={historyModeFilter} onChange={(e) => setHistoryModeFilter(e.target.value)}>
                    <option value="ALL">All Modes</option>
                    <option value="Cash">Cash</option>
                    <option value="Online UPI">Online UPI</option>
                    <option value="Cheque">Cheque</option>
                    <option value="NetBanking">Net Banking</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="table-responsive">
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Receipt No</th>
                    <th>Student Name</th>
                    <th>Roll No</th>
                    <th>Class</th>
                    <th>Month</th>
                    <th>Amount Paid</th>
                    <th>Payment Mode</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeeRecords.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                        <i className="fa-solid fa-receipt" style={{ fontSize: 28, display: 'block', marginBottom: 8, opacity: 0.5 }}></i>
                        No transactions found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredFeeRecords.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <button
                            type="button"
                            className="receipt-copy-pill"
                            onClick={() => handleCopyReceipt(item.id)}
                            title="Click to copy receipt number"
                          >
                            <span>{item.id}</span>
                            <i className={`fa-solid ${copiedReceiptId === item.id ? 'fa-check' : 'fa-copy'}`}></i>
                          </button>
                        </td>
                        <td>
                          <div className="student-table-name">
                            <span className="student-avatar-circle">
                              {item.studentName.charAt(0).toUpperCase()}
                            </span>
                            <strong>{item.studentName}</strong>
                          </div>
                        </td>
                        <td>#{item.rollNo}</td>
                        <td><span className="class-badge">{item.className}</span></td>
                        <td>{item.month}</td>
                        <td className="amount-col">₹ {item.amount.toLocaleString()}</td>
                        <td>
                          <span className={`mode-badge mode-${(item.mode || 'Cash').toLowerCase().replace(/[^a-z]/g, '')}`}>
                            {item.mode}
                          </span>
                        </td>
                        <td>{item.date}</td>
                        <td>
                          <button className="view-receipt-btn" onClick={() => setSelectedReceipt(item)}>
                            <i className="fa-solid fa-print"></i> Official Receipt
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab 3: Defaulters & Dues Desk */}
        {activeTab === 'dues' && (
          <section className="acc-content-card">
            <div className="acc-card-header">
              <div>
                <h2>Defaulters Desk & Unpaid Fee Management</h2>
                <p className="card-subtitle">Review actual unpaid fee records, mark parent follow-ups, or start a collection.</p>
              </div>
              <div className="header-action-group">
                <button
                  type="button"
                  className="acc-bulk-sms-btn"
                  onClick={handleBulkReminders}
                  disabled={!duesList.length}
                  title="Mark all unpaid accounts for parent follow-up"
                >
                  <i className="fa-solid fa-list-check"></i> Mark All for Follow-up ({duesList.length})
                </button>
                <span className="acc-header-pill amber">{duesList.length} Pending Defaulters</span>
              </div>
            </div>

            <div className="acc-filter-bar">
              <div className="acc-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search defaulter by student name or roll number..."
                  value={duesSearch}
                  onChange={(e) => setDuesSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Roll No</th>
                    <th>Class</th>
                    <th>Due Months</th>
                    <th>Pending Due</th>
                    <th>Parent Contact</th>
                    <th>Parent Follow-up</th>
                    <th>Fast Collect</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDues.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: '#10b981', fontWeight: 700 }}>
                        <i className="fa-solid fa-circle-check" style={{ fontSize: 32, display: 'block', marginBottom: 10 }}></i>
                        All dues cleared! No pending fee defaulters on record.
                      </td>
                    </tr>
                  ) : (
                    filteredDues.map((due, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="student-table-name">
                            <span className="student-avatar-circle" style={{ background: '#fef3c7', color: '#b45309' }}>
                              {due.studentName.charAt(0).toUpperCase()}
                            </span>
                            <strong>{due.studentName}</strong>
                          </div>
                        </td>
                        <td>#{due.rollNo}</td>
                        <td><span className="class-badge">{due.className}</span></td>
                        <td><span className="due-months-tag">{due.month || due.dueMonths || 'Month not recorded'}</span></td>
                        <td className="due-amount-col">₹ {(Number(due.amount || due.dueAmount) || 0).toLocaleString()}</td>
                        <td>
                          <a href={`tel:${due.phone}`} className="phone-link">
                            <i className="fa-solid fa-phone"></i> {due.phone}
                          </a>
                        </td>
                        <td>
                          {remindersSent[due.rollNo] ? (
                            <span className="reminder-sent-tag">
                              <i className="fa-solid fa-check"></i> Marked at {remindersSent[due.rollNo]}
                            </span>
                          ) : (
                            <button
                              className="remind-btn"
                              onClick={() => handleSendReminder(due)}
                              title="Mark this account for parent follow-up"
                            >
                              <i className="fa-solid fa-phone"></i> Mark Follow-up
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            className="collect-due-btn"
                            onClick={() => handleCollectDue(due)}
                            title="Collect this pending fee now"
                          >
                            <i className="fa-solid fa-cash-register"></i> Collect Fee
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 4: Daily Expenses & Petty Cash */}
        {activeTab === 'expenses' && (
          <section className="acc-content-card">
            <div className="acc-card-header">
              <div>
                <h2>School Operational Expenses & Petty Cash Vouchers</h2>
                <p className="card-subtitle">Record and audit campus expenditures: fuel, stationery, lab supplies, sanitation, and repairs.</p>
              </div>
              <div className="header-action-group">
                <span className="acc-header-pill rose">Total Expenses: ₹{totalExpenses.toLocaleString()}</span>
                <span className="acc-header-pill green">Net Balance: ₹{netTreasuryBalance.toLocaleString()}</span>
              </div>
            </div>

            {/* Add Expense Form */}
            <form onSubmit={handleAddExpense} className="expense-entry-form">
              <div className="expense-form-title">
                <i className="fa-solid fa-plus-circle"></i> Issue New Payment Voucher
              </div>
              <div className="form-row-3">
                <label>
                  <span>Expense Purpose / Title *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Generator Diesel 50L"
                    value={expenseFormData.title}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, title: e.target.value })}
                  />
                </label>

                <label>
                  <span>Category *</span>
                  <select
                    value={expenseFormData.category}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, category: e.target.value })}
                  >
                    <option value="Electricity & Fuel">Electricity & Fuel</option>
                    <option value="Stationery & Printing">Stationery & Printing</option>
                    <option value="Repairs & Maintenance">Repairs & Maintenance</option>
                    <option value="Lab & Science">Lab & Science</option>
                    <option value="Sanitation">Sanitation & Hygiene</option>
                    <option value="Sports & Events">Sports & Events</option>
                    <option value="Transport">Transport & Bus</option>
                    <option value="Staff Refreshment">Staff Refreshment</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </label>

                <label>
                  <span>Amount (₹) *</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2500"
                    value={expenseFormData.amount}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, amount: e.target.value })}
                  />
                </label>
              </div>

              <div className="form-row-3">
                <label>
                  <span>Paid To (Payee / Vendor)</span>
                  <input
                    type="text"
                    placeholder="e.g. Modern Stationers"
                    value={expenseFormData.payee}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, payee: e.target.value })}
                  />
                </label>

                <label>
                  <span>Payment Mode</span>
                  <select
                    value={expenseFormData.mode}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, mode: e.target.value })}
                  >
                    <option value="Cash">Cash (Petty Cash Drawer)</option>
                    <option value="Online UPI">Online UPI / QR</option>
                    <option value="Cheque">Bank Cheque / DD</option>
                    <option value="Bank NEFT">Direct Bank NEFT</option>
                  </select>
                </label>

                <label>
                  <span>Bill / Invoice Number</span>
                  <input
                    type="text"
                    placeholder="e.g. INV-2026-90"
                    value={expenseFormData.billNo}
                    onChange={(e) => setExpenseFormData({ ...expenseFormData, billNo: e.target.value })}
                  />
                </label>
              </div>

              <div className="expense-form-footer">
                <button type="submit" className="acc-expense-btn">
                  <i className="fa-solid fa-receipt"></i> Save & Generate Expense Voucher
                </button>
              </div>
            </form>

            {/* Filter Bar */}
            <div className="acc-filter-bar" style={{ marginTop: '24px' }}>
              <div className="acc-filter-group">
                <label>
                  <span>Filter Category:</span>
                  <select value={expenseFilterCat} onChange={(e) => setExpenseFilterCat(e.target.value)}>
                    <option value="ALL">All Categories</option>
                    <option value="Electricity & Fuel">Electricity & Fuel</option>
                    <option value="Stationery & Printing">Stationery & Printing</option>
                    <option value="Repairs & Maintenance">Repairs & Maintenance</option>
                    <option value="Lab & Science">Lab & Science</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Sports & Events">Sports & Events</option>
                    <option value="Transport">Transport</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Expense Vouchers Table */}
            <div className="table-responsive">
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Voucher No</th>
                    <th>Expense Title</th>
                    <th>Category</th>
                    <th>Amount (₹)</th>
                    <th>Payment Mode</th>
                    <th>Payee / Vendor</th>
                    <th>Bill No</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((exp) => (
                    <tr key={exp.id}>
                      <td><strong className="receipt-copy-pill">{exp.id}</strong></td>
                      <td><strong>{exp.title}</strong></td>
                      <td><span className="expense-cat-tag">{exp.category}</span></td>
                      <td className="expense-amount-col">₹ {exp.amount.toLocaleString()}</td>
                      <td><span className={`mode-badge mode-${exp.mode.toLowerCase().replace(/[^a-z]/g, '')}`}>{exp.mode}</span></td>
                      <td>{exp.payee}</td>
                      <td>{exp.billNo || 'N/A'}</td>
                      <td>{exp.date}</td>
                      <td>
                        <button className="view-receipt-btn" onClick={() => setSelectedExpenseVoucher(exp)}>
                          <i className="fa-solid fa-print"></i> Voucher
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 5: Fee Concessions & Waivers */}
        {activeTab === 'concessions' && (
          <section className="acc-content-card">
            <div className="acc-card-header">
              <div>
                <h2>Student Fee Concessions & Scholarship Desk</h2>
                <p className="card-subtitle">Manage approved discounts (Sibling 10%, Merit Scholarships, RTE / EWS Waivers, Staff Ward).</p>
              </div>
              <span className="acc-header-pill purple">{concessionsList.length} Active Concessions</span>
            </div>

            {/* Add Concession Form */}
            <form onSubmit={handleAddConcession} className="concession-entry-form">
              <div className="concession-form-title">
                <i className="fa-solid fa-award"></i> Register New Student Concession
              </div>
              <div className="form-row-3">
                <label>
                  <span>Student Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aman Sharma"
                    value={concessionFormData.studentName}
                    onChange={(e) => setConcessionFormData({ ...concessionFormData, studentName: e.target.value })}
                  />
                </label>

                <label>
                  <span>Roll / Admission No.</span>
                  <input
                    type="text"
                    placeholder="e.g. 108"
                    value={concessionFormData.rollNo}
                    onChange={(e) => setConcessionFormData({ ...concessionFormData, rollNo: e.target.value })}
                  />
                </label>

                <label>
                  <span>Class</span>
                  <select
                    value={concessionFormData.className}
                    onChange={(e) => setConcessionFormData({ ...concessionFormData, className: e.target.value })}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
                    ))}
                    <option value="Pre-Nursery">Pre-Nursery</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                  </select>
                </label>
              </div>

              <div className="form-row-3">
                <label>
                  <span>Concession Type *</span>
                  <select
                    value={concessionFormData.type}
                    onChange={(e) => {
                      const t = e.target.value;
                      let pct = '10';
                      if (t.includes('Merit')) pct = '25';
                      if (t.includes('Staff')) pct = '50';
                      if (t.includes('EWS') || t.includes('RTE')) pct = '100';
                      setConcessionFormData({ ...concessionFormData, type: t, discountPct: pct });
                    }}
                  >
                    <option value="Sibling Concession">Sibling Concession (10% off)</option>
                    <option value="Merit Scholarship">Merit Scholarship (25% off)</option>
                    <option value="Staff Ward Concession">Staff Ward Concession (50% off)</option>
                    <option value="EWS / RTE Waiver">EWS / RTE Full Waiver (100% off)</option>
                    <option value="Sports Quota">Sports Quota (15% off)</option>
                    <option value="Discretionary Waiver">Discretionary Hardship Waiver</option>
                  </select>
                </label>

                <label>
                  <span>Discount Percentage (%)</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={concessionFormData.discountPct}
                    onChange={(e) => setConcessionFormData({ ...concessionFormData, discountPct: e.target.value })}
                  />
                </label>

                <label>
                  <span>Approved By</span>
                  <select
                    value={concessionFormData.approvedBy}
                    onChange={(e) => setConcessionFormData({ ...concessionFormData, approvedBy: e.target.value })}
                  >
                    <option value="Principal">School Principal</option>
                    <option value="SMC Committee">School Management Committee (SMC)</option>
                    <option value="Secretary">Secretary / Director</option>
                    <option value="Government RTE">District Education Office (RTE)</option>
                  </select>
                </label>
              </div>

              <div className="form-action-footer">
                <button type="submit" className="acc-concession-btn">
                  <i className="fa-solid fa-check-circle"></i> Save & Apply Concession to Student Roster
                </button>
              </div>
            </form>

            {/* Active Concessions Table */}
            <div className="table-responsive" style={{ marginTop: '24px' }}>
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Student Name</th>
                    <th>Roll No</th>
                    <th>Class</th>
                    <th>Concession Category</th>
                    <th>Discount %</th>
                    <th>Monthly Saving (₹)</th>
                    <th>Approved By</th>
                    <th>Approval Date</th>
                  </tr>
                </thead>
                <tbody>
                  {concessionsList.map((c) => (
                    <tr key={c.id}>
                      <td><strong className="receipt-copy-pill">{c.id}</strong></td>
                      <td><strong>{c.studentName}</strong></td>
                      <td>#{c.rollNo}</td>
                      <td><span className="class-badge">{c.className}</span></td>
                      <td><span className="concession-type-tag">{c.type}</span></td>
                      <td><strong style={{ color: '#7c3aed' }}>{c.discountPct}%</strong></td>
                      <td className="amount-col">₹ {c.discountAmount.toLocaleString()}</td>
                      <td>{c.approvedBy}</td>
                      <td>{c.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 6: Cashbook & Day Audit */}
        {activeTab === 'cashbook' && (
          <section className="acc-content-card">
            <div className="acc-card-header">
              <div>
                <h2>Daily Cashbook Reconciliation & Accounts Audit</h2>
                <p className="card-subtitle">Official daily reconciliation of cash drawer, digital collections, expenses paid out, and net closing balance.</p>
              </div>
              <button className="acc-secondary-action-btn" onClick={() => window.print()}>
                <i className="fa-solid fa-print"></i> Print Official Cash Sheet
              </button>
            </div>

            <div className="cashbook-audit-grid">
              <div className="cashbook-tile green">
                <span className="cashbook-lbl">Total Cash Fee Collections</span>
                <h3>₹ {cashTotal.toLocaleString()}</h3>
                <small>Physical cash deposited at fee desk</small>
              </div>

              <div className="cashbook-tile rose">
                <span className="cashbook-lbl">Total Cash Expenses Paid</span>
                <h3>₹ {expensesList.filter(e => (e.mode || '').toLowerCase().includes('cash')).reduce((s, e) => s + e.amount, 0).toLocaleString()}</h3>
                <small>Petty cash vouchers settled</small>
              </div>

              <div className="cashbook-tile blue">
                <span className="cashbook-lbl">Net Physical Cash in Drawer</span>
                <h3>₹ {(cashTotal - expensesList.filter(e => (e.mode || '').toLowerCase().includes('cash')).reduce((s, e) => s + e.amount, 0)).toLocaleString()}</h3>
                <small>Available in Accounts Counter</small>
              </div>

              <div className="cashbook-tile purple">
                <span className="cashbook-lbl">Digital UPI Inflow (Bank Direct)</span>
                <h3>₹ {upiTotal.toLocaleString()}</h3>
                <small>Settled directly to School Bank Account</small>
              </div>
            </div>

            <div className="cashbook-ledger-box">
              <h3><i className="fa-solid fa-book-journal-whills"></i> Official Daily Settlement Summary ({todayStr})</h3>
              <table className="cashbook-table">
                <tbody>
                  <tr>
                    <td><strong>1. Opening Physical Cash Balance</strong></td>
                    <td className="text-right">₹ 2,000</td>
                  </tr>
                  <tr>
                    <td><strong>2. Total Cash Collections Received Today (+)</strong></td>
                    <td className="text-right amount-col">+ ₹ {feeRecords.filter(r => r.date === todayStr && (r.mode || '').toLowerCase().includes('cash')).reduce((s, r) => s + r.amount, 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td><strong>3. Total Petty Cash Vouchers Paid Today (-)</strong></td>
                    <td className="text-right due-amount-col">- ₹ {todayExpenses.toLocaleString()}</td>
                  </tr>
                  <tr className="cashbook-highlight-row">
                    <td><strong>Closing Physical Cash In Counter Drawer (=)</strong></td>
                    <td className="text-right">
                      <strong>₹ {(2000 + feeRecords.filter(r => r.date === todayStr && (r.mode || '').toLowerCase().includes('cash')).reduce((s, r) => s + r.amount, 0) - todayExpenses).toLocaleString()}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>4. Direct Bank Deposits / UPI Collections Today</strong></td>
                    <td className="text-right">₹ {feeRecords.filter(r => r.date === todayStr && ((r.mode || '').toLowerCase().includes('upi') || (r.mode || '').toLowerCase().includes('qr'))).reduce((s, r) => s + r.amount, 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td><strong>5. Cheques / DD Deposited Today</strong></td>
                    <td className="text-right">₹ {feeRecords.filter(r => r.date === todayStr && (r.mode || '').toLowerCase().includes('cheque')).reduce((s, r) => s + r.amount, 0).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="audit-signatures-strip">
                <div className="audit-sig-col">
                  <div className="sig-line"></div>
                  <span>Prepared by Senior Accountant</span>
                </div>
                <div className="audit-sig-col">
                  <div className="sig-line"></div>
                  <span>Verified by Headmaster / Principal</span>
                </div>
                <div className="audit-sig-col">
                  <div className="sig-line"></div>
                  <span>Approved by Secretary / Treasurer</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NEW TAB 7: Staff Salary Register */}
        {activeTab === 'payroll' && (
          <section className="acc-content-card">
            <div className="acc-card-header">
              <div>
                <h2>Faculty & Staff Monthly Payroll Register</h2>
                <p className="card-subtitle">Monthly salary disbursements for teaching & non-teaching staff (Session {academicSession.label}).</p>
              </div>
              <div className="header-action-group">
                <span className="acc-header-pill green">
                  Total Disbursed: ₹{payrollList.filter(s => s.status === 'Disbursed').reduce((s, p) => s + p.baseSalary, 0).toLocaleString()}
                </span>
                <span className="acc-header-pill amber">
                  Pending: ₹{payrollList.filter(s => s.status === 'Pending').reduce((s, p) => s + p.baseSalary, 0).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="table-responsive">
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Payroll ID</th>
                    <th>Staff Full Name</th>
                    <th>Designation / Role</th>
                    <th>Monthly Base Pay</th>
                    <th>Billing Month</th>
                    <th>Status</th>
                    <th>Disbursement Mode</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollList.map((staff) => (
                    <tr key={staff.id}>
                      <td><strong className="receipt-copy-pill">{staff.id}</strong></td>
                      <td><strong>{staff.staffName}</strong></td>
                      <td><span className="class-badge">{staff.role}</span></td>
                      <td className="amount-col">₹ {staff.baseSalary.toLocaleString()}</td>
                      <td>{staff.month}</td>
                      <td>
                        <span className={`status-pill ${staff.status.toLowerCase()}`}>
                          {staff.status === 'Disbursed' ? '✓ Disbursed' : '⏳ Pending'}
                        </span>
                      </td>
                      <td>{staff.mode || 'Direct Bank NEFT'}</td>
                      <td>
                        {staff.status === 'Disbursed' ? (
                          <button className="view-receipt-btn" onClick={() => setSelectedPaySlip(staff)}>
                            <i className="fa-solid fa-file-invoice"></i> Pay Slip
                          </button>
                        ) : (
                          <button className="collect-due-btn" onClick={() => handleDisburseSalary(staff)}>
                            <i className="fa-solid fa-check"></i> Disburse Pay
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab 8: School Fee Reference */}
        {activeTab === 'structure' && (
          <section className="acc-content-card">
            <div className="acc-card-header">
              <div>
                <h2>School Class-Wise Fee Reference (Session {academicSession.label})</h2>
                <p className="card-subtitle">Confirm the current approved rate with school administration before collection.</p>
              </div>
              <button className="acc-secondary-action-btn" onClick={() => window.print()}>
                <i className="fa-solid fa-print"></i> Print Official Schedule
              </button>
            </div>

            <div className="table-responsive">
              <table className="acc-table fee-structure-table">
                <thead>
                  <tr>
                    <th>Grade Category</th>
                    <th>Classes Covered</th>
                    <th>Admission Fee (One-Time)</th>
                    <th>Monthly Tuition</th>
                    <th>Annual Charges</th>
                    <th>Quarterly Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Pre-Primary</strong></td>
                    <td>Pre-Nursery / Nursery</td>
                    <td>₹ 3,500</td>
                    <td><strong style={{ color: '#059669' }}>₹ 950 / mo</strong></td>
                    <td>₹ 2,000</td>
                    <td><strong className="amount-col">₹ 4,850</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Kindergarten</strong></td>
                    <td>L.K.G & U.K.G</td>
                    <td>₹ 4,000</td>
                    <td><strong style={{ color: '#059669' }}>₹ 1,100 / mo</strong></td>
                    <td>₹ 2,200</td>
                    <td><strong className="amount-col">₹ 5,500</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Primary Wing</strong></td>
                    <td>Class 1 to Class 5</td>
                    <td>₹ 5,000</td>
                    <td><strong style={{ color: '#059669' }}>₹ 1,350 / mo</strong></td>
                    <td>₹ 2,500</td>
                    <td><strong className="amount-col">₹ 6,550</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Middle Wing</strong></td>
                    <td>Class 6 to Class 8</td>
                    <td>₹ 5,500</td>
                    <td><strong style={{ color: '#059669' }}>₹ 1,550 / mo</strong></td>
                    <td>₹ 2,800</td>
                    <td><strong className="amount-col">₹ 7,450</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Secondary Wing (CBSE)</strong></td>
                    <td>Class 9 & Class 10 (Class X)</td>
                    <td>₹ 6,500</td>
                    <td><strong style={{ color: '#059669' }}>₹ 1,850 / mo</strong></td>
                    <td>₹ 3,200</td>
                    <td><strong className="amount-col">₹ 8,750</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="fee-structure-notes">
              <h4><i className="fa-solid fa-circle-info"></i> Official Fee Policy Notes:</h4>
              <ul>
                <li>Tuition fee is payable by the 10th of every calendar month.</li>
                <li>Late payment surcharge of ₹50 per week applies after the due date.</li>
                <li>Concession of 10% on tuition fee for siblings enrolled in the same academic session.</li>
                <li>Examination fees are collected separately in September (Term-1) and February (Term-2).</li>
              </ul>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* NEW PANEL 1: BANK RECONCILIATION & SBI DEPOSIT CHALLANS                   */}
        {/* ========================================================================= */}
        {activeTab === 'bankRecon' && (
          <section className="acc-card active-panel">
            <div className="acc-card-header">
              <div>
                <h2>Bank Deposit & Treasury Reconciliation Desk</h2>
                <p className="card-subtitle">
                  State Bank of India (SBI) & Punjab National Bank (PNB) deposit challans, counter cash remittance batches, and clearing reconciliations.
                </p>
              </div>
              <div className="header-action-group">
                <button
                  type="button"
                  className="acc-add-btn"
                  onClick={() => setBankChallanModalOpen(true)}
                >
                  <i className="fa-solid fa-plus-circle"></i> Create Bank Deposit Challan
                </button>
              </div>
            </div>

            {/* Bank Treasury Metrics */}
            <div className="bank-metrics-grid">
              <div className="bank-metric-card green">
                <div className="bm-icon"><i className="fa-solid fa-vault"></i></div>
                <div className="bm-data">
                  <span className="bm-lbl">Counter Cash in Drawer</span>
                  <strong className="bm-val">₹ {cashTotal.toLocaleString()}</strong>
                  <small className="bm-sub">Available for bank remittance</small>
                </div>
              </div>

              <div className="bank-metric-card blue">
                <div className="bm-icon"><i className="fa-solid fa-building-columns"></i></div>
                <div className="bm-data">
                  <span className="bm-lbl">Total Deposited to SBI</span>
                  <strong className="bm-val">
                    ₹ {bankDepositsList.filter(s => s.status === 'Verified by Bank').reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
                  </strong>
                  <small className="bm-sub">Verified bank credit</small>
                </div>
              </div>

              <div className="bank-metric-card amber">
                <div className="bm-icon"><i className="fa-solid fa-clock-rotate-left"></i></div>
                <div className="bm-data">
                  <span className="bm-lbl">Pending Bank Verification</span>
                  <strong className="bm-val">
                    {bankDepositsList.filter(s => s.status !== 'Verified by Bank').length} Batch(es)
                  </strong>
                  <small className="bm-sub">In transit / Bank clearance</small>
                </div>
              </div>

              <div className="bank-metric-card purple">
                <div className="bm-icon"><i className="fa-solid fa-file-invoice-dollar"></i></div>
                <div className="bm-data">
                  <span className="bm-lbl">Primary School A/c</span>
                  <strong className="bm-val" style={{ fontSize: '0.95rem' }}>SBI 34910284729</strong>
                  <small className="bm-sub">IFSC: SBIN0000084 • Giridih</small>
                </div>
              </div>
            </div>

            {/* Bank Challans Table */}
            <div className="table-responsive">
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Challan No.</th>
                    <th>Bank & Account Details</th>
                    <th>Deposit Type</th>
                    <th>Denomination Summary</th>
                    <th>Amount (₹)</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bankDepositsList.map(slip => (
                    <tr key={slip.id}>
                      <td><span className="receipt-tag">{slip.id}</span></td>
                      <td>
                        <strong>{slip.bankName}</strong>
                        <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b' }}>
                          A/c: {slip.accountNo} • {slip.branch}
                        </span>
                      </td>
                      <td>{slip.depositType}</td>
                      <td>
                        <span style={{ fontSize: '0.74rem', color: '#334155' }}>{slip.denominations}</span>
                      </td>
                      <td>
                        <strong className="amount-col">₹ {slip.amount.toLocaleString()}</strong>
                      </td>
                      <td>{slip.date}</td>
                      <td>
                        <span className={`status-badge ${slip.status === 'Verified by Bank' ? 'paid' : 'pending'}`}>
                          <i className={`fa-solid ${slip.status === 'Verified by Bank' ? 'fa-circle-check' : 'fa-clock'}`}></i>
                          {' '}{slip.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="view-receipt-btn"
                            onClick={() => setSelectedBankChallan(slip)}
                            title="Print Bank Deposit Slip"
                          >
                            <i className="fa-solid fa-print"></i> Print Challan
                          </button>
                          <button
                            type="button"
                            className="remind-btn"
                            onClick={() => handleToggleBankVerify(slip.id)}
                            title="Toggle bank verification status"
                          >
                            {slip.status === 'Verified by Bank' ? 'Mark Pending' : 'Mark Verified'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* NEW PANEL 2: TRANSPORT FLEET & ROUTE BILLING                             */}
        {/* ========================================================================= */}
        {activeTab === 'transport' && (
          <section className="acc-card active-panel">
            <div className="acc-card-header">
              <div>
                <h2>Transport Fleet & Route-Wise Student Billing</h2>
                <p className="card-subtitle">
                  Manage CBSE school bus fleet routes, monthly commuter tariffs, driver details, and student bus pass verification.
                </p>
              </div>
              <div className="header-action-group">
                <button
                  type="button"
                  className="acc-add-btn"
                  onClick={() => setAssignRouteModalOpen(true)}
                >
                  <i className="fa-solid fa-user-plus"></i> Assign Student to Route
                </button>
              </div>
            </div>

            {/* 4 School Bus Route Cards */}
            <div className="transport-routes-grid">
              {transportRoutesList.map(route => {
                const enrolledCount = transportStudentsList.filter(s => s.routeId === route.id).length;
                return (
                  <div key={route.id} className="transport-route-card">
                    <div className="tr-header">
                      <span className="tr-badge">{route.id}</span>
                      <strong className="tr-fee">₹ {route.monthlyFee} / mo</strong>
                    </div>
                    <h4 className="tr-title">{route.name}</h4>
                    <div className="tr-details">
                      <div><i className="fa-solid fa-bus"></i> Bus No: <strong>{route.busNo}</strong></div>
                      <div><i className="fa-solid fa-user-tie"></i> Driver: <strong>{route.driver}</strong></div>
                      <div><i className="fa-solid fa-phone"></i> Contact: {route.phone}</div>
                      <div><i className="fa-solid fa-users"></i> Capacity: <strong>{enrolledCount} / {route.capacity} seats</strong></div>
                    </div>
                    <div className="tr-stops">
                      <small><strong>Stops:</strong> {route.stops}</small>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Filter and Search Bar */}
            <div className="acc-filter-bar">
              <div className="search-input-wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search commuter by name, roll no, or stop..."
                  value={transportSearch}
                  onChange={(e) => setTransportSearch(e.target.value)}
                />
              </div>

              <div className="select-filters">
                <select
                  value={transportFilterRoute}
                  onChange={(e) => setTransportFilterRoute(e.target.value)}
                >
                  <option value="ALL">All Routes (4 Routes)</option>
                  <option value="RT-1">Route 1: Giridih Town & Station</option>
                  <option value="RT-2">Route 2: Naitand & Rajdhanwar</option>
                  <option value="RT-3">Route 3: Bengabad & Pando Chawk</option>
                  <option value="RT-4">Route 4: Jamua & Deori Bypass</option>
                </select>
              </div>
            </div>

            {/* Commuter Roster Table */}
            <div className="table-responsive">
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Roll No</th>
                    <th>Class</th>
                    <th>Assigned Route</th>
                    <th>Boarding Stop</th>
                    <th>Monthly Tariff (₹)</th>
                    <th>Bus Pass No</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transportStudentsList
                    .filter(s => {
                      const matchesRoute = transportFilterRoute === 'ALL' || s.routeId === transportFilterRoute;
                      const q = transportSearch.toLowerCase();
                      const matchesSearch = !q ||
                        s.studentName.toLowerCase().includes(q) ||
                        s.rollNo.toLowerCase().includes(q) ||
                        s.stop.toLowerCase().includes(q);
                      return matchesRoute && matchesSearch;
                    })
                    .map(student => (
                      <tr key={student.id}>
                        <td><strong>{student.studentName}</strong></td>
                        <td>#{student.rollNo}</td>
                        <td><span className="class-badge">{student.className}</span></td>
                        <td>
                          <strong>{student.routeId}</strong>
                        </td>
                        <td>{student.stop}</td>
                        <td><strong className="amount-col">₹ {student.monthlyFee}</strong></td>
                        <td><span className="receipt-tag">{student.busPassNo}</span></td>
                        <td>
                          <span className={`status-badge ${student.status === 'Paid' ? 'paid' : 'pending'}`}>
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              className="view-receipt-btn"
                              onClick={() => setSelectedBusPass(student)}
                              title="Print Student Bus Pass"
                            >
                              <i className="fa-solid fa-id-card"></i> Bus Pass
                            </button>
                            <button
                              type="button"
                              className="remind-btn"
                              onClick={() => handleToggleTransportFee(student.id)}
                            >
                              {student.status === 'Paid' ? 'Mark Due' : 'Mark Paid'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* NEW PANEL 3: HOSTEL RESIDENCY & MESS DINING DESK                         */}
        {/* ========================================================================= */}
        {activeTab === 'hostelMess' && (
          <section className="acc-card active-panel">
            <div className="acc-card-header">
              <div>
                <h2>Hostel Residency & Student Mess Dining Desk</h2>
                <p className="card-subtitle">
                  Boarding house room allocations, mess diet plans, monthly boarder billing, and caution deposits escrow.
                </p>
              </div>
              <div className="header-action-group">
                <button
                  type="button"
                  className="acc-add-btn"
                  onClick={() => setAdmitBoarderModalOpen(true)}
                >
                  <i className="fa-solid fa-plus-circle"></i> Admit New Boarder
                </button>
              </div>
            </div>

            {/* Room Occupancy Grid */}
            <div className="hostel-rooms-grid">
              {hostelRoomsList.map(room => (
                <div key={room.roomNo} className="hostel-room-card">
                  <div className="hr-top">
                    <span className="hr-room-badge">Room {room.roomNo}</span>
                    <span className={`hr-status-pill ${room.occupied >= room.capacity ? 'full' : 'avail'}`}>
                      {room.occupied >= room.capacity ? 'Full' : `${room.capacity - room.occupied} Available`}
                    </span>
                  </div>
                  <strong className="hr-wing">{room.wing}</strong>
                  <div className="hr-occ-bar-wrap">
                    <div
                      className="hr-occ-bar-fill"
                      style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <div className="hr-footer">
                    <span>{room.occupied}/{room.capacity} Beds</span>
                    <small>Warden: {room.warden}</small>
                  </div>
                </div>
              ))}
            </div>

            {/* Search Filter for Boarders */}
            <div className="acc-filter-bar">
              <div className="search-input-wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search boarder by name, roll no, or room..."
                  value={hostelSearch}
                  onChange={(e) => setHostelSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Boarders Table */}
            <div className="table-responsive">
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Roll No</th>
                    <th>Class</th>
                    <th>Room & Bed</th>
                    <th>Mess Diet Plan</th>
                    <th>Monthly Charges (₹)</th>
                    <th>Caution Deposit</th>
                    <th>Fee Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hostelBoardersList
                    .filter(b => {
                      const q = hostelSearch.toLowerCase().trim();
                      return !q ||
                        b.studentName.toLowerCase().includes(q) ||
                        b.rollNo.toLowerCase().includes(q) ||
                        b.roomNo.toLowerCase().includes(q) ||
                        b.messPlan.toLowerCase().includes(q);
                    })
                    .map(boarder => (
                    <tr key={boarder.id}>
                      <td><strong>{boarder.studentName}</strong></td>
                      <td>#{boarder.rollNo}</td>
                      <td><span className="class-badge">{boarder.className}</span></td>
                      <td><strong>Room {boarder.roomNo}</strong> ({boarder.bedNo})</td>
                      <td>
                        <span className="mess-diet-tag">
                          <i className="fa-solid fa-utensils"></i> {boarder.messPlan}
                        </span>
                      </td>
                      <td><strong className="amount-col">₹ {boarder.monthlyHostelFee.toLocaleString()}</strong></td>
                      <td>
                        <span className="caution-tag">₹ {boarder.cautionDeposit} ({boarder.cautionStatus})</span>
                      </td>
                      <td>
                        <span className={`status-badge ${boarder.feeStatus === 'Paid' ? 'paid' : 'pending'}`}>
                          {boarder.feeStatus}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="view-receipt-btn"
                            onClick={() => setSelectedHostelCert(boarder)}
                            title="Print Hostel Clearance Certificate"
                          >
                            <i className="fa-solid fa-file-contract"></i> Clearance
                          </button>
                          <button
                            type="button"
                            className="remind-btn"
                            onClick={() => handleToggleBoarderFee(boarder.id)}
                          >
                            {boarder.feeStatus === 'Paid' ? 'Mark Due' : 'Mark Paid'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* NEW PANEL 4: ONLINE FEE GATEWAY & QR SETTLEMENTS                         */}
        {/* ========================================================================= */}
        {activeTab === 'onlineGateway' && (
          <section className="acc-card active-panel">
            <div className="acc-card-header">
              <div>
                <h2>Online Fee Gateway & UPI QR Settlements Desk</h2>
                <p className="card-subtitle">
                  Instant counter UPI QR payments, PhonePe, Google Pay, BHIM, and SBI Collect merchant settlement ledger.
                </p>
              </div>
              <div className="header-action-group">
                <button
                  type="button"
                  className="acc-add-btn"
                  onClick={() => setQrAmountModalOpen(true)}
                >
                  <i className="fa-solid fa-qrcode"></i> Counter Dynamic UPI QR
                </button>
              </div>
            </div>

            {/* Gateway Settlement Metrics */}
            <div className="gateway-metrics-grid">
              <div className="gw-card emerald">
                <span className="gw-lbl">Total Online Volume (October)</span>
                <strong className="gw-val">
                  ₹ {onlineTransactionsList.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                </strong>
                <small className="gw-sub">100% digital trace</small>
              </div>

              <div className="gw-card blue">
                <span className="gw-lbl">Settled to SBI Treasury</span>
                <strong className="gw-val">
                  ₹ {onlineTransactionsList.filter(t => t.status === 'Settled to SBI').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                </strong>
                <small className="gw-sub">Reconciled bank credit</small>
              </div>

              <div className="gw-card amber">
                <span className="gw-lbl">Pending Bank Settlement</span>
                <strong className="gw-val">
                  ₹ {onlineTransactionsList.filter(t => t.status !== 'Settled to SBI').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                </strong>
                <small className="gw-sub">Next settlement cycle (T+1)</small>
              </div>

              <div className="gw-card purple">
                <span className="gw-lbl">Merchant Gateway MDR</span>
                <strong className="gw-val">0.00% (Free)</strong>
                <small className="gw-sub">NPCI Zero MDR for Education</small>
              </div>
            </div>

            {/* Filter by Gateway */}
            <div className="acc-filter-bar">
              <div className="select-filters">
                <select
                  value={onlineGatewayFilter}
                  onChange={(e) => setOnlineGatewayFilter(e.target.value)}
                >
                  <option value="ALL">All Online Channels ({onlineTransactionsList.length})</option>
                  <option value="PhonePe UPI QR">PhonePe UPI QR</option>
                  <option value="Google Pay UPI">Google Pay UPI</option>
                  <option value="SBI Collect Portal">SBI Collect Portal</option>
                  <option value="BHIM UPI QR">BHIM UPI QR</option>
                </select>
              </div>
            </div>

            {/* Online Transactions Table */}
            <div className="table-responsive">
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Txn ID</th>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Payer UPI ID (VPA)</th>
                    <th>Gateway Mode</th>
                    <th>Amount (₹)</th>
                    <th>Txn Timestamp</th>
                    <th>Bank Settlement Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {onlineTransactionsList
                    .filter(tx => onlineGatewayFilter === 'ALL' || tx.gateway === onlineGatewayFilter)
                    .map(tx => (
                      <tr key={tx.id}>
                        <td><span className="receipt-tag">{tx.id}</span></td>
                        <td><strong>{tx.studentName}</strong></td>
                        <td><span className="class-badge">{tx.className}</span></td>
                        <td><span className="mono-text">{tx.payerVpa}</span></td>
                        <td>
                          <span className="gateway-pill">
                            <i className="fa-solid fa-qrcode"></i> {tx.gateway}
                          </span>
                        </td>
                        <td><strong className="amount-col">₹ {tx.amount.toLocaleString()}</strong></td>
                        <td>{tx.date}</td>
                        <td>
                          <span className={`status-badge ${tx.status === 'Settled to SBI' ? 'paid' : 'pending'}`}>
                            <i className={`fa-solid ${tx.status === 'Settled to SBI' ? 'fa-check-double' : 'fa-hourglass-half'}`}></i>
                            {' '}{tx.status}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="remind-btn"
                            disabled={tx.status === 'Settled to SBI'}
                            onClick={() => handleSettleTransaction(tx.id)}
                            style={{ opacity: tx.status === 'Settled to SBI' ? 0.6 : 1 }}
                          >
                            {tx.status === 'Settled to SBI' ? 'Reconciled' : 'Settle Now'}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* NEW PANEL 5: CBSE ANNUAL FINANCIAL STATEMENT & AUDIT                      */}
        {/* ========================================================================= */}
        {activeTab === 'auditReports' && (
          <section className="acc-card active-panel">
            <div className="acc-card-header">
              <div>
                <h2>CBSE Annual Financial Statement & SMC Audit Desk</h2>
                <p className="card-subtitle">
                  Statutory School Management Committee (SMC) financial statements, head-wise revenue realizations, and operational expenditure audits.
                </p>
              </div>
              <div className="header-action-group">
                <select
                  value={auditYearFilter}
                  onChange={(e) => setAuditYearFilter(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    background: '#ffffff'
                  }}
                >
                  <option value="2026-27">Session 2026-27 (Current)</option>
                  <option value="2025-26">Session 2025-26</option>
                  <option value="2024-25">Session 2024-25</option>
                </select>
                <button
                  type="button"
                  className="acc-print-btn"
                  onClick={() => setSelectedAuditReportModal(true)}
                >
                  <i className="fa-solid fa-print"></i> Print Official Audit Statement
                </button>
              </div>
            </div>

            {/* Annual Balance Sheet Summary Cards */}
            <div className="audit-summary-grid">
              <div className="audit-card income">
                <span className="aud-lbl">Session Gross Revenue Realization</span>
                <strong className="aud-val">₹ {totalCollectedSession.toLocaleString()}</strong>
                <small className="aud-sub">From 10 composite fee heads</small>
              </div>

              <div className="audit-card expense">
                <span className="aud-lbl">Operating Expenditures Incurred</span>
                <strong className="aud-val">₹ {totalExpenses.toLocaleString()}</strong>
                <small className="aud-sub">Payroll, labs, fuel, maintenance</small>
              </div>

              <div className="audit-card surplus">
                <span className="aud-lbl">Net School Treasury Surplus</span>
                <strong className="aud-val">
                  {netTreasuryBalance >= 0 ? '+' : ''}₹ {netTreasuryBalance.toLocaleString()}
                </strong>
                <small className="aud-sub">
                  Operating Margin: {totalCollectedSession ? Math.round((netTreasuryBalance / totalCollectedSession) * 100) : 0}%
                </small>
              </div>
            </div>

            {/* 10 Fee Heads Realization Breakdown Table */}
            <h3 style={{ margin: '20px 0 10px 0', fontSize: '1rem', color: '#0f172a' }}>
              <i className="fa-solid fa-table-cells"></i> Head-Wise CBSE Financial Realization Ledger
            </h3>
            <div className="table-responsive">
              <table className="acc-table">
                <thead>
                  <tr>
                    <th>Fee Category</th>
                    <th>Description</th>
                    <th>Target Collection (₹)</th>
                    <th>Realized Revenue (₹)</th>
                    <th>Collection Ratio</th>
                    <th>Audit Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feeHeadDefinitions.map(head => {
                    const realized = feeRecords.reduce((sum, r) => {
                      if (r.feeBreakdown && r.feeBreakdown[head.key]) {
                        return sum + Number(r.feeBreakdown[head.key]);
                      }
                      if (head.key === 'tuitionFee') {
                        return sum + Number(r.amount || 0);
                      }
                      return sum;
                    }, 0);
                    const target = realized > 0 ? Math.round(realized * 1.15) : 15000;
                    const pct = Math.min(100, Math.round((realized / target) * 100));

                    return (
                      <tr key={head.key}>
                        <td>
                          <strong><i className={head.icon}></i> {head.label}</strong>
                        </td>
                        <td><small style={{ color: '#64748b' }}>{head.defaultDesc}</small></td>
                        <td>₹ {target.toLocaleString()}</td>
                        <td><strong className="amount-col">₹ {realized.toLocaleString()}</strong></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: '#059669' }}></div>
                            </div>
                            <span style={{ fontSize: '0.74rem', fontWeight: 700 }}>{pct}%</span>
                          </div>
                        </td>
                        <td>
                          <span className="status-badge paid">
                            <i className="fa-solid fa-shield-halved"></i> Audited
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Day Book / Daily Collection Summary Modal */}
        {showSummaryModal && (
          <div className="receipt-modal-overlay" onClick={() => setShowSummaryModal(false)}>
            <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="acc-modal-header">
                <h3><i className="fa-solid fa-chart-pie"></i> Day Book & Accounts Settlement Audit</h3>
                <button className="close-btn" onClick={() => setShowSummaryModal(false)}>×</button>
              </div>

              <div className="acc-modal-body">
                <div className="summary-stat-row">
                  <div className="summary-stat-box green">
                    <span>Session Gross Collection</span>
                    <h4>₹ {totalCollectedSession.toLocaleString()}</h4>
                  </div>
                  <div className="summary-stat-box rose">
                    <span>Total Operational Expenses</span>
                    <h4>₹ {totalExpenses.toLocaleString()}</h4>
                  </div>
                  <div className="summary-stat-box blue">
                    <span>Net In-Hand Treasury</span>
                    <h4>₹ {netTreasuryBalance.toLocaleString()}</h4>
                  </div>
                </div>

                <div className="daybook-mode-breakdown">
                  <div className="daybook-mode-item">
                    <span>💵 Cash in Register:</span>
                    <strong>₹ {cashTotal.toLocaleString()}</strong>
                  </div>
                  <div className="daybook-mode-item">
                    <span>📱 Digital UPI / QR:</span>
                    <strong>₹ {upiTotal.toLocaleString()}</strong>
                  </div>
                  <div className="daybook-mode-item">
                    <span>🏛️ Bank Cheque / DD:</span>
                    <strong>₹ {chequeTotal.toLocaleString()}</strong>
                  </div>
                </div>

                <h4 style={{ margin: '18px 0 10px 0', fontSize: '14px', color: '#0b1c3d' }}>
                  Today's Verified Receipts ({todayStr}) &bull; Counter Total: ₹{todayTotal.toLocaleString()}
                </h4>
                {todayReceipts.length === 0 ? (
                  <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '13px' }}>
                    No new receipts issued today yet.
                  </p>
                ) : (
                  <ul className="summary-receipt-list">
                    {todayReceipts.map(r => (
                      <li key={r.id}>
                        <span><strong>{r.id}</strong> — {r.studentName} ({r.className})</span>
                        <strong>₹ {r.amount.toLocaleString()} ({r.mode})</strong>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="modal-actions-bar">
                <button className="acc-print-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Day Sheet
                </button>
                <button className="acc-close-btn" onClick={() => setShowSummaryModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Printable Official CBSE Fee Receipt Modal */}
        {selectedReceipt && (
          <div className="receipt-modal-overlay" onClick={() => setSelectedReceipt(null)}>
            <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="receipt-printable-area" id="printable-receipt">
                <div className="receipt-top-header">
                  <img src={logo} alt="School Logo" className="receipt-logo" />
                  <div className="receipt-school-details">
                    <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                    <p>Affiliated with CBSE, New Delhi | Affiliation No: 3430398 | UDISE: 20060105502 | School Code: 08123</p>
                    <p>Village Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316</p>
                    <div className="receipt-doc-badge">OFFICIAL VERIFIED FEE PAYMENT RECEIPT</div>
                  </div>
                </div>

                <div className="receipt-meta-row">
                  <div><strong>Official Serial No:</strong> <span className="mono-text">{selectedReceipt.serialNo || selectedReceipt.id}</span></div>
                  <div><strong>Date Issued:</strong> {selectedReceipt.date}</div>
                  <div><strong>Academic Session:</strong> {selectedReceipt.session || academicSession.label}</div>
                </div>

                <div className="receipt-student-details-box">
                  <div className="r-detail-item"><span>Student Name:</span> <strong>{selectedReceipt.studentName}</strong></div>
                  <div className="r-detail-item"><span>Roll / Admission No:</span> <strong>{selectedReceipt.rollNo}</strong></div>
                  <div className="r-detail-item"><span>Class / Standard:</span> <strong>{selectedReceipt.className}</strong></div>
                  <div className="r-detail-item"><span>Billing Month:</span> <strong>{selectedReceipt.month}</strong></div>
                </div>

                <table className="receipt-items-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>Sl.</th>
                      <th>Fee Head Particulars</th>
                      <th>Payment Mode</th>
                      <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const breakdown = selectedReceipt.feeBreakdown;
                      const activeHeads = breakdown
                        ? feeHeadDefinitions.filter(h => Number(breakdown[h.key]) > 0)
                        : [];

                      if (activeHeads.length > 0) {
                        return activeHeads.map((head, idx) => (
                          <tr key={head.key}>
                            <td>{idx + 1}.</td>
                            <td>
                              <strong>{head.label}</strong>
                              <span style={{ display: 'block', fontSize: '0.74rem', color: '#64748b' }}>{head.defaultDesc}</span>
                            </td>
                            <td>{selectedReceipt.mode || 'Cash'}</td>
                            <td style={{ textAlign: 'right', fontWeight: 600 }}>₹ {Number(breakdown[head.key]).toLocaleString('en-IN')}</td>
                          </tr>
                        ));
                      }

                      return (
                        <tr>
                          <td>1.</td>
                          <td>
                            <strong>Monthly Tuition & Composite Academic Fee ({selectedReceipt.month})</strong>
                            <span style={{ display: 'block', fontSize: '0.74rem', color: '#64748b' }}>Classroom instruction, CBSE curriculum & library access</span>
                          </td>
                          <td>{selectedReceipt.mode || 'Cash'}</td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>₹ {Number(selectedReceipt.amount).toLocaleString('en-IN')}</td>
                        </tr>
                      );
                    })()}
                    <tr className="receipt-total-row">
                      <td colSpan="3"><strong>Total Net Amount Received (in figures)</strong></td>
                      <td style={{ textAlign: 'right' }}><strong>₹ {Number(selectedReceipt.amount).toLocaleString('en-IN')}</strong></td>
                    </tr>
                    <tr className="receipt-words-row">
                      <td colSpan="4">
                        <strong>Amount in Words:</strong> {numberToWords(Number(selectedReceipt.amount))}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {selectedReceipt.remarks && (
                  <div className="receipt-remarks-line">
                    <strong>Payment Narration / Reference:</strong> {selectedReceipt.remarks}
                  </div>
                )}

                <div className="receipt-signatures">
                  <div className="sig-block">
                    <p className="sig-line"></p>
                    <span>Parent / Depositor Signature</span>
                  </div>
                  <div className="sig-block">
                    <div className="school-stamp">OFFICIALLY VERIFIED & AUDITED</div>
                    <p className="sig-line"></p>
                    <span>Authorized Accountant Signature</span>
                  </div>
                </div>

                <div className="real-receipt-barcode-row modal-barcode">
                  <div className="barcode-graphic" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <span className="barcode-serial-text">{selectedReceipt.serialNo || selectedReceipt.id} • CBSE AUTHENTICATED PAYMENT RECEIPT</span>
                </div>

                <div className="receipt-disclaimer-note" style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748b', marginTop: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                  This is a computer-verified official receipt issued by LBMDPS Accounts Treasury. Fees once remitted are non-refundable. Please retain this receipt for documentation and tuition rebate records.
                </div>
              </div>

              <div className="modal-actions-bar no-print">
                <button className="acc-print-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Official Receipt
                </button>
                <button className="acc-close-btn" onClick={() => setSelectedReceipt(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Printable Official Expense Payment Voucher Modal */}
        {selectedExpenseVoucher && (
          <div className="receipt-modal-overlay" onClick={() => setSelectedExpenseVoucher(null)}>
            <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="receipt-printable-area">
                <div className="receipt-top-header">
                  <img src={logo} alt="School Logo" className="receipt-logo" />
                  <div className="receipt-school-details">
                    <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                    <p>Affiliated with CBSE, New Delhi | Affiliation No: 3430398</p>
                    <p>Village Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316</p>
                    <div className="receipt-doc-badge" style={{ background: '#b91c1c' }}>OFFICIAL EXPENSE PAYMENT VOUCHER</div>
                  </div>
                </div>

                <div className="receipt-meta-row">
                  <div><strong>Voucher No:</strong> <span className="mono-text">{selectedExpenseVoucher.id}</span></div>
                  <div><strong>Date:</strong> {selectedExpenseVoucher.date}</div>
                  <div><strong>Session:</strong> {academicSession.label}</div>
                </div>

                <div className="receipt-student-details-box" style={{ background: '#fff1f2', borderColor: '#fecdd3' }}>
                  <div className="r-detail-item"><span>Payee / Vendor:</span> <strong>{selectedExpenseVoucher.payee}</strong></div>
                  <div className="r-detail-item"><span>Bill / Invoice No:</span> <strong>{selectedExpenseVoucher.billNo || 'N/A'}</strong></div>
                  <div className="r-detail-item"><span>Category:</span> <strong>{selectedExpenseVoucher.category}</strong></div>
                  <div className="r-detail-item"><span>Payment Mode:</span> <strong>{selectedExpenseVoucher.mode}</strong></div>
                </div>

                <table className="receipt-items-table">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>Expense Particulars</th>
                      <th>Category</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>{selectedExpenseVoucher.title}</td>
                      <td>{selectedExpenseVoucher.category}</td>
                      <td>₹ {selectedExpenseVoucher.amount.toLocaleString()}</td>
                    </tr>
                    <tr className="receipt-total-row">
                      <td colSpan="3"><strong>Total Disbursed (in figures)</strong></td>
                      <td><strong style={{ color: '#b91c1c' }}>₹ {selectedExpenseVoucher.amount.toLocaleString()}</strong></td>
                    </tr>
                    <tr className="receipt-words-row">
                      <td colSpan="4">
                        <strong>Amount in Words:</strong> {numberToWords(Number(selectedExpenseVoucher.amount))}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {selectedExpenseVoucher.remarks && (
                  <div className="receipt-remarks-line" style={{ borderLeftColor: '#b91c1c' }}>
                    <strong>Narration:</strong> {selectedExpenseVoucher.remarks}
                  </div>
                )}

                <div className="receipt-signatures">
                  <div className="sig-block">
                    <p className="sig-line"></p>
                    <span>Receiver / Payee Signature</span>
                  </div>
                  <div className="sig-block">
                    <div className="school-stamp" style={{ borderColor: '#b91c1c', color: '#b91c1c' }}>PAID & DEBITED</div>
                    <p className="sig-line"></p>
                    <span>Authorized Accountant Sign</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions-bar no-print">
                <button className="acc-print-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Expense Voucher
                </button>
                <button className="acc-close-btn" onClick={() => setSelectedExpenseVoucher(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Printable Staff Pay Slip Modal */}
        {selectedPaySlip && (
          <div className="receipt-modal-overlay" onClick={() => setSelectedPaySlip(null)}>
            <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="receipt-printable-area">
                <div className="receipt-top-header">
                  <img src={logo} alt="School Logo" className="receipt-logo" />
                  <div className="receipt-school-details">
                    <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                    <p>Affiliated with CBSE, New Delhi | Affiliation No: 3430398</p>
                    <p>Village Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316</p>
                    <div className="receipt-doc-badge" style={{ background: '#1d4ed8' }}>STAFF SALARY PAY SLIP</div>
                  </div>
                </div>

                <div className="receipt-meta-row">
                  <div><strong>Payroll Ref:</strong> <span className="mono-text">{selectedPaySlip.id}</span></div>
                  <div><strong>Disbursement Date:</strong> {selectedPaySlip.date || todayStr}</div>
                  <div><strong>Month:</strong> {selectedPaySlip.month}</div>
                </div>

                <div className="receipt-student-details-box" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
                  <div className="r-detail-item"><span>Staff Full Name:</span> <strong>{selectedPaySlip.staffName}</strong></div>
                  <div className="r-detail-item"><span>Designation / Role:</span> <strong>{selectedPaySlip.role}</strong></div>
                  <div className="r-detail-item"><span>Payment Mode:</span> <strong>{selectedPaySlip.mode}</strong></div>
                  <div className="r-detail-item"><span>Status:</span> <strong style={{ color: '#059669' }}>Disbursed & Verified</strong></div>
                </div>

                <table className="receipt-items-table">
                  <thead>
                    <tr>
                      <th>Earnings Particulars</th>
                      <th>Amount (₹)</th>
                      <th>Deductions</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Basic Pay & DA</td>
                      <td>₹ {selectedPaySlip.baseSalary.toLocaleString()}</td>
                      <td>Provident Fund (PF)</td>
                      <td>₹ 0</td>
                    </tr>
                    <tr className="receipt-total-row">
                      <td><strong>Net Payable Salary</strong></td>
                      <td><strong>₹ {selectedPaySlip.baseSalary.toLocaleString()}</strong></td>
                      <td><strong>Total Deductions</strong></td>
                      <td><strong>₹ 0</strong></td>
                    </tr>
                    <tr className="receipt-words-row">
                      <td colSpan="4">
                        <strong>Net Amount in Words:</strong> {numberToWords(Number(selectedPaySlip.baseSalary))}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="receipt-signatures">
                  <div className="sig-block">
                    <p className="sig-line"></p>
                    <span>Staff Member Signature</span>
                  </div>
                  <div className="sig-block">
                    <div className="school-stamp">SALARY DISBURSED</div>
                    <p className="sig-line"></p>
                    <span>Authorized Treasurer Sign</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions-bar no-print">
                <button className="acc-print-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Staff Pay Slip
                </button>
                <button className="acc-close-btn" onClick={() => setSelectedPaySlip(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ========================================================================= */}
        {/* NEW MODAL 1: CREATE BANK DEPOSIT CHALLAN MODAL                            */}
        {/* ========================================================================= */}
        {bankChallanModalOpen && (
          <div className="receipt-modal-overlay" onClick={() => setBankChallanModalOpen(false)}>
            <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="acc-modal-header">
                <h3><i className="fa-solid fa-building-columns"></i> Create Bank Deposit Challan (SBI / PNB)</h3>
                <button className="close-btn" onClick={() => setBankChallanModalOpen(false)}>×</button>
              </div>

              <form onSubmit={handleCreateBankChallan} className="acc-modal-body">
                <div className="form-row-2">
                  <label>
                    <span>Bank Name *</span>
                    <select
                      value={bankChallanForm.bankName}
                      onChange={(e) => {
                        const bName = e.target.value;
                        setBankChallanForm({
                          ...bankChallanForm,
                          bankName: bName,
                          accountNo: bName.includes('SBI') ? '34910284729' : '0912002100045612',
                          ifsc: bName.includes('SBI') ? 'SBIN0000084' : 'PUNB0091200',
                          branch: bName.includes('SBI') ? 'Giridih Main Branch' : 'Court Road Giridih'
                        });
                      }}
                    >
                      <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                      <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
                    </select>
                  </label>

                  <label>
                    <span>School Account No.</span>
                    <input type="text" readOnly value={bankChallanForm.accountNo} />
                  </label>
                </div>

                <div className="form-row-2">
                  <label>
                    <span>Deposit Batch Type *</span>
                    <select
                      value={bankChallanForm.depositType}
                      onChange={(e) => setBankChallanForm({ ...bankChallanForm, depositType: e.target.value })}
                    >
                      <option value="Daily Counter Cash Batch">Daily Counter Cash Batch</option>
                      <option value="Term Exam Fee Remittance">Term Exam Fee Remittance</option>
                      <option value="Cheque Clearance Batch">Cheque Clearance Batch</option>
                      <option value="Special Auxiliary Remittance">Special Auxiliary Remittance</option>
                    </select>
                  </label>

                  <label>
                    <span>Cashier / Remitter</span>
                    <input
                      type="text"
                      required
                      value={bankChallanForm.cashier}
                      onChange={(e) => setBankChallanForm({ ...bankChallanForm, cashier: e.target.value })}
                    />
                  </label>
                </div>

                {/* Interactive Currency Denomination Counter */}
                <h4 style={{ margin: '14px 0 8px 0', fontSize: '0.85rem', color: '#0f172a' }}>
                  <i className="fa-solid fa-money-bill-wave"></i> Currency Denomination Breakdown
                </h4>
                <div className="denomination-grid">
                  {[
                    { key: 'n500', note: '₹500', val: 500 },
                    { key: 'n200', note: '₹200', val: 200 },
                    { key: 'n100', note: '₹100', val: 100 },
                    { key: 'n50', note: '₹50', val: 50 },
                    { key: 'n20', note: '₹20', val: 20 },
                    { key: 'n10', note: '₹10', val: 10 },
                  ].map(d => (
                    <div key={d.key} className="denom-item">
                      <span className="denom-label">{d.note} ×</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={bankDenominations[d.key]}
                        onChange={(e) => setBankDenominations({ ...bankDenominations, [d.key]: e.target.value })}
                      />
                      <span className="denom-total">
                        = ₹{((Number(bankDenominations[d.key]) || 0) * d.val).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="denom-grand-total">
                  <span>Total Deposit Amount:</span>
                  <strong>₹ {computeBankDenomTotal().toLocaleString()}</strong>
                </div>

                <div className="modal-actions-bar">
                  <button type="submit" className="acc-print-btn">
                    <i className="fa-solid fa-file-circle-check"></i> Generate & Issue Challan
                  </button>
                  <button type="button" className="acc-close-btn" onClick={() => setBankChallanModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NEW MODAL 2: PRINTABLE 3-PART BANK DEPOSIT CHALLAN SLIP                   */}
        {/* ========================================================================= */}
        {selectedBankChallan && (
          <div className="receipt-modal-overlay" onClick={() => setSelectedBankChallan(null)}>
            <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="receipt-printable-area">
                <div className="receipt-top-header">
                  <img src={logo} alt="School Logo" className="receipt-logo" />
                  <div className="receipt-school-details">
                    <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                    <p>Affiliated to CBSE, New Delhi | Affiliation No: 3430398</p>
                    <p>Village Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316</p>
                    <div className="receipt-doc-badge" style={{ background: '#0284c7' }}>
                      BANK DEPOSIT CHALLAN (TRIPLICATE: BANK / SCHOOL / DEPOSITOR)
                    </div>
                  </div>
                </div>

                <div className="receipt-meta-row">
                  <div><strong>Challan No:</strong> <span className="mono-text">{selectedBankChallan.id}</span></div>
                  <div><strong>Date:</strong> {selectedBankChallan.date}</div>
                  <div><strong>Session:</strong> {academicSession.label}</div>
                </div>

                <div className="receipt-student-details-box" style={{ background: '#f0f9ff', borderColor: '#bae6fd' }}>
                  <div className="r-detail-item"><span>Bank:</span> <strong>{selectedBankChallan.bankName}</strong></div>
                  <div className="r-detail-item"><span>Account No:</span> <strong className="mono-text">{selectedBankChallan.accountNo}</strong></div>
                  <div className="r-detail-item"><span>Branch & IFSC:</span> <strong>{selectedBankChallan.branch} ({selectedBankChallan.ifsc})</strong></div>
                  <div className="r-detail-item"><span>Remitter / Cashier:</span> <strong>{selectedBankChallan.cashier}</strong></div>
                </div>

                <table className="receipt-items-table">
                  <thead>
                    <tr>
                      <th>Sl.</th>
                      <th>Remittance Particulars</th>
                      <th>Denominations</th>
                      <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>
                        <strong>{selectedBankChallan.depositType}</strong>
                        <span style={{ display: 'block', fontSize: '0.74rem', color: '#64748b' }}>UTR: {selectedBankChallan.utrNo}</span>
                      </td>
                      <td>{selectedBankChallan.denominations}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>₹ {selectedBankChallan.amount.toLocaleString()}</td>
                    </tr>
                    <tr className="receipt-total-row">
                      <td colSpan="3"><strong>Total Remittance to Bank</strong></td>
                      <td style={{ textAlign: 'right' }}><strong>₹ {selectedBankChallan.amount.toLocaleString()}</strong></td>
                    </tr>
                    <tr className="receipt-words-row">
                      <td colSpan="4">
                        <strong>Amount in Words:</strong> {numberToWords(Number(selectedBankChallan.amount))}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="receipt-signatures">
                  <div className="sig-block">
                    <p className="sig-line"></p>
                    <span>School Cashier Signature</span>
                  </div>
                  <div className="sig-block">
                    <div className="school-stamp" style={{ borderColor: '#0284c7', color: '#0284c7' }}>
                      BANK SCROLL RECEIVED
                    </div>
                    <p className="sig-line"></p>
                    <span>Receiving Bank Officer Stamp</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions-bar no-print">
                <button className="acc-print-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Triplicate Challan
                </button>
                <button className="acc-close-btn" onClick={() => setSelectedBankChallan(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NEW MODAL 3: ASSIGN STUDENT TO BUS ROUTE MODAL                            */}
        {/* ========================================================================= */}
        {assignRouteModalOpen && (
          <div className="receipt-modal-overlay" onClick={() => setAssignRouteModalOpen(false)}>
            <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="acc-modal-header">
                <h3><i className="fa-solid fa-bus"></i> Assign Student to School Bus Route</h3>
                <button className="close-btn" onClick={() => setAssignRouteModalOpen(false)}>×</button>
              </div>

              <form onSubmit={handleAssignTransportStudent} className="acc-modal-body">
                <div className="form-row-2">
                  <label>
                    <span>Student Full Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Kumar"
                      value={newRouteStudentForm.studentName}
                      onChange={(e) => setNewRouteStudentForm({ ...newRouteStudentForm, studentName: e.target.value })}
                    />
                  </label>
                  <label>
                    <span>Roll Number / Admission No</span>
                    <input
                      type="text"
                      placeholder="e.g. 108"
                      value={newRouteStudentForm.rollNo}
                      onChange={(e) => setNewRouteStudentForm({ ...newRouteStudentForm, rollNo: e.target.value })}
                    />
                  </label>
                </div>

                <div className="form-row-2">
                  <label>
                    <span>Class / Standard *</span>
                    <select
                      value={newRouteStudentForm.className}
                      onChange={(e) => setNewRouteStudentForm({ ...newRouteStudentForm, className: e.target.value })}
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Select Bus Route *</span>
                    <select
                      value={newRouteStudentForm.routeId}
                      onChange={(e) => {
                        const rId = e.target.value;
                        const rObj = transportRoutesList.find(r => r.id === rId);
                        setNewRouteStudentForm({
                          ...newRouteStudentForm,
                          routeId: rId,
                          monthlyFee: String(rObj ? rObj.monthlyFee : 650)
                        });
                      }}
                    >
                      <option value="RT-1">Route 1: Giridih Town & Station (₹650/mo)</option>
                      <option value="RT-2">Route 2: Naitand & Rajdhanwar (₹550/mo)</option>
                      <option value="RT-3">Route 3: Bengabad & Pando Chawk (₹700/mo)</option>
                      <option value="RT-4">Route 4: Jamua & Deori Bypass (₹750/mo)</option>
                    </select>
                  </label>
                </div>

                <div className="form-row-2">
                  <label>
                    <span>Boarding Bus Stop *</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bada Chowk"
                      value={newRouteStudentForm.stop}
                      onChange={(e) => setNewRouteStudentForm({ ...newRouteStudentForm, stop: e.target.value })}
                    />
                  </label>
                  <label>
                    <span>Monthly Bus Fee (₹) *</span>
                    <input
                      type="number"
                      required
                      value={newRouteStudentForm.monthlyFee}
                      onChange={(e) => setNewRouteStudentForm({ ...newRouteStudentForm, monthlyFee: e.target.value })}
                    />
                  </label>
                </div>

                <div className="modal-actions-bar">
                  <button type="submit" className="acc-print-btn">
                    <i className="fa-solid fa-id-card"></i> Issue Bus Pass & Enroll
                  </button>
                  <button type="button" className="acc-close-btn" onClick={() => setAssignRouteModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NEW MODAL 4: PRINTABLE STUDENT BUS PASS / TRANSPORT ID CARD               */}
        {/* ========================================================================= */}
        {selectedBusPass && (
          <div className="receipt-modal-overlay" onClick={() => setSelectedBusPass(null)}>
            <div className="receipt-modal-card" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
              <div className="receipt-printable-area bus-pass-card">
                <div className="bus-pass-top">
                  <img src={logo} alt="Logo" className="bus-pass-logo" />
                  <div>
                    <h3>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h3>
                    <p>CBSE Affiliated #3430398 • Naitand, Giridih</p>
                    <span className="bus-pass-tag">OFFICIAL STUDENT BUS COMMUTER PASS</span>
                  </div>
                </div>

                <div className="bus-pass-content">
                  <div className="bus-pass-photo-box">
                    <i className="fa-solid fa-user-graduate"></i>
                    <span>STUDENT PHOTO</span>
                  </div>

                  <div className="bus-pass-info">
                    <div><span>Student:</span> <strong>{selectedBusPass.studentName}</strong></div>
                    <div><span>Roll No:</span> <strong>#{selectedBusPass.rollNo} ({selectedBusPass.className})</strong></div>
                    <div><span>Bus Pass No:</span> <strong className="mono-text">{selectedBusPass.busPassNo}</strong></div>
                    <div><span>Assigned Route:</span> <strong>{selectedBusPass.routeId}</strong></div>
                    <div><span>Boarding Stop:</span> <strong>{selectedBusPass.stop}</strong></div>
                    <div><span>Valid Session:</span> <strong>{academicSession.label}</strong></div>
                  </div>
                </div>

                <div className="bus-pass-barcode-wrap">
                  <div className="barcode-graphic" style={{ height: '22px' }}></div>
                  <small className="mono-text">{selectedBusPass.busPassNo} • TRANSPORT COMMUTER ID</small>
                </div>
              </div>

              <div className="modal-actions-bar no-print">
                <button className="acc-print-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Bus Pass Card
                </button>
                <button className="acc-close-btn" onClick={() => setSelectedBusPass(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NEW MODAL 5: ADMIT NEW BOARDER TO HOSTEL MODAL                            */}
        {/* ========================================================================= */}
        {admitBoarderModalOpen && (
          <div className="receipt-modal-overlay" onClick={() => setAdmitBoarderModalOpen(false)}>
            <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="acc-modal-header">
                <h3><i className="fa-solid fa-bed"></i> Admit Boarder to School Hostel & Mess</h3>
                <button className="close-btn" onClick={() => setAdmitBoarderModalOpen(false)}>×</button>
              </div>

              <form onSubmit={handleAdmitHostelBoarder} className="acc-modal-body">
                <div className="form-row-2">
                  <label>
                    <span>Boarder Student Full Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunil Mahto"
                      value={newBoarderForm.studentName}
                      onChange={(e) => setNewBoarderForm({ ...newBoarderForm, studentName: e.target.value })}
                    />
                  </label>
                  <label>
                    <span>Roll Number / Admission No</span>
                    <input
                      type="text"
                      placeholder="e.g. 119"
                      value={newBoarderForm.rollNo}
                      onChange={(e) => setNewBoarderForm({ ...newBoarderForm, rollNo: e.target.value })}
                    />
                  </label>
                </div>

                <div className="form-row-2">
                  <label>
                    <span>Class / Standard *</span>
                    <select
                      value={newBoarderForm.className}
                      onChange={(e) => setNewBoarderForm({ ...newBoarderForm, className: e.target.value })}
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Allocate Room *</span>
                    <select
                      value={newBoarderForm.roomNo}
                      onChange={(e) => setNewBoarderForm({ ...newBoarderForm, roomNo: e.target.value })}
                    >
                      {hostelRoomsList.map(r => (
                        <option key={r.roomNo} value={r.roomNo}>
                          Room {r.roomNo} - {r.wing} ({r.occupied}/{r.capacity} beds)
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="form-row-2">
                  <label>
                    <span>Mess Diet Plan *</span>
                    <select
                      value={newBoarderForm.messPlan}
                      onChange={(e) => setNewBoarderForm({ ...newBoarderForm, messPlan: e.target.value })}
                    >
                      <option value="Standard Pure Veg">Standard Pure Veg</option>
                      <option value="North Indian Veg + Egg">North Indian Veg + Egg</option>
                      <option value="North Indian Veg + Milk Special">North Indian Veg + Milk Special</option>
                    </select>
                  </label>

                  <label>
                    <span>Guardian Emergency Phone *</span>
                    <input
                      type="text"
                      required
                      placeholder="+91 94314 XXXXX"
                      value={newBoarderForm.guardianPhone}
                      onChange={(e) => setNewBoarderForm({ ...newBoarderForm, guardianPhone: e.target.value })}
                    />
                  </label>
                </div>

                <div className="form-row-2">
                  <label>
                    <span>Monthly Hostel & Mess Tariff (₹)</span>
                    <input
                      type="number"
                      required
                      value={newBoarderForm.monthlyHostelFee}
                      onChange={(e) => setNewBoarderForm({ ...newBoarderForm, monthlyHostelFee: e.target.value })}
                    />
                  </label>
                  <label>
                    <span>One-Time Caution Deposit (₹)</span>
                    <input
                      type="number"
                      required
                      value={newBoarderForm.cautionDeposit}
                      onChange={(e) => setNewBoarderForm({ ...newBoarderForm, cautionDeposit: e.target.value })}
                    />
                  </label>
                </div>

                <div className="modal-actions-bar">
                  <button type="submit" className="acc-print-btn">
                    <i className="fa-solid fa-check"></i> Admit & Allocate Room
                  </button>
                  <button type="button" className="acc-close-btn" onClick={() => setAdmitBoarderModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NEW MODAL 6: PRINTABLE HOSTEL CLEARANCE CERTIFICATE                       */}
        {/* ========================================================================= */}
        {selectedHostelCert && (
          <div className="receipt-modal-overlay" onClick={() => setSelectedHostelCert(null)}>
            <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="receipt-printable-area">
                <div className="receipt-top-header">
                  <img src={logo} alt="Logo" className="receipt-logo" />
                  <div className="receipt-school-details">
                    <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                    <p>Affiliated to CBSE, New Delhi | Affiliation No: 3430398</p>
                    <p>Village Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316</p>
                    <div className="receipt-doc-badge" style={{ background: '#4f46e5' }}>
                      HOSTEL RESIDENCY & CAUTION DEPOSIT CLEARANCE SLIP
                    </div>
                  </div>
                </div>

                <div className="receipt-meta-row">
                  <div><strong>Hostel ID:</strong> <span className="mono-text">{selectedHostelCert.id}</span></div>
                  <div><strong>Date:</strong> {todayStr}</div>
                  <div><strong>Academic Session:</strong> {academicSession.label}</div>
                </div>

                <div className="receipt-student-details-box" style={{ background: '#eef2ff', borderColor: '#c7d2fe' }}>
                  <div className="r-detail-item"><span>Student Name:</span> <strong>{selectedHostelCert.studentName}</strong></div>
                  <div className="r-detail-item"><span>Roll / Class:</span> <strong>#{selectedHostelCert.rollNo} ({selectedHostelCert.className})</strong></div>
                  <div className="r-detail-item"><span>Allocated Room:</span> <strong>Room {selectedHostelCert.roomNo} ({selectedHostelCert.bedNo})</strong></div>
                  <div className="r-detail-item"><span>Mess Plan:</span> <strong>{selectedHostelCert.messPlan}</strong></div>
                </div>

                <table className="receipt-items-table">
                  <thead>
                    <tr>
                      <th>Particulars</th>
                      <th>Amount (₹)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monthly Hostel Room & Dining Mess Charges</td>
                      <td>₹ {selectedHostelCert.monthlyHostelFee.toLocaleString()}</td>
                      <td>{selectedHostelCert.feeStatus}</td>
                    </tr>
                    <tr>
                      <td>One-Time Hostel Caution Deposit in Escrow</td>
                      <td>₹ {selectedHostelCert.cautionDeposit.toLocaleString()}</td>
                      <td>{selectedHostelCert.cautionStatus}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="receipt-signatures">
                  <div className="sig-block">
                    <p className="sig-line"></p>
                    <span>Hostel Warden Signature</span>
                  </div>
                  <div className="sig-block">
                    <div className="school-stamp" style={{ borderColor: '#4f46e5', color: '#4f46e5' }}>
                      HOSTEL DESK VERIFIED
                    </div>
                    <p className="sig-line"></p>
                    <span>Accounts Officer Signature</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions-bar no-print">
                <button className="acc-print-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Clearance Certificate
                </button>
                <button className="acc-close-btn" onClick={() => setSelectedHostelCert(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NEW MODAL 7: COUNTER DYNAMIC UPI QR CODE MODAL                            */}
        {/* ========================================================================= */}
        {qrAmountModalOpen && (
          <div className="receipt-modal-overlay" onClick={() => setQrAmountModalOpen(false)}>
            <div className="receipt-modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
              <div className="acc-modal-header">
                <h3><i className="fa-solid fa-qrcode"></i> Instant Counter UPI QR Code</h3>
                <button className="close-btn" onClick={() => setQrAmountModalOpen(false)}>×</button>
              </div>

              <div className="acc-modal-body" style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 14px 0' }}>
                  Ask parent to scan this QR code using any UPI app (PhonePe, Google Pay, Paytm, BHIM, SBI YONO).
                </p>

                <div className="dynamic-qr-box">
                  <div className="qr-brand-row">
                    <img src={logo} alt="School Logo" className="qr-school-logo" />
                    <div>
                      <strong>LBM DIVINE PUBLIC SCHOOL</strong>
                      <small>CBSE Affiliated #3430398</small>
                    </div>
                  </div>

                  <div className="qr-visual-graphic">
                    <i className="fa-solid fa-qrcode" style={{ fontSize: '140px', color: '#0f172a' }}></i>
                  </div>

                  <div className="qr-details-strip">
                    <div><strong>Payable Amount:</strong> <span className="qr-amt">₹ {Number(qrAmountForm.amount || 1850).toLocaleString()}</span></div>
                    <div style={{ fontSize: '0.74rem', color: '#475569' }}>Student: <strong>{qrAmountForm.studentName}</strong> ({qrAmountForm.className})</div>
                    <div className="mono-text" style={{ fontSize: '0.72rem', color: '#059669', marginTop: '4px' }}>
                      UPI ID: lbmdps.giridih@sbi
                    </div>
                  </div>
                </div>

                <div className="form-row-2" style={{ marginTop: '14px', textAlign: 'left' }}>
                  <label>
                    <span>Change Amount (₹)</span>
                    <input
                      type="number"
                      value={qrAmountForm.amount}
                      onChange={(e) => setQrAmountForm({ ...qrAmountForm, amount: e.target.value })}
                    />
                  </label>
                  <label>
                    <span>Student Name</span>
                    <input
                      type="text"
                      value={qrAmountForm.studentName}
                      onChange={(e) => setQrAmountForm({ ...qrAmountForm, studentName: e.target.value })}
                    />
                  </label>
                </div>
              </div>

              <div className="modal-actions-bar">
                <button className="acc-print-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Counter QR
                </button>
                <button className="acc-close-btn" onClick={() => setQrAmountModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NEW MODAL 8: CBSE SMC ANNUAL AUDITED BALANCE SHEET MODAL                  */}
        {/* ========================================================================= */}
        {selectedAuditReportModal && (
          <div className="receipt-modal-overlay" onClick={() => setSelectedAuditReportModal(false)}>
            <div className="receipt-modal-card" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
              <div className="receipt-printable-area">
                <div className="receipt-top-header">
                  <img src={logo} alt="Logo" className="receipt-logo" />
                  <div className="receipt-school-details">
                    <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                    <p>Affiliated to CBSE, New Delhi | Affiliation No: 3430398 | School Code: 08123</p>
                    <p>Village Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316</p>
                    <div className="receipt-doc-badge" style={{ background: '#059669' }}>
                      STATUTORY ANNUAL FINANCIAL STATEMENT & AUDIT REPORT (SESSION {academicSession.label})
                    </div>
                  </div>
                </div>

                <div className="receipt-meta-row">
                  <div><strong>Audit Ref:</strong> <span className="mono-text">SMC-AUD-{academicSession.label}-01</span></div>
                  <div><strong>Audit Date:</strong> {todayStr}</div>
                  <div><strong>Compliance:</strong> CBSE Affiliation Bye-Laws 2018</div>
                </div>

                <div className="audit-table-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', margin: '14px 0' }}>
                  {/* Income Column */}
                  <div>
                    <h4 style={{ background: '#ecfdf5', color: '#065f46', padding: '6px 10px', borderRadius: '4px', margin: '0 0 6px 0', fontSize: '0.82rem' }}>
                      RECEIPTS & REVENUE HEADS (₹)
                    </h4>
                    <table className="receipt-items-table" style={{ margin: 0 }}>
                      <tbody>
                        {feeHeadDefinitions.map(h => (
                          <tr key={h.key}>
                            <td>{h.label}</td>
                            <td style={{ textAlign: 'right', fontWeight: 600 }}>
                              ₹ {(h.key === 'tuitionFee' ? totalCollectedSession : 0).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                        <tr className="receipt-total-row">
                          <td><strong>Gross Realized Income</strong></td>
                          <td style={{ textAlign: 'right' }}><strong>₹ {totalCollectedSession.toLocaleString()}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Expenditure Column */}
                  <div>
                    <h4 style={{ background: '#fff1f2', color: '#9f1239', padding: '6px 10px', borderRadius: '4px', margin: '0 0 6px 0', fontSize: '0.82rem' }}>
                      OPERATIONAL EXPENDITURES (₹)
                    </h4>
                    <table className="receipt-items-table" style={{ margin: 0 }}>
                      <tbody>
                        {expensesList.slice(0, 6).map(e => (
                          <tr key={e.id}>
                            <td>{e.category}</td>
                            <td style={{ textAlign: 'right', fontWeight: 600 }}>₹ {e.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr className="receipt-total-row">
                          <td><strong>Gross Expenses</strong></td>
                          <td style={{ textAlign: 'right' }}><strong>₹ {totalExpenses.toLocaleString()}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="receipt-student-details-box" style={{ background: '#f8fafc', borderColor: '#cbd5e1' }}>
                  <div className="r-detail-item">
                    <span>Net Operating Surplus:</span>
                    <strong style={{ color: netTreasuryBalance >= 0 ? '#059669' : '#b91c1c' }}>
                      ₹ {netTreasuryBalance.toLocaleString()}
                    </strong>
                  </div>
                  <div className="r-detail-item">
                    <span>Auditor Finding:</span>
                    <strong style={{ color: '#059669' }}>Unqualified Clean Financial Audit Opinion</strong>
                  </div>
                </div>

                <div className="receipt-signatures" style={{ marginTop: '24px' }}>
                  <div className="sig-block">
                    <p className="sig-line"></p>
                    <span>Chartered Accountant (Auditor)</span>
                  </div>
                  <div className="sig-block">
                    <p className="sig-line"></p>
                    <span>Treasurer / School Accountant</span>
                  </div>
                  <div className="sig-block">
                    <div className="school-stamp">CBSE AUDIT PASSED</div>
                    <p className="sig-line"></p>
                    <span>Principal / Secretary Sign</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions-bar no-print">
                <button className="acc-print-btn" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Statutory Audit Statement
                </button>
                <button className="acc-close-btn" onClick={() => setSelectedAuditReportModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <RoleSwitcher />
    </div>
  );
};

export default AccountantDashboard;
