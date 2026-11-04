import { FaBolt, FaGlobe, FaLightbulb } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import smartClassImg from "../../components/AllImage/campus/fi.webp";
import "../MissionVision/index.css";

const SmartClassrooms = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Digital Learning</span>
            <h1>Interactive Smart Classrooms</h1>
            <p>
              Next-generation multimedia learning environments equipped with interactive digital smartboards and 3D visual curriculum.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Image */}
            <div className="subpage-featured-img-wrap">
              <img src={smartClassImg} alt="Smart Digital Classroom" loading="lazy" />
            </div>

            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon">📺</div>
                <h2>Interactive Touch Displays</h2>
                <p>75-inch 4K multi-touch interactive flat panels enabling digital whiteboard teaching, diagram rendering, and real-time concept demonstration.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaGlobe /></div>
                <h2>Audio-Visual 3D Content</h2>
                <p>CBSE-aligned animated modules in Science, Mathematics, Geography, and History that simplify complex theoretical concepts.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaLightbulb /></div>
                <h2>Student Engagement</h2>
                <p>Interactive quizzes, group problem-solving exercises, and collaborative digital learning that keeps every student actively involved.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🪑</div>
                <h2>Ergonomic Seating</h2>
                <p>Custom-designed posture-support desks and chairs arranged in optimal viewing angles with natural daylight and ventilation.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaBolt /></div>
                <h2>Uninterrupted Power</h2>
                <p>Dedicated high-capacity solar inverter backup ensuring zero interruption during digital lectures and smartboard sessions.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">📡</div>
                <h2>High-Speed Broadband</h2>
                <p>Optical fiber connectivity enabling teachers to access global academic resources, research papers, and live educational simulations.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Experience Smart Learning at LBMDPS</h3>
              <p>Book a personal campus tour and see our smart classrooms in action.</p>
              <Link to="/contact" className="subpage-cta-btn">Book Campus Tour &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default SmartClassrooms;
