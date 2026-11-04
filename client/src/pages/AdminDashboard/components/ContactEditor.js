import React from 'react';

export default function ContactEditor({
  contactData,
  setContactData,
  saveBlock,
}) {
  return (
    <section className="portal-section contact-editor-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-address-book"></i> Contact Information</h2>
          <p className="portal-muted">Manage school contact details, phone numbers (10-digit limit), emails, and Google Maps embed.</p>
        </div>
        <div className="header-actions no-print">
          <button type="button" className="portal-primary-action" onClick={() => saveBlock('contact-info', contactData)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Contact Data
          </button>
        </div>
      </div>

      <div className="structured-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        {/* Address Lines Card */}
        <div className="portal-panel-block">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', marginBottom: 14 }}>
            <i className="fa-solid fa-location-dot"></i> Address Lines
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contactData.address.map((line, idx) => (
              <div key={idx}>
                <label className="field-title" style={{ fontSize: 12 }}>Line {idx + 1}</label>
                <input
                  className="form-input-control"
                  value={line}
                  onChange={(e) => {
                    const address = [...contactData.address];
                    address[idx] = e.target.value;
                    setContactData({ ...contactData, address });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Phone Contacts Card */}
        <div className="portal-panel-block">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', marginBottom: 14 }}>
            <i className="fa-solid fa-phone"></i> Phone Contacts (10-Digit Max)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contactData.phones.map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 10 }}>
                <div>
                  <label className="field-title" style={{ fontSize: 12 }}>Label</label>
                  <input
                    className="form-input-control"
                    value={item.label}
                    onChange={(e) => {
                      const phones = [...contactData.phones];
                      phones[idx] = { ...phones[idx], label: e.target.value };
                      setContactData({ ...contactData, phones });
                    }}
                    placeholder="e.g. Office"
                  />
                </div>
                <div>
                  <label className="field-title" style={{ fontSize: 12 }}>Phone Number</label>
                  <input
                    className="form-input-control"
                    value={item.value}
                    maxLength={10}
                    onChange={(e) => {
                      const phones = [...contactData.phones];
                      phones[idx] = { ...phones[idx], value: e.target.value.replace(/\D/g, '').slice(0, 10) };
                      setContactData({ ...contactData, phones });
                    }}
                    placeholder="10-digit number"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Contacts Card */}
        <div className="portal-panel-block">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', marginBottom: 14 }}>
            <i className="fa-solid fa-envelope"></i> Email Contacts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contactData.emails.map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 10 }}>
                <div>
                  <label className="field-title" style={{ fontSize: 12 }}>Department</label>
                  <input
                    className="form-input-control"
                    value={item.label}
                    onChange={(e) => {
                      const emails = [...contactData.emails];
                      emails[idx] = { ...emails[idx], label: e.target.value };
                      setContactData({ ...contactData, emails });
                    }}
                    placeholder="e.g. Inquiries"
                  />
                </div>
                <div>
                  <label className="field-title" style={{ fontSize: 12 }}>Email Address</label>
                  <input
                    className="form-input-control"
                    value={item.value}
                    onChange={(e) => {
                      const emails = [...contactData.emails];
                      emails[idx] = { ...emails[idx], value: e.target.value };
                      setContactData({ ...contactData, emails });
                    }}
                    placeholder="user@lbmdps.edu.in"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Hours & Map Card */}
        <div className="portal-panel-block">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', marginBottom: 14 }}>
            <i className="fa-solid fa-clock"></i> Office Hours & Google Maps
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contactData.hours.map((hour, idx) => (
              <div key={idx}>
                <label className="field-title" style={{ fontSize: 12 }}>Schedule {idx + 1}</label>
                <input
                  className="form-input-control"
                  value={hour}
                  onChange={(e) => {
                    const hours = [...contactData.hours];
                    hours[idx] = e.target.value;
                    setContactData({ ...contactData, hours });
                  }}
                />
              </div>
            ))}
            <div style={{ marginTop: 6 }}>
              <label className="field-title" style={{ fontSize: 12 }}>Google Map Iframe Embed URL</label>
              <textarea
                className="form-input-control"
                value={contactData.mapLink}
                onChange={(e) => setContactData({ ...contactData, mapLink: e.target.value })}
                rows={3}
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button type="button" className="portal-primary-action save-large-btn" onClick={() => saveBlock('contact-info', contactData)}>
          <i className="fa-solid fa-circle-check"></i> Save Contact Data
        </button>
      </div>
    </section>
  );
}
