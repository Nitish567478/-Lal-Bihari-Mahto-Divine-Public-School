import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import hostelImg from "../../components/AllImage/campus/unnamed.webp";
import "../MissionVision/index.css";

const HostelFacility = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Home Away From Home</span>
            <h1>Hostel & Boarding Facility</h1>
            <p>
              Safe, disciplined, and nurturing residential boarding facilities for outstation students at LBMDPS, Naitand.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Hostel Campus Image */}
            <div className="subpage-featured-img-wrap">
              <img src={hostelImg} alt="Hostel & Residential Boarding" loading="lazy" />
            </div>

            {/* Features 3-Column */}
            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon">🛏️</div>
                <h2>Spacious Rooms</h2>
                <p>Well-ventilated, hygienic dormitories and double/triple sharing rooms with personal wardrobes, study desks, and comfortable mattresses.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🍲</div>
                <h2>Nutritious Dining</h2>
                <p>Pure vegetarian hygienic kitchen preparing 4 balanced meals daily (Breakfast, Lunch, Evening Snacks, and Dinner) approved by nutritionists.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">📚</div>
                <h2>Supervised Study Hours</h2>
                <p>Dedicated 3 hours of evening self-study supervised by subject teachers for personalized doubt clearance and homework support.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🛡️</div>
                <h2>24x7 Security & Wardens</h2>
                <p>Round-the-clock resident male/female wardens, 24x7 CCTV campus surveillance, and strict entry/exit gate check policies.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🏥</div>
                <h2>Health & Medical Care</h2>
                <p>Dedicated sick bay, first-aid trained staff, emergency doctor-on-call, and tie-ups with reputable hospitals in Giridih.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">⚽</div>
                <h2>Recreation & Sports</h2>
                <p>Evening sports sessions, indoor table tennis, carrom, chess, yoga classes, and weekend educational movie screenings.</p>
              </div>
            </div>

            {/* Daily Routine Table */}
            <div className="core-pillars-section">
              <h2 className="section-title">Hostel Daily Schedule & Routine</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#0b1c3d", color: "#ffffff" }}>
                      <th style={{ padding: "10px 14px" }}>Time</th>
                      <th style={{ padding: "10px 14px" }}>Activity</th>
                      <th style={{ padding: "10px 14px" }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "10px 14px", fontWeight: "700" }}>5:30 AM - 6:15 AM</td>
                      <td style={{ padding: "10px 14px" }}>Wake up & Morning Yoga / Jogging</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>Physical fitness & morning prayer</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                      <td style={{ padding: "10px 14px", fontWeight: "700" }}>6:45 AM - 7:15 AM</td>
                      <td style={{ padding: "10px 14px" }}>Nutritious Breakfast & Milk</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>Fresh dining hall meal</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "10px 14px", fontWeight: "700" }}>7:30 AM - 1:30 PM</td>
                      <td style={{ padding: "10px 14px" }}>Regular School Academic Hours</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>Classes, smart labs & library sessions</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                      <td style={{ padding: "10px 14px", fontWeight: "700" }}>2:00 PM - 3:30 PM</td>
                      <td style={{ padding: "10px 14px" }}>Lunch & Rest Time</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>Nutritious meal and quiet relaxation</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "10px 14px", fontWeight: "700" }}>4:30 PM - 6:00 PM</td>
                      <td style={{ padding: "10px 14px" }}>Outdoor Sports & Snacks</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>Cricket, football, athletics on school grounds</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                      <td style={{ padding: "10px 14px", fontWeight: "700" }}>6:30 PM - 8:30 PM</td>
                      <td style={{ padding: "10px 14px" }}>Supervised Self-Study & Remedials</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>Doubt clearing with resident teachers</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", fontWeight: "700" }}>8:45 PM - 9:30 PM</td>
                      <td style={{ padding: "10px 14px" }}>Dinner & Lights Out (10:00 PM)</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>Wholesome dinner and restful sleep</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Inquire About Hostel Admission</h3>
              <p>Limited hostel seats available for boys & girls (Class 4 to 10). Contact our admissions office today.</p>
              <Link to="/contact" className="subpage-cta-btn">Book Hostel Tour & Contact Us &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HostelFacility;
