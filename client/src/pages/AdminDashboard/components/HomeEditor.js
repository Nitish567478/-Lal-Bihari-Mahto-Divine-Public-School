import React from 'react';

export default function HomeEditor({ homeData, setHomeData, saveBlock }) {
  return (
    <section className="portal-section home-editor-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-house-chimney"></i> Homepage Content Editor</h2>
          <p className="portal-muted">Customize banner hero headlines, key metrics, and school highlights.</p>
        </div>
        <div className="header-actions no-print">
          <button type="button" className="portal-primary-action" onClick={() => saveBlock('home-hero', homeData)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Home Content
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Banner Hero Card */}
        <div className="portal-panel-block structured-form-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', marginBottom: 14 }}>
            Hero Banner Headline & Intro
          </h3>
          <div className="professional-form-grid">
            <div className="form-field-group field-span-2">
              <label className="field-title">Section Title / Headline</label>
              <input
                className="form-input-control"
                value={homeData.title}
                onChange={(e) => setHomeData({ ...homeData, title: e.target.value })}
              />
            </div>
            <div className="form-field-group field-span-2">
              <label className="field-title">Hero Subtitle & Description</label>
              <textarea
                className="form-input-control textarea-control"
                value={homeData.description}
                onChange={(e) => setHomeData({ ...homeData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Stat Blocks Card */}
        <div className="portal-panel-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', margin: 0 }}>
              <i className="fa-solid fa-arrow-trend-up"></i> Key Metric Statistics
            </h3>
            <button
              type="button"
              className="save-btn-alt"
              onClick={() => setHomeData({ ...homeData, stats: [...homeData.stats, { number: '100+', name: 'New Stat' }] })}
            >
              <i className="fa-solid fa-plus"></i> Add Stat Block
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {homeData.stats.map((item, idx) => (
              <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <label className="field-title" style={{ fontSize: 11 }}>Stat Value</label>
                  <input
                    className="form-input-control"
                    value={item.number}
                    onChange={(e) => {
                      const stats = [...homeData.stats];
                      stats[idx] = { ...stats[idx], number: e.target.value };
                      setHomeData({ ...homeData, stats });
                    }}
                    placeholder="e.g. 2450+"
                  />
                </div>
                <div style={{ flex: 1.5 }}>
                  <label className="field-title" style={{ fontSize: 11 }}>Label</label>
                  <input
                    className="form-input-control"
                    value={item.name}
                    onChange={(e) => {
                      const stats = [...homeData.stats];
                      stats[idx] = { ...stats[idx], name: e.target.value };
                      setHomeData({ ...homeData, stats });
                    }}
                    placeholder="e.g. Students"
                  />
                </div>
                <button
                  type="button"
                  className="portal-danger-action"
                  style={{ padding: '8px 10px', marginTop: 14 }}
                  onClick={() => setHomeData({ ...homeData, stats: homeData.stats.filter((_, i) => i !== idx) })}
                  title="Delete Stat"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features Card */}
        <div className="portal-panel-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', margin: 0 }}>
              <i className="fa-solid fa-star"></i> Featured Highlights
            </h3>
            <button
              type="button"
              className="save-btn-alt"
              onClick={() => setHomeData({ ...homeData, features: [...homeData.features, 'New Feature Highlight'] })}
            >
              <i className="fa-solid fa-plus"></i> Add Feature
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {homeData.features.map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  className="form-input-control"
                  value={feature}
                  onChange={(e) => {
                    const features = [...homeData.features];
                    features[idx] = e.target.value;
                    setHomeData({ ...homeData, features });
                  }}
                  placeholder="Enter feature highlight..."
                />
                <button
                  type="button"
                  className="portal-danger-action"
                  style={{ padding: '8px 14px' }}
                  onClick={() => setHomeData({ ...homeData, features: homeData.features.filter((_, i) => i !== idx) })}
                  title="Delete Feature"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button type="button" className="portal-primary-action save-large-btn" onClick={() => saveBlock('home-hero', homeData)}>
          <i className="fa-solid fa-circle-check"></i> Save Home Content
        </button>
      </div>
    </section>
  );
}
