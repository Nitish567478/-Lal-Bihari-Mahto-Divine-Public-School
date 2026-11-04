import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import playgroundImg from "../../components/AllImage/campus/f.webp";
import "../MissionVision/index.css";

const Playground = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Sports & Athletics</span>
            <h1>Playground & Outdoor Sports Arena</h1>
            <p>
              Sprawling athletic tracks, cricket turf pitch, basketball court, and dedicated coaches for physical fitness.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Playground Image */}
            <div className="subpage-featured-img-wrap">
              <img src={playgroundImg} alt="Outdoor School Playground" loading="lazy" />
            </div>

            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon">🏏</div>
                <h2>Cricket Turf Ground</h2>
                <p>Full-size cricket ground with maintained turf pitch, practice net sessions, bowling machines, and standard boundary perimeters.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🏀</div>
                <h2>Basketball & Volleyball Courts</h2>
                <p>Paved multi-sport outdoor court with official markings, acrylic backboards, LED floodlights, and safety boundary nets.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🏃</div>
                <h2>200m Athletic Running Track</h2>
                <p>Dedicated running tracks for sprint races, relay events, long jump pit, high jump mats, and shot put arenas.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🥋</div>
                <h2>Taekwondo & Martial Arts</h2>
                <p>Professional martial arts training for self-defense, agility, and discipline under certified black-belt state instructors.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🧘</div>
                <h2>Yoga & Meditation Lawn</h2>
                <p>Serene open-air green lawn for morning assembly prayers, 108 Surya Namaskars, mindfulness meditation, and breathing exercises.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🤾</div>
                <h2>Primary Play Zone</h2>
                <p>Safe rubberized floor area with swings, slides, jungle gyms, and climbing nets designed especially for kindergarten and junior kids.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Developing Champions On and Off the Field</h3>
              <p>Physical education and inter-house sports competitions are an integral part of weekly school life.</p>
              <Link to="/contact" className="subpage-cta-btn">Visit School Grounds &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Playground;
