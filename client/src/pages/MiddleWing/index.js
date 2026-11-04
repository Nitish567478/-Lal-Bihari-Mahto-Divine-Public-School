import React from "react";
import { Link } from "react-router-dom";
import { FaFlask, FaTrophy, FaDraftingCompass, FaCode, FaLanguage, FaLandmark } from 'react-icons/fa';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import middleImg from "../../components/AllImage/campus/t.webp";
import "../MissionVision/index.css";

const MiddleWing = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Middle Stage (Classes VI to VIII)</span>
            <h1>Middle Wing Academic Program</h1>
            <p>
              Transitioning from foundational learning to advanced analytical inquiry, laboratory sciences, and competitive Olympiad preparation.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Responsive Featured Image Banner */}
            <div className="subpage-featured-img-wrap">
              <img src={middleImg} alt="Middle Wing Academic Sessions" loading="lazy" />
            </div>

            {/* Responsive 3-Column Grid (1 col on mobile, 2 col on tablet, 3 col on desktop) */}
            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon"><FaFlask /></div>
                <h2>Integrated Science Practical</h2>
                <p>Dedicated laboratory sessions in Physics, Chemistry, and Biology reinforcing NCERT theoretical principles.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaDraftingCompass /></div>
                <h2>Advanced Mathematics</h2>
                <p>Algebra, Geometry, Data Handling, and Olympiad problem-solving under specialized mathematics mentors.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaCode /></div>
                <h2>Python Coding & AI Basics</h2>
                <p>Structured computer science syllabus covering Python fundamentals, algorithms, web design, and cyber safety.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaLanguage /></div>
                <h2>Three Language Formula</h2>
                <p>Comprehensive proficiency in English Core, Hindi Sahitya, and Sanskrit Grammar to enrich linguistic depth.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaLandmark /></div>
                <h2>Social Sciences & Civics</h2>
                <p>Indian History, World Geography, Democratic Politics, and Disaster Management with field surveys.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaTrophy /></div>
                <h2>Inter-House Competitions</h2>
                <p>Debates, quizzes, science exhibitions, sports championships, and leadership roles in the Student House Council.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Empower Your Teen's Academic Journey</h3>
              <p>Admissions open for Classes 6, 7, and 8. Call our helpline or apply online.</p>
              <Link to="/admissions" className="subpage-cta-btn">Apply for Middle Wing &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MiddleWing;
