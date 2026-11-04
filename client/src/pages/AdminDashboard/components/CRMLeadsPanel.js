import React, { useState, useEffect, useCallback } from 'react';
import { fetchCrmLeads, updateCrmLeadStatus, enrollStudentWorkflow } from '../../../utils/api';

const defaultLeads = [
  {
    leadId: 'CRM-10941',
    source: 'AI_CHATBOT_24_7',
    parentName: 'Manoj Kumar Agarwal',
    phone: '+91 94311 88204',
    email: 'manoj.agarwal@gmail.com',
    targetClass: 'Class 1',
    intentCategory: 'Eligibility & Age Criteria',
    query: 'What is the minimum age cutoff for Class 1 admission in Session 2026-27 under CBSE norms?',
    priority: 'HIGH',
    status: 'New Lead',
    alertTriggered: true,
    createdAt: '2026-10-28T09:15:00.000Z'
  },
  {
    leadId: 'CRM-10942',
    source: 'AI_CHATBOT_24_7',
    parentName: 'Sunita Devi Mahto',
    phone: '+91 98351 44109',
    email: 'sunita.mahto@gmail.com',
    targetClass: 'Class 9',
    intentCategory: 'Fee Structure & Installments',
    query: 'Can you provide the complete fee structure including admission fees and transport charges for Class 9?',
    priority: 'HIGH',
    status: 'In Contact',
    alertTriggered: true,
    createdAt: '2026-10-27T16:40:00.000Z'
  },
  {
    leadId: 'CRM-10943',
    source: 'AI_CHATBOT_24_7',
    parentName: 'Vikram Singh',
    phone: '+91 94301 22910',
    email: 'vikram.singh@outlook.com',
    targetClass: 'Class 6',
    intentCategory: 'Transport & Hostel Facilities',
    query: 'Is there school bus stoppage available near Pachamba Chowk for Class 6 student?',
    priority: 'MEDIUM',
    status: 'Campus Tour Scheduled',
    alertTriggered: true,
    createdAt: '2026-10-26T14:22:00.000Z'
  }
];

