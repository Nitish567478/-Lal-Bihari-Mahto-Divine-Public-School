import React from 'react';

export default function UploadPanel({
  imageTarget,
  setImageTarget,
  uploadFile,
  setUploadFile,
  handleUpload,
  isUploading,
  uploadResult,
}) {
  return (
    <section className="portal-section upload-editor-panel">
      <div className="portal-section-heading">
        <div>
          <h2><i className="fa-solid fa-cloud-arrow-up"></i> Upload Media Asset</h2>
          <p className="portal-muted">Upload high-resolution images to the school server storage.</p>
        </div>
      </div>

      <div className="portal-panel-block structured-form-card" style={{ maxWidth: 600 }}>
        <div className="form-field-group" style={{ marginBottom: 14 }}>
          <label className="field-title">Target Website Section</label>
          <select className="form-input-control" value={imageTarget} onChange={(e) => setImageTarget(e.target.value)}>
            <option value="">Select Section Target</option>
            <option value="Home banner">Home Hero Banner</option>
            <option value="Hotel card">Guest House / Hotel Section</option>
            <option value="Gallery">Photo Gallery</option>
            <option value="Contact banner">Contact Page Banner</option>
          </select>
        </div>

        <div className="form-field-group" style={{ marginBottom: 16 }}>
          <label className="field-title">Select Image File</label>
          <input type="file" className="form-file-input" accept="image/*" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
        </div>

        {uploadFile && (
          <div className="image-preview-badge" style={{ marginBottom: 16 }}>
            <img src={URL.createObjectURL(uploadFile)} alt="preview" />
            <div>
              <strong>{uploadFile.name}</strong>
              <div style={{ fontSize: 11, color: '#64748b' }}>{(uploadFile.size / 1024).toFixed(1)} KB</div>
            </div>
          </div>
        )}

        <button type="button" className="portal-primary-action save-large-btn" onClick={handleUpload} disabled={isUploading}>
          <i className="fa-solid fa-upload"></i> {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>

        {uploadResult && <div className="portal-status" style={{ marginTop: 14 }}>{uploadResult}</div>}
      </div>
    </section>
  );
}
