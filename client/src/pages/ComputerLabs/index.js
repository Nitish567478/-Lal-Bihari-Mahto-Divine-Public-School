import { FaGlobe } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import computerImg from "../../components/AllImage/2.webp";
import "../MissionVision/index.css";

const ComputerLabs = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Technology & STEM</span>
            <h1>Computer & AI Robotics Labs</h1>
            <p>
              High-speed networked computing laboratories empowering students with coding, AI fundamentals, and digital literacy.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Computer Lab Image */}
            <div className="subpage-featured-img-wrap">
              <img src={computerImg} alt="Computer & Robotics Lab" loading="lazy" />
            </div>

            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon">💻</div>
                <h2>60+ Modern Workstations</h2>
                <p>Equipped with Intel Core processors, dedicated graphics, high-speed SSDs, and 24-inch full HD LED monitors with 1:1 student-PC ratio.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🤖</div>
                <h2>AI & Robotics Kits</h2>
                <p>Hands-on Arduino, Raspberry Pi, micro:bit kits, sensors, and basic robotics components for CBSE AI curriculum projects.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🐍</div>
                <h2>Python, Scratch & Web Coding</h2>
                <p>Curriculum-integrated programming in Scratch for juniors and Python, HTML5, CSS3, JavaScript, and SQL for senior students.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🛡️</div>
                <h2>Cyber Safety & Firewall</h2>
                <p>Strict web filtering firewalls, antivirus suites, and dedicated cyber ethics modules ensuring safe and responsible internet browsing.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaGlobe /></div>
                <h2>Gigabit Fiber Connectivity</h2>
                <p>Dual redundant 100 Mbps optical fiber broadband connections providing uninterrupted internet access for practical exams and research.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🖨️</div>
                <h2>3D Printing & Peripherals</h2>
                <p>High-resolution color laser printers, digital scanners, sound equipment, and projector display for teacher-led demonstrations.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Empowering Future Tech Leaders</h3>
              <p>Computer science is mandatory from Class 1 onwards with weekly practical lab hours.</p>
              <Link to="/academic" className="subpage-cta-btn">View Academic Curriculum &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ComputerLabs;
