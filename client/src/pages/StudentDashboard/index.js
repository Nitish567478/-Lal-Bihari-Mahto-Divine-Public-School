import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  FaAngleLeft, FaAngleRight, FaBullhorn, FaCalendarAlt, FaChartLine,
  FaCheck, FaClipboardList, FaComments, FaGlobe, FaPlus, FaSignOutAlt,
  FaTasks, FaTrashAlt, FaTrophy, FaUser, FaUsers, FaBookOpen, FaStar,
  FaClock, FaRegClock, FaClipboardCheck, FaDownload, FaFileAlt,
  FaPaperPlane, FaRobot, FaImage, FaTimes, FaInfoCircle, FaLightbulb, FaPrint,
} from 'react-icons/fa';
import logo from '../../components/AllImage/school-logo.jpg';
import RoleSwitcher from '../../components/RoleSwitcher';
import { fetchStudentPortalData, submitHomeworkSolution, sendStudentTutorQuestion } from '../../utils/api';
import './index.css';

// Default Student Data
const defaultStudent = {
  name: 'Aarav Kumar',
  admissionNo: 'LBM-2023-1041',
  rollNo: '01',
  classGrade: 'Class 10-A',
  academicSession: '2026–2027',
  dob: '14 May 2011',
  gender: 'Male',
  bloodGroup: 'B+',
  house: 'Tagore House (Red)',
  busRoute: 'Route #4 (Giridih Town - Pachamba - Naitand)',
  lockerNo: 'B-24',
  aadhaarMasked: 'XXXX-XXXX-8921',
  fatherName: 'Mr. Sunil Kumar',
  fatherOccupation: 'Civil Engineer',
  motherName: 'Mrs. Anita Devi',
  motherOccupation: 'High School Educator',
  primaryPhone: '+91 94313 78901',
  emergencyContact: '+91 98351 22419',
  address: 'Village Naitand, Post Jamua, Dist. Giridih, Jharkhand - 815318',
  avatarInitials: 'AK'
};

