import React, { useState } from 'react';
import { classList } from '../constants/adminData';

const defaultSubjects = [
  { name: 'Mathematics', maxMarks: 100, theory: 75, practical: 20, obtained: 95, grade: 'A+' },
  { name: 'Science', maxMarks: 100, theory: 70, practical: 19, obtained: 89, grade: 'A' },
  { name: 'English', maxMarks: 100, theory: 72, practical: 20, obtained: 92, grade: 'A+' },
  { name: 'Hindi', maxMarks: 100, theory: 78, practical: 18, obtained: 96, grade: 'A+' },
  { name: 'Social Science', maxMarks: 100, theory: 68, practical: 20, obtained: 88, grade: 'A' },
  { name: 'Computer Applications', maxMarks: 100, theory: 76, practical: 20, obtained: 96, grade: 'A+' },
];

export default function MarksheetManager({
  marksheetsData = [],
  setMarksheetsData,
  saveRecordList,
  settingsData,
}) {
  const [selectedMarksheet, setSelectedMarksheet] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');

  const [newForm, setNewForm] = useState({
    rollNo: '',
    studentName: '',
    fatherName: '',
    className: 'Class 10',
    term: 'Annual Examination 2026-2027',
    remarks: 'Consistent academic performance and positive conduct.',
    subjects: defaultSubjects.map(s => ({ ...s })),
  });

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 33) return 'D';
    return 'F';
  };

  const handleSubjectMarkChange = (index, field, value) => {
    const subs = [...newForm.subjects];
    subs[index][field] = Number(value) || 0;
    subs[index].obtained = (Number(subs[index].theory) || 0) + (Number(subs[index].practical) || 0);
    const perc = (subs[index].obtained / (subs[index].maxMarks || 100)) * 100;
    subs[index].grade = calculateGrade(perc);
    setNewForm({ ...newForm, subjects: subs });
  };

  const handleAddMarksheet = (e) => {
    e.preventDefault();
    if (!newForm.studentName.trim() || !newForm.rollNo.trim()) {
      alert('Please fill student name and roll number.');
      return;
    }

    const totalMarks = newForm.subjects.reduce((sum, s) => sum + (Number(s.obtained) || 0), 0);
    const maxTotal = newForm.subjects.reduce((sum, s) => sum + (Number(s.maxMarks) || 100), 0);
    const percNum = maxTotal > 0 ? (totalMarks / maxTotal) * 100 : 0;
    const percentage = `${percNum.toFixed(2)}%`;
    const finalGrade = calculateGrade(percNum);
    const result = percNum >= 33 ? (percNum >= 75 ? 'PASSED with Distinction' : 'PASSED') : 'ESSENTIAL REPEAT';

    const item = {
      id: `ms-${Date.now()}`,
      rollNo: newForm.rollNo.trim(),
      studentName: newForm.studentName.trim(),
      fatherName: newForm.fatherName.trim() || 'Parent/Guardian',
      className: newForm.className,
      term: newForm.term,
      subjects: newForm.subjects,
      totalMarks,
      maxTotal,
      percentage,
      finalGrade,
      result,
      remarks: newForm.remarks,
      createdAt: new Date().toISOString(),
    };

    const updated = [item, ...marksheetsData];
    setMarksheetsData(updated);
    if (saveRecordList) saveRecordList('marksheets', updated);
    setShowAddModal(false);
    setSelectedMarksheet(item);
  };

  const handleDeleteMarksheet = (id, name) => {
    if (window.confirm(`Are you sure you want to delete Marksheet for ${name}?`)) {
      const updated = marksheetsData.filter(m => m.id !== id);
      setMarksheetsData(updated);
      if (saveRecordList) saveRecordList('marksheets', updated);
    }
  };

  const filteredMarksheets = marksheetsData.filter(m => {
    const matchesSearch = !searchTerm.trim() ||
      (m.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.rollNo || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'All' || m.className === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <section className="portal-section marksheet-manager-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-file-lines"></i> Student Marksheets & Report Cards</h2>
          <p className="portal-muted">Generate, evaluate, and print official CBSE Annual Progress Reports.</p>
        </div>
        <div className="header-actions no-print" style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="save-btn-alt" onClick={() => saveRecordList('marksheets', marksheetsData)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Data
          </button>
          <button type="button" className="portal-primary-action" onClick={() => setShowAddModal(true)}>
            <i className="fa-solid fa-plus"></i> Create Student Marksheet
          </button>
        </div>
      </div>

      {/* Filter Controls */}
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
            <label className="field-title" style={{ fontSize: 12 }}>Filter Class</label>
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

      {/* Marksheets Table */}
      <div className="portal-table-wrap portal-panel-block" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="portal-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Total Marks</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarksheets.map((m) => (
              <tr key={m.id}>
                <td><strong>{m.rollNo}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0b1c3d', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 'bold' }}>
                      {(m.studentName || 'S').charAt(0).toUpperCase()}
                    </div>
                    <strong>{m.studentName}</strong>
                  </div>
                </td>
                <td><span className="entry-class-pill">{m.className}</span></td>
                <td><strong>{m.totalMarks} / {m.maxTotal}</strong></td>
                <td><strong style={{ color: '#1e3a8a' }}>{m.percentage}</strong></td>
                <td><span className={`grade-badge ${m.finalGrade?.toLowerCase().replace('+', 'plus')}`}>{m.finalGrade}</span></td>
                <td><span className="status-pill active">{m.result || 'PASSED'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="portal-primary-action"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={() => setSelectedMarksheet(m)}
                      title="View & Print Official Marksheet"
                    >
                      <i className="fa-solid fa-eye"></i> View Card
                    </button>
                    <button
                      className="portal-danger-action"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={() => handleDeleteMarksheet(m.id, m.studentName)}
                      title="Delete Marksheet"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filteredMarksheets.length && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: 30, color: '#64748b' }}>
                  No marksheets found. Click "Create Student Marksheet" to issue a new report card.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Marksheet Modal */}
      {showAddModal && (
        <div className="portal-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="portal-modal-content structured-form-card" style={{ maxWidth: 780, maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Create Student Marksheet</h2>
                <p className="portal-muted">Enter subject marks and academic evaluation details</p>
              </div>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddMarksheet}>
              <div className="professional-form-grid" style={{ marginBottom: 18 }}>
                <div className="form-field-group">
                  <label className="field-title">Roll Number *</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. 101"
                    value={newForm.rollNo}
                    onChange={e => setNewForm({ ...newForm, rollNo: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Student Full Name *</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. Aarav Kumar"
                    value={newForm.studentName}
                    onChange={e => setNewForm({ ...newForm, studentName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Father / Guardian Name</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. Rajesh Kumar"
                    value={newForm.fatherName}
                    onChange={e => setNewForm({ ...newForm, fatherName: e.target.value })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Class *</label>
                  <select
                    className="form-input-control"
                    value={newForm.className}
                    onChange={e => setNewForm({ ...newForm, className: e.target.value })}
                  >
                    {classList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Subject Marks Table Entry */}
              <h4 style={{ margin: '14px 0 8px', fontSize: '0.9rem', color: '#0b1c3d', textTransform: 'uppercase' }}>
                <i className="fa-solid fa-list-check"></i> Subject Evaluation Breakdown
              </h4>
              <table className="marksheet-table-professional" style={{ marginBottom: 16 }}>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th style={{ width: 80 }}>Max</th>
                    <th style={{ width: 90 }}>Theory</th>
                    <th style={{ width: 90 }}>Practical</th>
                    <th style={{ width: 90 }}>Obtained</th>
                    <th style={{ width: 70 }}>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {newForm.subjects.map((sub, idx) => (
                    <tr key={idx}>
                      <td><strong>{sub.name}</strong></td>
                      <td style={{ textAlign: 'center' }}>{sub.maxMarks}</td>
                      <td>
                        <input
                          type="number"
                          className="form-input-control"
                          style={{ height: 32, padding: '0 6px', textAlign: 'center' }}
                          value={sub.theory}
                          onChange={e => handleSubjectMarkChange(idx, 'theory', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-input-control"
                          style={{ height: 32, padding: '0 6px', textAlign: 'center' }}
                          value={sub.practical}
                          onChange={e => handleSubjectMarkChange(idx, 'practical', e.target.value)}
                        />
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#1e3a8a' }}>{sub.obtained}</td>
                      <td style={{ textAlign: 'center' }}><span className="grade-badge aplus">{sub.grade}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="form-field-group" style={{ marginBottom: 20 }}>
                <label className="field-title">Teacher Remarks & Conduct</label>
                <textarea
                  className="form-input-control textarea-control"
                  rows={2}
                  value={newForm.remarks}
                  onChange={e => setNewForm({ ...newForm, remarks: e.target.value })}
                />
              </div>

              <div className="form-footer-actions">
                <button type="button" className="portal-danger-action" onClick={() => setShowAddModal(false)}>
                  <i className="fa-solid fa-xmark"></i> Cancel
                </button>
                <button type="submit" className="portal-primary-action save-large-btn">
                  <i className="fa-solid fa-circle-check"></i> Save & Generate Marksheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official CBSE Marksheet Certificate Modal */}
      {selectedMarksheet && (
        <div className="portal-modal-overlay" onClick={() => setSelectedMarksheet(null)}>
          <div className="portal-modal-content professional-marksheet print-area" onClick={e => e.stopPropagation()}>
            <div className="modal-header no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>CBSE Annual Progress Report</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="portal-primary-action" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Marksheet (PDF)
                </button>
                <button className="close-modal" onClick={() => setSelectedMarksheet(null)}>&times;</button>
              </div>
            </div>

            <div className="marksheet-border-outer">
              <div className="marksheet-border-inner">
                <div className="marksheet-header">
                  <div className="school-logo-placeholder">LBMDPS</div>
                  <h1>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>
                  <p className="school-addr">NAITAND, POST BANDIYABAD, DISTRICT GIRIDIH, JHARKHAND - 815316</p>
                  <p className="school-affil">Affiliated to Central Board of Secondary Education (CBSE) • Estd. 2013</p>
                  <h2 className="report-title">ANNUAL ACADEMIC PROGRESS REPORT</h2>
                  <p className="academic-session">Academic Session: {settingsData?.session || '2026-2027'}</p>
                </div>

                <div className="marksheet-student-box-structured">
                  <div className="info-item"><strong>Roll Number:</strong> <span>{selectedMarksheet.rollNo}</span></div>
                  <div className="info-item"><strong>Student Name:</strong> <span style={{ textTransform: 'uppercase', fontWeight: 800 }}>{selectedMarksheet.studentName}</span></div>
                  <div className="info-item"><strong>Class & Section:</strong> <span>{selectedMarksheet.className}</span></div>
                  <div className="info-item"><strong>Father / Guardian:</strong> <span>{selectedMarksheet.fatherName || '-'}</span></div>
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
                    {(selectedMarksheet.subjects || defaultSubjects).map((sub, idx) => (
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
                      <td style={{ textAlign: 'center' }}>{selectedMarksheet.maxTotal || 600}</td>
                      <td colSpan="2"></td>
                      <td style={{ textAlign: 'center', fontSize: '1rem', color: '#1e3a8a' }}>{selectedMarksheet.totalMarks}</td>
                      <td style={{ textAlign: 'center' }}><span className="grade-badge aplus">{selectedMarksheet.finalGrade}</span></td>
                    </tr>
                  </tbody>
                </table>

                <div className="marksheet-result-summary">
                  <div>
                    <p><strong>Overall Percentage:</strong> <span style={{ color: '#1e3a8a', fontWeight: 800, fontSize: '1rem' }}>{selectedMarksheet.percentage}</span></p>
                    <p><strong>Final Result:</strong> <span style={{ color: '#15803d', fontWeight: 800 }}>{selectedMarksheet.result || 'PASSED'}</span></p>
                  </div>
                  <div style={{ maxWidth: 360, textAlign: 'right' }}>
                    <p><strong>Teacher Remarks:</strong> <em>"{selectedMarksheet.remarks || 'Excellent academic progress.'}"</em></p>
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
