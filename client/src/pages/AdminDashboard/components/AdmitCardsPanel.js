import React, { useState } from 'react';
import { classList } from '../constants/adminData';

export default function AdmitCardsPanel({
  applications = [],
  admitCardsData = [],
  setAdmitCardsData,
  settingsData,
  saveRecordList,
}) {
  const [search, setSearch] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCardForm, setNewCardForm] = useState({
    studentName: '',
    parentName: '',
    className: 'Class 1',
    rollNo: '',
    examName: 'Annual Examination 2026-2027',
    centerName: 'LBMDPS Campus Examination Center, Naitand',
    phone: '',
    dob: '',
    address: 'Naitand, Giridih, Jharkhand',
  });

  const cardsList = Array.isArray(admitCardsData) ? admitCardsData : [];

  const defaultSchedule = [
    { date: '15/03/2026 (Mon)', time: '09:00 AM - 12:00 PM', code: '041', subject: 'Mathematics', room: 'Hall A' },
    { date: '17/03/2026 (Wed)', time: '09:00 AM - 12:00 PM', code: '086', subject: 'Science', room: 'Hall A' },
    { date: '19/03/2026 (Fri)', time: '09:00 AM - 12:00 PM', code: '184', subject: 'English Language & Lit.', room: 'Hall A' },
    { date: '22/03/2026 (Mon)', time: '09:00 AM - 12:00 PM', code: '085', subject: 'Hindi Course-A', room: 'Hall A' },
    { date: '24/03/2026 (Wed)', time: '09:00 AM - 12:00 PM', code: '087', subject: 'Social Science', room: 'Hall A' },
    { date: '26/03/2026 (Fri)', time: '09:00 AM - 12:00 PM', code: '165', subject: 'Computer Applications', room: 'Lab 1' },
  ];

  const handleCreateCard = (e) => {
    e.preventDefault();
    if (!newCardForm.studentName.trim()) {
      alert('Please enter student name');
      return;
    }
    const year = new Date().getFullYear();
    const num = Math.floor(1000 + Math.random() * 9000);
    const card = {
      id: `admit-${Date.now()}`,
      admitCardNo: `LBMDPS-${year}-${num}`,
      studentName: newCardForm.studentName.trim(),
      parentName: newCardForm.parentName.trim() || 'Parent/Guardian',
      className: newCardForm.className,
      rollNo: newCardForm.rollNo.trim() || String(num).slice(0, 3),
      examName: newCardForm.examName || 'Annual Examination 2026-2027',
      centerName: newCardForm.centerName || 'LBMDPS Campus Exam Center, Naitand',
      phone: newCardForm.phone.trim() || '9431378901',
      dob: newCardForm.dob || '2015-05-10',
      address: newCardForm.address || 'Naitand, Giridih, Jharkhand',
      status: 'Issued',
      dateOfIssue: new Date().toLocaleDateString(),
      schedule: defaultSchedule,
      createdAt: new Date().toISOString(),
    };

    const updated = [card, ...cardsList];
    setAdmitCardsData(updated);
    if (saveRecordList) saveRecordList('admitCards', updated);
    setShowCreateModal(false);
    setSelectedCard(card);
    setNewCardForm({
      studentName: '',
      parentName: '',
      className: 'Class 1',
      rollNo: '',
      examName: 'Annual Examination 2026-2027',
      centerName: 'LBMDPS Campus Examination Center, Naitand',
      phone: '',
      dob: '',
      address: 'Naitand, Giridih, Jharkhand',
    });
  };

  const handleGenerateFromApp = (app) => {
    const year = new Date().getFullYear();
    const num = Math.floor(1000 + Math.random() * 9000);
    const card = {
      id: `admit-${Date.now()}`,
      applicationId: app._id,
      admitCardNo: `LBMDPS-${year}-${num}`,
      studentName: app.studentName,
      parentName: app.parentName || app.fatherName || '-',
      className: app.classApplying || 'Nursery',
      rollNo: app.rollNo || String(num).slice(0, 3),
      examName: 'CBSE Annual Examination 2026-2027',
      centerName: 'LBMDPS Examination Center, Naitand, Giridih',
      phone: app.phone || '9431378901',
      dob: app.dob || '2016-04-12',
      address: app.address || app.city || 'Naitand, Giridih, Jharkhand',
      photo: app.photo,
      status: 'Issued',
      dateOfIssue: new Date().toLocaleDateString(),
      schedule: defaultSchedule,
      createdAt: new Date().toISOString(),
    };

    const updated = [card, ...cardsList.filter(c => c.applicationId !== app._id)];
    setAdmitCardsData(updated);
    if (saveRecordList) saveRecordList('admitCards', updated);
    setSelectedCard(card);
  };

  const handleDeleteCard = (cardId, studentName) => {
    if (window.confirm(`Are you sure you want to delete Admit Card for ${studentName || 'this student'}?`)) {
      const updated = cardsList.filter(c => c.id !== cardId);
      setAdmitCardsData(updated);
      if (saveRecordList) saveRecordList('admitCards', updated);
    }
  };

  const filteredCards = cardsList.filter(c => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (c.studentName || '').toLowerCase().includes(q) ||
      (c.className || '').toLowerCase().includes(q) ||
      (c.admitCardNo || '').toLowerCase().includes(q) ||
      (c.rollNo || '').toLowerCase().includes(q)
    );
  });

  return (
    <section className="portal-section admit-cards-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-receipt"></i> CBSE Examination Admit Cards / Hall Tickets</h2>
          <p className="portal-muted">Generate, manage, and print official CBSE examination admit cards with date sheet schedule.</p>
        </div>
        <div className="header-actions no-print" style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="save-btn-alt" onClick={() => saveRecordList('admitCards', cardsList)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Data
          </button>
          <button type="button" className="portal-primary-action" onClick={() => setShowCreateModal(true)}>
            <i className="fa-solid fa-plus"></i> Generate New Admit Card
          </button>
        </div>
      </div>

      <div className="portal-panel-block structured-controls" style={{ marginBottom: 20 }}>
        <input
          className="form-input-control"
          placeholder="Search admit cards by student name, class, roll no, or admit card number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Existing Admit Cards Table */}
      <div className="portal-table-wrap portal-panel-block" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        <table className="portal-table">
          <thead>
            <tr>
              <th>Admit Card No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Roll No</th>
              <th>Exam Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCards.map((card) => (
              <tr key={card.id}>
                <td><strong style={{ color: '#1e3a8a' }}>{card.admitCardNo}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0b1c3d', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>
                      {(card.studentName || 'S').charAt(0).toUpperCase()}
                    </div>
                    <strong>{card.studentName}</strong>
                  </div>
                </td>
                <td><span className="entry-class-pill">{card.className}</span></td>
                <td><strong>{card.rollNo || '-'}</strong></td>
                <td><small>{card.examName || 'Annual Exam'}</small></td>
                <td><span className="status-pill active">ISSUED</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="portal-primary-action"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={() => setSelectedCard(card)}
                      title="View & Print Admit Card"
                    >
                      <i className="fa-solid fa-eye"></i> View Card
                    </button>
                    <button
                      className="portal-danger-action"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={() => handleDeleteCard(card.id, card.studentName)}
                      title="Delete Admit Card"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filteredCards.length && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: 30, color: '#64748b' }}>
                  No admit cards issued yet. Click "Generate New Admit Card" or select an application below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Generate from Enrolled Students */}
      {applications && applications.length > 0 && (
        <div className="portal-panel-block" style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', marginBottom: 12 }}>
            <i className="fa-solid fa-user-graduate"></i> Quick Generate From Student Applications
          </h3>
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Parent Name</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 8).map((app) => (
                  <tr key={app._id}>
                    <td><strong>{app.studentName}</strong></td>
                    <td><span className="entry-class-pill">{app.classApplying}</span></td>
                    <td>{app.parentName}</td>
                    <td>{app.phone}</td>
                    <td>
                      <button
                        className="portal-primary-action"
                        style={{ padding: '6px 14px', fontSize: 12 }}
                        onClick={() => handleGenerateFromApp(app)}
                      >
                        <i className="fa-solid fa-receipt"></i> Generate Admit Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="portal-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="portal-modal-content structured-form-card" style={{ maxWidth: 680 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #e2e8f0', paddingBottom: 12 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Generate New Admit Card</h2>
                <p className="portal-muted">Enter student and examination details to issue official hall ticket</p>
              </div>
              <button className="close-modal" onClick={() => setShowCreateModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleCreateCard}>
              <div className="professional-form-grid">
                <div className="form-field-group">
                  <label className="field-title">Student Name *</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. Nitish Kumar"
                    value={newCardForm.studentName}
                    onChange={e => setNewCardForm({ ...newCardForm, studentName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Father / Guardian Name</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. Basant Yadav"
                    value={newCardForm.parentName}
                    onChange={e => setNewCardForm({ ...newCardForm, parentName: e.target.value })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Class *</label>
                  <select
                    className="form-input-control"
                    value={newCardForm.className}
                    onChange={e => setNewCardForm({ ...newCardForm, className: e.target.value })}
                  >
                    {classList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-field-group">
                  <label className="field-title">Roll Number</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. 101"
                    value={newCardForm.rollNo}
                    onChange={e => setNewCardForm({ ...newCardForm, rollNo: e.target.value })}
                  />
                </div>
                <div className="form-field-group field-span-2">
                  <label className="field-title">Examination Title</label>
                  <input
                    className="form-input-control"
                    value={newCardForm.examName}
                    onChange={e => setNewCardForm({ ...newCardForm, examName: e.target.value })}
                  />
                </div>
                <div className="form-field-group field-span-2">
                  <label className="field-title">Examination Center</label>
                  <input
                    className="form-input-control"
                    value={newCardForm.centerName}
                    onChange={e => setNewCardForm({ ...newCardForm, centerName: e.target.value })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Emergency Contact (10-Digit)</label>
                  <input
                    className="form-input-control"
                    maxLength={10}
                    placeholder="10-digit number"
                    value={newCardForm.phone}
                    onChange={e => setNewCardForm({ ...newCardForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Date of Birth</label>
                  <input
                    type="date"
                    className="form-input-control"
                    value={newCardForm.dob}
                    onChange={e => setNewCardForm({ ...newCardForm, dob: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-footer-actions">
                <button type="button" className="portal-danger-action" onClick={() => setShowCreateModal(false)}>
                  <i className="fa-solid fa-xmark"></i> Cancel
                </button>
                <button type="submit" className="portal-primary-action save-large-btn">
                  <i className="fa-solid fa-circle-check"></i> Generate Admit Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official CBSE Hall Ticket Modal Preview */}
      {selectedCard && (
        <div className="portal-modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="portal-modal-content professional-marksheet print-area" style={{ maxWidth: 820 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>CBSE Examination Admit Card</h2>
                <p className="portal-muted">Official Hall Ticket for {selectedCard.studentName}</p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="portal-primary-action" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Admit Card (PDF)
                </button>
                <button className="close-modal" onClick={() => setSelectedCard(null)}>&times;</button>
              </div>
            </div>

            <div className="marksheet-border-outer">
              <div className="marksheet-border-inner">
                <div className="marksheet-header">
                  <div className="school-logo-placeholder">LBMDPS</div>
                  <h1>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>
                  <p className="school-addr">NAITAND, POST BANDIYABAD, DISTRICT GIRIDIH, JHARKHAND - 815316</p>
                  <p className="school-affil">CBSE Affiliated Secondary School (Class 1 to 10) • Estd. 2013</p>
                  <h2 className="report-title" style={{ color: '#0b1c3d', borderTop: '1px solid #0b1c3d', borderBottom: '1px solid #0b1c3d', padding: '6px 0', marginTop: 10 }}>
                    {selectedCard.examName ? selectedCard.examName.toUpperCase() : 'CBSE ANNUAL EXAMINATION ADMIT CARD'}
                  </h2>
                  <p className="academic-session">Academic Session: {settingsData?.session || '2026-2027'}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 16, marginBottom: 16, background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px' }}>
                    <div><strong>Admit Card No:</strong> <span style={{ color: '#1e3a8a', fontWeight: 800 }}>{selectedCard.admitCardNo}</span></div>
                    <div><strong>Roll Number:</strong> <span style={{ fontWeight: 800 }}>{selectedCard.rollNo || '-'}</span></div>
                    <div><strong>Candidate Name:</strong> <span style={{ fontWeight: 800, textTransform: 'uppercase' }}>{selectedCard.studentName}</span></div>
                    <div><strong>Father's Name:</strong> <span>{selectedCard.parentName || '-'}</span></div>
                    <div><strong>Class & Section:</strong> <span style={{ fontWeight: 800 }}>{selectedCard.className}</span></div>
                    <div><strong>Date of Birth:</strong> <span>{selectedCard.dob || '-'}</span></div>
                    <div style={{ gridColumn: 'span 2' }}><strong>Examination Center:</strong> <span>{selectedCard.centerName || 'LBMDPS Campus, Naitand, Giridih'}</span></div>
                  </div>

                  <div style={{ width: 120, height: 130, border: '2px solid #0b1c3d', borderRadius: 6, overflow: 'hidden', background: '#e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedCard.photo ? (
                      <img src={selectedCard.photo} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ textAlign: 'center', color: '#64748b' }}>
                        <i className="fa-solid fa-user-graduate" style={{ fontSize: 32 }}></i>
                        <div style={{ fontSize: 10, fontWeight: 'bold', marginTop: 4 }}>AFFIX PHOTO</div>
                      </div>
                    )}
                  </div>
                </div>

                <h4 style={{ margin: '14px 0 8px 0', fontSize: '0.9rem', color: '#0b1c3d', textTransform: 'uppercase' }}>
                  <i className="fa-solid fa-calendar-days"></i> Examination Schedule & Time Table
                </h4>
                <table className="marksheet-table-professional" style={{ marginBottom: 14 }}>
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>S.No</th>
                      <th>Date & Day</th>
                      <th>Timing</th>
                      <th>Sub Code</th>
                      <th>Subject Name</th>
                      <th>Room</th>
                      <th>Invigilator Sig.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedCard.schedule || defaultSchedule).map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                        <td><strong>{item.date}</strong></td>
                        <td style={{ textAlign: 'center' }}>{item.time}</td>
                        <td style={{ textAlign: 'center' }}>{item.code}</td>
                        <td><strong>{item.subject}</strong></td>
                        <td style={{ textAlign: 'center' }}>{item.room}</td>
                        <td style={{ height: 26 }}></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: 6, padding: '8px 12px', fontSize: '0.74rem', color: '#713f12', marginBottom: 20 }}>
                  <strong>IMPORTANT INSTRUCTIONS FOR CANDIDATE:</strong>
                  <ol style={{ margin: '4px 0 0 16px', padding: 0, lineHeight: 1.4 }}>
                    <li>Candidate must carry this Admit Card with school uniform and school ID card to the examination center.</li>
                    <li>Reach the examination hall at least 30 minutes before the commencement of examination.</li>
                    <li>No electronic devices (calculators, smartwatches, mobile phones) are permitted inside the examination hall.</li>
                  </ol>
                </div>

                <div className="marksheet-footer-structured">
                  <div className="sig-box">
                    <div className="sig-space"></div>
                    <div className="sig-line"></div>
                    <span>Candidate Signature</span>
                  </div>
                  <div className="sig-box">
                    <div className="sig-space"></div>
                    <div className="sig-line"></div>
                    <span>Center Superintendent</span>
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
