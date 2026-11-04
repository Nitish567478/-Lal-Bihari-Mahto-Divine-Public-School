import { FaFlask } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import seniorImg from "../../components/AllImage/campus/six.webp";
import "../MissionVision/index.css";

const SeniorSecondaryWing = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Classes IX & X</span>
            <h1>Secondary Wing (Classes 9 & 10)</h1>
            <p>
              Rigorous CBSE Class X Board preparation, state-of-the-art science practical labs, mathematics problem solving, and career guidance.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Responsive Featured Image Banner */}
            <div className="subpage-featured-img-wrap">
              <img src={seniorImg} alt="Secondary School Wing" loading="lazy" />
            </div>

            {/* Academic Structure Grid */}
            <div className="mission-vision-grid">
              {/* Class IX Foundation */}
              <div className="mv-card mission">
                <div className="mv-icon"><FaFlask /></div>
                <h2>Class IX: Conceptual Rigor & Skill Building</h2>
                <p>Establishing rock-solid conceptual clarity across core CBSE disciplines to transition seamlessly toward board examination readiness.</p>
                <ul className="mv-points">
                  <li><strong>Core Disciplines:</strong> Mathematics, Science (Physics, Chemistry, Biology), Social Science, English, Hindi, and Information Technology.</li>
                  <li><strong>Experiential Science Labs:</strong> Hands-on experiments with individual apparatus following CBSE guidelines.</li>
                  <li><strong>Analytical Reasoning:</strong> Weekly Olympiad question solving, debates, and critical thinking assignments.</li>
                </ul>
              </div>

              {/* Class X Board Preparation */}
              <div className="mv-card vision">
                <div className="mv-icon">📈</div>
                <h2>Class X: CBSE Board Examination Excellence</h2>
                <p>Comprehensive curriculum completion with focused revision cycles, continuous assessment, and intensive mock test series.</p>
                <ul className="mv-points">
                  <li><strong>Syllabus Mastery:</strong> 100% NCERT coverage with concept mind-maps and previous 10-year question analysis.</li>
                  <li><strong>Mock Examination Drills:</strong> Three full-length Pre-Board test series under actual CBSE examination room protocols.</li>
                  <li><strong>Personal Mentorship:</strong> 1-on-1 performance review, doubt clinics, and personalized study planners for high distinction.</li>
                </ul>
              </div>
            </div>

            {/* Board Success Pillars */}
            <div className="core-pillars-section">
              <h2 className="section-title">Our CBSE Class X Board Excellence Model</h2>
              <div className="pillars-grid">
                <div className="pillar-item">
                  <span className="pillar-num">01</span>
                  <h3>Complete NCERT Mastery</h3>
                  <p>In-depth conceptual lectures ensuring 100% syllabus coverage 3 months before board exams.</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">02</span>
                  <h3>3-Stage Pre-Board Series</h3>
                  <p>Simulated 3-hour CBSE board test environments with strict official marking schemes.</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">03</span>
                  <h3>Previous 10-Year Papers</h3>
                  <p>Intensive solving of past 10 years board question papers and CBSE sample papers.</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">04</span>
                  <h3>Personalized Remedial Coaching</h3>
                  <p>1-on-1 evening doubt classes for students needing additional attention in specific subjects.</p>
                </div>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Secure Admission in Secondary Wing (Classes 9 & 10)</h3>
              <p>Scholarships available for meritorious students based on entrance evaluation.</p>
              <Link to="/admissions" className="subpage-cta-btn">Apply for Secondary Wing Admission &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default SeniorSecondaryWing;
