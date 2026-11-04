import React, { useState } from "react";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";
const Gallery = () => {
  const galleryData = [
    {
      id: "campus",
      title: "School Campus",
      cover: require("../AllImage/campus/unnamed.webp"),
      images: [
        require("../AllImage/campus/f.webp"),
        require("../AllImage/campus/s.webp"),
        require("../AllImage/campus/fi.webp"),
        require("../AllImage/campus/fo.webp"),
        require("../AllImage/campus/t.webp"),
        require("../AllImage/campus/six.webp"),
      ],
    },
    {
      id: "bus",
      title: "Campus Bus",
      cover: require("../AllImage/school bus/unnamed.webp"),
      images: [
        require("../AllImage/school bus/unnamed.webp"),
        require("../AllImage/school bus/unnamed (1).webp"),
        require("../AllImage/school bus/unnamed (2).webp"),
      ],
    },
    {
      id: "15aug",
      title: "15th August",
      cover: require("../AllImage/Festival/15th August/unnamed.webp"),
      images: [
        require("../AllImage/Festival/15th August/unnamed.webp"),
        require("../AllImage/Festival/15th August/unnamed (1).webp"),
        require("../AllImage/Festival/15th August/unnamed (2).webp"),
        require("../AllImage/Festival/15th August/unnamed (3).webp"),
        require("../AllImage/Festival/15th August/unnamed (4).webp"),
      ],
    },
    {
      id: "26jan",
      title: "26th January",
      cover: require("../AllImage/Festival/26th Jan/unnamed.webp"),
      images: [
        require("../AllImage/Festival/26th Jan/unnamed.webp"),
        require("../AllImage/Festival/26th Jan/unnamed (1).webp"),
        require("../AllImage/Festival/26th Jan/unnamed (2).webp"),
        require("../AllImage/Festival/26th Jan/unnamed (3).webp"),
      ],
    },
  ];

  const [selectedGallery, setSelectedGallery] = useState(null);

  const openGallery = (gallery) => {
    setSelectedGallery(gallery);
    document.body.style.overflow = "hidden"; // prevent scroll behind modal
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
    <Header />
    <div className="gallery-page">
      <h1 className="gallery-title">Gallery</h1>

      <div className="main-image-container">
        {galleryData.map((gallery) => (
          <div
            className="image-box"
            key={gallery.id}
            onClick={() => openGallery(gallery)}
          >
            <img
              src={gallery.cover}
              alt={gallery.title}
              className="open-gallery"
              loading="lazy"
            />
            <p className="caption">{gallery.title}</p>
          </div>
        ))}
      </div>

      {selectedGallery && (
        <div className="modal-overlay" onClick={closeGallery}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={closeGallery}>
              &times;
            </button>
            <h2 className="modal-title">{selectedGallery.title}</h2>
            <div className="modal-images-grid">
              {selectedGallery.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${selectedGallery.title} ${index + 1}`}
                  className="modal-image"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default Gallery;
