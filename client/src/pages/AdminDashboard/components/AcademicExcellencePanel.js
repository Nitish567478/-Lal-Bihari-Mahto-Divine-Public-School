import React, { useState } from 'react';
import { classList } from '../constants/adminData';

export default function AcademicExcellencePanel({
  toppersData = [],
  setToppersData,
  saveRecordList,
  settingsData,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCitation, setSelectedCitation] = useState(null);

  const [formState, setFormState] = useState({
    studentName: '',
    className: 'Class 10',
    percentage: '',
    totalMarks: '',
    rank: '1st Rank (Gold Medalist)',
    session: settingsData?.session || '2026-2027',
    photoUrl: '',
    photoDataUrl: '',
    honors: 'Academic Excellence Award & High Distinction',
    certificateNo: `LBMDPS-TOP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormState({
      studentName: '',
      className: 'Class 10',
      percentage: '',
      totalMarks: '',
      rank: '1st Rank (Gold Medalist)',
      session: settingsData?.session || '2026-2027',
      photoUrl: '',
      photoDataUrl: '',
      honors: 'Academic Excellence Award & High Distinction',
      certificateNo: `LBMDPS-TOP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormState({
      studentName: item.studentName || '',
      className: item.className || 'Class 10',
      percentage: item.percentage || '',
      totalMarks: item.totalMarks || '',
      rank: item.rank || '1st Rank (Gold Medalist)',
      session: item.session || settingsData?.session || '2026-2027',
      photoUrl: item.photoUrl || '',
      photoDataUrl: item.photoDataUrl || item.photoUrl || '',
      honors: item.honors || '',
      certificateNo: item.certificateNo || '',
    });
    setShowAddModal(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormState(prev => ({
        ...prev,
        photoDataUrl: reader.result,
        photoUrl: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.studentName.trim() || !formState.percentage.trim() || !formState.totalMarks.trim()) {
      alert('Please fill Student Full Name, Exact Percentage, and Total Marks Secured.');
      return;
    }

    let updated;
    if (editingItem) {
      updated = toppersData.map(t =>
        t.id === editingItem.id ? { ...t, ...formState, updatedAt: new Date().toISOString() } : t
      );
    } else {
      const newItem = {
        id: `top-${Date.now()}`,
        ...formState,
        createdAt: new Date().toISOString(),
      };
      updated = [newItem, ...toppersData];
    }

    setToppersData(updated);
    if (saveRecordList) saveRecordList('classToppers', updated);
    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove Class Topper citation for "${name}"?`)) {
      const updated = toppersData.filter(t => t.id !== id);
      setToppersData(updated);
      if (saveRecordList) saveRecordList('classToppers', updated);
    }
  };

  const filteredToppers = toppersData.filter(item => {
    const matchesSearch = !searchTerm.trim() ||
      (item.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.honors || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'All' || item.className === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <section className="portal-section academic-excellence-panel">
      {/* Header */}
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-trophy" style={{ color: '#f59e0b', marginRight: 8 }}></i> Academic Excellence & Class Toppers Module</h2>
          <p className="portal-muted">Administer grade-wise class toppers, academic podium honorees, percentages, and official merit citations.</p>
        </div>
        <div className="header-actions no-print" style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="portal-primary-action" onClick={handleOpenAdd}>
            <i className="fa-solid fa-plus"></i> Add Class Topper
          </button>
          <button type="button" className="print-btn-alt" onClick={() => window.print()}>
            <i className="fa-solid fa-print"></i> Print Wall of Fame
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="portal-filter-bar no-print" style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 280px', position: 'relative' }}>
          <input
            type="text"
            className="form-input-control"
            placeholder="Search topper by student name or citation honors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ minWidth: 200 }}>
          <select
            className="form-input-control"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            <option value="All">All Grades (Pre-Nursery - 10th)</option>
            {classList.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Podium Grid (Wall of Fame Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 20, marginBottom: 30 }}>
        {filteredToppers.map((topper) => {
          const isGold = topper.rank?.toLowerCase().includes('1st') || topper.rank?.toLowerCase().includes('gold');
          const isSilver = topper.rank?.toLowerCase().includes('2nd') || topper.rank?.toLowerCase().includes('silver');
          const badgeBg = isGold ? 'linear-gradient(135deg, #f59e0b, #d97706)' : isSilver ? 'linear-gradient(135deg, #94a3b8, #64748b)' : 'linear-gradient(135deg, #b45309, #78350f)';

          return (
            <div
              key={topper.id}
              className="portal-panel-block"
              style={{
                position: 'relative',
                padding: '22px',
                borderRadius: '16px',
                border: isGold ? '2px solid #fcd34d' : '1px solid #e2e8f0',
                background: '#ffffff',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Rank Pill */}
              <div style={{ position: 'absolute', top: 14, right: 14 }}>
                <span
                  style={{
                    background: badgeBg,
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  <i className="fa-solid fa-medal" style={{ marginRight: 4 }}></i> {topper.rank}
                </span>
              </div>

              <div>
                {/* Student Photo & Profile Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '3px solid #e2e8f0',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      flexShrink: 0,
                      background: '#0b1c3d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fbbf24',
                      fontSize: 22,
                      fontWeight: 800
                    }}
                  >
                    {topper.photoDataUrl || topper.photoUrl ? (
                      <img
                        src={topper.photoDataUrl || topper.photoUrl}
                        alt={topper.studentName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      topper.studentName.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.15rem', color: '#0f172a', fontWeight: 800 }}>
                      {topper.studentName}
                    </h3>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span className="entry-class-pill">{topper.className}</span>
                      <span style={{ fontSize: 11, background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
                        {topper.session || '2026-2027'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Banner */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginBottom: 14
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Exact Percentage</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#16a34a' }}>
                      {topper.percentage}
                    </div>
                  </div>
                  <div style={{ width: 1, background: '#cbd5e1' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Marks</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#2563eb' }}>
                      {topper.totalMarks}
                    </div>
                  </div>
                </div>

                {/* Citation Honors */}
                <p style={{ margin: '0 0 16px 0', fontSize: 12.5, color: '#475569', lineHeight: 1.5 }}>
                  <i className="fa-solid fa-award" style={{ color: '#d97706', marginRight: 6 }}></i>
                  <strong>Honors:</strong> {topper.honors || 'Class Rank Distinction'}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 8, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                <button
                  type="button"
                  className="portal-primary-action"
                  style={{ flex: 1, padding: '7px 10px', fontSize: 12 }}
                  onClick={() => setSelectedCitation(topper)}
                >
                  <i className="fa-solid fa-scroll"></i> View Citation
                </button>
                <button
                  type="button"
                  className="save-btn-alt"
                  style={{ padding: '7px 10px', fontSize: 12 }}
                  onClick={() => handleOpenEdit(topper)}
                  title="Edit Topper Record"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  type="button"
                  className="portal-danger-action"
                  style={{ padding: '7px 10px', fontSize: 12 }}
                  onClick={() => handleDelete(topper.id, topper.studentName)}
                  title="Delete Topper Record"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          );
        })}

        {!filteredToppers.length && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', color: '#64748b' }}>
            <i className="fa-solid fa-trophy" style={{ fontSize: 36, color: '#cbd5e1', marginBottom: 12 }}></i>
            <p style={{ margin: 0 }}>No class toppers found. Click "Add Class Topper" to enroll rank holders.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="portal-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="portal-modal-content structured-form-card" style={{ maxWidth: 650 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 12 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>
                  {editingItem ? 'Edit Class Topper Record' : 'Enroll New Class Topper'}
                </h2>
                <p className="portal-muted">Administer student portrait, exact percentage, and total marks secured</p>
              </div>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="professional-form-grid">
                {/* Student Full Name */}
                <div className="form-field-group">
                  <label className="field-title">Student Full Name *</label>
                  <input
                    type="text"
                    className="form-input-control"
                    placeholder="e.g. Aarav Kumar"
                    value={formState.studentName}
                    onChange={e => setFormState({ ...formState, studentName: e.target.value })}
                    required
                  />
                </div>

                {/* Grade / Class */}
                <div className="form-field-group">
                  <label className="field-title">Class / Grade *</label>
                  <select
                    className="form-input-control"
                    value={formState.className}
                    onChange={e => setFormState({ ...formState, className: e.target.value })}
                  >
                    {classList.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Exact Percentage */}
                <div className="form-field-group">
                  <label className="field-title">Exact Percentage *</label>
                  <input
                    type="text"
                    className="form-input-control"
                    placeholder="e.g. 98.4%"
                    value={formState.percentage}
                    onChange={e => setFormState({ ...formState, percentage: e.target.value })}
                    required
                  />
                </div>

                {/* Total Marks Secured */}
                <div className="form-field-group">
                  <label className="field-title">Total Marks Secured *</label>
                  <input
                    type="text"
                    className="form-input-control"
                    placeholder="e.g. 590 / 600"
                    value={formState.totalMarks}
                    onChange={e => setFormState({ ...formState, totalMarks: e.target.value })}
                    required
                  />
                </div>

                {/* Rank / Position */}
                <div className="form-field-group">
                  <label className="field-title">Rank / Position</label>
                  <select
                    className="form-input-control"
                    value={formState.rank}
                    onChange={e => setFormState({ ...formState, rank: e.target.value })}
                  >
                    <option value="1st Rank (Gold Medalist)">1st Rank (Gold Medalist)</option>
                    <option value="2nd Rank (Silver Medalist)">2nd Rank (Silver Medalist)</option>
                    <option value="3rd Rank (Bronze Medalist)">3rd Rank (Bronze Medalist)</option>
                    <option value="State Olympiad Topper">State Olympiad Topper</option>
                    <option value="Subject 100% Century Holder">Subject 100% Century Holder</option>
                  </select>
                </div>

                {/* Academic Session */}
                <div className="form-field-group">
                  <label className="field-title">Academic Session</label>
                  <input
                    type="text"
                    className="form-input-control"
                    placeholder="e.g. 2026-2027"
                    value={formState.session}
                    onChange={e => setFormState({ ...formState, session: e.target.value })}
                  />
                </div>

                {/* Student Photo Upload */}
                <div className="form-field-group field-span-2">
                  <label className="field-title">Student Portrait Image (Upload File)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-file-input"
                      onChange={handlePhotoUpload}
                    />
                    {(formState.photoDataUrl || formState.photoUrl) && (
                      <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: '2px solid #2563eb' }}>
                        <img
                          src={formState.photoDataUrl || formState.photoUrl}
                          alt="Preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Honors Citation */}
                <div className="form-field-group field-span-2">
                  <label className="field-title">Honors & Citation Notes</label>
                  <input
                    type="text"
                    className="form-input-control"
                    placeholder="e.g. State Olympiad Rank 1, 100/100 in Mathematics & Science"
                    value={formState.honors}
                    onChange={e => setFormState({ ...formState, honors: e.target.value })}
                  />
                </div>

                {/* Certificate Number */}
                <div className="form-field-group field-span-2">
                  <label className="field-title">Official Certificate / Citation Number</label>
                  <input
                    type="text"
                    className="form-input-control"
                    value={formState.certificateNo}
                    onChange={e => setFormState({ ...formState, certificateNo: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
                <button type="button" className="save-btn-alt" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="portal-primary-action">
                  <i className="fa-solid fa-floppy-disk"></i> {editingItem ? 'Save Changes' : 'Save Topper Citation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Citation View & Print Modal */}
      {selectedCitation && (
        <div className="portal-modal-overlay" onClick={() => setSelectedCitation(null)}>
          <div
            className="portal-modal-content"
            style={{
              maxWidth: 720,
              background: '#ffffff',
              borderRadius: 16,
              padding: 30,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative',
              border: '8px solid #fbbf24'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button className="close-modal no-print" style={{ position: 'absolute', top: 14, right: 14 }} onClick={() => setSelectedCitation(null)}>
              &times;
            </button>

            {/* Certificate Style Layout */}
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: '#96281B', textTransform: 'uppercase' }}>
                LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0b1c3d', margin: '6px 0' }}>
                CERTIFICATE OF ACADEMIC EXCELLENCE
              </h2>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>
                Affiliated with CBSE, New Delhi • Session {selectedCitation.session || '2026-2027'}
              </div>

              {/* Student Portrait */}
              <div style={{ width: 90, height: 90, borderRadius: '50%', margin: '0 auto 16px', overflow: 'hidden', border: '4px solid #f59e0b', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
                {selectedCitation.photoDataUrl || selectedCitation.photoUrl ? (
                  <img src={selectedCitation.photoDataUrl || selectedCitation.photoUrl} alt={selectedCitation.studentName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#0b1c3d', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900 }}>
                    {selectedCitation.studentName.charAt(0)}
                  </div>
                )}
              </div>

              <p style={{ fontSize: 14, color: '#475569', margin: '0 0 8px 0' }}>This is proudly conferred to</p>
              <h3 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a', margin: '0 0 10px 0', borderBottom: '2px dashed #cbd5e1', display: 'inline-block', paddingBottom: 4 }}>
                {selectedCitation.studentName}
              </h3>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, maxWidth: 540, margin: '10px auto' }}>
                of <strong>{selectedCitation.className}</strong> for securing <strong>{selectedCitation.rank}</strong> in the Annual Academic Evaluation with an outstanding record of <strong>{selectedCitation.percentage}</strong> ({selectedCitation.totalMarks} Marks).
              </p>

              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 16px', margin: '16px auto', maxWidth: 480, fontSize: 13, color: '#92400e', fontWeight: 700 }}>
                🏆 {selectedCitation.honors}
              </div>

              {/* Signatures */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 16, borderTop: '1px solid #e2e8f0', fontSize: 13 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{selectedCitation.certificateNo}</div>
                  <small style={{ color: '#64748b' }}>Certificate No.</small>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>Class Teacher</div>
                  <small style={{ color: '#64748b' }}>Academic Head</small>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{settingsData?.principal || 'Principal'}</div>
                  <small style={{ color: '#64748b' }}>Principal & Super Admin</small>
                </div>
              </div>
            </div>

            <div className="no-print" style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24 }}>
              <button type="button" className="portal-primary-action" onClick={() => window.print()}>
                <i className="fa-solid fa-print"></i> Print Official Citation
              </button>
              <button type="button" className="save-btn-alt" onClick={() => setSelectedCitation(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
