import React, { useState } from 'react';
import { classList, monthNames } from '../constants/adminData';

export default function FeesPanel({
  feesData = [],
  setFeesData,
  saveRecordList,
  settingsData,
}) {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [newForm, setNewForm] = useState({
    studentName: '',
    className: 'Class 1',
    month: 'March',
    amount: 1500,
    status: 'Paid',
    transport: 'School Bus',
    phone: '',
    receiptNo: `REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
  });

  const handleAddFee = (e) => {
    e.preventDefault();
    if (!newForm.studentName.trim()) {
      alert('Please enter student name');
      return;
    }

    const item = {
      id: `fee-${Date.now()}`,
      ...newForm,
      createdAt: new Date().toISOString(),
    };

    const updated = [item, ...feesData];
    setFeesData(updated);
    if (saveRecordList) saveRecordList('fees', updated);
    setShowAddModal(false);
    setSelectedReceipt(item);
    setNewForm({
      studentName: '',
      className: 'Class 1',
      month: 'March',
      amount: 1500,
      status: 'Paid',
      transport: 'School Bus',
      phone: '',
      receiptNo: `REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    });
  };

  const handleDeleteFee = (id, name) => {
    if (window.confirm(`Are you sure you want to delete Fee record for ${name}?`)) {
      const updated = feesData.filter(f => f.id !== id);
      setFeesData(updated);
      if (saveRecordList) saveRecordList('fees', updated);
    }
  };

  const filteredFees = feesData.filter(f => {
    const matchesSearch = !searchTerm.trim() ||
      (f.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.receiptNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.phone || '').includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || f.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = feesData
    .filter(f => f.status === 'Paid')
    .reduce((sum, f) => sum + (Number(f.amount) || 0), 0);

  const totalPending = feesData
    .filter(f => f.status === 'Unpaid')
    .reduce((sum, f) => sum + (Number(f.amount) || 0), 0);

  return (
    <section className="portal-section fees-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-hand-holding-dollar"></i> Student Fee Collection & Billing</h2>
          <p className="portal-muted">Collect school tuition fees, issue computer-generated receipts, and track unpaid balances.</p>
        </div>
        <div className="header-actions no-print" style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="save-btn-alt" onClick={() => saveRecordList('fees', feesData)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Data
          </button>
          <button type="button" className="portal-primary-action" onClick={() => setShowAddModal(true)}>
            <i className="fa-solid fa-plus"></i> Collect Fee Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="portal-stats-grid">
        <article className="stat-card stat-presence">
          <div className="stat-icon"><i className="fa-solid fa-circle-check"></i></div>
          <div className="stat-content">
            <span>Total Collected</span>
            <strong>₹{totalCollected.toLocaleString()}</strong>
            <small>Active Term Collections</small>
          </div>
        </article>
        <article className="stat-card stat-fees">
          <div className="stat-icon"><i className="fa-solid fa-clock-rotate-left"></i></div>
          <div className="stat-content">
            <span>Pending Dues</span>
            <strong>₹{totalPending.toLocaleString()}</strong>
            <small>{feesData.filter(f => f.status === 'Unpaid').length} Invoices Pending</small>
          </div>
        </article>
      </div>

      {/* Filters */}
      <div className="portal-panel-block structured-controls" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label className="field-title" style={{ fontSize: 12 }}>Search Payment</label>
            <input
              className="form-input-control"
              placeholder="Search by student name, receipt number, or phone..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ width: 180 }}>
            <label className="field-title" style={{ fontSize: 12 }}>Payment Status</label>
            <select
              className="form-input-control"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fee Table */}
      <div className="portal-table-wrap portal-panel-block" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="portal-table">
          <thead>
            <tr>
              <th>Receipt No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Billing Month</th>
              <th>Amount</th>
              <th>Transport</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFees.map((item) => (
              <tr key={item.id}>
                <td><strong style={{ color: '#1e3a8a' }}>{item.receiptNo || 'REC-2026-001'}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0b1c3d', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 'bold' }}>
                      {(item.studentName || 'S').charAt(0).toUpperCase()}
                    </div>
                    <strong>{item.studentName}</strong>
                  </div>
                </td>
                <td><span className="entry-class-pill">{item.className}</span></td>
                <td>{item.month}</td>
                <td><strong>₹{(Number(item.amount) || 0).toLocaleString()}</strong></td>
                <td><small>{item.transport || 'Bus'}</small></td>
                <td>
                  <span className={`status-pill ${item.status === 'Paid' ? 'active' : 'pending'}`}>
                    {item.status || 'Paid'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="portal-primary-action"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={() => setSelectedReceipt(item)}
                      title="Print Fee Receipt"
                    >
                      <i className="fa-solid fa-print"></i> Receipt
                    </button>
                    <button
                      className="portal-danger-action"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={() => handleDeleteFee(item.id, item.studentName)}
                      title="Delete Invoice"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filteredFees.length && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: 30, color: '#64748b' }}>
                  No fee records found. Click "Collect Fee Payment" to create an invoice.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Collect Fee Modal */}
      {showAddModal && (
        <div className="portal-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="portal-modal-content structured-form-card" style={{ maxWidth: 680 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Collect School Fee</h2>
                <p className="portal-muted">Generate official fee invoice and receipt</p>
              </div>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddFee}>
              <div className="professional-form-grid">
                <div className="form-field-group">
                  <label className="field-title">Receipt Number</label>
                  <input
                    className="form-input-control"
                    value={newForm.receiptNo}
                    onChange={e => setNewForm({ ...newForm, receiptNo: e.target.value })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Student Name *</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. Aarav Kumar"
                    value={newForm.studentName}
                    onChange={e => setNewForm({ ...newForm, studentName: e.target.value })}
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
                  <label className="field-title">Billing Month *</label>
                  <select
                    className="form-input-control"
                    value={newForm.month}
                    onChange={e => setNewForm({ ...newForm, month: e.target.value })}
                  >
                    {monthNames.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="form-field-group">
                  <label className="field-title">Amount (₹) *</label>
                  <input
                    type="number"
                    className="form-input-control"
                    value={newForm.amount}
                    onChange={e => setNewForm({ ...newForm, amount: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Payment Status</label>
                  <select
                    className="form-input-control"
                    value={newForm.status}
                    onChange={e => setNewForm({ ...newForm, status: e.target.value })}
                  >
                    <option value="Paid">Paid (Cash / UPI)</option>
                    <option value="Unpaid">Unpaid / Due</option>
                  </select>
                </div>
                <div className="form-field-group">
                  <label className="field-title">Transport Facility</label>
                  <select
                    className="form-input-control"
                    value={newForm.transport}
                    onChange={e => setNewForm({ ...newForm, transport: e.target.value })}
                  >
                    <option value="School Bus">School Bus</option>
                    <option value="Private / Walking">Private / Walking</option>
                    <option value="Hostel">Hostel</option>
                  </select>
                </div>
                <div className="form-field-group">
                  <label className="field-title">Parent Contact (10-Digit)</label>
                  <input
                    className="form-input-control"
                    maxLength={10}
                    placeholder="10-digit number"
                    value={newForm.phone}
                    onChange={e => setNewForm({ ...newForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  />
                </div>
              </div>

              <div className="form-footer-actions">
                <button type="button" className="portal-danger-action" onClick={() => setShowAddModal(false)}>
                  <i className="fa-solid fa-xmark"></i> Cancel
                </button>
                <button type="submit" className="portal-primary-action save-large-btn">
                  <i className="fa-solid fa-circle-check"></i> Generate Fee Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Printable Fee Receipt Modal */}
      {selectedReceipt && (
        <div className="portal-modal-overlay" onClick={() => setSelectedReceipt(null)}>
          <div className="portal-modal-content professional-marksheet print-area" style={{ maxWidth: 650 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Official Fee Receipt</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="portal-primary-action" onClick={() => window.print()}>
                  <i className="fa-solid fa-print"></i> Print Receipt
                </button>
                <button className="close-modal" onClick={() => setSelectedReceipt(null)}>&times;</button>
              </div>
            </div>

            <div className="marksheet-border-outer">
              <div className="marksheet-border-inner">
                <div className="marksheet-header">
                  <div className="school-logo-placeholder">LBMDPS</div>
                  <h1>LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL</h1>
                  <p className="school-addr">NAITAND, POST BANDIYABAD, GIRIDIH, JHARKHAND - 815316</p>
                  <p className="school-affil">Affiliated to CBSE, New Delhi • Estd. 2013</p>
                  <h2 className="report-title">FEE PAYMENT RECEIPT</h2>
                  <p className="academic-session">Session: {settingsData?.session || '2026-2027'}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 16, fontSize: 13 }}>
                  <div><strong>Receipt No:</strong> <span style={{ color: '#1e3a8a', fontWeight: 800 }}>{selectedReceipt.receiptNo}</span></div>
                  <div><strong>Date:</strong> <span>{new Date().toLocaleDateString()}</span></div>
                  <div><strong>Student Name:</strong> <span style={{ fontWeight: 800, textTransform: 'uppercase' }}>{selectedReceipt.studentName}</span></div>
                  <div><strong>Class:</strong> <span>{selectedReceipt.className}</span></div>
                  <div><strong>Billing Month:</strong> <span>{selectedReceipt.month}</span></div>
                  <div><strong>Payment Status:</strong> <span style={{ color: selectedReceipt.status === 'Paid' ? '#15803d' : '#1e3a8a', fontWeight: 800 }}>{selectedReceipt.status}</span></div>
                </div>

                <table className="marksheet-table-professional" style={{ marginBottom: 16 }}>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th style={{ textAlign: 'right', width: 120 }}>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monthly Tuition & Maintenance Fee ({selectedReceipt.month})</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹{((Number(selectedReceipt.amount) || 0) * 0.8).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Transport & Campus Facilities ({selectedReceipt.transport || 'Standard'})</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹{((Number(selectedReceipt.amount) || 0) * 0.2).toFixed(2)}</td>
                    </tr>
                    <tr className="total-row-highlight">
                      <td style={{ textAlign: 'right', fontWeight: 900 }}>TOTAL AMOUNT RECEIVED:</td>
                      <td style={{ textAlign: 'right', fontSize: '1rem', color: '#1e3a8a' }}>₹{(Number(selectedReceipt.amount) || 0).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="marksheet-footer-structured">
                  <div className="sig-box">
                    <div className="sig-space"></div>
                    <div className="sig-line"></div>
                    <span>Accountant Signature</span>
                  </div>
                  <div className="sig-box">
                    <div className="sig-space"></div>
                    <div className="sig-line"></div>
                    <span>Principal Seal</span>
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
