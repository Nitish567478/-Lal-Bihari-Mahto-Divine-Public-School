import React, { useState } from 'react';
import { roleDefinitions } from '../constants/adminData';

export default function UserManagementPanel({
  usersData = [],
  setUsersData,
  saveRecordList,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formState, setFormState] = useState({
    name: '',
    username: '',
    password: '',
    role: 'admin',
    email: '',
    phone: '',
    designation: 'School Staff',
    status: 'Active',
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormState({
      name: '',
      username: '',
      password: '',
      role: 'admin',
      email: '',
      phone: '',
      designation: 'School Staff',
      status: 'Active',
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormState({
      name: user.name || '',
      username: user.username || '',
      password: user.password || '••••••••',
      role: user.role || 'admin',
      email: user.email || '',
      phone: user.phone || '',
      designation: user.designation || '',
      status: user.status || 'Active',
    });
    setShowAddModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.username.trim()) {
      alert('Please fill user full name and login username.');
      return;
    }

    let updated;
    if (editingUser) {
      updated = usersData.map(u => u.id === editingUser.id ? { ...u, ...formState, updatedAt: new Date().toISOString() } : u);
    } else {
      const newUser = {
        id: `u-${Date.now()}`,
        ...formState,
        createdAt: new Date().toISOString(),
      };
      updated = [newUser, ...usersData];
    }

    setUsersData(updated);
    if (saveRecordList) saveRecordList('users', updated);
    setShowAddModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to remove sub-admin account "${name}"?`)) {
      const updated = usersData.filter(u => u.id !== id);
      setUsersData(updated);
      if (saveRecordList) saveRecordList('users', updated);
    }
  };

  const handleToggleStatus = (id) => {
    const updated = usersData.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    });
    setUsersData(updated);
    if (saveRecordList) saveRecordList('users', updated);
  };

  const filteredUsers = usersData.filter(u => {
    const matchesSearch = !searchTerm.trim() ||
      (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.phone || '').includes(searchTerm);
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const superAdminCount = usersData.filter(u => u.role === 'super_admin').length;
  const adminCount = usersData.filter(u => u.role === 'admin').length;
  const accountantCount = usersData.filter(u => u.role === 'accountant').length;
  const teacherCount = usersData.filter(u => u.role === 'teacher').length;

  const getRoleBadge = (role) => {
    switch (role) {
      case 'super_admin':
        return <span style={{ background: '#f3e8ff', color: '#7e22ce', padding: '3px 10px', borderRadius: 6, fontWeight: 800, fontSize: 11 }}><i className="fa-solid fa-crown"></i> SUPER ADMIN</span>;
      case 'admin':
        return <span style={{ background: '#dbeafe', color: '#1e3a8a', padding: '3px 10px', borderRadius: 6, fontWeight: 800, fontSize: 11 }}><i className="fa-solid fa-shield-halved"></i> ADMIN</span>;
      case 'accountant':
        return <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: 6, fontWeight: 800, fontSize: 11 }}><i className="fa-solid fa-wallet"></i> ACCOUNTANT</span>;
      case 'teacher':
        return <span style={{ background: '#fef3c7', color: '#b45309', padding: '3px 10px', borderRadius: 6, fontWeight: 800, fontSize: 11 }}><i className="fa-solid fa-chalkboard-user"></i> TEACHER</span>;
      default:
        return <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: 6, fontWeight: 800, fontSize: 11 }}>STAFF</span>;
    }
  };

  return (
    <section className="portal-section user-management-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-users-gear"></i> Sub-Admin & Role-Based Access Control</h2>
          <p className="portal-muted">Manage Super Admin, Admin, Accountant, and Teacher portal user accounts, permissions, and security.</p>
        </div>
        <div className="header-actions no-print" style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="save-btn-alt" onClick={() => saveRecordList('users', usersData)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Data
          </button>
          <button type="button" className="portal-primary-action" onClick={handleOpenAdd}>
            <i className="fa-solid fa-user-plus"></i> Add Sub-Admin / Staff User
          </button>
        </div>
      </div>

      {/* Role Counter Metric Cards */}
      <div className="portal-stats-grid">
        <article className="stat-card" style={{ borderLeft: '4px solid #7c3aed' }}>
          <div className="stat-icon" style={{ background: '#f3e8ff', color: '#7c3aed' }}><i className="fa-solid fa-crown"></i></div>
          <div className="stat-content">
            <span>Super Admins</span>
            <strong>{superAdminCount}</strong>
            <small>Full Master Access</small>
          </div>
        </article>
        <article className="stat-card" style={{ borderLeft: '4px solid #2563eb' }}>
          <div className="stat-icon" style={{ background: '#dbeafe', color: '#2563eb' }}><i className="fa-solid fa-shield-halved"></i></div>
          <div className="stat-content">
            <span>Admins</span>
            <strong>{adminCount}</strong>
            <small>Operations & Admissions</small>
          </div>
        </article>
        <article className="stat-card" style={{ borderLeft: '4px solid #16a34a' }}>
          <div className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><i className="fa-solid fa-wallet"></i></div>
          <div className="stat-content">
            <span>Accountants</span>
            <strong>{accountantCount}</strong>
            <small>Fee Billing & Receipts</small>
          </div>
        </article>
        <article className="stat-card" style={{ borderLeft: '4px solid #d97706' }}>
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}><i className="fa-solid fa-chalkboard-user"></i></div>
          <div className="stat-content">
            <span>Teachers</span>
            <strong>{teacherCount}</strong>
            <small>Attendance & Marksheets</small>
          </div>
        </article>
      </div>

      {/* Filter Controls */}
      <div className="portal-panel-block structured-controls" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label className="field-title" style={{ fontSize: 12 }}>Search Sub-Admins</label>
            <input
              className="form-input-control"
              placeholder="Search by name, username, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ width: 220 }}>
            <label className="field-title" style={{ fontSize: 12 }}>Filter By Role</label>
            <select
              className="form-input-control"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles ({usersData.length})</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="accountant">Accountant</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sub-Admins Table */}
      <div className="portal-table-wrap portal-panel-block" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="portal-table">
          <thead>
            <tr>
              <th>User / Staff Name</th>
              <th>Login Username</th>
              <th>Assigned Role</th>
              <th>Contact Email</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#0b1c3d', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {(user.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: 13, color: '#0f172a' }}>{user.name}</strong>
                      <small style={{ color: '#64748b' }}>{user.designation || 'Staff Member'}</small>
                    </div>
                  </div>
                </td>
                <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, color: '#1e3a8a', fontWeight: 'bold' }}>{user.username}</code></td>
                <td>{getRoleBadge(user.role)}</td>
                <td>{user.email || '-'}</td>
                <td><strong>{user.phone || '-'}</strong></td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(user.id)}
                    style={{
                      border: 'none',
                      background: user.status === 'Active' ? '#dcfce7' : '#dbeafe',
                      color: user.status === 'Active' ? '#15803d' : '#1e3a8a',
                      padding: '4px 10px',
                      borderRadius: 12,
                      fontWeight: 800,
                      fontSize: 11,
                      cursor: 'pointer'
                    }}
                    title="Click to toggle status"
                  >
                    {user.status === 'Active' ? '<FaCheck /> ACTIVE' : '✕ INACTIVE'}
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="save-btn-alt"
                      style={{ padding: '6px 10px', fontSize: 12 }}
                      onClick={() => handleOpenEdit(user)}
                      title="Edit Sub-Admin"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="portal-danger-action"
                      style={{ padding: '6px 10px', fontSize: 12 }}
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      title="Delete User"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filteredUsers.length && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: 30, color: '#64748b' }}>
                  No sub-admin accounts found. Click "Add Sub-Admin / Staff User" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Sub-Admin Modal Form */}
      {showAddModal && (
        <div className="portal-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="portal-modal-content structured-form-card" style={{ maxWidth: 680 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{editingUser ? 'Edit Sub-Admin Account' : 'Create New Sub-Admin / Staff User'}</h2>
                <p className="portal-muted">Assign portal permissions and login credentials</p>
              </div>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleSaveUser}>
              <div className="professional-form-grid">
                <div className="form-field-group">
                  <label className="field-title">Full Name *</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. Anil Kumar"
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Official Designation</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. Accounts Incharge / Faculty"
                    value={formState.designation}
                    onChange={e => setFormState({ ...formState, designation: e.target.value })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Assigned Role *</label>
                  <select
                    className="form-input-control"
                    value={formState.role}
                    onChange={e => setFormState({ ...formState, role: e.target.value })}
                  >
                    <option value="super_admin">Super Admin (👑 Full Master Access)</option>
                    <option value="admin">Admin (🛡️ Operations & CMS)</option>
                    <option value="accountant">Accountant (💰 Fee Collection & Dues)</option>
                    <option value="teacher">Teacher (📚 Attendance & Marksheets)</option>
                  </select>
                </div>
                <div className="form-field-group">
                  <label className="field-title">Account Status</label>
                  <select
                    className="form-input-control"
                    value={formState.status}
                    onChange={e => setFormState({ ...formState, status: e.target.value })}
                  >
                    <option value="Active">Active (Can Login)</option>
                    <option value="Inactive">Inactive (Suspended)</option>
                  </select>
                </div>
                <div className="form-field-group">
                  <label className="field-title">Login Username *</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. anil.admin"
                    value={formState.username}
                    onChange={e => setFormState({ ...formState, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">{editingUser ? 'New Password (leave blank to keep current)' : 'Login Password *'}</label>
                  <input
                    type="password"
                    className="form-input-control"
                    placeholder="Password"
                    value={formState.password}
                    onChange={e => setFormState({ ...formState, password: e.target.value })}
                    required={!editingUser}
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Email Address</label>
                  <input
                    type="email"
                    className="form-input-control"
                    placeholder="user@lbmdps.edu.in"
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-title">Phone Number (10-Digit)</label>
                  <input
                    className="form-input-control"
                    maxLength={10}
                    placeholder="10-digit phone"
                    value={formState.phone}
                    onChange={e => setFormState({ ...formState, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  />
                </div>
              </div>

              {/* Role Permissions Preview Box */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, marginTop: 16, fontSize: 12 }}>
                <strong>Role Permissions Summary:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#475569' }}>
                  {roleDefinitions[formState.role]?.desc || 'Standard staff portal access.'}
                </p>
              </div>

              <div className="form-footer-actions">
                <button type="button" className="portal-danger-action" onClick={() => setShowAddModal(false)}>
                  <i className="fa-solid fa-xmark"></i> Cancel
                </button>
                <button type="submit" className="portal-primary-action save-large-btn">
                  <i className="fa-solid fa-circle-check"></i> {editingUser ? 'Save Changes' : 'Create Sub-Admin Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