export default function CRMLeadsPanel() {
  const token = localStorage.getItem('adminToken');
  const [leads, setLeads] = useState(defaultLeads);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadForEnroll, setSelectedLeadForEnroll] = useState(null);
  const [enrollSubmitting, setEnrollSubmitting] = useState(false);
  const [enrollSuccessResult, setEnrollSuccessResult] = useState(null);

  // Enroll modal form state
  const [enrollForm, setEnrollForm] = useState({
    studentName: '',
    classApplying: 'Class 1',
    dob: '2020-04-15',
    gender: 'Male',
    parentName: '',
    phone: '',
    email: '',
    address: 'Giridih, Jharkhand'
  });

  const loadLeads = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchCrmLeads({}, token);
      if (res && res.ok && Array.isArray(res.leads) && res.leads.length > 0) {
        setLeads(res.leads);
      }
    } catch (err) {
      console.warn('CRM leads API fallback:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleStatusChange = async (leadId, nextStatus) => {
    try {
      setLeads(prev => prev.map(l => l.leadId === leadId ? { ...l, status: nextStatus } : l));
      await updateCrmLeadStatus(leadId, { status: nextStatus }, token);
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handleOpenEnrollModal = (lead) => {
    setSelectedLeadForEnroll(lead);
    setEnrollForm({
      studentName: lead.parentName ? `${lead.parentName.split(' ')[0]}'s Ward` : 'New Student',
      classApplying: lead.targetClass || 'Class 1',
      dob: '2020-04-15',
      gender: 'Male',
      parentName: lead.parentName || '',
      phone: lead.phone && lead.phone !== 'Phone Not Shared' ? lead.phone : '',
      email: lead.email && lead.email !== 'N/A' ? lead.email : '',
      address: 'Giridih, Jharkhand'
    });
  };

  const handleExecuteEnrollWorkflow = async (e) => {
    e.preventDefault();
    try {
      setEnrollSubmitting(true);
      const res = await enrollStudentWorkflow(enrollForm, token);
      if (res && res.ok && res.student) {
        setEnrollSuccessResult(res);
        // Mark lead as Enrolled
        if (selectedLeadForEnroll) {
          handleStatusChange(selectedLeadForEnroll.leadId, 'Enrolled');
        }
      } else {
        alert(res?.error || 'Enrollment workflow trigger failed.');
      }
    } catch (err) {
      console.error('Enrollment workflow error:', err);
      alert('Enrollment trigger failed. Check console.');
    } finally {
      setEnrollSubmitting(false);
    }
  };

  const categories = [
    'All',
    'Eligibility & Age Criteria',
    'Fee Structure & Installments',
    'Transport & Hostel Facilities',
    'Direct Enrollment & Document Support',
    'General Academic Inquiry'
  ];

  const filteredLeads = leads.filter(l => {
    const matchesCat = filterCategory === 'All' || l.intentCategory === filterCategory;
    const matchesStat = filterStatus === 'All' || l.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (l.parentName || '').toLowerCase().includes(q) ||
      (l.phone || '').toLowerCase().includes(q) ||
      (l.query || '').toLowerCase().includes(q) ||
      (l.leadId || '').toLowerCase().includes(q);
    return matchesCat && matchesStat && matchesSearch;
  });

  const newLeadsCount = leads.filter(l => l.status === 'New Lead').length;
  const highPriorityCount = leads.filter(l => l.priority === 'HIGH').length;
  const enrolledCount = leads.filter(l => l.status === 'Enrolled').length;

  return (
    <div className="crm-panel-root" style={{ padding: '24px 30px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #092e20 0%, #064e3b 100%)',
        borderRadius: '16px',
        padding: '24px 28px',
        color: '#ffffff',
        marginBottom: '28px',
        boxShadow: '0 10px 25px -5px rgba(6, 78, 59, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid rgba(52, 211, 153, 0.4)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#6ee7b7', marginBottom: '8px' }}>
            <span>⚡ REAL-TIME CRM & ADMISSION SYNCHRONIZATION</span>
          </div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '800' }}>
            AI Admission Assistant Leads & Outreach Desk
          </h2>
          <p style={{ margin: 0, color: '#a7f3d0', fontSize: '14px', maxWidth: '640px' }}>
            Queries submitted through the 24/7 AI Admission Counselor are automatically categorized, scored, and posted here in real time with immediate outreach alerts.
          </p>
        </div>

        <button
          type="button"
          onClick={loadLeads}
          disabled={loading}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#ffffff',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {loading ? 'Refreshing...' : '🔄 Sync Real-Time Leads'}
        </button>
      </div>

      {/* KPI Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Total CRM Inquiries</span>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>{leads.length}</div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #fde047', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <span style={{ fontSize: '12px', color: '#854d0e', fontWeight: '700', textTransform: 'uppercase' }}>🚨 New Urgent Alerts</span>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#ca8a04', marginTop: '4px' }}>{newLeadsCount}</div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #fca5a5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <span style={{ fontSize: '12px', color: '#991b1b', fontWeight: '700', textTransform: 'uppercase' }}>High Priority Leads</span>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#dc2626', marginTop: '4px' }}>{highPriorityCount}</div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #86efac', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <span style={{ fontSize: '12px', color: '#166534', fontWeight: '700', textTransform: 'uppercase' }}>Conversions to Enrolled</span>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#16a34a', marginTop: '4px' }}>{enrolledCount}</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{
        background: '#ffffff',
        borderRadius: '14px',
        padding: '16px 20px',
        border: '1px solid #e2e8f0',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>Category:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
          >
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          <span style={{ fontSize: '13px', fontWeight: '700', color: '#475569', marginLeft: '8px' }}>Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
          >
            <option value="All">All Statuses</option>
            <option value="New Lead">New Lead</option>
            <option value="In Contact">In Contact</option>
            <option value="Campus Tour Scheduled">Campus Tour Scheduled</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search query, parent, phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', width: '260px' }}
        />
      </div>

      {/* Leads Table */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '14px 16px', fontWeight: '700' }}>Lead ID & Date</th>
                <th style={{ padding: '14px 16px', fontWeight: '700' }}>Parent / Contact Details</th>
                <th style={{ padding: '14px 16px', fontWeight: '700' }}>Target Class & Intent</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', maxWidth: '320px' }}>Inquiry Recorded by AI</th>
                <th style={{ padding: '14px 16px', fontWeight: '700' }}>Status & Outreach</th>
                <th style={{ padding: '14px 16px', fontWeight: '700' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, idx) => (
                <tr key={lead.leadId || idx} style={{ borderBottom: '1px solid #f1f5f9', background: lead.status === 'New Lead' ? '#fefce8' : '#ffffff' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '700', color: '#0f172a', fontFamily: 'monospace' }}>{lead.leadId}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                    </div>
                    {lead.priority === 'HIGH' && (
                      <span style={{ display: 'inline-block', background: '#fee2e2', color: '#b91c1c', padding: '2px 6px', borderRadius: '6px', fontSize: '10px', fontWeight: '800', marginTop: '4px' }}>
                        HIGH PRIORITY
                      </span>
                    )}
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>{lead.parentName}</div>
                    <div style={{ color: '#0369a1', fontWeight: '600' }}>📞 {lead.phone}</div>
                    {lead.email && lead.email !== 'N/A' && (
                      <div style={{ fontSize: '11px', color: '#64748b' }}>✉️ {lead.email}</div>
                    )}
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-block', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>
                      {lead.targetClass || 'Any Class'}
                    </span>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                      🏷️ {lead.intentCategory}
                    </div>
                  </td>

                  <td style={{ padding: '14px 16px', maxWidth: '320px' }}>
                    <p style={{ margin: 0, color: '#334155', fontSize: '12px', lineHeight: '1.4' }}>
                      "{lead.query || lead.transcriptSnippet}"
                    </p>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.leadId, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: '1px solid #cbd5e1',
                        background: lead.status === 'New Lead' ? '#fef08a' : lead.status === 'Enrolled' ? '#bbf7d0' : '#ffffff',
                        color: lead.status === 'New Lead' ? '#854d0e' : lead.status === 'Enrolled' ? '#166534' : '#0f172a'
                      }}
                    >
                      <option value="New Lead">● New Lead</option>
                      <option value="In Contact">📞 In Contact</option>
                      <option value="Campus Tour Scheduled">🏫 Campus Tour Scheduled</option>
                      <option value="Enrolled">🎓 Enrolled</option>
                      <option value="Closed">✕ Closed</option>
                    </select>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <button
                      type="button"
                      onClick={() => handleOpenEnrollModal(lead)}
                      style={{
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      ⚡ 1-Click Enroll
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    No admission leads matching the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1-Click Automated Student Enrollment Modal */}
      {selectedLeadForEnroll && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '600px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {!enrollSuccessResult ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                      Execute Automated Enrollment Trigger
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Auto-generates non-sequential admission # & dispatches credentials via SMS/Email
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedLeadForEnroll(null)}
                    style={{ background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleExecuteEnrollWorkflow}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                        Student Legal Name *
                      </label>
                      <input
                        type="text"
                        value={enrollForm.studentName}
                        onChange={(e) => setEnrollForm({ ...enrollForm, studentName: e.target.value })}
                        required
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                        Class Applying *
                      </label>
                      <select
                        value={enrollForm.classApplying}
                        onChange={(e) => setEnrollForm({ ...enrollForm, classApplying: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                      >
                        {Array.from({ length: 10 }).map((_, i) => (
                          <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        value={enrollForm.parentName}
                        onChange={(e) => setEnrollForm({ ...enrollForm, parentName: e.target.value })}
                        required
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                        Primary Mobile Phone (for SMS dispatch) *
                      </label>
                      <input
                        type="tel"
                        value={enrollForm.phone}
                        onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                        required
                        placeholder="+91 94313 00000"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                      Parent Email (for credential email dispatch)
                    </label>
                    <input
                      type="email"
                      value={enrollForm.email}
                      onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                      placeholder="parent@gmail.com"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '18px', fontSize: '12px', color: '#64748b' }}>
                    ℹ️ Triggering this will:
                    <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
                      <li>Generate a non-sequential unique admission number (e.g., LBM-2026-XXXXX).</li>
                      <li>Generate a temporary password and register the student/parent in the database.</li>
                      <li>Simulate instant SMS & Email credential dispatch via notification service.</li>
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedLeadForEnroll(null)}
                      style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={enrollSubmitting}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: enrollSubmitting ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {enrollSubmitting ? 'Executing Trigger...' : '🚀 Execute Registration & Dispatch'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 12px auto' }}>
                    ✓
                  </div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#065f46' }}>
                    Student Successfully Enrolled!
                  </h3>
                  <span style={{ fontSize: '13px', color: '#047857' }}>
                    Credentials generated & dispatched via notification gateways.
                  </span>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '18px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Admission Number:</span>
                    <strong style={{ color: '#0284c7', fontFamily: 'monospace' }}>{enrollSuccessResult.student?.admissionNo}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Temporary Password:</span>
                    <strong style={{ color: '#e11d48', fontFamily: 'monospace' }}>{enrollSuccessResult.student?.tempPassword}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Student Name:</span>
                    <strong>{enrollSuccessResult.student?.legalName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Class Enrolled:</span>
                    <strong>{enrollSuccessResult.student?.grade}</strong>
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bbf7d0', marginBottom: '20px', fontSize: '12px', color: '#166534' }}>
                  ✅ <strong>Dispatch Gateways Confirmed:</strong>
                  <div>• SMS Dispatched to {enrollSuccessResult.student?.parentPhone}</div>
                  <div>• Email Dispatched to {enrollSuccessResult.student?.parentEmail}</div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEnrollSuccessResult(null);
                    setSelectedLeadForEnroll(null);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#0f172a',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
