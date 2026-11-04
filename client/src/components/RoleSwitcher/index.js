import { FaBolt } from 'react-icons/fa';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './index.css';

const allRoles = [
  { id: 'super_admin', label: 'Super Admin', path: '/admin/dashboard', icon: '👑', color: '#7c3aed', allowedFor: ['super_admin'] },
  { id: 'admin', label: 'Admin', path: '/admin/dashboard', icon: '🛡️', color: '#2563eb', allowedFor: ['super_admin', 'admin'] },
  { id: 'accountant', label: 'Accountant', path: '/accountant/dashboard', icon: '💰', color: '#059669', allowedFor: ['super_admin', 'accountant'] },
  { id: 'teacher', label: 'Teacher', path: '/teacher/dashboard', icon: '📚', color: '#d97706', allowedFor: ['super_admin', 'teacher'] },
  { id: 'student', label: 'Student', path: '/student/dashboard', icon: '🎓', color: '#0284c7', allowedFor: ['super_admin', 'student'] },
  { id: 'parent', label: 'Parent', path: '/parent/dashboard', icon: '👨‍👩‍👧', color: '#e11d48', allowedFor: ['super_admin', 'parent'] },
  { id: 'website', label: 'School Website', path: '/', icon: '🌐', color: '#475569', allowedFor: ['super_admin', 'admin', 'accountant', 'teacher', 'guest'] }
];

const RoleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem('adminToken');

  const authUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('authUser') || '{}');
    } catch (e) {
      return {};
    }
  })();
  const currentRole = authUser.role || localStorage.getItem('userRole') || 'super_admin';
  const isSuperAdmin = currentRole === 'super_admin';

  // Strictly ONLY super_admin can see or use the portal switcher!
  if (!isSuperAdmin) {
    return null;
  }

  const visibleRoles = allRoles;

  const handleSwitch = (role) => {
    if (role.id === 'kiosk' || role.id === 'website') {
      history.push(role.path);
      setIsOpen(false);
      return;
    }

    if (!token) {
      history.push('/login');
      setIsOpen(false);
      return;
    }

    // Retain master super_admin role in authUser so super admin is never locked out
    const updatedAuthUser = {
      ...authUser,
      role: 'super_admin',
      viewingAs: role.id
    };
    localStorage.setItem('authUser', JSON.stringify(updatedAuthUser));
    localStorage.setItem('userRole', 'super_admin');
    
    history.push(role.path);
    setIsOpen(false);
  };

  return (
    <div className="role-switcher-container">
      <button
        className="role-switcher-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Portal Switcher"
      >
        <span className="switcher-icon"><FaBolt /></span>
        <span className="switcher-text">Portal Switcher</span>
      </button>

      {isOpen && (
        <div className="role-switcher-modal">
          <div className="role-switcher-header">
            <h4>Authorized Portals</h4>
            <button className="role-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          <p className="role-switcher-desc">
            {currentRole === 'super_admin' ? 'Master administrator access - switch between portals:' : 'Your authorized school portal destinations:'}
          </p>
          <div className="role-buttons-grid">
            {visibleRoles.map((role) => {
              const isActive = (role.path !== '/' && location.pathname.startsWith(role.path)) || (role.path === '/' && location.pathname === '/');
              return (
                <button
                  key={role.id}
                  className={`role-btn ${isActive ? 'active' : ''}`}
                  style={{ '--role-accent': role.color }}
                  onClick={() => handleSwitch(role)}
                >
                  <span className="role-btn-icon">{role.icon}</span>
                  <div className="role-btn-text">
                    <strong>{role.label}</strong>
                    <span>{role.path}</span>
                  </div>
                  {isActive && <span className="active-dot"></span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;
