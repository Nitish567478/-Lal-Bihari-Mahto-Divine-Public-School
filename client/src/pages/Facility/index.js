import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  FaChalkboardTeacher, 
  FaBook, 
  FaDesktop, 
  FaFlask, 
  FaFutbol, 
  FaPalette, 
  FaUsers, 
  FaBed, 
  FaBus, 
  FaShieldAlt, 
  FaMusic, 
  FaUtensils, 
  FaArrowRight, 
  FaCheckCircle, 
  FaPhoneAlt, 
  FaSearch 
} from 'react-icons/fa';
import './index.css';

const facilitiesCategories = [
  { id: 'all', label: 'All Facilities' },
  { id: 'academic', label: 'Academic & Tech' },
  { id: 'creative', label: 'Sports & Arts' },
  { id: 'campus', label: 'Campus & Care' },
];

const facilitiesList = [
  {
    id: 'smart-classrooms',
    name: 'Smart Digital Classrooms',
    category: 'academic',
    icon: <FaChalkboardTeacher />,
    badge: 'Interactive Tech',
    badgeColor: '#2563eb',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    description: 'Interactive touch boards, audiovisual smart panels, and digital CBSE curriculum animations for conceptual clarity.',
    features: ['75" Interactive Flat Panels', 'Digital CBSE Content Suite', 'Ergonomic Student Desks', 'Acoustic Wall Panels'],
    link: '/smart-classrooms'
  },
  {
    id: 'computer-labs',
    name: 'Hi-Tech Computer & AI Lab',
    category: 'academic',
    icon: <FaDesktop />,
    badge: 'Coding & Robotics',
    badgeColor: '#059669',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    description: 'Equipped with latest i5 workstations, high-speed optical fiber internet, Python/Scratch coding software, and robotics modules.',
    features: ['1:1 Student-to-PC Ratio', 'Gigabit Fiber Internet', 'Scratch & Python Labs', 'Cyber Safety Monitoring'],
    link: '/computer-labs'
  },
  {
    id: 'science-labs',
    name: 'Composite Science Laboratories',
    category: 'academic',
    icon: <FaFlask />,
    badge: 'Hands-on Experiments',
    badgeColor: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Dedicated Physics, Chemistry, and Biology demonstration stations with calibrated apparatus, microscopes, and safety gear.',
    features: ['Digital Microscopes', 'Safety Eye Wash & Extinguishers', 'CBSE Practical Syllabus', 'Individual Experiment Kits'],
    link: '/science-laboratories'
  },
  {
    id: 'library',
    name: 'Central Knowledge Library',
    category: 'academic',
    icon: <FaBook />,
    badge: '10,000+ Books',
    badgeColor: '#b45309',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    description: 'A serene reading sanctuary housing over 10,000 reference books, encyclopedias, journals, NCERT guides, and e-learning terminals.',
    features: ['Silent Reading Halls', 'Digital E-Library Access', 'Daily Periodicals & Magazines', 'Automated Barcode Lending'],
    link: '/library'
  },
  {
    id: 'playground',
    name: 'Athletic Turf & Sports Complex',
    category: 'creative',
    icon: <FaFutbol />,
    badge: 'Outdoor & Indoor',
    badgeColor: '#16a34a',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: 'Expansive natural sports field for Cricket, Football, Volleyball, Badminton, and an indoor arena for Table Tennis and Chess.',
    features: ['Full-size Cricket Pitch', 'Volleyball & Badminton Courts', 'Certified Physical Trainers', 'Annual Inter-School Sports Meet'],
    link: '/playground-sports'
  },
  {
    id: 'music-dance',
    name: 'Music & Performing Arts Studio',
    category: 'creative',
    icon: <FaMusic />,
    badge: 'Vocal & Instruments',
    badgeColor: '#dc2626',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Acoustically treated studio for Indian Classical, Western vocals, Harmonium, Tabla, Keyboard, Guitar, and traditional folk dances.',
    features: ['Trained Music Gurus', 'Orchestra & Band Equipment', 'Stage Performance Training', 'Folk & Classical Dance Wings'],
    link: '/music'
  },
  {
    id: 'art-room',
    name: 'Fine Arts & Craft Studio',
    category: 'creative',
    icon: <FaPalette />,
    badge: 'Creativity Hub',
    badgeColor: '#ea580c',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    description: 'Inspiring studio for oil painting, sketching, clay pottery, origami, and exhibition displays of student creative projects.',
    features: ['Individual Painting Easels', 'Pottery & Clay Modeling', 'Annual Art Exhibitions', 'Recycled Art Projects'],
    link: '/art-room'
  },
  {
    id: 'hostel',
    name: 'Safe Campus Boarding & Hostel',
    category: 'campus',
    icon: <FaBed />,
    badge: 'Residential Care',
    badgeColor: '#4f46e5',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    description: 'Secure, home-like residential facility with clean dormitories, study rooms, 24/7 warden supervision, and hygienic dining.',
    features: ['Separate Boys/Girls Wings', 'Nutritious Veg Meals', 'Evening Remedial Classes', '24/7 Security & First Aid'],
    link: '/hostel-facility'
  },
  {
    id: 'transport',
    name: 'School Bus & GPS Transportation',
    category: 'campus',
    icon: <FaBus />,
    badge: 'Safe Commute',
    badgeColor: '#0891b2',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    description: 'Fleet of well-maintained school buses covering Naitand, Giridih town, and surrounding rural routes with trained drivers.',
    features: ['GPS Real-Time Tracking', 'Female Bus Attendants', 'First-Aid & Speed Governors', 'Wide Route Coverage'],
    link: '/transportation'
  },
  {
    id: 'security',
    name: '24/7 CCTV & Campus Security',
    category: 'campus',
    icon: <FaShieldAlt />,
    badge: '100% Monitored',
    badgeColor: '#0f172a',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    description: 'Complete campus perimeter protected by 64+ HD night-vision CCTV cameras, round-the-clock guards, and visitor pass gate control.',
    features: ['64+ High-Def CCTV Cameras', 'Visitor Gate Verification', 'Fire Safety Sprinklers', 'Zero-Tolerance Safety Protocol'],
    link: '/cctv-security'
  },
  {
    id: 'staff-room',
    name: 'Faculty & Research Center',
    category: 'campus',
    icon: <FaUsers />,
    badge: 'Educator Hub',
    badgeColor: '#334155',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'Collaborative resource lounge for our 35+ qualified educators with teaching aids, lesson planning terminals, and parent meet desks.',
    features: ['Individual Teacher Desks', 'Lesson Planning Systems', 'Curriculum Resource Library', 'Parent Consultation Suite'],
    link: '/staff-room'
  },
  {
    id: 'cafeteria',
    name: 'Hygienic Cafeteria & Dining Hall',
    category: 'campus',
    icon: <FaUtensils />,
    badge: 'Healthy Nutrition',
    badgeColor: '#059669',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious dining facility providing purified RO drinking water and fresh vegetarian snacks in a clean, sanitized atmosphere.',
    features: ['RO Purified Water Station', 'Daily Sanitation Audits', 'Spacious Seating', 'Organic Snack Options'],
    link: '/facility'
  }
];

