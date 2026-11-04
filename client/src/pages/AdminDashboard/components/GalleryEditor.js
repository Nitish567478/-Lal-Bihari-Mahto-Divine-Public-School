import React from 'react';

export default function GalleryEditor({
  galleryData,
  setGalleryData,
  saveBlock,
}) {
  return (
    <section className="portal-section gallery-editor-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-images"></i> Photo Gallery Editor</h2>
          <p className="portal-muted">Manage campus photo gallery images, event photos, and banner links.</p>
        </div>
        <div className="header-actions no-print">
          <button type="button" className="portal-primary-action" onClick={() => saveBlock('gallery', galleryData)}>
            <i className="fa-solid fa-floppy-disk"></i> Save Gallery Content
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Gallery Header Info */}
        <div className="portal-panel-block structured-form-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', marginBottom: 14 }}>
            Gallery Title & Intro
          </h3>
          <div className="professional-form-grid">
            <div className="form-field-group field-span-2">
              <label className="field-title">Section Title</label>
              <input
                className="form-input-control"
                value={galleryData.title}
                onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
              />
            </div>
            <div className="form-field-group field-span-2">
              <label className="field-title">Description</label>
              <textarea
                className="form-input-control textarea-control"
                value={galleryData.description}
                onChange={(e) => setGalleryData({ ...galleryData, description: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className="portal-panel-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0b1c3d', margin: 0 }}>
              <i className="fa-solid fa-photo-film"></i> Gallery Photos ({galleryData.images.length})
            </h3>
            <button
              type="button"
              className="save-btn-alt"
              onClick={() => setGalleryData({ ...galleryData, images: [...galleryData.images, ''] })}
            >
              <i className="fa-solid fa-plus"></i> Add Gallery Image
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {galleryData.images.map((url, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {url && (
                  <div style={{ height: 120, borderRadius: 6, overflow: 'hidden', background: '#f1f5f9' }}>
                    <img src={url} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div>
                  <label className="field-title" style={{ fontSize: 11 }}>Image URL #{idx + 1}</label>
                  <input
                    className="form-input-control"
                    value={url}
                    onChange={(e) => {
                      const images = [...galleryData.images];
                      images[idx] = e.target.value;
                      setGalleryData({ ...galleryData, images });
                    }}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                  <button
                    type="button"
                    className="portal-danger-action"
                    style={{ padding: '6px 12px', fontSize: 12 }}
                    onClick={() => setGalleryData({ ...galleryData, images: galleryData.images.filter((_, index) => index !== idx) })}
                  >
                    <i className="fa-solid fa-trash-can"></i> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button type="button" className="portal-primary-action save-large-btn" onClick={() => saveBlock('gallery', galleryData)}>
          <i className="fa-solid fa-circle-check"></i> Save Gallery Content
        </button>
      </div>
    </section>
  );
}
