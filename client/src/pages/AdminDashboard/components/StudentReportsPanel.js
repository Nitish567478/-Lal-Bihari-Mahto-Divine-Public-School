import React, { useState } from 'react';
import { classList } from '../constants/adminData';

export default function StudentReportsPanel({
  marksheetsData = [],
  settingsData,
  setActivePanel,
}) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');

  const filteredReports = marksheetsData.filter(m => {
    const matchesSearch = !searchTerm.trim() ||
      (m.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.rollNo || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'All' || m.className === filterClass;
    return matchesSearch && matchesClass;
  });

  const totalAppeared = filteredReports.length;
  const passedCount = filteredReports.filter(r => (r.result || '').toUpperCase().includes('PASS')).length;
  const distinctionCount = filteredReports.filter(r => (r.percentage || '').replace('%', '') >= 75).length;
  const passRate = totalAppeared > 0 ? ((passedCount / totalAppeared) * 100).toFixed(1) : '100.0';

  return (
    <section className="portal-section student-reports-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-square-poll-vertical"></i> Student Academic Performance Reports</h2>
          <p className="portal-muted">Comprehensive class-wise results, marksheet evaluations, and scholastic performance summaries.</p>
        </div>
        <div className="header-actions no-print">
          <button type="button" className="portal-primary-action" onClick={() => setActivePanel('studentReports')}>
            <i className="fa-solid fa-plus"></i> Add New Marksheet
          </button>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="portal-stats-grid">
        <article className="stat-card stat-presence">
          <div className="stat-icon"><i className="fa-solid fa-graduation-cap"></i></div>
          <div className="stat-content">
            <span>Pass Percentage</span>
            <strong>{passRate}%</strong>
            <small>{passedCount} of {totalAppeared} Students Passed</small>
          </div>
        </article>
        <article className="stat-card stat-students">
          <div className="stat-icon"><i className="fa-solid fa-users"></i></div>
          <div className="stat-content">
            <span>Evaluated Students</span>
            <strong>{totalAppeared}</strong>
            <small>Active Marksheets</small>
          </div>
        </article>
        <article className="stat-card stat-teachers">
          <div className="stat-icon"><i className="fa-solid fa-award"></i></div>
          <div className="stat-content">
            <span>Distinctions (75%+)</span>
            <strong>{distinctionCount}</strong>
            <small>Top Academic Achievers</small>
          </div>
        </article>
      </div>

      {/* Filters */}
      <div className="portal-panel-block structured-controls" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label className="field-title" style={{ fontSize: 12 }}>Search Student</label>
            <input
              className="form-input-control"
              placeholder="Search by student name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ width: 200 }}>
            <label className="field-title" style={{ fontSize: 12 }}>Select Class</label>
            <select
              className="form-input-control"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="All">All Classes</option>
              {classList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="portal-table-wrap portal-panel-block" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="portal-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Marks Scored</th>
              <th>Percentage</th>
              <th>CBSE Grade</th>
              <th>Result Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.rollNo}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0b1c3d', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 'bold' }}>
                      {(item.studentName || 'S').charAt(0).toUpperCase()}
                    </div>
                    <strong>{item.studentName}</strong>
                  </div>
                </td>
                <td><span className="entry-class-pill">{item.className}</span></td>
                <td><strong>{item.totalMarks} / {item.maxTotal || 600}</strong></td>
                <td><strong style={{ color: '#1e3a8a' }}>{item.percentage}</strong></td>
                <td><span className={`grade-badge ${item.finalGrade?.toLowerCase().replace('+', 'plus')}`}>{item.finalGrade}</span></td>
                <td><span className="status-pill active">{item.result || 'PASSED'}</span></td>
                <td>
                  <button
                    className="portal-primary-action"
                    style={{ padding: '6px 14px', fontSize: 12 }}
                    onClick={() => setSelectedReport(item)}
                  >
                    <i className="fa-solid fa-file-invoice"></i> View Report Card
                  </button>
                </td>
              </tr>
            ))}
            {!filteredReports.length && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: 30, color: '#64748b' }}>
                  No performance records found for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <div className="portal-modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="portal-modal-content professional-marksheet print-area" style={{ maxWidth: 800 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Student Performance Report</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="portal-primary-action" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Report Card (PDF)
                </button>
                <button className="close-modal" onClick={() => setSelectedReport(null)}>&times;</button>
              </div>
            </div>

            <div className="marksheet-border-outer">
              <div className="marksheet-border-inner">
                <div className="marksheet-header">
                  <div className="school-logo-placeholder">LBMDPS</div>
                  <h1>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>
                  <p className="school-addr">NAITAND, BANDIYABAD, DISTRICT GIRIDIH, JHARKHAND - 815316</p>
                  <p className="school-affil">Affiliated to Central Board of Secondary Education (CBSE) • Estd. 2013</p>
                  <h2 className="report-title">ANNUAL ACADEMIC PROGRESS REPORT</h2>
                  <p className="academic-session">Academic Session: {settingsData?.session || '2026-2027'}</p>
                </div>

                <div className="marksheet-student-box-structured">
                  <div className="info-item"><strong>Roll Number:</strong> <span>{selectedReport.rollNo}</span></div>
                  <div className="info-item"><strong>Student Name:</strong> <span style={{ textTransform: 'uppercase', fontWeight: 800 }}>{selectedReport.studentName}</span></div>
                  <div className="info-item"><strong>Class & Section:</strong> <span>{selectedReport.className}</span></div>
                  <div className="info-item"><strong>Father / Guardian:</strong> <span>{selectedReport.fatherName || '-'}</span></div>
                </div>

                <table className="marksheet-table-professional">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>S.No</th>
                      <th>Scholastic Subject</th>
                      <th>Max Marks</th>
                      <th>Theory</th>
                      <th>Practical / IA</th>
                      <th>Marks Obtained</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedReport.subjects || []).map((sub, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                        <td><strong>{sub.name}</strong></td>
                        <td style={{ textAlign: 'center' }}>{sub.maxMarks || 100}</td>
                        <td style={{ textAlign: 'center' }}>{sub.theory || '-'}</td>
                        <td style={{ textAlign: 'center' }}>{sub.practical || '-'}</td>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{sub.obtained}</td>
                        <td style={{ textAlign: 'center' }}><span className="grade-badge aplus">{sub.grade || 'A'}</span></td>
                      </tr>
                    ))}
                    <tr className="total-row-highlight">
                      <td colSpan="2" style={{ textAlign: 'right', fontWeight: 900 }}>GRAND TOTAL:</td>
                      <td style={{ textAlign: 'center' }}>{selectedReport.maxTotal || 600}</td>
                      <td colSpan="2"></td>
                      <td style={{ textAlign: 'center', fontSize: '1rem', color: '#1e3a8a' }}>{selectedReport.totalMarks}</td>
                      <td style={{ textAlign: 'center' }}><span className="grade-badge aplus">{selectedReport.finalGrade}</span></td>
                    </tr>
                  </tbody>
                </table>

                <div className="marksheet-result-summary">
                  <div>
                    <p><strong>Overall Percentage:</strong> <span style={{ color: '#1e3a8a', fontWeight: 800, fontSize: '1rem' }}>{selectedReport.percentage}</span></p>
                    <p><strong>Final Result:</strong> <span style={{ color: '#15803d', fontWeight: 800 }}>{selectedReport.result || 'PASSED'}</span></p>
                  </div>
                  <div style={{ maxWidth: 360, textAlign: 'right' }}>
                    <p><strong>Teacher Remarks:</strong> <em>"{selectedReport.remarks || 'Excellent academic progress.'}"</em></p>
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
                    <span>Principal Signature & Seal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
