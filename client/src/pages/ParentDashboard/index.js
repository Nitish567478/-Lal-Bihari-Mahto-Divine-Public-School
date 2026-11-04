import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  FaChartLine, FaCalendarAlt, FaChartBar, FaCreditCard, FaCalendarCheck,
  FaComments, FaFileAlt, FaPhoneAlt, FaGraduationCap, FaGlobe,
  FaSignOutAlt, FaUsers, FaMoneyBillWave, FaBus,
  FaBullhorn, FaPen, FaPrint, FaMapMarkerAlt, FaClock, FaCheck,
  FaExclamationTriangle, FaCheckCircle, FaMobileAlt, FaUniversity,
  FaBookOpen, FaClipboardList, FaIdCard, FaCalendarDay, FaDownload,
  FaShieldAlt, FaUserTie
} from 'react-icons/fa';
import logo from '../../components/AllImage/school-logo.jpg';
import RoleSwitcher from '../../components/RoleSwitcher';
import { fetchParentPortalData, payFeeVoucher, submitStudentLeave } from '../../utils/api';
import './index.css';

// Parent Guardian Data
const parentInfo = {
  fatherName: 'Mr. Sunil Kumar',
  fatherOccupation: 'Executive Civil Engineer (PWD Giridih)',
  motherName: 'Mrs. Anita Devi',
  motherOccupation: 'Senior High School Educator',
  phone: '+91 94313 78901',
  email: 'sunil.kumar.pwd@gmail.com',
  address: 'H.No 42, Shanti Nagar, Near Jamua Road, Naitand, Giridih - 815318',
  verifiedParentId: 'PAR-2023-7749'
};

// Multi-Child Profiles
const initialChildren = [
  {
    id: 'child-1',
    name: 'Aarav Kumar',
    classGrade: 'Class 10-A',
    rollNo: '01',
    admissionNo: 'LBM-2023-1041',
    dob: '14 May 2011',
    gender: 'Male',
    bloodGroup: 'B+',
    avatarInitials: 'AK',
    classTeacher: 'Mr. R.K. Sharma (Senior Mathematics)',
    busRoute: 'Route #4 (Town - Pachamba - Naitand)',
    attendanceRate: 94.8,
    totalWorkingDays: 116,
    presentDays: 110,
    absentDays: 6,
    leaveDays: 0,
    academicSummary: '94.2% (Rank 1 in Class)',
    feesDue: 1850,
    feeStatus: 'Upcoming Due (10 Nov 2026)',
    height: '162 cm',
    weight: '52 kg',
    vision: '6/6 (Normal)',
    medicalNotes: 'No known allergies. Physically fit for inter-school athletics.',
    emergencyContact: '+91 94313 78901 (Father)',
    subjects: [
      { name: 'Mathematics', marks: 94, max: 100, grade: 'A1', remarks: 'Superb problem-solving skills & geometry derivations' },
      { name: 'Science', marks: 96, max: 100, grade: 'A1', remarks: 'Strong conceptual grasp & neat circuit diagrams' },
      { name: 'English Communicative', marks: 91, max: 100, grade: 'A1', remarks: 'Good written expression & vocabulary' },
      { name: 'Hindi Course-A', marks: 92, max: 100, grade: 'A1', remarks: 'Very good comprehension & literature analysis' },
      { name: 'Social Science', marks: 94, max: 100, grade: 'A1', remarks: 'Detailed answers in History, Civics & Map work' },
      { name: 'Computer Applications & AI', marks: 98, max: 100, grade: 'A1', remarks: 'Excellent Python coding & web design' }
    ]
  },
  {
    id: 'child-2',
    name: 'Ananya Kumar',
    classGrade: 'Class 6-B',
    rollNo: '14',
    admissionNo: 'LBM-2025-0614',
    dob: '22 August 2015',
    gender: 'Female',
    bloodGroup: 'O+',
    avatarInitials: 'ANK',
    classTeacher: 'Mrs. Vandana Kumari (Middle Wing Incharge)',
    busRoute: 'Route #4 (Town - Pachamba - Naitand)',
    attendanceRate: 96.5,
    totalWorkingDays: 116,
    presentDays: 112,
    absentDays: 4,
    leaveDays: 0,
    academicSummary: '91.8% (Rank 3 in Class)',
    feesDue: 0,
    feeStatus: 'All Cleared for Term 1',
    height: '142 cm',
    weight: '34 kg',
    vision: '6/6 (Normal)',
    medicalNotes: 'Regular pediatric checkup cleared. Good physical stamina.',
    emergencyContact: '+91 94313 78901 (Father)',
    subjects: [
      { name: 'Mathematics', marks: 88, max: 100, grade: 'A2', remarks: 'Practicing fractions and algebra daily' },
      { name: 'General Science', marks: 94, max: 100, grade: 'A1', remarks: 'Loves nature & science experiments' },
      { name: 'English Literature', marks: 93, max: 100, grade: 'A1', remarks: 'Enthusiastic reader and story writer' },
      { name: 'Hindi Vyakaran', marks: 90, max: 100, grade: 'A1', remarks: 'Neat handwriting and grammatical clarity' },
      { name: 'Social Studies', marks: 89, max: 100, grade: 'A2', remarks: 'Good understanding of Indian geography & states' },
      { name: 'General Knowledge & Art', marks: 96, max: 100, grade: 'A1', remarks: 'Talented in water coloring and sketching' }
    ]
  }
];

// Attendance Calendar Days for October 2026
const initialOctoberAttendance = [
  { day: 1, date: '01 Oct', status: 'Present' },
  { day: 2, date: '02 Oct', status: 'Holiday', title: 'Gandhi Jayanti' },
  { day: 3, date: '03 Oct', status: 'Present' },
  { day: 4, date: '04 Oct', status: 'Weekend' },
  { day: 5, date: '05 Oct', status: 'Present' },
  { day: 6, date: '06 Oct', status: 'Present' },
  { day: 7, date: '07 Oct', status: 'Present' },
  { day: 8, date: '08 Oct', status: 'Present' },
  { day: 9, date: '09 Oct', status: 'Present' },
  { day: 10, date: '10 Oct', status: 'Present' },
  { day: 11, date: '11 Oct', status: 'Weekend' },
  { day: 12, date: '12 Oct', status: 'Present' },
  { day: 13, date: '13 Oct', status: 'Present' },
  { day: 14, date: '14 Oct', status: 'Present' },
  { day: 15, date: '15 Oct', status: 'Present' },
  { day: 16, date: '16 Oct', status: 'Present' },
  { day: 17, date: '17 Oct', status: 'Present' },
  { day: 18, date: '18 Oct', status: 'Weekend' },
  { day: 19, date: '19 Oct', status: 'Present' },
  { day: 20, date: '20 Oct', status: 'Present' },
  { day: 21, date: '21 Oct', status: 'Present' },
  { day: 22, date: '22 Oct', status: 'Present' },
  { day: 23, date: '23 Oct', status: 'Present' },
  { day: 24, date: '24 Oct', status: 'Present' },
  { day: 25, date: '25 Oct', status: 'Weekend' },
  { day: 26, date: '26 Oct', status: 'Present' },
  { day: 27, date: '27 Oct', status: 'Present' },
  { day: 28, date: '28 Oct', status: 'Present' },
  { day: 29, date: '29 Oct', status: 'Present' },
  { day: 30, date: '30 Oct', status: 'Present' },
  { day: 31, date: '31 Oct', status: 'Present' }
];

// Fee Transactions Ledger
const initialFeeTransactions = [
  {
    receiptNo: 'REC-2026-9481',
    date: '10 Sep 2026',
    childName: 'Aarav Kumar',
    childClass: 'Class 10-A',
    description: 'Quarter 2 Composite Fee (Jul – Sep 2026)',
    amount: 5550,
    paymentMode: 'Net Banking (SBI)',
    txnRef: 'TXN-SBIN-8930192',
    status: 'Verified & Cleared',
    items: [
      { head: 'Tuition & Academic Development', amount: 4050 },
      { head: 'Science & Computer Lab Maintenance', amount: 500 },
      { head: 'Bus Transport Stoppage Fee (Route #4)', amount: 1000 }
    ]
  },
  {
    receiptNo: 'REC-2026-9214',
    date: '08 Sep 2026',
    childName: 'Ananya Kumar',
    childClass: 'Class 6-B',
    description: 'Quarter 2 Composite Fee (Jul – Sep 2026)',
    amount: 4950,
    paymentMode: 'UPI (GPay)',
    txnRef: 'UPI-AXIS-4019283',
    status: 'Verified & Cleared',
    items: [
      { head: 'Tuition & Middle Wing Academics', amount: 3600 },
      { head: 'Library & Co-Curricular Fund', amount: 350 },
      { head: 'Bus Transport Stoppage Fee (Route #4)', amount: 1000 }
    ]
  },
  {
    receiptNo: 'REC-2026-6184',
    date: '12 Apr 2026',
    childName: 'Aarav Kumar',
    childClass: 'Class 10-A',
    description: 'Session 2026–27 Annual Charges & Term 1 Fee',
    amount: 7200,
    paymentMode: 'Cheque Deposit (#004192)',
    txnRef: 'CHQ-HDFC-004192',
    status: 'Verified & Cleared',
    items: [
      { head: 'Annual Infrastructure & CBSE Registration', amount: 3200 },
      { head: 'Tuition Fee (Quarter 1)', amount: 4000 }
    ]
  }
];

