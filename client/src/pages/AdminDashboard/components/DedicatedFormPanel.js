import React, { useState, useEffect, useCallback } from 'react';

export default function DedicatedFormPanel({
  entityType = 'student', // 'student' | 'teacher' | 'staff'
  title = 'Student',
  icon = 'fa-solid fa-user-plus',
  fields = [],
  items = [],
  setter,
  saveRecordList,
  storageKey,
  onViewDirectory,
  settingsData,
}) {
  const [mode, setMode] = useState('add'); // 'add' | 'edit'
  const [selectedId, setSelectedId] = useState('');
  const [formData, setFormData] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Helper to initialize fresh form
  const getInitialFormData = useCallback(() => {
    const fresh = {};
    fields.forEach((f) => {
      fresh[f.key] = '';
    });
    // Auto-generate roll number for students if blank
    if (entityType === 'student' && fresh.rollNo !== undefined) {
      const nextRoll = items.length > 0 
        ? Math.max(...items.map(i => parseInt(i.rollNo, 10) || 100), 100) + 1 
        : 101;
      fresh.rollNo = String(nextRoll);
      fresh.classApplying = 'Class 1';
    }
    if (entityType === 'teacher') {
      fresh.salary = '₹40,000';
      fresh.joiningDate = new Date().toISOString().split('T')[0];
    }
    if (entityType === 'staff') {
      fresh.shift = 'Day (8 AM - 4 PM)';
      fresh.salary = '₹20,000';
    }
    return fresh;
  }, [entityType, fields, items]);

  useEffect(() => {
    setFormData(getInitialFormData());
    setMode('add');
    setSelectedId('');
    setSuccessMsg('');
    setErrorMsg('');
  }, [entityType, storageKey, getInitialFormData]);

  // When selecting an existing item in Edit mode
  const handleSelectExisting = (id) => {
    setSelectedId(id);
    if (!id) {
      setFormData(getInitialFormData());
      setMode('add');
      return;
    }
    const target = items.find((item) => (item.id || item._id) === id);
    if (target) {
      setFormData({ ...target });
      setMode('edit');
      setSuccessMsg('');
    }
  };

  const handleReset = () => {
    setFormData(getInitialFormData());
    setMode('add');
    setSelectedId('');
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleInputChange = (key, value, isPhone = false) => {
    let finalVal = value;
    if (isPhone) {
      finalVal = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [key]: finalVal }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    const nameKey = entityType === 'student' ? 'studentName' : 'name';
    if (!formData[nameKey] || !formData[nameKey].trim()) {
      setErrorMsg(`Please enter the ${title} Full Name.`);
      return;
    }

    if (formData.phone && formData.phone.length < 10) {
      setErrorMsg('Phone Number must be a valid 10-digit mobile number.');
      return;
    }

    let updated;
    const displayName = formData[nameKey];

    if (mode === 'edit' && selectedId) {
      updated = items.map((item) =>
        (item.id || item._id) === selectedId
          ? { ...item, ...formData, updatedAt: new Date().toISOString() }
          : item
      );
      setSuccessMsg(`Successfully updated profile for "${displayName}".`);
    } else {
      const newItem = {
        id: `${entityType.slice(0, 3)}-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
      };
      updated = [newItem, ...items];
      setSuccessMsg(`Successfully registered new ${title}: "${displayName}".`);
      // Reset form for next entry but keep success message
      setFormData(getInitialFormData());
    }

    setter(updated);
    if (saveRecordList) {
      saveRecordList(storageKey, updated);
    }

    setTimeout(() => {
      setSuccessMsg('');
    }, 4500);
  };

  return (
    <section className="portal-section dedicated-form-section">
      {/* Header Banner */}
      <div className="portal-section-heading">
        <div>
          <h2>
            <i className={icon} style={{ color: '#96281B', marginRight: 10 }}></i>
            {mode === 'edit' ? `Edit ${title} Profile` : `Add / Register New ${title}`}
          </h2>
          <p className="portal-muted">
            {entityType === 'student' && 'Complete the official admission & enrollment form for Class Pre-Nursery to Class 10.'}
            {entityType === 'teacher' && 'Appoint and register faculty teaching staff, qualifications, and curriculum allocations.'}
            {entityType === 'staff' && 'Register non-teaching administrative, laboratory, and campus support staff members.'}
          </p>
        </div>

        <div className="header-actions-group" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="entry-class-pill" style={{ background: '#f1f5f9', color: '#475569', fontSize: 13, padding: '6px 12px' }}>
            <i className="fa-solid fa-database" style={{ marginRight: 6 }}></i>
            {items.length} {title}s in Database
          </span>
          {onViewDirectory && (
            <button
              type="button"
              className="save-btn-alt"
              onClick={onViewDirectory}
              title={`Jump to ${title} Directory`}
            >
              <i className="fa-solid fa-address-book"></i> View {title} Directory ➔
            </button>
          )}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="portal-panel-block" style={{ padding: '14px 20px', marginBottom: 20, background: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className={`portal-chip-btn ${mode === 'add' ? 'chip-green' : ''}`}
              style={{
                background: mode === 'add' ? '#ecfdf5' : '#f8fafc',
                color: mode === 'add' ? '#065f46' : '#64748b',
                borderColor: mode === 'add' ? '#a7f3d0' : '#cbd5e1',
                padding: '8px 16px',
                fontWeight: 700,
              }}
              onClick={() => {
                setMode('add');
                setSelectedId('');
                setFormData(getInitialFormData());
                setSuccessMsg('');
                setErrorMsg('');
              }}
            >
              <i className="fa-solid fa-user-plus" style={{ marginRight: 6 }}></i>
              + Register New {title}
            </button>

            <button
              type="button"
              className={`portal-chip-btn ${mode === 'edit' ? 'chip-amber' : ''}`}
              style={{
                background: mode === 'edit' ? '#fffbeb' : '#f8fafc',
                color: mode === 'edit' ? '#92400e' : '#64748b',
                borderColor: mode === 'edit' ? '#fde68a' : '#cbd5e1',
                padding: '8px 16px',
                fontWeight: 700,
              }}
              onClick={() => {
                setMode('edit');
                if (items.length > 0 && !selectedId) {
                  handleSelectExisting(items[0].id || items[0]._id);
                }
              }}
            >
              <i className="fa-solid fa-user-pen" style={{ marginRight: 6 }}></i>
              ✏️ Select Existing {title} to Edit
            </button>
          </div>

          {/* Quick Dropdown in Edit Mode */}
          {mode === 'edit' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '1 1 300px', maxWidth: 450 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>
                Pick Record:
              </label>
              <select
                className="form-input-control"
                style={{ background: '#f8fafc', borderColor: '#fde68a' }}
                value={selectedId}
                onChange={(e) => handleSelectExisting(e.target.value)}
              >
                <option value="">-- Choose {title} to Edit --</option>
                {items.map((it) => {
                  const id = it.id || it._id;
                  const name = it.studentName || it.name || it.title || 'Record';
                  const extra = it.className || it.subject || it.role || '';
                  return (
                    <option key={id} value={id}>
                      {name} {extra ? `(${extra})` : ''} {it.rollNo ? `- Roll ${it.rollNo}` : ''}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Alert Messages */}
      {successMsg && (
        <div className="portal-status no-print" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0', marginBottom: 20 }}>
          <i className="fa-solid fa-circle-check" style={{ marginRight: 8, fontSize: 16 }}></i>
          <strong>Success:</strong> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="portal-status no-print" style={{ background: '#fef2f2', color: '#991b1b', borderColor: '#fecaca', marginBottom: 20 }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: 8, fontSize: 16 }}></i>
          <strong>Required:</strong> {errorMsg}
        </div>
      )}

      {/* Main Professional Form Box */}
      <div className="portal-panel-block structured-form-card" style={{ padding: '24px 28px', background: '#ffffff', borderRadius: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: 14, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#96281B', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <i className={icon}></i>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>
                  {mode === 'edit' ? `Editing: ${formData.studentName || formData.name || title}` : `New ${title} Admission Form`}
                </h3>
                <span style={{ fontSize: 12, color: '#64748b' }}>
                  Session {settingsData?.session || '2026-2027'} • Lal Bihari Mahto Divine Public School
                </span>
              </div>
            </div>

            {mode === 'edit' && (
              <button
                type="button"
                className="save-btn-alt"
                style={{ fontSize: 12, padding: '4px 10px' }}
                onClick={handleReset}
              >
                <i className="fa-solid fa-arrow-rotate-left"></i> Cancel Edit & Start New
              </button>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="professional-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px 20px' }}>
            {fields.map((f) => {
              if (f.type === 'hidden') return null;
              const isFullWidth = f.type === 'textarea' || f.key === 'address' || f.key === 'details';
              const isPhone = f.key.toLowerCase().includes('phone') || f.key.toLowerCase().includes('mobile') || f.maxLength === 10;
              const val = formData[f.key] || '';

              return (
                <div
                  className="form-field-group"
                  key={f.key}
                  style={{
                    gridColumn: isFullWidth ? '1 / -1' : 'span 1',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <label className="field-title" style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                    {f.label}
                  </label>

                  {f.type === 'file' ? (
                    <div className="file-upload-wrapper" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-file-input"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            setFormData((prev) => ({
                              ...prev,
                              [`${f.key}DataUrl`]: reader.result,
                              [f.key]: reader.result,
                            }));
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      {formData[`${f.key}DataUrl`] && (
                        <img
                          src={formData[`${f.key}DataUrl`]}
                          alt="Uploaded avatar"
                          style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: '2px solid #96281B' }}
                        />
                      )}
                    </div>
                  ) : f.type === 'select' ? (
                    <select
                      className="form-input-control"
                      value={val}
                      onChange={(e) => handleInputChange(f.key, e.target.value)}
                      style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1' }}
                    >
                      <option value="">Select {f.label.replace('*', '').trim()}...</option>
                      {f.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : f.type === 'textarea' ? (
                    <textarea
                      className="form-input-control textarea-control"
                      rows={3}
                      placeholder={`Enter ${f.label.replace('*', '').trim()}...`}
                      value={val}
                      onChange={(e) => handleInputChange(f.key, e.target.value)}
                      style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', resize: 'vertical' }}
                    />
                  ) : (
                    <input
                      type={f.type || 'text'}
                      className="form-input-control"
                      maxLength={isPhone ? 10 : undefined}
                      placeholder={isPhone ? 'Enter 10-digit mobile number' : `Enter ${f.label.replace('*', '').trim()}...`}
                      value={val}
                      onChange={(e) => handleInputChange(f.key, e.target.value, isPhone)}
                      style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1' }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Actions Footer */}
          <div
            className="form-footer-actions"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 28,
              paddingTop: 16,
              borderTop: '1px solid #f1f5f9',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <button
              type="button"
              className="portal-danger-action"
              onClick={handleReset}
              style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '9px 18px' }}
            >
              <i className="fa-solid fa-eraser" style={{ marginRight: 6 }}></i> Clear Fields
            </button>

            <div style={{ display: 'flex', gap: 10 }}>
              {onViewDirectory && (
                <button
                  type="button"
                  className="save-btn-alt"
                  onClick={onViewDirectory}
                  style={{ padding: '9px 18px' }}
                >
                  <i className="fa-solid fa-list-check" style={{ marginRight: 6 }}></i>
                  Open Directory List
                </button>
              )}

              <button
                type="submit"
                className="portal-primary-action save-large-btn"
                style={{ padding: '9px 24px', fontSize: 14, fontWeight: 700 }}
              >
                <i className="fa-solid fa-circle-check" style={{ marginRight: 6 }}></i>
                {mode === 'edit' ? `Update ${title} Record` : `Save & Register ${title}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
