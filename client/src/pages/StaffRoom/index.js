import { FaLock } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import staffImg from "../../components/AllImage/campus/s.webp";
import "../MissionVision/index.css";

const StaffRoom = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Faculty Workspace</span>
            <h1>Teachers' Staff Lounge & Resource Center</h1>
            <p>
              A collaborative, comfortable workstation for educators to plan lessons, evaluate student performance, and coordinate curricula.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Staff Room Image */}
            <div className="subpage-featured-img-wrap">
              <img src={staffImg} alt="Staff Lounge & Resource Center" loading="lazy" />
            </div>

            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon">💻</div>
                <h2>Individual Workstations</h2>
                <p>Personal desks with computer connectivity, high-speed Wi-Fi, and printing access for curriculum planning and exam preparation.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">📚</div>
                <h2>Pedagogical Reference Library</h2>
                <p>Teaching methodologies manuals, CBSE circular references, academic journals, and curriculum development guides.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">☕</div>
                <h2>Refreshment & Break Area</h2>
                <p>Equipped with tea/coffee amenities, pure RO water, comfortable seating, and pantry facilities for teacher well-being.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">👥</div>
                <h2>Department Meeting Pods</h2>
                <p>Dedicated roundtables for Science, Mathematics, Languages, and Humanities faculty to coordinate weekly inter-departmental plans.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaLock /></div>
                <h2>Secure Storage & Lockers</h2>
                <p>Individual secure lockers for confidential student evaluation records, answer sheets, and teaching aids.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🤝</div>
                <h2>Parent Counseling Lounge</h2>
                <p>Quiet, professional space for teachers to conduct one-on-one academic consultations with parents during PTMs.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Empowering Our 85+ Dedicated Teachers</h3>
              <p>Great teachers build great institutions. We invest in top facilities for our educators.</p>
              <Link to="/about" className="subpage-cta-btn">About Our Institution &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default StaffRoom;