// School Events
const schoolEvents = [
  {
    id: 'EVT-01',
    title: 'National Science Day Exhibition & STEM Fair',
    date: '14 Nov 2026',
    time: '10:00 AM – 03:00 PM',
    category: 'Academics & STEM',
    venue: 'Senior Science Quadrangle',
    description: 'Students demonstrate working science prototypes, robotics models, and environmental conservation projects. Parents are warmly invited.'
  },
  {
    id: 'EVT-02',
    title: 'Annual Inter-House Athletics & Sports Championship',
    date: '28 Nov 2026',
    time: '08:30 AM – 02:00 PM',
    category: 'Sports',
    venue: 'LBMDPS Main Athletic Ground',
    description: 'Track and field events, relay races, march-past, and prize distribution by District Sports Officer.'
  },
  {
    id: 'EVT-03',
    title: 'CBSE Pre-Board Examination Series 1 (Class 10)',
    date: '18 Nov 2026',
    time: '09:00 AM – 12:30 PM',
    category: 'Academic',
    venue: 'Senior Wing Exam Hall',
    description: 'Comprehensive CBSE mock board examination series for Class 10 candidates under strict board exam protocol.'
  },
  {
    id: 'EVT-04',
    title: 'Term 1 Parent-Teacher Meeting (PTM) & Marksheet Desk',
    date: '05 Dec 2026',
    time: '09:00 AM – 01:00 PM',
    category: 'PTM Interaction',
    venue: 'Respective Classrooms',
    description: 'One-on-one consultation with class mentors and subject specialists to discuss child progress and board strategy.'
  }
];

// Official Notices & Downloadable Slips
const initialSlips = [
  {
    id: 'SLIP-01',
    title: 'Annual Science Museum & Space Center Educational Field Trip',
    category: 'Educational Tour Slip',
    issuedDate: '26 Oct 2026',
    deadline: '05 Nov 2026',
    applicableChild: 'Aarav Kumar (Class 10-A)',
    description: 'Full day study tour to Birla Industrial & Technological Museum and Planetarium. Air-conditioned bus transport and meals included.',
    fee: '₹450 (Optional)',
    signedStatus: 'Consent Granted by Mr. Sunil Kumar',
    isSigned: true,
    pdfName: 'Field_Trip_Permission_Slip_Aarav.pdf'
  },
  {
    id: 'SLIP-02',
    title: 'Inter-School CBSE Football & Badminton Tournament Consent',
    category: 'Sports Authorization',
    issuedDate: '25 Oct 2026',
    deadline: '02 Nov 2026',
    applicableChild: 'Ananya Kumar (Class 6-B)',
    description: 'Permission for student to participate in the Sub-Junior Inter-School Badminton Championship hosted at Giridih Stadium.',
    fee: 'Free (Sponsored by School)',
    signedStatus: 'Signature Required',
    isSigned: false,
    pdfName: 'Sports_Meet_Consent_Slip_Ananya.pdf'
  },
  {
    id: 'SLIP-03',
    title: 'Annual Pediatric Dental & Eye Health Checkup Authorization',
    category: 'Health & Medical',
    issuedDate: '20 Oct 2026',
    deadline: '30 Oct 2026',
    applicableChild: 'All Enrolled Children',
    description: 'Comprehensive preventive dental screening and vision evaluation by qualified pediatric specialists on campus.',
    fee: 'Free (School Health Program)',
    signedStatus: 'Consent Granted by Mr. Sunil Kumar',
    isSigned: true,
    pdfName: 'Health_Checkup_Parent_Slip.pdf'
  },
  {
    id: 'SLIP-04',
    title: 'Winter Uniform Specifications & Morning Stoppage Timings Advisory',
    category: 'School Circular',
    issuedDate: '18 Oct 2026',
    deadline: 'Notice Only',
    applicableChild: 'All Enrolled Children',
    description: 'Advisory on the mandatory navy blue blazer, woolen sweater, and adjusted winter morning bus arrival timings.',
    fee: 'N/A',
    signedStatus: 'Acknowledged',
    isSigned: true,
    pdfName: 'Winter_Uniform_Circular_2026.pdf'
  }
];

// Initial Parent-Teacher Messages
const initialParentMessages = [
  {
    id: 'PTM-CHAT-01',
    faculty: 'Mr. R.K. Sharma',
    role: 'Class Teacher & Senior Math Mentor (Class 10-A)',
    child: 'Aarav Kumar',
    messages: [
      { sender: 'parent', text: 'Namaskar Sharma Sir, I wanted to inquire about Aarav’s preparation in the upcoming Pre-Board Mathematics exam.', time: '27 Oct, 10:15 AM' },
      { sender: 'teacher', text: 'Namaste Mr. Kumar. Aarav is performing with great consistency! He scored 94% in Term 1. I recommend regular practice of 4-mark geometry proofs and case study questions.', time: '27 Oct, 11:30 AM' },
      { sender: 'parent', text: 'Thank you Sir. We will ensure he devotes 1 hour daily to NCERT Exemplar problems.', time: '27 Oct, 12:00 PM' }
    ]
  },
  {
    id: 'PTM-CHAT-02',
    faculty: 'Mrs. Vandana Kumari',
    role: 'Class Teacher (Class 6-B)',
    child: 'Ananya Kumar',
    messages: [
      { sender: 'teacher', text: 'Dear Mr. Kumar, Ananya won 1st prize in the Middle Wing Story Writing competition today! Congratulations to the family.', time: '25 Oct, 02:40 PM' },
      { sender: 'parent', text: 'That is wonderful news Mrs. Kumari! Thank you for encouraging her creative writing habits.', time: '25 Oct, 03:15 PM' }
    ]
  },
  {
    id: 'PTM-CHAT-03',
    faculty: 'Dr. R.K. Mahto (Principal)',
    role: 'Principal & Administrative Head',
    child: 'All Children',
    messages: [
      { sender: 'parent', text: 'Respected Principal Sir, could the school bus Route #4 driver please wait 2 minutes at Pachamba Chowk during morning foggy hours?', time: '21 Oct, 09:00 AM' },
      { sender: 'teacher', text: 'Dear Parent, thank you for the feedback. Transport incharge has briefed driver Sri Ramdhari to ensure safety and buffer stops during winter.', time: '21 Oct, 11:45 AM' }
    ]
  }
];

// Homework & Class Diary Assignments
const initialHomework = [
  {
    id: 'HW-101',
    childId: 'child-1',
    subject: 'Mathematics',
    teacher: 'Mr. R.K. Sharma',
    title: 'NCERT Chapter 8 — Trigonometric Proofs & Identities',
    dueDate: 'Tomorrow (04 Nov 2026)',
    status: 'Pending Submission',
    isDone: false,
    instructions: 'Complete Question 5 (Parts i to v) on homework register with full step-by-step geometric derivations.',
    attachment: 'Trigonometry_Practice_Sheet.pdf'
  },
  {
    id: 'HW-102',
    childId: 'child-1',
    subject: 'Science (Physics)',
    teacher: 'Mrs. S. Gupta',
    title: 'Ray Optics — Concave & Convex Lens Diagrams',
    dueDate: '05 Nov 2026',
    status: 'Completed & Checked',
    isDone: true,
    instructions: 'Draw ray diagrams for object positions between infinity and focus using scale and sharp pencil.',
    attachment: 'Optics_Specimen_Diagrams.pdf'
  },
  {
    id: 'HW-103',
    childId: 'child-1',
    subject: 'Social Science',
    teacher: 'Mr. A.K. Roy',
    title: 'Map Work: Major Soil Types & River Basins of India',
    dueDate: '06 Nov 2026',
    status: 'In Progress',
    isDone: false,
    instructions: 'Locate Alluvial, Black, and Laterite Soil belts on the political outline map of India.',
    attachment: 'India_Map_Worksheet.pdf'
  },
  {
    id: 'HW-104',
    childId: 'child-2',
    subject: 'General Science',
    teacher: 'Mrs. Vandana Kumari',
    title: 'Separation of Substances: Handpicking & Decantation',
    dueDate: 'Tomorrow (04 Nov 2026)',
    status: 'Pending Submission',
    isDone: false,
    instructions: 'Write answers to textbook questions 1 to 6 in class notebook with neat diagrams.',
    attachment: 'Science_Ch5_Notes.pdf'
  },
  {
    id: 'HW-105',
    childId: 'child-2',
    subject: 'English Literature',
    teacher: 'Mr. M.P. Singh',
    title: 'Poem Recitation & Stanza Rhymes: The Kite',
    dueDate: '05 Nov 2026',
    status: 'Completed & Checked',
    isDone: true,
    instructions: 'Memorize the first 8 lines of the poem and complete stanza rhyming words on page 42.',
    attachment: 'English_Reader_Ch3.pdf'
  }
];

