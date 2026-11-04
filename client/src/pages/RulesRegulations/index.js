import { FaClipboard, FaClock, FaTshirt, FaShieldAlt, FaHandshake } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../MissionVision/index.css";

const RulesRegulations = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Code of Conduct & Ethics</span>
            <h1>Rules, Regulations & Student Code</h1>
            <p>
              Guidelines to foster character, academic excellence, safety, and a disciplined campus environment at Lal Bihari Mahto Divine Public School.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Rules 2x2 Grid (1-col on mobile, 2-col on tablet/desktop) */}
            <div className="subpage-cards-grid-2">
              {/* Section 1: Timings & Attendance */}
              <div className="mv-card">
                <div className="mv-icon"><FaClock /></div>
                <h2>1. Timings & Daily Attendance</h2>
                <ul className="mv-points">
                  <li><strong>School Hours:</strong> Summer (7:30 AM - 1:30 PM), Winter (8:30 AM - 2:30 PM).</li>
                  <li><strong>75% Mandatory Attendance:</strong> Essential to be eligible for CBSE board examinations.</li>
                  <li><strong>Punctuality:</strong> Gates close promptly at the bell. Late arrivals require gate pass verification.</li>
                  <li><strong>Leave Formalities:</strong> Prior written leave application signed by parents is mandatory for absences over 2 days.</li>
                </ul>
              </div>

              {/* Section 2: School Uniform */}
              <div className="mv-card">
                <div className="mv-icon"><FaTshirt /></div>
                <h2>2. Uniform & Personal Grooming</h2>
                <ul className="mv-points">
                  <li><strong>Daily Uniform:</strong> Prescribed school uniform shirt, trousers/skirt, belt, tie, ID card, and polished black shoes.</li>
                  <li><strong>House Uniform (Wed/Sat):</strong> Respective House T-shirt (Tagore, Raman, Ashoka, Shivaji) & white canvas shoes.</li>
                  <li><strong>Personal Grooming:</strong> Clean haircut for boys; neatly braided hair with white ribbons for girls.</li>
                  <li><strong>Prohibited Items:</strong> Expensive jewelry, smartwatches, and unauthorized electronic gadgets are strictly prohibited.</li>
                </ul>
              </div>

              {/* Section 3: Academic & Examination */}
              <div className="mv-card">
                <div className="mv-icon"><FaClipboard /></div>
                <h2>3. Examinations & Academic Integrity</h2>
                <ul className="mv-points">
                  <li><strong>Assessment Pattern:</strong> Periodic Tests (PT 1, PT 2), Half-Yearly, and Annual Board Evaluations as per CBSE.</li>
                  <li><strong>Zero Tolerance (UFM):</strong> Strict penalties for any malpractice or unfair means during examinations.</li>
                  <li><strong>Parent-Teacher Meetings:</strong> Mandatory attendance for parents during quarterly PTMs to review student progress.</li>
                  <li><strong>Homework & Project Submissions:</strong> Timely completion of all assignments and laboratory records.</li>
                </ul>
              </div>

              {/* Section 4: Campus Discipline & Safety */}
              <div className="mv-card">
                <div className="mv-icon"><FaShieldAlt /></div>
                <h2>4. Campus Discipline & Zero-Bullying Policy</h2>
                <ul className="mv-points">
                  <li><strong>Zero Tolerance for Bullying:</strong> Strict anti-ragging and respectful peer conduct policy across all grades.</li>
                  <li><strong>Campus Property:</strong> Careful use of laboratory apparatus, library books, and sports equipment.</li>
                  <li><strong>Mobile Phone Restriction:</strong> Bringing mobile phones to school without written admin approval is prohibited.</li>
                  <li><strong>Visitor Verification:</strong> All campus visitors must register at the main security desk for a visitor pass.</li>
                </ul>
              </div>
            </div>

            {/* General Undertaking Box */}
            <div className="subpage-cta-box" style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#1e293b", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <FaHandshake style={{ color: "#96281B", fontSize: "22px" }} />
                <h3 style={{ color: "#0f172a", margin: 0 }}>Parent-School Partnership</h3>
              </div>
              <p style={{ color: "#475569", margin: 0, lineHeight: "1.6" }}>
                We believe that the holistic development, emotional well-being, and disciplined character of a student is a joint responsibility of teachers and parents. Parents are encouraged to review the student diary daily and keep emergency contact numbers updated with the administrative office.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RulesRegulations;
