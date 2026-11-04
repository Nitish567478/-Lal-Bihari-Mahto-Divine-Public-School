import { FaClipboard, FaChartBar } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "../MissionVision/index.css";

const examSchedule = [
  { exam: "Periodic Test 1 (PT-1)", duration: "July", weightage: "10% Marks", classes: "Class 1 to 10" },
  { exam: "Half-Yearly / Mid-Term Exam", duration: "September - October", weightage: "30% Marks (80 Marks Written)", classes: "Class 1 to 10" },
  { exam: "Periodic Test 2 (PT-2)", duration: "December", weightage: "10% Marks", classes: "Class 1 to 10" },
  { exam: "CBSE Pre-Board Phase 1", duration: "December - January", weightage: "Full Board Pattern (100% Syllabus)", classes: "Class 10" },
  { exam: "CBSE Pre-Board Phase 2", duration: "January - February", weightage: "Board Simulation with External Marking", classes: "Class 10" },
  { exam: "Annual Final Examination", duration: "February - March", weightage: "50% Marks / CBSE Board Exam", classes: "Class 1 to 9 (Finals) / Class 10 (CBSE)" },
];

const Examinations = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Evaluation & Assessment</span>
            <h1>Academic Examinations & Assessment Policy</h1>
            <p>
              Standardized CBSE evaluation framework, periodic test schedules, and transparent grading criteria at LBMDPS.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Examination Schedule Table */}
            <div className="core-pillars-section">
              <h2 className="section-title">Annual Examination & Assessment Timeline</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#0b1c3d", color: "#ffffff" }}>
                      <th style={{ padding: "12px 14px" }}>Assessment Stage</th>
                      <th style={{ padding: "12px 14px" }}>Timeline Month</th>
                      <th style={{ padding: "12px 14px" }}>Evaluation Weightage</th>
                      <th style={{ padding: "12px 14px" }}>Applicable Grades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedule.map((e, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0", background: idx % 2 === 1 ? "#f8fafc" : "#ffffff" }}>
                        <td style={{ padding: "12px 14px", fontWeight: "800", color: "#0b1c3d" }}>{e.exam}</td>
                        <td style={{ padding: "12px 14px", fontWeight: "600", color: "#2563eb" }}>{e.duration}</td>
                        <td style={{ padding: "12px 14px", color: "#475569" }}>{e.weightage}</td>
                        <td style={{ padding: "12px 14px", fontWeight: "700", color: "#059669" }}>{e.classes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Assessment Structure Cards */}
            <div className="pillars-grid subpage-cards-grid-2" style={{ marginBottom: "30px" }}>
              <div className="mv-card">
                <div className="mv-icon"><FaChartBar /></div>
                <h2>Internal Assessment (20 Marks)</h2>
                <ul className="mv-points">
                  <li><strong>Periodic Tests:</strong> Best 2 out of 3 periodic tests (5 Marks).</li>
                  <li><strong>Multiple Assessments:</strong> Quizzes, oral viva, concept maps (5 Marks).</li>
                  <li><strong>Portfolio & Notebooks:</strong> Regularity, neatness, assignment completion (5 Marks).</li>
                  <li><strong>Subject Enrichment:</strong> Practical lab work, projects, speaking skills (5 Marks).</li>
                </ul>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaClipboard /></div>
                <h2>Board Written Examination (80 Marks)</h2>
                <ul className="mv-points">
                  <li><strong>Syllabus:</strong> 100% prescribed NCERT / CBSE curriculum.</li>
                  <li><strong>Duration:</strong> 3 Hours written board examination per subject.</li>
                  <li><strong>Question Typology:</strong> MCQs, Assertion-Reason, Short Answer, Long Answer, and Case-Based Analytical questions.</li>
                  <li><strong>Passing Criteria:</strong> Mandatory 33% in theory and practical separately.</li>
                </ul>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Track Your Child's Academic Progress</h3>
              <p>Parent-Teacher Meetings (PTMs) are organized after every major examination with detailed performance cards.</p>
              <Link to="/contact" className="subpage-cta-btn">Contact Examination Cell &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Examinations;
