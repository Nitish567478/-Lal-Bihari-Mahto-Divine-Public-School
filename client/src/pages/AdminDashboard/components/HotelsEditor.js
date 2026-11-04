import React from 'react';

export default function HotelsEditor({
  hotelsData,
  setHotelsData,
  saveBlock,
}) {
  const handleAddHotelCard = () => {
    setHotelsData((prev) => ({
      ...prev,
      cards: [...prev.cards, { title: '', description: '', imageUrl: '' }],
    }));
  };

  const handleHotelCardChange = (index, field, value) => {
    setHotelsData((prev) => {
      const cards = [...prev.cards];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, cards };
    });
  };

  return (
    <section className="portal-section hotel-editor-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-hotel"></i> Hotel & Guest House Section</h2>
          <p className="portal-muted">Manage campus guest house listings, descriptions, and facility photos.</p>
        </div>
        <div className="header-actions no-print">
          <button type="button" className="portal-primary-action" onClick={() => saveBlock('hotels', hotelsData)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Hotel Section
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Header Details Card */}
        <div className="portal-panel-block structured-form-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', marginBottom: 14 }}>
            Section Title & Header
          </h3>
          <div className="professional-form-grid">
            <div className="form-field-group field-span-2">
              <label className="field-title">Section Title</label>
              <input
                className="form-input-control"
                value={hotelsData.title}
                onChange={(e) => setHotelsData({ ...hotelsData, title: e.target.value })}
              />
            </div>
            <div className="form-field-group field-span-2">
              <label className="field-title">Description</label>
              <textarea
                className="form-input-control textarea-control"
                value={hotelsData.description}
                onChange={(e) => setHotelsData({ ...hotelsData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Hotel Cards List */}
        <div className="portal-panel-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', margin: 0 }}>
              <i className="fa-solid fa-bed"></i> Hotel & Room Cards ({hotelsData.cards.length})
            </h3>
            <button type="button" className="save-btn-alt" onClick={handleAddHotelCard}>
              <i className="fa-solid fa-plus"></i> Add Hotel Card
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
            {hotelsData.cards.map((card, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                {card.imageUrl && (
                  <div style={{ height: 140, borderRadius: 8, overflow: 'hidden', background: '#f1f5f9' }}>
                    <img src={card.imageUrl} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div>
                  <label className="field-title" style={{ fontSize: 12 }}>Card Title</label>
                  <input
                    className="form-input-control"
                    placeholder="e.g. Executive Guest Room"
                    value={card.title}
                    onChange={(e) => handleHotelCardChange(idx, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-title" style={{ fontSize: 12 }}>Image URL</label>
                  <input
                    className="form-input-control"
                    placeholder="https://..."
                    value={card.imageUrl}
                    onChange={(e) => handleHotelCardChange(idx, 'imageUrl', e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-title" style={{ fontSize: 12 }}>Description</label>
                  <textarea
                    className="form-input-control textarea-control"
                    placeholder="Describe amenities and accommodation..."
                    value={card.description}
                    onChange={(e) => handleHotelCardChange(idx, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                  <button
                    type="button"
                    className="portal-danger-action"
                    style={{ padding: '8px 14px' }}
                    onClick={() => setHotelsData({ ...hotelsData, cards: hotelsData.cards.filter((_, index) => index !== idx) })}
                  >
                    <i className="fa-solid fa-trash-can"></i> Delete Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button type="button" className="portal-primary-action save-large-btn" onClick={() => saveBlock('hotels', hotelsData)}>
          <i className="fa-solid fa-circle-check"></i> Save Hotel Section
        </button>
      </div>
    </section>
  );
}
