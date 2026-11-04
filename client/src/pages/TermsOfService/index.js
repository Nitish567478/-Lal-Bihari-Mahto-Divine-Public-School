import React from "react";
import {
  FaFileContract, FaCreditCard, FaGraduationCap, FaUserShield,
  FaShieldAlt, FaBalanceScale, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt
} from 'react-icons/fa';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../MissionVision/index.css";

const TermsOfService = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        {/* Hero Banner */}
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">School Terms &amp; Legal Conditions</span>
            <h1>Terms of Service</h1>
            <p>
              Please read these terms and conditions carefully before using our official school portal, submitting online admission forms, or remitting school fees at Lal Bihari Mahto Divine Public School (Estd. 2013).
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Terms Intro Box */}
            <div className="subpage-cta-box" style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#1e293b", textAlign: "left", marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <FaFileContract style={{ color: "#96281B", fontSize: "24px" }} />
                <h3 style={{ color: "#0f172a", margin: 0, fontSize: "20px" }}>Binding Legal Agreement</h3>
              </div>
              <p style={{ color: "#475569", margin: 0, lineHeight: "1.65", fontSize: "14.5px" }}>
                These Terms of Service govern your access to and use of the official website (<a href="https://lbmdps.edu.in" style={{ color: "#96281B", fontWeight: "600" }}>lbmdps.edu.in</a>), admissions registry, fee receipts desk, and administrative facilities operated by Lal Bihari Mahto Divine Public School ("LBMDPS", CBSE Affiliation #3430398 • UDISE: 20060105502), Naitand, Giridih. By browsing our website or registering a student, you agree to comply with and be legally bound by these Terms and the CBSE code of regulations.
              </p>
            </div>

            {/* 2-Column Terms Cards Grid */}
            <div className="subpage-cards-grid-2">
              {/* Section 1: Admission & Enrollment */}
              <div className="mv-card">
                <div className="mv-icon"><FaGraduationCap /></div>
                <h2>1. Admission &amp; Enrollment Terms</h2>
                <ul className="mv-points">
                  <li><strong>Application vs Confirmation:</strong> Submitting an online admission inquiry or registration form does not guarantee admission until original certificates are verified and seat allocation is finalized.</li>
                  <li><strong>Accuracy of Records:</strong> Parents must ensure full accuracy of student name, date of birth, previous schooling, and address. False declarations may result in forfeiture of admission.</li>
                  <li><strong>Age Eligibility:</strong> Admissions strictly adhere to CBSE and National Education Policy (NEP 2020) age criteria for Nursery to Class 10.</li>
                  <li><strong>Transfer Formalities:</strong> Students migrating from other schools must provide a valid Transfer Certificate (TC) countersigned by the competent educational authority.</li>
                </ul>
              </div>

              {/* Section 2: School Fees & Refund Policy */}
              <div className="mv-card">
                <div className="mv-icon"><FaCreditCard /></div>
                <h2>2. School Fees, Billing &amp; Refunds</h2>
                <ul className="mv-points">
                  <li><strong>Payment Due Dates:</strong> Tuition and facility fees must be remitted by the 10th of every scheduled billing month or term.</li>
                  <li><strong>Late Fine:</strong> A nominal late fine is applicable on unpaid balances past the due date as per the school treasury schedule.</li>
                  <li><strong>Official Receipts:</strong> Every payment made via Cash, UPI, Cheque, or Bank Transfer generates a verified computer receipt with a unique serial number.</li>
                  <li><strong>Non-Refundable Charges:</strong> Admission fees and registration fees once paid are non-refundable. Caution money/deposits (if applicable) are refundable upon clearance of dues and issuance of TC.</li>
                </ul>
              </div>

              {/* Section 3: Portal & Digital Credentials */}
              <div className="mv-card">
                <div className="mv-icon"><FaUserShield /></div>
                <h2>3. Portal Accounts &amp; Authorized Access</h2>
                <ul className="mv-points">
                  <li><strong>Authorized Personnel Only:</strong> Administrative, Accounts, and Faculty hubs are strictly restricted to verified school staff with authenticated credentials.</li>
                  <li><strong>Prohibited Actions:</strong> Unauthorized penetration testing, credential sharing, denial of service, or scraping of student records is strictly punishable under Section 66 of the Information Technology Act 2000.</li>
                  <li><strong>Session Security:</strong> Authorized staff must maintain password confidentiality and immediately notify the IT desk in the event of suspected compromise.</li>
                </ul>
              </div>

              {/* Section 4: Student Conduct & Discipline */}
              <div className="mv-card">
                <div className="mv-icon"><FaShieldAlt /></div>
                <h2>4. Campus Discipline &amp; Code of Conduct</h2>
                <ul className="mv-points">
                  <li><strong>75% Mandatory Attendance:</strong> Students must maintain a minimum of 75% attendance throughout the academic session to qualify for CBSE board examinations.</li>
                  <li><strong>Zero Tolerance for Bullying:</strong> LBMDPS maintains strict zero-tolerance enforcement for ragging, harassment, verbal abuse, or cyberbullying under the POCSO committee guidelines.</li>
                  <li><strong>Uniform &amp; Property:</strong> Students must wear the designated school uniform with ID badge and treat campus science labs, computers, and buses with care.</li>
                </ul>
              </div>

              {/* Section 5: Intellectual Property */}
              <div className="mv-card">
                <div className="mv-icon"><FaFileContract /></div>
                <h2>5. Intellectual Property Rights</h2>
                <ul className="mv-points">
                  <li><strong>Ownership of Content:</strong> The LBMDPS crest, motto <em>"Vidya Dadati Vinayam"</em>, curriculum syllabus materials, photographs, and website design are proprietary assets of the institution.</li>
                  <li><strong>Restrictions:</strong> Reproduction, redistribution, or commercial reuse of school media without prior written consent of the Principal is strictly prohibited.</li>
                </ul>
              </div>

              {/* Section 6: Jurisdiction & Governing Law */}
              <div className="mv-card">
                <div className="mv-icon"><FaBalanceScale /></div>
                <h2>6. Jurisdiction &amp; Legal Recourse</h2>
                <ul className="mv-points">
                  <li><strong>Governing Law:</strong> These Terms of Service are governed by and construed in accordance with the substantive laws of India.</li>
                  <li><strong>Exclusive Jurisdiction:</strong> Any legal action, dispute, or proceeding arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in Giridih, Jharkhand.</li>
                  <li><strong>Amendments:</strong> The School Management Committee reserves the right to amend these Terms to reflect changes in regulatory directives or school policies.</li>
                </ul>
              </div>
            </div>

            {/* Official Legal Contact Strip */}
            <div className="subpage-cta-box" style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#1e293b", textAlign: "left", marginTop: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <FaEnvelope style={{ color: "#96281B", fontSize: "20px" }} />
                <h3 style={{ color: "#0f172a", margin: 0, fontSize: "18px" }}>Legal &amp; Administrative Secretariat</h3>
              </div>
              <p style={{ color: "#475569", margin: "0 0 16px 0", lineHeight: "1.6", fontSize: "14px" }}>
                For official correspondence regarding legal compliance, fee policies, or enrollment agreements, please contact the Principal's Office:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", color: "#334155", fontSize: "13.5px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaMapMarkerAlt style={{ color: "#96281B" }} /> Lal Bihari Mahto Divine Public School, Village Naitand, Post Bandiyabad, Giridih, Jharkhand - 815316
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaPhoneAlt style={{ color: "#96281B" }} /> +91 94313 78901
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaEnvelope style={{ color: "#96281B" }} /> info@lbmdps.edu.in
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;

