import React from "react";
import {
  FaShieldAlt, FaUserCheck, FaLock, FaDatabase,
  FaFileContract, FaEye, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt
} from 'react-icons/fa';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../MissionVision/index.css";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        {/* Hero Banner */}
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Legal &amp; Data Protection</span>
            <h1>Privacy Policy</h1>
            <p>
              Committed to safeguarding the personal information, privacy rights, and academic records of students, parents, faculty, and website visitors at Lal Bihari Mahto Divine Public School (CBSE Affiliation #3430398 • UDISE: 20060105502).
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Policy Overview Intro */}
            <div className="subpage-cta-box" style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#1e293b", textAlign: "left", marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <FaShieldAlt style={{ color: "#96281B", fontSize: "24px" }} />
                <h3 style={{ color: "#0f172a", margin: 0, fontSize: "20px" }}>Institutional Commitment to Data Privacy</h3>
              </div>
              <p style={{ color: "#475569", margin: 0, lineHeight: "1.65", fontSize: "14.5px" }}>
                This Privacy Policy outlines how Lal Bihari Mahto Divine Public School ("LBMDPS", "we", "us", or "our"), situated at Village Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316, collects, stores, processes, and protects personal data obtained through our official website (<a href="https://lbmdps.edu.in" style={{ color: "#96281B", fontWeight: "600" }}>lbmdps.edu.in</a>), school administration portals, and campus facilities, in compliance with applicable Indian laws including the Information Technology Act 2000, Digital Personal Data Protection (DPDP) Act, and CBSE guidelines.
              </p>
            </div>

            {/* 2-Column Policy Breakdown Cards */}
            <div className="subpage-cards-grid-2">
              {/* Section 1: Categories of Information Collected */}
              <div className="mv-card">
                <div className="mv-icon"><FaDatabase /></div>
                <h2>1. Information We Collect</h2>
                <ul className="mv-points">
                  <li><strong>Student Information:</strong> Full legal name, date of birth, gender, blood group, Aadhaar number, admission/roll number, previous academic records, and transfer certificates.</li>
                  <li><strong>Parent/Guardian Information:</strong> Father's/Mother's name, residential address, emergency contact numbers, email address, occupation, and signature verifications.</li>
                  <li><strong>Fee &amp; Financial Information:</strong> Payment mode (Cash, UPI, Cheque, Bank Transfer), transaction reference IDs, and computer-generated receipts (we never store card CVV or net-banking passwords).</li>
                  <li><strong>Safety &amp; Telemetry Data:</strong> 24x7 HD CCTV surveillance footage on campus premises and real-time GPS tracking data on school buses.</li>
                </ul>
              </div>

              {/* Section 2: Purpose of Processing */}
              <div className="mv-card">
                <div className="mv-icon"><FaUserCheck /></div>
                <h2>2. Purpose of Data Usage</h2>
                <ul className="mv-points">
                  <li><strong>Academic Administration:</strong> Class roster management, gradebook assessments, attendance tracking, and CBSE board examination registration.</li>
                  <li><strong>Parent Communication:</strong> Sending critical circulars, examination schedules, fee payment receipts, attendance alerts, and emergency notifications.</li>
                  <li><strong>Child Protection &amp; Discipline:</strong> Upholding campus safety under POCSO committee protocols, monitoring school transport, and verifying authorized visitor access.</li>
                  <li><strong>Institutional Records:</strong> Maintaining permanent student registers as required by the Department of School Education and CBSE.</li>
                </ul>
              </div>

              {/* Section 3: Data Security & Access Controls */}
              <div className="mv-card">
                <div className="mv-icon"><FaLock /></div>
                <h2>3. Data Protection &amp; Confidentiality</h2>
                <ul className="mv-points">
                  <li><strong>Role-Based Access Control (RBAC):</strong> Access to sensitive student records is strictly partitioned between Super Admin, Principal, Class Teachers, and Treasury Accounts desks.</li>
                  <li><strong>Encrypted Communications:</strong> Administrative portals enforce cryptographic tokens and HTTPS encryption across all browser sessions.</li>
                  <li><strong>Physical &amp; Cloud Security:</strong> Server databases and local persistent archives are shielded against unauthorized intrusion, data manipulation, or leakage.</li>
                  <li><strong>Staff Confidentiality:</strong> All teachers and administrative personnel are bound by non-disclosure agreements regarding student academic and personal profiles.</li>
                </ul>
              </div>

              {/* Section 4: Third-Party Disclosures */}
              <div className="mv-card">
                <div className="mv-icon"><FaFileContract /></div>
                <h2>4. Disclosure &amp; Third Parties</h2>
                <ul className="mv-points">
                  <li><strong>No Commercial Sale:</strong> We never sell, rent, trade, or monetize student or guardian information to marketing agencies or commercial entities.</li>
                  <li><strong>Statutory Educational Boards:</strong> Data is shared strictly with the Central Board of Secondary Education (CBSE, New Delhi) and the State Education Department as mandated by law.</li>
                  <li><strong>Medical Emergency Personnel:</strong> Blood group and guardian contacts are disclosed to licensed medical physicians solely in life-saving emergencies.</li>
                  <li><strong>Law Enforcement:</strong> Information may be shared only upon receipt of lawful warrants or court orders issued by judicial authorities.</li>
                </ul>
              </div>

              {/* Section 5: Cookies & Website Usage */}
              <div className="mv-card">
                <div className="mv-icon"><FaEye /></div>
                <h2>5. Cookies &amp; Digital Analytics</h2>
                <ul className="mv-points">
                  <li><strong>Essential Cookies:</strong> The website utilizes strictly necessary session cookies to maintain login state and role permissions for authorized personnel.</li>
                  <li><strong>Preference Cookies:</strong> Storing display settings and page preferences to enhance user experience.</li>
                  <li><strong>No Invasive Tracking:</strong> We do not deploy third-party advertising trackers, cross-site profiling, or behavioral ad beacons on student portals.</li>
                </ul>
              </div>

              {/* Section 6: Parental Rights & Record Updates */}
              <div className="mv-card">
                <div className="mv-icon"><FaShieldAlt /></div>
                <h2>6. Parental Rights &amp; Access</h2>
                <ul className="mv-points">
                  <li><strong>Right to Review:</strong> Parents have the right to inspect their ward's academic records, fee statements, and attendance records at any time.</li>
                  <li><strong>Rectification of Data:</strong> In case of changes in residential address, phone numbers, or guardian details, parents must submit a written request to the school desk.</li>
                  <li><strong>Transfer &amp; Archival:</strong> Upon withdrawal, Transfer Certificates (TC) and character certificates are issued according to CBSE bye-laws.</li>
                </ul>
              </div>
            </div>

            {/* Grievance & Office Contact Strip */}
            <div className="subpage-cta-box" style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#1e293b", textAlign: "left", marginTop: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <FaEnvelope style={{ color: "#96281B", fontSize: "20px" }} />
                <h3 style={{ color: "#0f172a", margin: 0, fontSize: "18px" }}>Data Protection &amp; Grievance Officer</h3>
              </div>
              <p style={{ color: "#475569", margin: "0 0 16px 0", lineHeight: "1.6", fontSize: "14px" }}>
                If you have questions regarding this Privacy Policy, wish to update your ward's information, or have inquiries regarding data protection protocols, please contact our administrative desk:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", color: "#334155", fontSize: "13.5px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaMapMarkerAlt style={{ color: "#96281B" }} /> LBMDPS Administrative Office, Naitand, Giridih, Jharkhand - 815316
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

export default PrivacyPolicy;

