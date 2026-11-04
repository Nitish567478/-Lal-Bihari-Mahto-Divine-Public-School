import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import busImg from "../../components/AllImage/school bus/unnamed.webp";
import "../MissionVision/index.css";

const routesData = [
  { route: "Route 1 (Giridih Town)", coverage: "Giridih Station, Buxidih, Makatpur, Pachamba, Sirsia, Naitand", buses: 4 },
  { route: "Route 2 (Jamua & Bandiyabad)", coverage: "Jamua Chowk, Bandiyabad, Remba, Dhuraita, Naitand Campus", buses: 3 },
  { route: "Route 3 (Deori & Mirzaganj)", coverage: "Deori Market, Mirzaganj, Chatro, Hardiya, Naitand", buses: 3 },
  { route: "Route 4 (Rajdhanwar & Khorimahua)", coverage: "Dhanwar Bazaar, Khorimahua, Gandey, Naitand", buses: 2 },
  { route: "Route 5 (Bengabad & Surroundings)", coverage: "Bengabad Block, Motileda, Sonbad, Naitand", buses: 2 },
];

const Transportation = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Safe Commute</span>
            <h1>School Bus & Transportation Network</h1>
            <p>
              Safe, reliable, GPS-tracked bus transportation covering Giridih district and nearby town hubs.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Bus Fleet Image */}
            <div className="subpage-featured-img-wrap">
              <img src={busImg} alt="LBMDPS Bus Fleet" loading="lazy" />
            </div>

            {/* Safety Highlights */}
            <div className="subpage-cards-grid-4">
              <div className="pillar-item">
                <span className="pillar-num">📡</span>
                <h3>Real-Time GPS Tracking</h3>
                <p>Every bus is equipped with live GPS tracking for route adherence and speed safety.</p>
              </div>
              <div className="pillar-item">
                <span className="pillar-num">👩‍✈️</span>
                <h3>Female Bus Attendants</h3>
                <p>Trained female conductors & attendants assist young children during boarding and deboarding.</p>
              </div>
              <div className="pillar-item">
                <span className="pillar-num">🧯</span>
                <h3>First-Aid & Fire Safety</h3>
                <p>Certified first-aid boxes, emergency exit doors, and fire extinguishers on every vehicle.</p>
              </div>
              <div className="pillar-item">
                <span className="pillar-num">🚦</span>
                <h3>Speed Governors</h3>
                <p>Strict 40 km/h speed limit compliance and certified RTO commercial driving licenses.</p>
              </div>
            </div>

            {/* Routes Table */}
            <div className="core-pillars-section">
              <h2 className="section-title">Key Transport Routes & Stop Points</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#0b1c3d", color: "#ffffff" }}>
                      <th style={{ padding: "10px 14px" }}>Route Number</th>
                      <th style={{ padding: "10px 14px" }}>Major Stops & Coverage Areas</th>
                      <th style={{ padding: "10px 14px" }}>Vehicles Assigned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routesData.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #e2e8f0", background: i % 2 === 1 ? "#f8fafc" : "#ffffff" }}>
                        <td style={{ padding: "12px 14px", fontWeight: "700", color: "#2563eb" }}>{r.route}</td>
                        <td style={{ padding: "12px 14px", color: "#ffffff" }}>{r.coverage}</td>
                        <td style={{ padding: "12px 14px", fontWeight: "600", color: "#059669" }}>{r.buses} AC/Non-AC Buses</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inquiries */}
            <div className="subpage-cta-box">
              <h3>Need Transport for Your Location?</h3>
              <p>Contact our Transport Desk at <strong>+91 94313 78901</strong> to confirm the nearest stop and seat availability.</p>
              <Link to="/contact" className="subpage-cta-btn">Contact Transport Office &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Transportation;
