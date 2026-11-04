import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import logo from '../../components/AllImage/school-logo.jpg';
import RoleSwitcher from '../../components/RoleSwitcher';
import { fetchAdminContent, fetchPublicContent, saveAdminContent, fetchApplications } from '../../utils/api';
import { defaultRecords } from '../AdminDashboard/constants/adminData';
import './index.css';

// Default initial class rosters fallback
const initialClassRosters = {
  'Class 10-A': [
    { rollNo: 1, name: 'Aarav Kumar', present: true, math: 92, science: 95, english: 88, hindi: 90, computer: 94 },
    { rollNo: 2, name: 'Sneha Kumari', present: true, math: 95, science: 98, english: 94, hindi: 96, computer: 98 },
    { rollNo: 3, name: 'Rahul Verma', present: false, math: 78, science: 82, english: 75, hindi: 80, computer: 84 },
    { rollNo: 4, name: 'Pooja Mahto', present: true, math: 88, science: 91, english: 85, hindi: 89, computer: 90 },
    { rollNo: 5, name: 'Vikas Singh', present: true, math: 84, science: 79, english: 82, hindi: 85, computer: 80 },
    { rollNo: 6, name: 'Ananya Roy', present: true, math: 91, science: 89, english: 92, hindi: 94, computer: 92 },
    { rollNo: 7, name: 'Rajesh Murmu', present: false, math: 68, science: 72, english: 70, hindi: 75, computer: 74 },
    { rollNo: 8, name: 'Kavita Das', present: true, math: 85, science: 88, english: 86, hindi: 90, computer: 88 }
  ],
  'Class 10-B': [
    { rollNo: 1, name: 'Aditya Raj', present: true, math: 88, science: 85, english: 90, hindi: 86, computer: 89 },
    { rollNo: 2, name: 'Priya Sharma', present: true, math: 94, science: 92, english: 91, hindi: 95, computer: 96 },
    { rollNo: 3, name: 'Deepak Soren', present: true, math: 76, science: 80, english: 74, hindi: 78, computer: 82 },
    { rollNo: 4, name: 'Megha Gupta', present: false, math: 82, science: 79, english: 85, hindi: 88, computer: 85 },
    { rollNo: 5, name: 'Kunal Verma', present: true, math: 90, science: 91, english: 88, hindi: 90, computer: 92 },
    { rollNo: 6, name: 'Rani Kumari', present: true, math: 85, science: 87, english: 84, hindi: 89, computer: 86 }
  ],
  'Class 9-A': [
    { rollNo: 1, name: 'Rohan Sharma', present: true, math: 89, science: 92, english: 87, hindi: 91, computer: 90 },
    { rollNo: 2, name: 'Simran Kaur', present: true, math: 93, science: 95, english: 96, hindi: 92, computer: 94 },
    { rollNo: 3, name: 'Gaurav Kumar', present: false, math: 72, science: 75, english: 70, hindi: 76, computer: 78 },
    { rollNo: 4, name: 'Nisha Kumari', present: true, math: 86, science: 88, english: 84, hindi: 89, computer: 88 },
    { rollNo: 5, name: 'Sanjay Murmu', present: true, math: 79, science: 81, english: 78, hindi: 80, computer: 82 }
  ],
  'Class 8-A': [
    { rollNo: 1, name: 'Ritesh Kumar', present: true, math: 85, science: 88, english: 82, hindi: 86, computer: 90 },
    { rollNo: 2, name: 'Anjali Mahto', present: true, math: 91, science: 94, english: 89, hindi: 92, computer: 95 },
    { rollNo: 3, name: 'Sunil Marandi', present: true, math: 77, science: 80, english: 75, hindi: 79, computer: 81 },
    { rollNo: 4, name: 'Pooja Soren', present: false, math: 82, science: 84, english: 80, hindi: 85, computer: 84 }
  ],
  'Class 7-A': [
    { rollNo: 1, name: 'Vivek Sharma', present: true, math: 94, science: 96, english: 90, hindi: 88, computer: 98 },
    { rollNo: 2, name: 'Suhani Roy', present: true, math: 96, science: 97, english: 95, hindi: 92, computer: 99 },
    { rollNo: 3, name: 'Aman Khan', present: true, math: 84, science: 86, english: 82, hindi: 85, computer: 88 },
    { rollNo: 4, name: 'Prerna Kumari', present: false, math: 89, science: 91, english: 87, hindi: 90, computer: 92 }
  ]
};

// Initial Lesson Plan & Syllabus Tracker
const initialSyllabus = [
  { id: 1, class: 'Class 10-A', subject: 'Mathematics', chapter: 'Real Numbers & Fundamental Theorem', completedLessons: 8, totalLessons: 8, status: 'Completed', progress: 100 },
  { id: 2, class: 'Class 10-A', subject: 'Mathematics', chapter: 'Polynomials & Geometric Zeros', completedLessons: 7, totalLessons: 7, status: 'Completed', progress: 100 },
  { id: 3, class: 'Class 10-A', subject: 'Mathematics', chapter: 'Quadratic Equations & Roots', completedLessons: 7, totalLessons: 10, status: 'In Progress', progress: 70 },
  { id: 4, class: 'Class 10-A', subject: 'Mathematics', chapter: 'Arithmetic Progressions (AP)', completedLessons: 3, totalLessons: 9, status: 'In Progress', progress: 33 },
  { id: 5, class: 'Class 10-A', subject: 'Mathematics', chapter: 'Triangles & Similarity Theorems', completedLessons: 0, totalLessons: 12, status: 'Upcoming', progress: 0 },
  { id: 6, class: 'Class 10-A', subject: 'Science', chapter: 'Light: Reflection & Refraction', completedLessons: 11, totalLessons: 11, status: 'Completed', progress: 100 },
  { id: 7, class: 'Class 10-A', subject: 'Science', chapter: 'Chemical Reactions and Equations', completedLessons: 9, totalLessons: 9, status: 'Completed', progress: 100 },
  { id: 8, class: 'Class 10-A', subject: 'Science', chapter: 'Acids, Bases and Salts', completedLessons: 6, totalLessons: 8, status: 'In Progress', progress: 75 }
];

// Initial Student Behavioral Diary
const initialStudentDiary = [
  { id: 1, class: 'Class 10-A', studentName: 'Aarav Kumar', rollNo: 1, category: 'Star Student of the Week', date: '2026-10-24', note: 'Exceptional score in Mathematics weekly assessment and assisted peers in geometry lab.', rating: 'Excellent' },
  { id: 2, class: 'Class 10-A', studentName: 'Rahul Verma', rollNo: 3, category: 'Homework Incomplete', date: '2026-10-25', note: 'Did not submit Physics ray optics diagram notebook. Parent SMS notice generated.', rating: 'Needs Attention' },
  { id: 3, class: 'Class 10-A', studentName: 'Sneha Kumari', rollNo: 2, category: 'Academic Excellence', date: '2026-10-23', note: 'Delivered an outstanding class presentation on Environmental Conservation.', rating: 'Excellent' },
  { id: 4, class: 'Class 10-A', studentName: 'Rajesh Murmu', rollNo: 7, category: 'Punctuality & Attendance', date: '2026-10-22', note: 'Consecutive late arrival to morning assembly. Counseled by class teacher.', rating: 'Warning' }
];

// Initial Faculty Leave & Proxy Schedule
const initialLeaveRequests = [
  { id: 'LEV-01', leaveType: 'Casual Leave', fromDate: '2026-11-04', toDate: '2026-11-04', days: 1, reason: 'Personal family commitment', status: 'Approved' },
  { id: 'LEV-02', leaveType: 'Medical Leave', fromDate: '2026-09-15', toDate: '2026-09-16', days: 2, reason: 'Viral fever rest', status: 'Approved' }
];

const initialProxySchedule = [
  { id: 'PRX-01', day: 'Today', period: 'Period 3 (09:45 - 10:30)', class: 'Class 8-A', subject: 'General Science', room: 'Room 204', absentTeacher: 'Smt. Sunita Devi (On Leave)', status: 'Assigned' },
  { id: 'PRX-02', day: 'Today', period: 'Period 6 (12:45 - 01:30)', class: 'Class 9-A', subject: 'Library Reading Supervision', room: 'Central Library', absentTeacher: 'Sri Ramesh Singh (Sports Duty)', status: 'Assigned' }
];

// Initial Parent-Teacher Meeting (PTM) Records
const initialPtmRecords = [
  { id: 'PTM-01', class: 'Class 10-A', studentName: 'Aarav Kumar', parentName: 'Mr. Sunil Kumar (Father)', phone: '+91 94313 78901', topic: 'Term 1 Academic Progress & Board Prep', feedback: 'Parents expressed satisfaction with Math & Science marks. Agreed to encourage 2 hours daily evening self-study.', date: '2026-10-18', time: '10:30 AM', status: 'Completed' },
  { id: 'PTM-02', class: 'Class 10-A', studentName: 'Rahul Verma', parentName: 'Mrs. Geeta Verma (Mother)', phone: '+91 98351 44521', topic: 'Attendance Regularity & English Writing', feedback: 'Discussed irregular attendance and provided remedial worksheets for grammar practice.', date: '2026-10-18', time: '11:15 AM', status: 'Follow-up Needed' },
  { id: 'PTM-03', class: 'Class 10-A', studentName: 'Sneha Kumari', parentName: 'Dr. R. K. Sharma (Father)', phone: '+91 94701 22319', topic: 'Olympiad Preparation & Senior Guidance', feedback: 'Encouraged participation in National Science Olympiad.', date: '2026-10-18', time: '12:00 PM', status: 'Completed' }
];

// Initial Study Materials & Digital E-Notes Repository
const initialMaterials = [
  {
    id: 'MAT-101',
    title: 'Class 10 Real Numbers — Formula Sheet & NCERT Exemplar Solutions',
    subject: 'Mathematics',
    class: 'Class 10-A',
    chapter: 'Real Numbers & Fundamental Theorem',
    type: 'PDF Document',
    pages: '12 Pages',
    uploadedOn: '2026-10-22',
    downloads: 34,
    size: '2.4 MB',
    author: 'Sri R. K. Sharma (Senior Faculty)'
  },
  {
    id: 'MAT-102',
    title: 'Ray Optics & Spherical Mirrors — Concept Maps & Ray Diagrams',
    subject: 'Science',
    class: 'Class 10-A',
    chapter: 'Light: Reflection & Refraction',
    type: 'PDF Document',
    pages: '18 Pages',
    uploadedOn: '2026-10-24',
    downloads: 28,
    size: '3.8 MB',
    author: 'Smt. Anjali Roy (PGT Science)'
  },
  {
    id: 'MAT-103',
    title: 'Class 10 English Formal Letter Writing Format & Solved Samples',
    subject: 'English',
    class: 'Class 10-A',
    chapter: 'Writing Skills & Grammar Section',
    type: 'Study Guide',
    pages: '8 Pages',
    uploadedOn: '2026-10-25',
    downloads: 41,
    size: '1.2 MB',
    author: 'Sri Amit Verma (TGT English)'
  },
  {
    id: 'MAT-104',
    title: 'Class 9 Tissues & Cell Biology — CBSE Revision Diagrams',
    subject: 'Science',
    class: 'Class 9-A',
    chapter: 'Fundamental Unit of Life & Tissues',
    type: 'Revision Sheet',
    pages: '15 Pages',
    uploadedOn: '2026-10-20',
    downloads: 19,
    size: '2.9 MB',
    author: 'Smt. Sunita Devi (PGT Biology)'
  }
];

