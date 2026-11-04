import { FaFlask, FaBolt } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import scienceLabImg from "../../components/AllImage/3.jpg";
import "../MissionVision/index.css";

const ScienceLaboratories = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Hands-On Science</span>
            <h1>Physics, Chemistry & Biology Laboratories</h1>
            <p>
              Fully-equipped, CBSE compliant experimental research laboratories designed for scientific discovery and safety.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Science Lab Image */}
            <div className="subpage-featured-img-wrap">
              <img src={scienceLabImg} alt="Science Laboratories" loading="lazy" />
            </div>

            <div className="subpage-cards-grid-3">
              {/* Physics Lab */}
              <div className="mv-card">
                <div className="mv-icon"><FaBolt /></div>
                <h2>Physics Laboratory</h2>
                <p>Equipped with optical benches, spectrometers, prisms, galvanometers, sonometers, screw gauges, and electronic circuit boards for CBSE secondary school experiments.</p>
              </div>

              {/* Chemistry Lab */}
              <div className="mv-card">
                <div className="mv-icon">🧪</div>
                <h2>Chemistry Laboratory</h2>
                <p>Custom chemical-resistant granite tables, safety fume hoods, gas pipeline burners, analytical balances, titration stands, and complete organic/inorganic reagents.</p>
              </div>

              {/* Biology Lab */}
              <div className="mv-card">
                <div className="mv-icon"><FaFlask /></div>
                <h2>Biology & Life Science Lab</h2>
                <p>High-resolution compound microscopes, human anatomical models, preserved specimen jars, botanical slides, charts, and dissection simulation tools.</p>
              </div>

              {/* Lab Safety */}
              <div className="mv-card">
                <div className="mv-icon">🥽</div>
                <h2>Strict Lab Safety Protocols</h2>
                <p>Safety goggles, lab coats, emergency eye-wash showers, fire blankets, sand buckets, and first-aid kits present in every laboratory.</p>
              </div>

              {/* Mathematics Lab */}
              <div className="mv-card">
                <div className="mv-icon">📐</div>
                <h2>Mathematics Practical Lab</h2>
                <p>3D geometric wooden/acrylic shapes, abacuses, trigonometry measuring gadgets, and graphing tools that make abstract math concrete.</p>
              </div>

              {/* Junior Science Lab */}
              <div className="mv-card">
                <div className="mv-icon">🌱</div>
                <h2>Junior STEM Discovery Lab</h2>
                <p>Specially curated for classes 3 to 8 with magnets, solar car kits, simple machines, microscope starter kits, and plant growth chambers.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Fostering Scientific Temperament</h3>
              <p>Students conduct weekly hands-on practical experiments under the guidance of specialized subject teachers.</p>
              <Link to="/admissions" className="subpage-cta-btn">Enroll Today &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ScienceLaboratories;
