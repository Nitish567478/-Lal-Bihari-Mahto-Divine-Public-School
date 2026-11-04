import React, { useState } from "react";
import "./index.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DragDropUploader from "../../components/DragDropUploader";

const initialGalleryData = [
  {
    id: "campus",
    title: "School Campus",
    category: "campus",
    cover: require("../../components/AllImage/campus/unnamed.webp"),
    images: [
      require("../../components/AllImage/campus/unnamed.webp"),
      require("../../components/AllImage/campus/f.webp"),
      require("../../components/AllImage/campus/s.webp"),
      require("../../components/AllImage/campus/fi.webp"),
      require("../../components/AllImage/campus/fo.webp"),
      require("../../components/AllImage/campus/t.webp"),
      require("../../components/AllImage/campus/six.webp"),
    ],
  },
  {
    id: "bus",
    title: "Campus Bus & Transport",
    category: "facilities",
    cover: require("../../components/AllImage/school bus/unnamed.webp"),
    images: [
      require("../../components/AllImage/school bus/unnamed.webp"),
      require("../../components/AllImage/school bus/unnamed (1).webp"),
      require("../../components/AllImage/school bus/unnamed (2).webp"),
    ],
  },
  {
    id: "15aug",
    title: "15th August Independence Day",
    category: "events",
    cover: require("../../components/AllImage/Festival/15th August/unnamed.webp"),
    images: [
      require("../../components/AllImage/Festival/15th August/unnamed.webp"),
      require("../../components/AllImage/Festival/15th August/unnamed (1).webp"),
      require("../../components/AllImage/Festival/15th August/unnamed (2).webp"),
      require("../../components/AllImage/Festival/15th August/unnamed (3).webp"),
      require("../../components/AllImage/Festival/15th August/unnamed (4).webp"),
    ],
  },
  {
    id: "26jan",
    title: "26th January Republic Day",
    category: "events",
    cover: require("../../components/AllImage/Festival/26th Jan/unnamed.webp"),
    images: [
      require("../../components/AllImage/Festival/26th Jan/unnamed.webp"),
      require("../../components/AllImage/Festival/26th Jan/unnamed (1).webp"),
      require("../../components/AllImage/Festival/26th Jan/unnamed (2).webp"),
      require("../../components/AllImage/Festival/26th Jan/unnamed (3).webp"),
    ],
  },
];

