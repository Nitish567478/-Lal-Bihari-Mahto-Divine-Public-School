import React, { useState, useEffect } from 'react';
import { provisionStaffAccount, fetchStaffMembers } from '../../../utils/api';

const defaultStaffList = [
  {
    id: 'stf-01',
    username: 'tch_rksharma',
    fullName: 'Mr. R.K. Sharma',
    subject: 'Mathematics (Senior Secondary)',
    department: 'Department of Mathematics',
    designation: 'Senior PGT & Academic Coordinator',
    assignedClasses: ['Class 10-A', 'Class 9-A'],
    phone: '+91 94313 78901',
    email: 'rk.sharma@lbmdps.edu.in',
    status: 'Active',
    provisionedAt: '2026-10-15T09:30:00.000Z'
  },
  {
    id: 'stf-02',
    username: 'tch_sunitad',
    fullName: 'Mrs. Sunita Devi',
    subject: 'Science (Physics / Chemistry)',
    department: 'Department of Science & Innovation',
    designation: 'TGT Science In-charge',
    assignedClasses: ['Class 10-A', 'Class 10-B', 'Class 8-A'],
    phone: '+91 98351 12044',
    email: 'sunita.devi@lbmdps.edu.in',
    status: 'Active',
    provisionedAt: '2026-10-16T11:00:00.000Z'
  },
  {
    id: 'stf-03',
    username: 'tch_amitroy',
    fullName: 'Mr. Amit Roy',
    subject: 'English Communicative & Literature',
    department: 'Department of Languages',
    designation: 'TGT English & Debate Mentor',
    assignedClasses: ['Class 10-A', 'Class 9-B'],
    phone: '+91 94301 55672',
    email: 'amit.roy@lbmdps.edu.in',
    status: 'Active',
    provisionedAt: '2026-10-18T14:20:00.000Z'
  }
];

