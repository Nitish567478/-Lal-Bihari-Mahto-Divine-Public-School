import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap, FaBook, FaCreditCard, FaMapMarkerAlt, FaStar, FaPencilAlt,
  FaFlask, FaCheck, FaTrophy,
  FaClock, FaBus, FaShieldAlt,
  FaClipboard
} from 'react-icons/fa';
import { MdChildCare } from "react-icons/md";

import Header from "../../components/Header";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";

import schoolCampusImg from "../../components/AllImage/4.jpg";

import "./home.css";

// Dynamic Animated Counter with scroll-into-view trigger
const AnimatedCounter = ({ target, suffix = '', prefix = '', duration = 1800, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, target, duration]);

  const formatted = count >= 1000 ? count.toLocaleString('en-IN') : count;

  return (
    <span className="counter-animated-value">
      {prefix}{formatted}{suffix}
    </span>
  );
};

const faqs = [
  {
    question: "What is the age eligibility criteria for Nursery, LKG, and Class 1?",
    answer: "As per CBSE guidelines and NEP 2020 recommendations: For Nursery, the child should be 3+ years old as of 31st March. For LKG 4+, UKG 5+, and for Class 1 admission, the child must be 6+ years old."
  },
  {
    question: "Does the school provide dedicated bus transport for nearby villages and towns?",
    answer: "Yes, LBMDPS maintains a well-managed fleet of 15+ GPS-tracked school buses covering Naitand, Giridih Town, Pachamba, Jamua, and adjacent rural and urban routes with trained female attendants."
  },
  {
    question: "What has been the track record in CBSE Class X Board Examinations?",
    answer: "LBMDPS has maintained a consistent 100% CBSE Class X board pass record with multiple district rank holders scoring above 95% to 98.6%. Dedicated doubt classes and pre-board mock series are conducted for examinees."
  },
  {
    question: "How does the school ensure student safety, hygiene, and discipline?",
    answer: "The campus is monitored 24x7 with over 150 HD CCTV cameras, security checkpoints at entry/exit gates, POCSO child protection cell, pure RO drinking water plants, and separate sanitized washrooms with female caretakers."
  },
  {
    question: "What are the co-curricular activities and sports options available?",
    answer: "Students engage weekly in sports coaching (cricket, basketball, badminton, athletics), smart computer coding, robotics STEM models, fine arts, music, dance, elocution debates, and morning mindfulness yoga."
  }
];

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setStatsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="home-page-root">
      <Header />
      <Slider />

      {/* 1. QUICK NAVIGATION BAR */}
      <section className="home-quick-nav">
        <div className="home-container">
          <div className="quick-nav-grid">
            <Link to="/admissions" className="quick-nav-card featured">
              <div className="quick-nav-icon"><FaGraduationCap /></div>
              <div className="quick-nav-text">
                <h3>Admissions 2026-27</h3>
                <p>Nursery to Class X Open</p>
              </div>
              <span className="quick-nav-arrow">&rarr;</span>
            </Link>

            <Link to="/academic" className="quick-nav-card">
              <div className="quick-nav-icon"><FaBook /></div>
              <div className="quick-nav-text">
                <h3>Academic Wings</h3>
                <p>Curriculum &amp; Programs</p>
              </div>
              <span className="quick-nav-arrow">&rarr;</span>
            </Link>

            <Link to="/fee-structure" className="quick-nav-card">
              <div className="quick-nav-icon"><FaCreditCard /></div>
              <div className="quick-nav-text">
                <h3>Fee Structure</h3>
                <p>Transparent Session Fees</p>
              </div>
              <span className="quick-nav-arrow">&rarr;</span>
            </Link>

            <Link to="/contact" className="quick-nav-card">
              <div className="quick-nav-icon"><FaMapMarkerAlt /></div>
              <div className="quick-nav-text">
                <h3>Campus &amp; Contact</h3>
                <p>Directions &amp; Inquiries</p>
              </div>
              <span className="quick-nav-arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PROMINENT TOPPERS SHOWCASE / ACADEMIC WALL OF FAME */}
      <section className="home-toppers-top-section">
        <div className="home-container">
          <div className="toppers-top-header">
            <span className="home-badge gold">MERIT STARS &amp; ACHIEVERS</span>
            <h2 className="toppers-top-title">Our CBSE Board Exam Toppers 2026</h2>
            <p className="toppers-top-sub">
              Celebrating exceptional academic brilliance, dedication, and stellar performance at LBMDPS Naitand
            </p>
          </div>

          <div className="toppers-top-grid">
            {/* Card 1: Aarav Kumar */}
            <div className="topper-top-card rank-1">
              <div className="topper-card-crown">
                <span className="topper-card-rank-tag gold">🏆 District 1st Rank</span>
              </div>
              <div className="topper-card-img-wrap">
                <img
                  src="https://i.ibb.co/wFwwXKfb/images.png"
                  alt="Aarav Kumar"
                  className="topper-top-img"
                />
                <span className="topper-score-badge">98.6%</span>
              </div>
              <div className="topper-card-details">
                <h3 className="topper-card-name">Aarav Kumar</h3>
                <p className="topper-card-exam">CBSE Class X Board Exam 2026</p>
                <div className="topper-card-feat">
                  <FaStar className="feat-icon" /> 100/100 in Mathematics &amp; Science
                </div>
              </div>
            </div>

            {/* Card 2: Sneha Kumari */}
            <div className="topper-top-card rank-2">
              <div className="topper-card-crown">
                <span className="topper-card-rank-tag silver">🥈 District 2nd Rank</span>
              </div>
              <div className="topper-card-img-wrap">
                <img
                  src="https://i.ibb.co/wFwwXKfb/images.png"
                  alt="Sneha Kumari"
                  className="topper-top-img"
                />
                <span className="topper-score-badge">97.8%</span>
              </div>
              <div className="topper-card-details">
                <h3 className="topper-card-name">Sneha Kumari</h3>
                <p className="topper-card-exam">CBSE Class X Board Exam 2026</p>
                <div className="topper-card-feat">
                  <FaStar className="feat-icon" /> 99/100 in Social Science &amp; Hindi
                </div>
              </div>
            </div>

            {/* Card 3: Rohan Verma */}
            <div className="topper-top-card rank-3">
              <div className="topper-card-crown">
                <span className="topper-card-rank-tag bronze">🥉 School 3rd Rank</span>
              </div>
              <div className="topper-card-img-wrap">
                <img
                  src="https://i.ibb.co/wFwwXKfb/images.png"
                  alt="Rohan Verma"
                  className="topper-top-img"
                />
                <span className="topper-score-badge">96.4%</span>
              </div>
              <div className="topper-card-details">
                <h3 className="topper-card-name">Rohan Verma</h3>
                <p className="topper-card-exam">CBSE Class X Board Exam 2026</p>
                <div className="topper-card-feat">
                  <FaStar className="feat-icon" /> 98/100 in English &amp; IT
                </div>
              </div>
            </div>
          </div>

          <div className="toppers-top-action">
            <Link to="/examinations" className="toppers-view-all-btn">
              <FaTrophy style={{ marginRight: 8 }} /> View Complete Merit List &amp; Examination Records &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 3. VITAL CAMPUS INFO RIBBON */}
      <section className="home-vital-info-ribbon">
        <div className="home-container">
          <div className="vital-ribbon-grid">
            <div className="vital-ribbon-item">
              <div className="vital-ribbon-icon"><FaClock /></div>
              <div className="vital-ribbon-text">
                <strong>School Timings</strong>
                <span>Summer: 7:30 AM – 1:30 PM<br />Winter: 8:30 AM – 2:30 PM</span>
              </div>
            </div>

            <div className="vital-ribbon-item">
              <div className="vital-ribbon-icon"><FaGraduationCap /></div>
              <div className="vital-ribbon-text">
                <strong>CBSE Affiliated</strong>
                <span>Classes Nursery to Class X<br />NCERT Pattern Curriculum</span>
              </div>
            </div>

            <div className="vital-ribbon-item">
              <div className="vital-ribbon-icon"><FaBus /></div>
              <div className="vital-ribbon-text">
                <strong>15+ Safe Bus Routes</strong>
                <span>GPS Tracked &amp; Attendant Secured<br />Giridih, Naitand &amp; Suburbs</span>
              </div>
            </div>

            <div className="vital-ribbon-item">
              <div className="vital-ribbon-icon"><FaShieldAlt /></div>
              <div className="vital-ribbon-text">
                <strong>Safe &amp; Disciplined Campus</strong>
                <span>150+ HD CCTV Cameras<br />Zero-Tolerance Anti-Bullying</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY STATS AT A GLANCE (IMPACTFUL TRUST COUNTERS) */}
      <section className="home-stats-glance-section" ref={statsRef} id="stats-glance">
        <div className="home-container">
          <div className="home-section-header-centered">
            <span className="home-badge gold">TRUST &amp; PROVEN TRACK RECORD</span>
            <h2 className="home-section-title">Key Stats at a Glance</h2>
            <p className="home-section-subtitle">
              Building lifelong foundations of knowledge, moral character, and CBSE excellence in Giridih.
            </p>
          </div>

          <div className="stats-glance-grid">
            {/* Stat 1: 13+ Years of Excellence */}
            <div className="stats-glance-card">
              <div className="stats-glance-card-glow gold"></div>
              <div className="stats-glance-icon-wrap gold">
                <FaTrophy />
              </div>
              <div className="stats-glance-number gold">
                <AnimatedCounter target={13} suffix="+" isVisible={statsVisible} />
              </div>
              <h3 className="stats-glance-title">Years of Excellence</h3>
              <p className="stats-glance-desc">
                Serving Giridih and surrounding communities since 2013 with academic rigor, discipline, and moral grooming.
              </p>
            </div>

            {/* Stat 2: 2,500+ Enrolled Students */}
            <div className="stats-glance-card">
              <div className="stats-glance-card-glow blue"></div>
              <div className="stats-glance-icon-wrap blue">
                <FaGraduationCap />
              </div>
              <div className="stats-glance-number blue">
                <AnimatedCounter target={2500} suffix="+" isVisible={statsVisible} />
              </div>
              <h3 className="stats-glance-title">Students</h3>
              <p className="stats-glance-desc">
                A thriving co-educational student community from Nursery to Class X learning in a joyful, inspiring atmosphere.
              </p>
              
            </div>

            {/* Stat 3: 100% Board Exam Pass Rate */}
            <div className="stats-glance-card">
              <div className="stats-glance-card-glow green"></div>
              <div className="stats-glance-icon-wrap green">
                <FaCheck />
              </div>
              <div className="stats-glance-number green">
                <AnimatedCounter target={100} suffix="%" isVisible={statsVisible} />
              </div>
              <h3 className="stats-glance-title">Board Exam Pass Rate</h3>
              <p className="stats-glance-desc">
                Consistent 100% CBSE Class X board examination pass results with multiple district toppers scoring up to 98.6%.
              </p>
              
            </div>
          </div>

          {/* Trust Highlights Strip */}
          <div className="stats-glance-strip">
            <div className="stats-strip-item">
              <FaStar className="strip-icon gold" />
              <span>CBSE Affiliation #3430398 • UDISE: 20060105502</span>
            </div>
            <div className="stats-strip-divider"></div>
            <div className="stats-strip-item">
              <FaBus className="strip-icon maroon" />
              <span>15+ GPS-Tracked Bus Routes</span>
            </div>
            <div className="stats-strip-divider"></div>
            <div className="stats-strip-item">
              <FaShieldAlt className="strip-icon blue" />
              <span>150+ HD CCTV Safe Campus</span>
            </div>
            <div className="stats-strip-divider"></div>
            <div className="stats-strip-item">
              <FaCheck className="strip-icon green" />
              <span>1:20 Teacher-Student Ratio</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT & KEY STATS (CLEAN 2-COLUMN STORY) */}
      <section className="home-about-section">
        <div className="home-container">
          <div className="about-stats-grid">
            {/* Left Column: School Story */}
            <div className="about-story-col">
              <span className="home-badge">WELCOME TO LBMDPS</span>
              <h2 className="home-section-title">
                Committed to Excellence in CBSE Education Since 2013
              </h2>
              <p className="home-section-lead">
                Lal Bihari Mahto Divine Public School (LBMDPS), Naitand, is dedicated to cultivating intellectual curiosity, moral leadership, and all-round character development in every child.
              </p>

              <div className="about-highlights-list">
                <div className="highlight-row">
                  <span className="highlight-check"><FaCheck /></span>
                  <div>
                    <strong>CBSE Affiliated Secondary School Curriculum</strong>
                    <p>Rigorous academics from Class 1 to 10 with holistic development.</p>
                  </div>
                </div>
                <div className="highlight-row">
                  <span className="highlight-check"><FaCheck /></span>
                  <div>
                    <strong>Future-Ready STEM &amp; Digital Classrooms</strong>
                    <p>Smart interactive LED boards and specialized AI robotics labs.</p>
                  </div>
                </div>
                <div className="highlight-row">
                  <span className="highlight-check"><FaCheck /></span>
                  <div>
                    <strong>Safe, Disciplined &amp; Values-Driven Environment</strong>
                    <p>24x7 CCTV security, GPS-enabled buses, and pastoral care.</p>
                  </div>
                </div>
              </div>

              <div className="about-cta-row">
                <Link to="/about" className="home-btn primary">
                  Discover Our Story &rarr;
                </Link>
                <Link to="/contact" className="home-btn outline">
                  Book a Campus Visit
                </Link>
              </div>
            </div>

            {/* Right Column: School Campus Showcase Photo */}
            <div className="about-image-column">
              <div className="about-image-frame">
                <img
                  src={schoolCampusImg}
                  alt="Lal Bihari Mahto Divine Public School Campus"
                  className="about-campus-photo"
                  loading="lazy"
                />
                <div className="about-image-overlay">
                  <div className="about-image-caption">
                    <span className="about-image-tag">LBMDPS Campus • Naitand</span>
                    <h4>A Safe, Inspiring Learning Environment</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC WINGS (4 CLEAR PATHWAYS) */}
      <section className="home-wings-section">
        <div className="home-container">
          <div className="home-section-header-centered">
            <span className="home-badge">ACADEMIC EXCELLENCE</span>
            <h2 className="home-section-title">Educational Wings &amp; Programs</h2>
            <p className="home-section-subtitle">
              Progressive, holistic learning tailored for every stage of your child's journey.
            </p>
          </div>

          <div className="wings-grid-4">
            {/* Wing 1 */}
            <div className="wing-card">
              <div className="wing-card-top">
                <span className="wing-icon"><MdChildCare /></span>
                <span className="wing-grade-tag">Nursery – UKG</span>
              </div>
              <h3 className="wing-title">Pre-Primary Wing</h3>
              <p className="wing-desc">
                Play-way experiential learning focusing on sensory skills, phonics, joyful exploration, and gentle socialization.
              </p>
              <Link to="/pre-primary-wing" className="wing-link">
                Explore Pre-Primary &rarr;
              </Link>
            </div>

            {/* Wing 2 */}
            <div className="wing-card">
              <div className="wing-card-top">
                <span className="wing-icon"><FaPencilAlt /></span>
                <span className="wing-grade-tag">Class I – V</span>
              </div>
              <h3 className="wing-title">Primary Wing</h3>
              <p className="wing-desc">
                Building strong foundational literacy, mathematical reasoning, creative thinking, and moral character.
              </p>
              <Link to="/primary-wing" className="wing-link">
                Explore Primary &rarr;
              </Link>
            </div>

            {/* Wing 3 */}
            <div className="wing-card">
              <div className="wing-card-top">
                <span className="wing-icon"><FaFlask /></span>
                <span className="wing-grade-tag">Class VI – VIII</span>
              </div>
              <h3 className="wing-title">Middle Wing</h3>
              <p className="wing-desc">
                Transitioning to in-depth scientific discovery, computer coding, language mastery, and analytical debate.
              </p>
              <Link to="/middle-wing" className="wing-link">
                Explore Middle Wing &rarr;
              </Link>
            </div>

            {/* Wing 4 */}
            <div className="wing-card featured-wing">
              <div className="wing-card-top">
                <span className="wing-icon"><FaGraduationCap /></span>
                <span className="wing-grade-tag gold">Class IX – X</span>
              </div>
              <h3 className="wing-title">Secondary Wing</h3>
              <p className="wing-desc">
                Comprehensive CBSE Class X board examination preparation with foundational science practicals, mathematics workshops, and career orientation.
              </p>
              <Link to="/secondary-wing" className="wing-link">
                Explore Secondary Wing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ADMISSION 2026-27: 4-STEP ENROLLMENT PROCESS */}
      <section className="home-process-section">
        <div className="home-container">
          <div className="home-section-header-centered">
            <span className="home-badge">ADMISSION JOURNEY 2026-27</span>
            <h2 className="home-section-title">Enrolling at LBMDPS in 4 Simple Steps</h2>
            <p className="home-section-subtitle">
              A seamless, transparent, and parent-friendly admission process designed for your convenience.
            </p>
          </div>

          <div className="admission-steps-grid">
            <div className="admission-step-card">
              <div className="step-card-header">
                <span className="step-number-badge">Step 01</span>
                <span className="step-icon-wrap"><FaClipboard /></span>
              </div>
              <h3>Registration &amp; Inquiry</h3>
              <p>Submit our simple online inquiry form or collect the prospectus registration kit from our school admission office.</p>
            </div>

            <div className="admission-step-card">
              <div className="step-card-header">
                <span className="step-number-badge">Step 02</span>
                <span className="step-icon-wrap"><FaBook /></span>
              </div>
              <h3>Friendly Interaction</h3>
              <p>An informal, age-appropriate conversation to understand the child's interests, learning pace, and foundational skills.</p>
            </div>

            <div className="admission-step-card">
              <div className="step-card-header">
                <span className="step-number-badge">Step 03</span>
                <span className="step-icon-wrap"><FaCheck /></span>
              </div>
              <h3>Document Verification</h3>
              <p>Simple submission of birth certificate, previous school transfer certificate (TC), Aadhar copy, and passport photographs.</p>
            </div>

            <div className="admission-step-card">
              <div className="step-card-header">
                <span className="step-number-badge">Step 04</span>
                <span className="step-icon-wrap"><FaGraduationCap /></span>
              </div>
              <h3>Welcome Kit &amp; Induction</h3>
              <p>Receive your admission confirmation, student diary, booklist, uniform guidelines, bus route allocation, and orientation date.</p>
            </div>
          </div>

          <div className="process-cta-banner">
            <div className="process-cta-text">
              <h4>Ready to begin your child's transformative educational journey?</h4>
              <p>Admissions are currently open for Pre-Nursery, Nursery, LKG, UKG, and Classes 1 to 9 &amp; 10.</p>
            </div>
            <div className="process-btn-group">
              <Link 
                to="/admissions" 
                className="process-apply-btn"
              >
                Apply for Admission &rarr;
              </Link>
              <Link to="/fee-structure" className="process-fee-link">
                View Session Fees
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CAMPUS FACILITIES (FOCUSED 6 PILLARS) */}
      <section className="home-facilities-section">
        <div className="home-container">
          <div className="home-section-header-centered">
            <span className="home-badge">CAMPUS INFRASTRUCTURE</span>
            <h2 className="home-section-title">World-Class Learning Facilities</h2>
            <p className="home-section-subtitle">
              Designed to inspire creativity, support scientific curiosity, and ensure student safety.
            </p>
          </div>

          <div className="facilities-grid-6">
            <div className="facility-card">
              <div className="facility-icon-circle blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h4>Smart Classrooms</h4>
              <p>High-resolution interactive digital panels with multimedia audiovisual lessons.</p>
              <Link to="/smart-classrooms" className="facility-link">Learn More &rarr;</Link>
            </div>

            <div className="facility-card">
              <div className="facility-icon-circle green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v7.31L4.1 20.3a2 2 0 0 0 1.7 2.7h12.4a2 2 0 0 0 1.7-2.7L14 9.31V2"></path>
                  <line x1="8.5" y1="2" x2="15.5" y2="2"></line>
                </svg>
              </div>
              <h4>Science Laboratories</h4>
              <p>Fully equipped Physics, Chemistry, Biology, and STEM experiment workstations.</p>
              <Link to="/science-laboratories" className="facility-link">Learn More &rarr;</Link>
            </div>

            <div className="facility-card">
              <div className="facility-icon-circle purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h4>Central Library</h4>
              <p>10,000+ reference volumes, encyclopedias, national journals, and quiet reading areas.</p>
              <Link to="/library" className="facility-link">Learn More &rarr;</Link>
            </div>

            <div className="facility-card">
              <div className="facility-icon-circle amber">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h4>Sports &amp; Athletics</h4>
              <p>Cricket turf, basketball court, athletics track, and certified sports coaches.</p>
              <Link to="/playground-sports" className="facility-link">Learn More &rarr;</Link>
            </div>

            <div className="facility-card">
              <div className="facility-icon-circle teal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h4>Safe GPS Transport</h4>
              <p>Dedicated fleet of GPS-tracked school buses covering Giridih and surrounding routes.</p>
              <Link to="/transportation" className="facility-link">Learn More &rarr;</Link>
            </div>

            <div className="facility-card">
              <div className="facility-icon-circle red">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h4>Campus Safety &amp; CCTV</h4>
              <p>24x7 security monitoring with high-resolution CCTV cameras and gated access.</p>
              <Link to="/cctv-security" className="facility-link">Learn More &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LEADERSHIP DESK & GUIDING PHILOSOPHY */}
      <section className="home-leadership-section">
        <div className="home-container">
          <div className="leadership-split-grid">
            {/* Principal Card */}
            <div className="principal-card-box">
              <span className="home-badge">LEADERSHIP MESSAGE</span>
              <div className="principal-profile-row">
                <img src="https://i.ibb.co/wFwwXKfb/images.png" alt="Principal H. P. Verma" className="principal-avatar" />
                <div>
                  <h3 className="principal-name">H. P. Verma</h3>
                  <span className="principal-title">Principal, M.Sc., B.Ed.</span>
                  <span className="principal-badge">Estd. 2013</span>
                </div>
              </div>
              <blockquote className="principal-quote">
                "At Lal Bihari Mahto Divine Public School, education is not merely about syllabus marks; it is about building compassionate character, humility, and self-confidence. Our motto <em>'Vidya Dadati Vinayam'</em> inspires every child to excel with grace."
              </blockquote>
              <div className="principal-actions">
                <Link to="/directors-message" className="read-more-btn">
                  Read Full Message &rarr;
                </Link>
                <Link to="/contact" className="contact-desk-btn">
                  Contact Office
                </Link>
              </div>
            </div>

            {/* Vision & Core Commitments Card */}
            <div className="vision-commitments-box">
              <span className="home-badge gold">OUR GUIDING PRINCIPLES</span>
              <h3>Academic Integrity &amp; Child-Centric Values</h3>
              <p className="vision-lead">
                Aligned with the National Education Policy (NEP 2020), our learning framework balances modern intellect with timeless moral rootedness:
              </p>
              <div className="commitments-list">
                <div className="commitment-item">
                  <span className="commitment-icon"><FaCheck /></span>
                  <span><strong>Individualized Mentorship:</strong> 1:20 teacher-student ratio ensuring personalized guidance and attention.</span>
                </div>
                <div className="commitment-item">
                  <span className="commitment-icon"><FaCheck /></span>
                  <span><strong>Remedial Support:</strong> Free after-school doubt sessions and extra classes for board exam candidates.</span>
                </div>
                <div className="commitment-item">
                  <span className="commitment-icon"><FaCheck /></span>
                  <span><strong>Zero Compromise Safety:</strong> Gated campus, POCSO child protection committee, and strict anti-bullying enforcement.</span>
                </div>
              </div>
              <div className="principal-actions">
                <Link to="/mission-vision" className="read-more-btn">
                  Mission &amp; Vision &rarr;
                </Link>
                <Link to="/rules-regulations" className="contact-desk-btn">
                  Code of Conduct
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section className="home-faq-section">
        <div className="home-container">
          <div className="home-section-header-centered">
            <span className="home-badge">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="home-section-title">Clarifying Questions About LBMDPS</h2>
            <p className="home-section-subtitle">
              Everything parents need to know about admissions, CBSE curriculum, bus transport, and safety standards.
            </p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-accordion-item ${activeFaq === idx ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={activeFaq === idx}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon-toggle">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="faq-answer-panel">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
