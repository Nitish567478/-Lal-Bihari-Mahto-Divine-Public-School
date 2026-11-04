import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchAdminContent,
  fetchApplications,
  saveAdminContent,
  uploadImage,
} from '../../utils/api';
import './index.css';

const classList = [
  'Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G',
  ...Array.from({ length: 10 }).map((_, i) => `Class ${i + 1}`),
];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const defaultHome = {
  title: 'Committed to Excellence in Education',
  description:
    'Lal Bihari Mahto Divine Public School, Naitand, has been a beacon of quality education for nearly three decades.',
  stats: [
    { number: '1500+', name: 'Students' },
    { number: '100%', name: 'Success Rate' },
    { number: '15+', name: 'Expert Teachers' },
    { number: '15+', name: 'Years of Excellence' },
  ],
  features: [
    'CBSE Affiliated with Modern Curriculum',
    'Experienced and Dedicated Faculty',
    'State-of-the-Art Infrastructure',
    'Holistic Development Programs',
  ],
};

const defaultContact = {
  address: [
    'Lal Bhari Mhattho Devine Public School',
    'Village Naitand, District Ranchi',
    'Jharkhand - 835103, India',
  ],
  phones: [
    { label: 'Main Office', value: '+91 98765 43210' },
    { label: 'Admissions', value: '+91 87654 32109' },
    { label: 'Principal', value: '+91 76543 21098' },
  ],
  emails: [
    { label: 'General Inquiries', value: 'info@lbmdps.edu.in' },
    { label: 'Admissions', value: 'admissions@lbmdps.edu.in' },
    { label: 'Principal', value: 'principal@lbmdps.edu.in' },
  ],
  hours: ['Monday - Friday: 8:00 AM - 4:00 PM', 'Saturday: 9:00 AM - 2:00 PM', 'Sunday: Closed'],
  mapLink:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.143713921765!2d86.26376391514804!3d24.296646184350465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1594bebecb4a7%3A0xa155e473b438d1fa!2sLal%20Bihari%20Mahto%20Divine%20Public%20School%20Naitand%2C%20Bandiyabad%2C%20Giridih%20815316!5e0!3m2!1sen!2sin!4v1687325254321!5m2!1sen!2sin',
};

const defaultHotels = {
  title: 'School Hotel & Guest House',
  description: 'Manage hotel listings and update images for the hospitality section.',
  cards: [
    {
      title: 'Campus Guest House',
      description: 'Comfortable rooms available for parents and visiting guests.',
      imageUrl:
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=60',
    },
  ],
};

const defaultGallery = {
  title: 'Photo Gallery',
  description: 'Update gallery images and featured school event banners.',
  images: [
    'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=900&q=60',
    'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=900&q=60',
  ],
};

const defaultRecords = {
  teachers: [],
  staff: [],
  subjects: [],
  marksheets: [],
  attendance: [],
  facilities: [],
  comments: [],
  fees: [],
  exams: [],
  idCards: [],
  settings: {
    schoolName: 'LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL NAITAND',
    session: '2026-2027',
    principal: '',
    notice: '',
  },
};

const recordFields = {
  addStudent: [
    { key: 'rollNo', label: 'Roll Number' },
    { key: 'studentName', label: 'Student Name' },
    { key: 'classApplying', label: 'Class Applying', type: 'select', options: classList },
    { key: 'parentName', label: 'Father/Guardian Name' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'email', label: 'Email ID' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
    { key: 'city', label: 'City / Village' },
  ],
  addTeacher: [
    { key: 'name', label: 'Teacher Name' },
    { key: 'subject', label: 'Subject' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'qualification', label: 'Qualification' },
  ],
  addStaff: [
    { key: 'name', label: 'Staff Name' },
    { key: 'role', label: 'Role' },
    { key: 'phone', label: 'Phone' },
    { key: 'shift', label: 'Shift', type: 'select', options: ['Day', 'Night', 'Rotational'] },
    { key: 'address', label: 'Address' },
  ],
  subjects: [
    { key: 'name', label: 'Subject Name' },
    { key: 'className', label: 'Class', type: 'select', options: classList },
    { key: 'teacher', label: 'Teacher' },
    { key: 'code', label: 'Code' },
  ],
  marksheets: [
    { key: 'rollNo', label: 'Roll Number' },
    { key: 'studentName', label: 'Student Name' },
    { key: 'className', label: 'Class', type: 'select', options: classList },
    { key: 'subject', label: 'Subject' },
    { key: 'marks', label: 'Marks', type: 'number' },
    { key: 'grade', label: 'Grade', type: 'select', options: ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'] },
  ],
  attendance: [
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'className', label: 'Class', type: 'select', options: classList },
    { key: 'present', label: 'Present', type: 'checkbox' },
    { key: 'absent', label: 'Absent', type: 'checkbox' },
    { key: 'remarks', label: 'Remarks' },
  ],
  facilities: [
    { key: 'title', label: 'Facility Name' },
    { key: 'description', label: 'Description' },
    { key: 'imageUrl', label: 'Image URL' },
  ],
  comments: [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'message', label: 'Message' },
    { key: 'status', label: 'Status' },
  ],
  fees: [
    { key: 'studentName', label: 'Student Name' },
    { key: 'className', label: 'Class', type: 'select', options: classList },
    { key: 'month', label: 'Month', type: 'select', options: monthNames },
    { key: 'amount', label: 'Amount', type: 'number' },
    { key: 'status', label: 'Status', type: 'select', options: ['Paid', 'Unpaid'] },
    { key: 'transport', label: 'Transport', type: 'select', options: ['Bus', 'Walking', 'Private'] },
    { key: 'phone', label: 'Phone Number' },
    { key: 'email', label: 'Email Address' },
  ],
  exams: [
    { key: 'examName', label: 'Exam Name' },
    { key: 'className', label: 'Class', type: 'select', options: classList },
    { key: 'date', label: 'Start Date', type: 'date' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'details', label: 'Details/Instructions' },
  ],
  idCards: [
    { key: 'rollNo', label: 'Roll Number (Auto-assigned)', type: 'text' },
    { key: 'studentName', label: 'Student Name' },
    { key: 'fatherName', label: 'Father Name' },
    { key: 'className', label: 'Class', type: 'select', options: classList },
    { key: 'dob', label: 'Date of Birth', type: 'date' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: 'idCardImage', label: 'ID Card Image (Upload)' , type: 'file' },
    { key: 'idCardImageDataUrl', label: 'idCardImageDataUrl', type: 'hidden' },
    { key: 'status', label: 'Status', type: 'select', options: ['Issued', 'Pending'] },
  ],
  admitCards: []
};

