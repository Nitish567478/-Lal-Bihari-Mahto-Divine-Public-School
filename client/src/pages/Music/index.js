import React, { useState } from 'react';
import {
  FaMusic, FaMicrophone,
  FaTrophy, FaCalendarAlt, FaCheck,
  FaTimes, FaStar,
  FaUsers, FaGraduationCap
} from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.css';

const programsData = [
  {
    id: 'vocal',
    title: 'School Choir & Vocal Music',
    icon: <FaMicrophone />,
    badge: 'Indian & Western Vocal',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    description: 'Mastery over Classical Indian Ragas, Devotional Bhajans, Patriotic Anthems, and Polyphonic Western Choirs.',
    curriculum: ['Sur & Taal Fundamentals', 'Morning Assembly Choir Leads', 'State & CBSE Youth Festival Prep', 'Microphone & Stage Acoustics']
  },
  {
    id: 'instrumental',
    title: 'Instrumental Symphony & Brass Band',
    icon: <FaMusic />,
    badge: 'Orchestra & Marching Band',
    image: 'https://images.unsplash.com/photo-1511192336575-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive practical training in classical percussion, stringed instruments, keyed synthesizers, and school brass band.',
    curriculum: ['Tabla, Dholak & Congo Rhythms', 'Harmonium & Digital Synthesizer', 'Acoustic Guitar Chords & Picking', 'Marching Brass & Bugle Ensemble']
  },
  {
    id: 'dance',
    title: 'Classical & Regional Folk Dance',
    icon: <FaStar />,
    badge: 'Kathak & Folk Heritage',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    description: 'Expressive mudras, rhythmic footwork, and stage grace celebrating Kathak, Bharatnatyam, and regional Jharkhand folk arts.',
    curriculum: ['Kathak Tatkar & Hastak Techniques', 'Regional Jhumar & Chhau Folk Forms', 'Annual Day Mega Dance Dramas', 'Choreography & Expressions (Abhinaya)']
  },
  {
    id: 'arts',
    title: 'Visual Arts & Creative Studio',
    icon: <FaGraduationCap />,
    badge: 'Fine Arts & Craft',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    description: 'Nurturing visual imagination with oil on canvas, watercolor painting, clay pottery modeling, and modern graphic sketching.',
    curriculum: ['Color Theory & Shading Techniques', 'Clay Modeling & Traditional Pottery', 'Annual Art & Craft Expo Exhibition', 'Eco-friendly Art from Waste Projects']
  }
];

const instrumentsData = [
  {
    id: 'harmonium',
    name: 'Classical Harmonium & Keyboard',
    category: 'Keyed',
    image: 'https://images.unsplash.com/photo-1520523839898-5071282543e1?auto=format&fit=crop&w=700&q=80',
    desc: 'Swara training, classical ragas, and multi-octave accompaniment for school prayers and vocal solos.',
    level: 'Beginner to Advanced'
  },
  {
    id: 'tabla',
    name: 'Tabla & Indian Dholak',
    category: 'Percussion',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=700&q=80',
    desc: 'Teentaal, Keherwa, and Dadra rhythmic cycles with finger precision and dynamic acoustic resonance.',
    level: 'All Grades'
  },
  {
    id: 'guitar',
    name: 'Acoustic & Electric Guitars',
    category: 'Strings',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=700&q=80',
    desc: 'Chord progressions, rhythmic strumming, fingerstyle picking, and lead accompaniment in school bands.',
    level: 'Middle & Senior Wing'
  },
  {
    id: 'brass',
    name: 'School Brass & Marching Bugles',
    category: 'Wind',
    image: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=700&q=80',
    desc: 'Ceremonial parade anthems, bugle salutes, and synchronized brass tunes for national festivals.',
    level: 'School Band Troops'
  },
  {
    id: 'synthesizer',
    name: 'Digital Workstation & Synthesizers',
    category: 'Keyed',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=700&q=80',
    desc: 'Modern electronic sound design, MIDI sequencing, and multi-track backing scores.',
    level: 'Senior Symphony'
  },
  {
    id: 'drums',
    name: 'Acoustic Drum Kit & Congos',
    category: 'Percussion',
    image: 'https://images.unsplash.com/photo-1543791107-6c2e39130097?auto=format&fit=crop&w=700&q=80',
    desc: 'Tempo regulation, rock beats, syncopated jazz patterns, and live stage dynamics.',
    level: 'House Band Leaders'
  }
];

