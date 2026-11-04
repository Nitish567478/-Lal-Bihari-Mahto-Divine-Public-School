import React from 'react';

export default function SettingsPanel({
  settingsData,
  setSettingsData,
  saveBlock,
}) {
  return (
    <section className="portal-section settings-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-gear"></i> Portal System Settings</h2>
          <p className="portal-muted">Configure official school credentials, active academic session, and principal notices.</p>
        </div>
        <div className="header-actions no-print">
          <button type="button" className="portal-primary-action" onClick={() => saveBlock('settings', settingsData)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Settings
          </button>
        </div>
      </div>

      <div className="portal-panel-block structured-form-card" style={{ maxWidth: 800 }}>
        <div className="professional-form-grid">
          <div className="form-field-group field-span-2">
            <label className="field-title">School Name</label>
            <input
              className="form-input-control"
              value={settingsData.schoolName}
              onChange={(e) => setSettingsData({ ...settingsData, schoolName: e.target.value })}
            />
          </div>
          <div className="form-field-group">
            <label className="field-title">Academic Session</label>
            <input
              className="form-input-control"
              placeholder="e.g. 2026-2027"
              value={settingsData.session}
              onChange={(e) => setSettingsData({ ...settingsData, session: e.target.value })}
            />
          </div>
          <div className="form-field-group">
            <label className="field-title">Principal Name</label>
            <input
              className="form-input-control"
              placeholder="e.g. Dr. R. K. Sharma"
              value={settingsData.principal}
              onChange={(e) => setSettingsData({ ...settingsData, principal: e.target.value })}
            />
          </div>
          <div className="form-field-group field-span-2">
            <label className="field-title">Important Public / Portal Notice</label>
            <textarea
              className="form-input-control textarea-control"
              value={settingsData.notice}
              onChange={(e) => setSettingsData({ ...settingsData, notice: e.target.value })}
              rows={4}
              placeholder="Type urgent announcements or admission dates here..."
            />
          </div>
        </div>

        <div className="form-footer-actions" style={{ marginTop: 24 }}>
          <button type="button" className="portal-primary-action save-large-btn" onClick={() => saveBlock('settings', settingsData)}>
            <i className="fa-solid fa-circle-check"></i> Save Settings
          </button>
        </div>
      </div>
    </section>
  );
}