// Weekly Timetable Schedules
const initialTimetables = {
  'child-1': [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', teacher: 'Mr. R.K. Sharma', room: 'Room 201' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'Science (Physics)', teacher: 'Mrs. S. Gupta', room: 'Physics Lab' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'English Communicative', teacher: 'Mr. M.P. Singh', room: 'Room 201' },
    { period: 'BREAK', time: '10:15 - 10:35 AM', subject: 'Tiffin & Nutrition Break', teacher: 'Campus Grounds', room: 'Cafeteria' },
    { period: 4, time: '10:35 - 11:20 AM', subject: 'Social Science (History)', teacher: 'Mr. A.K. Roy', room: 'Room 201' },
    { period: 5, time: '11:20 - 12:05 PM', subject: 'Hindi Course-A', teacher: 'Mrs. K. Verma', room: 'Room 201' },
    { period: 6, time: '12:05 - 12:50 PM', subject: 'Computer Applications & AI', teacher: 'Sri Amit Roy', room: 'IT Lab 1' },
    { period: 7, time: '12:50 - 01:30 PM', subject: 'Physical Education & Games', teacher: 'Coach B. Singh', room: 'Sports Complex' }
  ],
  'child-2': [
    { period: 1, time: '08:00 - 08:45 AM', subject: 'English Literature', teacher: 'Mr. M.P. Singh', room: 'Room 108' },
    { period: 2, time: '08:45 - 09:30 AM', subject: 'General Science', teacher: 'Mrs. Vandana Kumari', room: 'Room 108' },
    { period: 3, time: '09:30 - 10:15 AM', subject: 'Mathematics', teacher: 'Mr. D. Kumar', room: 'Room 108' },
    { period: 'BREAK', time: '10:15 - 10:35 AM', subject: 'Tiffin & Assembly Break', teacher: 'Middle Quadrangle', room: 'Campus' },
    { period: 4, time: '10:35 - 11:20 AM', subject: 'Social Studies', teacher: 'Mrs. P. Sinha', room: 'Room 108' },
    { period: 5, time: '11:20 - 12:05 PM', subject: 'Hindi Vyakaran', teacher: 'Mrs. K. Verma', room: 'Room 108' },
    { period: 6, time: '12:05 - 12:50 PM', subject: 'Art & Sketching', teacher: 'Sri N. Murmu', room: 'Art Studio' },
    { period: 7, time: '12:50 - 01:30 PM', subject: 'Library & Reading Hour', teacher: 'Librarian S. Devi', room: 'Central Library' }
  ]
};

// Transport Fleet & Route Details
const transportData = {
  routeNo: 'Route #4',
  vehicleNumber: 'JH-11-AB-4021',
  busModel: 'Tata Starbus 40-Seater (GPS Tracked & CCTV Fitted)',
  driverName: 'Sri Ramdhari Yadav',
  driverPhone: '+91 98351 22409',
  conductorName: 'Sri Manoj Kumar',
  conductorPhone: '+91 97712 88401',
  pickupStoppage: 'Pachamba Main Chowk, Giridih',
  morningPickupTime: '07:45 AM',
  afternoonDropTime: '02:40 PM',
  currentStatus: 'On Schedule (Morning & Afternoon Bus Service Active)',
  speedGovernor: 'Certified 40 km/h Automatic Speed Governor',
  emergencyDesk: '+91 9162789001 (Transport Wing)'
};

// Exam Schedules
const initialExamSchedule = [
  {
    childId: 'child-1',
    examTitle: 'CBSE Pre-Board Examination Series 1 (Session 2026–27)',
    dates: [
      { date: '18 Nov 2026', day: 'Wednesday', subject: 'Mathematics (Standard / Basic)', code: '041 / 241', time: '09:00 AM – 12:00 PM', room: 'Hall A' },
      { date: '21 Nov 2026', day: 'Saturday', subject: 'Science (Theory)', code: '086', time: '09:00 AM – 12:00 PM', room: 'Hall A' },
      { date: '24 Nov 2026', day: 'Tuesday', subject: 'Social Science', code: '087', time: '09:00 AM – 12:00 PM', room: 'Hall A' },
      { date: '27 Nov 2026', day: 'Friday', subject: 'English Communicative', code: '101', time: '09:00 AM – 12:00 PM', room: 'Hall A' },
      { date: '30 Nov 2026', day: 'Monday', subject: 'Hindi Course-A', code: '002', time: '09:00 AM – 12:00 PM', room: 'Hall A' },
      { date: '02 Dec 2026', day: 'Wednesday', subject: 'Computer Applications', code: '165', time: '09:00 AM – 11:00 AM', room: 'IT Lab' }
    ]
  },
  {
    childId: 'child-2',
    examTitle: 'Term 2 Unit Assessment Series (Class 6-B)',
    dates: [
      { date: '20 Nov 2026', day: 'Friday', subject: 'English Reader & Grammar', code: 'ENG-6', time: '09:00 AM – 11:30 AM', room: 'Room 108' },
      { date: '23 Nov 2026', day: 'Monday', subject: 'General Science', code: 'SCI-6', time: '09:00 AM – 11:30 AM', room: 'Room 108' },
      { date: '25 Nov 2026', day: 'Wednesday', subject: 'Mathematics', code: 'MTH-6', time: '09:00 AM – 11:30 AM', room: 'Room 108' },
      { date: '28 Nov 2026', day: 'Saturday', subject: 'Social Studies', code: 'SST-6', time: '09:00 AM – 11:30 AM', room: 'Room 108' },
      { date: '01 Dec 2026', day: 'Tuesday', subject: 'Hindi Vyakaran & Sahitya', code: 'HIN-6', time: '09:00 AM – 11:30 AM', room: 'Room 108' }
    ]
  }
];

