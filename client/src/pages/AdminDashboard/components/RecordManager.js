import { FaCheck } from 'react-icons/fa';
import React, { useState } from 'react';

export function RecordEditor({ title, fields, initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState(initialData || {});

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <section className="portal-section record-editor-panel professional-white-form">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-file-pen"></i> {title}</h2>
          <p className="portal-muted">Please fill in all the required details below for the {title.split(' ').pop()} record.</p>
        </div>
        <div className="header-actions no-print" style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="print-btn-alt" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print Form
          </button>
          <button type="button" className="portal-danger-action" onClick={onCancel}>
            <i className="fa-solid fa-xmark"></i> Cancel
          </button>
        </div>
      </div>
      
      <div className="portal-panel-block structured-form-card">
        <form onSubmit={handleSubmit}>
          <div className="professional-form-grid">
            {fields.map(f => {
              if (f.type === 'hidden') return null;
              const isFullWidth = f.type === 'textarea' || f.key === 'address' || f.key === 'details' || f.key === 'notice';
              const isPhone = f.key.toLowerCase().includes('phone') || f.key.toLowerCase().includes('mobile') || f.maxLength === 10;
              
              return (
                <div className={`form-field-group ${isFullWidth ? 'field-span-2' : ''}`} key={f.key}>
                  <label className="field-title">{f.label}</label>
                  {f.type === 'file' ? (
                    <div className="file-upload-wrapper">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-file-input"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) {
                            setFormData({ ...formData, [f.key]: null, [`${f.key}DataUrl`]: '' });
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            const dataUrl = String(reader.result || '');
                            setFormData({
                              ...formData,
                              [`${f.key}DataUrl`]: dataUrl,
                              [f.key]: file,
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      {formData[`${f.key}DataUrl`] && (
                        <div className="image-preview-badge">
                          <img src={formData[`${f.key}DataUrl`]} alt="Preview" />
                          <span><FaCheck /> Photo Attached</span>
                        </div>
                      )}
                    </div>
                  ) : f.type === 'select' ? (
                    <select 
                      className="form-input-control" 
                      value={formData[f.key] || ''} 
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    >
                      <option value="">Select {f.label.replace('*', '').trim()}...</option>
                      {f.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : f.type === 'textarea' ? (
                    <textarea 
                      className="form-input-control textarea-control" 
                      rows={3} 
                      placeholder={`Enter ${f.label.replace('*', '').trim()}...`}
                      value={formData[f.key] || ''} 
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })} 
                    />
                  ) : (
                    <input 
                      type={f.type || 'text'} 
                      className="form-input-control" 
                      maxLength={isPhone ? 10 : undefined}
                      placeholder={isPhone ? '10-digit number' : `Enter ${f.label.replace('*', '').trim()}...`}
                      value={formData[f.key] || ''} 
                      onChange={(e) => {
                        let val = e.target.value;
                        if (isPhone) val = val.replace(/\D/g, '').slice(0, 10);
                        setFormData({ ...formData, [f.key]: val });
                      }} 
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="form-footer-actions">
            <button type="button" className="portal-danger-action" onClick={onCancel}>
              <i className="fa-solid fa-xmark"></i> Cancel
            </button>
            <button type="submit" className="portal-primary-action save-large-btn">
              <i className="fa-solid fa-circle-check"></i> Save Record
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function RecordManager({
  title,
  description,
  storageKey,
  items = [],
  setter,
  fields,
  addLabel,
  saveRecordList,
  settingsData,
  onAddClick,
  onEditClick,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [printRecordItem, setPrintRecordItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenAdd = () => {
    if (onAddClick) {
      onAddClick();
      return;
    }
    const fresh = {};
    fields.forEach(f => { fresh[f.key] = ''; });
    // auto assign rollNo or ID if applicable
    if (fresh.rollNo !== undefined) fresh.rollNo = String(Math.floor(100 + Math.random() * 900));
    setEditingItem(fresh);
    setEditIndex(-1);
    setShowModal(true);
  };

  const handleOpenEdit = (item, index) => {
    if (onEditClick) {
      onEditClick(item, index);
      return;
    }
    setEditingItem({ ...item });
    setEditIndex(index);
    setShowModal(true);
  };

  const handleSave = (savedData) => {
    let updated;
    if (editIndex >= 0) {
      updated = [...items];
      updated[editIndex] = { ...updated[editIndex], ...savedData, updatedAt: new Date().toISOString() };
    } else {
      const newItem = {
        id: `rec-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        ...savedData,
        createdAt: new Date().toISOString(),
      };
      updated = [newItem, ...items];
    }
    setter(updated);
    if (saveRecordList) saveRecordList(storageKey, updated);
    setShowModal(false);
    setEditingItem(null);
    setEditIndex(-1);
  };

  const handleDelete = (index) => {
    const itemToDelete = items[index];
    const name = itemToDelete.name || itemToDelete.studentName || itemToDelete.title || 'this entry';
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const updated = items.filter((_, i) => i !== index);
      setter(updated);
      if (saveRecordList) saveRecordList(storageKey, updated);
    }
  };

  const filteredItems = items.filter(item => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return Object.values(item).some(val => 
      typeof val === 'string' && val.toLowerCase().includes(q)
    );
  });

  return (
    <section className="portal-section">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-folder-open"></i> {title} Directory</h2>
          <p className="portal-muted">{description || `Manage and view all ${title.toLowerCase()} records.`}</p>
        </div>
        <div className="header-actions-group" style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="save-btn-alt" onClick={() => saveRecordList(storageKey, items)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Data
          </button>
          <button type="button" className="portal-primary-action" onClick={handleOpenAdd}>
            <i className="fa-solid fa-plus"></i> {addLabel || `Add ${title}`}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="portal-panel-block structured-controls" style={{ marginBottom: 20 }}>
        <input
          className="form-input-control"
          placeholder={`Search ${title.toLowerCase()} by name, phone, class, or details...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Record Cards Grid */}
      <div className="portal-record-list-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {filteredItems.map((item, index) => (
          <div className="record-entry-card portal-panel-block" key={item.id || item._id || index} style={{ border: '1px solid #cbd5e1', borderRadius: 12, padding: 18, background: '#ffffff', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div className="entry-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <div className="entry-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar-icon" style={{ width: 36, height: 36, borderRadius: '50%', background: '#0b1c3d', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {(item.name || item.studentName || item.title || 'R').charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: 14, color: '#0f172a' }}>{item.name || item.studentName || item.title || `${title} Item`}</strong>
                  {item.className && <span className="entry-class-pill" style={{ background: '#dbeafe', color: '#1e3a8a', fontSize: 11, padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>{item.className}</span>}
                </div>
              </div>
              <div className="entry-actions" style={{ display: 'flex', gap: 6 }}>
                <button className="save-btn-alt" style={{ padding: '6px 10px', fontSize: 12 }} title="Print Slip" onClick={() => setPrintRecordItem(item)}>
                  <i className="fa-solid fa-print"></i>
                </button>
                <button className="save-btn-alt" style={{ padding: '6px 10px', fontSize: 12 }} title="Edit" onClick={() => handleOpenEdit(item, index)}>
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button className="portal-danger-action" style={{ padding: '6px 10px', fontSize: 12 }} title="Delete" onClick={() => handleDelete(index)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>

            <div className="entry-body-list" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {fields.filter(f => f.type !== 'hidden' && f.type !== 'file').slice(0, 5).map((f) => (
                <div className="entry-field-row" key={f.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: '1px dashed #f1f5f9', paddingBottom: 4 }}>
                  <span className="field-label" style={{ color: '#64748b', fontWeight: 600 }}>{f.label.replace('*', '').trim()}:</span>
                  <strong className="field-value" style={{ color: '#1e293b' }}>{item[f.key] || '-'}</strong>
                </div>
              ))}
            </div>
          </div>
        ))}

        {!filteredItems.length && (
          <div className="portal-panel-block" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: '#64748b' }}>
            <i className="fa-solid fa-folder-open" style={{ fontSize: 36, color: '#cbd5e1', marginBottom: 10 }}></i>
            <p>No records found. Click "{addLabel || `Add ${title}`}" to create a new entry.</p>
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {showModal && editingItem && (
        <div className="portal-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="portal-modal-content" style={{ maxWidth: 750, width: '100%' }} onClick={e => e.stopPropagation()}>
            <RecordEditor
              title={`${editIndex >= 0 ? 'Edit' : 'Add New'} ${title}`}
              fields={fields}
              initialData={editingItem}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {/* Official Print Slip Modal */}
      {printRecordItem && (
        <div className="portal-modal-overlay" onClick={() => setPrintRecordItem(null)}>
          <div className="portal-modal-content professional-marksheet print-area" style={{ maxWidth: 640 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{title} Official Slip</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="portal-primary-action" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Slip
                </button>
                <button className="close-modal" onClick={() => setPrintRecordItem(null)}>&times;</button>
              </div>
            </div>

            <div className="marksheet-border-outer">
              <div className="marksheet-border-inner">
                <div className="marksheet-header">
                  <div className="school-logo-placeholder">LBMDPS</div>
                  <h1>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>
                  <p className="school-addr">NAITAND, POST BANDIYABAD, GIRIDIH, JHARKHAND - 815316</p>
                  <p className="school-affil">Affiliated to CBSE, New Delhi • Estd. 2013</p>
                  <h2 className="report-title">{title.toUpperCase()} RECORD CERTIFICATION</h2>
                  <p className="academic-session">Session: {settingsData?.session || '2026-2027'}</p>
                </div>

                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                  {fields.filter(f => f.type !== 'hidden').map((f) => (
                    <div key={f.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0', fontSize: 13 }}>
                      <span style={{ color: '#475569', fontWeight: 'bold' }}>{f.label.replace('*', '').trim()}:</span>
                      <strong style={{ color: '#0f172a' }}>{printRecordItem[f.key] || '-'}</strong>
                    </div>
                  ))}
                </div>

                <div className="marksheet-footer-structured">
                  <div className="sig-box">
                    <div className="sig-space"></div>
                    <div className="sig-line"></div>
                    <span>Authorized Incharge</span>
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
