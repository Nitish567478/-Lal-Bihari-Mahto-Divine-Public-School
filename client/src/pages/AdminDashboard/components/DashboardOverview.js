import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const toDateKey = (value) => {
  if (!value) return '';
  const date = value instanceof Date
    ? value
    : new Date(`${String(value).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const formatDate = (value) => {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(value))
    ? new Date(`${value}T00:00:00`)
    : new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Date not set'
    : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function DashboardOverview({
  attendanceData = [],
  applications = [],
  studentsData = [],
  teachersData = [],
  staffData = [],
  feesData = [],
  examsData = [],
  campusesData = [],
  usersData = [],
  setActivePanel,
  handleSaveAll,
}) {
  // Live IST Clock
  const [liveClock, setLiveClock] = useState('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setLiveClock(
        d.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) + ' • ' + d.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const now = new Date();
  const today = toDateKey(now);
  const todayAttendance = attendanceData.filter(record => toDateKey(record.date) === today);
  const presentCount = todayAttendance.filter(record => record.present).length;
  const absentCount = todayAttendance.filter(record => record.absent).length;
  const attendanceRate = todayAttendance.length
    ? Math.round((presentCount / todayAttendance.length) * 100)
    : null;

  // Fees calculation
  const unpaidFees = feesData.filter((fee) =>
    ['unpaid', 'due', 'pending', 'overdue'].includes(String(fee.status || '').toLowerCase())
  );
  const paidFees = feesData.filter((fee) =>
    ['paid', 'collected', 'success'].includes(String(fee.status || '').toLowerCase())
  );
  const outstandingBalance = unpaidFees.reduce((total, fee) => {
    const amount = Number(String(fee.amount || 0).replace(/[^\d.-]/g, ''));
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);
  const totalCollected = paidFees.reduce((total, fee) => {
    const amount = Number(String(fee.amount || 0).replace(/[^\d.-]/g, ''));
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);

  const classStats = todayAttendance.reduce((stats, record) => {
    const className = record.className || 'Unassigned';
    stats[className] = stats[className] || { present: 0, absent: 0, total: 0 };
    stats[className].total += 1;
    if (record.present) stats[className].present += 1;
    if (record.absent) stats[className].absent += 1;
    return stats;
  }, {});

  const attendanceTrend = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    const key = toDateKey(date);
    const dayRecords = attendanceData.filter(record => toDateKey(record.date) === key);
    const present = dayRecords.filter(record => record.present).length;
    return {
      key,
      label: date.toLocaleDateString(undefined, { weekday: 'short' }),
      rate: dayRecords.length ? Math.round((present / dayRecords.length) * 100) : 0,
      total: dayRecords.length,
    };
  });
  const hasAttendanceTrend = attendanceTrend.some(day => day.total > 0);

  const recentApplications = [...applications]
    .sort((first, second) => new Date(second.createdAt || 0) - new Date(first.createdAt || 0))
    .slice(0, 5);
  const upcomingExams = examsData
    .filter(exam => {
      const examDate = toDateKey(exam.date);
      return examDate && examDate >= today;
    })
    .sort((first, second) => toDateKey(first.date).localeCompare(toDateKey(second.date)))
    .slice(0, 3);

  const currency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  return (
    <section className="portal-section dashboard-overview-panel">
      {/* 1. SUPER ADMIN MASTER EXECUTIVE BANNER */}
      <div className="super-admin-banner">
        <div className="super-admin-banner-content">
          <div className="super-admin-badge-row">
            <span className="super-admin-crown-badge">
              <i className="fa-solid fa-crown"></i> SUPER ADMINISTRATOR
            </span>
            <span className="super-admin-affiliation-tag">
              CBSE AFFILIATION #3430398 • UDISE: 20060105502
            </span>
            <span className="super-admin-status-tag">
              <span className="pulse-dot"></span> LIVE BACKEND &bull; CLOUD SYNC
            </span>
          </div>
          <h2>Master Administrative Console</h2>
          <p>
            Supreme central management over admissions, faculty allocation, class rosters, financial ledgers, and system security for Lal Bihari Mahto Divine Public School.
          </p>
        </div>

        {/* Quick Portal Gateway Buttons */}
        <div className="super-admin-portal-gateways">
          <span className="gateway-label">Cross-Portal Navigation:</span>
          <div className="gateway-buttons-wrap">
            <Link to="/accountant/dashboard" className="super-portal-btn accountant" title="Open Finance, Cashbook & Salary Portal">
              <div className="portal-btn-icon"><i className="fa-solid fa-wallet"></i></div>
              <div className="portal-btn-text">
                <strong>Accounts Portal</strong>
                <small>Fee Ledger & Petty Cash</small>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square external-icon"></i>
            </Link>

            <Link to="/teacher/dashboard" className="super-portal-btn teacher" title="Open Faculty Academic & Classroom Portal">
              <div className="portal-btn-icon"><i className="fa-solid fa-chalkboard-user"></i></div>
              <div className="portal-btn-text">
                <strong>Teacher Portal</strong>
                <small>Curriculum & Gradebook</small>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square external-icon"></i>
            </Link>

            <Link to="/" target="_blank" rel="noopener noreferrer" className="super-portal-btn website" title="Open School Public Website">
              <div className="portal-btn-icon"><i className="fa-solid fa-globe"></i></div>
              <div className="portal-btn-text">
                <strong>Public Website</strong>
                <small>Live Parent Facing Portal</small>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square external-icon"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. LIVE TIME & SYSTEM DIAGNOSTICS STRIP */}
      <div className="dashboard-meta-bar">
        <div className="meta-bar-item">
          <i className="fa-solid fa-clock meta-icon-clock"></i>
          <span>Live IST: <strong>{liveClock || 'Syncing clock...'}</strong></span>
        </div>
        <div className="meta-bar-item">
          <i className="fa-solid fa-database meta-icon-db"></i>
          <span>Database: <strong>MongoDB Connected (Render Cloud)</strong></span>
        </div>
        <div className="meta-bar-item">
          <i className="fa-solid fa-shield-halved meta-icon-sec"></i>
          <span>Security: <strong>Super Admin Master Mode Active</strong></span>
        </div>
      </div>

      {/* 3. EXECUTIVE MASTER METRIC CARDS */}
      <div className="portal-stats-grid dashboard-metrics-grid">
        <article className="stat-card dashboard-metric-card" onClick={() => setActivePanel('viewStudents')} style={{ cursor: 'pointer' }} title="View Student Directory">
          <div className="stat-icon dashboard-metric-icon students-icon"><i className="fa-solid fa-user-graduate"></i></div>
          <div className="stat-content">
            <span>Enrolled Students</span>
            <strong>{studentsData.length}</strong>
            <small>Pre-Nursery to Class X Directory</small>
          </div>
        </article>

        <article className="stat-card dashboard-metric-card" onClick={() => setActivePanel('viewTeachers')} style={{ cursor: 'pointer' }} title="View Faculty Directory">
          <div className="stat-icon dashboard-metric-icon teachers-icon"><i className="fa-solid fa-chalkboard-user"></i></div>
          <div className="stat-content">
            <span>Faculty & Staff</span>
            <strong>{teachersData.length + staffData.length}</strong>
            <small>{teachersData.length} Teachers &bull; {staffData.length} Support Staff</small>
          </div>
        </article>

        <article className="stat-card dashboard-metric-card" onClick={() => setActivePanel('students')} style={{ cursor: 'pointer' }} title="View Admission Applications">
          <div className="stat-icon dashboard-metric-icon apps-icon"><i className="fa-solid fa-file-signature"></i></div>
          <div className="stat-content">
            <span>Online Applications</span>
            <strong>{applications.length}</strong>
            <small>Session 2026–2027 Inquiries</small>
          </div>
        </article>

        <article className="stat-card dashboard-metric-card" onClick={() => setActivePanel('fees')} style={{ cursor: 'pointer' }} title="View Fee Register">
          <div className="stat-icon dashboard-metric-icon fees-icon"><i className="fa-solid fa-wallet"></i></div>
          <div className="stat-content">
            <span>Fees Collected</span>
            <strong>{currency.format(totalCollected)}</strong>
            <small>{currency.format(outstandingBalance)} pending dues</small>
          </div>
        </article>

        <article className="stat-card dashboard-metric-card" onClick={() => setActivePanel('attendance')} style={{ cursor: 'pointer' }} title="View Attendance Register">
          <div className="stat-icon dashboard-metric-icon attendance-icon"><i className="fa-solid fa-user-check"></i></div>
          <div className="stat-content">
            <span>Today's Attendance</span>
            <strong>{attendanceRate === null ? 'Active' : `${attendanceRate}%`}</strong>
            <small>{presentCount} present &bull; {absentCount} absent today</small>
          </div>
        </article>
      </div>

      {/* 4. MASTER DATA PANELS GRID */}
      <div className="dashboard-panels-grid">
        {/* Panel 1: Today's Class Attendance */}
        <section className="portal-panel-block dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-eyebrow">ATTENDANCE</span>
              <h3>Today's class register</h3>
            </div>
            <button type="button" className="dashboard-text-action" onClick={() => setActivePanel('attendance')}>
              Open register <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {Object.keys(classStats).length ? (
            <div className="dashboard-class-list">
              {Object.entries(classStats).map(([className, stats]) => (
                <div className="dashboard-class-row" key={className}>
                  <span className="dashboard-class-name">{className}</span>
                  <div className="dashboard-class-track" aria-label={`${stats.present} present out of ${stats.total} marked`}>
                    <span style={{ width: `${stats.total ? (stats.present / stats.total) * 100 : 0}%` }}></span>
                  </div>
                  <span className="dashboard-class-count">{stats.present} present</span>
                  <span className="dashboard-class-absent">{stats.absent} absent</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="dashboard-empty-state">No attendance has been recorded today.</p>
          )}
        </section>

        {/* Panel 2: 7-Day Attendance Trend */}
        <section className="portal-panel-block dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-eyebrow">LAST 7 DAYS</span>
              <h3>Attendance trend</h3>
            </div>
            <span className="dashboard-panel-note">{hasAttendanceTrend ? 'Based on saved records' : 'Waiting for records'}</span>
          </div>
          {hasAttendanceTrend ? (
            <div className="dashboard-trend-chart">
              {attendanceTrend.map((day) => (
                <div className="dashboard-trend-day" key={day.key}>
                  <div className="dashboard-trend-bar-wrap">
                    <span className="dashboard-trend-value">{day.total ? `${day.rate}%` : '—'}</span>
                    <div
                      className={`dashboard-trend-bar ${day.total ? '' : 'empty'}`}
                      style={{ height: `${day.total ? Math.max(day.rate, 8) : 4}%` }}
                      title={`${day.label}: ${day.total ? `${day.rate}% attendance from ${day.total} records` : 'No records'}`}
                    ></div>
                  </div>
                  <span className="dashboard-trend-label">{day.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="dashboard-empty-state">Attendance trends will appear after records are added.</p>
          )}
        </section>

        {/* Panel 3: Recent Admissions Applications */}
        <section className="portal-panel-block dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-eyebrow">ADMISSIONS</span>
              <h3>Recent applications</h3>
            </div>
            <button type="button" className="dashboard-text-action" onClick={() => setActivePanel('students')}>
              View all <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {recentApplications.length ? (
            <div className="dashboard-record-list">
              {recentApplications.map((application, index) => (
                <div className="dashboard-record-row" key={application._id || application.id || `${application.studentName}-${index}`}>
                  <span className="dashboard-avatar">{(application.studentName || 'S').charAt(0).toUpperCase()}</span>
                  <span className="dashboard-record-main">
                    <strong>{application.studentName || 'Student applicant'}</strong>
                    <small>{application.classApplying || 'Class not selected'}{application.phone ? ` · ${application.phone}` : ''}</small>
                  </span>
                  <span className="dashboard-record-date">{application.createdAt ? formatDate(application.createdAt) : 'New'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="dashboard-empty-state">No admission applications found.</p>
          )}
        </section>

        {/* Panel 4: Upcoming CBSE Examinations */}
        <section className="portal-panel-block dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-eyebrow">ACADEMICS</span>
              <h3>Upcoming examinations</h3>
            </div>
            <button type="button" className="dashboard-text-action" onClick={() => setActivePanel('exams')}>
              Exam schedule <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {upcomingExams.length ? (
            <div className="dashboard-record-list">
              {upcomingExams.map((exam, index) => (
                <div className="dashboard-record-row dashboard-exam-row" key={exam.id || `${exam.examName}-${index}`}>
                  <span className="dashboard-exam-icon"><i className="fa-solid fa-pen-ruler"></i></span>
                  <span className="dashboard-record-main">
                    <strong>{exam.examName || 'Scheduled examination'}</strong>
                    <small>{exam.className || 'All classes'}{exam.subjects ? ` · ${exam.subjects}` : ''}</small>
                  </span>
                  <span className="dashboard-record-date">{formatDate(exam.date)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="dashboard-empty-state">No upcoming examinations are scheduled.</p>
          )}
        </section>
      </div>

      {/* 5. SUPER ADMIN EXECUTIVE QUICK ACTIONS */}
      <section className="portal-panel-block dashboard-quick-actions">
        <div className="dashboard-panel-heading">
          <div>
            <span className="dashboard-eyebrow">EXECUTIVE ACTIONS</span>
            <h3>Super Admin Quick Operations</h3>
          </div>
        </div>
        <div className="dashboard-action-grid">
          <button type="button" onClick={() => setActivePanel('addStudent')} title="Register new student"><i className="fa-solid fa-user-plus"></i><span>Add Student</span></button>
          <button type="button" onClick={() => setActivePanel('addTeacher')} title="Add faculty member"><i className="fa-solid fa-chalkboard-user"></i><span>Add Faculty</span></button>
          <button type="button" onClick={() => setActivePanel('fees')} title="Record fee collection"><i className="fa-solid fa-money-bill-wave"></i><span>Collect Fees</span></button>
          <button type="button" onClick={() => setActivePanel('attendance')} title="Daily attendance register"><i className="fa-solid fa-calendar-check"></i><span>Attendance</span></button>
          <button type="button" onClick={() => setActivePanel('admitCards')} title="Generate exam admit cards"><i className="fa-solid fa-id-card"></i><span>Admit Cards</span></button>
          <button type="button" onClick={() => setActivePanel('userManagement')} title="Sub-Admin security logins"><i className="fa-solid fa-users-gear"></i><span>Sub-Admins</span></button>
          <button type="button" onClick={() => setActivePanel('auditLogs')} title="Audit logs & activity"><i className="fa-solid fa-shield-cat"></i><span>Audit Logs</span></button>
          <button type="button" onClick={handleSaveAll} className="save-all-btn" title="Sync & save all data to MongoDB"><i className="fa-solid fa-cloud-arrow-up"></i><span>Save All Data</span></button>
        </div>
      </section>
    </section>
  );
}