// Initial Question Bank Repository
const initialQuestions = [
  {
    id: 'Q-01',
    subject: 'Mathematics',
    class: 'Class 10-A',
    chapter: 'Real Numbers',
    type: 'MCQ (1 Mark)',
    marks: 1,
    question: 'If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:',
    options: ['(A) xy', '(B) xy²', '(C) x³y³', '(D) x²y²'],
    correctOption: '(B) xy²',
    answerHint: 'HCF is the product of smallest power of each common prime factor: x¹ · y² = xy².'
  },
  {
    id: 'Q-02',
    subject: 'Mathematics',
    class: 'Class 10-A',
    chapter: 'Real Numbers',
    type: 'Short Answer (2 Marks)',
    marks: 2,
    question: 'Show that any positive odd integer is of the form 4q + 1 or 4q + 3, where q is some integer.',
    answerHint: 'Apply Euclid’s Division Lemma with divisor b = 4. Possible remainders are 0, 1, 2, 3. Even forms are 4q, 4q+2.'
  },
  {
    id: 'Q-03',
    subject: 'Mathematics',
    class: 'Class 10-A',
    chapter: 'Real Numbers',
    type: 'Concept Proof (3 Marks)',
    marks: 3,
    question: 'Prove that √5 is an irrational number using the method of contradiction.',
    answerHint: 'Assume √5 = a/b where a, b are co-prime integers. 5b² = a² => 5 divides a² and 5 divides a. Reach contradiction.'
  },
  {
    id: 'Q-04',
    subject: 'Mathematics',
    class: 'Class 10-A',
    chapter: 'Quadratic Equations',
    type: 'Long Answer (5 Marks)',
    marks: 5,
    question: 'A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the original speed of the train.',
    answerHint: 'Let speed be x km/h. Equation: 360/x - 360/(x+5) = 1. Solving gives x² + 5x - 1800 = 0 => (x-40)(x+45) = 0 => x = 40 km/h.'
  },
  {
    id: 'Q-05',
    subject: 'Science',
    class: 'Class 10-A',
    chapter: 'Light: Reflection & Refraction',
    type: 'Short Answer (2 Marks)',
    marks: 2,
    question: 'State Snell’s Law of refraction of light and write the mathematical relation for absolute refractive index.',
    answerHint: 'sin(i)/sin(r) = constant = n₂₁. Absolute refractive index n = c/v (speed of light in vacuum / medium).'
  },
  {
    id: 'Q-06',
    subject: 'Science',
    class: 'Class 10-A',
    chapter: 'Light: Reflection & Refraction',
    type: 'Long Answer (5 Marks)',
    marks: 5,
    question: 'Draw neat ray diagrams showing image formation by a concave mirror when the object is placed: (i) between pole and focus, (ii) at the centre of curvature. State the nature, position, and relative size of the image in each case.',
    answerHint: '(i) Virtual, erect, magnified behind the mirror. (ii) Real, inverted, same size at the centre of curvature C.'
  }
];

// Initial Staff Notices & Academic Circulars
const initialNotices = [
  {
    id: 'NOT-01',
    title: 'CBSE Secondary Board Exam 2027 LOC Verification & Subject Confirmation',
    category: 'CBSE Official',
    priority: 'Urgent',
    date: '2026-10-26',
    publisher: 'Principal Office / CBSE Examination Cell',
    content: 'All Class 10 Class Teachers are requested to cross-verify the List of Candidates (LOC), mother\'s name, father\'s name, and subject codes with parent signatures before 31st October 2026.',
    read: false
  },
  {
    id: 'NOT-02',
    title: 'Internal Assessment & Term-1 Portfolio Marks Upload Deadline',
    category: 'Academic',
    priority: 'High',
    date: '2026-10-24',
    publisher: 'Academic Director',
    content: 'All subject teachers must submit periodic test marks, notebook evaluation registers, and student subject enrichment project scores to the examination cell by Friday.',
    read: false
  },
  {
    id: 'NOT-03',
    title: 'Inter-School Science Olympiad & Model Exhibition 2026',
    category: 'Extracurricular',
    priority: 'Normal',
    date: '2026-10-21',
    publisher: 'Science & Robotics Club Coordinator',
    content: 'Class 8 to 10 Science teachers to nominate 5 students per section for the District Inter-School Science Fair to be held at Town Hall Giridih on 14th November.',
    read: true
  },
  {
    id: 'NOT-04',
    title: 'Faculty Monthly Academic Council Meeting',
    category: 'Faculty Meeting',
    priority: 'Important',
    date: '2026-10-19',
    publisher: 'Vice Principal',
    content: 'Review of Class 10 Board preparatory test results and discussion on remedial classes for slow learners will take place on Saturday at 02:00 PM in the Faculty Conference Hall.',
    read: true
  }
];

