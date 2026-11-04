// =========================================================================
// LBMDPS ADMIN PORTAL - MULTI-ROLE & MODULAR DASHBOARD SHELL
// =========================================================================

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchAdminContent,
  fetchApplications,
  saveAdminContent,
  uploadImage,
} from '../../utils/api';
import './index.css';

// Constants & Default Data
import {
  defaultHome,
  defaultContact,
  defaultHotels,
  defaultGallery,
  defaultRecords,
  defaultApplications,
  recordFields,
  menuGroups,
  roleDefinitions,
} from './constants/adminData';

// Modular Page Components
import DashboardOverview from './components/DashboardOverview';
import RecordManager from './components/RecordManager';
import MarksheetManager from './components/MarksheetManager';
import StudentReportsPanel from './components/StudentReportsPanel';
import IDCardPanel from './components/IDCardPanel';
import AdmitCardsPanel from './components/AdmitCardsPanel';
import AttendancePanel from './components/AttendancePanel';
import FeesPanel from './components/FeesPanel';
import FeeAnalysisPanel from './components/FeeAnalysisPanel';
import HomeEditor from './components/HomeEditor';
import HotelsEditor from './components/HotelsEditor';
import GalleryEditor from './components/GalleryEditor';
import ContactEditor from './components/ContactEditor';
import UploadPanel from './components/UploadPanel';
import SettingsPanel from './components/SettingsPanel';
import UserManagementPanel from './components/UserManagementPanel';
import AcademicExcellencePanel from './components/AcademicExcellencePanel';
import DedicatedFormPanel from './components/DedicatedFormPanel';
import StaffProvisioningPanel from './components/StaffProvisioningPanel';
import CRMLeadsPanel from './components/CRMLeadsPanel';

