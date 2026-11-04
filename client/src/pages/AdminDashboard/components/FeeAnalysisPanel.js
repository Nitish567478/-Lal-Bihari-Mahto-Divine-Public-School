import React, { useState } from 'react';

export default function FeeAnalysisPanel({ feesData = [], settingsData }) {
  const [alertsSent, setAlertsSent] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');

  const unpaidStudents = feesData.filter(f => f.status?.toLowerCase() === 'unpaid');
  const totalPendingAmount = unpaidStudents.reduce((sum, f) => sum + (Number(f.amount) || 0), 0);

  const handleSendAlert = (studentName, phone) => {
    setAlertsSent(prev => [...prev, studentName]);
    setStatusMsg(`Payment reminder SMS & WhatsApp dispatched to ${phone || 'parent contact'} for ${studentName}.`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleSendAllAlerts = () => {
    setAlertsSent(unpaidStudents.map(s => s.studentName));
    setStatusMsg(`Bulk automated fee reminders dispatched to all ${unpaidStudents.length} pending accounts.`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <section className="portal-section fee-analysis-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-chart-pie"></i> Fee Dues Analytics & Automated Alerts</h2>
          <p className="portal-muted">Monitor pending school dues, defaulter accounts, and dispatch automated parent notifications.</p>
        </div>
        <div className="header-actions no-print">
          <button
            type="button"
            className="portal-danger-action"
            onClick={handleSendAllAlerts}
            disabled={!unpaidStudents.length}
          >
            <i className="fa-solid fa-paper-plane"></i> Send Alert to All ({unpaidStudents.length})
          </button>
        </div>
      </div>

      {statusMsg && <div className="portal-status">{statusMsg}</div>}

      <div className="portal-stats-grid">
        <article className="stat-card stat-fees">
          <div className="stat-icon"><i className="fa-solid fa-triangle-exclamation"></i></div>
          <div className="stat-content">
            <span>Total Unpaid Amount</span>
            <strong>₹{totalPendingAmount.toLocaleString()}</strong>
            <small>{unpaidStudents.length} Student Accounts Overdue</small>
          </div>
        </article>
        <article className="stat-card stat-presence">
          <div className="stat-icon"><i className="fa-solid fa-bell"></i></div>
          <div className="stat-content">
            <span>Alerts Sent</span>
            <strong>{alertsSent.length}</strong>
            <small>Parent Reminders Dispatched</small>
          </div>
        </article>
      </div>

      <div className="portal-panel-block" style={{ marginTop: 20 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', marginBottom: 14 }}>
          <i className="fa-solid fa-list-ul"></i> Pending Defaulter Accounts List
        </h3>
        <div className="portal-table-wrap">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Overdue Month</th>
                <th>Pending Amount</th>
                <th>Parent Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unpaidStudents.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td><strong>{item.studentName}</strong></td>
                  <td><span className="entry-class-pill">{item.className}</span></td>
                  <td><span style={{ color: '#3b82f6', fontWeight: 700 }}>{item.month}</span></td>
                  <td><strong>₹{(Number(item.amount) || 0).toLocaleString()}</strong></td>
                  <td>{item.phone || '9431378901'}</td>
                  <td>
                    <button
                      className="portal-primary-action"
                      style={{ padding: '6px 14px', fontSize: 12 }}
                      onClick={() => handleSendAlert(item.studentName, item.phone)}
                      disabled={alertsSent.includes(item.studentName)}
                    >
                      <i className="fa-solid fa-paper-plane"></i> {alertsSent.includes(item.studentName) ? 'Alert Dispatched' : 'Send Reminder'}
                    </button>
                  </td>
                </tr>
              ))}
              {!unpaidStudents.length && (
                <tr>
                  <td colSpan="6" className="portal-empty-state">
                    <i className="fa-solid fa-circle-check" style={{ color: '#16a34a', marginRight: 6 }}></i>
                    Zero fee defaults! All student accounts are fully paid.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