const Facility = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFacilities = facilitiesList.filter((fac) => {
    const matchesCat = activeCategory === 'all' || fac.category === activeCategory;
    const matchesSearch = fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fac.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fac.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Header />
      <div className="facilities-master-page">
        {/* Hero Section */}
        <section className="fac-hero-section">
          <div className="fac-hero-overlay"></div>
          <div className="fac-hero-content">
            <span className="fac-hero-badge">World-Class Infrastructure</span>
            <h1 className="fac-hero-title">Campus Facilities & Infrastructure</h1>
            <p className="fac-hero-subtitle">
              Designed to inspire learning, safety, and physical vitality. Explore our state-of-the-art CBSE campus situated at Naitand, Giridih.
            </p>
            <div className="fac-hero-stats">
              <div className="fac-stat-box">
                <strong>10+</strong>
                <span>Dedicated Labs & Studios</span>
              </div>
              <div className="fac-stat-box">
                <strong>100%</strong>
                <span>CCTV Campus Coverage</span>
              </div>
              <div className="fac-stat-box">
                <strong>3+ Acres</strong>
                <span>Lush Green Playground</span>
              </div>
              <div className="fac-stat-box">
                <strong>1:1</strong>
                <span>Smart Computer Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="fac-control-bar-section">
          <div className="fac-container">
            <div className="fac-controls-wrapper">
              <div className="fac-category-tabs">
                {facilitiesCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`fac-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="fac-search-box">
                <FaSearch className="fac-search-icon" />
                <input
                  type="text"
                  placeholder="Search facilities (e.g. Lab, Library, Bus, Sports)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="fac-grid-section">
          <div className="fac-container">
            {filteredFacilities.length === 0 ? (
              <div className="fac-no-results">
                <h3>No Facilities Found</h3>
                <p>Try searching for a different keyword or view all categories.</p>
                <button className="fac-reset-btn" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="fac-cards-grid">
                {filteredFacilities.map((fac) => (
                  <div className="fac-premium-card" key={fac.id}>
                    <div className="fac-card-img-wrap">
                      <img src={fac.image} alt={fac.name} loading="lazy" />
                      <span className="fac-card-badge" style={{ backgroundColor: fac.badgeColor }}>
                        {fac.badge}
                      </span>
                      <div className="fac-card-icon-pill">
                        {fac.icon}
                      </div>
                    </div>

                    <div className="fac-card-content">
                      <h2 className="fac-card-title">{fac.name}</h2>
                      <p className="fac-card-desc">{fac.description}</p>

                      <div className="fac-features-list">
                        {fac.features.map((feat, idx) => (
                          <div className="fac-feat-item" key={idx}>
                            <FaCheckCircle className="fac-check-icon" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="fac-card-footer">
                        <Link to={fac.link} className="fac-explore-link">
                          Explore Facility Details <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Campus Visit Banner */}
        <section className="fac-cta-section">
          <div className="fac-container">
            <div className="fac-cta-card">
              <div className="fac-cta-text">
                <span className="fac-cta-pill">Guided Campus Tour</span>
                <h2>Experience Our Campus in Person</h2>
                <p>
                  We invite parents and prospective students to take a personal tour of our classrooms, laboratories, and sports grounds. Our counselors are available Monday to Saturday (8:00 AM - 2:00 PM).
                </p>
              </div>
              <div className="fac-cta-actions">
                <Link to="/admissions" className="fac-btn-primary">
                  Apply for Admission
                </Link>
                <a href="tel:+917870711904" className="fac-btn-secondary">
                  <FaPhoneAlt /> Call +91 7870711904
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Facility;
