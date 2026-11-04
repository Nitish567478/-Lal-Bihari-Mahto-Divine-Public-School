import { FaCreditCard } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "../MissionVision/index.css";

const feeTable = [
  { grade: "Pre-Nursery / Nursery", admFee: "₹ 3,500", tuition: "₹ 950", annual: "₹ 2,000", totalQuarterly: "₹ 4,850" },
  { grade: "L.K.G & U.K.G", admFee: "₹ 4,000", tuition: "₹ 1,100", annual: "₹ 2,200", totalQuarterly: "₹ 5,500" },
  { grade: "Class 1 to 5 (Primary)", admFee: "₹ 5,000", tuition: "₹ 1,350", annual: "₹ 2,500", totalQuarterly: "₹ 6,550" },
  { grade: "Class 6 to 8 (Middle)", admFee: "₹ 5,500", tuition: "₹ 1,550", annual: "₹ 2,800", totalQuarterly: "₹ 7,450" },
  { grade: "Class 9 & 10 (Secondary)", admFee: "₹ 6,500", tuition: "₹ 1,850", annual: "₹ 3,200", totalQuarterly: "₹ 8,750" },
];

const FeeStructure = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Transparent & Affordable</span>
            <h1>Fee Structure (Academic Session 2026-2027)</h1>
            <p>
              Affordable, transparent fee breakdown for Pre-Nursery to Class 10 (Class X) at Lal Bihari Mahto Divine Public School.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Fee Table */}
            <div className="core-pillars-section">
              <h2 className="section-title">Class-Wise Fee Schedule (2026-2027)</h2>
              <div className="table-responsive">
                <table style={{ width: "100%", minWidth: "620px", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#0b1c3d", color: "#ffffff" }}>
                      <th style={{ padding: "12px 14px" }}>Class / Grade</th>
                      <th style={{ padding: "12px 14px" }}>Admission Fee (One-Time)</th>
                      <th style={{ padding: "12px 14px" }}>Monthly Tuition Fee</th>
                      <th style={{ padding: "12px 14px" }}>Annual Development</th>
                      <th style={{ padding: "12px 14px" }}>Quarterly Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeTable.map((f, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0", background: idx % 2 === 1 ? "#f8fafc" : "#ffffff" }}>
                        <td style={{ padding: "12px 14px", fontWeight: "800", color: "#0b1c3d" }}>{f.grade}</td>
                        <td style={{ padding: "12px 14px", color: "#475569" }}>{f.admFee}</td>
                        <td style={{ padding: "12px 14px", fontWeight: "700", color: "#2563eb" }}>{f.tuition} / mo</td>
                        <td style={{ padding: "12px 14px", color: "#475569" }}>{f.annual}</td>
                        <td style={{ padding: "12px 14px", fontWeight: "800", color: "#059669" }}>{f.totalQuarterly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Guidelines */}
            <div className="pillars-grid fee-pillars-grid">
              <div className="mv-card">
                <div className="mv-icon"><FaCreditCard /></div>
                <h2>Payment Modes Accepted</h2>
                <ul className="mv-points">
                  <li><strong>Online UPI / Net Banking:</strong> Instant fee collection via QR code / bank transfer.</li>
                  <li><strong>School Cash / Card Counter:</strong> Mon-Sat 8:30 AM to 2:00 PM at school account office.</li>
                  <li><strong>Instant Digital Receipts:</strong> Computerized tax-compliant receipts with official stamp.</li>
                </ul>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🎁</div>
                <h2>Concessions & Scholarships</h2>
                <ul className="mv-points">
                  <li><strong>Sibling Discount:</strong> 15% concession on monthly tuition fee for the 2nd sibling.</li>
                  <li><strong>Merit Scholarship:</strong> Up to 50% tuition waiver for 90%+ CBSE board scorers.</li>
                  <li><strong>Defense / EWS Support:</strong> Dedicated financial support for needy meritorious students.</li>
                </ul>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Ready to Enroll?</h3>
              <p>Fill out the online application or contact our accounts desk for fee inquiries.</p>
              <Link to="/admissions" className="subpage-cta-btn">Proceed to Admission Application &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FeeStructure;
