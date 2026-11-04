import { FaStar, FaCheck } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "./index.css";

const MissionVision = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        {/* Hero Section */}
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Our Core Philosophy</span>
            <h1>Mission, Vision & Core Values</h1>
            <p>
              Nurturing intellectual curiosity, moral integrity, and leadership skills at Lal Bihari Mahto Divine Public School (Estd. 2013).
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="subpage-content-section">
          <div className="subpage-container">
            <div className="mission-vision-grid">
              {/* Mission Card */}
              <div className="mv-card mission">
                <div className="mv-icon"><FaStar /></div>
                <h2>Our Mission</h2>
                <p>
                  To deliver inclusive, high-caliber, and holistic CBSE education that empowers students with critical thinking, ethical grounding, scientific temper, and creativity. We aim to shape responsible, empathetic global citizens who achieve excellence and serve humanity with humility.
                </p>
                <ul className="mv-points">
                  <li><FaCheck /> Value-based education rooted in Indian culture (*Vidya Dadati Vinayam*).</li>
                  <li><FaCheck /> Modern STEM, AI robotics, and experiential learning pedagogy.</li>
                  <li><FaCheck /> 100% personalized mentorship and inclusive academic growth.</li>
                </ul>
              </div>

              {/* Vision Card */}
              <div className="mv-card vision">
                <div className="mv-icon">👁️</div>
                <h2>Our Vision</h2>
                <p>
                  To stand as a premier center of scholastic distinction and moral leadership in Jharkhand, transforming rural and semi-urban talent into national achievers, innovators, and visionary leaders of tomorrow.
                </p>
                <ul className="mv-points">
                  <li><FaCheck /> Fostering research mindset and technological competence.</li>
                  <li><FaCheck /> Promoting green eco-campus sustainability and physical fitness.</li>
                  <li><FaCheck /> Creating equal opportunity pathways for every aspiring student.</li>
                </ul>
              </div>
            </div>

            {/* Core Values 4-Pillars */}
            <div className="core-pillars-section">
              <h2 className="section-title">The Four Core Pillars of LBMDPS</h2>
              <div className="pillars-grid">
                <div className="pillar-item">
                  <span className="pillar-num">01</span>
                  <h3>Academic Brilliance</h3>
                  <p>Rigorous CBSE curriculum, comprehensive board test series, and dedicated concept mastery.</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">02</span>
                  <h3>Discipline & Character</h3>
                  <p>Instilling respect, punctuality, honesty, and emotional resilience in everyday school life.</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">03</span>
                  <h3>Sports & Vitality</h3>
                  <p>Active physical education, martial arts, yoga, athletics, and inter-school championship spirit.</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">04</span>
                  <h3>Technological Innovation</h3>
                  <p>Modern computer coding labs, interactive digital smartboards, and practical scientific experiments.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="subpage-cta-box">
              <h3>Experience Excellence in Learning</h3>
              <p>Admissions open for Pre-Nursery to Class X (Class 1 to 10) for Academic Session 2026-2027.</p>
              <Link to="/admissions" className="subpage-cta-btn">Explore Admissions &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MissionVision;
