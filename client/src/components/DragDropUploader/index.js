import React, { useState, useRef } from 'react';
import './index.css';

const DragDropUploader = ({
  onFileSelect,
  accept = 'image/*',
  multiple = false,
  maxSizeMB = 10,
  label = 'Drag & Drop files here, or click to browse',
  hint = 'Supports JPG, PNG, WEBP, PDF (Max 10MB)'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateAndProcessFiles = (files) => {
    setErrorMessage('');
    const validFiles = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxSizeBytes) {
        setErrorMessage(`File "${file.name}" exceeds the ${maxSizeMB}MB size limit.`);
        continue;
      }
      validFiles.push(file);
      if (!multiple) break;
    }

    if (validFiles.length > 0) {
      setFileList(validFiles);
      if (onFileSelect) {
        onFileSelect(multiple ? validFiles : validFiles[0]);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFiles(e.target.files);
    }
  };

  const handleRemoveFile = (index) => {
    const updated = fileList.filter((_, i) => i !== index);
    setFileList(updated);
    if (onFileSelect) {
      onFileSelect(multiple ? updated : (updated[0] || null));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="drag-drop-container">
      <div
        className={`drag-drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="drag-drop-input"
        />
        <div className="drag-drop-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
          </svg>
        </div>
        <p className="drag-drop-label">{label}</p>
        <span className="drag-drop-hint">{hint}</span>
      </div>

      {errorMessage && <div className="drag-drop-error">{errorMessage}</div>}

      {fileList.length > 0 && (
        <div className="drag-drop-file-list">
          {fileList.map((file, idx) => (
            <div key={idx} className="drag-drop-file-item">
              <div className="file-info">
                <span className="file-icon">📄</span>
                <span className="file-name">{file.name}</span>
                <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button
                type="button"
                className="file-remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(idx);
                }}
                title="Remove file"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragDropUploader;
