import { FaBook } from 'react-icons/fa';
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import libraryImg from "../../components/AllImage/1.webp";
import "../MissionVision/index.css";

const Library = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Knowledge Sanctuary</span>
            <h1>Central Library & Reading Hall</h1>
            <p>
              A treasure trove of 10,000+ books, national periodicals, journals, and a peaceful digital reading sanctuary.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Featured Library Image */}
            <div className="subpage-featured-img-wrap">
              <img src={libraryImg} alt="Central School Library" loading="lazy" />
            </div>

            <div className="subpage-cards-grid-3">
              <div className="mv-card">
                <div className="mv-icon">📚</div>
                <h2>10,000+ Volume Collection</h2>
                <p>Curated titles spanning CBSE textbooks, reference volumes (NCERT, RD Sharma, HC Verma), world literature, encyclopedias, and competitive exams.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">📰</div>
                <h2>Periodicals & Newspapers</h2>
                <p>Daily national English and Hindi newspapers, science magazines, India Today, Pratiyogita Darpan, and educational digests.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">💻</div>
                <h2>Digital E-Library Corner</h2>
                <p>Networked computer terminals allowing students to access Kindle ebooks, research portals, and CBSE digital content repositories.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🤫</div>
                <h2>Quiet Reading Zones</h2>
                <p>A tranquil, air-conditioned 100-seat reading hall designed for focused self-study and deep comprehension without disturbance.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon">🏷️</div>
                <h2>Barcoded Issue System</h2>
                <p>Computerized library management system with student barcode ID cards for swift book issuing and return tracking.</p>
              </div>

              <div className="mv-card">
                <div className="mv-icon"><FaBook /></div>
                <h2>Junior Storybook Corner</h2>
                <p>Illustrated storybooks, moral tales (Panchatantra, Jataka), and interactive phonics pop-up books to ignite early reading habits in kids.</p>
              </div>
            </div>

            <div className="subpage-cta-box">
              <h3>Cultivate Lifelong Reading Habits</h3>
              <p>Every student receives a weekly library period guided by qualified librarians.</p>
              <Link to="/admissions" className="subpage-cta-btn">Join LBMDPS &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Library;