export default function StaffProvisioningPanel() {
  const token = localStorage.getItem('adminToken');
  const [staffList, setStaffList] = useState(defaultStaffList);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [provisionedSlip, setProvisionedSlip] = useState(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    department: 'Secondary & Senior Wing',
    designation: 'TGT Subject Mentor',
    assignedClasses: 'Class 10-A, Class 9-A',
    phone: '',
    email: ''
  });

  // Load existing provisioned staff
  useEffect(() => {
    async function loadStaff() {
      try {
        setLoading(true);
        const res = await fetchStaffMembers(token);
        if (res && res.ok && Array.isArray(res.staff) && res.staff.length > 0) {
          setStaffList(res.staff);
        }
      } catch (err) {
        console.warn('Staff members fetch fallback to defaults:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStaff();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProvisionSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.subject.trim()) {
      alert('Please provide the teacher full name and subject.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        fullName: formData.fullName.trim(),
        subject: formData.subject.trim(),
        department: formData.department,
        designation: formData.designation,
        assignedClasses: formData.assignedClasses.split(',').map(s => s.trim()).filter(Boolean),
        phone: formData.phone.trim() || '+91 94313 00000',
        email: formData.email.trim() || undefined
      };

      const res = await provisionStaffAccount(payload, token);
      if (res && res.ok && res.staff) {
        setProvisionedSlip(res.staff);
        setStaffList(prev => [res.staff, ...prev]);
        setFormData({
          fullName: '',
          subject: '',
          department: 'Secondary & Senior Wing',
          designation: 'TGT Subject Mentor',
          assignedClasses: 'Class 10-A, Class 9-A',
          phone: '',
          email: ''
        });
      } else {
        alert(res?.error || 'Provisioning failed. Please check inputs.');
      }
    } catch (err) {
      console.error('Provisioning error:', err);
      alert('Provisioning failed. Reverting to local store.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyCredentials = () => {
    if (!provisionedSlip) return;
    const text = `LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL\nTeacher Portal Credentials:\n• Faculty Name: ${provisionedSlip.fullName}\n• Username: ${provisionedSlip.username}\n• Temporary Password: ${provisionedSlip.tempPassword}\n• Portal URL: ${window.location.origin}/login?role=teacher\n\nNote: Please change your password upon initial login.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredStaff = staffList.filter(s =>
    (s.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.subject || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="provisioning-panel-root" style={{ padding: '24px 30px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: '16px',
        padding: '24px 28px',
        color: '#ffffff',
        marginBottom: '28px',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#38bdf8', marginBottom: '8px' }}>
            <span>🔐 SUPER ADMIN EXCLUSIVE</span>
          </div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Faculty & Staff Manual Provisioning Tool
          </h2>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', maxWidth: '640px' }}>
            Provision authenticated teacher accounts, generate cryptographically secure usernames and temporary access passwords, and issue official onboarding credential slips.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Active Faculty</span>
            <strong style={{ fontSize: '22px', color: '#38bdf8' }}>{staffList.length}</strong>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 420px) 1fr', gap: '28px', alignItems: 'start' }}>
        {/* Provisioning Form Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
              ✍️
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Provision New Teacher</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Generates unique username & password</span>
            </div>
          </div>

          <form onSubmit={handleProvisionSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Teacher Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Mr. Rajesh Kumar Singh"
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Primary Teaching Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Mathematics / Social Science"
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                >
                  <option value="Department of Mathematics">Mathematics</option>
                  <option value="Department of Science & Innovation">Science</option>
                  <option value="Department of Languages">Languages</option>
                  <option value="Department of Social Sciences">Social Sciences</option>
                  <option value="Pre-Primary & Primary Wing">Primary Wing</option>
                  <option value="Physical Education & Sports">Sports</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Designation
                </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                >
                  <option value="Senior PGT & Academic Lead">Senior PGT</option>
                  <option value="TGT Subject Mentor">TGT Mentor</option>
                  <option value="PRT Primary Educator">PRT Educator</option>
                  <option value="Head of Department (HOD)">HOD</option>
                  <option value="Co-Curricular Instructor">Co-Curricular</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Assigned Classes (comma separated)
              </label>
              <input
                type="text"
                name="assignedClasses"
                value={formData.assignedClasses}
                onChange={handleChange}
                placeholder="Class 10-A, Class 9-B"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 94313 00000"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Official Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="auto-generated if blank"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '12px 18px',
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
              }}
            >
              {submitting ? 'Generating Credentials...' : '🔑 Provision & Generate Login Credentials'}
            </button>
          </form>
        </div>

        {/* Right Section: Provisioned Slip Modal/Card & Table */}
        <div>
          {/* Active Provisioned Credentials Presentation Card */}
          {provisionedSlip && (
            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
              border: '2px solid #10b981',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.15)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                    ✓
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#065f46' }}>
                      Teacher Successfully Provisioned!
                    </h3>
                    <span style={{ fontSize: '13px', color: '#047857' }}>
                      Present these credentials to the teacher for secure onboarding.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setProvisionedSlip(null)}
                  style={{ background: 'transparent', border: 'none', fontSize: '18px', color: '#64748b', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '18px 20px',
                border: '1px solid #d1fae5',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', display: 'block' }}>Teacher Name</span>
                  <strong style={{ fontSize: '15px', color: '#0f172a' }}>{provisionedSlip.fullName}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', display: 'block' }}>Unique Username</span>
                  <strong style={{ fontSize: '16px', color: '#0284c7', fontFamily: 'monospace' }}>{provisionedSlip.username}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', display: 'block' }}>Temporary Password</span>
                  <strong style={{ fontSize: '16px', color: '#e11d48', fontFamily: 'monospace' }}>{provisionedSlip.tempPassword}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', display: 'block' }}>Portal URL</span>
                  <a href="/login?role=teacher" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#0284c7', fontWeight: '600' }}>
                    /login?role=teacher
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleCopyCredentials}
                  style={{
                    padding: '8px 16px',
                    background: copied ? '#059669' : '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {copied ? '✓ Credentials Copied!' : '📋 Copy Credentials to Clipboard'}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    padding: '8px 16px',
                    background: '#ffffff',
                    color: '#0f172a',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  🖨️ Print Onboarding Slip
                </button>
              </div>
            </div>
          )}

          {/* Provisioned Faculty Registry Table */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                  Provisioned Faculty Registry {loading && <span style={{ fontSize: '12px', color: '#0284c7' }}>(Syncing...)</span>}
                </h3>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Authorized teachers with portal session access</span>
              </div>
              <input
                type="text"
                placeholder="Search by name, subject, username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', width: '240px' }}
              />
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px 14px', fontWeight: '700' }}>Faculty Member</th>
                    <th style={{ padding: '12px 14px', fontWeight: '700' }}>Username</th>
                    <th style={{ padding: '12px 14px', fontWeight: '700' }}>Subject / Dept</th>
                    <th style={{ padding: '12px 14px', fontWeight: '700' }}>Assigned Classes</th>
                    <th style={{ padding: '12px 14px', fontWeight: '700' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staff, idx) => (
                    <tr key={staff.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{staff.fullName}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{staff.designation}</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontFamily: 'monospace', background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', fontWeight: '600', color: '#0284c7' }}>
                          {staff.username}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ color: '#1e293b', fontWeight: '500' }}>{staff.subject}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{staff.department}</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        {(Array.isArray(staff.assignedClasses) ? staff.assignedClasses : [staff.assignedClasses || 'Class 10-A']).map((c, i) => (
                          <span key={i} style={{ display: 'inline-block', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', marginRight: '4px', marginBottom: '2px' }}>
                            {c}
                          </span>
                        ))}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
                          ● Active
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredStaff.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                        No provisioned teachers match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