const culturalMentors = [
  {
    name: 'Pt. Rameshwar Mishra',
    role: 'Head of Indian Classical Vocal & Choir',
    exp: '18+ Years Experience',
    qualification: 'Sangeet Visharad (Gwalior Gharana)',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=350&q=80'
  },
  {
    name: 'Vidushi Sunita Sharma',
    role: 'Classical Kathak & Folk Dance Acharya',
    exp: '14+ Years Experience',
    qualification: 'Nritya Praveen (Kathak Kendra, Lucknow)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=350&q=80'
  },
  {
    name: 'Mr. Arvind Roy',
    role: 'Instrumental Band Director & Sound Mentor',
    exp: '12+ Years Experience',
    qualification: 'Trinity College of Music (Grade 8 Certification)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=350&q=80'
  }
];

const annualEvents = [
  {
    title: 'Sur-Sangam: Annual Music & Dance Fest',
    month: 'December',
    badge: 'Grand Stage',
    desc: 'Over 400 students take center stage showcasing classical symphonies, tribal dance dramas, and choir anthems.'
  },
  {
    title: 'Republic & Independence Day Parade Bands',
    month: 'August / January',
    badge: 'Ceremonial',
    desc: 'Flawless 4-house brass band drill, live bugle fanfares, and state-honored patriotic choir performances.'
  },
  {
    title: 'Saraswati Vandana Classical Recital',
    month: 'Basant Panchami',
    badge: 'Devotional',
    desc: 'Special morning raga offerings, veena-harmonium jugalbandi, and invocation of the Goddess of Wisdom.'
  },
  {
    title: 'Inter-House Rhythmic & Folk Contest',
    month: 'October',
    badge: 'Championship',
    desc: 'Fierce yet harmonious competition across Tagore, Gandhi, Kalam, and Raman houses for the Cultural Trophy.'
  }
];

