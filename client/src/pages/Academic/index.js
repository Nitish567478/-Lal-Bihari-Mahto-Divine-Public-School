import { FaGraduationCap, FaBook, FaStar, FaPencilAlt, FaFlask, FaCheck, FaTrophy, FaClipboard, FaMusic } from 'react-icons/fa';
import React from 'react';
import { MdChildCare } from "react-icons/md";
import { Link } from 'react-router-dom';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer';
import campusFo from '../../components/AllImage/campus/fo.webp';
import './index.css';

const Academic = () => {
  return (
    <div className="academic-page-root">
      <Header />

      {/* 1. HERO BANNER */}
      <section className="academic-hero">
        <div className="academic-container">
          <div className="academic-hero-inner">
            <span className="academic-hero-badge">
              <FaGraduationCap /> CBSE AFFILIATED CURRICULUM (CLASSES 1 TO 10)
            </span>
            <h1 className="academic-hero-title">Academic Programs & Curriculum</h1>
            <p className="academic-hero-lead">
              A balanced, experiential, and progressive learning journey from Pre-Nursery to Class 10 at Lal Bihari Mahto Divine Public School, Naitand. Designed to cultivate intellectual curiosity, scientific reasoning, and enduring values.
            </p>
            <div className="academic-quick-links">
              <a href="#wings" className="hero-pill-link">Academic Wings</a>
              <a href="#subjects" className="hero-pill-link">Subject Areas</a>
              <a href="#assessment" className="hero-pill-link">Examination Policy</a>
              <Link to="/admissions" className="hero-pill-link highlight">Admissions 2026-27 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 ACADEMIC WINGS (NO AGES, NO CLASS 11/12) */}
      <section id="wings" className="academic-wings-section">
        <div className="academic-container">
          <div className="academic-section-header">
            <span className="academic-sub-badge">LEARNING PATHWAYS</span>
            <h2 className="academic-section-title">Educational Wings & Programs</h2>
            <p className="academic-section-subtitle">
              Structured developmental stages tailored for continuous academic excellence from early childhood through the Class X Board examinations.
            </p>
          </div>

          <div className="wings-cards-grid">
            {/* Wing 1: Pre-Primary */}
            <div className="wing-display-card">
              <div className="wing-card-topbar">
                <div className="wing-icon-circle red-bg"><MdChildCare /></div>
                <span className="wing-class-tag">Pre-Nursery – UKG</span>
              </div>
              <h3 className="wing-card-title">Pre-Primary Wing</h3>
              <p className="wing-card-desc">
                Joyful Montessori play-way learning fostering sensory perception, phonics, foundational numeracy, and gentle socialization.
              </p>
              <ul className="wing-features-list">
                <li><span><FaCheck /></span> Montessori Sensory Play & Games</li>
                <li><span><FaCheck /></span> Phonics, Rhymes & Sound Roots</li>
                <li><span><FaCheck /></span> Fun with Numbers & Geometric Shapes</li>
                <li><span><FaCheck /></span> Clay Modeling, Origami & Coloring</li>
                <li><span><FaCheck /></span> Dedicated Junior Play Area</li>
                <li><span><FaCheck /></span> 1:15 Mother-Teacher Care Ratio</li>
              </ul>
              <Link to="/pre-primary-wing" className="wing-action-btn">
                Explore Pre-Primary Wing &rarr;
              </Link>
            </div>

            {/* Wing 2: Primary */}
            <div className="wing-display-card">
              <div className="wing-card-topbar">
                <div className="wing-icon-circle blue-bg"><FaPencilAlt /></div>
                <span className="wing-class-tag">Class I – V</span>
              </div>
              <h3 className="wing-card-title">Primary Wing</h3>
              <p className="wing-card-desc">
                Building strong foundational literacy, mathematical reasoning, environmental consciousness, and creative self-expression.
              </p>
              <ul className="wing-features-list">
                <li><span><FaCheck /></span> English, Hindi & Sanskrit (Class 5)</li>
                <li><span><FaCheck /></span> Mathematics & Environmental Science (EVS)</li>
                <li><span><FaCheck /></span> Computer Literacy & Scratch Coding</li>
                <li><span><FaCheck /></span> Physical Education, Yoga & Sports</li>
                <li><span><FaCheck /></span> Creative Arts, Craft & Storytelling</li>
                <li><span><FaCheck /></span> Continuous Comprehensive Evaluation</li>
              </ul>
              <Link to="/primary-wing" className="wing-action-btn">
                Explore Primary Wing &rarr;
              </Link>
            </div>

            {/* Wing 3: Middle */}
            <div className="wing-display-card">
              <div className="wing-card-topbar">
                <div className="wing-icon-circle green-bg"><FaFlask /></div>
                <span className="wing-class-tag">Class VI – VIII</span>
              </div>
              <h3 className="wing-card-title">Middle Wing</h3>
              <p className="wing-card-desc">
                Transitioning toward rigorous analytical inquiry, laboratory sciences, computer programming, and inter-house scholastic competitions.
              </p>
              <ul className="wing-features-list">
                <li><span><FaCheck /></span> Physics, Chemistry & Biology Labs</li>
                <li><span><FaCheck /></span> Advanced Arithmetic & Pre-Algebra</li>
                <li><span><FaCheck /></span> Python Coding & Computer Workshops</li>
                <li><span><FaCheck /></span> History, Geography & Civics In-Depth</li>
                <li><span><FaCheck /></span> Three-Language Proficiency Model</li>
                <li><span><FaCheck /></span> Science Olympiads & Quiz Competitions</li>
              </ul>
              <Link to="/middle-wing" className="wing-action-btn">
                Explore Middle Wing &rarr;
              </Link>
            </div>

            {/* Wing 4: Secondary */}
            <div className="wing-display-card featured">
              <div className="wing-card-topbar">
                <div className="wing-icon-circle gold-bg"><FaGraduationCap /></div>
                <span className="wing-class-tag gold">Class IX – X</span>
              </div>
              <h3 className="wing-card-title">Secondary Wing</h3>
              <p className="wing-card-desc">
                Intensive CBSE Class X Board examination preparation with rigorous subject mastery, laboratory practicals, and future career mentorship.
              </p>
              <ul className="wing-features-list">
                <li><span><FaCheck /></span> CBSE Class X Board Syllabus Mastery</li>
                <li><span><FaCheck /></span> Advanced Science Laboratory Practicals</li>
                <li><span><FaCheck /></span> Mathematics Problem-Solving Clinics</li>
                <li><span><FaCheck /></span> Three Full-Length Pre-Board Test Series</li>
                <li><span><FaCheck /></span> Previous 10 Years Question Paper Drills</li>
                <li><span><FaCheck /></span> Personalized Remedial Mentorship</li>
              </ul>
              <Link to="/secondary-wing" className="wing-action-btn">
                Explore Secondary Wing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SUBJECT DOMAINS */}
      <section id="subjects" className="academic-subjects-section">
        <div className="academic-container">
          <div className="academic-section-header">
            <span className="academic-sub-badge">ACADEMIC DISCIPLINES</span>
            <h2 className="academic-section-title">Comprehensive Subject Curriculum</h2>
            <p className="academic-section-subtitle">
              Strictly aligned with CBSE and NCERT pedagogical guidelines to foster intellectual curiosity and practical application.
            </p>
          </div>

          <div className="subjects-grid-8">
            <div className="subject-box">
              <div className="subject-icon blue"><FaFlask /></div>
              <h4>Sciences</h4>
              <p>Experiential Physics, Chemistry, and Biology supported by hands-on weekly practical sessions in certified laboratories.</p>
            </div>

            <div className="subject-box">
              <div className="subject-icon green">📐</div>
              <h4>Mathematics</h4>
              <p>Conceptual arithmetic, algebra, coordinate geometry, mensuration, and structured problem-solving drills.</p>
            </div>

            <div className="subject-box">
              <div className="subject-icon purple">🗣️</div>
              <h4>Languages</h4>
              <p>English Core, Hindi Sahitya, and Sanskrit focusing on grammar fundamentals, elocution, creative writing, and comprehension.</p>
            </div>

            <div className="subject-box">
              <div className="subject-icon amber">🌍</div>
              <h4>Social Sciences</h4>
              <p>Indian and World History, Physical and Economic Geography, Democratic Politics, and Disaster Management.</p>
            </div>

            <div className="subject-box">
              <div className="subject-icon teal">💻</div>
              <h4>Computer & IT</h4>
              <p>Digital literacy, computer operations, Scratch animation, Python basics, and responsible internet safety.</p>
            </div>

            <div className="subject-box">
              <div className="subject-icon red"><FaStar /></div>
              <h4>Arts & Craft</h4>
              <p>Freehand drawing, watercolor painting, clay sculpture, origami, and traditional Indian folk arts.</p>
            </div>

            <div className="subject-box">
              <div className="subject-icon indigo"><FaMusic /></div>
              <h4>Music & Cultural Arts</h4>
              <p>Vocal music, harmonium, tabla, keyboard basics, patriotic choir singing, and annual stage performances.</p>
            </div>

            <div className="subject-box">
              <div className="subject-icon orange">🏃</div>
              <h4>Sports & Physical Education</h4>
              <p>Daily morning yoga, cricket turf practice, basketball, badminton, taekwondo martial arts, and track athletics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ASSESSMENT & EVALUATION FRAMEWORK */}
      <section id="assessment" className="academic-assessment-section">
        <div className="academic-container">
          <div className="assessment-split-grid">
            {/* Left Column: Evaluation Framework */}
            <div className="assessment-info-col">
              <span className="academic-sub-badge">EVALUATION SYSTEM</span>
              <h2 className="academic-section-title">Assessment & Examination Policy</h2>
              <p className="assessment-intro-p">
                We implement a transparent, continuous, and formative evaluation framework aligned with CBSE standards, ensuring that every learner receives timely feedback to excel.
              </p>

              <div className="assessment-steps-list">
                <div className="assessment-step-card">
                  <div className="step-icon-box green"><FaBook /></div>
                  <div>
                    <h4>Continuous Assessment (CCE)</h4>
                    <p>Regular homework review, weekly class quizzes, oral viva, project files, and classroom participation tracking.</p>
                  </div>
                </div>

                <div className="assessment-step-card">
                  <div className="step-icon-box blue"><FaClipboard /></div>
                  <div>
                    <h4>Periodic Tests (PT-1 & PT-2)</h4>
                    <p>Structured mid-term unit evaluations assessing chapter-wise conceptual retention and writing clarity.</p>
                  </div>
                </div>

                <div className="assessment-step-card">
                  <div className="step-icon-box purple"><FaTrophy /></div>
                  <div>
                    <h4>CBSE Class X Pre-Board Series</h4>
                    <p>Strict 3-hour mock board simulations for Class 10 candidates under exact CBSE board examination guidelines.</p>
                  </div>
                </div>

                <div className="assessment-step-card">
                  <div className="step-icon-box amber">👨‍👩‍👦</div>
                  <div>
                    <h4>Parent-Teacher Consultations (PTM)</h4>
                    <p>Constructive one-on-one progress review meetings after every term assessment to discuss student growth.</p>
                  </div>
                </div>
              </div>

              <div className="assessment-cta-link-wrap">
                <Link to="/examinations" className="assessment-deep-link">
                  View Detailed Examination Schedule & Grading Guidelines &rarr;
                </Link>
              </div>
            </div>

            {/* Right Column: Campus Illustration & Academic Highlights */}
            <div className="assessment-visual-col">
              <div className="assessment-card-wrapper">
                <div className="assessment-image-box">
                  <img src={campusFo} alt="LBMDPS Academic Campus" />
                  <div className="image-overlay-badge">
                    <span><FaStar /> CBSE Affiliation No: 3430398 • UDISE Code: 20060105502</span>
                  </div>
                </div>

                <div className="academic-key-pillars-box">
                  <h4 className="pillars-box-title">Academic Milestones & Standards</h4>
                  <div className="pillars-mini-grid">
                    <div className="pillar-metric">
                      <span className="p-num">100%</span>
                      <span className="p-label">CBSE Pass Rate</span>
                    </div>
                    <div className="pillar-metric">
                      <span className="p-num">1:25</span>
                      <span className="p-label">Teacher-Student Ratio</span>
                    </div>
                    <div className="pillar-metric">
                      <span className="p-num">10+</span>
                      <span className="p-label">Academic Wings & Labs</span>
                    </div>
                    <div className="pillar-metric">
                      <span className="p-num">Class 1-10</span>
                      <span className="p-label">Secondary Affiliation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ADMISSIONS CALL TO ACTION */}
      <section className="academic-cta-section">
        <div className="academic-container">
          <div className="academic-cta-banner">
            <div className="academic-cta-text">
              <span className="academic-cta-badge">ADMISSIONS OPEN FOR SESSION 2026-2027</span>
              <h3>Give Your Child the Foundation for a Lifetime of Success</h3>
              <p>
                Enrollment is actively open from Pre-Nursery to Class 10. Visit our campus in Naitand, Giridih, or apply online today.
              </p>
            </div>
            <div className="academic-cta-actions">
              <Link to="/admissions" className="cta-btn-gold">
                Apply Online Now &rarr;
              </Link>
              <Link to="/fee-structure" className="cta-btn-ghost">
                View Fee Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Academic;