// Weekly Class Schedule (Monday through Saturday)
const initialSchedule = {
  Monday: [
    { period: 1, time: '08:30 AM - 09:15 AM', subject: 'Mathematics', teacher: 'Mr. R.K. Sharma', room: 'Room 302', topic: 'Quadratic Equations & Roots' },
    { period: 2, time: '09:15 AM - 10:00 AM', subject: 'Science (Physics)', teacher: 'Mrs. Sunita Devi', room: 'Physics Lab', topic: 'Refraction through Glass Prism' },
    { period: 3, time: '10:00 AM - 10:45 AM', subject: 'English Communicative', teacher: 'Mr. Amit Roy', room: 'Room 302', topic: 'The Dear Departed (Act 1)' },
    { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Social Science (History)', teacher: 'Sri Manoj Tiwari', room: 'Room 302', topic: 'Nationalism in India (1919-1930)' },
    { period: 'Break', time: '11:30 AM - 12:00 PM', subject: 'Recess & Lunch Break', teacher: 'Campus Grounds', room: 'Dining Hall', topic: 'Midday Meal & Nutrition' },
    { period: 5, time: '12:00 PM - 12:45 PM', subject: 'Computer Applications', teacher: 'Mrs. Priya Sinha', room: 'Computer Lab 1', topic: 'HTML5 & CSS Grid Layouts' },
    { period: 6, time: '12:45 PM - 01:30 PM', subject: 'Hindi Course A', teacher: 'Dr. Surendra Pandey', room: 'Room 302', topic: 'Kavita: Surdas ke Pad' },
    { period: 7, time: '01:30 PM - 02:15 PM', subject: 'Physical Education / Sports', teacher: 'Mr. Vikram Soren', room: 'Playground', topic: 'Cricket Net Practice & Athletics' }
  ],
  Tuesday: [
    { period: 1, time: '08:30 AM - 09:15 AM', subject: 'Science (Chemistry)', teacher: 'Mrs. Sunita Devi', room: 'Chemistry Lab', topic: 'Acids, Bases and Salts' },
    { period: 2, time: '09:15 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mr. R.K. Sharma', room: 'Room 302', topic: 'Arithmetic Progressions' },
    { period: 3, time: '10:00 AM - 10:45 AM', subject: 'Hindi Course A', teacher: 'Dr. Surendra Pandey', room: 'Room 302', topic: 'Vyakaran: Alankar & Samas' },
    { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Social Science (Geography)', teacher: 'Sri Manoj Tiwari', room: 'Room 302', topic: 'Water Resources & Dam Networks' },
    { period: 'Break', time: '11:30 AM - 12:00 PM', subject: 'Recess & Lunch Break', teacher: 'Campus Grounds', room: 'Dining Hall', topic: 'Midday Meal' },
    { period: 5, time: '12:00 PM - 12:45 PM', subject: 'English Communicative', teacher: 'Mr. Amit Roy', room: 'Room 302', topic: 'Formal Letter to Editor' },
    { period: 6, time: '12:45 PM - 01:30 PM', subject: 'Library / Silent Reading', teacher: 'Mrs. Geeta Roy', room: 'Central Library', topic: 'Current Affairs & CBSE Periodicals' },
    { period: 7, time: '01:30 PM - 02:15 PM', subject: 'Art & Craft', teacher: 'Mr. Subroto Ghosh', room: 'Art Studio', topic: 'Water Color Landscape Composition' }
  ],
  Wednesday: [
    { period: 1, time: '08:30 AM - 09:15 AM', subject: 'Mathematics', teacher: 'Mr. R.K. Sharma', room: 'Room 302', topic: 'Trigonometric Identities Practice' },
    { period: 2, time: '09:15 AM - 10:00 AM', subject: 'Science (Biology)', teacher: 'Mrs. Sunita Devi', room: 'Biology Lab', topic: 'Human Circulatory & Heart Diagram' },
    { period: 3, time: '10:00 AM - 10:45 AM', subject: 'Social Science (Civics)', teacher: 'Sri Manoj Tiwari', room: 'Room 302', topic: 'Federalism & Power Sharing' },
    { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Computer Applications', teacher: 'Mrs. Priya Sinha', room: 'Computer Lab 1', topic: 'JavaScript Form Validations' },
    { period: 'Break', time: '11:30 AM - 12:00 PM', subject: 'Recess & Lunch Break', teacher: 'Campus Grounds', room: 'Dining Hall', topic: 'Midday Meal' },
    { period: 5, time: '12:00 PM - 12:45 PM', subject: 'English Communicative', teacher: 'Mr. Amit Roy', room: 'Room 302', topic: 'Poem: Snake by D.H. Lawrence' },
    { period: 6, time: '12:45 PM - 01:30 PM', subject: 'Science Lab Practical', teacher: 'Mrs. Sunita Devi', room: 'Science Lab', topic: 'Ohm’s Law Verification Experiment' },
    { period: 7, time: '01:30 PM - 02:15 PM', subject: 'Robotics & STEM Lab', teacher: 'Er. Rajesh Singh', room: 'STEM Center', topic: 'Arduino Sensor Programming' }
  ],
  Thursday: [
    { period: 1, time: '08:30 AM - 09:15 AM', subject: 'Social Science (Economics)', teacher: 'Sri Manoj Tiwari', room: 'Room 302', topic: 'Sectors of the Indian Economy' },
    { period: 2, time: '09:15 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mr. R.K. Sharma', room: 'Room 302', topic: 'Circles & Tangents Theorems' },
    { period: 3, time: '10:00 AM - 10:45 AM', subject: 'Science (Physics)', teacher: 'Mrs. Sunita Devi', room: 'Physics Lab', topic: 'Electric Current & Circuits' },
    { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Hindi Course A', teacher: 'Dr. Surendra Pandey', room: 'Room 302', topic: 'Nibandh Lekhan: Digital India' },
    { period: 'Break', time: '11:30 AM - 12:00 PM', subject: 'Recess & Lunch Break', teacher: 'Campus Grounds', room: 'Dining Hall', topic: 'Midday Meal' },
    { period: 5, time: '12:00 PM - 12:45 PM', subject: 'English Communicative', teacher: 'Mr. Amit Roy', room: 'Room 302', topic: 'Grammar: Direct & Indirect Speech' },
    { period: 6, time: '12:45 PM - 01:30 PM', subject: 'Music & Performing Arts', teacher: 'Pandit J.N. Mishra', room: 'Music Hall', topic: 'Classical Vocal & Harmonium Ragas' },
    { period: 7, time: '01:30 PM - 02:15 PM', subject: 'General Knowledge & Quiz', teacher: 'Mrs. Priya Sinha', room: 'Room 302', topic: 'National Science & Space Quiz' }
  ],
  Friday: [
    { period: 1, time: '08:30 AM - 09:15 AM', subject: 'Science (Chemistry)', teacher: 'Mrs. Sunita Devi', room: 'Chemistry Lab', topic: 'Metals & Non-Metals Properties' },
    { period: 2, time: '09:15 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mr. R.K. Sharma', room: 'Room 302', topic: 'Coordinate Geometry Formulas' },
    { period: 3, time: '10:00 AM - 10:45 AM', subject: 'English Communicative', teacher: 'Mr. Amit Roy', room: 'Room 302', topic: 'Reading Comprehension Drills' },
    { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Computer Applications', teacher: 'Mrs. Priya Sinha', room: 'Computer Lab 1', topic: 'Cyber Safety & Digital Citizenship' },
    { period: 'Break', time: '11:30 AM - 12:00 PM', subject: 'Recess & Lunch Break', teacher: 'Campus Grounds', room: 'Dining Hall', topic: 'Midday Meal' },
    { period: 5, time: '12:00 PM - 12:45 PM', subject: 'Social Science (History)', teacher: 'Sri Manoj Tiwari', room: 'Room 302', topic: 'The Making of a Global World' },
    { period: 6, time: '12:45 PM - 01:30 PM', subject: 'Yoga & Value Education', teacher: 'Sri Yogesh Mahto', room: 'Assembly Hall', topic: 'Pranayama, Meditation & Moral Ethics' },
    { period: 7, time: '01:30 PM - 02:15 PM', subject: 'Remedial Doubt Clearing', teacher: 'Subject Faculty', room: 'Room 302', topic: 'Open House Subject Questions' }
  ],
  Saturday: [
    { period: 1, time: '08:30 AM - 09:15 AM', subject: 'Special Mathematics Olympiad', teacher: 'Mr. R.K. Sharma', room: 'Room 302', topic: 'Speed Math & Mental Calculations' },
    { period: 2, time: '09:15 AM - 10:00 AM', subject: 'CBSE Science Practicals', teacher: 'Mrs. Sunita Devi', room: 'Science Composite Lab', topic: 'pH Paper & Acid Identification' },
    { period: 3, time: '10:00 AM - 10:45 AM', subject: 'Debate & Public Speaking', teacher: 'Mr. Amit Roy', room: 'Auditorium', topic: 'Inter-House Elocution Competition' },
    { period: 4, time: '10:45 AM - 11:30 AM', subject: 'House Assembly & Activity', teacher: 'House Mentors', room: 'Campus Quad', topic: 'Weekly House Points & Drill' },
    { period: 'Dismissal', time: '11:30 AM', subject: 'Half-Day Dismissal', teacher: 'All Faculty', room: 'School Gates', topic: 'Buses Depart at 11:45 AM' }
  ]
};

// Homework & Assignments Data
const initialAssignments = [
  {
    id: 'ASG-101',
    subject: 'Mathematics',
    title: 'NCERT Chapter 4: Quadratic Equations Problem Set',
    description: 'Solve Exercise 4.3 questions 1 to 8 in the homework register. Show step-by-step discriminant calculations.',
    assignedDate: '28 Oct 2026',
    dueDate: '02 Nov 2026',
    status: 'Pending',
    teacher: 'Mr. R.K. Sharma',
    points: '20 Marks',
    attachmentName: 'Quadratic_Equations_Ex4.3_Notes.pdf'
  },
  {
    id: 'ASG-102',
    subject: 'Science (Physics)',
    title: 'Ray Optics Ray Diagrams & Lens Formula Derivation',
    description: 'Draw neat labeled ray diagrams for convex lens image formation in 6 different object positions using a sharp pencil and ruler.',
    assignedDate: '26 Oct 2026',
    dueDate: '31 Oct 2026',
    status: 'Pending',
    teacher: 'Mrs. Sunita Devi',
    points: '15 Marks',
    attachmentName: 'Ray_Optics_Practical_Guidelines.pdf'
  },
  {
    id: 'ASG-103',
    subject: 'Computer Applications',
    title: 'School Sports Day Webpage using HTML5 & CSS',
    description: 'Create an attractive multi-section webpage layout showcasing the upcoming Annual Sports Meet with table of events and registration form.',
    assignedDate: '22 Oct 2026',
    dueDate: '27 Oct 2026',
    status: 'Submitted',
    submittedOn: '26 Oct 2026',
    teacher: 'Mrs. Priya Sinha',
    points: '25 Marks',
    attachmentName: 'Sports_Webpage_Project_Aarav.zip',
    grade: 'Pending Review'
  },
  {
    id: 'ASG-104',
    subject: 'English Communicative',
    title: 'Formal Letter to Editor: Road Safety in Giridih',
    description: 'Write a formal letter (120-150 words) to the Editor of The Telegraph highlighting reckless driving near school zones and suggesting remedies.',
    assignedDate: '18 Oct 2026',
    dueDate: '21 Oct 2026',
    status: 'Evaluated',
    submittedOn: '20 Oct 2026',
    teacher: 'Mr. Amit Roy',
    points: '10 Marks',
    score: '9.5 / 10',
    remarks: 'Excellent vocabulary, well-structured format and persuasive tone.'
  },
  {
    id: 'ASG-105',
    subject: 'Social Science',
    title: 'Map Work: Major Multipurpose Dams & Soil Types of India',
    description: 'Locate and label Bhakra Nangal, Hirakud, Sardar Sarovar, and Nagarjuna Sagar on an outline physical map of India.',
    assignedDate: '14 Oct 2026',
    dueDate: '17 Oct 2026',
    status: 'Evaluated',
    submittedOn: '16 Oct 2026',
    teacher: 'Sri Manoj Tiwari',
    points: '10 Marks',
    score: '10 / 10',
    remarks: 'Flawless cartographic precision and neat indexing.'
  }
];

// Grades & Exam Report Card Data
const examReportData = {
  term: 'CBSE Term 1 Mid-Term Examination 2026',
  examMonth: 'September 2026',
  rollNo: '01',
  admissionNo: 'LBM-2023-1041',
  studentName: 'Aarav Kumar',
  classGrade: 'Class 10-A',
  subjects: [
    { code: '041', name: 'Mathematics', theoryMax: 80, theoryObt: 75, intMax: 20, intObt: 19, total: 94, grade: 'A1', remarks: 'Exceptional mathematical rigor' },
    { code: '086', name: 'Science (Phy/Chem/Bio)', theoryMax: 80, theoryObt: 76, intMax: 20, intObt: 20, total: 96, grade: 'A1', remarks: 'Outstanding analytical & lab skills' },
    { code: '184', name: 'English Language & Lit.', theoryMax: 80, theoryObt: 72, intMax: 20, intObt: 19, total: 91, grade: 'A1', remarks: 'Eloquent prose and rich vocabulary' },
    { code: '002', name: 'Hindi Course-A', theoryMax: 80, theoryObt: 74, intMax: 20, intObt: 18, total: 92, grade: 'A1', remarks: 'Neat calligraphy & strong grammar' },
    { code: '087', name: 'Social Science', theoryMax: 80, theoryObt: 75, intMax: 20, intObt: 19, total: 94, grade: 'A1', remarks: 'Deep grasp of historical timeline' },
    { code: '165', name: 'Computer Applications', theoryMax: 50, theoryObt: 48, intMax: 50, intObt: 50, total: 98, grade: 'A1', remarks: 'First class programming capabilities' }
  ],
  coScholastic: [
    { skill: 'Work Education / Pre-Vocational IT', grade: 'A' },
    { skill: 'Art & Aesthetic Education', grade: 'A' },
    { skill: 'Health & Physical Fitness', grade: 'A+' },
    { skill: 'Discipline & Punctuality', grade: 'A+' }
  ],
  attendanceTotalDays: 116,
  attendancePresentDays: 110,
  attendancePercentage: '94.8%',
  overallTotal: '565 / 600',
  percentage: '94.2%',
  cgpa: '9.4',
  resultStatus: 'PASSED (Division I with Distinction)',
  classRank: '1st in Class 10-A (Class Topper)',
  classTeacherRemarks: 'Aarav is an exemplary scholar with remarkable dedication, polite conduct, and active participation in co-curriculars.',
  principalRemark: 'Promising young mind. Keep up the high standard of excellence for CBSE Board Finals!'
};

// Daily School Announcements Data
const initialAnnouncements = [
  {
    id: 'ANN-101',
    date: '28 Oct 2026',
    category: 'Examinations',
    badge: 'Important',
    title: 'Pre-Board Examination Series 1 Date Sheet Released',
    content: 'CBSE Pre-Board examinations for Class 10 will commence from Monday, 23rd November 2026. Hall tickets and revision question banks will be distributed by respective subject mentors next week.',
    author: 'Examination Controller, LBMDPS',
    priority: 'high'
  },
  {
    id: 'ANN-102',
    date: '27 Oct 2026',
    category: 'Sports & Athletics',
    badge: 'Event',
    title: 'Inter-House Annual Sports Meet 2026 Selection Trials',
    content: 'Selection trials for 100m sprint, 4x100m relay, long jump, badminton, and cricket will take place at the school playground on Friday, 30th October 2026 during periods 6 and 7.',
    author: 'Sports Committee & Physical Directorate',
    priority: 'medium'
  },
  {
    id: 'ANN-103',
    date: '25 Oct 2026',
    category: 'Holidays',
    badge: 'Notice',
    title: 'Diwali & Chhath Puja Festival Vacation Circular',
    content: 'The school campus will remain closed from 08th November to 15th November 2026 on account of Deepawali, Govardhan Puja, and Chhath Puja. Holiday assignments must be submitted on reopening day.',
    author: 'Office of the Principal',
    priority: 'normal'
  },
  {
    id: 'ANN-104',
    date: '21 Oct 2026',
    category: 'Academic & STEM',
    badge: 'Competition',
    title: 'Jharkhand State Level CBSE Science & Robotics Exhibition',
    content: 'Students wishing to showcase innovative working models (Solar Energy, Smart Irrigation, AI Vision) are invited to register their teams with Mrs. Sunita Devi before 5th November.',
    author: 'Science & Innovation Club',
    priority: 'normal'
  }
];

const containsInappropriateLanguage = (text) => {
  const normalized = String(text || '').normalize('NFKC').toLowerCase();
  return /\b(?:f+u+c+k+|s+h+i+t+|b+i+t+c+h+|a+s+s+h+o+l+e|b+a+s+t+a+r+d|m+o+t+h+e+r+f+u+c+k+e+r|m+a+d+a+r+c+h+o+d|b+h+e+n+c+h+o+d|c+h+u+t+i+y+a|r+a+n+d+i|g+a+a+n+d)\b/i.test(normalized);
};

const StudentDashboard = ({ isDemoMode }) => {
  const history = useHistory();
  const tutorUserKey = (() => {
    try {
      const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
      return authUser.username || defaultStudent.admissionNo;
    } catch (error) {
      return defaultStudent.admissionNo;
    }
  })();
  const tutorBlockStorageKey = `studentStudyCoachBlock:${tutorUserKey}`;
  const tutorSessionStorageKey = `studentStudyCoachSession:${tutorUserKey}`;
  const [studentData, setStudentData] = useState(defaultStudent);
  const [attendanceMetrics, setAttendanceMetrics] = useState({
    totalDays: 116,
    presentDays: 110,
    absentDays: 6,
    attendanceRate: 94.8
  });
  const [loadingDb, setLoadingDb] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [assignments, setAssignments] = useState(initialAssignments);
  const [assignmentFilter, setAssignmentFilter] = useState('All');
  const [submittingAssignment, setSubmittingAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submissionFileName, setSubmissionFileName] = useState('');
  const [showReportCardModal, setShowReportCardModal] = useState(false);
  const [tutorMessages, setTutorMessages] = useState([{
    id: 'welcome',
    role: 'assistant',
    text: 'Namaste! Type a question or upload a clear photo. First, I will explain what the question is asking in simple words. Then I will point out the useful concept and give you a hint so you can solve it yourself.',
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }]);
  const [tutorInput, setTutorInput] = useState('');
  const [questionPhoto, setQuestionPhoto] = useState(null);
  const [tutorBusy, setTutorBusy] = useState(false);
  const [tutorError, setTutorError] = useState('');
  const [tutorBlockedUntil, setTutorBlockedUntil] = useState(() => {
    const stored = Number(localStorage.getItem(tutorBlockStorageKey));
    return stored > Date.now() ? stored : 0;
  });
  const [tutorSessionId, setTutorSessionId] = useState(() => {
    const existing = localStorage.getItem(tutorSessionStorageKey);
    if (existing) return existing;
    const newId = window.crypto?.randomUUID ? window.crypto.randomUUID() : `student-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(tutorSessionStorageKey, newId);
    return newId;
  });
  const [clockNow, setClockNow] = useState(Date.now());
  const [paperSession, setPaperSession] = useState('2026-27');
  const [paperCatalog, setPaperCatalog] = useState([]);
  const [paperSubject, setPaperSubject] = useState('');
  const [paperLoading, setPaperLoading] = useState(false);
  const [paperReload, setPaperReload] = useState(0);
  const [paperError, setPaperError] = useState('');
  const [paperTextData, setPaperTextData] = useState(null);
  const [practiceStage, setPracticeStage] = useState('subjects');
  const [paperTimerOn, setPaperTimerOn] = useState(false);
  const [paperSeconds, setPaperSeconds] = useState(3 * 60 * 60);
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [visibleSolutions, setVisibleSolutions] = useState({});
  const [practiceSelections, setPracticeSelections] = useState({});
  const [practiceChecked, setPracticeChecked] = useState(false);
  const tutorMessagesRef = React.useRef(null);
  const [announcementFilter, setAnnouncementFilter] = useState('All');
  const [searchAnnouncement, setSearchAnnouncement] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('studentSidebarCollapsed') === 'true'
  );
  const [studyTasks, setStudyTasks] = useState(() => {
    try {
      const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
      return JSON.parse(localStorage.getItem(`studentStudyTasks:${authUser.username || 'student'}`) || '[]');
    } catch (error) {
      return [];
    }
  });
  const [studyTaskTitle, setStudyTaskTitle] = useState('');
  const [studyTaskSubject, setStudyTaskSubject] = useState('');
  const [studyTaskDate, setStudyTaskDate] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    localStorage.setItem('studentSidebarCollapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    try {
      const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
      localStorage.setItem(`studentStudyTasks:${authUser.username || 'student'}`, JSON.stringify(studyTasks));
    } catch (error) {
      console.warn('Study planner could not be saved in this browser.', error);
    }
  }, [studyTasks]);

  useEffect(() => {
    if (!tutorBlockedUntil) return undefined;
    const timer = window.setInterval(() => setClockNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [tutorBlockedUntil]);

  useEffect(() => {
    if (tutorBlockedUntil && clockNow >= tutorBlockedUntil) {
      localStorage.removeItem(tutorBlockStorageKey);
      setTutorBlockedUntil(0);
      setTutorMessages([{
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: 'Your safety break is over. Ask a school-subject question respectfully. I will explain what it means first, then guide you with a hint.',
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [clockNow, tutorBlockedUntil, tutorBlockStorageKey]);

  // Bind directly to real database fields via secure backend API
  useEffect(() => {
    async function loadRealStudentData() {
      try {
        setLoadingDb(true);
        const token = localStorage.getItem('adminToken');
        const res = await fetchStudentPortalData(token);
        if (res && res.ok && res.student) {
          const s = res.student;
          setStudentData({
            name: s.legalName || s.name || defaultStudent.name,
            admissionNo: s.admissionNo || defaultStudent.admissionNo,
            rollNo: s.rollNo || defaultStudent.rollNo,
            classGrade: s.grade || s.classGrade || defaultStudent.classGrade,
            academicSession: s.academicSession || defaultStudent.academicSession,
            dob: s.dob || defaultStudent.dob,
            gender: s.gender || defaultStudent.gender,
            bloodGroup: s.bloodGroup || defaultStudent.bloodGroup,
            house: s.house || defaultStudent.house,
            busRoute: s.busRoute || defaultStudent.busRoute,
            lockerNo: s.lockerNo || defaultStudent.lockerNo,
            aadhaarMasked: s.aadhaarMasked || defaultStudent.aadhaarMasked,
            fatherName: s.fatherName || defaultStudent.fatherName,
            fatherOccupation: s.fatherOccupation || defaultStudent.fatherOccupation,
            motherName: s.motherName || defaultStudent.motherName,
            motherOccupation: s.motherOccupation || defaultStudent.motherOccupation,
            primaryPhone: s.primaryPhone || defaultStudent.primaryPhone,
            emergencyContact: s.emergencyContact || defaultStudent.emergencyContact,
            address: s.address || defaultStudent.address,
            avatarInitials: (s.legalName || defaultStudent.name).split(' ').map(n => n[0]).slice(0, 2).join('')
          });
          if (s.attendanceMetrics) {
            setAttendanceMetrics(s.attendanceMetrics);
          }
        }
      } catch (err) {
        console.warn('Real student DB binding fallback to local store:', err);
      } finally {
        setLoadingDb(false);
      }
    }
    loadRealStudentData();
  }, []);

  // Live digital clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('authUser');
    history.push('/login?role=student');
  };

  const downloadCsvFile = (filename, headers, rows) => {
    const quote = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const csv = [headers.map(quote).join(','), ...rows.map(row => row.map(quote).join(','))].join('\r\n');
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportTimetable = () => {
    const rows = Object.entries(initialSchedule).flatMap(([day, periods]) =>
      periods.map(period => [day, period.period, period.time, period.subject, period.room, period.teacher, period.topic])
    );
    downloadCsvFile('LBMDPS_Weekly_Timetable.csv', ['Day', 'Period', 'Time', 'Subject', 'Room', 'Teacher', 'Topic'], rows);
  };

  const handleExportAssignments = () => {
    const rows = assignments.map(item => [item.subject, item.title, item.assignedDate, item.dueDate, item.status, item.teacher, item.points]);
    downloadCsvFile('LBMDPS_My_Assignments.csv', ['Subject', 'Assignment', 'Assigned Date', 'Due Date', 'Status', 'Teacher', 'Points'], rows);
  };

  // Submit Homework Handler with backend API integration
  const handleOpenSubmitModal = (item) => {
    setSubmittingAssignment(item);
    setSubmissionText('');
    setSubmissionFileName('');
  };

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    if (!submittingAssignment) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await submitHomeworkSolution(
        submittingAssignment.id,
        {
          submissionNote: submissionText,
          fileName: submissionFileName || 'Student_Homework_Solution.pdf',
          studentAdmissionNo: studentData.admissionNo
        },
        token
      );
    } catch (err) {
      console.warn('Backend homework submission saved locally:', err);
    }

    setAssignments((prev) =>
      prev.map((item) =>
        item.id === submittingAssignment.id
          ? {
              ...item,
              status: 'Submitted',
              submittedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              submissionNote: submissionText,
              uploadedDoc: submissionFileName || 'Student_Homework_Solution.pdf'
            }
          : item
      )
    );
    setSubmittingAssignment(null);
    alert(`Success! Homework for "${submittingAssignment.subject}" has been digitally submitted to ${submittingAssignment.teacher}.`);
  };

  const startTutorSafetyBlock = (blockedUntil = Date.now() + 5 * 60 * 1000) => {
    const deadline = Math.max(Date.now() + 1000, Number(blockedUntil));
    localStorage.setItem(tutorBlockStorageKey, String(deadline));
    setTutorBlockedUntil(deadline);
    setClockNow(Date.now());
    setTutorInput('');
    setQuestionPhoto(null);
    setTutorError('');
    setTutorMessages(prev => [...prev, {
      id: `safety-${Date.now()}`,
      role: 'system',
      text: 'This chat has ended for a short safety break. You can start a fresh question when Study Coach unlocks.',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }]);
    const freshSessionId = window.crypto?.randomUUID ? window.crypto.randomUUID() : `student-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(tutorSessionStorageKey, freshSessionId);
    setTutorSessionId(freshSessionId);
  };

  const handleQuestionPhoto = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) {
      setTutorError('Choose a JPG, PNG, or WebP image under 8 MB.');
      return;
    }
    try {
      const sourceData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Could not read this image.'));
        reader.readAsDataURL(file);
      });
      const image = new window.Image();
      image.src = sourceData;
      await image.decode();
      const scale = Math.min(1, 1400 / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      if (!context) throw new Error('This browser could not prepare the photo.');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.78);
      if (dataUrl.length > 1_900_000) throw new Error('This photo is still too large. Please crop it and try again.');
      setQuestionPhoto({ name: file.name, dataUrl });
      setTutorError('');
    } catch (error) {
      setTutorError(error.message || 'Could not prepare the question photo.');
    }
  };

  const handleTutorSubmit = async (event) => {
    event.preventDefault();
    if (tutorBusy || tutorBlockedUntil > Date.now()) return;
    const question = tutorInput.trim();
    if (!question && !questionPhoto) return;
    if (containsInappropriateLanguage(question)) {
      const endedSessionId = tutorSessionId;
      startTutorSafetyBlock();
      sendStudentTutorQuestion({ message: question, sessionId: endedSessionId }, localStorage.getItem('adminToken'))
        .catch(() => {}); // Keep the local safety lock even if the server is temporarily unreachable.
      return;
    }

    const photo = questionPhoto;
    setTutorMessages(prev => [...prev, {
      id: `student-${Date.now()}`,
      role: 'student',
      text: question,
      imageData: photo?.dataUrl,
      imageName: photo?.name,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }]);
    setTutorInput('');
    setQuestionPhoto(null);
    setTutorError('');
    setTutorBusy(true);
    try {
      const result = await sendStudentTutorQuestion({
        message: question,
        imageData: photo?.dataUrl,
        sessionId: tutorSessionId
      }, localStorage.getItem('adminToken'));
      if (result.sessionId && result.sessionId !== tutorSessionId) {
        localStorage.setItem(tutorSessionStorageKey, result.sessionId);
        setTutorSessionId(result.sessionId);
      }
      setTutorMessages(prev => [...prev, {
        id: `coach-${Date.now()}`,
        role: 'assistant',
        text: result.reply,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      if (error.payload?.blocked) {
        const deadline = error.payload.lockUntil ? new Date(error.payload.lockUntil).getTime() : Date.now() + 5 * 60 * 1000;
        startTutorSafetyBlock(deadline);
      } else {
        setTutorInput(question);
        if (photo) setQuestionPhoto(photo);
        setTutorError(error.message === 'Failed to fetch'
          ? 'Study Coach could not reach the school server. Check that the server is running, then try again.'
          : error.message || 'Study Coach could not answer right now. Please try again.');
      }
    } finally {
      setTutorBusy(false);
    }
  };

  const remainingTutorSeconds = Math.max(0, Math.ceil((tutorBlockedUntil - clockNow) / 1000));
  const selectedOfficialPaper = paperCatalog.find(paper => paper.subject === paperSubject);
  const practiceCheckableCount = (paperTextData?.questions || []).filter(question => question.options?.length === 4 && paperTextData.answerKey?.[question.number]).length;
  const practiceCorrectCount = (paperTextData?.questions || []).filter(question => question.options?.length === 4 && paperTextData.answerKey?.[question.number] && practiceSelections[question.number] === paperTextData.answerKey[question.number]).length;
  const paperGrade = (studentData.classGrade.match(/\d+/) || ['10'])[0];

  const printWeeklyTimetable = () => {
    const printWindow = window.open('', '_blank', 'width=1200,height=850');
    if (!printWindow) {
      window.alert('Please allow pop-ups for this site to preview and print the timetable.');
      return;
    }

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
    const days = Object.keys(initialSchedule);
    const periodOrder = ['1', '2', '3', '4', 'Break', '5', '6', '7', 'Dismissal'];
    const periodLabel = (period) => period === 'Break' || period === 'Dismissal' ? period : `Period ${period}`;
    const scheduleRows = periodOrder.map((period) => {
      const firstEntry = days.map((day) => initialSchedule[day].find((item) => String(item.period) === period)).find(Boolean);
      const cells = days.map((day) => {
        const item = initialSchedule[day].find((entry) => String(entry.period) === period);
        if (!item) return '<td class="empty-cell">—</td>';
        return `<td class="${typeof item.period === 'number' ? '' : 'break-cell'}">
          <strong>${escapeHtml(item.subject)}</strong>
          <span>${escapeHtml(item.time)}</span>
          <small>${escapeHtml(item.room)} · ${escapeHtml(item.teacher)}</small>
        </td>`;
      }).join('');
      return `<tr><th scope="row">${periodLabel(period)}<span>${escapeHtml(firstEntry?.time || '')}</span></th>${cells}</tr>`;
    }).join('');

    printWindow.document.open();
    printWindow.document.write(`<!doctype html>
      <html><head><meta charset="utf-8"><title>Weekly Class Timetable</title>
      <style>
        @page { size: A4 landscape; margin: 7mm; }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; color: #172235; font-family: Arial, sans-serif; }
        body { font-size: 7pt; }
        .heading { display: flex; align-items: center; gap: 10px; border-bottom: 2px solid #087eb7; padding-bottom: 6px; margin-bottom: 7px; }
        .heading img { width: 42px; height: 42px; object-fit: contain; }
        .affiliation { color: #087eb7; font-size: 6.5pt; font-weight: bold; letter-spacing: .7px; margin-bottom: 2px; }
        h1 { font-size: 13pt; margin: 0 0 2px; }
        h2 { display: inline; font-size: 9pt; margin: 0 8px 0 0; }
        .meta { color: #52647b; font-size: 7pt; }
        table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        col.period { width: 9%; } col.day { width: 15.166%; }
        thead th { padding: 5px 3px; color: #fff; background: #123047; border: 1px solid #123047; font-size: 7pt; }
        tbody th, td { border: 1px solid #cbd5e1; padding: 4px 4px; vertical-align: top; }
        tbody th { background: #eaf3f8; text-align: left; font-size: 7pt; }
        tbody th span, td span, td small { display: block; margin-top: 2px; color: #52647b; font-size: 6pt; font-weight: normal; }
        td strong { display: block; font-size: 6.5pt; line-height: 1.15; }
        td small { line-height: 1.15; }
        .break-cell { background: #f3f6f8; }
        .empty-cell { color: #94a3b8; text-align: center; vertical-align: middle; }
        footer { margin-top: 5px; padding-top: 4px; border-top: 1px solid #cbd5e1; color: #64748b; font-size: 6pt; }
        tr { break-inside: avoid; page-break-inside: avoid; }
      </style></head><body>
      <header class="heading"><img src="${escapeHtml(logo)}" alt="School crest"><div>
        <div class="affiliation">CBSE AFFILIATED #3430398 · UDISE: 20060105502</div>
        <h1>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>
        <h2>Weekly Class Timetable</h2><span class="meta">${escapeHtml(studentData.classGrade)} · Academic Session ${escapeHtml(studentData.academicSession || '2026–2027')}</span>
      </div></header>
      <table><colgroup><col class="period">${days.map(() => '<col class="day">').join('')}</colgroup>
        <thead><tr><th>PERIOD</th>${days.map((day) => `<th>${escapeHtml(day.toUpperCase())}</th>`).join('')}</tr></thead>
        <tbody>${scheduleRows}</tbody>
      </table><footer>Student copy · Please follow the latest school notice for timetable changes.</footer>
      </body></html>`);
    printWindow.document.close();
    printWindow.addEventListener('afterprint', () => printWindow.close(), { once: true });
    printWindow.addEventListener('load', () => {
      printWindow.focus();
      printWindow.print();
    }, { once: true });
  };
  const questionAnswersStorageKey = 'cbseQuestionAnswers:' + paperGrade + ':' + paperSession + ':' + paperSubject;

  useEffect(() => {
    if (activeTab !== 'papers' && activeTab !== 'practice') return undefined;
    let cancelled = false;
    setPaperLoading(true);
    setPaperError('');
    fetch('/api/student/official-papers/catalog?session=' + encodeURIComponent(paperSession) + '&grade=' + encodeURIComponent(paperGrade), {
      headers: localStorage.getItem('adminToken') ? { Authorization: 'Bearer ' + localStorage.getItem('adminToken') } : {}
    }).then(async response => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not load CBSE papers.');
      if (!cancelled) {
        setPaperCatalog(data.papers || []);
        setPaperSubject(current => (data.papers || []).some(item => item.subject === current) ? current : (data.papers || [])[0]?.subject || '');
      }
    }).catch(error => { if (!cancelled) { setPaperCatalog([]); setPaperError(error.message); } })
      .finally(() => { if (!cancelled) setPaperLoading(false); });
    return () => { cancelled = true; };
  }, [activeTab, paperSession, paperReload, paperGrade]);

  useEffect(() => {
    if (!selectedOfficialPaper) { setPaperTextData(null); return undefined; }
    let cancelled = false;
    setPaperLoading(true);
    setPaperError('');
    setPaperTextData(null);
    fetch('/api/student/official-papers/view?session=' + encodeURIComponent(paperSession) + '&grade=' + encodeURIComponent(paperGrade) + '&subject=' + encodeURIComponent(paperSubject), {
      headers: localStorage.getItem('adminToken') ? { Authorization: 'Bearer ' + localStorage.getItem('adminToken') } : {}
    }).then(async response => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not extract questions from this paper.');
      if (!cancelled) {
        setPaperTextData(data);
        if (data.durationMinutes) setPaperSeconds(data.durationMinutes * 60);
      }
    }).catch(error => { if (!cancelled) { setPaperTextData(null); setPaperError(error.message); } })
      .finally(() => { if (!cancelled) setPaperLoading(false); });
    return () => { cancelled = true; };
  }, [paperSession, paperSubject, paperGrade, selectedOfficialPaper, paperReload]);

  useEffect(() => {
    setPracticeSelections({});
    setPracticeChecked(false);
    setVisibleSolutions({});
    try { setQuestionAnswers(JSON.parse(localStorage.getItem(questionAnswersStorageKey) || '{}')); } catch (error) { setQuestionAnswers({}); }
  }, [questionAnswersStorageKey]);

  useEffect(() => {
    if (!paperTimerOn) return undefined;
    const timer = window.setInterval(() => setPaperSeconds(value => {
      if (value <= 1) { setPaperTimerOn(false); return 0; }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [paperTimerOn]);

  useEffect(() => {
    if (activeTab !== 'tutor') return;
    const messagePanel = tutorMessagesRef.current;
    if (messagePanel) messagePanel.scrollTo({ top: messagePanel.scrollHeight, behavior: 'smooth' });
  }, [activeTab, tutorMessages, tutorBusy]);

  const filteredAssignments = assignments.filter((a) => {
    if (assignmentFilter === 'All') return true;
    return a.status === assignmentFilter;
  });

  const filteredAnnouncements = initialAnnouncements.filter((item) => {
    const matchesCategory = announcementFilter === 'All' || item.category === announcementFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchAnnouncement.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchAnnouncement.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'Pending').length;
  const openStudyTasksCount = studyTasks.filter(task => !task.done).length;
  const overviewTodayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const overviewDateLabel = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const overviewDayClasses = (initialSchedule[overviewTodayName] || []).filter(period => period.subject !== 'Recess & Lunch Break');

  const handleAddStudyTask = (e) => {
    e.preventDefault();
    const title = studyTaskTitle.trim();
    if (!title) return;
    setStudyTasks(prev => [{
      id: `${Date.now()}`,
      title,
      subject: studyTaskSubject.trim() || 'General study',
      dueDate: studyTaskDate,
      done: false,
      createdAt: new Date().toISOString()
    }, ...prev]);
    setStudyTaskTitle('');
    setStudyTaskSubject('');
    setStudyTaskDate('');
  };

  return (
    <div className={`student-portal-wrapper ${sidebarCollapsed ? 'student-sidebar-collapsed' : ''} ${isDemoMode ? 'student-demo-mode' : ''}`}>
      <RoleSwitcher />

      {/* Top Banner for Demo mode */}
      {isDemoMode && (
        <div className="student-demo-banner">
          <div className="demo-banner-content">
            <span className="demo-live-badge">DEMO PREVIEW</span>
            <span>You are exploring the <strong>LBMDPS Student Academic Portal</strong> in interactive test mode.</span>
          </div>
          <Link to="/login?role=student" className="demo-signin-btn">
            Sign In with Student ID →
          </Link>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="student-top-navbar">
        <div className="student-nav-left">
          <button
            className="student-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle student navigation sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link to="/" className="student-brand-title">
            <img src={logo} alt="LBMDPS Logo" className="student-school-crest" />
            <div>
              <h3>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h3>
              <p>CBSE Affiliated #3430398 • UDISE: 20060105502 • Student Academic Portal</p>
            </div>
          </Link>
        </div>

        <div className="student-nav-right">
          <div className="student-session-pill">
            <span className="session-dot"></span>
            <span>{loadingDb ? 'Syncing DB...' : 'Session 2026–2027'}</span>
            <span className="live-clock">{currentTime}</span>
          </div>

          <Link to="/parent/dashboard" className="switch-portal-btn" title="View Parent Hub">
            <FaUsers aria-hidden="true" /> Parent Portal
          </Link>

          <Link to="/" className="switch-portal-btn website-btn" title="Visit Public School Website">
            <FaGlobe aria-hidden="true" /> School Website
          </Link>

          <div className="student-user-pill" onClick={() => setActiveTab('profile')}>
            <div className="student-avatar-circle">{studentData.avatarInitials}</div>
            <div className="student-user-meta">
              <span className="student-name-text">{studentData.name}</span>
              <span className="student-roll-text">{studentData.classGrade} • Roll #{studentData.rollNo}</span>
            </div>
          </div>

          <button className="student-logout-btn" onClick={handleLogout} title="Log Out">
            <FaSignOutAlt aria-hidden="true" /> Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="student-dashboard-body">
        {/* Left Sidebar Navigation */}
        {mobileMenuOpen && <button type="button" className="student-sidebar-scrim" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation" />}
        <aside className={`student-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          <button
            className="student-sidebar-toggle"
            type="button"
            onClick={() => setSidebarCollapsed(value => !value)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!sidebarCollapsed}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
          <div className="student-profile-mini-card">
            <div className="mini-avatar">{studentData.avatarInitials}</div>
            <h4>{studentData.name}</h4>
            <span className="badge-class">{studentData.classGrade}</span>
            <span className="badge-id">Adm: {studentData.admissionNo}</span>
          </div>

          <nav className="student-sidebar-nav">
            <button
              title="Overview"
              className={`student-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaChartLine /></span>
              <span className="nav-title">Overview</span>
            </button>

            <button
              title="Class Schedule"
              className={`student-nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => { setActiveTab('schedule'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaCalendarAlt /></span>
              <span className="nav-title">Class Schedule</span>
              <span className="pill-counter">Mon–Sat</span>
            </button>

            <button
              title="Assignments"
              className={`student-nav-item ${activeTab === 'assignments' ? 'active' : ''}`}
              onClick={() => { setActiveTab('assignments'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaClipboardList /></span>
              <span className="nav-title">Assignments</span>
              {pendingAssignmentsCount > 0 && (
                <span className="pill-counter alert-count">{pendingAssignmentsCount} Due</span>
              )}
            </button>

            <button
              title="Grades and Reports"
              className={`student-nav-item ${activeTab === 'grades' ? 'active' : ''}`}
              onClick={() => { setActiveTab('grades'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaTrophy /></span>
              <span className="nav-title">Grades & Reports</span>
              <span className="pill-counter success-pill">{attendanceMetrics.attendanceRate}%</span>
            </button>

            <button
              title="Announcements"
              className={`student-nav-item ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => { setActiveTab('announcements'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaBullhorn /></span>
              <span className="nav-title">Announcements</span>
            </button>

            <button
              title="Study Coach"
              className={`student-nav-item ${activeTab === 'tutor' ? 'active' : ''}`}
              onClick={() => { setActiveTab('tutor'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaRobot /></span>
              <span className="nav-title">Study Coach</span>
            </button>

            <button
              title="Question Bank and Practice Papers"
              className={`student-nav-item ${activeTab === 'papers' ? 'active' : ''}`}
              onClick={() => { setActiveTab('papers'); setPaperTimerOn(false); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaFileAlt /></span>
              <span className="nav-title">CBSE Question Bank</span>
            </button>

            <button
              title="Practice CBSE papers by subject"
              className={`student-nav-item ${activeTab === 'practice' ? 'active' : ''}`}
              onClick={() => { setActiveTab('practice'); setPracticeStage('subjects'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaClipboardCheck /></span>
              <span className="nav-title">Practice</span>
              {paperCatalog.length > 0 && <span className="pill-counter success-pill">{paperCatalog.length}</span>}
            </button>

            <button
              title="My Profile and ID"
              className={`student-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaUser /></span>
              <span className="nav-title">My Profile & ID</span>
            </button>
            <button
              title="My Study Planner"
              className={`student-nav-item ${activeTab === 'studyplan' ? 'active' : ''}`}
              onClick={() => { setActiveTab('studyplan'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon"><FaBookOpen /></span>
              <span className="nav-title">My Study Planner</span>
              {openStudyTasksCount > 0 && <span className="pill-counter">{openStudyTasksCount}</span>}
            </button>
          </nav>

          <div className="student-sidebar-footer">
            <div className="student-sidebar-tools">
              <span className="student-sidebar-tools-label">ACADEMIC TOOLS</span>
              <button type="button" className="student-tool-action" onClick={handleExportTimetable} title="Download weekly timetable as CSV">
                <FaDownload /><span>Export Timetable</span>
              </button>
              <button type="button" className="student-tool-action" onClick={handleExportAssignments} title="Download assignment list as CSV">
                <FaFileAlt /><span>Export Assignments</span>
              </button>
            </div>
            <div className="quick-help-box">
              <span className="help-icon"><FaComments /></span>
              <div>
                <strong>Need Help?</strong>
                <p>Contact Academic Desk: +91 94313 78901</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="student-main-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane-container fade-in overview-dashboard">
              <div className="overview-page-heading"><div><span>STUDENT OVERVIEW</span><h1>Your learning snapshot</h1><p>A quick look at today’s classes, progress and assignments.</p></div><div className="overview-date-chip"><FaCalendarAlt /> {overviewDateLabel}</div></div>
              <div className="welcome-banner-card">
                <div className="banner-text">
                  <span className="greeting-badge"><span className="live-status-dot" /> Your student portal is up to date</span>
                  <h2>Good to see you, {studentData.name.split(' ')[0]}</h2>
                  <p>
                    {studentData.classGrade} · Roll #{studentData.rollNo} · Admission #{studentData.admissionNo}. Keep building steady study habits and stay on top of your schoolwork.
                  </p>
                  <div className="overview-hero-actions"><button type="button" onClick={() => setActiveTab('practice')}><FaClipboardCheck /> Start practice</button><button type="button" onClick={() => setActiveTab('assignments')}><FaTasks /> My assignments <FaAngleRight /></button></div>
                </div>
                <div className="banner-stats-row">
                  <div className="mini-stat-badge">
                    <span className="stat-label">Term 1 Rank</span>
                    <strong>#1 in Class</strong>
                  </div>
                  <div className="mini-stat-badge highlight">
                    <span className="stat-label">Live Attendance</span>
                    <strong>{attendanceMetrics.attendanceRate}%</strong>
                  </div>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="student-kpi-grid">
                <div className="kpi-card attendance-kpi">
                  <div className="kpi-icon-wrap"><FaChartLine /></div>
                  <div className="kpi-info">
                    <span className="kpi-caption">Real-Time Attendance</span>
                    <h3>{attendanceMetrics.attendanceRate}%</h3>
                    <span className="kpi-subtext">{attendanceMetrics.presentDays} / {attendanceMetrics.totalDays} Days Logged</span>
                  </div>
                </div>

                <div className="kpi-card grades-kpi">
                  <div className="kpi-icon-wrap"><FaStar /></div>
                  <div className="kpi-info">
                    <span className="kpi-caption">Term 1 Performance</span>
                    <h3>94.2% (A1)</h3>
                    <span className="kpi-subtext">Total 565/600 Marks</span>
                  </div>
                </div>

                <div className="kpi-card homework-kpi">
                  <div className="kpi-icon-wrap"><FaClipboardCheck /></div>
                  <div className="kpi-info">
                    <span className="kpi-caption">Active Homework</span>
                    <h3>{pendingAssignmentsCount} Pending</h3>
                    <span className="kpi-subtext">Math & Science Due Soon</span>
                  </div>
                </div>

                <div className="kpi-card today-kpi">
                  <div className="kpi-icon-wrap"><FaRegClock /></div>
                  <div className="kpi-info">
                    <span className="kpi-caption">Today's Schedule</span>
                    <h3>{overviewDayClasses.length} Periods</h3>
                    <span className="kpi-subtext">Next: {overviewDayClasses[0]?.subject || 'No classes today'}</span>
                  </div>
                </div>
              </div>

              {/* Two Column Section */}
              <div className="student-overview-columns">
                {/* Left: Today's Classes */}
                <div className="overview-card">
                  <div className="card-header-row">
                    <h3><FaClock /> Today’s classes <span className="overview-card-day">{overviewTodayName}</span></h3>
                    <button className="view-link-btn" onClick={() => setActiveTab('schedule')}>
                      Full Weekly Schedule →
                    </button>
                  </div>
                  <div className="timetable-timeline">
                    {overviewDayClasses.slice(0, 4).map((p, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-time">{p.time}</div>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <div className="period-title-row">
                            <strong>{p.subject}</strong>
                            <span className="room-pill">{p.room}</span>
                          </div>
                          <p className="period-topic">Topic: {p.topic}</p>
                          <span className="period-teacher">Faculty: {p.teacher}</span>
                        </div>
                      </div>
                    ))}
                    {!overviewDayClasses.length && <div className="overview-empty-state"><FaCalendarAlt /><span>No classes are scheduled for today.</span></div>}
                  </div>
                </div>

                {/* Right: Urgent Deadlines & Notices */}
                <div className="overview-card">
                  <div className="card-header-row">
                    <h3><FaRegClock /> Upcoming Assignment Deadlines</h3>
                    <button className="view-link-btn" onClick={() => setActiveTab('assignments')}>
                      View All ({assignments.length}) →
                    </button>
                  </div>

                  <div className="urgent-assignments-list">
                    {assignments.filter(a => a.status === 'Pending').slice(0, 3).map((item) => (
                      <div key={item.id} className="urgent-asg-card">
                        <div className="asg-meta-row">
                          <span className="asg-subject-pill">{item.subject}</span>
                          <span className="asg-due-pill">Due: {item.dueDate}</span>
                        </div>
                        <h4 className="asg-title">{item.title}</h4>
                        <p className="asg-desc-clamp">{item.description}</p>
                        <div className="asg-footer-row">
                          <span className="asg-teacher">By {item.teacher}</span>
                          <button
                            className="btn-submit-quick"
                            onClick={() => handleOpenSubmitModal(item)}
                          >
                            <FaPaperPlane /> Submit answer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="notice-highlight-box">
                    <div className="notice-icon"><FaBullhorn /></div>
                    <div>
                      <strong>Pre-Board Examination Series 1 Date Sheet</strong>
                      <p>Commencing 23rd Nov 2026. Review syllabus in the announcements tab.</p>
                      <button className="read-more-text" onClick={() => setActiveTab('announcements')}>Read circular →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLASS SCHEDULE / TIMETABLE */}
          {activeTab === 'schedule' && (
            <div className="tab-pane-container fade-in">
              <div className="page-section-header">
                <div>
                  <h2>Class Schedule & Timetable (Class 10-A)</h2>
                  <p>Weekly curriculum period breakdown • Academic Session 2026–2027</p>
                </div>
                <button
                  className="action-btn secondary"
                  onClick={printWeeklyTimetable}
                  title="Print Timetable"
                >
                  <FaPrint aria-hidden="true" /> Print Timetable
                </button>
              </div>

              {/* Day Selector Buttons */}
              <div className="day-selector-tabs">
                {Object.keys(initialSchedule).map((day) => (
                  <button
                    key={day}
                    className={`day-tab-btn ${selectedDay === day ? 'active' : ''}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Day Period Cards */}
              <div className="periods-schedule-grid">
                {initialSchedule[selectedDay]?.map((period, index) => (
                  <div
                    key={index}
                    className={`period-card ${period.period === 'Break' || period.period === 'Dismissal' ? 'break-period' : ''}`}
                  >
                    <div className="period-number-badge">
                      {typeof period.period === 'number' ? `Period ${period.period}` : period.period}
                    </div>
                    <div className="period-main-info">
                      <div className="period-time-badge"><FaRegClock /> {period.time}</div>
                      <h3 className="period-subject">{period.subject}</h3>
                      <p className="period-topic-text">
                        <strong>Topic:</strong> {period.topic}
                      </p>
                      <div className="period-tags-row">
                        <span className="tag-room">📍 {period.room}</span>
                        <span className="tag-teacher">👨‍🏫 {period.teacher}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: ASSIGNMENTS & HOMEWORK */}
          {activeTab === 'assignments' && (
            <div className="tab-pane-container fade-in">
              <div className="page-section-header">
                <div>
                  <h2>Assignments & Homework Tracker</h2>
                  <p>Submit homework solutions, track teacher evaluations, and access reference notes.</p>
                </div>
                <div className="filter-pill-group">
                  {['All', 'Pending', 'Submitted', 'Evaluated'].map((filter) => (
                    <button
                      key={filter}
                      className={`filter-btn ${assignmentFilter === filter ? 'active' : ''}`}
                      onClick={() => setAssignmentFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="assignments-table-container">
                {filteredAssignments.length === 0 ? (
                  <div className="empty-state-card">
                    <p>No assignments found under the "{assignmentFilter}" filter.</p>
                  </div>
                ) : (
                  <div className="assignments-cards-grid">
                    {filteredAssignments.map((asg) => (
                      <div key={asg.id} className={`asg-full-card status-${asg.status.toLowerCase()}`}>
                        <div className="asg-card-top">
                          <span className="asg-subject-pill">{asg.subject}</span>
                          <span className={`status-badge-pill ${asg.status.toLowerCase()}`}>
                            {asg.status}
                          </span>
                        </div>

                        <h3 className="asg-card-title">{asg.title}</h3>
                        <p className="asg-card-desc">{asg.description}</p>

                        <div className="asg-info-metadata">
                          <div>
                            <span className="meta-lbl">Assigned Date:</span>
                            <strong>{asg.assignedDate}</strong>
                          </div>
                          <div>
                            <span className="meta-lbl">Submission Due:</span>
                            <strong className="text-danger">{asg.dueDate}</strong>
                          </div>
                          <div>
                            <span className="meta-lbl">Mentor:</span>
                            <strong>{asg.teacher}</strong>
                          </div>
                          <div>
                            <span className="meta-lbl">Max Points:</span>
                            <strong>{asg.points}</strong>
                          </div>
                        </div>

                        {asg.attachmentName && (
                          <div className="asg-attachment-box">
                            <span className="file-icon">📎</span>
                            <span className="file-name">{asg.attachmentName}</span>
                            <button
                              className="btn-download-file"
                              onClick={() => alert(`Downloading study resource: ${asg.attachmentName}`)}
                            >
                              Download
                            </button>
                          </div>
                        )}

                        {asg.status === 'Evaluated' && (
                          <div className="evaluation-feedback-box">
                            <div className="eval-score">
                              <span>Marks Awarded:</span>
                              <strong>{asg.score}</strong>
                            </div>
                            <p className="eval-remarks"><strong>Teacher Remarks:</strong> {asg.remarks}</p>
                          </div>
                        )}

                        {asg.status === 'Submitted' && (
                          <div className="submitted-confirmation-box">
                            <span>✅ Submitted on {asg.submittedOn}</span>
                            <p>Solution under evaluation by {asg.teacher}.</p>
                          </div>
                        )}

                        {asg.status === 'Pending' && (
                          <div className="asg-card-actions">
                            <button
                              className="btn-submit-action"
                              onClick={() => handleOpenSubmitModal(asg)}
                            >
                              📤 Submit Solution Online
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'studyplan' && (
            <div className="tab-pane-container fade-in">
              <div className="page-section-header study-planner-heading">
                <div>
                  <span className="section-eyebrow">PERSONAL LEARNING</span>
                  <h2>My Study Planner</h2>
                  <p>Plan revision sessions and track your own study goals. Your list is saved in this browser.</p>
                </div>
                <div className="planner-summary"><FaTasks /><strong>{openStudyTasksCount}</strong><span>open tasks</span></div>
              </div>

              <form className="study-planner-form" onSubmit={handleAddStudyTask}>
                <label>
                  Study task
                  <input value={studyTaskTitle} onChange={e => setStudyTaskTitle(e.target.value)} placeholder="e.g. Revise quadratic equations" required maxLength={120} />
                </label>
                <label>
                  Subject
                  <input value={studyTaskSubject} onChange={e => setStudyTaskSubject(e.target.value)} placeholder="e.g. Mathematics" maxLength={60} />
                </label>
                <label>
                  Target date
                  <input type="date" value={studyTaskDate} onChange={e => setStudyTaskDate(e.target.value)} />
                </label>
                <button type="submit" className="planner-add-btn"><FaPlus /> Add task</button>
              </form>

              <section className="study-planner-list-card" aria-label="Study tasks">
                <div className="planner-list-header">
                  <div><h3>Study tasks</h3><p>Mark tasks complete as you finish them.</p></div>
                  <span>{studyTasks.length} total</span>
                </div>
                {studyTasks.length === 0 ? (
                  <div className="planner-empty-state">
                    <FaBookOpen />
                    <h3>Your planner is ready</h3>
                    <p>Add a topic or revision goal above to get started.</p>
                  </div>
                ) : (
                  <ul className="study-task-list">
                    {studyTasks.map(task => (
                      <li key={task.id} className={task.done ? 'study-task-done' : ''}>
                        <button type="button" className="study-task-check" onClick={() => setStudyTasks(prev => prev.map(item => item.id === task.id ? { ...item, done: !item.done } : item))} aria-label={task.done ? 'Mark task incomplete' : 'Mark task complete'}>
                          <FaCheck />
                        </button>
                        <div className="study-task-copy">
                          <strong>{task.title}</strong>
                          <span>{task.subject}{task.dueDate ? ` · Target ${new Date(`${task.dueDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}</span>
                        </div>
                        <button type="button" className="study-task-delete" onClick={() => setStudyTasks(prev => prev.filter(item => item.id !== task.id))} aria-label="Delete study task"><FaTrashAlt /></button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}

          {/* TAB 4: GRADES & REPORT CARD */}
          {activeTab === 'grades' && (
            <div className="tab-pane-container fade-in">
              <div className="page-section-header">
                <div>
                  <h2>Academic Grades & CBSE Report Card</h2>
                  <p>Term 1 Mid-Term Official Assessment • Central Board of Secondary Education Curriculum</p>
                </div>
                <button
                  className="action-btn primary"
                  onClick={() => setShowReportCardModal(true)}
                >
                  📜 View Official CBSE Report Card
                </button>
              </div>

              {/* Scorecard Hero Banner */}
              <div className="report-hero-card">
                <div className="hero-left">
                  <span className="cbse-tag">CBSE Affiliation #3430398 • UDISE: 20060105502</span>
                  <h3>{examReportData.term}</h3>
                  <p>Candidate: <strong>{examReportData.studentName}</strong> • Class: <strong>{examReportData.classGrade}</strong> • Roll #{examReportData.rollNo}</p>
                </div>
                <div className="hero-right">
                  <div className="hero-stat-pill">
                    <span className="lbl">Cumulative Total</span>
                    <strong className="val">{examReportData.overallTotal}</strong>
                  </div>
                  <div className="hero-stat-pill highlight">
                    <span className="lbl">Aggregate</span>
                    <strong className="val">{examReportData.percentage}</strong>
                  </div>
                  <div className="hero-stat-pill success">
                    <span className="lbl">Result</span>
                    <strong className="val">PASS (1st Div)</strong>
                  </div>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <div className="grades-table-card">
                <h3>Detailed Subject-Wise Score Breakdown</h3>
                <div className="table-responsive">
                  <table className="student-report-table">
                    <thead>
                      <tr>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Theory (80)</th>
                        <th>Internal / Lab (20)</th>
                        <th>Total Marks (100)</th>
                        <th>CBSE Grade</th>
                        <th>Teacher Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examReportData.subjects.map((sub) => (
                        <tr key={sub.code}>
                          <td><strong>#{sub.code}</strong></td>
                          <td><strong>{sub.name}</strong></td>
                          <td>{sub.theoryObt} / {sub.theoryMax}</td>
                          <td>{sub.intObt} / {sub.intMax}</td>
                          <td>
                            <span className="score-badge">{sub.total} / 100</span>
                          </td>
                          <td>
                            <span className={`grade-pill grade-${sub.grade.toLowerCase()}`}>{sub.grade}</span>
                          </td>
                          <td className="remarks-td">{sub.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Co-Scholastic and Teacher Remarks */}
              <div className="report-secondary-grid">
                <div className="co-scholastic-card">
                  <h4>Co-Scholastic & Behavioral Assessment (8-Point Scale)</h4>
                  <div className="skills-list">
                    {examReportData.coScholastic.map((item, idx) => (
                      <div key={idx} className="skill-item">
                        <span>{item.skill}</span>
                        <strong className="grade-badge">{item.grade}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="remarks-summary-card">
                  <h4>Institutional Feedback</h4>
                  <div className="feedback-item">
                    <span className="feedback-author">Class Teacher Remarks:</span>
                    <p>"{examReportData.classTeacherRemarks}"</p>
                  </div>
                  <div className="feedback-item">
                    <span className="feedback-author">Principal's Signature & Endorsement:</span>
                    <p>"{examReportData.principalRemark}"</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DAILY ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="tab-pane-container fade-in">
              <div className="page-section-header">
                <div>
                  <h2>Daily School Announcements & Circulars</h2>
                  <p>Official notices from Principal's Desk, Examination Cell & Sports Department</p>
                </div>
                <div className="announcement-search-box">
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchAnnouncement}
                    onChange={(e) => setSearchAnnouncement(e.target.value)}
                  />
                </div>
              </div>

              <div className="filter-pill-group announcement-cats">
                {['All', 'Examinations', 'Sports & Athletics', 'Holidays', 'Academic & STEM'].map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${announcementFilter === cat ? 'active' : ''}`}
                    onClick={() => setAnnouncementFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="announcements-cards-list">
                {filteredAnnouncements.map((ann) => (
                  <div key={ann.id} className="announcement-full-card">
                    <div className="ann-card-header">
                      <div className="ann-date-badge">
                        <span className="cal-icon"><FaCalendarAlt /></span>
                        <span>{ann.date}</span>
                      </div>
                      <div className="ann-badges-row">
                        <span className="ann-category-tag">{ann.category}</span>
                        <span className={`ann-priority-tag ${ann.priority}`}>{ann.badge}</span>
                      </div>
                    </div>

                    <h3 className="ann-title">{ann.title}</h3>
                    <p className="ann-content">{ann.content}</p>

                    <div className="ann-footer">
                      <span className="ann-author">Issued by: <strong>{ann.author}</strong></span>
                      <button
                        className="btn-download-circular"
                        onClick={() => alert(`Downloading Official Circular PDF: ${ann.title}`)}
                      >
                        📄 Download Circular PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="tab-pane-container fade-in">
              {practiceStage === 'subjects' ? <>
                <section className="cbse-archive-hero practice-page-hero"><div><span className="section-eyebrow">CBSE EXAM PRACTICE</span><h2>Practice every subject in your class</h2><p>Choose a subject to open its official CBSE paper as readable question text, then solve it in exam mode.</p></div><div className="cbse-archive-count"><FaClipboardCheck /><strong>{paperCatalog.length || '—'}</strong><span>class subjects</span></div></section>
                <section className="cbse-practice-subjects"><div className="cbse-practice-heading"><div><h3>{studentData.classGrade} · All available subjects</h3><p>Choose any subject to begin a real CBSE paper. Your draft is saved in this browser.</p></div><label>Academic session<select value={paperSession} onChange={event=>{setPaperSession(event.target.value);setPaperSubject('');setPaperTimerOn(false);setPaperSeconds(3*60*60);}}><option value="2016_17">2016–17</option><option value="2017_18">2017–18</option><option value="2018_19">2018–19</option><option value="2019_20">2019–20</option><option value="2020-21">2020–21</option><option value="2021-22">2021–22</option><option value="2022-23">2022–23</option><option value="2023-24">2023–24</option><option value="2024-25">2024–25</option><option value="2025-26">2025–26</option><option value="2026-27">2026–27</option></select></label></div>
                {paperLoading&&!paperCatalog.length&&<div className="cbse-paper-loading" role="status">Loading CBSE subjects for your class…</div>}{paperError&&<div className="cbse-paper-error" role="alert"><FaInfoCircle />{paperError}<button type="button" onClick={()=>setPaperReload(value=>value+1)}>Retry</button></div>}
                {!paperLoading&&!paperError&&paperCatalog.length>0&&<div className="cbse-subject-grid">{paperCatalog.map((paper,index)=><article className="cbse-subject-card" key={paper.subject}><span className="cbse-subject-number">{String(index+1).padStart(2,'0')}</span><span className="cbse-subject-icon"><FaFileAlt /></span><div><small>CBSE · {studentData.classGrade}</small><h4>{paper.subject}</h4><p>Official sample paper · {paperSession.replace('_','–').replace('-','–')}</p></div><button type="button" onClick={()=>{setPaperSubject(paper.subject);setPaperTimerOn(false);setPracticeStage('exam');}}>Practice now <FaAngleRight /></button></article>)}</div>}
                {!paperLoading&&!paperError&&!paperCatalog.length&&<div className="cbse-paper-loading">No official CBSE papers are listed for this class and session.</div>}
                </section>
              </> : <>
                <section className="cbse-practice-session-bar"><button type="button" onClick={()=>{setPracticeStage('subjects');setPaperTimerOn(false);}}><FaAngleLeft /> All subjects</button><div><span>CBSE PRACTICE · {studentData.classGrade.toUpperCase()}</span><h2>{selectedOfficialPaper?.subject || paperSubject}</h2><p>Official paper questions · {paperSession.replace('_','–').replace('-','–')} · {paperTextData?.totalMarks ? paperTextData.totalMarks+' marks' : 'Attempt all questions'}</p></div><div className={'cbse-paper-timer '+(paperSeconds<300?'urgent':'')}><FaClock />{String(Math.floor(paperSeconds/3600)).padStart(2,'0')}:{String(Math.floor((paperSeconds%3600)/60)).padStart(2,'0')}:{String(paperSeconds%60).padStart(2,'0')}<button type="button" onClick={()=>{if(paperSeconds===0)setPaperSeconds((paperTextData?.durationMinutes||180)*60);setPaperTimerOn(value=>!value);}}>{paperTimerOn?'Pause':paperSeconds===0?'Restart':'Start timer'}</button></div></section>
                {paperLoading&&<div className="cbse-paper-loading" role="status">Loading and preparing official question text…</div>}{paperError&&<div className="cbse-paper-error" role="alert"><FaInfoCircle />{paperError}<button type="button" onClick={()=>setPaperReload(value=>value+1)}>Retry</button></div>}
                {paperTextData&&<><div className="cbse-check-bar"><div><strong>{Object.keys(practiceSelections).length} choices selected</strong>{practiceChecked&&<span className="cbse-check-result">{practiceCorrectCount} correct out of {practiceCheckableCount} auto-checkable questions</span>}{!practiceCheckableCount&&<span>This paper has no readable official MCQ answer key.</span>}</div><button type="button" disabled={!practiceCheckableCount||!Object.keys(practiceSelections).length} onClick={()=>{setPracticeChecked(true);setPaperTimerOn(false);}}><FaCheck /> Check answers</button>{practiceChecked&&<button type="button" className="cbse-reset-check" onClick={()=>{setPracticeSelections({});setPracticeChecked(false);}}>Try again</button>}</div><section className="cbse-question-list">{paperTextData.introduction&&<pre className="cbse-paper-instructions">{paperTextData.introduction}</pre>}{paperTextData.questions.length>0?paperTextData.questions.map((question,index)=>{const solution=paperTextData.solutions?.[question.number]||(paperTextData.answerKey?.[question.number]?'Correct option: '+paperTextData.answerKey[question.number]:'');return <article className="cbse-extracted-question" key={index}><header className="cbse-question-card-header"><div><span>QUESTION {question.number}</span><small>{question.options?.length===4?'MULTIPLE CHOICE':'WRITTEN RESPONSE'}</small></div><button type="button" onClick={()=>{setTutorInput('Explain this official CBSE '+paperTextData.subject+' question in simple words. Identify what it asks, explain the useful concept, and give me one hint without giving the full answer. Question: '+question.text);setActiveTab('tutor');}}>Ask for a hint <FaLightbulb /></button></header><p className="cbse-question-prompt">{question.prompt||question.text}</p>{question.accessibleAlternative&&<details className="cbse-accessible-alternative"><summary>Show the accessible alternative version</summary><p>{question.accessibleAlternative}</p></details>}{question.options?.length===4&&<div className="cbse-click-options" role="radiogroup" aria-label={'Options for question '+question.number}>{question.options.map(option=>{const correctAnswer=paperTextData.answerKey?.[question.number];const selected=practiceSelections[question.number]===option.label;const isCorrect=correctAnswer===option.label;const resultClass=practiceChecked&&isCorrect?' correct':practiceChecked&&selected&&!isCorrect?' incorrect':'';return <button type="button" role="radio" aria-checked={selected} className={'cbse-option-choice'+(selected?' selected':'')+resultClass} key={option.label} onClick={()=>{setPracticeSelections(current=>({...current,[question.number]:option.label}));setPracticeChecked(false);}}><span className="cbse-option-letter">{option.label}</span><span>{option.text}</span>{practiceChecked&&isCorrect&&<FaCheck className="cbse-option-result-icon" />}{practiceChecked&&selected&&!isCorrect&&<FaTimes className="cbse-option-result-icon" />}</button>;})}</div>}{practiceChecked&&practiceSelections[question.number]&&question.options?.length===4&&paperTextData.answerKey?.[question.number]&&<p className={'cbse-option-feedback '+(practiceSelections[question.number]===paperTextData.answerKey[question.number]?'correct':'incorrect')}>{practiceSelections[question.number]===paperTextData.answerKey[question.number]?'Correct!':'Incorrect.'} Official answer: {paperTextData.answerKey[question.number]}</p>}<label className="cbse-written-answer-label">Your answer<textarea rows="3" value={questionAnswers[question.number]||''} onChange={event=>{const next={...questionAnswers,[question.number]:event.target.value};setQuestionAnswers(next);localStorage.setItem(questionAnswersStorageKey,JSON.stringify(next));}} placeholder={'Write your answer for Question '+question.number+'…'} /></label><div className="cbse-question-card-actions"><span>{question.options?.length>1?'Select an option, then check your answer.':'Write your answer, then compare with the official solution.'}</span><button type="button" className={visibleSolutions[question.number]?'active':''} onClick={()=>setVisibleSolutions(current=>({...current,[question.number]:!current[question.number]}))}><FaBookOpen /> {visibleSolutions[question.number]?'Hide solution':'Show official solution'}</button></div>{visibleSolutions[question.number]&&<div className="cbse-official-solution"><strong><FaCheck /> Official CBSE marking scheme</strong><p>{solution||'The official marking scheme does not include a text solution for this question.'}</p></div>}</article>}):<pre className="cbse-paper-plain-text">{paperTextData.text}</pre>}</section><div className="cbse-paper-hint"><FaInfoCircle /><span>Answers save automatically on this device. Solutions come from the official CBSE marking scheme when available.</span></div></>}
              </>}
              <div className="cbse-archive-note"><FaInfoCircle /><span>Official subject papers are fetched from CBSE Academic. CBSE publishes official papers as documents, not through a public JSON API.</span></div>
            </div>
          )}

          {activeTab === 'papers' && (
            <div className="tab-pane-container fade-in">
              <section className="cbse-archive-hero"><div><span className="section-eyebrow">OFFICIAL CBSE ARCHIVE · CLASS {paperGrade}</span><h2>CBSE Question Bank</h2><p>Choose an official CBSE sample paper to read its questions here and ask Study Coach for hints.</p></div><div className="cbse-archive-count"><FaFileAlt /><strong>11</strong><span>academic sessions</span></div></section>
              <div className="cbse-archive-note"><FaInfoCircle /><span>Official CBSE Sample Question Papers (SQPs) from 2016–17 through 2026–27. These are sample papers, not past board exam papers.</span></div>
              <section className="cbse-paper-controls"><label>Academic session<select value={paperSession} onChange={event=>{setPaperSession(event.target.value);setPaperSubject('');}}><option value="2016_17">2016–17</option><option value="2017_18">2017–18</option><option value="2018_19">2018–19</option><option value="2019_20">2019–20</option><option value="2020-21">2020–21</option><option value="2021-22">2021–22</option><option value="2022-23">2022–23</option><option value="2023-24">2023–24</option><option value="2024-25">2024–25</option><option value="2025-26">2025–26</option><option value="2026-27">2026–27</option></select></label><label>CBSE subject<select value={paperSubject} onChange={event=>{setPaperSubject(event.target.value);}} disabled={!paperCatalog.length}><option value="">{paperLoading&&!paperCatalog.length?'Loading subjects…':'Select a subject'}</option>{paperCatalog.map(paper=><option key={paper.subject} value={paper.subject}>{paper.subject}</option>)}</select></label><div className="cbse-question-bank-mode"><FaBookOpen /> Questions displayed as text</div></section>
              {paperError&&<div className="cbse-paper-error" role="alert"><FaInfoCircle />{paperError}<button type="button" onClick={()=>setPaperReload(value=>value+1)}>Retry</button></div>}{paperLoading&&<div className="cbse-paper-loading" role="status">Loading CBSE paper text…</div>}
              {selectedOfficialPaper&&paperTextData&&!paperError&&<section className="cbse-paper-workspace"><header className="cbse-paper-heading"><div><span>OFFICIAL CBSE SAMPLE QUESTION PAPER</span><h3>{paperTextData.subject} · {paperSession.replace('_','–').replace('-','–')}</h3><p>{paperTextData.totalMarks?paperTextData.totalMarks+' marks · ':''}{paperTextData.durationMinutes?paperTextData.durationMinutes+' minutes · ':''}{paperTextData.pages} pages in source document</p></div></header><div className="cbse-text-bank"><div className="cbse-text-paper-title"><span>QUESTION PAPER TEXT</span></div>{paperTextData.introduction&&<pre className="cbse-paper-instructions">{paperTextData.introduction}</pre>}{paperTextData.questions.length?paperTextData.questions.map((question,index)=><article className="cbse-extracted-question" key={index}><div><span>QUESTION {question.number}</span><button type="button" onClick={()=>{setTutorInput('Explain this official CBSE question in simple words, identify what it is asking, explain the useful concept and give me one hint. Do not provide the full answer. Question: '+question.text);setActiveTab('tutor');}}>Ask for a hint <FaLightbulb /></button></div><p>{question.text}</p></article>):<pre className="cbse-paper-plain-text">{paperTextData.text}</pre>}</div></section>}
              {!paperLoading&&!paperError&&!paperCatalog.length&&<div className="cbse-paper-loading">No subjects were returned for this CBSE session.</div>}
            </div>
          )}

          {activeTab === 'tutor' && (
            <div className="tab-pane-container fade-in">
              <div className="page-section-header">
                <div>
                  <span className="section-eyebrow">LEARN STEP BY STEP</span>
                  <h2>Study Coach</h2>
                  <p>Ask about a school subject or upload a question photo. The coach explains what the question means, then guides you without giving the full solution.</p>
                </div>
                <span className="tutor-guided-badge"><FaRobot /> Guided practice</span>
              </div>

              <section className="study-coach-card">
                <div className="study-coach-topline">
                  <div className="study-coach-brand"><span><FaRobot /></span><div><strong>LBMDPS Study Coach</strong><small>AI learning assistant · Class {studentData.classGrade.replace(/^Class\s*/i, '')}</small></div></div>
                  <span className="coach-session-status">{tutorBlockedUntil > clockNow ? 'Paused' : tutorBusy ? 'Thinking' : 'Ready'}</span>
                </div>

                <div className="coach-policy-note"><FaInfoCircle /><span>First: understand the question, its given facts, and what it asks. Then get a concept explanation and one next-step hint. Full solutions are not provided. Please use respectful language; inappropriate language ends the chat and starts a 5-minute break.</span></div>

                <div className="study-coach-messages" ref={tutorMessagesRef} aria-live="polite">
                  {tutorMessages.map(message => (
                    <div className={`study-coach-message ${message.role}`} key={message.id}>
                      <div className="coach-message-avatar">{message.role === 'student' ? studentData.avatarInitials : <FaRobot />}</div>
                      <div className="coach-message-content">
                        {message.imageData && <img className="coach-question-image" src={message.imageData} alt={`Uploaded question: ${message.imageName || 'question photo'}`} />}
                        {message.text && <p>{message.text}</p>}
                        <time>{message.time}</time>
                      </div>
                    </div>
                  ))}
                  {tutorBusy && <div className="coach-thinking" role="status"><span></span><span></span><span></span> Analyzing your question…</div>}
                  {tutorBlockedUntil > clockNow && <div className="coach-lock-banner"><FaInfoCircle /> Chat paused for {Math.floor(remainingTutorSeconds / 60)}:{String(remainingTutorSeconds % 60).padStart(2, '0')} after inappropriate language.</div>}
                </div>

                {tutorError && <div className="coach-error-message" role="alert">{tutorError}</div>}
                <form className="study-coach-composer" onSubmit={handleTutorSubmit}>
                  {questionPhoto && <div className="coach-photo-preview"><img src={questionPhoto.dataUrl} alt="Question preview" /><span>{questionPhoto.name}</span><button type="button" onClick={() => setQuestionPhoto(null)} aria-label="Remove attached question photo"><FaTimes /></button></div>}
                  <textarea
                    value={tutorInput}
                    onChange={e => setTutorInput(e.target.value)}
                    placeholder="Type your question or show where you got stuck…"
                    maxLength={3000}
                    rows={3}
                    disabled={tutorBusy || tutorBlockedUntil > clockNow}
                  />
                  <div className="coach-composer-actions">
                    <label className={`coach-attach-button ${tutorBusy || tutorBlockedUntil > clockNow ? 'disabled' : ''}`}>
                      <FaImage /><span>Add question photo</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleQuestionPhoto} disabled={tutorBusy || tutorBlockedUntil > clockNow} />
                    </label>
                    <small>{tutorInput.length}/3000 · JPG, PNG, WebP</small>
                    <button type="submit" disabled={tutorBusy || tutorBlockedUntil > clockNow || (!tutorInput.trim() && !questionPhoto)}>
                      {tutorBusy ? 'Please wait…' : tutorBlockedUntil > clockNow ? 'Chat paused' : 'Ask Study Coach'} <FaPaperPlane />
                    </button>
                  </div>
                </form>
              </section>
            </div>
          )}

          {/* TAB 7: STUDENT PROFILE & ID */}
          {activeTab === 'profile' && (
            <div className="tab-pane-container fade-in">
              <div className="page-section-header">
                <div>
                  <h2>Student Profile & Institutional Records</h2>
                  <p>Personal details, guardian records, and digital identity card.</p>
                </div>
                <button
                  className="action-btn secondary"
                  onClick={() => window.print()}
                >
                  🖨️ Print Student Profile
                </button>
              </div>

              <div className="profile-layout-grid">
                {/* ID Card Graphic */}
                <div className="student-id-card-visual">
                  <div className="id-card-header">
                    <img src={logo} alt="School Crest" className="id-crest" />
                    <div>
                      <h4>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h4>
                      <p>CBSE Affiliated #3430398 • UDISE: 20060105502 • Student Identity Card</p>
                    </div>
                  </div>

                  <div className="id-card-body">
                    <div className="id-photo-placeholder">
                      <span>{studentData.avatarInitials}</span>
                    </div>

                    <div className="id-details-list">
                      <h3>{studentData.name}</h3>
                      <p className="id-class-badge">{studentData.classGrade} | Roll #{studentData.rollNo}</p>
                      <div className="id-field"><span>Admission No:</span> <strong>{studentData.admissionNo}</strong></div>
                      <div className="id-field"><span>DOB:</span> <strong>{studentData.dob}</strong></div>
                      <div className="id-field"><span>Blood Group:</span> <strong className="text-danger">{studentData.bloodGroup}</strong></div>
                      <div className="id-field"><span>Emergency Contact:</span> <strong>{studentData.primaryPhone}</strong></div>
                    </div>
                  </div>

                  <div className="id-card-footer">
                    <span>Valid for Session: 2026–2027</span>
                    <span className="signature-pill">Principal Signature ✍️</span>
                  </div>
                </div>

                {/* Comprehensive Information Details */}
                <div className="profile-details-card">
                  <h3>Institutional & Guardian Particulars</h3>

                  <div className="profile-fields-section">
                    <h4>Personal Information</h4>
                    <div className="details-two-col">
                      <div className="field-group">
                        <label>Full Student Name</label>
                        <p>{studentData.name}</p>
                      </div>
                      <div className="field-group">
                        <label>Admission & Scholar No.</label>
                        <p>{studentData.admissionNo}</p>
                      </div>
                      <div className="field-group">
                        <label>Class & Section</label>
                        <p>{studentData.classGrade}</p>
                      </div>
                      <div className="field-group">
                        <label>Class Roll Number</label>
                        <p>{studentData.rollNo}</p>
                      </div>
                      <div className="field-group">
                        <label>Date of Birth</label>
                        <p>{studentData.dob}</p>
                      </div>
                      <div className="field-group">
                        <label>School House</label>
                        <p>{studentData.house}</p>
                      </div>
                      <div className="field-group">
                        <label>Bus Route & Stop</label>
                        <p>{studentData.busRoute}</p>
                      </div>
                      <div className="field-group">
                        <label>Campus Locker</label>
                        <p>{studentData.lockerNo}</p>
                      </div>
                    </div>
                  </div>

                  <div className="profile-fields-section">
                    <h4>Guardian & Residence Particulars</h4>
                    <div className="details-two-col">
                      <div className="field-group">
                        <label>Father's Name & Occupation</label>
                        <p>{studentData.fatherName} ({studentData.fatherOccupation})</p>
                      </div>
                      <div className="field-group">
                        <label>Mother's Name & Occupation</label>
                        <p>{studentData.motherName} ({studentData.motherOccupation})</p>
                      </div>
                      <div className="field-group">
                        <label>Primary Contact Phone</label>
                        <p>{studentData.primaryPhone}</p>
                      </div>
                      <div className="field-group">
                        <label>Emergency Alternate Phone</label>
                        <p>{studentData.emergencyContact}</p>
                      </div>
                      <div className="field-group full-width">
                        <label>Permanent Residential Address</label>
                        <p>{studentData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: SUBMIT HOMEWORK SOLUTION */}
      {submittingAssignment && (
        <div className="student-modal-overlay" onClick={() => setSubmittingAssignment(null)}>
          <div className="student-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3>Submit Homework Solution</h3>
                <p>{submittingAssignment.subject}: {submittingAssignment.title}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSubmittingAssignment(null)}>&times;</button>
            </div>

            <form onSubmit={handleConfirmSubmit} className="modal-body-form">
              <div className="modal-info-banner">
                <span>Teacher: <strong>{submittingAssignment.teacher}</strong></span>
                <span>Deadline: <strong>{submittingAssignment.dueDate}</strong></span>
              </div>

              <label>
                Written Answer / Notes for Mentor:
                <textarea
                  rows={4}
                  required
                  placeholder="Type your explanation, exercise step summary, or answer here..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                />
              </label>

              <label>
                Attach Homework File / Photo:
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSubmissionFileName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
              {submissionFileName && (
                <div className="file-ready-tag">
                  📎 Selected File: <strong>{submissionFileName}</strong>
                </div>
              )}

              <div className="modal-actions-row">
                <button type="button" className="btn-cancel" onClick={() => setSubmittingAssignment(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-confirm-submit">
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: OFFICIAL CBSE REPORT CARD MODAL */}
      {showReportCardModal && (
        <div className="student-modal-overlay report-card-overlay" onClick={() => setShowReportCardModal(false)}>
          <div className="student-modal-content report-card-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar no-print">
              <h3>Official CBSE Progress Report</h3>
              <div className="modal-actions-right">
                <button className="action-btn secondary" onClick={() => window.print()}>
                  🖨️ Print Marksheet
                </button>
                <button className="modal-close-btn" onClick={() => setShowReportCardModal(false)}>&times;</button>
              </div>
            </div>

            <div className="printable-cbse-report">
              {/* Report Header */}
              <div className="cbse-report-header">
                <img src={logo} alt="School Logo" className="cbse-crest" />
                <div className="cbse-titles">
                  <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                  <h4>Affiliated with Central Board of Secondary Education (CBSE), New Delhi</h4>
                  <p>Affiliation No: 3430398 • School Code: 66258 • UDISE: 20060105502 • Naitand, Giridih, Jharkhand</p>
                  <div className="report-doc-title">CUMULATIVE PERFORMANCE REPORT (SESSION 2026–2027)</div>
                </div>
              </div>

              {/* Student Details Meta */}
              <div className="cbse-student-meta-grid">
                <div><span>Student Name:</span> <strong>{studentData.name || examReportData.studentName}</strong></div>
                <div><span>Class & Section:</span> <strong>{studentData.classGrade || examReportData.classGrade}</strong></div>
                <div><span>Roll Number:</span> <strong>{studentData.rollNo || examReportData.rollNo}</strong></div>
                <div><span>Admission No:</span> <strong>{studentData.admissionNo || examReportData.admissionNo}</strong></div>
                <div><span>Father's Name:</span> <strong>{studentData.fatherName}</strong></div>
                <div><span>Mother's Name:</span> <strong>{studentData.motherName}</strong></div>
                <div><span>Date of Birth:</span> <strong>{studentData.dob}</strong></div>
                <div><span>Attendance:</span> <strong>{attendanceMetrics ? `${attendanceMetrics.attendanceRate}%` : examReportData.attendancePercentage}</strong></div>
              </div>

              {/* Scholastic Marks Table */}
              <table className="cbse-marks-table">
                <thead>
                  <tr>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Theory (80)</th>
                    <th>Internal / Lab (20)</th>
                    <th>Total (100)</th>
                    <th>Positional Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {examReportData.subjects.map((s) => (
                    <tr key={s.code}>
                      <td>{s.code}</td>
                      <td><strong>{s.name}</strong></td>
                      <td>{s.theoryObt}</td>
                      <td>{s.intObt}</td>
                      <td><strong>{s.total}</strong></td>
                      <td><span className="grade-badge">{s.grade}</span></td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan={4}><strong>Grand Aggregate Total</strong></td>
                    <td colSpan={2}><strong>{examReportData.overallTotal} ({examReportData.percentage})</strong></td>
                  </tr>
                </tbody>
              </table>

              {/* Co-Scholastic & Signatures */}
              <div className="cbse-signatures-row">
                <div className="sig-block">
                  <div className="sig-line"></div>
                  <span>Class Teacher Signature</span>
                </div>
                <div className="sig-block">
                  <div className="seal-circle">OFFICIAL SEAL • LBMDPS</div>
                  <span>School Seal</span>
                </div>
                <div className="sig-block">
                  <div className="sig-line"></div>
                  <span>Principal Signature & Stamp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;