function RecordEditor({ title, fields, initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState(initialData);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="portal-section record-editor-panel professional-white-form">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-file-pen"></i> {title}</h2>
          <p className="portal-muted">Please fill in all the required details below for the {title.split(' ').pop()} record.</p>
        </div>
        <div className="header-actions no-print">
           <button className="print-btn-alt" onClick={handlePrint}><i className="fa-solid fa-print"></i> Print Form</button>
           <button className="portal-danger-action" onClick={onCancel}><i className="fa-solid fa-xmark"></i> Cancel</button>
        </div>
      </div>
      
      <div className="professional-form-grid">
            {fields.map(f => (
              <div className="form-field-group" key={f.key}>
            	<label><i className="fa-solid fa-chevron-right"></i> {f.label}</label>
            	{f.type === 'hidden' ? (
                null
              ) : f.type === 'file' ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) {
                        setFormData({ ...formData, [f.key]: null, idCardImageDataUrl: '' });
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = () => {
                        const dataUrl = String(reader.result || '');
                        setFormData({
                          ...formData,
                          idCardImageDataUrl: dataUrl,
                          idCardImage: file,
                        });
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  {formData.idCardImageDataUrl ? (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
                      <img src={formData.idCardImageDataUrl} alt="ID Card" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                      <div style={{ color: '#64748b', fontSize: 12 }}>
                        Preview ready
                      </div>
                    </div>
                  ) : null}
                </>
              ) : f.type === 'select' ? (
              <select 
                value={formData[f.key] ?? ''}
                onChange={(e) => setFormData({...formData, [f.key]: e.target.value})}
              >
                <option value="">Select {f.label}</option>
                {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea 
                value={formData[f.key] ?? ''} 
                onChange={(e) => setFormData({...formData, [f.key]: e.target.value})}
                rows={4}
              />
            ) : f.type === 'checkbox' ? (
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  checked={!!formData[f.key]} 
                  onChange={(e) => setFormData({...formData, [f.key]: e.target.checked})}
                />
                <span>Active / Enabled</span>
              </div>
            ) : (
              <input 
                type={f.type || 'text'} 
                value={formData[f.key] ?? ''} 
                onChange={(e) => setFormData({...formData, [f.key]: f.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value})}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="form-footer-actions no-print">
        <button className="portal-primary-action save-large-btn" onClick={() => onSave(formData)}>
          <i className="fa-solid fa-circle-check"></i> Save {title.split(' ').pop()}
        </button>
      </div>
    </section>
  );
}

// eslint-disable-next-line no-unused-vars
function RecordModal({ show, onClose, onSave, fields, title, initialData = {} }) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (show) setFormData(initialData);
  }, [show, initialData]);

  if (!show) return null;

  return (
    <div className="portal-modal-overlay">
      <div className="portal-modal-content record-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="portal-record-fields">
            {fields.map((f) => (
              <label key={f.key}>
                {f.label}
                {f.type === 'select' ? (
                  <select
                    value={formData[f.key] ?? ''}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                  >
                    <option value="">Select {f.label}</option>
                    {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : f.type === 'textarea' ? (
                  <textarea
                    value={formData[f.key] ?? ''}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                  />
                ) : f.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={!!formData[f.key]}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.checked })}
                    style={{ width: '20px', height: '20px', margin: '10px 0' }}
                  />
                ) : (
                  <input
                    type={f.type || 'text'}
                    value={formData[f.key] ?? ''}
                    onChange={(e) => setFormData({ ...formData, [f.key]: f.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value })}
                  />
                )}
              </label>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="portal-danger-action" onClick={onClose}>Cancel</button>
          <button className="portal-primary-action" onClick={() => { onSave(formData); onClose(); }}>Save Record</button>
        </div>
      </div>
    </div>
  );
}

const menuGroups = [
  {
    id: 'students',
    label: 'Students',
    icon: 'fa-solid fa-user-graduate',
    items: [
      { id: 'addStudent', label: 'Add Student', icon: 'fa-solid fa-user-plus' },
      { id: 'studentsList', label: 'View Students', icon: 'fa-solid fa-users-viewfinder' },
      { id: 'attendance', label: 'Attendance', icon: 'fa-solid fa-calendar-check' },
      { id: 'studentReports', label: 'Student Reports', icon: 'fa-solid fa-file-invoice' },
      { id: 'sevaStudentReports', label: 'Seva Student Report', icon: 'fa-solid fa-star' },
      { id: 'idCards', label: 'ID Cards', icon: 'fa-solid fa-id-card' },
      { id: 'admitCards', label: 'Admit Cards', icon: 'fa-solid fa-receipt' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: 'fa-solid fa-hand-holding-dollar',
    items: [
      { id: 'fees', label: 'Fees Management', icon: 'fa-solid fa-money-bill-wave' },
      { id: 'feeAnalysis', label: 'Fee Analysis (LLM)', icon: 'fa-solid fa-robot' },
    ],
  },
  {
    id: 'teachers',
    label: 'Teachers',
    icon: 'fa-solid fa-chalkboard-user',
    items: [
      { id: 'addTeacher', label: 'Add Teacher', icon: 'fa-solid fa-plus' },
      { id: 'viewTeachers', label: 'View Teachers', icon: 'fa-solid fa-list' },
      { id: 'addMarksheet', label: 'Add Marksheet', icon: 'fa-solid fa-file-circle-plus' },
      { id: 'viewMarksheetTeachers', label: 'Seva Student Report', icon: 'fa-solid fa-certificate' },
    ],
  },
  {
    id: 'staff',
    label: 'Staff',
    icon: 'fa-solid fa-users-gear',
    items: [
      { id: 'addStaff', label: 'Add Staff', icon: 'fa-solid fa-user-plus' },
      { id: 'viewStaff', label: 'View Staff', icon: 'fa-solid fa-users' },
    ],
  },
  {
    id: 'academics',
    label: 'Academics',
    icon: 'fa-solid fa-book-open',
    items: [
      { id: 'addSubject', label: 'Add Subject', icon: 'fa-solid fa-book-medical' },
      { id: 'viewSubjects', label: 'Subject List', icon: 'fa-solid fa-book-bookmark' },
      { id: 'exams', label: 'Exam Schedule', icon: 'fa-solid fa-calendar-days' },
      { id: 'home', label: 'Home Content', icon: 'fa-solid fa-house-chimney' },
      { id: 'hotels', label: 'Hotel Section', icon: 'fa-solid fa-hotel' },
      { id: 'contact', label: 'Contact Info', icon: 'fa-solid fa-address-book' },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    icon: 'fa-solid fa-photo-film',
    items: [
      { id: 'gallery', label: 'Gallery Edit', icon: 'fa-solid fa-images' },
      { id: 'upload', label: 'Image Upload', icon: 'fa-solid fa-cloud-arrow-up' },
      { id: 'facilities', label: 'Facilities', icon: 'fa-solid fa-building-circle-check' },
    ],
  },
  {
    id: 'interactions',
    label: 'Interactions',
    icon: 'fa-solid fa-envelope-open-text',
    items: [
      { id: 'comments', label: 'Comments/Enquiries', icon: 'fa-solid fa-comments' },
    ],
  },
];

function AttendancePanel({ applications, marksheetsData, attendanceData, setAttendanceData, saveRecordList }) {
  const [showGraph, setShowGraph] = useState(false);

  const [attendanceClass, setAttendanceClass] = useState(classList[0]);
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [studentNameDraft, setStudentNameDraft] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const monthEnd = new Date(year, monthIndex + 1, 0);
  const daysInMonth = monthEnd.getDate();

  const getStudentsForClass = (className) => {
    const norm = (className || '').toLowerCase().trim().replace('class ', '');
    
    const fromApps = (applications || []).filter(a => {
       const c = (String(a.classApplying || '')).toLowerCase().trim().replace('class ', '');
       const cleanC = c.replace('class ', '').replace(' - ', '-').replace(' ', '-');
       const cleanNorm = norm.replace('class ', '').replace(' - ', '-').replace(' ', '-');
       
       return cleanC === cleanNorm || 
              (cleanNorm === 'pre-nursery' && (cleanC === 'pre-nursery' || cleanC === 'pre nursery')) ||
              (cleanNorm === 'l.k.g' && (cleanC === 'lkg' || cleanC === 'l.k.g')) ||
              (cleanNorm === 'u.k.g' && (cleanC === 'ukg' || cleanC === 'u.k.g'));
    }).map(a => a.studentName);

    const fromMarksheets = (marksheetsData || []).filter(m => {
       const c = (String(m.className || '')).toLowerCase().trim().replace('class ', '');
       return c === norm || (norm === 'pre-nursery' && c === 'pre-nursery');
    }).map(m => m.studentName);

    const fromAttendance = (attendanceData || []).filter(att => {
       const c = (String(att.className || '')).toLowerCase().trim().replace('class ', '');
       return c === norm;
    }).map(att => att.studentName);

    return Array.from(new Set([...fromApps, ...fromMarksheets, ...fromAttendance]))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  };

  const currentStudents = getStudentsForClass(attendanceClass);

  const toggleStatus = (dateStr, studentName, type) => {
    const base = Array.isArray(attendanceData) ? attendanceData : [];
    const normalizedClass = attendanceClass.trim();
    
    const existingIndex = base.findIndex(r => 
      r.date === dateStr && r.className === normalizedClass && r.studentName === studentName
    );

    let nextRow = existingIndex >= 0 ? { ...base[existingIndex] } : {
      id: `att-${Date.now()}-${Math.random()}`,
      date: dateStr,
      className: normalizedClass,
      studentName,
      present: false,
      absent: false
    };

    if (type === 'present') {
      nextRow.present = !nextRow.present;
      if (nextRow.present) nextRow.absent = false;
    } else {
      nextRow.absent = !nextRow.absent;
      if (nextRow.absent) nextRow.present = false;
    }

    let next;
    if (existingIndex >= 0) {
      next = base.map((r, i) => i === existingIndex ? nextRow : r);
    } else {
      next = [nextRow, ...base];
    }
    setAttendanceData(next);
  };

  const getStatus = (dateStr, studentName) => {
    const row = (attendanceData || []).find(r => 
      r.date === dateStr && r.className === attendanceClass && r.studentName === studentName
    );
    if (!row) return null;
    if (row.present) return 'P';
    if (row.absent) return 'A';
    return null;
  };

  const filteredStudents = searchFilter 
    ? currentStudents.filter(s => s.toLowerCase().includes(searchFilter.toLowerCase()))
    : currentStudents;

  const getClassAnalytics = () => {
    const totalPossible = filteredStudents.length * daysInMonth;
    if (totalPossible === 0) return { present: 0, absent: 0, unmarked: 0, pPerc: 0, aPerc: 0 };

    let p = 0, a = 0;
    filteredStudents.forEach(student => {
       for(let d=1; d<=daysInMonth; d++) {
         const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
         const st = getStatus(dateStr, student);
         if (st === 'P') p++;
         else if (st === 'A') a++;
       }
    });

    const pPerc = (p / totalPossible) * 100;
    const aPerc = (a / totalPossible) * 100;
    return { p, a, pPerc, aPerc, unmarked: totalPossible - (p+a) };
  };

  return (
    <section className="portal-section attendance-container">
      <div className="portal-section-heading">
        <div>
          <h2>Attendance Management</h2>
          <p className="portal-muted">Daily Attendance for <strong>{attendanceClass}</strong> - {monthNames[monthIndex]} {year}</p>
        </div>
        <div className="attendance-header-actions no-print">
           <button className="graph-btn" onClick={() => setShowGraph(true)}><i className="fa-solid fa-chart-line"></i> Attendance Graph</button>
           <button className="print-btn" onClick={() => window.print()}><i className="fa-solid fa-print"></i> Print Sheet</button>
           <button className="portal-primary-action" onClick={() => saveRecordList('attendance', attendanceData)}>
             Save All Attendance
           </button>
        </div>
      </div>

      <div className="attendance-class-selector no-print">
        {classList.map(c => (
          <button 
            key={c} 
            className={`class-pill ${attendanceClass === c ? 'active' : ''}`}
            onClick={() => setAttendanceClass(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="portal-panel-block structured-controls print-area">
        <div className="controls-grid no-print">
           <div className="control-item">
              <label>Month</label>
              <select value={monthIndex} onChange={e => setMonthIndex(Number(e.target.value))}>
                {monthNames.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
           </div>
           <div className="control-item">
              <label>Year</label>
              <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} />
           </div>
           <div className="control-item search-box">
              <label>Search Student Name</label>
              <input 
                placeholder="Search..." 
                value={searchFilter} 
                onChange={e => setSearchFilter(e.target.value)} 
              />
           </div>
        </div>

        <div className="add-student-row no-print">
           <input 
             placeholder="Enter student name to add manually to this class..." 
             value={studentNameDraft}
             onChange={e => setStudentNameDraft(e.target.value)}
           />
           <button onClick={() => {
              const name = studentNameDraft.trim();
              if (!name) return;
              const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-01`;
              toggleStatus(dateStr, name, 'present');
              setStudentNameDraft('');
           }}>+ Add Student</button>
        </div>

        <div className="portal-table-wrap attendance-table-scroll">
          <table className="portal-table attendance-main-grid">
            <thead>
              <tr>
                <th className="sticky-col sticky-name">Student Name</th>
                {Array.from({ length: daysInMonth }).map((_, i) => (
                  <th key={i} className="day-col">{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student}>
                  <td className="sticky-col sticky-name student-name-cell"><strong>{student}</strong></td>
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
                    const status = getStatus(dateStr, student);
                    return (
                      <td key={i} className="day-cell">
                        <div className="att-toggle-group">
                           <button 
                             className={`btn-p ${status === 'P' ? 'active' : ''}`}
                             onClick={() => toggleStatus(dateStr, student, 'present')}
                           >P</button>
                           <button 
                             className={`btn-a ${status === 'A' ? 'active' : ''}`}
                             onClick={() => toggleStatus(dateStr, student, 'absent')}
                           >A</button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {!filteredStudents.length && (
                <tr>
                  <td colSpan={daysInMonth + 1} className="portal-empty-state">
                    No students found for {attendanceClass}. Use "Add Student" above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showGraph && (
        <div className="portal-modal-overlay" onClick={() => setShowGraph(false)}>
           <div className="portal-modal-content attendance-graph-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                 <h2>Attendance Analytics - {attendanceClass}</h2>
                 <button className="close-modal" onClick={() => setShowGraph(false)}>&times;</button>
              </div>
              <div className="analytics-body">
                 <div className="analytics-summary">
                    <p>Analysis for <strong>{monthNames[monthIndex]} {year}</strong></p>
                    <div className="stat-bars">
                       <div className="bar-item">
                          <span>Present ({getClassAnalytics().pPerc.toFixed(1)}%)</span>
                          <div className="bar-bg"><div className="bar-fill present" style={{width: `${getClassAnalytics().pPerc}%`}}></div></div>
                       </div>
                       <div className="bar-item">
                          <span>Absent ({getClassAnalytics().aPerc.toFixed(1)}%)</span>
                          <div className="bar-bg"><div className="bar-fill absent" style={{width: `${getClassAnalytics().aPerc}%`}}></div></div>
                       </div>
                    </div>
                 </div>
                 <div className="analytics-legend">
                    <div className="legend-item"><span className="dot present"></span> Present: {getClassAnalytics().p}</div>
                    <div className="legend-item"><span className="dot absent"></span> Absent: {getClassAnalytics().a}</div>
                    <div className="legend-item"><span className="dot unmarked"></span> Unmarked: {getClassAnalytics().unmarked}</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </section>
  );
}

const MarksheetManager = ({ marksheetsData, setMarksheetsData, saveRecordList, settingsData }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [printModal, setPrintModal] = useState(null);

  const subjectsByStudent = {};
  (marksheetsData || []).forEach((r) => {
    const studentName = (r.studentName || '').trim();
    const className = (r.className || '').trim();
    if (!studentName || !className) return;
    const key = `${studentName}__${className}`;
    subjectsByStudent[key] = subjectsByStudent[key] || {
      studentName,
      className,
      subjects: [],
    };
    subjectsByStudent[key].subjects.push({
      id: r.id || r._id || `${key}-${r.subject}-${Math.random().toString(16).slice(2)}`,
      subject: r.subject || '',
      marks: r.marks ?? '',
      grade: r.grade || '',
    });
  });

  const studentKeys = Object.keys(subjectsByStudent);
  const [selectedKey, setSelectedKey] = useState(studentKeys[0] || '');

  const selected = selectedKey ? subjectsByStudent[selectedKey] : null;

  const setSelectedSubjects = (nextSubjects) => {
    if (!selected) return;
    const { studentName, className } = selected;
    const updatedRows = nextSubjects.map(s => ({
      id: s.id || `record-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      studentName,
      fatherName: selected.fatherName,
      className,
      section: selected.section,
      rollNo: selected.rollNo,
      subject: s.subject,
      marks: s.marks,
      grade: s.grade,
    }));

    const without = (marksheetsData || []).filter((r) => {
      const rStudent = (r.studentName || '').trim();
      const rClass = (r.className || '').trim();
      return !(`${rStudent}__${rClass}` === selectedKey);
    });

    setMarksheetsData([...updatedRows, ...without]);
  };

  const handleAddNewStudent = (data) => {
    const { studentName, className, rollNo, fatherName, section } = data;
    if (studentName && className) {
      const key = `${studentName}__${className}`;

      if (!subjectsByStudent[key]) {
        const defaultSubjects = ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer', 'Sanskrit', 'G.K.'];
        const baseRows = defaultSubjects.map((subject) => ({
          id: `record-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          studentName,
          fatherName: fatherName || '',
          className,
          section: section || '',
          rollNo: rollNo || '',
          subject,
          marks: '0',
          grade: 'D',
        }));

        setMarksheetsData([...baseRows, ...(marksheetsData || [])]);
        setSelectedKey(key);
      }
    }
    setShowEditor(false);
  };

  if (showEditor) {
    return (
      <RecordEditor
        title="New Marksheet Report"
        fields={[
          { key: 'rollNo', label: 'Roll Number' },
          { key: 'studentName', label: 'Student Name' },
          { key: 'fatherName', label: 'Father Name' },
          { key: 'className', label: 'Class Name', type: 'select', options: classList },
          { key: 'section', label: 'Section' },
        ]}
        initialData={{}}
        onSave={handleAddNewStudent}
        onCancel={() => setShowEditor(false)}
      />
    );
  }

  const totalMarks = selected ? selected.subjects.reduce((sum, s) => sum + (Number(s.marks) || 0), 0) : 0;
  const maxMarks = selected ? selected.subjects.length * 100 : 0;
  const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;

  const getGrade = (p) => {
    if (p >= 90) return 'A+';
    if (p >= 80) return 'A';
    if (p >= 70) return 'B+';
    if (p >= 60) return 'B';
    if (p >= 50) return 'C';
    return 'D';
  };

  const quickAddSubjects = () => {
    if (!selected) return;
    const defaultSubjects = ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer', 'Sanskrit', 'G.K.'];
    const currentSubjects = selected.subjects.map(s => s.subject.toLowerCase());
    const toAdd = defaultSubjects
      .filter(s => !currentSubjects.includes(s.toLowerCase()))
      .map(s => ({ subject: s, marks: '0', grade: 'D' }));
    
    setSelectedSubjects([...selected.subjects, ...toAdd]);
  };

  return (
    <section className="portal-section marksheet-manager-panel">
      <div className="portal-section-heading">
        <div>
          <h2>Academic Marksheet Manager</h2>
          <p className="portal-muted">Manage subjects and performance. Click "View Marksheet" to print.</p>
        </div>
        <div className="header-actions">
           <button
             type="button"
             className="save-btn-alt"
             onClick={() => saveRecordList('marksheets', marksheetsData)}
           >
             <i className="fa-solid fa-floppy-disk"></i> Save Data
           </button>
           <button
             type="button"
             className="portal-primary-action"
             onClick={() => setShowEditor(true)}
           >
             <i className="fa-solid fa-plus"></i> Add New Student
           </button>
        </div>
      </div>

      <div className="portal-two-column" style={{ gridTemplateColumns: '320px 1fr' }}>
        <div className="portal-panel-block sidebar-list-panel">
          <div className="panel-header-row">
            <h3>Search Students</h3>
            <button className="portal-nav-icon add-btn" onClick={() => setShowEditor(true)} title="Add New Student Report">
               <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="portal-list scrollable-list">
            {studentKeys.map(key => (
              <button
                key={key}
                className={`portal-nav-button student-pill ${key === selectedKey ? 'active' : ''}`}
                onClick={() => setSelectedKey(key)}
              >
                <div className="student-info">
                   <div className="avatar"><i className="fa-solid fa-user"></i></div>
                   <div className="details">
                      <strong>{subjectsByStudent[key].studentName}</strong>
                      <small>Class: {subjectsByStudent[key].className}</small>
                   </div>
                </div>
              </button>
            ))}
            {!studentKeys.length && <div className="portal-empty-state">No students found.</div>}
          </div>
        </div>

        <div className="portal-panel-block main-editor-panel">
          {selected ? (
            <>
              <div className="report-header-box professional-header-card">
                <div className="header-top">
                   <span className="badge-record">STUDENT RECORD</span>
                   <div className="actions">
                      <button className="view-btn" onClick={() => {
                        setPrintModal({
                            studentName: selected.studentName,
                            className: selected.className,
                            rows: selected.subjects,
                            total: totalMarks,
                            max: maxMarks,
                            perc: percentage,
                            grade: getGrade(percentage)
                        });
                      }}><i className="fa-solid fa-eye"></i> View & Print</button>
                   </div>
                </div>
                
                <div className="student-profile-summary">
                   <div className="name-box">
                      <h2>{selected.studentName}</h2>
                      <p>Academic Session {settingsData.session} | Class: <strong>{selected.className}</strong></p>
                   </div>
                   <div className="stats-box">
                      <div className="stat-card">
                        <span>Total Marks</span>
                        <strong>{totalMarks} / {maxMarks}</strong>
                      </div>
                      <div className="stat-card highlight">
                        <span>Percentage</span>
                        <strong>{percentage.toFixed(2)}%</strong>
                      </div>
                      <div className="stat-card grade">
                        <span>Final Grade</span>
                        <strong>{getGrade(percentage)}</strong>
                      </div>
                   </div>
                </div>
              </div>

              <div className="portal-table-wrap subjects-table-container">
                <table className="portal-table marksheet-edit-table">
                  <thead>
                    <tr>
                      <th>Subject Name</th>
                      <th>Marks (Obtained)</th>
                      <th>Grade</th>
                      <th style={{ width: 60 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.subjects.map((s, idx) => (
                      <tr key={idx}>
                        <td>
                          <input
                            className="subject-input"
                            value={s.subject}
                            onChange={(e) => {
                              const next = [...selected.subjects];
                              next[idx].subject = e.target.value;
                              setSelectedSubjects(next);
                            }}
                            placeholder="Subject Name"
                          />
                        </td>
                        <td>
                          <input
                            className="marks-input"
                            type="number"
                            value={s.marks}
                            onChange={(e) => {
                              const next = [...selected.subjects];
                              next[idx].marks = e.target.value;
                              setSelectedSubjects(next);
                            }}
                          />
                        </td>
                        <td>
                           <select
                            className="grade-select"
                            value={s.grade}
                            onChange={(e) => {
                              const next = [...selected.subjects];
                              next[idx].grade = e.target.value;
                              setSelectedSubjects(next);
                            }}
                          >
                             {['A+', 'A', 'B+', 'B', 'C', 'D', 'F'].map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </td>
                        <td>
                          <button className="delete-row-btn" onClick={() => {
                            const next = selected.subjects.filter((_, i) => i !== idx);
                            setSelectedSubjects(next);
                          }}><i className="fa-solid fa-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="marksheet-footer-actions">
                <button className="add-subject-btn" onClick={() => {
                  const next = [...selected.subjects, { subject: '', marks: '0', grade: 'D' }];
                  setSelectedSubjects(next);
                }}><i className="fa-solid fa-plus"></i> Add Subject</button>
                
                <div className="bulk-group">
                  <button className="quick-fill-btn" onClick={quickAddSubjects}>Quick Add Subjects</button>
                  <button className="auto-grade-btn" onClick={() => {
                    const next = selected.subjects.map(s => {
                      const p = Number(s.marks) || 0;
                      return { ...s, grade: getGrade(p) };
                    });
                    setSelectedSubjects(next);
                  }}>Auto Grade</button>
                </div>

                <button className="portal-danger-action delete-student-btn" onClick={() => {
                  if (window.confirm('Are you sure you want to remove this entire student report?')) {
                    const without = (marksheetsData || []).filter((r) => {
                      const rStudent = (r.studentName || '').trim();
                      const rClass = (r.className || '').trim();
                      return !(`${rStudent}__${rClass}` === selectedKey);
                    });
                    setMarksheetsData(without);
                    setSelectedKey('');
                  }
                }}>Delete Record</button>
              </div>
            </>
          ) : (
            <div className="portal-empty-state-large">
              <div className="empty-icon"><i className="fa-solid fa-graduation-cap"></i></div>
              <h3>Select a Student Record</h3>
              <p>Choose a student from the sidebar to manage their academic performance or print reports.</p>
              <button className="portal-primary-action" onClick={() => setShowEditor(true)}>Create New Record</button>
            </div>
          )}
        </div>
      </div>

      {printModal && (
        <div className="portal-modal-overlay" onClick={() => setPrintModal(null)}>
          <div className="portal-modal-content professional-marksheet print-area" onClick={e => e.stopPropagation()}>
            <div className="marksheet-border-outer">
              <div className="marksheet-border-inner">
                <div className="marksheet-header">
                   <div className="school-logo-placeholder">LBMDPS</div>
                   <div className="school-info">
                      <h1>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>
                      <p className="school-addr">NAITAND, BANDIYABAD, GIRIDIH, JHARKHAND</p>
                      <p className="school-affil">Affiliated to CBSE, New Delhi | School Code: 12345</p>
                      <h2 className="report-title">ANNUAL PROGRESS REPORT</h2>
                      <p className="academic-session">Academic Session: {settingsData.session}</p>
                   </div>
                   <button className="close-modal no-print" onClick={() => setPrintModal(null)}>&times;</button>
                </div>

                <div className="marksheet-student-box-structured">
                  <div className="info-column">
                    <div className="info-item"><strong>Student Name:</strong> <span>{printModal.studentName}</span></div>
                    <div className="info-item"><strong>Class:</strong> <span>{printModal.className}</span></div>
                  </div>
                  <div className="info-column">
                    <div className="info-item"><strong>Roll No:</strong> <span>---</span></div>
                    <div className="info-item"><strong>Date of Issue:</strong> <span>{new Date().toLocaleDateString()}</span></div>
                  </div>
                </div>

                <table className="marksheet-table-professional">
                   <thead>
                      <tr>
                         <th style={{width: '60px'}}>S.No</th>
                         <th>Subject Name</th>
                         <th>Maximum Marks</th>
                         <th>Marks Obtained</th>
                         <th>Grade</th>
                      </tr>
                   </thead>
                   <tbody>
                      {printModal.rows.map((r, i) => (
                        <tr key={i}>
                           <td style={{textAlign: 'center'}}>{i + 1}</td>
                           <td>{r.subject}</td>
                           <td style={{textAlign: 'center'}}>100</td>
                           <td style={{textAlign: 'center'}}><strong>{r.marks}</strong></td>
                           <td style={{textAlign: 'center'}}>{r.grade}</td>
                        </tr>
                      ))}
                      <tr className="total-row-highlight">
                         <td colSpan={2} style={{textAlign: 'right'}}><strong>GRAND TOTAL</strong></td>
                         <td style={{textAlign: 'center'}}><strong>{printModal.max}</strong></td>
                         <td style={{textAlign: 'center'}}><strong>{printModal.total}</strong></td>
                         <td style={{textAlign: 'center'}}><strong>{printModal.grade}</strong></td>
                      </tr>
                   </tbody>
                </table>

                <div className="marksheet-result-summary">
                   <div className="summary-left">
                      <p><strong>Total Percentage:</strong> {printModal.perc.toFixed(2)}%</p>
                      <p><strong>Final Result:</strong> <span className={printModal.perc >= 33 ? 'status-active-green' : 'status-failed-red'}>{printModal.perc >= 33 ? 'PROMOTED TO NEXT CLASS' : 'FAILED'}</span></p>
                   </div>
                   <div className="summary-right">
                      <p><strong>Attendance:</strong> --- / ---</p>
                   </div>
                </div>

                <div className="marksheet-footer-structured">
                   <div className="sig-box">
                      <div className="sig-space"></div>
                      <div className="sig-line"></div>
                      <span>Class Teacher</span>
                   </div>
                   <div className="sig-box">
                      <div className="sig-space"></div>
                      <div className="sig-line"></div>
                      <span>Exam Controller</span>
                   </div>
                   <div className="sig-box">
                      <div className="sig-space"></div>
                      <div className="sig-line"></div>
                      <span>Principal Signature</span>
                   </div>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: 30 }} className="no-print">
               <button className="portal-primary-action print-btn-large" onClick={() => window.print()}>Print Official Marksheet (PDF)</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function IDCardPanel({ items, setter, storageKey, saveRecordList, settingsData }) {
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchBarcode, setSearchBarcode] = useState('');

  const issueCard = (student) => {
    setSelectedCard(student);
  };

  const handleSave = (data) => {
    if (data.id) {
      setter(items.map(it => it.id === data.id ? data : it));
    } else {
      setter([{ id: Date.now(), ...data }, ...items]);
    }
    setShowEditor(false);
  };

  if (showEditor) {
    return (
      <RecordEditor
        title={editingItem ? "Update Student ID Card" : "Register New ID Card"}
        fields={recordFields.idCards}
        initialData={editingItem || { status: 'Pending' }}
        onSave={handleSave}
        onCancel={() => setShowEditor(false)}
      />
    );
  }

  return (
    <section className="portal-section id-card-panel">
      <div className="portal-section-heading">
        <div>
          <h2>Student ID Cards</h2>
          <p className="portal-muted">Generate and print official school identity cards.</p>
        </div>
        <div className="header-actions">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              value={searchBarcode}
              onChange={(e) => setSearchBarcode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="Search 4-digit ID"
              style={{ width: 180 }}
            />
          </div>
           <button className="portal-primary-action" onClick={() => { setEditingItem(null); setShowEditor(true); }}>
              <i className="fa-solid fa-plus"></i> Add New Student
           </button>
        </div>
      </div>

      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Roll No</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => {
                if (!searchBarcode) return true;
                const num = (() => {
                  const base = String(item?.id || item?.rollNo || item?.studentName || '');
                  const seed =
                    base ||
                    `${item?.studentName || ''}-${item?.fatherName || ''}-${item?.className || ''}-${item?.dob || ''}`;
                  const normalized = seed.replace(/\s+/g, '');
                  const hash = Array.from(normalized).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
                  return String(hash % 10000).padStart(4, '0');
                })();

                return num.includes(searchBarcode);
              })
              .map((item, idx) => (
              <tr key={item.id || idx}>
                <td><strong>{item.studentName}</strong></td>
                <td>{item.className}</td>
                <td>{item.rollNo}</td>
                <td><span className={`status-pill ${item.status?.toLowerCase()}`}>{item.status}</span></td>
                <td style={{ display: 'flex', gap: '8px' }}>
                  <button className="portal-primary-action" onClick={() => issueCard(item)}><i className="fa-solid fa-id-card"></i> View</button>
                  <button className="portal-nav-icon" onClick={() => { setEditingItem(item); setShowEditor(true); }} title="Edit"><i className="fa-solid fa-pen"></i></button>
                </td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan="5" className="portal-empty-state">No students found for ID cards.</td></tr>}
          </tbody>
        </table>
      </div>

      {selectedCard && (
        <div className="portal-modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="id-card-formal print-area" onClick={e => e.stopPropagation()}>
             <div className="id-card-header">
                <div className="id-card-logo">LBMDPS</div>
                <div className="id-card-school-info">
                   <h3>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h3>
                   <p>Naitand, Bandiyabad, Giridih, Jharkhand</p>
                   <p style={{ color: '#94a3b8', fontSize: '0.6rem', marginTop: 6 }}>
                     Session: {settingsData?.session || '-'}
                   </p>
                   <div className="id-card-barcode" data-barcode="true">
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.50rem' }}>
                    {(() => {
                      const base = String(
                        selectedCard?.id ||
                          selectedCard?.rollNo ||
                          selectedCard?.studentName ||
                          ''
                      );
                      const seed =
                        base ||
                        `${selectedCard?.studentName || ''}-${selectedCard?.fatherName || ''}-${selectedCard?.className || ''}-${selectedCard?.dob || ''}`;
                      const normalized = seed.replace(/\s+/g, '');

                      const hash = Array.from(normalized).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
                      const num = hash % 10000;
                      return `unique id: ${String(num).padStart(4, '0')}`;
                    })()}
                  </p>
                </div>
                </div>
             </div>
             <div className="id-card-body">
                <div className="id-card-photo-box">
                   {selectedCard?.idCardImageDataUrl ? (
                     <img
                       src={selectedCard.idCardImageDataUrl}
                       alt="ID Card"
                       style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                   ) : (
                     <div className="photo-placeholder">PHOTO</div>
                   )}
                </div>
                <div className="id-card-details">
                   <div className="detail-row"><strong>Name:</strong> <span>{selectedCard.studentName}</span></div>
                   <div className="detail-row"><strong>Father Name:</strong> <span>{selectedCard.fatherName || '-'}</span></div>
                   <div className="detail-row"><strong>Class:</strong> <span>{selectedCard.className}</span></div>
                   <div className="detail-row"><strong>Roll No:</strong> <span>{selectedCard.rollNo}</span></div>
                   <div className="detail-row"><strong>DOB:</strong> <span>{selectedCard.dob}</span></div>
                   <div className="detail-row"><strong>Phone:</strong> <span>{selectedCard.phone}</span></div>
                   <div className="detail-row"><strong>Address:</strong> <span className="addr-small">{selectedCard.address}</span></div>
                </div>
             </div>
                <div className="id-card-footer">
                {/* <div className="id-card-barcode" data-barcode="true">
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.75rem' }}>
                    {(() => {
                      const base = String(
                        selectedCard?.id ||
                          selectedCard?.rollNo ||
                          selectedCard?.studentName ||
                          ''
                      );
                      const seed =
                        base ||
                        `${selectedCard?.studentName || ''}-${selectedCard?.fatherName || ''}-${selectedCard?.className || ''}-${selectedCard?.dob || ''}`;
                      const normalized = seed.replace(/\s+/g, '');

                      const hash = Array.from(normalized).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
                      const num = hash % 10000;
                      return `unique id: ${String(num).padStart(4, '0')}`;
                    })()}
                  </p>
                </div> */}
                <div className="id-card-sig">
                   <div className="sig-line"></div>
                   <span>Principal Signature</span>
                </div>
             </div>
             <button className="close-modal no-print" onClick={() => setSelectedCard(null)}>&times;</button>
             <button
               className="print-id-btn no-print"
               onClick={() => {
                 // Popup blockers often stop window.open().
                 // So we print in same tab, but temporarily make only the ID card visible.
                 const idCard = document.querySelector('.id-card-formal');
                 if (!idCard) {
                   window.print();
                   return;
                 }

                 const prev = document.body.getAttribute('data-idcard-print-prev');
                 // Save current inline display/visibility for siblings.
                 const siblings = Array.from(document.body.children);
                 const saved = siblings.map(n => ({
                   el: n,
                   style: {
                     display: n.style.display,
                     visibility: n.style.visibility,
                   }
                 }));

                 // Hide everything except idCard container.
                 siblings.forEach(n => {
                   if (idCard.contains(n) || n === idCard) return;
                   n.style.display = 'none';
                 });

                 try {
                   window.print();
                 } finally {
                   // Restore styles.
                   saved.forEach(({ el, style }) => {
                     el.style.display = style.display;
                     el.style.visibility = style.visibility;
                   });
                   if (prev === null || prev === undefined) {
                     document.body.removeAttribute('data-idcard-print-prev');
                   }
                 }
               }}>
             <i className="fa-solid fa-print"></i> Print ID Card
             </button>
          </div>
        </div>
      )}
    </section>
  );
}

function AdmitCardsPanel({ applications, admitCardsData, setAdmitCardsData, settingsData }) {
  const [search, setSearch] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const issuedByAppId = new Map((admitCardsData || []).map(c => [c.applicationId, c]));

  const generateAdmitCardNo = (application) => {
    const year = new Date().getFullYear();
    const base = `${application._id || ''}-${application.aadharNumber || ''}-${application.studentName || ''}`.replace(/\s+/g, '');
    const hash = Array.from(base).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
    const num = String(hash % 10000).padStart(4, '0');
    return `LBMDPS-${year}-${num}`;
  };

  const filteredApps = (applications || []).filter(a => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const hay = [a.studentName, a.classApplying, a.phone, a.parentName, a.aadharNumber]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });

  const issueAdmitCard = (app) => {
    if (!app || !app._id) return;
    const existing = issuedByAppId.get(app._id);
    if (existing?.status === 'Issued') {
      setSelectedCard(existing);
      return;
    }

    const card = {
      id: `admit-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      applicationId: app._id,
      admitCardNo: generateAdmitCardNo(app),
      status: 'Issued',
      dateOfIssue: new Date().toISOString(),

      studentName: app.studentName,
      classApplying: app.classApplying,
      dob: app.dob,
      parentName: app.parentName,
      phone: app.phone,
      email: app.email,
      address: app.address,
      photo: app.photo,
      city: app.city,
      district: app.district,
      state: app.state,
      pinCode: app.pinCode,
      category: app.category,
      fatherOccupation: app.fatherOccupation,
      motherOccupation: app.motherOccupation,
      nationality: app.nationality,
      createdAt: new Date().toISOString(),
    };

    const next = [card, ...(admitCardsData || []).filter(c => c.applicationId !== app._id)];
    setAdmitCardsData(next);
    setSelectedCard(card);
  };

  if (selectedCard) {
    return (
      <div className="portal-modal-overlay" onClick={() => setSelectedCard(null)}>
        <div className="admit-card-modal print-area" onClick={e => e.stopPropagation()}>
          <div className="admit-card-header">
            <div className="id-card-logo">LBMDPS</div>
            <div className="admit-card-title">
              <h3 style={{ margin: 0 }}>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h3>
              <p style={{ margin: '4px 0 0 0' }}>Naitand, Bandiyabad, Giridih, Jharkhand</p>
              <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.75rem' }}>
                Academic Session: {settingsData?.session || '-'}
              </p>
            </div>
            <button className="close-modal no-print" onClick={() => setSelectedCard(null)}>&times;</button>
          </div>

          <div className="admit-card-body">
            <div className="admit-card-meta-grid">
              <div className="meta-item"><strong>Admit Card No:</strong> <span>{selectedCard.admitCardNo}</span></div>
              <div className="meta-item"><strong>Date of Issue:</strong> <span>{selectedCard.dateOfIssue ? new Date(selectedCard.dateOfIssue).toLocaleDateString() : '-'}</span></div>
              <div className="meta-item"><strong>Status:</strong> <span>{selectedCard.status}</span></div>
              <div className="meta-item"><strong>Class:</strong> <span>{selectedCard.classApplying}</span></div>
            </div>

            <div className="admit-card-student-box">
              <div className="admit-photo">
                {selectedCard.photo ? (
                  <img
                    src={selectedCard.photo.includes('uploads/') ? selectedCard.photo : `/uploads/${selectedCard.photo}`}
                    alt="Student"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="photo-placeholder">PHOTO</div>
                )}
              </div>
              <div className="admit-details">
                <div className="detail-row"><strong>Student Name:</strong> <span>{selectedCard.studentName}</span></div>
                <div className="detail-row"><strong>Father/Guardian:</strong> <span>{selectedCard.parentName}</span></div>
                <div className="detail-row"><strong>DOB:</strong> <span>{selectedCard.dob}</span></div>
                <div className="detail-row"><strong>Phone:</strong> <span>{selectedCard.phone}</span></div>
                <div className="detail-row"><strong>Address:</strong> <span className="addr-small">{selectedCard.address}</span></div>
              </div>
            </div>

            <div className="admit-card-note">
              <p><strong>Note:</strong> Bring this admit card and original documents on the admission date.</p>
            </div>

            <div className="marksheet-footer-structured">
              <div className="sig-box">
                <div className="sig-space"></div>
                <div className="sig-line"></div>
                <span>Admission Incharge</span>
              </div>
              <div className="sig-box">
                <div className="sig-space"></div>
                <div className="sig-line"></div>
                <span>Principal Signature</span>
              </div>
            </div>
          </div>

          <div className="no-print" style={{ textAlign: 'center', marginTop: 24 }}>
            <button className="portal-primary-action" onClick={() => window.print()}>
              <i className="fa-solid fa-print"></i> Print Admit Card
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="portal-section">
      <div className="portal-section-heading">
        <div>
          <h2>Admit Cards</h2>
          <p className="portal-muted">Admin can issue and print admit cards for admission applications.</p>
        </div>
        <div className="header-actions">
          <button
            className="portal-primary-action"
            type="button"
            onClick={() => {
              // Batch generate: issue admit cards for all un-issued applications
              const issued = new Set((admitCardsData || []).filter(c => c.status === 'Issued').map(c => c.applicationId));
              const toIssue = (applications || []).filter(a => a?._id && !issued.has(a._id));
              if (!toIssue.length) return;

              // Issue one by one but update state once
              const cardsToAdd = toIssue.map(app => {
                const card = {
                  id: `admit-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                  applicationId: app._id,
                  admitCardNo: generateAdmitCardNo(app),
                  status: 'Issued',
                  dateOfIssue: new Date().toISOString(),

                  studentName: app.studentName,
                  classApplying: app.classApplying,
                  dob: app.dob,
                  parentName: app.parentName,
                  phone: app.phone,
                  email: app.email,
                  address: app.address,
                  photo: app.photo,
                  city: app.city,
                  district: app.district,
                  state: app.state,
                  pinCode: app.pinCode,
                  category: app.category,
                  fatherOccupation: app.fatherOccupation,
                  motherOccupation: app.motherOccupation,
                  nationality: app.nationality,
                  createdAt: new Date().toISOString(),
                };
                return card;
              });

              const next = [...cardsToAdd, ...(admitCardsData || [])];
              setAdmitCardsData(next);
            }}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> Generate Admit Cards (All)
          </button>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, Aadhaar, class..."
            style={{ width: 280, marginLeft: 12 }}
          />
        </div>
      </div>

      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Parent</th>
              <th>Phone</th>
              <th>Aadhaar</th>
              <th>Issue</th>
            </tr>
          </thead>
            <tbody>
              {filteredApps.length ? (
                filteredApps.map((app) => {
                  const existing = issuedByAppId.get(app._id);
                  return (
                    <tr key={app._id}>
                      <td>
                        <strong>{app.studentName}</strong>
                        <br />
                        <small>{app.dob ? `DOB: ${app.dob}` : ''}</small>
                      </td>
                      <td>{app.classApplying}</td>
                      <td>{app.parentName}</td>
                      <td>{app.phone}</td>
                      <td>{app.aadharNumber}</td>
                      <td>
                        {existing?.status === 'Issued' ? (
                          <button
                            className="portal-primary-action"
                            onClick={() => setSelectedCard(existing)}
                          >
                            <i className="fa-solid fa-eye"></i> View
                          </button>
                        ) : (
                          <button
                            className="portal-primary-action"
                            onClick={() => issueAdmitCard(app)}
                          >
                            <i className="fa-solid fa-id-card"></i> Issue
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="portal-empty-state">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </section>
  );
}

function FeeAnalysisPanel({ feesData, settingsData, token }) {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [alertsSent, setAlertsSent] = useState([]);

  const unpaidStudents = feesData.filter(f => f.status?.toLowerCase() === 'unpaid');
  
  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    // Simulate LLM analysis
    setTimeout(() => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const currentMonthIndex = new Date().getMonth();
      
      const overdue = unpaidStudents.filter(f => {
         const feeMonthIndex = months.indexOf(f.month);
         // If month is before current month and status is unpaid
         return feeMonthIndex !== -1 && (currentMonthIndex - feeMonthIndex) >= 1;
      });
      
      setAnalysis({
        summary: `AI Analysis Complete: Found ${unpaidStudents.length} pending payments. Total estimated pending: ₹${unpaidStudents.reduce((sum, f) => sum + (Number(f.amount) || 0), 0)}. ${overdue.length} students are overdue by 1 month or more and require immediate SMS/Email alerts.`,
        overdueList: overdue
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const sendAlerts = (student) => {
    // Simulate SMS and Email
    console.log(`Sending SMS to ${student.phone}: Dear parent, please pay fees for ${student.month}.`);
    console.log(`Sending Email to ${student.email}: Official reminder for ${student.studentName}'s fees.`);
    setAlertsSent([...alertsSent, student.id || student.studentName]);
    alert(`Automatic SMS and Email sent to ${student.studentName}'s registered contact.`);
  };

  const sendBulkAlerts = () => {
     if(!analysis) return;
     analysis.overdueList.forEach(s => sendAlerts(s));
     alert('Bulk alerts sent to all overdue students.');
  };

  return (
    <section className="portal-section">
      <div className="portal-section-heading">
        <div>
          <h2>Fee Analysis & AI Alerts</h2>
          <p className="portal-muted">Identify unpaid fees and send automated reminders via SMS/Email.</p>
        </div>
        <button className="portal-primary-action ai-btn" onClick={analyzeWithAI} disabled={isAnalyzing}>
          {isAnalyzing ? '🤖 Analyzing...' : '🤖 Analyze with AI'}
        </button>
      </div>

      <div className="portal-stats-grid">
         <article>
            <span>Total Pending</span>
            <strong>{unpaidStudents.length}</strong>
         </article>
         <article>
            <span>Total Pending Amount</span>
            <strong>₹{unpaidStudents.reduce((sum, f) => sum + (Number(f.amount) || 0), 0)}</strong>
         </article>
      </div>

      {analysis && (
        <div className="ai-report-box">
           <h3>AI Summary</h3>
           <p>{analysis.summary}</p>
           <button className="portal-primary-action" onClick={sendBulkAlerts}>Send Bulk Alerts to Overdue</button>
        </div>
      )}

      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Transport</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unpaidStudents.map((f, idx) => (
              <tr key={idx}>
                <td><strong>{f.studentName}</strong><br/><small>{f.phone}</small></td>
                <td>{f.month}</td>
                <td>₹{f.amount}</td>
                <td>{f.transport}</td>
                <td><span className="status-pill unpaid">Unpaid</span></td>
                <td>
                  <button 
                    className={`portal-primary-action ${alertsSent.includes(f.id || f.studentName) ? 'sent' : ''}`} 
                    onClick={() => sendAlerts(f)}
                  >
                    {alertsSent.includes(f.id || f.studentName) ? '<FaCheck /> Alert Sent' : 'Send Alert'}
                  </button>
                </td>
              </tr>
            ))}
            {!unpaidStudents.length && <tr><td colSpan="6" className="portal-empty-state">No unpaid fees found. Great job!</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const SevaStudentReports = ({ marksheetsData, settingsData, setActivePanel }) => {
  const [modal, setModal] = useState(null);

  const studentGroups = {};
  (marksheetsData || []).forEach((r) => {
    const studentName = (r.studentName || '').trim();
    const className = (r.className || '').trim();
    if (!studentName || !className) return;
    const key = `${studentName}__${className}`;
    studentGroups[key] = studentGroups[key] || { studentName, className, rows: [] };
    studentGroups[key].rows.push(r);
  });
  const keys = Object.keys(studentGroups);

  return (
    <section className="portal-section">
      <div className="portal-section-heading">
        <div>
          <h2>Seva Student Report</h2>
          <p className="portal-muted">View summarized performance and print final marksheets.</p>
        </div>
      </div>

      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Total</th>
              <th>%</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => {
              const { studentName, className, rows } = studentGroups[key];
              const total = rows.reduce((sum, r) => sum + (Number(r.marks) || 0), 0);
              const max = rows.length * 100;
              const perc = max > 0 ? (total / max) * 100 : 0;
              
              const getGrade = (p) => {
                if (p >= 90) return 'A+';
                if (p >= 80) return 'A';
                if (p >= 70) return 'B+';
                if (p >= 60) return 'B';
                if (p >= 50) return 'C';
                return 'D';
              };

              return (
                <tr key={key}>
                  <td><strong>{studentName}</strong></td>
                  <td>{className}</td>
                  <td>{total} / {max}</td>
                  <td>{perc.toFixed(2)}%</td>
                  <td><span className={`grade-badge ${getGrade(perc).toLowerCase().replace('+', 'plus')}`}>{getGrade(perc)}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="portal-primary-action" style={{ padding: '5px 12px' }} onClick={() => setModal({ studentName, className, rows, total, max, perc, grade: getGrade(perc) })}>Detail</button>
                      <button className="portal-nav-button active" style={{ padding: '5px 12px', minHeight: 'auto' }} onClick={() => setActivePanel('studentReports')}>Edit</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="portal-modal-overlay" onClick={() => setModal(null)}>
          <div className="portal-modal-content professional-marksheet print-area" onClick={e => e.stopPropagation()}>
            <div className="marksheet-border-outer">
              <div className="marksheet-border-inner">
                <div className="marksheet-header">
                   <div className="school-logo-placeholder">LBMDPS</div>
                   <div className="school-info">
                      <h1>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>
                      <p className="school-addr">NAITAND, BANDIYABAD, GIRIDIH, JHARKHAND</p>
                      <p className="school-affil">Affiliated to CBSE, New Delhi | School Code: 12345</p>
                      <h2 className="report-title">ANNUAL PROGRESS REPORT</h2>
                      <p className="academic-session">Academic Session: {settingsData.session}</p>
                   </div>
                   <button className="close-modal no-print" onClick={() => setModal(null)}>&times;</button>
                </div>

                <div className="marksheet-student-box-structured">
                  <div className="info-column">
                    <div className="info-item"><strong>Student Name:</strong> <span>{modal.studentName}</span></div>
                    <div className="info-item"><strong>Class:</strong> <span>{modal.className}</span></div>
                  </div>
                  <div className="info-column">
                    <div className="info-item"><strong>Roll No:</strong> <span>---</span></div>
                    <div className="info-item"><strong>Date of Issue:</strong> <span>{new Date().toLocaleDateString()}</span></div>
                  </div>
                </div>

                <table className="marksheet-table-professional">
                   <thead>
                      <tr>
                         <th style={{width: '60px'}}>S.No</th>
                         <th>Subject Name</th>
                         <th>Maximum Marks</th>
                         <th>Marks Obtained</th>
                         <th>Grade</th>
                      </tr>
                   </thead>
                   <tbody>
                      {modal.rows.map((r, i) => (
                        <tr key={i}>
                           <td style={{textAlign: 'center'}}>{i + 1}</td>
                           <td>{r.subject}</td>
                           <td style={{textAlign: 'center'}}>100</td>
                           <td style={{textAlign: 'center'}}><strong>{r.marks}</strong></td>
                           <td style={{textAlign: 'center'}}>{r.grade}</td>
                        </tr>
                      ))}
                      <tr className="total-row-highlight">
                         <td colSpan={2} style={{textAlign: 'right'}}><strong>GRAND TOTAL</strong></td>
                         <td style={{textAlign: 'center'}}><strong>{modal.max}</strong></td>
                         <td style={{textAlign: 'center'}}><strong>{modal.total}</strong></td>
                         <td style={{textAlign: 'center'}}><strong>{modal.grade}</strong></td>
                      </tr>
                   </tbody>
                </table>

                <div className="marksheet-result-summary">
                   <div className="summary-left">
                      <p><strong>Total Percentage:</strong> {modal.perc.toFixed(2)}%</p>
                      <p><strong>Final Result:</strong> <span className={modal.perc >= 33 ? 'status-pass' : 'status-fail'}>{modal.perc >= 33 ? 'PROMOTED TO NEXT CLASS' : 'FAILED'}</span></p>
                   </div>
                   <div className="summary-right">
                      <p><strong>Attendance:</strong> --- / ---</p>
                   </div>
                </div>

                <div className="marksheet-footer-structured">
                   <div className="sig-box">
                      <div className="sig-space"></div>
                      <div className="sig-line"></div>
                      <span>Class Teacher</span>
                   </div>
                   <div className="sig-box">
                      <div className="sig-space"></div>
                      <div className="sig-line"></div>
                      <span>Exam Controller</span>
                   </div>
                   <div className="sig-box">
                      <div className="sig-space"></div>
                      <div className="sig-line"></div>
                      <span>Principal Signature</span>
                   </div>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: 30 }} className="no-print">
               <button className="portal-primary-action print-btn-large" onClick={() => window.print()}>Print Official Marksheet (PDF)</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function mergeWithFallback(key, json) {

  const data = json || {};
  if (key === 'home-hero') {
    return {
      ...defaultHome,
      ...data,
      stats: Array.isArray(data.stats) && data.stats.length ? data.stats : defaultHome.stats,
      features: Array.isArray(data.features) && data.features.length ? data.features : defaultHome.features,
    };
  }

  if (key === 'gallery') {
    return {
      ...defaultGallery,
      ...data,
      images: Array.isArray(data.images) && data.images.length ? data.images : defaultGallery.images,
    };
  }

  if (key === 'hotels') {
    return {
      ...defaultHotels,
      ...data,
      cards: Array.isArray(data.cards) && data.cards.length ? data.cards : defaultHotels.cards,
    };
  }

  if (key === 'contact-info') {
    return {
      ...defaultContact,
      ...data,
      address: Array.isArray(data.address) && data.address.length ? data.address : defaultContact.address,
      phones: Array.isArray(data.phones) && data.phones.length ? data.phones : defaultContact.phones,
      emails: Array.isArray(data.emails) && data.emails.length ? data.emails : defaultContact.emails,
      hours: Array.isArray(data.hours) && data.hours.length ? data.hours : defaultContact.hours,
      mapLink: data.mapLink || defaultContact.mapLink,
    };
  }

  return data;
}

function PortalButton({ active, children, icon, onClick }) {
  const isFA = typeof icon === 'string' && icon.startsWith('fa-');
  return (
    <button className={`portal-nav-button ${active ? 'active' : ''}`} type="button" onClick={onClick}>
      <span className="portal-nav-icon">
        {isFA ? <i className={icon}></i> : icon}
      </span>
      <span>{children}</span>
    </button>
  );
}

const AdminDashboard = () => {
  const history = useHistory();
  const token = localStorage.getItem('adminToken');

  const [activePanel, setActivePanel] = useState('dashboard');
  const [openMenus, setOpenMenus] = useState({ students: true, finance: true, academics: true });
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [currentManagerConfig, setCurrentManagerConfig] = useState(null);

  const [homeData, setHomeData] = useState(defaultHome);
  const [contactData, setContactData] = useState(defaultContact);
  const [hotelsData, setHotelsData] = useState(defaultHotels);
  const [galleryData, setGalleryData] = useState(defaultGallery);
  const [teachersData, setTeachersData] = useState(defaultRecords.teachers);
  const [staffData, setStaffData] = useState(defaultRecords.staff);
  const [subjectsData, setSubjectsData] = useState(defaultRecords.subjects);
  const [marksheetsData, setMarksheetsData] = useState(defaultRecords.marksheets);
  const [attendanceData, setAttendanceData] = useState(defaultRecords.attendance);
  const [feesData, setFeesData] = useState(defaultRecords.fees);
  const [examsData, setExamsData] = useState(defaultRecords.exams);
  const [idCardsData, setIdCardsData] = useState(defaultRecords.idCards);
  const [admitCardsData, setAdmitCardsData] = useState(defaultRecords.admitCards);
  const [facilitiesData, setFacilitiesData] = useState(defaultRecords.facilities);
  const [commentsData, setCommentsData] = useState(defaultRecords.comments);
  const [settingsData, setSettingsData] = useState(defaultRecords.settings);
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadResult, setUploadResult] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imageTarget, setImageTarget] = useState('');

  const latestApplications = useMemo(() => applications.slice(0, 5), [applications]);

  useEffect(() => {
    if (!token) {
      history.push('/admin/login');
      return;
    }

    const loadContent = async (key, setter, fallback) => {
      try {
        const response = await fetchAdminContent(key, token);
        setter(mergeWithFallback(key, response.json || fallback));
      } catch (err) {
        setter(fallback);
      }
    };

    const loadRecordList = async (key, setter, fallback) => {
      try {
        const response = await fetchAdminContent(key, token);
        setter(Array.isArray(response.json?.items) ? response.json.items : fallback);
      } catch (err) {
        setter(fallback);
      }
    };

    const loadSettings = async () => {
      try {
        const response = await fetchAdminContent('settings', token);
        setSettingsData({ ...defaultRecords.settings, ...(response.json || {}) });
      } catch (err) {
        setSettingsData(defaultRecords.settings);
      }
    };

    loadContent('home-hero', setHomeData, defaultHome);
    loadContent('contact-info', setContactData, defaultContact);
    loadContent('hotels', setHotelsData, defaultHotels);
    loadContent('gallery', setGalleryData, defaultGallery);
    loadRecordList('teachers', setTeachersData, defaultRecords.teachers);
    loadRecordList('staff', setStaffData, defaultRecords.staff);
    loadRecordList('subjects', setSubjectsData, defaultRecords.subjects);
    loadRecordList('marksheets', setMarksheetsData, defaultRecords.marksheets);
    loadRecordList('attendance', setAttendanceData, defaultRecords.attendance);
    loadRecordList('fees', setFeesData, defaultRecords.fees);
    loadRecordList('exams', setExamsData, defaultRecords.exams);
    loadRecordList('idCards', setIdCardsData, defaultRecords.idCards);
    loadRecordList('admitCards', setAdmitCardsData, defaultRecords.admitCards);
    loadRecordList('facilities', setFacilitiesData, defaultRecords.facilities);
    loadRecordList('comments', setCommentsData, defaultRecords.comments);
    loadSettings();

    fetchApplications()
      .then((response) => setApplications(Array.isArray(response.items) ? response.items : []))
      .catch(() => setApplications([]));
  }, [history, token]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    history.push('/admin/login');
  };

  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  const openPanel = (panelId) => {
    setActivePanel(panelId);
  };

  const saveBlock = async (key, data) => {
    setStatus('Saving...');
    try {
      const res = await saveAdminContent(key, data, token);
      setStatus('Saved successfully.');
      setTimeout(() => setStatus(''), 3000);
      return res;
    } catch (err) {
      setStatus(`Save failed: ${err.message}`);
      throw err;
    }
  };

  const handleSaveAll = async () => {
    setStatus('Saving all blocks...');
    try {
      await saveBlock('home-hero', homeData);
      await saveBlock('hotels', hotelsData);
      await saveBlock('gallery', galleryData);
      await saveBlock('contact-info', contactData);
      await saveBlock('teachers', { items: teachersData });
      await saveBlock('staff', { items: staffData });
      await saveBlock('subjects', { items: subjectsData });
      await saveBlock('marksheets', { items: marksheetsData });
      await saveBlock('attendance', { items: attendanceData });
      await saveBlock('fees', { items: feesData });
      await saveBlock('exams', { items: examsData });
      await saveBlock('idCards', { items: idCardsData });
      await saveBlock('admitCards', { items: admitCardsData });
      await saveBlock('facilities', { items: facilitiesData });
      await saveBlock('comments', { items: commentsData });
      await saveBlock('settings', settingsData);
      setStatus('All blocks saved.');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus(`Save all failed: ${err.message}`);
    }
  };

  const handleAddHotelCard = () => {
    setHotelsData((prev) => ({
      ...prev,
      cards: [...prev.cards, { title: '', description: '', imageUrl: '' }],
    }));
  };

  const handleHotelCardChange = (index, field, value) => {
    setHotelsData((prev) => {
      const cards = [...prev.cards];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, cards };
    });
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      setUploadResult('Please choose an image first.');
      return;
    }

    try {
      setIsUploading(true);
      const response = await uploadImage(uploadFile, token);
      setUploadResult(`Upload complete: ${response.url}`);
    } catch (err) {
      setUploadResult(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const removeRecord = (items, setter, index) => {
    setter(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const saveRecordList = (key, items) => saveBlock(key, { items });

  const openAddRecord = (config) => {
    setCurrentManagerConfig(config);
    setEditingRecord({});
    setShowRecordModal(true);
  };

  const handleSaveRecord = (data) => {
    const { items, setter } = currentManagerConfig;
    if (data.id) {
       setter(items.map(it => it.id === data.id ? data : it));
    } else {
       setter([{ ...data, id: `record-${Date.now()}` }, ...items]);
    }
  };

  const printRecord = (item, fields) => {
     const printWin = window.open('', '', 'width=800,height=600');
     printWin.document.write('<html><head><title>Print Record</title>');
     printWin.document.write('<style>body{font-family:Arial, sans-serif;padding:40px;background:#f8fafc;}.record-card{background:#fff;border:2px solid #0b1c3d;padding:30px;border-radius:12px;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);}.row{margin-bottom:12px;display:flex;border-bottom:1px solid #f1f5f9;padding-bottom:8px;}strong{width:180px;display:inline-block;color:#1e293b;font-weight:700;}.val{color:#475569;}</style>');
     printWin.document.write('</head><body>');
     printWin.document.write('<div class="record-card">');
     printWin.document.write('<h1 style="color:#0b1c3d;text-align:center;margin-bottom:5px;">LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>');
     printWin.document.write('<p style="text-align:center;color:#64748b;margin-top:0;">Naitand, Bandiyabad, Giridih, Jharkhand</p>');
     printWin.document.write('<h3 style="text-align:center;background:#0b1c3d;color:#fff;padding:10px;border-radius:6px;margin:20px 0;">' + currentManagerConfig?.title.toUpperCase() + ' RECEIPT</h3>');
     fields.forEach(f => {
        printWin.document.write(`<div class="row"><strong>${f.label}:</strong> <span class="val">${item[f.key] || 'N/A'}</span></div>`);
     });
     printWin.document.write('<div style="margin-top:60px;display:flex;justify-content:space-between;border-top:1px dashed #cbd5e1;padding-top:20px;"><div><p>Generated on: ' + new Date().toLocaleString() + '</p></div><div style="text-align:center;"><div style="height:50px;"></div><div style="border-top:1px solid #0b1c3d;width:200px;">Authorized Signature</div></div></div>');
     printWin.document.write('</div></body></html>');
     printWin.document.close();
     setTimeout(() => {
        printWin.print();
        printWin.close();
     }, 500);
  };

  const renderRecordManager = ({ title, description, storageKey, items, setter, fields, addLabel }) => {
    if (showRecordModal) {
      return (
        <RecordEditor
          title={editingRecord?.id ? `Update ${title}` : `Register New ${title}`}
          fields={fields}
          initialData={editingRecord || {}}
          onSave={(data) => {
            handleSaveRecord(data);
            setShowRecordModal(false);
          }}
          onCancel={() => setShowRecordModal(false)}
        />
      );
    }

    return (
      <section className="portal-section record-manager-section">
        <div className="portal-section-heading">
          <div>
            <h2>{title}</h2>
            <p className="portal-muted">{description}</p>
          </div>
          <div className="header-actions-group">
            <button type="button" className="save-btn-alt" onClick={() => saveRecordList(storageKey, items)}>
              <i className="fa-solid fa-floppy-disk"></i> Save Data
            </button>
            <button type="button" className="add-btn-main" onClick={() => openAddRecord({ title, items, setter, fields, storageKey })}>
              <i className="fa-solid fa-plus"></i> {addLabel}
            </button>
          </div>
        </div>
        <div className="portal-record-list-grid">
          {items.map((item, index) => (
            <div className="record-entry-card" key={item.id || item._id || index}>
              <div className="entry-header">
                <div className="entry-title">
                  <i className="fa-solid fa-circle-user"></i>
                  <strong>{item.name || item.studentName || item.title || `${title} Item`}</strong>
                </div>
                <div className="entry-actions">
                  <button className="entry-btn print" title="Print" onClick={() => { setCurrentManagerConfig({ title, items, setter, fields }); printRecord(item, fields); }}><i className="fa-solid fa-print"></i></button>
                  <button className="entry-btn edit" title="Edit" onClick={() => { setCurrentManagerConfig({ title, items, setter, fields }); setEditingRecord(item); setShowRecordModal(true); }}><i className="fa-solid fa-pen"></i></button>
                  <button className="entry-btn delete" title="Remove" onClick={() => removeRecord(items, setter, index)}><i className="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
              <div className="entry-body-grid">
                {fields.slice(0, 4).map((f) => (
                  <div className="entry-field" key={f.key}>
                    <span>{f.label}</span>
                    <strong>{item[f.key] || '-'}</strong>
                  </div>
                ))}
                {fields.length > 4 && <div className="more-indicator">+{fields.length - 4} more fields...</div>}
              </div>
            </div>
          ))}
          {!items.length && (
            <div className="portal-empty-state-card">
              <i className="fa-solid fa-folder-open"></i>
              <p>No records found. Click "{addLabel}" to add your first entry.</p>
            </div>
          )}
        </div>
      </section>
    );
  };

  const renderDashboard = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendanceData.filter(a => a.date === today);
    const totalPresent = todayAttendance.filter(a => a.present).length;
    const totalAbsent = todayAttendance.filter(a => a.absent).length;
    const totalStudents = applications.length || todayAttendance.length;
    const presentPerc = totalStudents ? ((totalPresent / totalStudents) * 100).toFixed(1) : 0;

    const classStats = {};
    todayAttendance.forEach(a => {
      classStats[a.className] = classStats[a.className] || { present: 0, absent: 0 };
      if (a.present) classStats[a.className].present++;
      if (a.absent) classStats[a.className].absent++;
    });

    return (
      <section className="portal-section">
        <div className="portal-stats-grid">
          <article className="stat-card-highlight">
            <span>Today's Presence</span>
            <strong>{totalPresent}</strong>
            <small>{presentPerc}% present &bull; {totalAbsent} absent</small>
          </article>
          <article>
            <span>Total Students</span>
            <strong>{applications.length}</strong>
          </article>
          <article>
            <span>Teachers</span>
            <strong>{teachersData.length}</strong>
          </article>
          <article>
            <span>Unpaid Fees</span>
            <strong>{feesData.filter(f => f.status?.toLowerCase() === 'unpaid').length}</strong>
          </article>
        </div>

        <div className="dashboard-charts-row">
           <div className="portal-panel-block">
              <h3>Attendance by Class (Today)</h3>
              <div className="class-stats-list">
                 {Object.keys(classStats).length ? Object.keys(classStats).map(cls => (
                   <div key={cls} className="class-stat-item">
                      <span className="class-name">{cls}</span>
                      <div className="stat-bar-container">
                         <div className="stat-bar present" style={{width: `${(classStats[cls].present / (classStats[cls].present + classStats[cls].absent || 1)) * 100}%`}}></div>
                      </div>
                      <span className="stat-counts">{classStats[cls].present} P / {classStats[cls].absent} A</span>
                   </div>
                 )) : <p className="portal-muted">No attendance marked for today yet.</p>}
              </div>
           </div>
           
           <div className="portal-panel-block">
              <h3>Monthly Attendance Trend</h3>
              <div className="placeholder-chart">
                 {/* Simple CSS-based trend line placeholder */}
                 <div className="trend-bars">
                    {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                      <div key={i} className="trend-bar" style={{height: `${h}%`}} title={`Day ${i+1}: ${h}%`}></div>
                    ))}
                 </div>
                 <div className="trend-labels">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="portal-two-column">
          <div className="portal-panel-block">
            <h2>Recent Applications</h2>
            {latestApplications.length ? (
              <div className="portal-list">
                {latestApplications.map((item) => (
                  <div className="portal-list-row" key={item._id}>
                    <div>
                      <strong>{item.studentName}</strong>
                      <span>{item.classApplying} | {item.phone}</span>
                    </div>
                    <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'New'}</small>
                  </div>
                ))}
              </div>
            ) : (
              <p className="portal-muted">No admission applications found yet.</p>
            )}
          </div>

          <div className="portal-panel-block">
            <h2>System Quick Actions</h2>
            <div className="portal-action-grid">
              <button type="button" className="action-btn-primary" onClick={() => setActivePanel('attendance')}>Mark Attendance</button>
              <button type="button" onClick={() => setActivePanel('fees')}>Collect Fees</button>
              <button type="button" onClick={() => setActivePanel('feeAnalysis')}>Fee Alerts</button>
              <button type="button" onClick={handleSaveAll}>Backup All Data</button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderStudents = () => (
    <section className="portal-section">
      <div className="portal-section-heading">
        <h2>Student Applications</h2>
        <button type="button" onClick={() => window.open('/admissions', '_blank', 'noopener,noreferrer')}>
          Open Admission Form
        </button>
      </div>
      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Parent</th>
              <th>Phone</th>
              <th>Email</th>
              <th>City</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((item) => (
              <tr key={item._id}>
                <td>{item.studentName}</td>
                <td>{item.classApplying}</td>
                <td>{item.parentName}</td>
                <td>{item.phone}</td>
                <td>{item.email || '-'}</td>
                <td>{item.city}</td>
                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
            {!applications.length && (
              <tr>
                <td colSpan="7">No student applications are available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderHomeEditor = () => (
    <section className="portal-section">
      <h2>Homepage Content</h2>
      <label>
        Section Title
        <input value={homeData.title} onChange={(e) => setHomeData({ ...homeData, title: e.target.value })} />
      </label>
      <label>
        Description
        <textarea
          value={homeData.description}
          onChange={(e) => setHomeData({ ...homeData, description: e.target.value })}
          rows={4}
        />
      </label>
      <div className="portal-field-group">
        <h3>Stat Blocks</h3>
        {homeData.stats.map((item, idx) => (
          <div key={idx} className="portal-inline-fields">
            <input
              value={item.number}
              onChange={(e) => {
                const stats = [...homeData.stats];
                stats[idx] = { ...stats[idx], number: e.target.value };
                setHomeData({ ...homeData, stats });
              }}
              placeholder="Number"
            />
            <input
              value={item.name}
              onChange={(e) => {
                const stats = [...homeData.stats];
                stats[idx] = { ...stats[idx], name: e.target.value };
                setHomeData({ ...homeData, stats });
              }}
              placeholder="Label"
            />
          </div>
        ))}
      </div>
      <div className="portal-field-group">
        <h3>Features</h3>
        {homeData.features.map((feature, idx) => (
          <input
            key={idx}
            value={feature}
            onChange={(e) => {
              const features = [...homeData.features];
              features[idx] = e.target.value;
              setHomeData({ ...homeData, features });
            }}
          />
        ))}
      </div>
      <button type="button" className="portal-primary-action" onClick={() => saveBlock('home-hero', homeData)}>
        Save Home Content
      </button>
    </section>
  );

  const renderHotelsEditor = () => (
    <section className="portal-section">
      <h2>Hotel Section</h2>
      <label>
        Section Title
        <input value={hotelsData.title} onChange={(e) => setHotelsData({ ...hotelsData, title: e.target.value })} />
      </label>
      <label>
        Description
        <textarea
          value={hotelsData.description}
          onChange={(e) => setHotelsData({ ...hotelsData, description: e.target.value })}
          rows={4}
        />
      </label>
      <div className="portal-field-group">
        <h3>Hotel Cards</h3>
        {hotelsData.cards.map((card, idx) => (
          <div key={idx} className="portal-edit-card">
            <input
              placeholder="Card title"
              value={card.title}
              onChange={(e) => handleHotelCardChange(idx, 'title', e.target.value)}
            />
            <input
              placeholder="Image URL"
              value={card.imageUrl}
              onChange={(e) => handleHotelCardChange(idx, 'imageUrl', e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={card.description}
              onChange={(e) => handleHotelCardChange(idx, 'description', e.target.value)}
              rows={3}
            />
            <button
              type="button"
              className="portal-danger-action"
              onClick={() => setHotelsData({ ...hotelsData, cards: hotelsData.cards.filter((_, index) => index !== idx) })}
            >
              Remove Card
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddHotelCard}>Add Hotel Card</button>
      </div>
      <button type="button" className="portal-primary-action" onClick={() => saveBlock('hotels', hotelsData)}>
        Save Hotel Section
      </button>
    </section>
  );

  const renderGalleryEditor = () => (
    <section className="portal-section">
      <h2>Gallery Content</h2>
      <label>
        Section Title
        <input value={galleryData.title} onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })} />
      </label>
      <label>
        Description
        <textarea
          value={galleryData.description}
          onChange={(e) => setGalleryData({ ...galleryData, description: e.target.value })}
          rows={3}
        />
      </label>
      <div className="portal-field-group">
        <h3>Gallery Image URLs</h3>
        {galleryData.images.map((url, idx) => (
          <div key={idx} className="portal-inline-fields with-action">
            <input
              value={url}
              onChange={(e) => {
                const images = [...galleryData.images];
                images[idx] = e.target.value;
                setGalleryData({ ...galleryData, images });
              }}
              placeholder="Image URL"
            />
            <button
              type="button"
              className="portal-danger-action"
              onClick={() => setGalleryData({ ...galleryData, images: galleryData.images.filter((_, index) => index !== idx) })}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setGalleryData({ ...galleryData, images: [...galleryData.images, ''] })}>
          Add Gallery Image
        </button>
      </div>
      <button type="button" className="portal-primary-action" onClick={() => saveBlock('gallery', galleryData)}>
        Save Gallery Content
      </button>
    </section>
  );

  const renderContactEditor = () => (
    <section className="portal-section">
      <h2>Contact Information</h2>
      <div className="portal-field-group">
        <h3>Address Lines</h3>
        {contactData.address.map((line, idx) => (
          <input
            key={idx}
            value={line}
            onChange={(e) => {
              const address = [...contactData.address];
              address[idx] = e.target.value;
              setContactData({ ...contactData, address });
            }}
          />
        ))}
      </div>
      <div className="portal-field-group">
        <h3>Phone Contacts</h3>
        {contactData.phones.map((item, idx) => (
          <div className="portal-inline-fields" key={idx}>
            <input
              value={item.label}
              onChange={(e) => {
                const phones = [...contactData.phones];
                phones[idx] = { ...phones[idx], label: e.target.value };
                setContactData({ ...contactData, phones });
              }}
              placeholder="Label"
            />
            <input
              value={item.value}
              onChange={(e) => {
                const phones = [...contactData.phones];
                phones[idx] = { ...phones[idx], value: e.target.value };
                setContactData({ ...contactData, phones });
              }}
              placeholder="Phone number"
            />
          </div>
        ))}
      </div>
      <div className="portal-field-group">
        <h3>Email Contacts</h3>
        {contactData.emails.map((item, idx) => (
          <div className="portal-inline-fields" key={idx}>
            <input
              value={item.label}
              onChange={(e) => {
                const emails = [...contactData.emails];
                emails[idx] = { ...emails[idx], label: e.target.value };
                setContactData({ ...contactData, emails });
              }}
              placeholder="Label"
            />
            <input
              value={item.value}
              onChange={(e) => {
                const emails = [...contactData.emails];
                emails[idx] = { ...emails[idx], value: e.target.value };
                setContactData({ ...contactData, emails });
              }}
              placeholder="Email address"
            />
          </div>
        ))}
      </div>
      <div className="portal-field-group">
        <h3>Office Hours</h3>
        {contactData.hours.map((hour, idx) => (
          <input
            key={idx}
            value={hour}
            onChange={(e) => {
              const hours = [...contactData.hours];
              hours[idx] = e.target.value;
              setContactData({ ...contactData, hours });
            }}
          />
        ))}
      </div>
      <label>
        Map iframe URL
        <textarea value={contactData.mapLink} onChange={(e) => setContactData({ ...contactData, mapLink: e.target.value })} rows={3} />
      </label>
      <button type="button" className="portal-primary-action" onClick={() => saveBlock('contact-info', contactData)}>
        Save Contact Data
      </button>
    </section>
  );

  const renderUpload = () => (
    <section className="portal-section">
      <h2>Upload Image</h2>
      <label>
        Choose target section
        <select value={imageTarget} onChange={(e) => setImageTarget(e.target.value)}>
          <option value="">Select section</option>
          <option value="Home banner">Home banner</option>
          <option value="Hotel card">Hotel card</option>
          <option value="Gallery">Gallery</option>
          <option value="Contact banner">Contact banner</option>
        </select>
      </label>
      <input type="file" accept="image/*" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
      {uploadFile && (
        <div className="portal-upload-preview">
          <img src={URL.createObjectURL(uploadFile)} alt="preview" />
          <div>
            <strong>{uploadFile.name}</strong>
            <span>{(uploadFile.size / 1024).toFixed(1)} KB</span>
          </div>
        </div>
      )}
      <button type="button" className="portal-primary-action" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {uploadResult && <div className="portal-status">{uploadResult}</div>}
    </section>
  );

  const renderSettings = () => (
    <section className="portal-section">
      <h2>Settings</h2>
      <div className="portal-record-fields">
        <label>
          School Name
          <input
            value={settingsData.schoolName}
            onChange={(e) => setSettingsData({ ...settingsData, schoolName: e.target.value })}
          />
        </label>
        <label>
          Academic Session
          <input
            value={settingsData.session}
            onChange={(e) => setSettingsData({ ...settingsData, session: e.target.value })}
          />
        </label>
        <label>
          Principal
          <input
            value={settingsData.principal}
            onChange={(e) => setSettingsData({ ...settingsData, principal: e.target.value })}
          />
        </label>
        <label>
          Notice
          <textarea
            value={settingsData.notice}
            onChange={(e) => setSettingsData({ ...settingsData, notice: e.target.value })}
            rows={4}
          />
        </label>
      </div>
      <button type="button" className="portal-primary-action" onClick={() => saveBlock('settings', settingsData)}>
        Save Settings
      </button>
    </section>
  );

  const renderPlaceholder = (title, detail) => (
    <section className="portal-section portal-empty-state">
      <h2>{title}</h2>
      <p>{detail}</p>
    </section>
  );

  const renderActivePanel = () => {
    if (activePanel === 'dashboard') return renderDashboard();
    if (activePanel === 'addStudent') {
      return renderRecordManager({
        title: 'Student Admission',
        description: 'Register a new student into the school system.',
        storageKey: 'applications',
        items: applications,
        setter: setApplications,
        fields: recordFields.addStudent,
        addLabel: 'New Admission',
      });
    }
    if (activePanel === 'studentsList') return renderStudents();
    if (activePanel === 'studentReports' || activePanel === 'addMarksheet') {
      return (
        <MarksheetManager
          marksheetsData={marksheetsData}
          setMarksheetsData={setMarksheetsData}
          saveRecordList={saveRecordList}
          settingsData={settingsData}
        />
      );
    }
    if (activePanel === 'sevaStudentReports' || activePanel === 'viewMarksheetTeachers') {
      return (
        <SevaStudentReports
          marksheetsData={marksheetsData}
          settingsData={settingsData}
          setActivePanel={setActivePanel}
        />
      );
    }
    if (activePanel === 'home') return renderHomeEditor();
    if (activePanel === 'hotels') return renderHotelsEditor();
    if (activePanel === 'gallery') return renderGalleryEditor();
    if (activePanel === 'contact') return renderContactEditor();
    if (activePanel === 'upload') return renderUpload();
    if (activePanel === 'addTeacher' || activePanel === 'viewTeachers') {
      return renderRecordManager({
        title: 'Teachers',
        description: 'Add, edit, and save teacher records.',
        storageKey: 'teachers',
        items: teachersData,
        setter: setTeachersData,
        fields: recordFields.addTeacher,
        addLabel: 'Add Teacher',
      });
    }
    if (activePanel === 'addStaff' || activePanel === 'viewStaff') {
      return renderRecordManager({
        title: 'Staff',
        description: 'Add, edit, and save staff records.',
        storageKey: 'staff',
        items: staffData,
        setter: setStaffData,
        fields: recordFields.addStaff,
        addLabel: 'Add Staff',
      });
    }
    if (activePanel === 'addSubject') {
       return renderRecordManager({
        title: 'Add New Subject',
        description: 'Enter details for a new academic subject.',
        storageKey: 'subjects',
        items: subjectsData,
        setter: setSubjectsData,
        fields: recordFields.subjects,
        addLabel: 'Create Subject',
      });
    }
    if (activePanel === 'viewSubjects') {
      return renderRecordManager({
        title: 'Academic Subjects',
        description: 'Full list of subjects, classes, and teachers.',
        storageKey: 'subjects',
        items: subjectsData,
        setter: setSubjectsData,
        fields: recordFields.subjects,
        addLabel: 'Add Subject',
      });
    }
    if (activePanel === 'attendance') {
      return (
        <AttendancePanel
          applications={applications}
          marksheetsData={marksheetsData}
          attendanceData={attendanceData}
          setAttendanceData={setAttendanceData}
          saveRecordList={saveRecordList}
        />
      );
    }
    if (activePanel === 'fees') {
      return renderRecordManager({
        title: 'Fees Management',
        description: 'Track student fees, payment status, and transport details.',
        storageKey: 'fees',
        items: feesData,
        setter: setFeesData,
        fields: recordFields.fees,
        addLabel: 'Add Fee Record',
      });
    }
    if (activePanel === 'exams') {
      return renderRecordManager({
        title: 'Exam Schedule',
        description: 'Manage upcoming examinations and details.',
        storageKey: 'exams',
        items: examsData,
        setter: setExamsData,
        fields: recordFields.exams,
        addLabel: 'Add Exam',
      });
    }
    if (activePanel === 'idCards') {
      return (
        <IDCardPanel 
          items={idCardsData} 
          setter={setIdCardsData} 
          storageKey="idCards" 
          saveRecordList={saveRecordList}
          settingsData={settingsData}
        />
      );
    }

    if (activePanel === 'admitCards') {
      return (
        <AdmitCardsPanel
          applications={applications}
          admitCardsData={admitCardsData}
          setAdmitCardsData={setAdmitCardsData}
          settingsData={settingsData}
        />
      );
    }
    if (activePanel === 'feeAnalysis') {
      return (
        <FeeAnalysisPanel 
          feesData={feesData} 
          settingsData={settingsData}
          token={token}
        />
      );
    }
    if (activePanel === 'facilities') {
      return renderRecordManager({
        title: 'Facilities',
        description: 'Add facilities with descriptions and optional image URLs.',
        storageKey: 'facilities',
        items: facilitiesData,
        setter: setFacilitiesData,
        fields: recordFields.facilities,
        addLabel: 'Add Facility',
      });
    }
    if (activePanel === 'comments') {
      return renderRecordManager({
        title: 'Comments',
        description: 'Review and update website comments or enquiries.',
        storageKey: 'comments',
        items: commentsData,
        setter: setCommentsData,
        fields: recordFields.comments,
        addLabel: 'Add Comment',
      });
    }
    if (activePanel === 'settings') return renderSettings();
    return renderPlaceholder('Coming Soon', 'This admin module is in the portal and ready for its backend connection.');
  };

  return (
    <div className="admin-portal">
      <aside className="portal-sidebar">
        <div className="portal-brand">
          <strong>LBMDPS</strong>
          <span>Admin Portal</span>
        </div>
        <nav>
          <PortalButton active={activePanel === 'dashboard'} icon="fa-solid fa-gauge-high" onClick={() => setActivePanel('dashboard')}>
            Dashboard
          </PortalButton>
          {menuGroups.map((group) => (
            <div className="portal-menu-group" key={group.id}>
              <button className="portal-nav-button" type="button" onClick={() => toggleMenu(group.id)}>
                <span className="portal-nav-icon">
                  {group.icon.startsWith('fa-') ? <i className={group.icon}></i> : group.icon}
                </span>
                <span>{group.label}</span>
                <span className="portal-caret">{openMenus[group.id] ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-right"></i>}</span>
              </button>
              {openMenus[group.id] && (
                <div className="portal-submenu">
                  {group.items.map((item) => (
                    <PortalButton
                      key={`${item.id}-${item.label}`}
                      active={activePanel === item.id}
                      icon={item.icon}
                      onClick={() => openPanel(item.id)}
                    >
                      {item.label}
                    </PortalButton>
                  ))}
                </div>
              )}
            </div>
          ))}
          <PortalButton active={activePanel === 'settings'} icon="fa-solid fa-gear" onClick={() => setActivePanel('settings')}>
            Settings
          </PortalButton>
        </nav>
      </aside>

      <main className="portal-main">
        <header className="portal-topbar">
          <div>
            <h1>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>
            <p>Portal Administrator Interface | {settingsData.session}</p>
          </div>
          <div className="portal-topbar-actions">
            <button type="button" onClick={handleSaveAll}>Save All Changes</button>
            <button type="button" className="portal-logout" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        {status && <div className="portal-status">{status}</div>}
        <div className="portal-content-frame">{renderActivePanel()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