const Gallery = () => {
  const [galleries, setGalleries] = useState(initialGalleryData);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [viewMode, setViewMode] = useState("slideshow"); // "slideshow" or "grid"
  const [activeFilter, setActiveFilter] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumCategory, setAlbumCategory] = useState("events");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const openGallery = (gallery) => {
    setSelectedGallery(gallery);
    setActivePhotoIdx(0);
    setViewMode("slideshow");
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    document.body.style.overflow = "auto";
  };

  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!selectedGallery) return;
    setActivePhotoIdx((prev) => (prev + 1) % selectedGallery.images.length);
  };

  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!selectedGallery) return;
    setActivePhotoIdx((prev) => (prev === 0 ? selectedGallery.images.length - 1 : prev - 1));
  };

  const handleFilesChosen = (files) => {
    const fileArray = Array.isArray(files) ? files : [files];
    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
    setUploadedPhotos(previewUrls);
  };

  const handleCreateAlbum = (e) => {
    e.preventDefault();
    if (!albumTitle || uploadedPhotos.length === 0) {
      alert("Please enter an album title and upload at least one photo.");
      return;
    }

    const newAlbum = {
      id: `album-${Date.now()}`,
      title: albumTitle,
      category: albumCategory,
      cover: uploadedPhotos[0],
      images: uploadedPhotos,
    };

    setGalleries([newAlbum, ...galleries]);
    setShowUploadModal(false);
    setAlbumTitle("");
    setUploadedPhotos([]);
    alert(`Album "${albumTitle}" created and published successfully!`);
  };

  const filteredGalleries =
    activeFilter === "all"
      ? galleries
      : galleries.filter((g) => g.category === activeFilter);

  return (
    <>
      <Header />
      <div className="gallery-main-wrapper">
        {/* Hero Section */}
        <section className="gallery-hero-banner">
          <div className="gallery-hero-inner">
            <h1>LBMDPS Campus & Life</h1>
            <p>
              Explore our vibrant 12-acre campus, modern academic laboratories, sports championships, national day celebrations, and annual school festivals.
            </p>
            <button
              className="upload-new-album-btn"
              onClick={() => setShowUploadModal(true)}
            >
              + Upload New Photo Album
            </button>
          </div>
        </section>

        {/* Category Filters */}
        <div className="gallery-filter-bar">
          <button
            className={`gallery-filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Photo Albums ({galleries.length})
          </button>
          <button
            className={`gallery-filter-btn ${activeFilter === "events" ? "active" : ""}`}
            onClick={() => setActiveFilter("events")}
          >
            Festivals & Special Days
          </button>
          <button
            className={`gallery-filter-btn ${activeFilter === "campus" ? "active" : ""}`}
            onClick={() => setActiveFilter("campus")}
          >
            Campus & Smart Labs
          </button>
          <button
            className={`gallery-filter-btn ${activeFilter === "facilities" ? "active" : ""}`}
            onClick={() => setActiveFilter("facilities")}
          >
            Transport & Sports
          </button>
        </div>

        {/* Album Cards Grid */}
        <div className="main-image-container">
          {filteredGalleries.map((gallery) => (
            <div
              className="image-box"
              key={gallery.id}
              onClick={() => openGallery(gallery)}
            >
              <div className="image-wrapper">
                <img
                  src={gallery.cover}
                  alt={gallery.title}
                  className="open-gallery"
                  loading="lazy"
                />
                <div className="album-count-badge">
                  📷 {gallery.images ? gallery.images.length : 1} Photos
                </div>
              </div>
              <div className="image-box-info">
                <p className="caption">{gallery.title}</p>
                <span className="view-album-text">Click to open album &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* WIDE FULL-FEATURED LIGHTBOX VIEWER (Fixes Image 1 modal) */}
        {selectedGallery && (
          <div className="gallery-lightbox-overlay" onClick={closeGallery}>
            <div className="gallery-lightbox-card" onClick={(e) => e.stopPropagation()}>
              {/* Modal Top Bar */}
              <div className="lightbox-top-bar">
                <div>
                  <h2 className="lightbox-title">{selectedGallery.title}</h2>
                  <span className="lightbox-counter">
                    Photo {activePhotoIdx + 1} of {selectedGallery.images.length}
                  </span>
                </div>
                <div className="lightbox-actions-right">
                  <button
                    className={`view-mode-toggle ${viewMode === "grid" ? "active" : ""}`}
                    onClick={() => setViewMode(viewMode === "grid" ? "slideshow" : "grid")}
                  >
                    {viewMode === "grid" ? "🖼️ Slideshow View" : "🔲 All Photos Grid"}
                  </button>
                  <button className="lightbox-close-btn" onClick={closeGallery} title="Close Album">
                    ✕
                  </button>
                </div>
              </div>

              {/* View Mode 1: Slideshow / Large Feature Image */}
              {viewMode === "slideshow" && (
                <div className="lightbox-slideshow-container">
                  <div className="feature-photo-stage">
                    <button className="slide-arrow left-arrow" onClick={prevPhoto} title="Previous Photo">
                      ◀
                    </button>
                    <img
                      src={selectedGallery.images[activePhotoIdx]}
                      alt={`${selectedGallery.title} ${activePhotoIdx + 1}`}
                      className="feature-photo-img"
                    />
                    <button className="slide-arrow right-arrow" onClick={nextPhoto} title="Next Photo">
                      ▶
                    </button>
                  </div>

                  {/* Horizontal Thumbnail Strip */}
                  <div className="lightbox-thumbnails-strip">
                    {selectedGallery.images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`thumb-btn ${activePhotoIdx === idx ? "active" : ""}`}
                        onClick={() => setActivePhotoIdx(idx)}
                      >
                        <img src={img} alt={`Thumb ${idx + 1}`} className="thumb-img" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* View Mode 2: Multi-Column Photo Grid */}
              {viewMode === "grid" && (
                <div className="lightbox-grid-container">
                  {selectedGallery.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`grid-photo-card ${activePhotoIdx === idx ? "selected" : ""}`}
                      onClick={() => {
                        setActivePhotoIdx(idx);
                        setViewMode("slideshow");
                      }}
                    >
                      <img src={img} alt={`${selectedGallery.title} ${idx + 1}`} className="grid-photo-img" />
                      <span className="grid-photo-num">#{idx + 1}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Drag & Drop Upload Album Modal */}
        {showUploadModal && (
          <div className="gallery-lightbox-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="album-upload-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-top-bar">
                <h2>Upload Photos with Drag & Drop</h2>
                <button className="lightbox-close-btn" onClick={() => setShowUploadModal(false)}>✕</button>
              </div>
              <form onSubmit={handleCreateAlbum} className="album-upload-form">
                <label>
                  Album Title *
                  <input
                    type="text"
                    required
                    placeholder="e.g. Science Fair 2026 or Sports Day"
                    value={albumTitle}
                    onChange={(e) => setAlbumTitle(e.target.value)}
                  />
                </label>
                <label>
                  Album Category *
                  <select value={albumCategory} onChange={(e) => setAlbumCategory(e.target.value)}>
                    <option value="events">Festivals & Events</option>
                    <option value="campus">Campus & Labs</option>
                    <option value="facilities">Transport & Facilities</option>
                  </select>
                </label>

                <div className="drag-uploader-section">
                  <label>Drag & Drop Album Photos *</label>
                  <DragDropUploader
                    accept="image/*"
                    multiple={true}
                    maxSizeMB={15}
                    label="Drag & Drop multiple photos here, or click to browse"
                    hint="Supports JPG, PNG, WEBP (Max 15MB each)"
                    onFileSelect={handleFilesChosen}
                  />
                </div>

                {uploadedPhotos.length > 0 && (
                  <div className="uploaded-preview-row">
                    <p className="preview-label">Selected {uploadedPhotos.length} photo(s):</p>
                    <div className="preview-thumbnails">
                      {uploadedPhotos.map((src, i) => (
                        <img key={i} src={src} alt="Preview" className="preview-mini-thumb" />
                      ))}
                    </div>
                  </div>
                )}

                <div className="album-form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
                  <button type="submit" className="btn-save">Save & Publish Album</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