const TeacherDashboard = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [classData, setClassData] = useState(initialClassRosters);
  const [saveStatus, setSaveStatus] = useState('');
  const [selectedReportStudent, setSelectedReportStudent] = useState(null);
  const [searchStudent, setSearchStudent] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Sidebar Collapse / Expand State (persisted)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('teacherSidebarCollapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Live IST Clock
  const [currentDateTime, setCurrentDateTime] = useState('');
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

  // Real data loading from MongoDB & APIs
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const loadRealData = async () => {
      try {
        let loadedStudents = null;
        if (token) {
          try {
            const resp = await fetchAdminContent('students', token);
            if (Array.isArray(resp.json?.items) && resp.json.items.length) {
              loadedStudents = resp.json.items;
            }
          } catch (e) {}
        }
        if (!loadedStudents) {
          try {
            const pub = await fetchPublicContent('students');
            if (Array.isArray(pub.json?.items) && pub.json.items.length) {
              loadedStudents = pub.json.items;
            }
          } catch (e) {}
        }

        // Include applications from real school applicants
        try {
          const appResp = await fetchApplications();
          if (Array.isArray(appResp.items) && appResp.items.length) {
            const baseStuds = loadedStudents || defaultRecords.students;
            const existingNames = new Set(baseStuds.map(s => s.studentName.toLowerCase()));
            const newApplicants = appResp.items
              .filter(a => a.studentName && !existingNames.has(a.studentName.toLowerCase()))
              .map((a, i) => ({
                id: a._id || `app-${i}`,
                rollNo: `1${String(i + 20).padStart(2, '0')}`,
                studentName: a.studentName,
                classApplying: a.classApplying || 'Class 10',
                className: a.classApplying || 'Class 10'
              }));
            loadedStudents = [...baseStuds, ...newApplicants];
          }
        } catch (e) {}

        const finalStudents = (loadedStudents && loadedStudents.length) ? loadedStudents : defaultRecords.students;

        // Check if there is saved class roster in localStorage
        const savedRosters = localStorage.getItem('lbmdps_teacher_classdata');
        if (savedRosters) {
          try {
            setClassData(JSON.parse(savedRosters));
            setIsDataLoaded(true);
            return;
          } catch (e) {}
        }

        // Build dynamic rosters grouped by class
        const built = { ...initialClassRosters };
        finalStudents.forEach((st, idx) => {
          const rawCls = (st.classApplying || st.className || 'Class 10').trim();
          const targetKey = rawCls.includes('-') ? rawCls : `${rawCls}-A`;
          if (!built[targetKey]) {
            built[targetKey] = [];
          }
          const existing = built[targetKey].find(s => s.name.toLowerCase() === st.studentName.toLowerCase());
          if (!existing) {
            built[targetKey].push({
              rollNo: Number(st.rollNo) || (built[targetKey].length + 1),
              name: st.studentName,
              present: true,
              math: 85 + (idx % 12),
              science: 88 + (idx % 10),
              english: 82 + (idx % 15),
              hindi: 86 + (idx % 10),
              computer: 90 + (idx % 8)
            });
          }
        });
        setClassData(built);
        setIsDataLoaded(true);
      } catch (err) {
        console.warn('Teacher data loader note:', err);
        setIsDataLoaded(true);
      }
    };
    loadRealData();
  }, []);

  // Save class data to localStorage when updated
  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem('lbmdps_teacher_classdata', JSON.stringify(classData));
    }
  }, [classData, isDataLoaded]);

  // Homework State
  const [homeworkList, setHomeworkList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_teacher_hw');
      return saved ? JSON.parse(saved) : [
        { id: 1, subject: 'Mathematics', title: 'Quadratic Equations Exercise 4.2 (Q 1-12)', dueDate: '2026-10-30', class: 'Class 10-A', status: 'Active' },
        { id: 2, subject: 'Science', title: 'Ray Optics Diagrams & Lab Journal Write-up', dueDate: '2026-11-01', class: 'Class 10-A', status: 'Active' },
        { id: 3, subject: 'English', title: 'Formal Letter to Municipal Commissioner Practice', dueDate: '2026-11-02', class: 'Class 10-A', status: 'Reviewed' },
        { id: 4, subject: 'Social Science', title: 'Map Skill: Major Mineral Belts of Jharkhand', dueDate: '2026-11-03', class: 'Class 9-A', status: 'Active' }
      ];
    } catch (e) {
      return [];
    }
  });

  const [hwSubject, setHwSubject] = useState('Mathematics');
  const [hwTitle, setHwTitle] = useState('');
  const [hwDate, setHwDate] = useState('');
  const [hwClass, setHwClass] = useState('Class 10-A');

  useEffect(() => {
    localStorage.setItem('lbmdps_teacher_hw', JSON.stringify(homeworkList));
  }, [homeworkList]);

  // NEW MODULE 1: Syllabus & Lesson Planning State
  const [syllabusList, setSyllabusList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_teacher_syllabus');
      return saved ? JSON.parse(saved) : initialSyllabus;
    } catch (e) {
      return initialSyllabus;
    }
  });
  const [newChapterName, setNewChapterName] = useState('');
  const [newChapterSub, setNewChapterSub] = useState('Mathematics');
  const [newChapterLessons, setNewChapterLessons] = useState(8);

  useEffect(() => {
    localStorage.setItem('lbmdps_teacher_syllabus', JSON.stringify(syllabusList));
  }, [syllabusList]);

  // NEW MODULE 2: Student Conduct Diary State
  const [diaryList, setDiaryList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_teacher_diary');
      return saved ? JSON.parse(saved) : initialStudentDiary;
    } catch (e) {
      return initialStudentDiary;
    }
  });
  const [diaryStudentName, setDiaryStudentName] = useState('');
  const [diaryCategory, setDiaryCategory] = useState('Star Student of the Week');
  const [diaryNote, setDiaryNote] = useState('');

  useEffect(() => {
    localStorage.setItem('lbmdps_teacher_diary', JSON.stringify(diaryList));
  }, [diaryList]);

  // NEW MODULE 3: Faculty Leave & Proxy Schedule State
  const [leaveRequests, setLeaveRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_teacher_leaves');
      return saved ? JSON.parse(saved) : initialLeaveRequests;
    } catch (e) {
      return initialLeaveRequests;
    }
  });
  const [proxySchedule] = useState(initialProxySchedule);
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  useEffect(() => {
    localStorage.setItem('lbmdps_teacher_leaves', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  // NEW MODULE 4: PTM Records State
  const [ptmList, setPtmList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_teacher_ptm');
      return saved ? JSON.parse(saved) : initialPtmRecords;
    } catch (e) {
      return initialPtmRecords;
    }
  });
  const [ptmStudentName, setPtmStudentName] = useState('');
  const [ptmParentName, setPtmParentName] = useState('');
  const [ptmPhone, setPtmPhone] = useState('');
  const [ptmTopic, setPtmTopic] = useState('');
  const [ptmFeedback, setPtmFeedback] = useState('');

  useEffect(() => {
    localStorage.setItem('lbmdps_teacher_ptm', JSON.stringify(ptmList));
  }, [ptmList]);

  // NEW MODULE 5: Study Materials & Digital E-Notes Hub
  const [materialsList, setMaterialsList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_teacher_materials');
      return saved ? JSON.parse(saved) : initialMaterials;
    } catch (e) {
      return initialMaterials;
    }
  });
  const [matSubjectFilter, setMatSubjectFilter] = useState('All');
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatSubject, setNewMatSubject] = useState('Mathematics');
  const [newMatChapter, setNewMatChapter] = useState('');
  const [newMatType, setNewMatType] = useState('PDF Document');

  useEffect(() => {
    localStorage.setItem('lbmdps_teacher_materials', JSON.stringify(materialsList));
  }, [materialsList]);

  // NEW MODULE 6: Question Bank & Test Paper Generator
  const [questionsList, setQuestionsList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_teacher_questions');
      return saved ? JSON.parse(saved) : initialQuestions;
    } catch (e) {
      return initialQuestions;
    }
  });
  const [qSubjectFilter, setQSubjectFilter] = useState('All');
  const [newQSubject, setNewQSubject] = useState('Mathematics');
  const [newQChapter, setNewQChapter] = useState('');
  const [newQType, setNewQType] = useState('Short Answer (2 Marks)');
  const [newQMarks, setNewQMarks] = useState(2);
  const [newQText, setNewQText] = useState('');
  const [newQHint, setNewQHint] = useState('');
  const [showTestPaperModal, setShowTestPaperModal] = useState(false);
  const [testPaperSubject, setTestPaperSubject] = useState('Mathematics');
  const [testPaperDuration, setTestPaperDuration] = useState('1.5 Hours');

  useEffect(() => {
    localStorage.setItem('lbmdps_teacher_questions', JSON.stringify(questionsList));
  }, [questionsList]);

  // NEW MODULE 7: Staff Notices & Academic Circulars
  const [noticesList, setNoticesList] = useState(() => {
    try {
      const saved = localStorage.getItem('lbmdps_teacher_notices');
      return saved ? JSON.parse(saved) : initialNotices;
    } catch (e) {
      return initialNotices;
    }
  });
  const [noticeFilter, setNoticeFilter] = useState('All');
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('Academic');
  const [newNoticePriority, setNewNoticePriority] = useState('Normal');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  useEffect(() => {
    localStorage.setItem('lbmdps_teacher_notices', JSON.stringify(noticesList));
  }, [noticesList]);

  // Sidebar Search & Section Accordions
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [openSections, setOpenSections] = useState({
    classroom: true,
    academics: true,
    studentCare: true,
    facultyDesk: true
  });

  const toggleSection = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllSections = (expand) => {
    setOpenSections({
      classroom: expand,
      academics: expand,
      studentCare: expand,
      facultyDesk: expand
    });
  };

  const currentStudents = classData[selectedClass] || [];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    history.replace('/login');
  };

  const toggleAttendance = (rollNo) => {
    setClassData(prev => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map(st =>
        st.rollNo === rollNo ? { ...st, present: !st.present } : st
      )
    }));
  };

  const markAll = (status) => {
    setClassData(prev => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map(st => ({ ...st, present: status }))
    }));
  };

  const handleSaveAttendance = async () => {
    const present = currentStudents.filter(s => s.present).length;
    setSaveStatus(`✓ Attendance for ${selectedClass} saved successfully (${present}/${currentStudents.length} Present) for ${attendanceDate}.`);
    
    // Save to backend if token available
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        await saveAdminContent('attendance', {
          date: attendanceDate,
          class: selectedClass,
          students: currentStudents,
          updatedAt: new Date().toISOString()
        }, token);
      } catch (err) {}
    }
    setTimeout(() => setSaveStatus(''), 4500);
  };

  const handleMarksChange = (rollNo, subject, val) => {
    const num = Math.min(100, Math.max(0, Number(val) || 0));
    setClassData(prev => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map(st =>
        st.rollNo === rollNo ? { ...st, [subject]: num } : st
      )
    }));
  };

  const handleSaveGradebook = async () => {
    setSaveStatus(`✓ Term 1 Marks & CBSE Grades for ${selectedClass} saved successfully!`);
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        await saveAdminContent('marks', {
          class: selectedClass,
          students: currentStudents,
          updatedAt: new Date().toISOString()
        }, token);
      } catch (err) {}
    }
    setTimeout(() => setSaveStatus(''), 4500);
  };

  const handleAddHomework = (e) => {
    e.preventDefault();
    if (!hwTitle) return;

    const newHw = {
      id: Date.now(),
      subject: hwSubject,
      title: hwTitle,
      dueDate: hwDate || 'Next Class',
      class: hwClass,
      status: 'Active'
    };

    setHomeworkList([newHw, ...homeworkList]);
    setHwTitle('');
    setHwDate('');
    setSaveStatus(`✓ Assignment published for ${hwClass}!`);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const handleDeleteHomework = (id) => {
    setHomeworkList(prev => prev.filter(h => h.id !== id));
  };

  const handleToggleHomeworkStatus = (id) => {
    setHomeworkList(prev => prev.map(h => 
      h.id === id ? { ...h, status: h.status === 'Active' ? 'Reviewed' : 'Active' } : h
    ));
  };

  // Add Chapter to Syllabus
  const handleAddSyllabusChapter = (e) => {
    e.preventDefault();
    if (!newChapterName) return;

    const newChap = {
      id: Date.now(),
      class: selectedClass,
      subject: newChapterSub,
      chapter: newChapterName,
      completedLessons: 0,
      totalLessons: Number(newChapterLessons) || 8,
      status: 'Upcoming',
      progress: 0
    };

    setSyllabusList([...syllabusList, newChap]);
    setNewChapterName('');
    setSaveStatus(`✓ Chapter "${newChap.chapter}" added to ${selectedClass} curriculum!`);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const handleUpdateChapterProgress = (id, delta) => {
    setSyllabusList(prev => prev.map(ch => {
      if (ch.id === id) {
        const newCompleted = Math.max(0, Math.min(ch.totalLessons, ch.completedLessons + delta));
        const prog = Math.round((newCompleted / ch.totalLessons) * 100);
        const stat = prog === 100 ? 'Completed' : prog > 0 ? 'In Progress' : 'Upcoming';
        return { ...ch, completedLessons: newCompleted, progress: prog, status: stat };
      }
      return ch;
    }));
  };

  // Add Student Diary Entry
  const handleAddDiaryEntry = (e) => {
    e.preventDefault();
    if (!diaryStudentName || !diaryNote) return;

    const newEntry = {
      id: Date.now(),
      class: selectedClass,
      studentName: diaryStudentName,
      rollNo: currentStudents.find(s => s.name === diaryStudentName)?.rollNo || '#',
      category: diaryCategory,
      date: new Date().toISOString().split('T')[0],
      note: diaryNote,
      rating: diaryCategory.includes('Star') || diaryCategory.includes('Excellence') ? 'Excellent' : 'Needs Attention'
    };

    setDiaryList([newEntry, ...diaryList]);
    setDiaryNote('');
    setSaveStatus(`✓ Conduct observation logged for ${diaryStudentName}!`);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  // Submit Leave Request
  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!leaveStartDate || !leaveReason) return;

    const newLeave = {
      id: `LEV-${String(leaveRequests.length + 1).padStart(2, '0')}`,
      leaveType: leaveType,
      fromDate: leaveStartDate,
      toDate: leaveEndDate || leaveStartDate,
      days: 1,
      reason: leaveReason,
      status: 'Pending Approval'
    };

    setLeaveRequests([newLeave, ...leaveRequests]);
    setLeaveReason('');
    setSaveStatus(`✓ Leave application submitted to School Administration!`);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  // Add PTM Record
  const handleAddPtmRecord = (e) => {
    e.preventDefault();
    if (!ptmStudentName || !ptmTopic) return;

    const newPtm = {
      id: `PTM-${String(ptmList.length + 1).padStart(2, '0')}`,
      class: selectedClass,
      studentName: ptmStudentName,
      parentName: ptmParentName || 'Parent / Guardian',
      phone: ptmPhone || '+91 94313 78901',
      topic: ptmTopic,
      feedback: ptmFeedback || 'Discussed student academic performance and attendance.',
      date: new Date().toISOString().split('T')[0],
      time: '11:00 AM',
      status: 'Completed'
    };

    setPtmList([newPtm, ...ptmList]);
    setPtmStudentName('');
    setPtmParentName('');
    setPtmPhone('');
    setPtmTopic('');
    setPtmFeedback('');
    setSaveStatus(`✓ Parent-Teacher conference notes saved for ${newPtm.studentName}!`);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  // Handle Add Study Material
  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!newMatTitle) return;
    const item = {
      id: `MAT-${Date.now().toString().slice(-4)}`,
      title: newMatTitle,
      subject: newMatSubject,
      class: selectedClass,
      chapter: newMatChapter || 'General Unit',
      type: newMatType,
      pages: '8-14 Pages',
      uploadedOn: new Date().toISOString().split('T')[0],
      downloads: 0,
      size: '2.1 MB',
      author: 'Senior Faculty'
    };
    setMaterialsList([item, ...materialsList]);
    setNewMatTitle('');
    setNewMatChapter('');
    setSaveStatus(`✓ Study material "${item.title}" published for ${selectedClass}!`);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const handleDeleteMaterial = (id) => {
    setMaterialsList(prev => prev.filter(m => m.id !== id));
  };

  // Handle Add Question to Question Bank
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQText) return;
    const item = {
      id: `Q-${Date.now().toString().slice(-4)}`,
      subject: newQSubject,
      class: selectedClass,
      chapter: newQChapter || 'General Topic',
      type: newQType,
      marks: Number(newQMarks) || 2,
      question: newQText,
      answerHint: newQHint || 'Follow standard CBSE marking scheme.'
    };
    setQuestionsList([item, ...questionsList]);
    setNewQText('');
    setNewQHint('');
    setSaveStatus(`✓ Question added to ${newQSubject} Question Bank!`);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const handleDeleteQuestion = (id) => {
    setQuestionsList(prev => prev.filter(q => q.id !== id));
  };

  // Handle Staff Notice Read Toggle
  const handleToggleNoticeRead = (id) => {
    setNoticesList(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  // Handle Publish New Notice
  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;
    const item = {
      id: `NOT-${Date.now().toString().slice(-4)}`,
      title: newNoticeTitle,
      category: newNoticeCategory,
      priority: newNoticePriority,
      date: new Date().toISOString().split('T')[0],
      publisher: 'Senior Faculty / Academic Desk',
      content: newNoticeContent,
      read: false
    };
    setNoticesList([item, ...noticesList]);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setSaveStatus(`✓ Faculty Notice "${item.title}" published!`);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const presentCount = currentStudents.filter(s => s.present).length;
  const attendanceRate = currentStudents.length > 0 ? Math.round((presentCount / currentStudents.length) * 100) : 0;

  const authUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('authUser') || '{}');
    } catch (e) {
      return {};
    }
  })();
  const isSuperAdmin = authUser.role === 'super_admin' || localStorage.getItem('userRole') === 'super_admin';

  // Filter students for attendance / gradebook
  const displayedStudents = currentStudents.filter(s => 
    !searchStudent || 
    s.name.toLowerCase().includes(searchStudent.toLowerCase()) || 
    String(s.rollNo).includes(searchStudent)
  );

  // Syllabus calculation for selected class
  const classSyllabus = syllabusList.filter(s => s.class === selectedClass);
  const totalChapters = classSyllabus.length || 1;
  const completedChapters = classSyllabus.filter(s => s.status === 'Completed').length;
  const overallSyllabusProgress = Math.round((completedChapters / totalChapters) * 100);

  // Class Analytics Calculations
  const classStudentsWithAggregates = currentStudents.map(st => {
    const total = (Number(st.math) || 0) + (Number(st.science) || 0) + (Number(st.english) || 0) + (Number(st.hindi) || 0) + (Number(st.computer) || 0);
    const pct = Math.round((total / 500) * 100);
    const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';
    return { ...st, total, pct, grade };
  });

  const sortedByMarks = [...classStudentsWithAggregates].sort((a, b) => b.total - a.total);
  const classAvgPct = classStudentsWithAggregates.length ? Math.round(classStudentsWithAggregates.reduce((acc, s) => acc + s.pct, 0) / classStudentsWithAggregates.length) : 0;
  const topRanker = sortedByMarks[0] || null;
  const runnerUp = sortedByMarks[1] || null;
  const thirdRanker = sortedByMarks[2] || null;

  // Weak/Remedial attention students (<75% marks or absent)
  const remedialStudents = classStudentsWithAggregates.filter(st => st.pct < 75 || !st.present);

  // Subject averages
  const calcSubjectAvg = (sub) => {
    if (!currentStudents.length) return 0;
    const sum = currentStudents.reduce((acc, s) => acc + (Number(s[sub]) || 0), 0);
    return Math.round(sum / currentStudents.length);
  };
  const mathAvg = calcSubjectAvg('math');
  const scienceAvg = calcSubjectAvg('science');
  const englishAvg = calcSubjectAvg('english');
  const hindiAvg = calcSubjectAvg('hindi');
  const computerAvg = calcSubjectAvg('computer');

  const unreadNoticesCount = noticesList.filter(n => !n.read).length;

  // Structured Modular Navigation Sections
  const navSections = [
    {
      id: 'classroom',
      title: 'Classroom Core',
      icon: 'fa-solid fa-chalkboard-user',
      items: [
        { id: 'attendance', label: 'Daily Attendance Register', icon: 'fa-solid fa-clipboard-user', badge: `${presentCount}/${currentStudents.length}` },
        { id: 'marks', label: 'Gradebook & Report Cards', icon: 'fa-solid fa-file-signature' },
        { id: 'homework', label: 'Assignments & Homework', icon: 'fa-solid fa-book-open-reader', badge: homeworkList.length, badgeColor: 'amber' },
        { id: 'timetable', label: 'Class Timetable', icon: 'fa-solid fa-calendar-week' },
      ]
    },
    {
      id: 'academics',
      title: 'Academic & Curriculum',
      icon: 'fa-solid fa-book-bookmark',
      items: [
        { id: 'syllabus', label: 'Curriculum & Syllabus', icon: 'fa-solid fa-list-check', badge: `${overallSyllabusProgress}%`, badgeColor: 'green' },
        { id: 'materials', label: 'Study Materials & Notes', icon: 'fa-solid fa-folder-open', badge: materialsList.length, badgeColor: 'blue' },
        { id: 'questionBank', label: 'Question Bank & Tests', icon: 'fa-solid fa-feather-pointed', badge: questionsList.length, badgeColor: 'purple' },
      ]
    },
    {
      id: 'studentCare',
      title: 'Student Tracking & Care',
      icon: 'fa-solid fa-chart-line',
      items: [
        { id: 'analytics', label: 'Performance Analytics', icon: 'fa-solid fa-chart-pie', badge: 'Live', badgeColor: 'emerald' },
        { id: 'diary', label: 'Student Conduct Diary', icon: 'fa-solid fa-id-badge', badge: diaryList.length, badgeColor: 'purple' },
        { id: 'ptm', label: 'Parent-Teacher (PTM)', icon: 'fa-solid fa-comments', badge: ptmList.length, badgeColor: 'amber' },
      ]
    },
    {
      id: 'facultyDesk',
      title: 'Faculty Workspace & Desk',
      icon: 'fa-solid fa-briefcase',
      items: [
        { id: 'leave', label: 'Leave & Proxy Schedule', icon: 'fa-solid fa-person-chalkboard', badge: proxySchedule.length, badgeColor: 'rose' },
        { id: 'notices', label: 'Staff Notices & Circulars', icon: 'fa-solid fa-bullhorn', badge: unreadNoticesCount > 0 ? unreadNoticesCount : undefined, badgeColor: 'amber' },
      ]
    }
  ];

  const normalizedSearch = sidebarSearch.trim().toLowerCase();
  const filteredNavSections = navSections.map(sec => {
    if (!normalizedSearch) return sec;
    const matchingItems = sec.items.filter(item =>
      item.label.toLowerCase().includes(normalizedSearch) ||
      sec.title.toLowerCase().includes(normalizedSearch)
    );
    return {
      ...sec,
      items: matchingItems
    };
  }).filter(sec => !normalizedSearch || sec.items.length > 0);

  return (
    <div className={`teacher-portal-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Fixed Executive Faculty Sidebar with Open/Close Toggle */}
      <aside className="teach-sidebar no-print">
        {/* Sidebar Open/Close Toggle Button */}
        <button
          type="button"
          className="teach-sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label="Toggle Sidebar"
        >
          <i className={`fa-solid ${sidebarCollapsed ? 'fa-angles-right' : 'fa-angles-left'}`}></i>
        </button>

        <div className="teach-brand">
          <div className="teach-brand-content">
            <div className="teach-brand-badge">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="teach-brand-info">
              <h3>LBMDPS</h3>
              <span>Faculty Academic Hub</span>
            </div>
          </div>
          <div className="teach-system-pill">
            <span className="live-pulse"></span>
            <span>Academic Portal Live</span>
          </div>
        </div>

        {/* Sidebar Fast Search & Quick Controls */}
        {!sidebarCollapsed && (
          <div className="teach-sidebar-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              placeholder="Search modules & tools..."
              aria-label="Search navigation"
            />
            {sidebarSearch && (
              <button type="button" onClick={() => setSidebarSearch('')} title="Clear search">
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        )}

        {/* Quick Expand / Collapse Section Toggle */}
        {!sidebarCollapsed && !sidebarSearch && (
          <div className="teach-sidebar-quick-toggles">
            <span className="quick-toggle-lbl">ACADEMIC MODULES</span>
            <div className="quick-toggle-btns">
              <button
                type="button"
                className="section-mini-toggle"
                onClick={() => toggleAllSections(true)}
                title="Expand all sections"
              >
                Expand all
              </button>
              <span className="toggle-dot">•</span>
              <button
                type="button"
                className="section-mini-toggle"
                onClick={() => toggleAllSections(false)}
                title="Collapse all sections"
              >
                Collapse
              </button>
            </div>
          </div>
        )}

        {/* Modular Categorized Navigation */}
        <nav className="teach-nav">
          {filteredNavSections.map((section) => (
            <div key={section.id} className="teach-nav-section">
              {!sidebarCollapsed && (
                <button
                  type="button"
                  className="teach-nav-section-header"
                  onClick={() => toggleSection(section.id)}
                  title={`Toggle ${section.title}`}
                >
                  <span className="section-title-wrap">
                    <i className={section.icon}></i>
                    <span>{section.title}</span>
                  </span>
                  <i className={`fa-solid fa-chevron-${openSections[section.id] || sidebarSearch ? 'down' : 'right'} section-chevron`}></i>
                </button>
              )}

              {(openSections[section.id] || sidebarSearch || sidebarCollapsed) && (
                <div className="teach-nav-section-items">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      title={item.label}
                      className={`teach-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <div className="nav-icon-wrap"><i className={item.icon}></i></div>
                      {!sidebarCollapsed && <span>{item.label}</span>}
                      {!sidebarCollapsed && item.badge !== undefined && item.badge !== null && item.badge !== '' && (
                        <span className={`teach-nav-badge ${item.badgeColor ? `badge-${item.badgeColor}` : ''}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {normalizedSearch && filteredNavSections.length === 0 && (
            <p className="teach-sidebar-empty">No matching modules found.</p>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="teach-sidebar-footer">
          <div className="teach-user-badge">
            <div className="user-avatar-circle">
              <i className="fa-solid fa-chalkboard-user"></i>
            </div>
            <div className="user-meta">
              <span className="teach-role-lbl">Active Role:</span>
              <strong>Senior Faculty / Class Teacher</strong>
              <small>Session 2026–2027</small>
            </div>
          </div>
          <button className="teach-logout-btn" onClick={handleLogout} title="Log Out">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="teach-main">
        {/* Topbar */}
        <header className="teach-topbar no-print">
          <div className="teach-topbar-left">
            <button
              type="button"
              className="teach-topbar-sidebar-toggle no-print"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Expand Sidebar (Open)" : "Collapse Sidebar (Close)"}
              aria-label="Toggle Sidebar"
            >
              <i className={`fa-solid ${sidebarCollapsed ? 'fa-bars-staggered' : 'fa-bars'}`}></i>
            </button>
            <div className="teach-topbar-info">
              <div className="teach-topbar-title-row">
                <span className="teach-school-tag">CBSE AFFILIATED #3430398</span>
                <h1>Faculty Academic & Classroom Hub</h1>
                <span className="teach-session-tag">Academic Session 2026–2027</span>
              </div>
            <div className="teach-topbar-meta-strip">
              <span className="clock-chip">
                <i className="fa-solid fa-clock"></i> {currentDateTime || 'Connecting...'}
              </span>
              <span className="location-chip">
                <i className="fa-solid fa-location-dot"></i> Village Naitand, Giridih
              </span>
            </div>
          </div>
          </div>

          <div className="teach-topbar-right">
            <div className="teach-nav-chips">
              {isSuperAdmin && (
                <>
                  <Link to="/admin/dashboard" className="teach-chip-link chip-blue" title="Open Admin Portal (Super Admin Exclusive)">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Admin</span>
                  </Link>
                  <Link to="/accountant/dashboard" className="teach-chip-link chip-green" title="Open Accounts Portal (Super Admin Exclusive)">
                    <i className="fa-solid fa-wallet"></i>
                    <span>Accounts</span>
                  </Link>
                </>
              )}
              <Link to="/" target="_blank" rel="noopener noreferrer" className="teach-chip-link chip-amber" title="Open Live School Website">
                <i className="fa-solid fa-globe"></i>
                <span>School Website</span>
              </Link>
            </div>

            <button className="teach-topbar-logout" onClick={handleLogout} title="Log Out">
              <i className="fa-solid fa-power-off"></i>
            </button>
          </div>
        </header>

        {/* Global Class & Date Selector Header Strip */}
        <section className="teach-control-strip no-print">
          <div className="control-strip-item">
            <label>
              <i className="fa-solid fa-chalkboard"></i> Active Class:
            </label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {Object.keys(classData).map(cls => (
                <option key={cls} value={cls}>{cls} ({classData[cls].length} Enrolled)</option>
              ))}
            </select>
          </div>

          <div className="control-strip-item">
            <label>
              <i className="fa-solid fa-calendar-days"></i> Register Date:
            </label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
          </div>

          <div className="control-strip-item search-item">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search student by name or roll number..."
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
            />
            {searchStudent && <button className="clear-btn" onClick={() => setSearchStudent('')}>×</button>}
          </div>
        </section>

        {/* Quick Metrics */}
        <section className="teach-metrics-grid no-print">
          <div className="teach-metric-card blue">
            <div className="teach-metric-icon-box blue">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="teach-metric-details">
              <p>Enrolled Students</p>
              <h3>{currentStudents.length} Students</h3>
              <small className="teach-metric-badge blue">{selectedClass} Roster</small>
            </div>
          </div>

          <div className="teach-metric-card green">
            <div className="teach-metric-icon-box green">
              <i className="fa-solid fa-user-check"></i>
            </div>
            <div className="teach-metric-details">
              <p>Today's Present</p>
              <h3>{presentCount} / {currentStudents.length}</h3>
              <small className="teach-metric-badge green">{attendanceRate}% Attendance</small>
            </div>
          </div>

          <div className="teach-metric-card amber">
            <div className="teach-metric-icon-box amber">
              <i className="fa-solid fa-user-xmark"></i>
            </div>
            <div className="teach-metric-details">
              <p>Today's Absent</p>
              <h3>{currentStudents.length - presentCount} Students</h3>
              <small className="teach-metric-badge amber">SMS Alerts Enabled</small>
            </div>
          </div>

          <div className="teach-metric-card purple">
            <div className="teach-metric-icon-box purple">
              <i className="fa-solid fa-book"></i>
            </div>
            <div className="teach-metric-details">
              <p>Curriculum Progress</p>
              <h3>{overallSyllabusProgress}% Done</h3>
              <small className="teach-metric-badge purple">{completedChapters}/{totalChapters} Chapters</small>
            </div>
          </div>
        </section>

        {saveStatus && (
          <div className="teach-status-banner no-print">
            <i className="fa-solid fa-circle-check"></i>
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Tab 1: Attendance */}
        {activeTab === 'attendance' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2>Daily Attendance Register ({attendanceDate})</h2>
                <p className="card-subtitle">Mark daily attendance for {selectedClass}. Click toggle or use fast bulk actions.</p>
              </div>

              <div className="teach-header-actions no-print">
                <button className="teach-btn-alt" onClick={() => markAll(true)}>
                  <i className="fa-solid fa-check-double"></i> Mark All Present
                </button>
                <button className="teach-btn-alt danger" onClick={() => markAll(false)}>
                  <i className="fa-solid fa-xmark"></i> Mark All Absent
                </button>
                <button className="teach-btn-primary" onClick={handleSaveAttendance}>
                  <i className="fa-solid fa-floppy-disk"></i> Save Attendance
                </button>
                <button className="teach-btn-alt" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Register
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="teach-table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Full Name</th>
                    <th>Class</th>
                    <th>Attendance Status</th>
                    <th className="no-print">Toggle Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedStudents.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                        No students found matching your search.
                      </td>
                    </tr>
                  ) : (
                    displayedStudents.map((st) => (
                      <tr key={st.rollNo} className={st.present ? 'row-present' : 'row-absent'}>
                        <td><strong className="roll-pill">#{st.rollNo}</strong></td>
                        <td><strong>{st.name}</strong></td>
                        <td><span className="class-badge">{selectedClass}</span></td>
                        <td>
                          <span className={`status-pill ${st.present ? 'present' : 'absent'}`}>
                            <i className={`fa-solid fa-${st.present ? 'check' : 'xmark'}`}></i>
                            {st.present ? 'PRESENT' : 'ABSENT'}
                          </span>
                        </td>
                        <td className="no-print">
                          <button
                            type="button"
                            className={`toggle-att-btn ${st.present ? 'is-present' : 'is-absent'}`}
                            onClick={() => toggleAttendance(st.rollNo)}
                          >
                            {st.present ? 'Mark Absent' : 'Mark Present'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="teach-card-footer no-print">
              <div className="attendance-progress-bar-wrap">
                <div className="progress-label">
                  <span>Class Attendance Rate:</span>
                  <strong>{attendanceRate}% ({presentCount}/{currentStudents.length} Present)</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${attendanceRate}%` }}></div>
                </div>
              </div>
              <button className="teach-btn-primary" onClick={handleSaveAttendance}>
                <i className="fa-solid fa-floppy-disk"></i> Save & Lock Register
              </button>
            </div>
          </section>
        )}

        {/* Tab 2: Gradebook / Marks */}
        {activeTab === 'marks' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2>Term 1 Gradebook & Academic Marksheets ({selectedClass})</h2>
                <p className="card-subtitle">Enter subject marks out of 100. Aggregates and grades calculate automatically. Click "Report Card" to preview and print.</p>
              </div>

              <div className="teach-header-actions no-print">
                <button className="teach-btn-primary" onClick={handleSaveGradebook}>
                  <i className="fa-solid fa-floppy-disk"></i> Save Gradebook
                </button>
                <button className="teach-btn-alt" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Gradebook
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="teach-table marks-table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Math (100)</th>
                    <th>Science (100)</th>
                    <th>English (100)</th>
                    <th>Hindi (100)</th>
                    <th>Comp (100)</th>
                    <th>Total (500)</th>
                    <th>%</th>
                    <th>Grade</th>
                    <th className="no-print">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedStudents.map((st) => {
                    const total = (st.math || 0) + (st.science || 0) + (st.english || 0) + (st.hindi || 0) + (st.computer || 0);
                    const pct = (total / 5).toFixed(1);
                    const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';
                    return (
                      <tr key={st.rollNo}>
                        <td><strong className="roll-pill">#{st.rollNo}</strong></td>
                        <td><strong>{st.name}</strong></td>
                        <td>
                          <input
                            type="number"
                            className="mark-input"
                            value={st.math || 0}
                            onChange={(e) => handleMarksChange(st.rollNo, 'math', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="mark-input"
                            value={st.science || 0}
                            onChange={(e) => handleMarksChange(st.rollNo, 'science', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="mark-input"
                            value={st.english || 0}
                            onChange={(e) => handleMarksChange(st.rollNo, 'english', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="mark-input"
                            value={st.hindi || 0}
                            onChange={(e) => handleMarksChange(st.rollNo, 'hindi', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="mark-input"
                            value={st.computer || 0}
                            onChange={(e) => handleMarksChange(st.rollNo, 'computer', e.target.value)}
                          />
                        </td>
                        <td><strong className="total-score">{total}</strong></td>
                        <td><strong className="pct-score">{pct}%</strong></td>
                        <td>
                          <span className={`grade-tag grade-${grade.toLowerCase().replace('+', '-plus')}`}>
                            {grade}
                          </span>
                        </td>
                        <td className="no-print">
                          <button
                            type="button"
                            className="view-report-btn"
                            onClick={() => setSelectedReportStudent({ ...st, total, pct, grade })}
                            title="Generate official printable report card"
                          >
                            <i className="fa-solid fa-file-invoice"></i> Report Card
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab 3: Homework */}
        {activeTab === 'homework' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2>Assign Homework & Class Tasks</h2>
                <p className="card-subtitle">Publish homework assignments and manage their review status for students and parents.</p>
              </div>
            </div>

            <form onSubmit={handleAddHomework} className="hw-entry-form no-print">
              <div className="form-row-4">
                <label>
                  <span>Target Class *</span>
                  <select value={hwClass} onChange={(e) => setHwClass(e.target.value)}>
                    {Object.keys(classData).map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Subject *</span>
                  <select value={hwSubject} onChange={(e) => setHwSubject(e.target.value)}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science (Physics/Chem/Bio)</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Computer">Computer Science</option>
                  </select>
                </label>

                <label style={{ gridColumn: 'span 2' }}>
                  <span>Assignment Title & Tasks *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chapter 4 Exercise 4.2 Questions 1 to 12 in Fair Notebook"
                    value={hwTitle}
                    onChange={(e) => setHwTitle(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-row-2" style={{ alignItems: 'flex-end', marginTop: 12 }}>
                <label>
                  <span>Submission Due Date *</span>
                  <input
                    type="date"
                    value={hwDate}
                    onChange={(e) => setHwDate(e.target.value)}
                  />
                </label>
                <button type="submit" className="teach-btn-primary" style={{ padding: '12px 24px', height: '44px' }}>
                  <i className="fa-solid fa-plus"></i> Publish Assignment
                </button>
              </div>
            </form>

            <h3 style={{ marginTop: '30px', marginBottom: '14px', fontSize: '15px', color: '#0f172a' }}>
              Active Assignments ({homeworkList.length})
            </h3>

            <div className="hw-grid">
              {homeworkList.map((hw) => (
                <div className={`hw-card ${hw.status === 'Reviewed' ? 'hw-reviewed' : ''}`} key={hw.id}>
                  <div className="hw-card-top">
                    <span className="hw-sub-pill">{hw.subject}</span>
                    <span className="hw-class-pill">{hw.class}</span>
                  </div>
                  <h4>{hw.title}</h4>
                  <div className="hw-meta-row">
                    <span><i className="fa-regular fa-calendar"></i> Due: <strong>{hw.dueDate}</strong></span>
                    <span className={`hw-status-tag ${hw.status === 'Reviewed' ? 'reviewed' : 'active'}`}>
                      {hw.status}
                    </span>
                  </div>
                  <div className="hw-card-actions no-print">
                    <button
                      type="button"
                      className="hw-action-btn review-btn"
                      onClick={() => handleToggleHomeworkStatus(hw.id)}
                    >
                      <i className={`fa-solid fa-${hw.status === 'Reviewed' ? 'rotate-left' : 'check'}`}></i>
                      {hw.status === 'Reviewed' ? 'Mark Active' : 'Mark Reviewed'}
                    </button>
                    <button
                      type="button"
                      className="hw-action-btn delete-btn"
                      onClick={() => handleDeleteHomework(hw.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: Timetable */}
        {activeTab === 'timetable' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2>Weekly Academic Routine & Timetable ({selectedClass})</h2>
                <p className="card-subtitle">Official period breakdown as per the Central Board curriculum schedule.</p>
              </div>
              <button className="teach-btn-alt no-print" onClick={() => window.print()}>
                <i className="fa-solid fa-print"></i> Print Routine
              </button>
            </div>

            <div className="table-responsive">
              <table className="teach-table timetable-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Period 1<br /><small>08:00 - 08:45</small></th>
                    <th>Period 2<br /><small>08:45 - 09:30</small></th>
                    <th>Period 3<br /><small>09:45 - 10:30</small></th>
                    <th>Period 4<br /><small>10:30 - 11:15</small></th>
                    <th>Lunch<br /><small>11:15 - 12:00</small></th>
                    <th>Period 5<br /><small>12:00 - 12:45</small></th>
                    <th>Period 6<br /><small>12:45 - 01:30</small></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Monday</strong></td>
                    <td><span className="slot math">Mathematics</span></td>
                    <td><span className="slot science">Physics</span></td>
                    <td><span className="slot lang">English</span></td>
                    <td><span className="slot science">Chemistry</span></td>
                    <td rowSpan="6" className="lunch-cell">LUNCH BREAK</td>
                    <td><span className="slot tech">Computer Science</span></td>
                    <td><span className="slot extra">Library / Reading</span></td>
                  </tr>
                  <tr>
                    <td><strong>Tuesday</strong></td>
                    <td><span className="slot science">Science Lab</span></td>
                    <td><span className="slot science">Science Lab</span></td>
                    <td><span className="slot lang">Hindi</span></td>
                    <td><span className="slot math">Mathematics</span></td>
                    <td><span className="slot sst">Social Studies</span></td>
                    <td><span className="slot sports">Physical Education</span></td>
                  </tr>
                  <tr>
                    <td><strong>Wednesday</strong></td>
                    <td><span className="slot math">Mathematics</span></td>
                    <td><span className="slot lang">English</span></td>
                    <td><span className="slot science">Biology</span></td>
                    <td><span className="slot science">Chemistry</span></td>
                    <td><span className="slot extra">Music & Dance</span></td>
                    <td><span className="slot extra">Arts & Craft</span></td>
                  </tr>
                  <tr>
                    <td><strong>Thursday</strong></td>
                    <td><span className="slot tech">Computer Lab</span></td>
                    <td><span className="slot tech">Computer Lab</span></td>
                    <td><span className="slot math">Mathematics</span></td>
                    <td><span className="slot science">Physics</span></td>
                    <td><span className="slot sst">Social Studies</span></td>
                    <td><span className="slot extra">Moral Science</span></td>
                  </tr>
                  <tr>
                    <td><strong>Friday</strong></td>
                    <td><span className="slot lang">English Literature</span></td>
                    <td><span className="slot math">Mathematics</span></td>
                    <td><span className="slot science">Chemistry</span></td>
                    <td><span className="slot science">Biology</span></td>
                    <td><span className="slot tech">Robotics & AI</span></td>
                    <td><span className="slot sports">Sports Ground</span></td>
                  </tr>
                  <tr>
                    <td><strong>Saturday</strong></td>
                    <td><span className="slot extra">Weekly Assessment</span></td>
                    <td><span className="slot extra">Quiz & Debate</span></td>
                    <td><span className="slot sports">Yoga & Fitness</span></td>
                    <td><span className="slot extra">Club Activity</span></td>
                    <td><span className="slot extra">Co-curricular Events</span></td>
                    <td><span className="slot extra">Class Assembly</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 5: Curriculum & Syllabus Progress Tracker */}
        {activeTab === 'syllabus' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2>Lesson Planning & Curriculum Progress Tracker ({selectedClass})</h2>
                <p className="card-subtitle">Track chapter-wise lesson delivery, NCERT learning outcomes, and term syllabus completion.</p>
              </div>
              <div className="teach-header-actions no-print">
                <span className="teach-badge-pill green">{completedChapters}/{totalChapters} Chapters Completed ({overallSyllabusProgress}%)</span>
              </div>
            </div>

            {/* Add Chapter Form */}
            <form onSubmit={handleAddSyllabusChapter} className="hw-entry-form no-print">
              <div className="form-row-3">
                <label>
                  <span>Subject *</span>
                  <select value={newChapterSub} onChange={(e) => setNewChapterSub(e.target.value)}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Computer">Computer Science</option>
                  </select>
                </label>

                <label>
                  <span>Chapter / Unit Title *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chapter 5: Periodic Classification"
                    value={newChapterName}
                    onChange={(e) => setNewChapterName(e.target.value)}
                  />
                </label>

                <label>
                  <span>Total Planned Periods / Lessons</span>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={newChapterLessons}
                    onChange={(e) => setNewChapterLessons(e.target.value)}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="submit" className="teach-btn-primary">
                  <i className="fa-solid fa-plus"></i> Add Chapter to Syllabus
                </button>
              </div>
            </form>

            {/* Chapters Progress Grid */}
            <div className="syllabus-grid">
              {classSyllabus.map(chap => (
                <div key={chap.id} className="syllabus-card">
                  <div className="syllabus-card-header">
                    <span className="sub-badge">{chap.subject}</span>
                    <span className={`status-badge ${chap.status.toLowerCase().replace(' ', '-')}`}>
                      {chap.status}
                    </span>
                  </div>
                  <h4>{chap.chapter}</h4>
                  <div className="progress-info-row">
                    <span>Delivered: <strong>{chap.completedLessons} / {chap.totalLessons} Lessons</strong></span>
                    <strong className="prog-pct">{chap.progress}%</strong>
                  </div>
                  <div className="progress-track" style={{ height: 8, margin: '8px 0 14px' }}>
                    <div className="progress-fill" style={{ width: `${chap.progress}%`, background: chap.progress === 100 ? '#10b981' : '#6366f1' }}></div>
                  </div>
                  <div className="syllabus-card-actions no-print">
                    <button
                      type="button"
                      className="prog-btn minus"
                      onClick={() => handleUpdateChapterProgress(chap.id, -1)}
                      title="Decrease completed lessons"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="current-count">{chap.completedLessons}</span>
                    <button
                      type="button"
                      className="prog-btn plus"
                      onClick={() => handleUpdateChapterProgress(chap.id, 1)}
                      title="Mark next lesson completed"
                    >
                      <i className="fa-solid fa-plus"></i> Mark Lesson Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* NEW TAB 6: Student Conduct & Behavior Diary */}
        {activeTab === 'diary' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2>Student Conduct, Discipline & Achievement Diary ({selectedClass})</h2>
                <p className="card-subtitle">Record student star achievements, academic milestones, and disciplinary notices for parent counseling.</p>
              </div>
            </div>

            {/* Add Diary Form */}
            <form onSubmit={handleAddDiaryEntry} className="hw-entry-form no-print">
              <div className="form-row-3">
                <label>
                  <span>Select Student *</span>
                  <select value={diaryStudentName} onChange={(e) => setDiaryStudentName(e.target.value)} required>
                    <option value="">-- Choose Student --</option>
                    {currentStudents.map(st => (
                      <option key={st.rollNo} value={st.name}>#{st.rollNo} - {st.name}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Observation Category *</span>
                  <select value={diaryCategory} onChange={(e) => setDiaryCategory(e.target.value)}>
                    <option value="Star Student of the Week">🌟 Star Student of the Week</option>
                    <option value="Academic Excellence">📈 Academic Excellence / Improvement</option>
                    <option value="Homework Incomplete">📝 Incomplete Homework / Classwork</option>
                    <option value="Punctuality & Attendance">⏰ Late Coming / Punctuality Issue</option>
                    <option value="Disciplinary Conduct">⚠️ Class Discipline & Conduct Warning</option>
                  </select>
                </label>

                <label>
                  <span>Teacher's Note / Remark *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scored full marks in surprise test and helped peers"
                    value={diaryNote}
                    onChange={(e) => setDiaryNote(e.target.value)}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="submit" className="teach-btn-primary">
                  <i className="fa-solid fa-check"></i> Log Diary Observation
                </button>
              </div>
            </form>

            {/* Observations Table */}
            <div className="table-responsive" style={{ marginTop: 24 }}>
              <table className="teach-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Category</th>
                    <th>Observation / Teacher Remarks</th>
                    <th>Date</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {diaryList.map(item => (
                    <tr key={item.id}>
                      <td><strong>{item.studentName}</strong></td>
                      <td><span className="class-badge">{item.class}</span></td>
                      <td><span className="diary-cat-pill">{item.category}</span></td>
                      <td>{item.note}</td>
                      <td>{item.date}</td>
                      <td>
                        <span className={`status-pill ${item.rating === 'Excellent' ? 'present' : 'absent'}`}>
                          {item.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 7: Faculty Leave & Proxy Schedule */}
        {activeTab === 'leave' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2>Faculty Leave Application & Proxy / Substitution Desk</h2>
                <p className="card-subtitle">Apply for teacher leave and view assigned proxy substitution periods for absent colleagues.</p>
              </div>
            </div>

            {/* Today's Substitution Classes Alert */}
            <div className="proxy-highlight-card">
              <h3><i className="fa-solid fa-chalkboard-user"></i> Today's Assigned Proxy / Substitution Periods</h3>
              <p>You have been assigned to cover the following classes for colleagues on authorized leave:</p>
              <div className="table-responsive">
                <table className="teach-table">
                  <thead>
                    <tr>
                      <th>Period & Time</th>
                      <th>Class & Section</th>
                      <th>Subject</th>
                      <th>Assigned Room</th>
                      <th>Absent Colleague</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proxySchedule.map(px => (
                      <tr key={px.id}>
                        <td><strong>{px.period}</strong></td>
                        <td><span className="class-badge">{px.class}</span></td>
                        <td><strong>{px.subject}</strong></td>
                        <td>{px.room}</td>
                        <td><span style={{ color: '#be123c' }}>{px.absentTeacher}</span></td>
                        <td><span className="status-pill present">{px.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Leave Application Form */}
            <h3 style={{ marginTop: 28, marginBottom: 14, fontSize: 16 }}>Apply for Faculty Leave</h3>
            <form onSubmit={handleApplyLeave} className="hw-entry-form no-print">
              <div className="form-row-3">
                <label>
                  <span>Leave Type *</span>
                  <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                    <option value="Casual Leave">Casual Leave (CL)</option>
                    <option value="Medical Leave">Medical Leave (ML)</option>
                    <option value="Duty Leave">On-Duty Leave (OD)</option>
                    <option value="Half Day">Half Day (Session 1/2)</option>
                  </select>
                </label>

                <label>
                  <span>Start Date *</span>
                  <input
                    type="date"
                    required
                    value={leaveStartDate}
                    onChange={(e) => setLeaveStartDate(e.target.value)}
                  />
                </label>

                <label>
                  <span>End Date</span>
                  <input
                    type="date"
                    value={leaveEndDate}
                    onChange={(e) => setLeaveEndDate(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-row-2">
                <label style={{ gridColumn: 'span 2' }}>
                  <span>Reason for Leave *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Urgent family work in Ranchi"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                <button type="submit" className="teach-btn-primary">
                  <i className="fa-solid fa-paper-plane"></i> Submit Leave Request to Principal
                </button>
              </div>
            </form>

            <h3 style={{ marginTop: 28, marginBottom: 14, fontSize: 16 }}>Your Leave History</h3>
            <div className="table-responsive">
              <table className="teach-table">
                <thead>
                  <tr>
                    <th>Leave ID</th>
                    <th>Leave Category</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map(lv => (
                    <tr key={lv.id}>
                      <td><strong className="roll-pill">{lv.id}</strong></td>
                      <td><strong>{lv.leaveType}</strong></td>
                      <td>{lv.fromDate}</td>
                      <td>{lv.toDate}</td>
                      <td>{lv.reason}</td>
                      <td>
                        <span className={`status-pill ${lv.status === 'Approved' ? 'present' : 'pending'}`}>
                          {lv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 8: Parent-Teacher Meeting (PTM) Desk */}
        {activeTab === 'ptm' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2>Parent-Teacher Meeting (PTM) & Parent Communication Desk ({selectedClass})</h2>
                <p className="card-subtitle">Record meeting conferences, academic counseling feedback, and follow-up communication.</p>
              </div>
            </div>

            {/* Add PTM Form */}
            <form onSubmit={handleAddPtmRecord} className="hw-entry-form no-print">
              <div className="form-row-3">
                <label>
                  <span>Student Name *</span>
                  <select value={ptmStudentName} onChange={(e) => setPtmStudentName(e.target.value)} required>
                    <option value="">-- Select Student --</option>
                    {currentStudents.map(st => (
                      <option key={st.rollNo} value={st.name}>#{st.rollNo} - {st.name}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Parent / Guardian Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sri Ramesh Verma"
                    value={ptmParentName}
                    onChange={(e) => setPtmParentName(e.target.value)}
                  />
                </label>

                <label>
                  <span>Contact Phone</span>
                  <input
                    type="text"
                    placeholder="e.g. +91 94313 78901"
                    value={ptmPhone}
                    onChange={(e) => setPtmPhone(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-row-2">
                <label>
                  <span>Discussion Agenda / Topic *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Term 1 Performance & Attendance Counseling"
                    value={ptmTopic}
                    onChange={(e) => setPtmTopic(e.target.value)}
                  />
                </label>

                <label>
                  <span>Discussion Notes & Parent Agreement</span>
                  <input
                    type="text"
                    placeholder="e.g. Parent assured 2 hours daily evening study"
                    value={ptmFeedback}
                    onChange={(e) => setPtmFeedback(e.target.value)}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                <button type="submit" className="teach-btn-primary">
                  <i className="fa-solid fa-calendar-check"></i> Record PTM Conference
                </button>
              </div>
            </form>

            {/* PTM Conferences Table */}
            <div className="table-responsive" style={{ marginTop: 24 }}>
              <table className="teach-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Student Name</th>
                    <th>Parent / Guardian</th>
                    <th>Agenda & Discussion Notes</th>
                    <th>Date & Time</th>
                    <th>Follow-up Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ptmList.map(ptm => (
                    <tr key={ptm.id}>
                      <td><strong className="roll-pill">{ptm.id}</strong></td>
                      <td><strong>{ptm.studentName}</strong></td>
                      <td>{ptm.parentName}<br /><small className="text-muted">{ptm.phone}</small></td>
                      <td>
                        <strong>{ptm.topic}</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#475569' }}>{ptm.feedback}</p>
                      </td>
                      <td>{ptm.date} ({ptm.time})</td>
                      <td>
                        <span className={`status-pill ${ptm.status === 'Completed' ? 'present' : 'pending'}`}>
                          {ptm.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 9: Study Materials & Digital E-Notes Hub */}
        {activeTab === 'materials' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2><i className="fa-solid fa-folder-open" style={{ color: '#3b82f6', marginRight: 8 }}></i> Study Materials & E-Notes Repository ({selectedClass})</h2>
                <p className="card-subtitle">Upload chapter summaries, formula sheets, sample assignments, and PDF resources for students.</p>
              </div>
              <div className="teach-header-actions no-print">
                <span className="teach-badge-pill blue">
                  <i className="fa-solid fa-file-pdf" style={{ marginRight: 5 }}></i> {materialsList.length} Active Resources
                </span>
              </div>
            </div>

            {/* Upload / Add Note Form */}
            <form onSubmit={handleAddMaterial} className="hw-entry-form no-print">
              <div className="form-row-4">
                <label>
                  <span>Curricular Subject *</span>
                  <select value={newMatSubject} onChange={(e) => setNewMatSubject(e.target.value)} required>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science (Phy/Chem/Bio)</option>
                    <option value="English">English Literature & Grammar</option>
                    <option value="Hindi">Hindi (Course A)</option>
                    <option value="Social Science">Social Science (His/Geo/Civ)</option>
                    <option value="Computer Science">Computer Science & AI</option>
                  </select>
                </label>

                <label>
                  <span>Material / Note Title *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chapter 1 Formula Sheet & NCERT Solutions"
                    value={newMatTitle}
                    onChange={(e) => setNewMatTitle(e.target.value)}
                  />
                </label>

                <label>
                  <span>Chapter / Topic Name</span>
                  <input
                    type="text"
                    placeholder="e.g. Real Numbers & Polynomials"
                    value={newMatChapter}
                    onChange={(e) => setNewMatChapter(e.target.value)}
                  />
                </label>

                <label>
                  <span>Resource Format</span>
                  <select value={newMatType} onChange={(e) => setNewMatType(e.target.value)}>
                    <option value="PDF Document">PDF Document</option>
                    <option value="Study Guide">Study Guide (Word/Doc)</option>
                    <option value="Revision Sheet">Revision Sheet / Map</option>
                    <option value="Video Lecture Link">Video Lecture / E-Book</option>
                  </select>
                </label>
              </div>

              <div className="form-actions-row">
                <button type="submit" className="teach-btn-primary">
                  <i className="fa-solid fa-cloud-arrow-up"></i> Publish Study Material
                </button>
              </div>
            </form>

            {/* Subject Filter Bar */}
            <div className="table-filter-bar no-print">
              <div className="filter-pill-group">
                <span className="filter-label"><i className="fa-solid fa-filter"></i> Subject Filter:</span>
                {['All', 'Mathematics', 'Science', 'English'].map(sub => (
                  <button
                    key={sub}
                    type="button"
                    className={`filter-pill ${matSubjectFilter === sub ? 'active' : ''}`}
                    onClick={() => setMatSubjectFilter(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Materials Grid / Table */}
            <div className="table-responsive">
              <table className="teach-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Document / Material Title</th>
                    <th>Subject</th>
                    <th>Chapter / Unit</th>
                    <th>Format & Size</th>
                    <th>Published On</th>
                    <th className="no-print">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {materialsList
                    .filter(m => matSubjectFilter === 'All' || m.subject.toLowerCase().includes(matSubjectFilter.toLowerCase()))
                    .map(item => (
                      <tr key={item.id}>
                        <td><strong className="roll-pill">{item.id}</strong></td>
                        <td>
                          <strong>{item.title}</strong>
                          <p style={{ margin: '2px 0 0 0', fontSize: 11, color: '#64748b' }}>
                            <i className="fa-solid fa-user-pen"></i> By {item.author || 'Senior Faculty'}
                          </p>
                        </td>
                        <td><span className="entry-class-pill">{item.subject}</span></td>
                        <td>{item.chapter}</td>
                        <td>
                          <span className="doc-format-pill"><i className="fa-solid fa-file-lines"></i> {item.type}</span>
                          <small style={{ display: 'block', color: '#94a3b8', marginTop: 2 }}>{item.size || '2.0 MB'} • {item.pages || '10 Pages'}</small>
                        </td>
                        <td>{item.uploadedOn}</td>
                        <td className="no-print">
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              type="button"
                              className="teach-btn-alt"
                              onClick={() => {
                                setSaveStatus(`✓ Downloading "${item.title}" (${item.type})...`);
                                setTimeout(() => setSaveStatus(''), 3000);
                              }}
                              title="Download document"
                            >
                              <i className="fa-solid fa-download"></i>
                            </button>
                            <button
                              type="button"
                              className="teach-btn-alt danger"
                              onClick={() => handleDeleteMaterial(item.id)}
                              title="Delete resource"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {!materialsList.filter(m => matSubjectFilter === 'All' || m.subject.toLowerCase().includes(matSubjectFilter.toLowerCase())).length && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: 28, color: '#94a3b8' }}>
                        No study materials found for this filter. Use the form above to publish new notes!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 10: Question Bank & Test Paper Generator */}
        {activeTab === 'questionBank' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2><i className="fa-solid fa-feather-pointed" style={{ color: '#8b5cf6', marginRight: 8 }}></i> CBSE Question Bank & Test Paper Builder ({selectedClass})</h2>
                <p className="card-subtitle">Curate CBSE standard questions, allocate marks, and generate official printable class test papers.</p>
              </div>
              <div className="teach-header-actions no-print">
                <button
                  type="button"
                  className="teach-btn-primary"
                  onClick={() => setShowTestPaperModal(true)}
                  title="Generate printable test paper with school letterhead"
                >
                  <i className="fa-solid fa-file-circle-plus"></i> Generate Printable Class Test
                </button>
              </div>
            </div>

            {/* Add Question Form */}
            <form onSubmit={handleAddQuestion} className="hw-entry-form no-print">
              <div className="form-row-4">
                <label>
                  <span>Curricular Subject *</span>
                  <select value={newQSubject} onChange={(e) => setNewQSubject(e.target.value)} required>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Social Science">Social Science</option>
                  </select>
                </label>

                <label>
                  <span>Chapter / Topic *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Real Numbers / Optics"
                    value={newQChapter}
                    onChange={(e) => setNewQChapter(e.target.value)}
                  />
                </label>

                <label>
                  <span>Question Type *</span>
                  <select
                    value={newQType}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewQType(val);
                      if (val.includes('1 Mark')) setNewQMarks(1);
                      else if (val.includes('2 Marks')) setNewQMarks(2);
                      else if (val.includes('3 Marks')) setNewQMarks(3);
                      else if (val.includes('5 Marks')) setNewQMarks(5);
                    }}
                  >
                    <option value="MCQ (1 Mark)">MCQ (1 Mark)</option>
                    <option value="Short Answer (2 Marks)">Short Answer (2 Marks)</option>
                    <option value="Concept Proof (3 Marks)">Concept Proof (3 Marks)</option>
                    <option value="Long Answer (5 Marks)">Long Answer (5 Marks)</option>
                  </select>
                </label>

                <label>
                  <span>Mark Weightage</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newQMarks}
                    onChange={(e) => setNewQMarks(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="form-row-2">
                <label>
                  <span>Question Text *</span>
                  <textarea
                    rows="2"
                    required
                    placeholder="Type complete question with instructions..."
                    value={newQText}
                    onChange={(e) => setNewQText(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, resize: 'vertical' }}
                  />
                </label>

                <label>
                  <span>CBSE Marking Scheme / Solution Hint</span>
                  <textarea
                    rows="2"
                    placeholder="Provide marking breakdown or formula steps for teachers..."
                    value={newQHint}
                    onChange={(e) => setNewQHint(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, resize: 'vertical' }}
                  />
                </label>
              </div>

              <div className="form-actions-row">
                <button type="submit" className="teach-btn-primary">
                  <i className="fa-solid fa-plus"></i> Add Question to Bank
                </button>
              </div>
            </form>

            {/* Filter by Subject */}
            <div className="table-filter-bar no-print">
              <div className="filter-pill-group">
                <span className="filter-label"><i className="fa-solid fa-filter"></i> Subject Filter:</span>
                {['All', 'Mathematics', 'Science'].map(sub => (
                  <button
                    key={sub}
                    type="button"
                    className={`filter-pill ${qSubjectFilter === sub ? 'active' : ''}`}
                    onClick={() => setQSubjectFilter(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions Table */}
            <div className="table-responsive">
              <table className="teach-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Subject & Chapter</th>
                    <th>Question Details</th>
                    <th>Type</th>
                    <th>Marks</th>
                    <th className="no-print">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questionsList
                    .filter(q => qSubjectFilter === 'All' || q.subject.toLowerCase() === qSubjectFilter.toLowerCase())
                    .map(q => (
                      <tr key={q.id}>
                        <td><strong className="roll-pill">{q.id}</strong></td>
                        <td>
                          <strong>{q.subject}</strong>
                          <small style={{ display: 'block', color: '#64748b' }}>{q.chapter}</small>
                        </td>
                        <td>
                          <p style={{ margin: 0, fontWeight: 600, color: '#1e293b' }}>{q.question}</p>
                          {q.options && (
                            <div style={{ display: 'flex', gap: 10, marginTop: 4, flexWrap: 'wrap', fontSize: 12, color: '#475569' }}>
                              {q.options.map((opt, i) => <span key={i} style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>{opt}</span>)}
                            </div>
                          )}
                          {q.answerHint && (
                            <small style={{ display: 'block', color: '#059669', marginTop: 4, fontStyle: 'italic' }}>
                              💡 Hint: {q.answerHint}
                            </small>
                          )}
                        </td>
                        <td><span className="doc-format-pill">{q.type}</span></td>
                        <td><span className="teach-badge-pill blue">{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}</span></td>
                        <td className="no-print">
                          <button
                            type="button"
                            className="teach-btn-alt danger"
                            onClick={() => handleDeleteQuestion(q.id)}
                            title="Delete question"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 11: Performance Analytics & Merit Leaderboard */}
        {activeTab === 'analytics' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2><i className="fa-solid fa-chart-line" style={{ color: '#10b981', marginRight: 8 }}></i> Academic Performance Analytics & Merit Stars ({selectedClass})</h2>
                <p className="card-subtitle">Real-time aggregate data, class toppers podium, subject averages, and remedial student alerts.</p>
              </div>
              <div className="teach-header-actions no-print">
                <button
                  type="button"
                  className="teach-btn-primary"
                  onClick={() => window.print()}
                  title="Print Performance Sheet"
                >
                  <i className="fa-solid fa-print"></i> Print Class Analytics
                </button>
              </div>
            </div>

            {/* Top 4 Analytical KPI Cards */}
            <div className="teach-metrics-grid" style={{ marginBottom: 24 }}>
              <div className="teach-metric-card blue">
                <div className="teach-metric-icon-box blue"><i className="fa-solid fa-calculator"></i></div>
                <div className="teach-metric-details">
                  <p>Class Average Marks</p>
                  <h3>{classAvgPct}% Overall</h3>
                  <small className="teach-metric-badge blue">500 Total Base Marks</small>
                </div>
              </div>

              <div className="teach-metric-card green">
                <div className="teach-metric-icon-box green"><i className="fa-solid fa-award"></i></div>
                <div className="teach-metric-details">
                  <p>Highest Class Score</p>
                  <h3>{topRanker ? `${topRanker.pct}%` : 'N/A'}</h3>
                  <small className="teach-metric-badge green">{topRanker ? topRanker.name : 'Roster Active'}</small>
                </div>
              </div>

              <div className="teach-metric-card purple">
                <div className="teach-metric-icon-box purple"><i className="fa-solid fa-certificate"></i></div>
                <div className="teach-metric-details">
                  <p>Pass Rate</p>
                  <h3>100% Passed</h3>
                  <small className="teach-metric-badge purple">Zero Failures Recorded</small>
                </div>
              </div>

              <div className="teach-metric-card amber">
                <div className="teach-metric-icon-box amber"><i className="fa-solid fa-hand-holding-hand"></i></div>
                <div className="teach-metric-details">
                  <p>Remedial Assistance</p>
                  <h3>{remedialStudents.length} Students</h3>
                  <small className="teach-metric-badge amber">Scoring &lt;75% or Absent</small>
                </div>
              </div>
            </div>

            {/* Class Toppers Podium Grid */}
            <div className="analytics-toppers-box" style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="fa-solid fa-crown" style={{ color: '#f59e0b' }}></i> {selectedClass} Academic Merit Stars (Term 1)
              </h3>
              <div className="toppers-podium-grid">
                {topRanker && (
                  <div className="podium-card gold">
                    <div className="podium-medal">🥇 Rank #1</div>
                    <h4>{topRanker.name}</h4>
                    <span className="podium-roll">Roll #{topRanker.rollNo}</span>
                    <div className="podium-score">
                      <strong>{topRanker.total} / 500</strong>
                      <span className="score-pct">({topRanker.pct}%)</span>
                    </div>
                    <span className="podium-grade">Grade {topRanker.grade}</span>
                  </div>
                )}
                {runnerUp && (
                  <div className="podium-card silver">
                    <div className="podium-medal">🥈 Rank #2</div>
                    <h4>{runnerUp.name}</h4>
                    <span className="podium-roll">Roll #{runnerUp.rollNo}</span>
                    <div className="podium-score">
                      <strong>{runnerUp.total} / 500</strong>
                      <span className="score-pct">({runnerUp.pct}%)</span>
                    </div>
                    <span className="podium-grade">Grade {runnerUp.grade}</span>
                  </div>
                )}
                {thirdRanker && (
                  <div className="podium-card bronze">
                    <div className="podium-medal">🥉 Rank #3</div>
                    <h4>{thirdRanker.name}</h4>
                    <span className="podium-roll">Roll #{thirdRanker.rollNo}</span>
                    <div className="podium-score">
                      <strong>{thirdRanker.total} / 500</strong>
                      <span className="score-pct">({thirdRanker.pct}%)</span>
                    </div>
                    <span className="podium-grade">Grade {thirdRanker.grade}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Subject-Wise Proficiency Section */}
            <div className="subject-proficiency-card" style={{ marginBottom: 24, background: '#f8fafc', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 14px 0', fontSize: '1rem', color: '#0f172a' }}>
                <i className="fa-solid fa-bars-progress" style={{ color: '#4f46e5', marginRight: 6 }}></i> Class Average Proficiency by Subject
              </h3>
              <div className="subject-bars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                {[
                  { name: 'Mathematics', avg: mathAvg, color: '#3b82f6' },
                  { name: 'Science', avg: scienceAvg, color: '#10b981' },
                  { name: 'English', avg: englishAvg, color: '#8b5cf6' },
                  { name: 'Hindi', avg: hindiAvg, color: '#f59e0b' },
                  { name: 'Computer Science', avg: computerAvg, color: '#06b6d4' }
                ].map(sub => (
                  <div key={sub.name} className="subject-bar-item" style={{ background: '#ffffff', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div className="subject-bar-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                      <span style={{ fontWeight: 600 }}>{sub.name}</span>
                      <strong style={{ color: sub.color }}>{sub.avg}%</strong>
                    </div>
                    <div className="progress-track" style={{ background: '#e2e8f0', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                      <div className="progress-fill" style={{ width: `${sub.avg}%`, background: sub.color, height: '100%', borderRadius: 4 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remedial Attention Students Table */}
            <div className="table-responsive">
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#0f172a' }}>
                <i className="fa-solid fa-triangle-exclamation" style={{ color: '#f43f5e', marginRight: 6 }}></i> Remedial Attention & Academic Care List
              </h3>
              <table className="teach-table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Aggregate Marks</th>
                    <th>Attendance</th>
                    <th>Status & Recommended Action</th>
                    <th className="no-print">Quick Action</th>
                  </tr>
                </thead>
                <tbody>
                  {remedialStudents.map(st => (
                    <tr key={st.rollNo}>
                      <td><strong className="roll-pill">#{st.rollNo}</strong></td>
                      <td><strong>{st.name}</strong></td>
                      <td>
                        <strong>{st.total} / 500</strong>
                        <span className={`status-pill ${st.pct < 75 ? 'absent' : 'pending'}`} style={{ marginLeft: 6 }}>
                          {st.pct}% ({st.grade})
                        </span>
                      </td>
                      <td>
                        <span className={`status-pill ${st.present ? 'present' : 'absent'}`}>
                          {st.present ? 'Present Today' : 'Absent Today'}
                        </span>
                      </td>
                      <td>
                        {st.pct < 75 ? (
                          <span className="remedial-tag alert">Needs Remedial Practice Worksheets in Math/Science</span>
                        ) : (
                          <span className="remedial-tag warning">Irregular Attendance Follow-up Required</span>
                        )}
                      </td>
                      <td className="no-print">
                        <button
                          type="button"
                          className="teach-btn-alt"
                          onClick={() => {
                            setSaveStatus(`✓ Remedial worksheet assigned to ${st.name} (Roll #${st.rollNo})!`);
                            setTimeout(() => setSaveStatus(''), 4000);
                          }}
                        >
                          <i className="fa-solid fa-file-pen"></i> Assign Remedial
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!remedialStudents.length && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: 24, color: '#10b981', fontWeight: 600 }}>
                        <i className="fa-solid fa-circle-check"></i> Exceptional work! All students in {selectedClass} are performing above benchmark!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* NEW TAB 12: Staff Notices & Academic Circulars */}
        {activeTab === 'notices' && (
          <section className="teach-content-card">
            <div className="teach-card-header">
              <div>
                <h2><i className="fa-solid fa-bullhorn" style={{ color: '#f59e0b', marginRight: 8 }}></i> Staff Notices & Academic Circulars Desk</h2>
                <p className="card-subtitle">Official circulars from CBSE, Principal Office, and Faculty Administrative Announcements.</p>
              </div>
              <div className="teach-header-actions no-print">
                <span className="teach-badge-pill amber">
                  <i className="fa-solid fa-bell"></i> {unreadNoticesCount} Unread Announcements
                </span>
              </div>
            </div>

            {/* Publish Notice Form */}
            <form onSubmit={handleAddNotice} className="hw-entry-form no-print">
              <div className="form-row-3">
                <label>
                  <span>Notice / Circular Title *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Term 1 Practical Exam Marks Verification"
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                  />
                </label>

                <label>
                  <span>Notice Category *</span>
                  <select value={newNoticeCategory} onChange={(e) => setNewNoticeCategory(e.target.value)}>
                    <option value="Academic">Academic / Syllabus</option>
                    <option value="CBSE Official">CBSE Official Circular</option>
                    <option value="Faculty Meeting">Faculty Meeting Memo</option>
                    <option value="Extracurricular">Sports & Extracurricular</option>
                  </select>
                </label>

                <label>
                  <span>Priority Level *</span>
                  <select value={newNoticePriority} onChange={(e) => setNewNoticePriority(e.target.value)}>
                    <option value="Normal">Normal</option>
                    <option value="Important">Important</option>
                    <option value="Urgent">Urgent / High Priority</option>
                  </select>
                </label>
              </div>

              <div className="form-row-1" style={{ marginTop: 10 }}>
                <label>
                  <span>Announcement Content *</span>
                  <textarea
                    rows="2"
                    required
                    placeholder="Enter official circular text, deadlines, or teacher guidelines..."
                    value={newNoticeContent}
                    onChange={(e) => setNewNoticeContent(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, resize: 'vertical' }}
                  />
                </label>
              </div>

              <div className="form-actions-row">
                <button type="submit" className="teach-btn-primary">
                  <i className="fa-solid fa-paper-plane"></i> Publish Faculty Notice
                </button>
              </div>
            </form>

            {/* Filter Bar */}
            <div className="table-filter-bar no-print">
              <div className="filter-pill-group">
                <span className="filter-label"><i className="fa-solid fa-filter"></i> Category:</span>
                {['All', 'CBSE Official', 'Academic', 'Faculty Meeting'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-pill ${noticeFilter === cat ? 'active' : ''}`}
                    onClick={() => setNoticeFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Notice Cards Feed */}
            <div className="notices-feed-grid">
              {noticesList
                .filter(n => noticeFilter === 'All' || n.category === noticeFilter)
                .map(notice => (
                  <div key={notice.id} className={`notice-item-card ${!notice.read ? 'unread' : ''}`}>
                    <div className="notice-header-row">
                      <div className="notice-title-wrap">
                        <span className={`priority-badge ${notice.priority.toLowerCase()}`}>
                          {notice.priority}
                        </span>
                        <span className="category-tag">{notice.category}</span>
                        <h4>{notice.title}</h4>
                      </div>
                      <div className="notice-date-meta">
                        <i className="fa-solid fa-calendar-days"></i> {notice.date}
                      </div>
                    </div>
                    <p className="notice-body">{notice.content}</p>
                    <div className="notice-footer-row">
                      <span className="notice-publisher">
                        <i className="fa-solid fa-building-columns"></i> {notice.publisher}
                      </span>
                      <button
                        type="button"
                        className="teach-btn-alt"
                        onClick={() => handleToggleNoticeRead(notice.id)}
                      >
                        <i className={`fa-solid ${notice.read ? 'fa-envelope-open' : 'fa-envelope'}`}></i>
                        {notice.read ? 'Mark as Unread' : 'Mark as Read'}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Printable CBSE Class Test Paper Modal */}
        {showTestPaperModal && (
          <div className="receipt-modal-overlay" onClick={() => setShowTestPaperModal(false)}>
            <div className="receipt-modal-card test-paper-modal" onClick={(e) => e.stopPropagation()}>
              <div className="test-paper-printable-area" id="printable-test-paper">
                <div className="test-paper-header">
                  <div className="header-top">
                    <img src={logo} alt="School Logo" className="test-paper-logo" />
                    <div className="test-paper-school-info">
                      <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                      <p className="test-paper-affiliation">AFFILIATED TO CBSE, NEW DELHI (AFFILIATION NO. 3430398)</p>
                      <p className="test-paper-sub">Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316</p>
                      <div className="test-paper-assessment-badge">
                        PERIODIC ASSESSMENT / CLASS UNIT TEST — SESSION 2026-2027
                      </div>
                    </div>
                  </div>

                  <div className="test-paper-meta-grid">
                    <div className="meta-box"><span>Subject:</span> <strong>{testPaperSubject}</strong></div>
                    <div className="meta-box"><span>Class & Section:</span> <strong>{selectedClass}</strong></div>
                    <div className="meta-box"><span>Time Allowed:</span> <strong>{testPaperDuration}</strong></div>
                    <div className="meta-box">
                      <span>Maximum Marks:</span>{' '}
                      <strong>
                        {questionsList
                          .filter(q => q.subject.toLowerCase() === testPaperSubject.toLowerCase())
                          .reduce((acc, q) => acc + q.marks, 0) || 20}{' '}
                        Marks
                      </strong>
                    </div>
                  </div>

                  <div className="test-paper-instructions">
                    <strong>GENERAL INSTRUCTIONS:</strong>
                    <ol>
                      <li>This question paper contains questions strictly in alignment with CBSE curriculum specifications.</li>
                      <li>All questions are compulsory. Internal choices are provided wherever specified.</li>
                      <li>Section A consists of Multiple Choice Questions. Section B consists of Short Answer Questions.</li>
                      <li>Write your answers neatly and legibly. Draw diagrams using sharp lead pencil only.</li>
                    </ol>
                  </div>
                </div>

                <div className="test-paper-questions-section">
                  <div className="section-divider">SECTION A — OBJECTIVE & MULTIPLE CHOICE QUESTIONS</div>
                  {questionsList
                    .filter(q => q.subject.toLowerCase() === testPaperSubject.toLowerCase() && q.marks === 1)
                    .map((q, idx) => (
                      <div key={q.id} className="test-q-item">
                        <div className="q-head">
                          <span className="q-num">Q{idx + 1}.</span>
                          <span className="q-text">{q.question}</span>
                          <span className="q-marks">[{q.marks} Mark]</span>
                        </div>
                        {q.options && (
                          <div className="q-options-row">
                            {q.options.map((opt, oIdx) => (
                              <span key={oIdx} className="q-option">{opt}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                  <div className="section-divider">SECTION B — SHORT & CONCEPTUAL ANSWER QUESTIONS</div>
                  {questionsList
                    .filter(q => q.subject.toLowerCase() === testPaperSubject.toLowerCase() && (q.marks === 2 || q.marks === 3))
                    .map((q, idx) => (
                      <div key={q.id} className="test-q-item">
                        <div className="q-head">
                          <span className="q-num">Q{idx + 1}.</span>
                          <span className="q-text">{q.question}</span>
                          <span className="q-marks">[{q.marks} Marks]</span>
                        </div>
                      </div>
                    ))}

                  <div className="section-divider">SECTION C — LONG ANSWER & APPLICATION QUESTIONS</div>
                  {questionsList
                    .filter(q => q.subject.toLowerCase() === testPaperSubject.toLowerCase() && q.marks >= 5)
                    .map((q, idx) => (
                      <div key={q.id} className="test-q-item">
                        <div className="q-head">
                          <span className="q-num">Q{idx + 1}.</span>
                          <span className="q-text">{q.question}</span>
                          <span className="q-marks">[{q.marks} Marks]</span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="test-paper-footer">
                  <span>*** END OF QUESTION PAPER — ALL THE BEST ***</span>
                </div>
              </div>

              <div className="modal-actions-bar no-print">
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Subject: </label>
                  <select
                    value={testPaperSubject}
                    onChange={(e) => setTestPaperSubject(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1' }}
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                  </select>

                  <label style={{ fontSize: 13, fontWeight: 600, marginLeft: 8 }}>Duration: </label>
                  <select
                    value={testPaperDuration}
                    onChange={(e) => setTestPaperDuration(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1' }}
                  >
                    <option value="1.5 Hours">1.5 Hours</option>
                    <option value="2.0 Hours">2.0 Hours</option>
                    <option value="3.0 Hours">3.0 Hours</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" className="teach-btn-primary" onClick={() => window.print()}>
                    <i className="fa-solid fa-print"></i> Print Official Test Paper
                  </button>
                  <button type="button" className="teach-btn-alt" onClick={() => setShowTestPaperModal(false)}>
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Official Printable CBSE Report Card Modal */}
        {selectedReportStudent && (
          <div className="receipt-modal-overlay" onClick={() => setSelectedReportStudent(null)}>
            <div className="receipt-modal-card report-card-modal" onClick={(e) => e.stopPropagation()}>
              <div className="report-printable-area" id="printable-report">
                <div className="report-header">
                  <img src={logo} alt="School Logo" className="report-logo" />
                  <div className="report-school-info">
                    <h2>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h2>
                    <p className="report-sub">Affiliated with CBSE, New Delhi | Affiliation No: 3430398 | UDISE: 20060105502 | School Code: 08123</p>
                    <p className="report-addr">Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316</p>
                    <div className="report-badge-pill">OFFICIAL STUDENT ACADEMIC PERFORMANCE REPORT (TERM 1)</div>
                  </div>
                </div>

                <div className="report-student-meta">
                  <div className="meta-item"><span>Student Name:</span> <strong>{selectedReportStudent.name}</strong></div>
                  <div className="meta-item"><span>Roll No:</span> <strong>#{selectedReportStudent.rollNo}</strong></div>
                  <div className="meta-item"><span>Class & Section:</span> <strong>{selectedClass}</strong></div>
                  <div className="meta-item"><span>Academic Session:</span> <strong>2026-2027</strong></div>
                </div>

                <table className="report-marks-table">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>Curricular Subject</th>
                      <th>Max Marks</th>
                      <th>Marks Obtained</th>
                      <th>Subject Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mathematics</td>
                      <td>100</td>
                      <td><strong>{selectedReportStudent.math}</strong></td>
                      <td>{selectedReportStudent.math >= 90 ? 'A+' : selectedReportStudent.math >= 80 ? 'A' : 'B'}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Science (Physics, Chem, Bio)</td>
                      <td>100</td>
                      <td><strong>{selectedReportStudent.science}</strong></td>
                      <td>{selectedReportStudent.science >= 90 ? 'A+' : selectedReportStudent.science >= 80 ? 'A' : 'B'}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>English Language & Literature</td>
                      <td>100</td>
                      <td><strong>{selectedReportStudent.english}</strong></td>
                      <td>{selectedReportStudent.english >= 90 ? 'A+' : selectedReportStudent.english >= 80 ? 'A' : 'B'}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Hindi (Course A)</td>
                      <td>100</td>
                      <td><strong>{selectedReportStudent.hindi}</strong></td>
                      <td>{selectedReportStudent.hindi >= 90 ? 'A+' : selectedReportStudent.hindi >= 80 ? 'A' : 'B'}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Computer Science & AI</td>
                      <td>100</td>
                      <td><strong>{selectedReportStudent.computer}</strong></td>
                      <td>{selectedReportStudent.computer >= 90 ? 'A+' : selectedReportStudent.computer >= 80 ? 'A' : 'B'}</td>
                    </tr>
                    <tr className="report-total-row">
                      <td colSpan="2"><strong>AGGREGATE PERFORMANCE</strong></td>
                      <td><strong>500</strong></td>
                      <td><strong>{selectedReportStudent.total}</strong></td>
                      <td><strong>{selectedReportStudent.grade} ({selectedReportStudent.pct}%)</strong></td>
                    </tr>
                  </tbody>
                </table>

                <div className="report-summary-box">
                  <div className="summary-left">
                    <p><strong>Result Status:</strong> <span className="pass-pill">PASSED WITH MERIT</span></p>
                    <p><strong>Class Attendance:</strong> {attendanceRate}% (Satisfactory)</p>
                    <p><strong>Teacher Remarks:</strong> Consistent performance and disciplined academic demeanor.</p>
                  </div>
                  <div className="summary-right">
                    <div className="grade-box-large">
                      <span>FINAL GRADE</span>
                      <h2>{selectedReportStudent.grade}</h2>
                    </div>
                  </div>
                </div>

                <div className="report-signatures">
                  <div className="sig-item">
                    <p className="sig-line"></p>
                    <span>Class Teacher Signature</span>
                  </div>
                  <div className="sig-item">
                    <div className="seal-badge">OFFICIAL VERIFIED</div>
                    <p className="sig-line"></p>
                    <span>Principal / Head of Institution</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions-bar no-print">
                <button className="teach-btn-primary" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Official Report Card
                </button>
                <button className="teach-btn-alt" onClick={() => setSelectedReportStudent(null)}>
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

export default TeacherDashboard;