function mergeWithFallback(key, data) {
  if (!data) return data;
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

function PortalButton({ active, children, icon, onClick, title }) {
  const isFA = typeof icon === 'string' && icon.startsWith('fa-');
  return (
    <button
      className={`portal-nav-button ${active ? 'active' : ''}`}
      type="button"
      onClick={onClick}
      title={title}
      aria-current={active ? 'page' : undefined}
    >
      <span className="portal-nav-icon">
        {isFA ? <i className={icon}></i> : icon}
      </span>
      <span>{children}</span>
    </button>
  );
}

export default function AdminDashboard() {
  const history = useHistory();
  const token = localStorage.getItem('adminToken');

  // Role Management State (Super Admin, Admin, Accountant, Teacher)
  const currentRole = localStorage.getItem('userRole') || 'super_admin';

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  );
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  );
  const [sidebarSearch, setSidebarSearch] = useState('');
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activePanel, setActivePanel] = useState('dashboard');
  const [openMenus, setOpenMenus] = useState({
    students: true,
    finance: true,
    academics: true,
    teachers: true,
    staff: true,
    operations: true,
    multiCampus: true,
    media: true,
    access: true,
    interactions: true,
  });
  const [status, setStatus] = useState('');

  // CMS & Portal State
  const [usersData, setUsersData] = useState(defaultRecords.users);
  const [homeData, setHomeData] = useState(defaultHome);
  const [contactData, setContactData] = useState(defaultContact);
  const [hotelsData, setHotelsData] = useState(defaultHotels);
  const [galleryData, setGalleryData] = useState(defaultGallery);
  const [teachersData, setTeachersData] = useState(defaultRecords.teachers);
  const [studentsData, setStudentsData] = useState(defaultRecords.students || []);
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
  const [applications, setApplications] = useState(defaultApplications);

  // Advanced Multi-Tenant & Operations State
  const [toppersData, setToppersData] = useState(defaultRecords.classToppers || []);
  const [campusesData, setCampusesData] = useState(defaultRecords.campuses || []);
  const [payrollData, setPayrollData] = useState(defaultRecords.payroll || []);
  const [transportData, setTransportData] = useState(defaultRecords.transport || []);
  const [libraryData, setLibraryData] = useState(defaultRecords.library || []);
  const [auditLogsData, setAuditLogsData] = useState(defaultRecords.auditLogs || []);

  // Uploader state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadResult, setUploadResult] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imageTarget, setImageTarget] = useState('');

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
        setter(Array.isArray(response.json?.items) && response.json.items.length ? response.json.items : fallback);
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
    loadRecordList('users', setUsersData, defaultRecords.users);
    loadRecordList('students', setStudentsData, defaultRecords.students);
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
    loadRecordList('classToppers', setToppersData, defaultRecords.classToppers || []);
    loadRecordList('campuses', setCampusesData, defaultRecords.campuses || []);
    loadRecordList('payroll', setPayrollData, defaultRecords.payroll || []);
    loadRecordList('transport', setTransportData, defaultRecords.transport || []);
    loadRecordList('library', setLibraryData, defaultRecords.library || []);
    loadRecordList('auditLogs', setAuditLogsData, defaultRecords.auditLogs || []);
    loadSettings();

    fetchApplications()
      .then((response) => setApplications(Array.isArray(response.items) && response.items.length ? response.items : defaultApplications))
      .catch(() => setApplications(defaultApplications));
  }, [history, token]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    history.push('/admin/login');
  };

  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  const saveBlock = async (key, data) => {
    setStatus('Saving changes...');
    try {
      const res = await saveAdminContent(key, data, token);
      setStatus('Saved successfully to server.');
      setTimeout(() => setStatus(''), 3000);
      return res;
    } catch (err) {
      setStatus(`Save failed: ${err.message}`);
      throw err;
    }
  };

  const saveRecordList = async (key, items) => {
    setStatus(`Saving ${key}...`);
    try {
      await saveAdminContent(key, { items }, token);
      setStatus(`${key} saved successfully.`);
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus(`Save failed: ${err.message}`);
    }
  };

  const handleSaveAll = async () => {
    setStatus('Saving all modules...');
    try {
      await saveBlock('home-hero', homeData);
      await saveBlock('hotels', hotelsData);
      await saveBlock('gallery', galleryData);
      await saveBlock('contact-info', contactData);
      await saveBlock('users', { items: usersData });
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
      setStatus('All portal data saved successfully.');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus(`Save all failed: ${err.message}`);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      setUploadResult('Please select an image file first.');
      return;
    }
    setIsUploading(true);
    setUploadResult('Uploading to server...');
    try {
      const res = await uploadImage(uploadFile, token);
      setUploadResult(`Uploaded successfully! Path: ${res.imageUrl || res.url}`);
      setUploadFile(null);
    } catch (err) {
      setUploadResult(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Filter menu groups by active user role
  const normalizedSidebarSearch = sidebarSearch.trim().toLowerCase();
  const visibleMenuGroups = menuGroups
    .filter(g => !g.roles || g.roles.includes(currentRole))
    .map((group) => {
      const items = group.items.filter(item => !item.roles || item.roles.includes(currentRole));
      const groupMatches = group.title.toLowerCase().includes(normalizedSidebarSearch);
      return {
        ...group,
        items: normalizedSidebarSearch && !groupMatches
          ? items.filter(item => item.label.toLowerCase().includes(normalizedSidebarSearch))
          : items,
      };
    })
    .filter(group => group.items.length > 0);

  const selectPanel = (panelId) => {
    setActivePanel(panelId);
    setSidebarSearch('');
    if (window.innerWidth <= 900) setIsSidebarCollapsed(true);
  };

  // Main Dynamic Router View
  const renderCurrentView = () => {
    switch (activePanel) {
      case 'dashboard':
        return (
          <DashboardOverview
            attendanceData={attendanceData}
            applications={applications}
            studentsData={studentsData}
            teachersData={teachersData}
            feesData={feesData}
            examsData={examsData}
            setActivePanel={setActivePanel}
            handleSaveAll={handleSaveAll}
          />
        );

      case 'userManagement':
        return (
          <UserManagementPanel
            usersData={usersData}
            setUsersData={setUsersData}
            saveRecordList={saveRecordList}
          />
        );

      case 'crmLeads':
        return <CRMLeadsPanel />;

      case 'students':
        return (
          <section className="portal-section">
            <div className="portal-section-heading">
              <div>
                <h2><i className="fa-solid fa-user-graduate"></i> Student Admission Applications</h2>
                <p className="portal-muted">Review online registration and admission inquiries submitted by parents.</p>
              </div>
              <div className="header-actions no-print">
                <button type="button" className="portal-primary-action" onClick={() => window.open('/admission', '_blank', 'noopener,noreferrer')}>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i> Open Public Admission Form
                </button>
              </div>
            </div>
            <div className="portal-table-wrap portal-panel-block" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Parent / Guardian</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((item) => (
                    <tr key={item._id}>
                      <td><strong>{item.studentName}</strong></td>
                      <td><span className="entry-class-pill">{item.classApplying}</span></td>
                      <td>{item.parentName}</td>
                      <td><strong>{item.phone}</strong></td>
                      <td>{item.email || '-'}</td>
                      <td>{item.city}</td>
                      <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                  {!applications.length && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: 30, color: '#64748b' }}>
                        No online applications received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        );

      case 'addStudent':
        return (
          <DedicatedFormPanel
            entityType="student"
            title="Student"
            icon="fa-solid fa-user-plus"
            fields={recordFields.addStudent}
            items={studentsData}
            setter={setStudentsData}
            saveRecordList={saveRecordList}
            storageKey="students"
            onViewDirectory={() => setActivePanel('viewStudents')}
            settingsData={settingsData}
          />
        );

      case 'viewStudents':
        return (
          <RecordManager
            title="Students"
            description="Browse, search, print slips, and manage all enrolled student profiles."
            storageKey="students"
            items={studentsData}
            setter={setStudentsData}
            fields={recordFields.addStudent}
            addLabel="Add / Register Student"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
            onAddClick={() => setActivePanel('addStudent')}
          />
        );

      case 'staffProvision':
        return <StaffProvisioningPanel />;

      case 'addTeacher':
        return (
          <DedicatedFormPanel
            entityType="teacher"
            title="Faculty Teacher"
            icon="fa-solid fa-chalkboard-user"
            fields={recordFields.addTeacher}
            items={teachersData}
            setter={setTeachersData}
            saveRecordList={saveRecordList}
            storageKey="teachers"
            onViewDirectory={() => setActivePanel('viewTeachers')}
            settingsData={settingsData}
          />
        );

      case 'viewTeachers':
        return (
          <RecordManager
            title="Teachers"
            description="Browse faculty directory, subject specializations, and teacher credentials."
            storageKey="teachers"
            items={teachersData}
            setter={setTeachersData}
            fields={recordFields.addTeacher}
            addLabel="Onboard New Teacher"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
            onAddClick={() => setActivePanel('addTeacher')}
          />
        );

      case 'addStaff':
        return (
          <DedicatedFormPanel
            entityType="staff"
            title="Staff Member"
            icon="fa-solid fa-people-carry-box"
            fields={recordFields.addStaff}
            items={staffData}
            setter={setStaffData}
            saveRecordList={saveRecordList}
            storageKey="staff"
            onViewDirectory={() => setActivePanel('viewStaff')}
            settingsData={settingsData}
          />
        );

      case 'viewStaff':
        return (
          <RecordManager
            title="Staff"
            description="Browse non-teaching administrative, laboratory, and campus support staff directory."
            storageKey="staff"
            items={staffData}
            setter={setStaffData}
            fields={recordFields.addStaff}
            addLabel="Register Staff Member"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
            onAddClick={() => setActivePanel('addStaff')}
          />
        );

      case 'subjects':
        return (
          <RecordManager
            title="Subjects"
            description="Course curriculum, CBSE subject codes, and faculty allocation."
            storageKey="subjects"
            items={subjectsData}
            setter={setSubjectsData}
            fields={recordFields.subjects}
            addLabel="Add Subject"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'facilities':
        return (
          <RecordManager
            title="Facilities"
            description="Campus infrastructure, laboratories, and activity rooms."
            storageKey="facilities"
            items={facilitiesData}
            setter={setFacilitiesData}
            fields={recordFields.facilities}
            addLabel="Add Facility"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'comments':
        return (
          <RecordManager
            title="Comments & Inquiries"
            description="Public contact messages, parent reviews, and feedback."
            storageKey="comments"
            items={commentsData}
            setter={setCommentsData}
            fields={recordFields.comments}
            addLabel="Add Note"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'exams':
        return (
          <RecordManager
            title="Examinations"
            description="CBSE examination time tables, date sheets, and instructions."
            storageKey="exams"
            items={examsData}
            setter={setExamsData}
            fields={recordFields.exams}
            addLabel="Schedule Exam"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'studentReports':
      case 'addMarksheet':
        return (
          <MarksheetManager
            marksheetsData={marksheetsData}
            setMarksheetsData={setMarksheetsData}
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'sevaStudentReports':
      case 'viewMarksheetTeachers':
        return (
          <StudentReportsPanel
            marksheetsData={marksheetsData}
            settingsData={settingsData}
            setActivePanel={setActivePanel}
          />
        );

      case 'idCards':
        return (
          <IDCardPanel
            idCardsData={idCardsData}
            setIdCardsData={setIdCardsData}
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'admitCards':
        return (
          <AdmitCardsPanel
            applications={applications}
            admitCardsData={admitCardsData}
            setAdmitCardsData={setAdmitCardsData}
            settingsData={settingsData}
            saveRecordList={saveRecordList}
          />
        );

      case 'attendance':
        return (
          <AttendancePanel
            attendanceData={attendanceData}
            setAttendanceData={setAttendanceData}
            saveRecordList={saveRecordList}
            applications={applications}
          />
        );

      case 'fees':
        return (
          <FeesPanel
            feesData={feesData}
            setFeesData={setFeesData}
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'feeAnalysis':
        return (
          <FeeAnalysisPanel
            feesData={feesData}
            settingsData={settingsData}
          />
        );

      case 'classToppers':
        return (
          <AcademicExcellencePanel
            toppersData={toppersData}
            setToppersData={setToppersData}
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'campuses':
        return (
          <RecordManager
            title="Campus Branches Directory"
            description="Centralized multi-campus administration, branch principal oversight, and student capacity tracking."
            storageKey="campuses"
            items={campusesData}
            setter={setCampusesData}
            fields={recordFields.campuses}
            addLabel="Add Campus Branch"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'payroll':
        return (
          <RecordManager
            title="Staff & Faculty Payroll"
            description="Monthly faculty and staff compensation, salary slips, allowance structures, and bank disbursals."
            storageKey="payroll"
            items={payrollData}
            setter={setPayrollData}
            fields={recordFields.payroll}
            addLabel="Process Payroll Entry"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'transport':
        return (
          <RecordManager
            title="Transportation & Fleet Tracking"
            description="School bus routes, driver credentials, vehicle capacity, and pickup/drop coordinates."
            storageKey="transport"
            items={transportData}
            setter={setTransportData}
            fields={recordFields.transport}
            addLabel="Register Route / Bus"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'library':
        return (
          <RecordManager
            title="Library & Learning Catalog"
            description="Accession codes, book rack locations, stock availability, and circulation management."
            storageKey="library"
            items={libraryData}
            setter={setLibraryData}
            fields={recordFields.library}
            addLabel="Add Book Title"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'auditLogs':
        return (
          <RecordManager
            title="System Audit Logs"
            description="Immutable chronological security ledger recording administrative access, role elevations, and mutations."
            storageKey="auditLogs"
            items={auditLogsData}
            setter={setAuditLogsData}
            fields={recordFields.auditLogs}
            addLabel="Record Audit Entry"
            saveRecordList={saveRecordList}
            settingsData={settingsData}
          />
        );

      case 'home':
        return (
          <HomeEditor
            homeData={homeData}
            setHomeData={setHomeData}
            saveBlock={saveBlock}
          />
        );

      case 'hotels':
        return (
          <HotelsEditor
            hotelsData={hotelsData}
            setHotelsData={setHotelsData}
            saveBlock={saveBlock}
          />
        );

      case 'gallery':
        return (
          <GalleryEditor
            galleryData={galleryData}
            setGalleryData={setGalleryData}
            saveBlock={saveBlock}
          />
        );

      case 'contact':
        return (
          <ContactEditor
            contactData={contactData}
            setContactData={setContactData}
            saveBlock={saveBlock}
          />
        );

      case 'upload':
        return (
          <UploadPanel
            imageTarget={imageTarget}
            setImageTarget={setImageTarget}
            uploadFile={uploadFile}
            setUploadFile={setUploadFile}
            handleUpload={handleUpload}
            isUploading={isUploading}
            uploadResult={uploadResult}
          />
        );

      case 'settings':
        return (
          <SettingsPanel
            settingsData={settingsData}
            setSettingsData={setSettingsData}
            saveBlock={saveBlock}
          />
        );

      default:
        return (
          <DashboardOverview
            attendanceData={attendanceData}
            applications={applications}
            studentsData={studentsData}
            teachersData={teachersData}
            staffData={staffData}
            feesData={feesData}
            examsData={examsData}
            campusesData={campusesData}
            usersData={usersData}
            setActivePanel={setActivePanel}
            handleSaveAll={handleSaveAll}
          />
        );
    }
  };

  const activeRoleConfig = roleDefinitions[currentRole] || roleDefinitions.super_admin;

  return (
    <div className="admin-portal">
      {/* Sidebar Navigation */}
      <aside
        className={`portal-sidebar no-print ${isSidebarCollapsed ? 'collapsed' : ''}`}
        aria-label="Administrative navigation"
      >
        <div className="portal-brand">
          <div className="portal-brand-content">
            <div className="portal-brand-icon" aria-hidden="true">
              L
            </div>
            {!isSidebarCollapsed && (
              <div className="portal-brand-text">
                <strong>LBMDPS</strong>
                <span>{activeRoleConfig.label.toUpperCase()} PORTAL</span>
              </div>
            )}
            <button
              type="button"
              className="portal-sidebar-toggle-btn"
              onClick={toggleSidebar}
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!isSidebarCollapsed}
            >
              <i className={`fa-solid ${isSidebarCollapsed ? 'fa-angles-right' : 'fa-angles-left'}`}></i>
            </button>
          </div>

          {/* Current Role Indicator Pill */}
          {!isSidebarCollapsed && (
            <div className="portal-role-pill">
              <span className="role-pill-label">Access Level:</span>
              <span className="role-pill-badge">
                <i className={activeRoleConfig.icon} style={{ marginRight: 4 }}></i> {activeRoleConfig.label}
              </span>
            </div>
          )}
        </div>

        {!isSidebarCollapsed && (
          <div className="portal-sidebar-search">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input
              type="search"
              value={sidebarSearch}
              onChange={(event) => setSidebarSearch(event.target.value)}
              placeholder="Search navigation"
              aria-label="Search dashboard navigation"
            />
            {sidebarSearch && (
              <button
                type="button"
                onClick={() => setSidebarSearch('')}
                aria-label="Clear navigation search"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            )}
          </div>
        )}

        <nav aria-label="Dashboard sections">
          <PortalButton
            active={activePanel === 'dashboard'}
            icon="fa-solid fa-chart-line"
            onClick={() => selectPanel('dashboard')}
            title="Dashboard Overview"
          >
            {!isSidebarCollapsed && "Dashboard"}
          </PortalButton>

          {visibleMenuGroups.map((group) => (
            <div key={group.id} className="portal-menu-group">
              <button
                type="button"
                className="portal-nav-button"
                onClick={() => {
                  if (isSidebarCollapsed) {
                    setIsSidebarCollapsed(false);
                    setOpenMenus((prev) => ({ ...prev, [group.id]: true }));
                    return;
                  }
                  toggleMenu(group.id);
                }}
                style={{ justifyContent: isSidebarCollapsed ? 'center' : 'space-between' }}
                title={group.title}
                aria-expanded={normalizedSidebarSearch ? true : Boolean(openMenus[group.id])}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="portal-nav-icon"><i className={group.icon}></i></span>
                  {!isSidebarCollapsed && <span>{group.title}</span>}
                </span>
                {!isSidebarCollapsed && (
                  <i className={`fa-solid fa-chevron-${openMenus[group.id] ? 'down' : 'right'}`} style={{ fontSize: 11, color: '#94a3b8' }}></i>
                )}
              </button>

              {(openMenus[group.id] || normalizedSidebarSearch) && !isSidebarCollapsed && (
                <div className="portal-submenu">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`portal-nav-button ${activePanel === item.id ? 'active' : ''}`}
                      onClick={() => selectPanel(item.id)}
                      title={item.label}
                      aria-current={activePanel === item.id ? 'page' : undefined}
                    >
                      <i className={item.icon} style={{ width: 16, textAlign: 'center', fontSize: 12 }}></i>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {normalizedSidebarSearch && visibleMenuGroups.length === 0 && (
            <p className="portal-sidebar-empty">No matching sections found.</p>
          )}
        </nav>
      </aside>

      {/* Mobile Drawer Backdrop (Mobile only) */}
      {isMobile && !isSidebarCollapsed && (
        <div
          className="portal-sidebar-backdrop"
          onClick={() => setIsSidebarCollapsed(true)}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Main Content Pane */}
      <main className="portal-main">
        <header className="portal-topbar no-print">
          <div className="portal-topbar-left-wrap">
            <div className="portal-topbar-info">
              <div className="portal-topbar-title-row">
                <span className="portal-school-acronym">LBMDPS</span>
                <h1>{currentRole === 'super_admin' ? 'Super Admin Master Console' : `${activeRoleConfig.label} Portal`}</h1>
                <span className="portal-session-tag">Session {settingsData?.session || '2026-2027'}</span>
                {currentRole === 'super_admin' && (
                  <span className="super-admin-topbar-badge">
                    <i className="fa-solid fa-crown"></i> Master Mode
                  </span>
                )}
              </div>
              <p className="portal-topbar-subtitle">
                Lal Bihari Mahto Divine Public School • CBSE Affiliation No. 3430398 • UDISE: 20060105502 • Naitand, Giridih
              </p>
            </div>
          </div>

          <div className="portal-topbar-actions">
            {/* Primary Action Buttons */}
            <div className="portal-cta-group">
              <button type="button" className="portal-primary-action" onClick={handleSaveAll} title="Save All Changes">
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>Save All</span>
              </button>
              <button type="button" className="portal-logout" onClick={handleLogout} title="Log Out">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {status && <div className="portal-status no-print">{status}</div>}

        <div className="portal-content-frame">
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
}
