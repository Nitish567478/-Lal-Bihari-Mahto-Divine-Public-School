import React, { useState } from 'react';
import { classList, monthNames } from '../constants/adminData';

export default function AttendancePanel({
  attendanceData = [],
  setAttendanceData,
  saveRecordList,
  applications = [],
}) {
  const [selectedClass, setSelectedClass] = useState('Class 1');
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [selectedYear] = useState(2026);
  const [statusMsg, setStatusMsg] = useState('');

  // Enrolled students in this class
  const classStudents = applications.filter(a => a.classApplying === selectedClass);
  const studentNames = classStudents.length
    ? classStudents.map(a => a.studentName)
    : ['Aarav Kumar', 'Priya Kumari', 'Rahul Verma', 'Sneha Sharma', 'Amit Mahto', 'Neha Singh'];

  const daysInMonth = 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getAttendanceKey = (student, day) => `${selectedClass}-${selectedMonth}-${selectedYear}-${student}-${day}`;

  const [register, setRegister] = useState({});

  const toggleStatus = (student, day) => {
    const key = getAttendanceKey(student, day);
    const curr = register[key] || 'P';
    const next = curr === 'P' ? 'A' : curr === 'A' ? 'L' : 'P';
    setRegister(prev => ({ ...prev, [key]: next }));
  };

  const handleMarkAllPresent = (day) => {
    const next = { ...register };
    studentNames.forEach(student => {
      const key = getAttendanceKey(student, day);
      next[key] = 'P';
    });
    setRegister(next);
  };

  const handleSaveAttendance = () => {
    const records = [];
    studentNames.forEach(student => {
      days.forEach(day => {
        const key = getAttendanceKey(student, day);
        const st = register[key] || 'P';
        records.push({
          date: `${selectedYear}-${String(monthNames.indexOf(selectedMonth) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          className: selectedClass,
          studentName: student,
          present: st === 'P',
          absent: st === 'A',
          leave: st === 'L',
        });
      });
    });

    setAttendanceData(records);
    if (saveRecordList) saveRecordList('attendance', records);
    setStatusMsg('Attendance saved successfully.');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  return (
    <section className="portal-section attendance-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-calendar-check"></i> Class Attendance Register</h2>
          <p className="portal-muted">Mark daily student presence, evaluate monthly attendance percentages, and record leaves.</p>
        </div>
        <div className="header-actions no-print" style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="save-btn-alt" onClick={() => window.print()}>
            <i className="fa-solid fa-print"></i> Print Register
          </button>
          <button type="button" className="portal-primary-action" onClick={handleSaveAttendance}>
            <i className="fa-solid fa-floppy-disk"></i> Save Attendance
          </button>
        </div>
      </div>

      {statusMsg && <div className="portal-status">{statusMsg}</div>}

      {/* Class & Month Selectors */}
      <div className="portal-panel-block structured-controls" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ width: 180 }}>
            <label className="field-title" style={{ fontSize: 12 }}>Select Class</label>
            <select
              className="form-input-control"
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
            >
              {classList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ width: 160 }}>
            <label className="field-title" style={{ fontSize: 12 }}>Select Month</label>
            <select
              className="form-input-control"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              {monthNames.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, fontWeight: 700 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, background: '#10b981', borderRadius: 2 }}></span> P: Present</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, background: '#60a5fa', borderRadius: 2 }}></span> A: Absent</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, background: '#f59e0b', borderRadius: 2 }}></span> L: Leave</span>
          </div>
        </div>
      </div>

      {/* Attendance Grid Table */}
      <div className="portal-table-wrap portal-panel-block" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="portal-table" style={{ minWidth: 1000 }}>
          <thead>
            <tr>
              <th style={{ position: 'sticky', left: 0, zIndex: 10, background: '#0b1c3d' }}>Student Name</th>
              {days.slice(0, 16).map(d => (
                <th key={d} style={{ textAlign: 'center', padding: '6px 4px', fontSize: 11 }}>
                  <div>{d}</div>
                  <button
                    type="button"
                    style={{ background: 'transparent', border: 'none', color: '#fbbf24', fontSize: 9, cursor: 'pointer' }}
                    onClick={() => handleMarkAllPresent(d)}
                    title="Mark all P"
                  >
                    All P
                  </button>
                </th>
              ))}
              <th style={{ textAlign: 'center', background: '#07132c' }}>Total P</th>
              <th style={{ textAlign: 'center', background: '#07132c' }}>%</th>
            </tr>
          </thead>
          <tbody>
            {studentNames.map((student, idx) => {
              let presentCount = 0;
              days.slice(0, 16).forEach(d => {
                const st = register[getAttendanceKey(student, d)] || 'P';
                if (st === 'P') presentCount++;
              });
              const perc = ((presentCount / 16) * 100).toFixed(0);

              return (
                <tr key={idx}>
                  <td style={{ position: 'sticky', left: 0, zIndex: 5, background: '#ffffff', fontWeight: 700 }}>
                    {student}
                  </td>
                  {days.slice(0, 16).map(d => {
                    const st = register[getAttendanceKey(student, d)] || 'P';
                    const bg = st === 'P' ? '#dcfce7' : st === 'A' ? '#dbeafe' : '#fef3c7';
                    const color = st === 'P' ? '#15803d' : st === 'A' ? '#1e3a8a' : '#b45309';

                    return (
                      <td key={d} style={{ textAlign: 'center', padding: '4px 2px' }}>
                        <button
                          type="button"
                          onClick={() => toggleStatus(student, d)}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 4,
                            border: '1px solid #cbd5e1',
                            background: bg,
                            color: color,
                            fontWeight: 800,
                            fontSize: 12,
                            cursor: 'pointer',
                          }}
                        >
                          {st}
                        </button>
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{presentCount} / 16</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold', color: perc >= 75 ? '#15803d' : '#3b82f6' }}>{perc}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