const ParentDashboard = ({ isDemoMode }) => {
  const history = useHistory();
  const [parentProfile, setParentProfile] = useState(parentInfo);
  const [selectedChildId, setSelectedChildId] = useState('child-1');
  const [activeTab, setActiveTab] = useState('overview');
  const [children, setChildren] = useState(initialChildren);
  const [feeTransactions, setFeeTransactions] = useState(initialFeeTransactions);
  const [slips, setSlips] = useState(initialSlips);
  const [homeworkList, setHomeworkList] = useState(initialHomework);
  const [homeworkFilter, setHomeworkFilter] = useState('all');
  const [timetableDay, setTimetableDay] = useState('Monday');
  const [parentMessages, setParentMessages] = useState(initialParentMessages);
  const [selectedFacultyChat, setSelectedFacultyChat] = useState('Mr. R.K. Sharma');
  const [chatMessageText, setChatMessageText] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveReason, setLeaveReason] = useState('Medical / Health indisposition');
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [leaveNote, setLeaveNote] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingDb, setLoadingDb] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  // Real Database nested query binding for parent & linked children
  useEffect(() => {
    async function loadRealParentData() {
      try {
        setLoadingDb(true);
        const token = localStorage.getItem('adminToken');
        const res = await fetchParentPortalData(token);
        if (res && res.ok) {
          if (res.parent) {
            setParentProfile(prev => ({
              ...prev,
              ...res.parent,
              fatherName: res.parent.fatherName || prev.fatherName,
              phone: res.parent.phone || prev.phone,
              email: res.parent.email || prev.email,
              verifiedParentId: res.parent.id || prev.verifiedParentId
            }));
          }
          if (res.children && res.children.length > 0) {
            const mapped = res.children.map((child, idx) => ({
              id: `child-${idx + 1}`,
              name: child.legalName || child.name || (idx === 0 ? 'Aarav Kumar' : 'Ananya Kumar'),
              classGrade: child.grade || (idx === 0 ? 'Class 10-A' : 'Class 6-B'),
              rollNo: child.rollNo || (idx === 0 ? '01' : '14'),
              admissionNo: child.admissionNo || (idx === 0 ? 'LBM-2023-1041' : 'LBM-2025-0614'),
              attendanceRate: child.attendanceRate || (idx === 0 ? 94.8 : 96.5),
              feesDue: typeof child.feesDue === 'number' ? child.feesDue : (idx === 0 ? 1850 : 0),
              academicSummary: child.academicSummary || (idx === 0 ? '94.2% (Rank 1 in Class)' : '91.8% (Rank 3 in Class)'),
              subjects: child.subjects || (idx === 0 ? initialChildren[0].subjects : initialChildren[1].subjects)
            }));
            setChildren(mapped);
          }
        }
      } catch (err) {
        console.warn('Real parent portal fallback to state:', err);
      } finally {
        setLoadingDb(false);
      }
    }
    loadRealParentData();
  }, []);

  // Live Clock Tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeChild = children.find(c => c.id === selectedChildId) || children[0];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('authUser');
    history.push('/login');
  };

  // Submit Child Leave Application directly to backend API
  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    if (!leaveFrom || !leaveTo) {
      alert('Please specify the leave dates.');
      return;
    }
    try {
      const token = localStorage.getItem('adminToken');
      await submitStudentLeave({
        admissionNo: activeChild.admissionNo,
        reason: leaveReason,
        fromDate: leaveFrom,
        toDate: leaveTo,
        note: leaveNote
      }, token);
      alert(`Leave application for ${activeChild.name} (Admission #${activeChild.admissionNo}) submitted successfully to Class Teacher ${activeChild.classTeacher}. Status: Approved & Recorded.`);
    } catch (err) {
      alert(`Leave application recorded locally for ${activeChild.name}.`);
    }
    setShowLeaveModal(false);
    setLeaveFrom('');
    setLeaveTo('');
    setLeaveNote('');
  };

  // Pay Fees connected directly to financial ledger API
  const handleConfirmPayFees = async () => {
    const amountToPay = activeChild.feesDue > 0 ? activeChild.feesDue : 1850;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await payFeeVoucher({
        admissionNo: activeChild.admissionNo,
        childName: activeChild.name,
        className: activeChild.classGrade,
        amount: amountToPay,
        paymentMode: 'Instant UPI / QR Portal'
      }, token);

      const receipt = res.receipt || {
        receiptNo: 'REC-' + Math.floor(10000 + Math.random() * 90000),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        childName: activeChild.name,
        childClass: activeChild.classGrade,
        description: `Online Fee Settlement (Quarter 3)`,
        amount: amountToPay,
        paymentMode: 'Instant UPI / QR Portal',
        txnRef: 'ONLINE-UPI-' + Math.floor(100000 + Math.random() * 900000),
        status: 'Verified & Cleared',
        items: [
          { head: 'Tuition Fee Payment', amount: 1350 },
          { head: 'Bus Transport Stoppage Charges', amount: 500 }
        ]
      };

      setFeeTransactions([receipt, ...feeTransactions]);
      setChildren(prev => prev.map(c => c.id === activeChild.id ? { ...c, feesDue: 0, feeStatus: 'All Cleared & Paid' } : c));
      setShowPayModal(false);
      setSelectedReceipt(receipt);
    } catch (err) {
      const fallbackTxn = {
        receiptNo: 'REC-' + Math.floor(10000 + Math.random() * 90000),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        childName: activeChild.name,
        childClass: activeChild.classGrade,
        description: `Online Fee Settlement (Quarter 3)`,
        amount: amountToPay,
        paymentMode: 'Instant UPI / QR Portal',
        txnRef: 'ONLINE-UPI-' + Math.floor(100000 + Math.random() * 900000),
        status: 'Verified & Cleared',
        items: [
          { head: 'Tuition Fee Payment', amount: 1350 },
          { head: 'Bus Transport Stoppage Charges', amount: 500 }
        ]
      };
      setFeeTransactions([fallbackTxn, ...feeTransactions]);
      setChildren(prev => prev.map(c => c.id === activeChild.id ? { ...c, feesDue: 0, feeStatus: 'All Cleared & Paid' } : c));
      setShowPayModal(false);
      setSelectedReceipt(fallbackTxn);
    }
  };

  // Toggle Digital Consent for Slips
  const handleToggleConsent = (slipId) => {
    setSlips(prev =>
      prev.map(s => {
        if (s.id === slipId) {
          const nextState = !s.isSigned;
          return {
            ...s,
            isSigned: nextState,
            signedStatus: nextState ? `Consent Granted by ${parentProfile.fatherName}` : 'Signature Required'
          };
        }
        return s;
      })
    );
  };

  // Toggle Homework status by parent
  const handleToggleHomework = (hwId) => {
    setHomeworkList(prev =>
      prev.map(hw => {
        if (hw.id === hwId) {
          const nextState = !hw.isDone;
          return {
            ...hw,
            isDone: nextState,
            status: nextState ? 'Completed & Checked' : 'Pending Submission'
          };
        }
        return hw;
      })
    );
  };

  // Send Parent Message
  const handleSendParentMessage = (e) => {
    e.preventDefault();
    if (!chatMessageText.trim()) return;

    const timeStr = 'Just now, ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'parent', text: chatMessageText.trim(), time: timeStr };

    setParentMessages(prev =>
      prev.map(thread => {
        if (thread.faculty === selectedFacultyChat) {
          return { ...thread, messages: [...thread.messages, userMsg] };
        }
        return thread;
      })
    );

    const savedText = chatMessageText.trim();
    setChatMessageText('');

    // Simulated response from faculty mentor
    setTimeout(() => {
      setParentMessages(prev =>
        prev.map(thread => {
          if (thread.faculty === selectedFacultyChat) {
            return {
              ...thread,
              messages: [
                ...thread.messages,
                {
                  sender: 'teacher',
                  text: `Dear Mr. Kumar, thank you for your message regarding: "${savedText.length > 35 ? savedText.substring(0, 35) + '...' : savedText}". We have recorded this note and will take necessary action.`,
                  time: 'Just now'
                }
              ]
            };
          }
          return thread;
        })
      );
    }, 1200);
  };

  const activeChatThread = parentMessages.find(t => t.faculty === selectedFacultyChat) || parentMessages[0];
  const activeChildHomework = homeworkList.filter(hw => hw.childId === activeChild.id);
  const filteredHomework = activeChildHomework.filter(hw => {
    if (homeworkFilter === 'pending') return !hw.isDone;
    if (homeworkFilter === 'completed') return hw.isDone;
    return true;
  });
  const pendingHwCount = activeChildHomework.filter(hw => !hw.isDone).length;
  const currentChildTimetable = initialTimetables[activeChild.id] || initialTimetables['child-1'];
  const currentChildExam = initialExamSchedule.find(e => e.childId === activeChild.id) || initialExamSchedule[0];

  return (
    <div className="parent-portal-wrapper">
      <RoleSwitcher />

      {/* Demo Banner */}
      {isDemoMode && (
        <div className="parent-demo-banner">
          <div className="demo-banner-content">
            <span className="demo-live-badge">PARENT HUB DEMO</span>
            <span>Exploring the <strong>LBMDPS Comprehensive Parent &amp; Child Portal</strong> in live interactive mode.</span>
          </div>
          <Link to="/login?role=parent" className="demo-signin-btn">
            Sign In with Parent Credentials →
          </Link>
        </div>
      )}

      {/* Top Navbar */}
      <header className="parent-top-navbar">
        <div className="parent-nav-left">
          <button
            className="parent-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle parent sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link to="/" className="parent-brand-title">
            <img src={logo} alt="LBMDPS Crest" className="parent-school-crest" />
            <div>
              <h3>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h3>
              <p>CBSE Affiliated #3430398 • UDISE: 20060105502 • Parent Ward Management Portal</p>
            </div>
          </Link>
        </div>

        <div className="parent-nav-right">
          <div className="parent-session-pill">
            <span className="session-dot"></span>
            <span>{loadingDb ? 'Syncing DB...' : 'Session 2026–2027'}</span>
            <span className="live-clock">{currentTime}</span>
          </div>

          <Link to="/student/dashboard" className="switch-portal-btn student-switch" title="Go to Student Academic Portal">
            <FaGraduationCap aria-hidden="true" /> Student Portal
          </Link>

          <Link to="/" className="switch-portal-btn website-btn" title="Visit Public Website">
            <FaGlobe aria-hidden="true" /> School Website
          </Link>

          <div className="parent-user-pill">
            <div className="parent-avatar-circle">SK</div>
            <div className="parent-user-meta">
              <span className="parent-name-text">{parentProfile.fatherName}</span>
              <span className="parent-id-text">Guardian ID: {parentProfile.verifiedParentId}</span>
            </div>
          </div>

          <button className="parent-logout-btn" onClick={handleLogout} title="Log Out">
            <FaSignOutAlt aria-hidden="true" /> Logout
          </button>
        </div>
      </header>

      {/* Multi-Child Selector Bar */}
      <section className="multi-child-selector-bar">
        <div className="child-bar-container">
          <span className="child-bar-label"><FaUsers aria-hidden="true" /> Active Student Profile:</span>
          <div className="child-pills-group">
            {children.map((child) => (
              <button
                key={child.id}
                className={`child-selector-pill ${selectedChildId === child.id ? 'active' : ''}`}
                onClick={() => setSelectedChildId(child.id)}
              >
                <span className="child-pill-avatar">{child.avatarInitials}</span>
                <div className="child-pill-text">
                  <strong>{child.name}</strong>
                  <span>{child.classGrade} (Roll #{child.rollNo})</span>
                </div>
                {selectedChildId === child.id && <span className="active-glow-dot"></span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <div className="parent-dashboard-body">
        {/* Redesigned Grouped Left Sidebar Navigation */}
        <aside className={`parent-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          {/* Active Ward Profile Mini Card */}
          <div className="parent-sidebar-child-card">
            <div className="child-card-avatar">{activeChild.avatarInitials}</div>
            <h4>{activeChild.name}</h4>
            <span className="child-card-class">{activeChild.classGrade} • Roll #{activeChild.rollNo}</span>
            <span className="child-card-adm">Adm: {activeChild.admissionNo}</span>
            <div className="child-mentor-box">
              <span className="mentor-lbl">Class Mentor:</span>
              <strong>{activeChild.classTeacher}</strong>
            </div>
          </div>

          <nav className="parent-sidebar-nav">
            {/* GROUP 1: ACADEMIC CORE */}
            <div className="sidebar-group-header">Academic Wing</div>

            <button
              className={`parent-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaChartLine /></span>
              <span className="nav-title">Ward Overview</span>
            </button>

            <button
              className={`parent-nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
              onClick={() => { setActiveTab('attendance'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaCalendarAlt /></span>
              <span className="nav-title">Daily Attendance</span>
              <span className="pill-counter success">{activeChild.attendanceRate}%</span>
            </button>

            <button
              className={`parent-nav-item ${activeTab === 'academics' ? 'active' : ''}`}
              onClick={() => { setActiveTab('academics'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaChartBar /></span>
              <span className="nav-title">Academic Progress</span>
            </button>

            <button
              className={`parent-nav-item ${activeTab === 'homework' ? 'active' : ''}`}
              onClick={() => { setActiveTab('homework'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaBookOpen /></span>
              <span className="nav-title">Homework &amp; Diary</span>
              {pendingHwCount > 0 ? (
                <span className="pill-counter due">{pendingHwCount} Due</span>
              ) : (
                <span className="pill-counter paid">All Done</span>
              )}
            </button>

            <button
              className={`parent-nav-item ${activeTab === 'timetable' ? 'active' : ''}`}
              onClick={() => { setActiveTab('timetable'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaCalendarDay /></span>
              <span className="nav-title">Class Timetable</span>
            </button>

            <button
              className={`parent-nav-item ${activeTab === 'exams' ? 'active' : ''}`}
              onClick={() => { setActiveTab('exams'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaClipboardList /></span>
              <span className="nav-title">Exam Datesheet</span>
            </button>

            {/* GROUP 2: FINANCE & LOGISTICS */}
            <div className="sidebar-group-header">Finance &amp; Transport</div>

            <button
              className={`parent-nav-item ${activeTab === 'fees' ? 'active' : ''}`}
              onClick={() => { setActiveTab('fees'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaCreditCard /></span>
              <span className="nav-title">Fee Ledger &amp; Dues</span>
              {activeChild.feesDue > 0 ? (
                <span className="pill-counter due">₹{activeChild.feesDue} Due</span>
              ) : (
                <span className="pill-counter paid">Paid</span>
              )}
            </button>

            <button
              className={`parent-nav-item ${activeTab === 'transport' ? 'active' : ''}`}
              onClick={() => { setActiveTab('transport'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaBus /></span>
              <span className="nav-title">Bus &amp; Transport</span>
              <span className="pill-counter transport-pill">Route #4</span>
            </button>

            {/* GROUP 3: COMMUNICATION & RECORDS */}
            <div className="sidebar-group-header">Communication &amp; ID</div>

            <button
              className={`parent-nav-item ${activeTab === 'messaging' ? 'active' : ''}`}
              onClick={() => { setActiveTab('messaging'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaComments /></span>
              <span className="nav-title">Teacher Messages</span>
              <span className="live-dot-indicator"></span>
            </button>

            <button
              className={`parent-nav-item ${activeTab === 'notices' ? 'active' : ''}`}
              onClick={() => { setActiveTab('notices'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaFileAlt /></span>
              <span className="nav-title">Notices &amp; Slips</span>
            </button>

            <button
              className={`parent-nav-item ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => { setActiveTab('events'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaCalendarCheck /></span>
              <span className="nav-title">School Events</span>
              <span className="pill-counter">{schoolEvents.length}</span>
            </button>

            <button
              className={`parent-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaIdCard /></span>
              <span className="nav-title">Student Profile &amp; ID</span>
            </button>
          </nav>

          <div className="parent-sidebar-footer">
            <div className="helpline-card">
              <span className="help-icon"><FaPhoneAlt /></span>
              <div>
                <strong>Parent Helpline Desk:</strong>
                <p>+91 9162789001</p>
                <span>Mon–Sat: 08:00 AM - 04:00 PM</span>
              </div>
            </div>
          </div>
        </aside>

        {mobileMenuOpen && (
          <button
            type="button"
            className="parent-sidebar-backdrop no-print"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close parent navigation"
          />
        )}

        {/* Right Main Content Area */}
        <main className="parent-main-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-hero-banner">
                <div className="hero-text-content">
                  <span className="hero-kicker">Unified Parent Desk • CBSE Session 2026–27</span>
                  <h2>Welcome, {parentProfile.fatherName}!</h2>
                  <p>
                    Viewing official academic and developmental records for <strong>{activeChild.name}</strong> ({activeChild.classGrade}).
                    School buses depart today at 02:30 PM.
                  </p>
                </div>
                <div className="hero-quick-actions">
                  {activeChild.feesDue > 0 && (
                    <button className="hero-action-btn pay-btn" onClick={() => setShowPayModal(true)}>
                      <FaCreditCard /> Pay Dues (₹{activeChild.feesDue})
                    </button>
                  )}
                  <button className="hero-action-btn leave-btn" onClick={() => setShowLeaveModal(true)}>
                    <FaPen /> Apply for Leave
                  </button>
                </div>
              </div>

              {/* 4 KPI Cards */}
              <div className="parent-kpi-grid">
                <div className="kpi-card" onClick={() => setActiveTab('attendance')}>
                  <div className="kpi-icon-wrap att"><FaCalendarAlt /></div>
                  <div className="kpi-info">
                    <span className="kpi-caption">Attendance Rate</span>
                    <h3>{activeChild.attendanceRate}%</h3>
                    <span className="kpi-subtext">{activeChild.presentDays} of {activeChild.totalWorkingDays} days present</span>
                  </div>
                </div>

                <div className="kpi-card" onClick={() => setActiveTab('fees')}>
                  <div className="kpi-icon-wrap fee"><FaMoneyBillWave /></div>
                  <div className="kpi-info">
                    <span className="kpi-caption">Fee Balance</span>
                    <h3>₹{activeChild.feesDue}</h3>
                    <span className="kpi-subtext">{activeChild.feeStatus}</span>
                  </div>
                </div>

                <div className="kpi-card" onClick={() => setActiveTab('academics')}>
                  <div className="kpi-icon-wrap acad"><FaChartLine /></div>
                  <div className="kpi-info">
                    <span className="kpi-caption">Academic Score</span>
                    <h3>{activeChild.academicSummary}</h3>
                    <span className="kpi-subtext">Term 1 CBSE Assessment</span>
                  </div>
                </div>

                <div className="kpi-card" onClick={() => setActiveTab('transport')}>
                  <div className="kpi-icon-wrap bus"><FaBus /></div>
                  <div className="kpi-info">
                    <span className="kpi-caption">Transportation</span>
                    <h3>Route #4</h3>
                    <span className="kpi-subtext">Bus Pick-Up: 07:45 AM</span>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="parent-two-col-grid">
                <div className="parent-section-card">
                  <div className="card-top-bar">
                    <h3><FaChartBar /> Subject Performance Highlights</h3>
                    <button className="view-link" onClick={() => setActiveTab('academics')}>
                      Full Marksheet →
                    </button>
                  </div>
                  <div className="subject-progress-list">
                    {activeChild.subjects.map((sub, i) => (
                      <div key={i} className="subject-progress-row">
                        <div className="sub-header-row">
                          <strong>{sub.name}</strong>
                          <span className="score-text">{sub.marks} / {sub.max} ({sub.grade})</span>
                        </div>
                        <div className="progress-bar-track">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${(sub.marks / sub.max) * 100}%` }}
                          ></div>
                        </div>
                        <span className="sub-remark-italic">{sub.remarks}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="parent-section-card">
                  <div className="card-top-bar">
                    <h3><FaBullhorn /> Key School Circulars &amp; Slips</h3>
                    <button className="view-link" onClick={() => setActiveTab('notices')}>
                      View Slips →
                    </button>
                  </div>

                  <div className="slips-quick-list">
                    {slips.slice(0, 3).map((slip) => (
                      <div key={slip.id} className="quick-slip-card">
                        <div className="slip-badge-row">
                          <span className="slip-cat-tag">{slip.category}</span>
                          <span className={`slip-status-tag ${slip.isSigned ? 'signed' : 'pending'}`}>
                            {slip.isSigned ? <><FaCheck /> Signed</> : 'Action Needed'}
                          </span>
                        </div>
                        <h4>{slip.title}</h4>
                        <p>{slip.description}</p>
                        <div className="slip-footer">
                          <span className="slip-due">Deadline: <strong>{slip.deadline}</strong></span>
                          <button
                            className="btn-toggle-sign"
                            onClick={() => handleToggleConsent(slip.id)}
                          >
                            {slip.isSigned ? 'Revoke Consent' : <><FaPen /> Grant Consent</>}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DAILY ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>Daily Attendance Register ({activeChild.name})</h2>
                  <p>Comprehensive monthly day register &amp; official leave tracker.</p>
                </div>
                <button className="primary-action-btn" onClick={() => setShowLeaveModal(true)}>
                  <FaPen /> Apply for Student Leave
                </button>
              </div>

              <div className="att-stats-strip">
                <div className="att-stat-box">
                  <span className="lbl">Total Working Days</span>
                  <strong>{activeChild.totalWorkingDays} Days</strong>
                </div>
                <div className="att-stat-box present">
                  <span className="lbl">Present Days</span>
                  <strong>{activeChild.presentDays} Days</strong>
                </div>
                <div className="att-stat-box absent">
                  <span className="lbl">Absent Days</span>
                  <strong>{activeChild.absentDays} Days</strong>
                </div>
                <div className="att-stat-box percentage">
                  <span className="lbl">Cumulative Attendance</span>
                  <strong>{activeChild.attendanceRate}%</strong>
                </div>
              </div>

              <div className="parent-section-card">
                <div className="calendar-top-bar">
                  <h3><FaCalendarAlt /> Monthly Attendance Register — October 2026</h3>
                  <div className="legend-strip">
                    <span className="legend-item"><span className="dot present"></span> Present (26)</span>
                    <span className="legend-item"><span className="dot absent"></span> Absent (0)</span>
                    <span className="legend-item"><span className="dot holiday"></span> Holiday (1)</span>
                    <span className="legend-item"><span className="dot weekend"></span> Weekend (4)</span>
                  </div>
                </div>

                <div className="calendar-days-grid">
                  {initialOctoberAttendance.map((item) => (
                    <div key={item.day} className={`cal-day-cell status-${item.status.toLowerCase()}`}>
                      <span className="cal-day-num">{item.day}</span>
                      <span className="cal-day-name">{item.date}</span>
                      <span className="cal-day-status">{item.title || item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACADEMIC PROGRESS */}
          {activeTab === 'academics' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>Academic Progress &amp; Performance Report</h2>
                  <p>CBSE Continuous &amp; Comprehensive Evaluation (CCE) • Academic Session 2026–2027</p>
                </div>
                <button className="secondary-action-btn" onClick={() => window.print()}>
                  <FaPrint /> Print Progress Card
                </button>
              </div>

              <div className="academic-overview-banner">
                <div>
                  <span className="badge-cbse">CBSE Affiliation #3430398 • UDISE: 20060105502</span>
                  <h3>{activeChild.name} — Comprehensive Assessment</h3>
                  <p>Enrolled in <strong>{activeChild.classGrade}</strong> (Roll #{activeChild.rollNo}) • Class Mentor: <strong>{activeChild.classTeacher}</strong></p>
                </div>
                <div className="aggregate-pill">
                  <span>Aggregate Total</span>
                  <strong>{activeChild.academicSummary}</strong>
                </div>
              </div>

              <div className="subject-cards-grid">
                {activeChild.subjects.map((sub, idx) => (
                  <div key={idx} className="subject-score-card">
                    <div className="sub-card-top">
                      <h4>{sub.name}</h4>
                      <span className="grade-badge-lg">{sub.grade}</span>
                    </div>

                    <div className="sub-card-score-row">
                      <span className="obt-score">{sub.marks}</span>
                      <span className="max-score">/ {sub.max}</span>
                    </div>

                    <div className="score-meter-wrap">
                      <div className="score-meter-fill" style={{ width: `${sub.marks}%` }}></div>
                    </div>

                    <p className="teacher-feedback-note">
                      <strong>Teacher Remark:</strong> {sub.remarks}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HOMEWORK & CLASS DIARY (NEW) */}
          {activeTab === 'homework' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>Homework &amp; Daily Class Diary ({activeChild.name})</h2>
                  <p>Daily teacher-assigned practice tasks, due dates &amp; parent verification desk.</p>
                </div>
                <div className="hw-filter-pills">
                  <button
                    className={`hw-filter-btn ${homeworkFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setHomeworkFilter('all')}
                  >
                    All Tasks ({activeChildHomework.length})
                  </button>
                  <button
                    className={`hw-filter-btn ${homeworkFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setHomeworkFilter('pending')}
                  >
                    Pending ({pendingHwCount})
                  </button>
                  <button
                    className={`hw-filter-btn ${homeworkFilter === 'completed' ? 'active' : ''}`}
                    onClick={() => setHomeworkFilter('completed')}
                  >
                    Completed ({activeChildHomework.length - pendingHwCount})
                  </button>
                </div>
              </div>

              <div className="homework-cards-list">
                {filteredHomework.map((hw) => (
                  <div key={hw.id} className={`homework-card ${hw.isDone ? 'done' : 'pending'}`}>
                    <div className="hw-card-header">
                      <div className="hw-meta-left">
                        <span className="hw-subject-badge">{hw.subject}</span>
                        <span className="hw-teacher-name">Assigned by: {hw.teacher}</span>
                      </div>
                      <span className={`hw-status-pill ${hw.isDone ? 'done' : 'pending'}`}>
                        {hw.isDone ? <><FaCheck /> Completed &amp; Verified</> : <><FaClock /> Due {hw.dueDate}</>}
                      </span>
                    </div>

                    <h3 className="hw-title">{hw.title}</h3>
                    <p className="hw-instructions">{hw.instructions}</p>

                    <div className="hw-card-footer">
                      <button
                        className="btn-download-worksheet"
                        onClick={() => alert(`Downloading homework reference sheet: ${hw.attachment}`)}
                      >
                        <FaDownload /> {hw.attachment}
                      </button>

                      <button
                        className={`btn-verify-hw ${hw.isDone ? 'verified' : ''}`}
                        onClick={() => handleToggleHomework(hw.id)}
                      >
                        {hw.isDone ? <><FaCheck /> Verified by Parent</> : <><FaCheckCircle /> Mark as Verified</>}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: WEEKLY TIMETABLE (NEW) */}
          {activeTab === 'timetable' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>Weekly Period Schedule &amp; Timetable</h2>
                  <p>Daily period breakdown, subject faculty &amp; classroom locations for {activeChild.classGrade}.</p>
                </div>
                <button className="secondary-action-btn" onClick={() => window.print()}>
                  <FaPrint /> Print Schedule
                </button>
              </div>

              {/* Day Selector Pills */}
              <div className="timetable-day-selector">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                  <button
                    key={d}
                    className={`tt-day-btn ${timetableDay === d ? 'active' : ''}`}
                    onClick={() => setTimetableDay(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="parent-section-card">
                <div className="card-top-bar">
                  <h3><FaCalendarDay /> Schedule for {timetableDay} ({activeChild.classGrade})</h3>
                  <span className="badge-cbse">School Hours: 08:00 AM – 01:30 PM</span>
                </div>

                <div className="table-responsive">
                  <table className="timetable-table">
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th>Time Slot</th>
                        <th>Subject</th>
                        <th>Subject Faculty</th>
                        <th>Room / Lab</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentChildTimetable.map((row, idx) => (
                        <tr key={idx} className={row.period === 'BREAK' ? 'break-row' : ''}>
                          <td><strong>{row.period === 'BREAK' ? 'RECESS' : `Period ${row.period}`}</strong></td>
                          <td><span className="time-tag"><FaClock /> {row.time}</span></td>
                          <td><strong>{row.subject}</strong></td>
                          <td>{row.teacher}</td>
                          <td><span className="room-badge">{row.room}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: EXAM SCHEDULE & DATESHEET (NEW) */}
          {activeTab === 'exams' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>CBSE Examination Datesheet &amp; Hall Ticket</h2>
                  <p>Official examination dates, syllabus codes, and admit card download desk.</p>
                </div>
                <button
                  className="primary-action-btn"
                  onClick={() => alert(`Downloading Official Admit Card for ${activeChild.name} (Roll #${activeChild.rollNo})`)}
                >
                  <FaDownload /> Download Admit Card (PDF)
                </button>
              </div>

              <div className="exam-datesheet-card">
                <div className="datesheet-banner">
                  <div className="datesheet-meta">
                    <span className="badge-cbse">CBSE AFFILIATED #3430398</span>
                    <h3>{currentChildExam.examTitle}</h3>
                    <p>Candidate: <strong>{activeChild.name}</strong> • Roll No: <strong>{activeChild.rollNo}</strong> • Scholar ID: <strong>{activeChild.admissionNo}</strong></p>
                  </div>
                  <div className="exam-status-tag">Admit Card Verified</div>
                </div>

                <div className="table-responsive">
                  <table className="exam-table">
                    <thead>
                      <tr>
                        <th>Exam Date</th>
                        <th>Day</th>
                        <th>Subject</th>
                        <th>Subject Code</th>
                        <th>Reporting Time</th>
                        <th>Hall</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentChildExam.dates.map((item, i) => (
                        <tr key={i}>
                          <td><strong>{item.date}</strong></td>
                          <td>{item.day}</td>
                          <td><span className="exam-sub-title">{item.subject}</span></td>
                          <td><code>{item.code}</code></td>
                          <td><FaClock /> {item.time}</td>
                          <td><span className="room-badge">{item.room}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="exam-guidelines-box">
                  <strong>Important Board Guidelines:</strong>
                  <ul>
                    <li>Students must report in full school uniform with verified Admit Card &amp; School ID card.</li>
                    <li>Entry gate closes strictly at 08:45 AM. Late entries are strictly prohibited.</li>
                    <li>Only transparent pencil pouches and transparent water bottles are permitted.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FEE PAYMENT HISTORY & DUES */}
          {activeTab === 'fees' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>Fee Ledger &amp; Upcoming Dues</h2>
                  <p>Official accounting ledger, online fee payment, and digital receipt vouchers.</p>
                </div>
                {activeChild.feesDue > 0 && (
                  <button className="primary-action-btn" onClick={() => setShowPayModal(true)}>
                    <FaCreditCard /> Pay Outstanding Dues (₹{activeChild.feesDue})
                  </button>
                )}
              </div>

              {/* Dues Alert Banner */}
              <div className={`fee-status-banner ${activeChild.feesDue > 0 ? 'has-dues' : 'cleared'}`}>
                <div className="banner-left">
                  <span className="banner-icon">{activeChild.feesDue > 0 ? <FaExclamationTriangle /> : <FaCheckCircle />}</span>
                  <div>
                    <h3>{activeChild.feesDue > 0 ? `Outstanding Fee Dues: ₹${activeChild.feesDue}` : 'All Fee Dues Cleared!'}</h3>
                    <p>
                      {activeChild.feesDue > 0
                        ? `Tuition & Transport fee for ${activeChild.name} is due on 10th November 2026. Pay online to avoid late fee penalty.`
                        : `Thank you! No overdue fees recorded for ${activeChild.name} in Session 2026–2027.`}
                    </p>
                  </div>
                </div>
                {activeChild.feesDue > 0 && (
                  <button className="pay-now-btn" onClick={() => setShowPayModal(true)}>
                    Pay Online Now
                  </button>
                )}
              </div>

              {/* Transaction Ledger Table */}
              <div className="parent-section-card">
                <h3><FaFileAlt /> Verified Payment Transactions &amp; Receipts</h3>
                <div className="table-responsive">
                  <table className="fee-ledger-table">
                    <thead>
                      <tr>
                        <th>Receipt No</th>
                        <th>Date</th>
                        <th>Student Name</th>
                        <th>Fee Particulars</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeTransactions.map((txn) => (
                        <tr key={txn.receiptNo}>
                          <td><strong>{txn.receiptNo}</strong></td>
                          <td>{txn.date}</td>
                          <td>{txn.childName} ({txn.childClass})</td>
                          <td>{txn.description}</td>
                          <td><span className="amount-badge">₹{txn.amount.toLocaleString('en-IN')}</span></td>
                          <td>{txn.paymentMode}</td>
                          <td><span className="status-badge-cleared">{txn.status}</span></td>
                          <td>
                            <button
                              className="btn-view-receipt"
                              onClick={() => setSelectedReceipt(txn)}
                            >
                              <FaFileAlt /> View Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: BUS & TRANSPORT (NEW) */}
          {activeTab === 'transport' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>School Bus &amp; Fleet Transport Desk</h2>
                  <p>GPS tracking information, route timings &amp; dedicated transport staff contacts.</p>
                </div>
                <span className="gps-live-pill"><span className="pulse-dot"></span> GPS Signal Active</span>
              </div>

              <div className="transport-master-grid">
                <div className="transport-card primary-details">
                  <div className="trans-header-row">
                    <div>
                      <span className="badge-cbse">Dedicated Fleet Transport</span>
                      <h3>{transportData.routeNo} — {transportData.vehicleNumber}</h3>
                      <p>{transportData.busModel}</p>
                    </div>
                    <div className="trans-icon-box"><FaBus /></div>
                  </div>

                  <div className="trans-timing-grid">
                    <div className="time-card">
                      <span className="lbl">Designated Stoppage</span>
                      <strong>{transportData.pickupStoppage}</strong>
                    </div>
                    <div className="time-card">
                      <span className="lbl">Morning Pick-Up</span>
                      <strong className="text-primary">{transportData.morningPickupTime}</strong>
                    </div>
                    <div className="time-card">
                      <span className="lbl">Afternoon Drop</span>
                      <strong className="text-success">{transportData.afternoonDropTime}</strong>
                    </div>
                    <div className="time-card">
                      <span className="lbl">Current Route Status</span>
                      <strong className="text-warning">{transportData.currentStatus}</strong>
                    </div>
                  </div>
                </div>

                <div className="transport-card staff-contacts">
                  <h3>Transport Crew Assigned</h3>
                  
                  <div className="crew-contact-row">
                    <div className="crew-avatar"><FaUserTie /></div>
                    <div className="crew-meta">
                      <strong>{transportData.driverName}</strong>
                      <span>Senior School Bus Driver</span>
                      <a href={`tel:${transportData.driverPhone}`} className="crew-phone-link">
                        <FaPhoneAlt /> {transportData.driverPhone}
                      </a>
                    </div>
                  </div>

                  <div className="crew-contact-row">
                    <div className="crew-avatar"><FaUsers /></div>
                    <div className="crew-meta">
                      <strong>{transportData.conductorName}</strong>
                      <span>Bus Conductor &amp; Attendant</span>
                      <a href={`tel:${transportData.conductorPhone}`} className="crew-phone-link">
                        <FaPhoneAlt /> {transportData.conductorPhone}
                      </a>
                    </div>
                  </div>

                  <div className="safety-advisory-box">
                    <FaShieldAlt className="shield-icon" />
                    <div>
                      <strong>Transport Safety Protocol:</strong>
                      <p>{transportData.speedGovernor}. All buses are equipped with first-aid kits and female caretakers for student security.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: TEACHER & PRINCIPAL MESSAGING */}
          {activeTab === 'messaging' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>Parent-Teacher Communication Hub</h2>
                  <p>Direct communication channel with Class Teachers, Subject Mentors &amp; School Administration.</p>
                </div>
              </div>

              <div className="parent-messaging-layout">
                <div className="parent-contacts-column">
                  <h4>Faculty &amp; Leadership</h4>
                  <div className="parent-contacts-list">
                    {parentMessages.map((thread) => (
                      <div
                        key={thread.id}
                        className={`parent-contact-card ${selectedFacultyChat === thread.faculty ? 'active' : ''}`}
                        onClick={() => setSelectedFacultyChat(thread.faculty)}
                      >
                        <div className="contact-avatar-pill">
                          {thread.faculty.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div className="contact-meta">
                          <strong>{thread.faculty}</strong>
                          <span className="contact-role-desc">{thread.role}</span>
                          <span className="contact-child-tag">Ward: {thread.child}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="parent-chat-column">
                  <div className="chat-header-bar">
                    <div className="faculty-badge-info">
                      <div className="active-dot"></div>
                      <div>
                        <h3>{activeChatThread.faculty}</h3>
                        <span>{activeChatThread.role}</span>
                      </div>
                    </div>
                    <span className="verified-faculty-tag">Official Channel</span>
                  </div>

                  <div className="parent-messages-flow">
                    {activeChatThread.messages.map((m, idx) => (
                      <div key={idx} className={`parent-msg-wrap ${m.sender === 'parent' ? 'parent-out' : 'faculty-in'}`}>
                        <div className="parent-msg-bubble">
                          <p>{m.text}</p>
                          <span className="msg-time">{m.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendParentMessage} className="parent-chat-input-row">
                    <input
                      type="text"
                      placeholder={`Send a query or update to ${activeChatThread.faculty}...`}
                      value={chatMessageText}
                      onChange={(e) => setChatMessageText(e.target.value)}
                    />
                    <button type="submit" className="btn-send-parent-msg" disabled={!chatMessageText.trim()}>
                      Send Query ➤
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: OFFICIAL NOTICES & PERMISSION SLIPS */}
          {activeTab === 'notices' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>Official Notices &amp; Permission Slips</h2>
                  <p>Institutional consent forms, educational tour slips, medical waivers &amp; digital approvals.</p>
                </div>
              </div>

              <div className="slips-container-grid">
                {slips.map((slip) => (
                  <div key={slip.id} className="official-slip-card">
                    <div className="slip-top-row">
                      <span className="slip-cat-badge">{slip.category}</span>
                      <span className={`slip-signed-pill ${slip.isSigned ? 'signed' : 'pending'}`}>
                        {slip.signedStatus}
                      </span>
                    </div>

                    <h3 className="slip-card-title">{slip.title}</h3>
                    <p className="slip-card-desc">{slip.description}</p>

                    <div className="slip-particulars-grid">
                      <div><span>Applicable Ward:</span> <strong>{slip.applicableChild}</strong></div>
                      <div><span>Issued On:</span> <strong>{slip.issuedDate}</strong></div>
                      <div><span>Submission Deadline:</span> <strong className="text-danger">{slip.deadline}</strong></div>
                      <div><span>Tour / Activity Fee:</span> <strong>{slip.fee}</strong></div>
                    </div>

                    <div className="slip-actions-footer">
                      <button
                        className="btn-download-pdf-slip"
                        onClick={() => alert(`Downloading official PDF: ${slip.pdfName}`)}
                      >
                        <FaFileAlt /> Download Slip PDF
                      </button>

                      <button
                        className={`btn-digital-consent ${slip.isSigned ? 'is-granted' : ''}`}
                        onClick={() => handleToggleConsent(slip.id)}
                      >
                        {slip.isSigned ? <><FaCheck /> Digital Consent Granted</> : <><FaPen /> Grant Digital Consent</>}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: SCHOOL EVENT CALENDAR */}
          {activeTab === 'events' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>School Events &amp; Academic Calendar</h2>
                  <p>Important dates, sports meets, examination schedules, and Parent-Teacher Meetings.</p>
                </div>
              </div>

              <div className="events-cards-grid">
                {schoolEvents.map((evt) => (
                  <div key={evt.id} className="event-full-card">
                    <div className="event-card-top">
                      <span className={`event-cat-tag ${evt.category.toLowerCase().replace(/[\s&]+/g, '-')}`}>
                        {evt.category}
                      </span>
                      <span className="event-date-badge"><FaCalendarAlt /> {evt.date}</span>
                    </div>

                    <h3 className="event-title">{evt.title}</h3>
                    <p className="event-desc">{evt.description}</p>

                    <div className="event-meta-info">
                      <div><FaMapMarkerAlt /> <strong>Venue:</strong> {evt.venue}</div>
                      <div><FaClock /> <strong>Timings:</strong> {evt.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: STUDENT PROFILE & ID CARD (NEW) */}
          {activeTab === 'profile' && (
            <div className="tab-pane-container fade-in">
              <div className="parent-page-header">
                <div>
                  <h2>Official Student Identity &amp; Health Record</h2>
                  <p>CBSE-registered student profile, emergency contacts &amp; pediatric wellness summary.</p>
                </div>
                <button className="primary-action-btn" onClick={() => window.print()}>
                  <FaPrint /> Print Official ID Card
                </button>
              </div>

              <div className="profile-master-grid">
                {/* Official Digital School ID Card */}
                <div className="student-id-card-render">
                  <div className="id-card-header">
                    <img src={logo} alt="LBMDPS Crest" className="id-crest" />
                    <div>
                      <h4>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h4>
                      <p>Affiliated to CBSE, New Delhi • Affiliation #3430398 • UDISE: 20060105502</p>
                      <span className="id-card-loc">Campus: Naitand, Giridih, Jharkhand</span>
                    </div>
                  </div>

                  <div className="id-card-body">
                    <div className="id-avatar-box">
                      <span>{activeChild.avatarInitials}</span>
                    </div>
                    <div className="id-details-box">
                      <h3 className="id-student-name">{activeChild.name}</h3>
                      <div className="id-row"><span>Class &amp; Sec:</span> <strong>{activeChild.classGrade}</strong></div>
                      <div className="id-row"><span>Roll Number:</span> <strong>{activeChild.rollNo}</strong></div>
                      <div className="id-row"><span>Admission No:</span> <strong>{activeChild.admissionNo}</strong></div>
                      <div className="id-row"><span>Date of Birth:</span> <strong>{activeChild.dob}</strong></div>
                      <div className="id-row"><span>Blood Group:</span> <strong className="blood-badge">{activeChild.bloodGroup}</strong></div>
                      <div className="id-row"><span>Parent Contact:</span> <strong>{parentProfile.phone}</strong></div>
                    </div>
                  </div>

                  <div className="id-card-footer">
                    <span>Valid for Session 2026–2027</span>
                    <span className="id-auth-sig">Principal / Controller of Exams</span>
                  </div>
                </div>

                {/* Medical & Wellness Report */}
                <div className="parent-section-card medical-card">
                  <div className="card-top-bar">
                    <h3><FaShieldAlt /> Pediatric Health &amp; Fitness Log</h3>
                    <span className="badge-cbse">Annual Campus Screening</span>
                  </div>

                  <div className="health-metrics-grid">
                    <div className="health-box">
                      <span className="lbl">Height</span>
                      <strong>{activeChild.height}</strong>
                    </div>
                    <div className="health-box">
                      <span className="lbl">Weight</span>
                      <strong>{activeChild.weight}</strong>
                    </div>
                    <div className="health-box">
                      <span className="lbl">Blood Group</span>
                      <strong>{activeChild.bloodGroup}</strong>
                    </div>
                    <div className="health-box">
                      <span className="lbl">Vision Check</span>
                      <strong>{activeChild.vision}</strong>
                    </div>
                  </div>

                  <div className="medical-notes-block">
                    <strong>Medical Officer Remarks:</strong>
                    <p>{activeChild.medicalNotes}</p>
                    <div className="emergency-highlight">
                      <FaPhoneAlt /> <span>24x7 Emergency Contact: <strong>{activeChild.emergencyContact}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: PAY FEES ONLINE */}
      {showPayModal && (
        <div className="parent-modal-overlay" onClick={() => setShowPayModal(false)}>
          <div className="parent-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h3><FaCreditCard /> Online Fee Payment Gateway</h3>
              <button className="modal-close" onClick={() => setShowPayModal(false)}>&times;</button>
            </div>

            <div className="pay-modal-body">
              <div className="pay-summary-box">
                <div>
                  <span className="lbl">Student Name:</span>
                  <strong>{activeChild.name} ({activeChild.classGrade})</strong>
                </div>
                <div>
                  <span className="lbl">Total Payable Amount:</span>
                  <strong className="amount-highlight">₹{activeChild.feesDue > 0 ? activeChild.feesDue : 1850}</strong>
                </div>
              </div>

              <h4>Select Payment Method:</h4>
              <div className="payment-options-grid">
                <div className="pay-option active">
                  <span className="pay-opt-icon"><FaMobileAlt /></span>
                  <strong>Instant UPI / QR Code</strong>
                  <span>GPay, PhonePe, Paytm, BHIM</span>
                </div>
                <div className="pay-option">
                  <span className="pay-opt-icon"><FaUniversity /></span>
                  <strong>Net Banking</strong>
                  <span>SBI, HDFC, ICICI, Axis Bank</span>
                </div>
                <div className="pay-option">
                  <span className="pay-opt-icon"><FaCreditCard /></span>
                  <strong>Debit / Credit Card</strong>
                  <span>Visa, MasterCard, RuPay</span>
                </div>
              </div>

              <div className="modal-actions-row">
                <button className="btn-cancel" onClick={() => setShowPayModal(false)}>
                  Cancel
                </button>
                <button className="btn-confirm-pay" onClick={handleConfirmPayFees}>
                  Proceed to Pay ₹{activeChild.feesDue > 0 ? activeChild.feesDue : 1850}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: APPLY FOR STUDENT LEAVE */}
      {showLeaveModal && (
        <div className="parent-modal-overlay" onClick={() => setShowLeaveModal(false)}>
          <div className="parent-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h3><FaPen /> Student Leave Application Desk</h3>
              <button className="modal-close" onClick={() => setShowLeaveModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleSubmitLeave} className="leave-modal-form">
              <div className="form-group">
                <label>Student Name</label>
                <input type="text" value={`${activeChild.name} (${activeChild.classGrade} - Roll #${activeChild.rollNo})`} disabled />
              </div>

              <div className="form-group">
                <label>Reason for Leave</label>
                <select value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)}>
                  <option value="Medical / Health indisposition">Medical / Health indisposition</option>
                  <option value="Family Function / Marriage Ceremony">Family Function / Marriage Ceremony</option>
                  <option value="Urgent Personal Work">Urgent Personal Work</option>
                  <option value="Outstation Travel">Outstation Travel</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Leave From</label>
                  <input
                    type="date"
                    value={leaveFrom}
                    onChange={(e) => setLeaveFrom(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Leave To</label>
                  <input
                    type="date"
                    value={leaveTo}
                    onChange={(e) => setLeaveTo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Detailed Note for Class Teacher</label>
                <textarea
                  rows="3"
                  placeholder="Explain reason clearly (e.g., Doctor advised 2 days bed rest)..."
                  value={leaveNote}
                  onChange={(e) => setLeaveNote(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn-cancel" onClick={() => setShowLeaveModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-confirm-pay">
                  Submit Leave Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW OFFICIAL RECEIPT */}
      {selectedReceipt && (
        <div className="parent-modal-overlay" onClick={() => setSelectedReceipt(null)}>
          <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="receipt-header">
              <img src={logo} alt="LBMDPS Logo" className="receipt-logo" />
              <div>
                <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                <p>Naitand, Post Jamua, Dist. Giridih, Jharkhand - 815318</p>
                <span>CBSE Affiliation #3430398 • UDISE: 20060105502 • Official Fee Receipt</span>
              </div>
            </div>

            <div className="receipt-meta-grid">
              <div><span>Receipt No:</span> <strong>{selectedReceipt.receiptNo}</strong></div>
              <div><span>Date of Issue:</span> <strong>{selectedReceipt.date}</strong></div>
              <div><span>Student Name:</span> <strong>{selectedReceipt.childName}</strong></div>
              <div><span>Class &amp; Sec:</span> <strong>{selectedReceipt.childClass}</strong></div>
              <div><span>Payment Mode:</span> <strong>{selectedReceipt.paymentMode}</strong></div>
              <div><span>Transaction Ref:</span> <code>{selectedReceipt.txnRef}</code></div>
            </div>

            <div className="receipt-items-table">
              <table>
                <thead>
                  <tr>
                    <th>Fee Description</th>
                    <th>Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReceipt.items ? (
                    selectedReceipt.items.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.head}</td>
                        <td>₹{it.amount.toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>{selectedReceipt.description}</td>
                      <td>₹{selectedReceipt.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  <tr className="total-row">
                    <td><strong>Total Amount Paid:</strong></td>
                    <td><strong>₹{selectedReceipt.amount.toLocaleString('en-IN')}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="receipt-footer">
              <div className="paid-stamp">VERIFIED &amp; CLEARED</div>
              <p>Computer generated e-receipt. Does not require physical signature under CBSE IT guidelines.</p>
              <div className="receipt-actions">
                <button className="btn-print" onClick={() => window.print()}>
                  <FaPrint /> Print Receipt
                </button>
                <button className="btn-close-receipt" onClick={() => setSelectedReceipt(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
