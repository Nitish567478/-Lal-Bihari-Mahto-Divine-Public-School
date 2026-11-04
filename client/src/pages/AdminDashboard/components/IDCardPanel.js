import { FaCheck } from 'react-icons/fa';
import React, { useState } from 'react';
import { classList } from '../constants/adminData';

export default function IDCardPanel({
  idCardsData = [],
  setIdCardsData,
  saveRecordList,
  settingsData,
}) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');

  const [newForm, setNewForm] = useState({
    rollNo: `LBMDPS-${Math.floor(100 + Math.random() * 900)}`,
    studentName: '',
    fatherName: '',
    className: 'Class 1',
    dob: '2016-05-10',
    phone: '',
    bloodGroup: 'B+',
    address: 'Naitand, Giridih, Jharkhand',
    validUpto: 'March 2027',
    photoUrl: '',
  });

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newForm.studentName.trim()) {
      alert('Please enter student name');
      return;
    }

    const card = {
      id: `idc-${Date.now()}`,
      rollNo: newForm.rollNo.trim() || `LBMDPS-${Math.floor(100 + Math.random() * 900)}`,
      studentName: newForm.studentName.trim(),
      fatherName: newForm.fatherName.trim() || 'Parent/Guardian',
      className: newForm.className,
      dob: newForm.dob,
      phone: newForm.phone.trim() || '9431378901',
      bloodGroup: newForm.bloodGroup,
      address: newForm.address.trim() || 'Naitand, Giridih',
      validUpto: newForm.validUpto || 'March 2027',
      photoUrl: newForm.photoUrl,
      status: 'Issued',
      createdAt: new Date().toISOString(),
    };

    const updated = [card, ...idCardsData];
    setIdCardsData(updated);
    if (saveRecordList) saveRecordList('idCards', updated);
    setShowAddModal(false);
    setSelectedCard(card);
    setNewForm({
      rollNo: `LBMDPS-${Math.floor(100 + Math.random() * 900)}`,
      studentName: '',
      fatherName: '',
      className: 'Class 1',
      dob: '2016-05-10',
      phone: '',
      bloodGroup: 'B+',
      address: 'Naitand, Giridih, Jharkhand',
      validUpto: 'March 2027',
      photoUrl: '',
    });
  };

  const handleDeleteCard = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ID Card for ${name}?`)) {
      const updated = idCardsData.filter(c => c.id !== id);
      setIdCardsData(updated);
      if (saveRecordList) saveRecordList('idCards', updated);
    }
  };

  const filteredCards = idCardsData.filter(c => {
    const matchesSearch = !searchTerm.trim() ||
      (c.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.rollNo || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'All' || c.className === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <section className="portal-section id-cards-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-id-badge"></i> Student Smart PVC ID Cards</h2>
          <p className="portal-muted">Generate, design, and print official CBSE student smart identity cards.</p>
        </div>
        <div className="header-actions no-print" style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="save-btn-alt" onClick={() => saveRecordList('idCards', idCardsData)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Data
          </button>
          <button type="button" className="portal-primary-action" onClick={() => setShowAddModal(true)}>
            <i className="fa-solid fa-plus"></i> Generate New ID Card
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="portal-panel-block structured-controls" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label className="field-title" style={{ fontSize: 12 }}>Search ID Cards</label>
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

      {/* Cards Table */}
      <div className="portal-table-wrap portal-panel-block" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="portal-table">
          <thead>
            <tr>
              <th>ID Card / Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Father Name</th>
              <th>Emergency Contact</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCards.map((card) => (
              <tr key={card.id}>
                <td><strong style={{ color: '#1e3a8a' }}>{card.rollNo}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#0b1c3d', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>
                      {(card.studentName || 'S').charAt(0).toUpperCase()}
                    </div>
                    <strong>{card.studentName}</strong>
                  </div>
                </td>
                <td><span className="entry-class-pill">{card.className}</span></td>
                <td>{card.fatherName || '-'}</td>
                <td><strong>{card.phone}</strong></td>
                <td><span style={{ background: '#dbeafe', color: '#3b82f6', padding: '2px 8px', borderRadius: 4, fontWeight: 'bold', fontSize: 11 }}>{card.bloodGroup || 'B+'}</span></td>
                <td><span className="status-pill active">{card.status || 'ISSUED'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="portal-primary-action"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={() => setSelectedCard(card)}
                      title="View & Print ID Card"
                    >
                      <i className="fa-solid fa-eye"></i> View Card
                    </button>
                    <button
                      className="portal-danger-action"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={() => handleDeleteCard(card.id, card.studentName)}
                      title="Delete ID Card"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filteredCards.length && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: 30, color: '#64748b' }}>
                  No student ID cards generated yet. Click "Generate New ID Card" to issue one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add ID Card Modal */}
      {showAddModal && (
        <div className="portal-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="portal-modal-content structured-form-card" style={{ maxWidth: 700 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Issue Student Smart ID Card</h2>
                <p className="portal-muted">Enter student credentials to generate official CBSE PVC ID Card</p>
              </div>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddCard}>
              <div className="professional-form-grid">
                <div className="form-field-group">
                  <label className="field-title">Roll / Admission Number *</label>
                  <input
                    className="form-input-control"
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
                  <label className="field-title">Father / Guardian Name *</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. Rajesh Kumar"
                    value={newForm.fatherName}
                    onChange={e => setNewForm({ ...newForm, fatherName: e.target.value })}
                    required
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
                <div className="form-field-group">
                  <label className="field-title">Emergency Contact (10-Digit) *</label>
                  <input
                    className="form-input-control"
                    maxLength={10}
                    placeholder="10-digit number"
                    value={newForm.phone}
                    onChange={e => setNewForm({ ...newForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    required
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Blood Group</label>
                  <select
                    className="form-input-control"
                    value={newForm.bloodGroup}
                    onChange={e => setNewForm({ ...newForm, bloodGroup: e.target.value })}
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field-group">
                  <label className="field-title">Date of Birth</label>
                  <input
                    type="date"
                    className="form-input-control"
                    value={newForm.dob}
                    onChange={e => setNewForm({ ...newForm, dob: e.target.value })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Valid Upto Session</label>
                  <input
                    className="form-input-control"
                    value={newForm.validUpto}
                    onChange={e => setNewForm({ ...newForm, validUpto: e.target.value })}
                  />
                </div>
                <div className="form-field-group field-span-2">
                  <label className="field-title">Residential Address</label>
                  <input
                    className="form-input-control"
                    value={newForm.address}
                    onChange={e => setNewForm({ ...newForm, address: e.target.value })}
                  />
                </div>
                <div className="form-field-group field-span-2">
                  <label className="field-title">Student Photograph (Upload or Data URL)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-file-input"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => {
                        setNewForm({ ...newForm, photoUrl: String(reader.result || '') });
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  {newForm.photoUrl && (
                    <div className="image-preview-badge" style={{ marginTop: 6 }}>
                      <img src={newForm.photoUrl} alt="Student Preview" />
                      <span><FaCheck /> Photo Attached</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-footer-actions">
                <button type="button" className="portal-danger-action" onClick={() => setShowAddModal(false)}>
                  <i className="fa-solid fa-xmark"></i> Cancel
                </button>
                <button type="submit" className="portal-primary-action save-large-btn">
                  <i className="fa-solid fa-circle-check"></i> Generate Smart ID Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Smart PVC ID Card Preview Modal */}
      {selectedCard && (
        <div className="portal-modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="portal-modal-content print-area" style={{ maxWidth: 420, width: '100%', background: 'transparent', boxShadow: 'none' }} onClick={e => e.stopPropagation()}>
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, background: '#ffffff', padding: '10px 16px', borderRadius: 8 }}>
              <strong style={{ fontSize: 13 }}>Student Smart ID Card</strong>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="portal-primary-action" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print ID Card
                </button>
                <button className="close-modal" onClick={() => setSelectedCard(null)}>&times;</button>
              </div>
            </div>

            {/* Smart PVC Card Front */}
            <div style={{ background: '#ffffff', border: '3px solid #0b1c3d', borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.25)', position: 'relative' }}>
              {/* Card Header */}
              <div style={{ background: 'linear-gradient(135deg, #07132c 0%, #0b1c3d 100%)', color: '#ffffff', padding: '12px 14px', textAlign: 'center', borderBottom: '3px solid #fbbf24' }}>
                <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: 0.5, color: '#fbbf24' }}>
                  LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL
                </div>
                <div style={{ fontSize: 10, color: '#cbd5e1', marginTop: 2 }}>
                  Naitand, Bandiyabad, Giridih, Jharkhand • CBSE Affiliated (Estd. 2013)
                </div>
                <div style={{ display: 'inline-block', background: '#fbbf24', color: '#0b1c3d', fontSize: 10, fontWeight: 900, padding: '1px 8px', borderRadius: 10, marginTop: 4 }}>
                  STUDENT IDENTITY CARD
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: '95px 1fr', gap: 12, alignItems: 'center' }}>
                {/* Photo */}
                <div style={{ width: 95, height: 115, border: '2px solid #0b1c3d', borderRadius: 8, overflow: 'hidden', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedCard.photoUrl || selectedCard.idCardImageDataUrl ? (
                    <img src={selectedCard.photoUrl || selectedCard.idCardImageDataUrl} alt={selectedCard.studentName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <i className="fa-solid fa-user-graduate" style={{ fontSize: 32 }}></i>
                      <div style={{ fontSize: 9, fontWeight: 'bold', marginTop: 2 }}>PHOTO</div>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ fontSize: 12, color: '#1e293b', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div><strong>Name:</strong> <span style={{ textTransform: 'uppercase', fontWeight: 800, color: '#0b1c3d' }}>{selectedCard.studentName}</span></div>
                  <div><strong>Roll No:</strong> <span style={{ fontWeight: 800, color: '#1e3a8a' }}>{selectedCard.rollNo}</span></div>
                  <div><strong>Class:</strong> <span style={{ fontWeight: 800 }}>{selectedCard.className}</span></div>
                  <div><strong>Father:</strong> <span>{selectedCard.fatherName || '-'}</span></div>
                  <div><strong>DOB:</strong> <span>{selectedCard.dob || '-'}</span></div>
                  <div><strong>Blood Group:</strong> <span style={{ color: '#3b82f6', fontWeight: 800 }}>{selectedCard.bloodGroup || 'B+'}</span></div>
                  <div><strong>Contact:</strong> <span>{selectedCard.phone}</span></div>
                </div>
              </div>

              {/* Address & Signature Footer */}
              <div style={{ background: '#f8fafc', padding: '8px 14px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10 }}>
                <div style={{ maxWidth: '65%' }}>
                  <strong>Address:</strong> {selectedCard.address || 'Naitand, Giridih'}
                  <div style={{ color: '#64748b', fontSize: 9, marginTop: 2 }}>Valid Upto: {selectedCard.validUpto || 'March 2027'}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ height: 18, borderBottom: '1px solid #0b1c3d', width: 70 }}></div>
                  <strong style={{ fontSize: 9, color: '#0b1c3d' }}>Principal Seal</strong>
                </div>
              </div>

              {/* Simulated Barcode */}
              <div style={{ background: '#0b1c3d', color: '#fbbf24', padding: '4px', textAlign: 'center', fontSize: 9, letterSpacing: 3, fontFamily: 'monospace' }}>
                |||| | ||||| ||| ||||||| | ||||| {selectedCard.rollNo}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
