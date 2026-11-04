import { FaStar, FaTrophy } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import artImg from "../../components/AllImage/5.webp";
import "../MissionVision/index.css";

const ArtRoom = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Creativity & Aesthetics</span>
            <h1>Art, Craft & Creative Expression Studio</h1>
            <p>
              An inspiring creative space for painting, sculpture, pottery, handicrafts, and cultural exhibitions.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Art Studio Image */}
            <div className="subpage-featured-img-wrap">
              <img src={artImg} alt="Art & Creative Studio" loading="lazy" />
            </div>

            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon"><FaStar /></div>
                <h2>Fine Arts & Painting</h2>
                <p>Easels, watercolours, acrylics, oil pastels, charcoal sketching, canvas painting, and classical Madhubani/Sohrai folk art techniques.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🏺</div>
                <h2>Pottery & Clay Modeling</h2>
                <p>Manual pottery wheels and non-toxic sculpting clay where students craft clay pottery, miniature sculptures, and geometric artifacts.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">✂️</div>
                <h2>Origami & Paper Craft</h2>
                <p>Intricate 3D origami, paper quilling, collage making, waste-to-craft projects, and festival decoration crafting.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🖼️</div>
                <h2>Annual Art Exhibitions</h2>
                <p>Student art showcases held during PTMs and the Annual School Gala where young artists display their masterpieces to parents and guests.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🧵</div>
                <h2>Textile & Fabric Painting</h2>
                <p>Tie-dye techniques, fabric block printing, embroidery basics, and traditional textile craft workshops.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaTrophy /></div>
                <h2>State Art Competitions</h2>
                <p>Mentorship for students participating in district, state, and national drawing competitions and Rangoli contests.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Unleash Your Child's Imagination</h3>
              <p>Weekly art & craft periods inspire self-expression and artistic confidence.</p>
              <Link to="/gallery" className="subpage-cta-btn">View Art in Gallery &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ArtRoom;
