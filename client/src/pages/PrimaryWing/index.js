import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaFlask, FaClipboard, FaDesktop, FaTheaterMasks, FaRunning } from 'react-icons/fa';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import primaryImg from "../../components/AllImage/campus/fo.webp";
import "../MissionVision/index.css";

const PrimaryWing = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Foundational Stage (Classes I to V)</span>
            <h1>Primary Wing Academic Program</h1>
            <p>
              Building strong conceptual foundations in Mathematics, Science, Languages, Social Studies, and Environmental Ethics.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Responsive Featured Image Banner */}
            <div className="subpage-featured-img-wrap">
              <img src={primaryImg} alt="Primary Wing Students" loading="lazy" />
            </div>

            {/* Responsive 3-Column Grid (1 col on mobile, 2 col on tablet, 3 col on desktop) */}
            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon"><FaBook /></div>
                <h2>Core CBSE Curriculum</h2>
                <p>English, Hindi, Sanskrit (from Class 5), Mathematics, Environmental Studies (EVS), General Knowledge, and Value Education.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaDesktop /></div>
                <h2>Early Computer Literacy</h2>
                <p>Hands-on computer lab sessions learning MS Paint, typing, introductory Scratch coding, and digital hygiene.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaFlask /></div>
                <h2>Experiential STEM Projects</h2>
                <p>Simple science experiment kits, model making, nature observation walks, and interactive classroom math labs.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaTheaterMasks /></div>
                <h2>Public Speaking & Dramatics</h2>
                <p>Regular morning assembly anchoring, recitation, storytelling, skit dramas, and moral thought presentations.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaRunning /></div>
                <h2>Physical Education & Yoga</h2>
                <p>Structured sports periods covering football, sprint races, yoga postures, and traditional Indian outdoor games.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaClipboard /></div>
                <h2>Continuous Assessment (CCE)</h2>
                <p>Child-friendly periodic evaluations without exam stress, emphasizing conceptual understanding and regular feedback.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Admissions Open for Primary Classes (I to V)</h3>
              <p>Limited seats available. Comprehensive syllabus aligned with the National Education Policy (NEP 2020).</p>
              <Link to="/admissions" className="subpage-cta-btn">Enroll for Primary Wing &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PrimaryWing;
