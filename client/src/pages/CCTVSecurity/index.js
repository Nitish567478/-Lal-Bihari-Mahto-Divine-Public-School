import { FaCheck } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import securityImg from "../../components/AllImage/campus/fo.webp";
import "../MissionVision/index.css";

const CCTVSecurity = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Safe & Secure Campus</span>
            <h1>CCTV & Comprehensive Campus Security</h1>
            <p>
              Ensuring the utmost safety, surveillance, and peace of mind for students and parents at LBMDPS.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Security Image */}
            <div className="subpage-featured-img-wrap">
              <img src={securityImg} alt="Gated Campus Security" />
            </div>

            <div className="pillars-grid subpage-cards-grid-3" style={{ marginBottom: "32px" }}>
              <div className="mv-card">
                <div className="mv-icon">📹</div>
                <h2>150+ HD CCTV Cameras</h2>
                <p>Continuous video surveillance across classrooms, corridors, science labs, playgrounds, gates, and school buses with 60-day backup.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">👮</div>
                <h2>Trained Security Personnel</h2>
                <p>24x7 uniformed security guards at all campus entry and exit gates ensuring no unauthorized personnel enter the premises.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🎟️</div>
                <h2>Visitor Pass Verification</h2>
                <p>Strict visitor identity check and digital entry log. Parents and visitors are issued temporary badges after mobile OTP verification.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🧯</div>
                <h2>Fire Safety & Drills</h2>
                <p>Smoke detectors, modern ABC chemical fire extinguishers on every floor, and regular disaster evacuation mock drills for students.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🧱</div>
                <h2>Gated Boundary Walls</h2>
                <p>12-Acre campus fully secured with 10-foot boundary walls, barbed wire fencing, and single-point vehicle checkpoint.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">👩‍⚕️</div>
                <h2>Medical First Response</h2>
                <p>Well-equipped infirmary with licensed nurse, oxygen cylinder, essential emergency medicines, and emergency ambulance on call.</p>
              </div>
            </div>

            <div className="core-pillars-section">
              <h2 className="section-title">Our Zero Compromise Safety Principles</h2>
              <div className="mv-points subpage-cards-grid-2" style={{ gap: "12px" }}>
                <li><FaCheck /> Strict Anti-Bullying and Child Protection Committee (POCSO Compliant).</li>
                <li><FaCheck /> Dedicated female attendants for junior washrooms and primary wings.</li>
                <li><FaCheck /> Pure RO filtered drinking water tested monthly for purity.</li>
                <li><FaCheck /> Earthquake-resistant RCC building architecture certified by structural engineers.</li>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Have Questions Regarding Safety?</h3>
              <p>Schedule a campus walkthrough or speak with our Chief Security Officer.</p>
              <Link to="/contact" className="subpage-cta-btn">Book Campus Visit &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CCTVSecurity;