const Music = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollForm, setEnrollForm] = useState({
    studentName: '',
    classGrade: 'Class 6',
    discipline: 'Vocal Music & Choir',
    contactNumber: '',
    priorExperience: 'Beginner'
  });
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const filteredInstruments =
    activeCategory === 'All'
      ? instrumentsData
      : instrumentsData.filter((i) => i.category === activeCategory);

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    if (!enrollForm.studentName || !enrollForm.contactNumber) {
      alert('Please fill out student name and contact number.');
      return;
    }
    setEnrollSuccess(true);
    setTimeout(() => {
      setEnrollSuccess(false);
      setShowEnrollModal(false);
      setEnrollForm({
        studentName: '',
        classGrade: 'Class 6',
        discipline: 'Vocal Music & Choir',
        contactNumber: '',
        priorExperience: 'Beginner'
      });
      alert('Application received! The Cultural Wing coordinator will schedule your audition.');
    }, 1500);
  };

  return (
    <div className="music-page-wrapper">
      <Header />

      {/* 1. HERO BANNER */}
      <section className="music-hero-hero">
        <div className="music-hero-bg-overlay"></div>
        <div className="music-hero-container">
          <div className="music-hero-badge">
            <FaMusic className="pulse-icon" /> LBMDPS CULTURAL &amp; PERFORMING ARTS ACADEMY
          </div>
          <h1 className="music-hero-title">
            Harmonizing Minds, Inspiring <span className="text-highlight-gold">Creative Excellence</span>
          </h1>
          <p className="music-hero-subtitle">
            At Lal Bihari Mahto Divine Public School, melody, rhythm, and classical Indian arts form the very soul of our holistic pedagogy. We nurture every child’s creative genius from early swaras to grand stage symphonies.
          </p>

          <div className="music-hero-stats-bar">
            <div className="hero-stat-pill">
              <strong>4+</strong>
              <span>Disciplines</span>
            </div>
            <div className="hero-stat-pill">
              <strong>25+</strong>
              <span>Instruments</span>
            </div>
            <div className="hero-stat-pill">
              <strong>100%</strong>
              <span>Student Exposure</span>
            </div>
            <div className="hero-stat-pill">
              <strong>35+</strong>
              <span>State &amp; District Awards</span>
            </div>
          </div>

          <div className="music-hero-actions">
            <button className="music-btn-primary" onClick={() => setShowEnrollModal(true)}>
              <FaUsers style={{ marginRight: 8 }} /> Join Cultural Club &amp; Band
            </button>
            <button className="music-btn-secondary" onClick={() => {
              const el = document.getElementById('disciplines-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <FaMusic style={{ marginRight: 8 }} /> Explore Cultural Disciplines
            </button>
          </div>
        </div>
      </section>

      {/* 2. FOUR CORE CULTURAL DISCIPLINES */}
      <section className="music-disciplines-section" id="disciplines-section">
        <div className="music-main-container">
          <div className="music-section-heading">
            <span className="music-subtag">TRAINING CURRICULUM</span>
            <h2>Our Four Pillars of Cultural Arts</h2>
            <p>From vocal acoustics and traditional instruments to classical dance and fine arts.</p>
          </div>

          <div className="disciplines-cards-grid">
            {programsData.map((item) => (
              <div className="discipline-card" key={item.id}>
                <div className="discipline-img-wrapper">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="discipline-tag-badge">{item.badge}</span>
                </div>
                <div className="discipline-body">
                  <div className="discipline-icon-header">
                    <div className="icon-circle">{item.icon}</div>
                    <h3>{item.title}</h3>
                  </div>
                  <p className="discipline-desc">{item.description}</p>
                  <div className="curriculum-checklist">
                    <strong>Key Highlights &amp; Skills:</strong>
                    <ul>
                      {item.curriculum.map((c, i) => (
                        <li key={i}>
                          <FaCheck className="check-bullet" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INSTRUMENTS SHOWCASE & MUSIC LAB */}
      <section className="instruments-gallery-section">
        <div className="music-main-container">
          <div className="music-section-heading">
            <span className="music-subtag">MUSIC LAB INFRASTRUCTURE</span>
            <h2>State-of-the-Art Instruments Arena</h2>
            <p>Dedicated weekly hands-on practical lab sessions for every student with professional-grade instruments.</p>

            {/* Category Filter Pills */}
            <div className="instrument-filter-tabs">
              {['All', 'Keyed', 'Percussion', 'Strings', 'Wind'].map((cat) => (
                <button
                  key={cat}
                  className={`cat-pill-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="instruments-card-grid">
            {filteredInstruments.map((inst) => (
              <div className="instrument-card-item" key={inst.id}>
                <div className="inst-image-box">
                  <img src={inst.image} alt={inst.name} loading="lazy" />
                  <span className="inst-category-pill">{inst.category}</span>
                </div>
                <div className="inst-card-content">
                  <h4>{inst.name}</h4>
                  <p className="inst-card-desc">{inst.desc}</p>
                  <div className="inst-footer-meta">
                    <span className="inst-level-badge">
                      <FaGraduationCap style={{ marginRight: 5 }} /> {inst.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GURU & MENTORS SPOTLIGHT */}
      <section className="cultural-faculty-section">
        <div className="music-main-container">
          <div className="music-section-heading">
            <span className="music-subtag">ESTEEMED GURUS &amp; FACULTY</span>
            <h2>Guided by Renowned Cultural Masters</h2>
            <p>Our dedicated music and performing arts teachers bring decades of traditional lineage and pedagogical excellence.</p>
          </div>

          <div className="faculty-cards-grid">
            {culturalMentors.map((mentor, idx) => (
              <div className="faculty-mentor-card" key={idx}>
                <div className="mentor-avatar-wrap">
                  <img src={mentor.image} alt={mentor.name} />
                  <span className="mentor-exp-tag">{mentor.exp}</span>
                </div>
                <div className="mentor-info-box">
                  <h3>{mentor.name}</h3>
                  <p className="mentor-role">{mentor.role}</p>
                  <div className="mentor-qual">{mentor.qualification}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ANNUAL CULTURAL CALENDAR & ACHIEVEMENTS */}
      <section className="events-achievements-section">
        <div className="music-main-container">
          <div className="events-achievements-duo">
            {/* Left: Events Timeline */}
            <div className="events-timeline-col">
              <span className="music-subtag">STAGE SPOTLIGHTS</span>
              <h3 className="section-col-title">Annual Cultural Celebrations</h3>
              <div className="events-list-vertical">
                {annualEvents.map((ev, i) => (
                  <div className="event-timeline-item" key={i}>
                    <div className="event-month-badge">
                      <FaCalendarAlt className="cal-icon" />
                      <span>{ev.month}</span>
                    </div>
                    <div className="event-item-info">
                      <div className="event-tag-small">{ev.badge}</div>
                      <h4>{ev.title}</h4>
                      <p>{ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Accolades & Trophies Box */}
            <div className="achievements-showcase-col">
              <div className="trophy-spotlight-card">
                <div className="trophy-header-icon">
                  <FaTrophy />
                </div>
                <span className="trophy-badge">STATE &amp; CBSE ACCOLADES</span>
                <h3>Championships &amp; Honors</h3>
                <p>
                  LBMDPS choir and dance troupes regularly secure top positions in Inter-School District Youth Festivals, State Republic Day Parades, and CBSE Sahodaya Competitions.
                </p>

                <div className="accolades-pills-list">
                  <div className="accolade-pill">
                    <FaStar className="gold-star" /> 1st Prize — District Inter-School Patriotic Choir (2025-26)
                  </div>
                  <div className="accolade-pill">
                    <FaStar className="gold-star" /> Best Marching Brass Band — Independence Day Parade
                  </div>
                  <div className="accolade-pill">
                    <FaStar className="gold-star" /> Gold Trophy — State Folk Dance Drama Championship
                  </div>
                  <div className="accolade-pill">
                    <FaStar className="gold-star" /> All-India CBSE National Painting Exhibition Selection
                  </div>
                </div>

                <div className="cta-audition-box">
                  <h4>Want your child to discover their artistic rhythm?</h4>
                  <button className="audition-btn" onClick={() => setShowEnrollModal(true)}>
                    Register for Music &amp; Dance Club &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ENROLLMENT MODAL */}
      {showEnrollModal && (
        <div className="music-modal-overlay" onClick={() => setShowEnrollModal(false)}>
          <div className="music-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="music-modal-header">
              <div>
                <span className="modal-badge-tag">CLUB AUDITION &amp; ENROLLMENT</span>
                <h3>Register for Cultural Academy</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setShowEnrollModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleEnrollSubmit} className="enroll-modal-form">
              <label>
                Student Name *
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Kumar"
                  value={enrollForm.studentName}
                  onChange={(e) => setEnrollForm({ ...enrollForm, studentName: e.target.value })}
                />
              </label>

              <div className="form-row-2">
                <label>
                  Class / Grade *
                  <select
                    value={enrollForm.classGrade}
                    onChange={(e) => setEnrollForm({ ...enrollForm, classGrade: e.target.value })}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={`Class ${i + 1}`}>
                        Class {i + 1}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Preferred Discipline *
                  <select
                    value={enrollForm.discipline}
                    onChange={(e) => setEnrollForm({ ...enrollForm, discipline: e.target.value })}
                  >
                    <option value="Vocal Music & Choir">Vocal Music &amp; Choir</option>
                    <option value="Instrumental Symphony (Harmonium/Tabla/Guitar)">
                      Instrumental (Harmonium / Tabla / Guitar)
                    </option>
                    <option value="School Brass Band & Bugle">School Brass Band &amp; Bugle</option>
                    <option value="Classical Kathak & Folk Dance">Classical Kathak &amp; Folk Dance</option>
                    <option value="Fine Arts, Painting & Pottery">Fine Arts, Painting &amp; Pottery</option>
                  </select>
                </label>
              </div>

              <div className="form-row-2">
                <label>
                  Parent Mobile / WhatsApp *
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={enrollForm.contactNumber}
                    onChange={(e) =>
                      setEnrollForm({ ...enrollForm, contactNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })
                    }
                  />
                </label>

                <label>
                  Prior Experience
                  <select
                    value={enrollForm.priorExperience}
                    onChange={(e) => setEnrollForm({ ...enrollForm, priorExperience: e.target.value })}
                  >
                    <option value="Beginner (New Learner)">Beginner (New Learner)</option>
                    <option value="Intermediate (Some Training)">Intermediate (Some Training)</option>
                    <option value="Advanced / Performer">Advanced / Performer</option>
                  </select>
                </label>
              </div>

              <div className="modal-form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEnrollModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-enroll">
                  {enrollSuccess ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Music;
