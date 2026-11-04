import React from "react";
import { Link } from "react-router-dom";
import { MdChildCare } from "react-icons/md";
import { FaStar, FaChalkboardTeacher, FaFont, FaSortNumericDown, FaGamepad } from 'react-icons/fa';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import campusImg from "../../components/AllImage/campus/fi.webp";
import "../MissionVision/index.css";

const PrePrimaryWing = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Early Childhood Foundation (NEP 2020)</span>
            <h1>Pre-Primary Wing (Pre-Nursery, Nursery, LKG, UKG)</h1>
            <p>
              Joyful, play-way, and activity-based foundational learning designed for toddlers and young learners at LBMDPS.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Responsive Featured Image Banner */}
            <div className="subpage-featured-img-wrap">
              <img src={campusImg} alt="Pre-Primary Learning Zone" loading="lazy" />
            </div>

            {/* Responsive 3-Column Grid (1 col on mobile, 2 col on tablet, 3 col on desktop) */}
            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon"><MdChildCare /></div>
                <h2>Play-Way Montessori Method</h2>
                <p>Learning through sensory blocks, educational puzzles, flashcards, and interactive storytelling that spark curiosity.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaFont /></div>
                <h2>Phonics & Language Roots</h2>
                <p>Early phonics sound recognition, vocabulary building, rhymes, and bilingual conversation skills in English and Hindi.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaSortNumericDown /></div>
                <h2>Number Fun & Shapes</h2>
                <p>Foundational numeracy, pattern recognition, counting beads, sorting games, and basic spatial awareness.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaStar /></div>
                <h2>Art, Craft & Clay Fun</h2>
                <p>Finger painting, non-toxic clay modeling, paper tearing, and colouring that develop fine motor skills and creativity.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaGamepad /></div>
                <h2>Motor Skills & Junior Play Zone</h2>
                <p>Safe rubberized floor play area with junior slides, balance beams, ball pools, and music & movement rhythms.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaChalkboardTeacher /></div>
                <h2>Caring Mother-Teacher Ratio</h2>
                <p>Affectionate, patient lady educators ensuring 1:15 personalized care, hygiene habits, and emotional security.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Give Your Child the Best Beginning</h3>
              <p>Admissions open for Pre-Nursery to UKG for Session 2026-2027. Experience our joyful early learning center.</p>
              <Link to="/admissions" className="subpage-cta-btn">Apply for Pre-Primary Admission &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PrePrimaryWing;
