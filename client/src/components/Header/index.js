import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../AllImage/school-logo.jpg";
import "./index.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Active dropdown state for mobile/touch
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const openFormModal = () => {
    setShowForm(true);
    setSubmitted(false);
  };
  const closeFormModal = () => setShowForm(false);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    class: "Class 1",
    parentsName: "",
    dob: "",
    aadhaar: "",
    city: "",
    district: "Giridih, Jharkhand",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tel") {
      const sanitized = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: sanitized });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter the student's full name.");
      return;
    }
    if (!formData.tel || formData.tel.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      alert("Admission inquiry received! Our academic coordinator will contact you at " + formData.tel + " within 24 hours.");
      closeFormModal();
      setFormData({
        name: "",
        tel: "",
        class: "Class 1",
        parentsName: "",
        dob: "",
        aadhaar: "",
        city: "",
        district: "Giridih, Jharkhand",
        notes: ""
      });
    }, 800);
  };

  return (
    <header className="site-header-master">
      {/* Clean Main Brand & Navigation Bar */}
      <div className={`header-main-nav ${scrolled ? "is-sticky" : ""}`}>
        <div className="header-fluid-container nav-flex-wrapper">
          {/* School Brand Identity (Estd. 2013) */}
          <Link to="/" className="school-brand-anchor">
            <img src={logo} alt="LBMDPS Official Crest" className="school-crest-img" />
            <div className="school-brand-titles">
              <h1 className="brand-h1">LAL BIHARI MAHTO</h1>
              <h2 className="brand-h2">DIVINE PUBLIC SCHOOL</h2>
              <p className="brand-motto">NAITAND, GIRIDIH</p>
            </div>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`mobile-toggle-btn ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links with Dropdowns */}
          <nav className={`main-nav-menu ${menuOpen ? "open" : ""}`}>
            <ul className="nav-links-list">
              {/* Home */}
              <li>
                <NavLink exact to="/" activeClassName="nav-active" onClick={() => setMenuOpen(false)}>
                  Home
                </NavLink>
              </li>

              {/* About Dropdown */}
              <li className={`nav-dropdown-item ${openDropdown === "about" ? "dropdown-open" : ""}`}>
                <div
                  className="dropdown-trigger"
                  onClick={() => toggleDropdown("about")}
                >
                  <span>About</span>
                  <span className="caret-arrow">▾</span>
                </div>
                <ul className="dropdown-menu-list">
                  <li><Link to="/about" onClick={() => setMenuOpen(false)}>About LBMDPS</Link></li>
                  <li><Link to="/mission-vision" onClick={() => setMenuOpen(false)}>Mission & Vision</Link></li>
                  <li><Link to="/directors-message" onClick={() => setMenuOpen(false)}>Director's Message</Link></li>
                  <li><Link to="/rules-regulations" onClick={() => setMenuOpen(false)}>Rules & Regulations</Link></li>
                  <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
                </ul>
              </li>

              {/* Infrastructure Dropdown */}
              <li className={`nav-dropdown-item ${openDropdown === "infrastructure" ? "dropdown-open" : ""}`}>
                <div
                  className="dropdown-trigger"
                  onClick={() => toggleDropdown("infrastructure")}
                >
                  <span>Facilities</span>
                  <span className="caret-arrow">▾</span>
                </div>
                <ul className="dropdown-menu-list">
                  <li><Link to="/infrastructure" onClick={() => setMenuOpen(false)}>Overview of Facilities</Link></li>
                  <li><Link to="/smart-classrooms" onClick={() => setMenuOpen(false)}>Smart Classrooms</Link></li>
                  <li><Link to="/library" onClick={() => setMenuOpen(false)}>Library & Resource Center</Link></li>
                  <li><Link to="/computer-labs" onClick={() => setMenuOpen(false)}>Computer Science Lab</Link></li>
                  <li><Link to="/science-laboratories" onClick={() => setMenuOpen(false)}>Science Laboratories</Link></li>
                  <li><Link to="/playground-sports" onClick={() => setMenuOpen(false)}>Sports & Playground</Link></li>
                  <li><Link to="/hostel-facility" onClick={() => setMenuOpen(false)}>Hostel Accommodation</Link></li>
                  <li><Link to="/transportation" onClick={() => setMenuOpen(false)}>School Bus Transport</Link></li>
                  <li><Link to="/cctv-security" onClick={() => setMenuOpen(false)}>24x7 CCTV Campus Safety</Link></li>
                </ul>
              </li>

              {/* Academics Dropdown */}
              <li className={`nav-dropdown-item ${openDropdown === "academics" ? "dropdown-open" : ""}`}>
                <div
                  className="dropdown-trigger"
                  onClick={() => toggleDropdown("academics")}
                >
                  <span>Academics</span>
                  <span className="caret-arrow">▾</span>
                </div>
                <ul className="dropdown-menu-list">
                  <li><Link to="/academic" onClick={() => setMenuOpen(false)}>Academic Overview</Link></li>
                  <li><Link to="/pre-primary-wing" onClick={() => setMenuOpen(false)}>Pre-Primary Wing (Nursery-UKG)</Link></li>
                  <li><Link to="/primary-wing" onClick={() => setMenuOpen(false)}>Primary Wing (Classes 1-5)</Link></li>
                  <li><Link to="/middle-wing" onClick={() => setMenuOpen(false)}>Middle Wing (Classes 6-8)</Link></li>
                  <li><Link to="/secondary-wing" onClick={() => setMenuOpen(false)}>Secondary Wing (Classes 9-10)</Link></li>
                  <li><Link to="/examinations" onClick={() => setMenuOpen(false)}>CBSE Examination Pattern</Link></li>
                </ul>
              </li>

              {/* Admissions Dropdown */}
              <li className={`nav-dropdown-item ${openDropdown === "admissions" ? "dropdown-open" : ""}`}>
                <div
                  className="dropdown-trigger"
                  onClick={() => toggleDropdown("admissions")}
                >
                  <span>Admissions</span>
                  <span className="caret-arrow">▾</span>
                </div>
                <ul className="dropdown-menu-list">
                  <li><Link to="/admissions" onClick={() => setMenuOpen(false)}>Admission Procedure 2026-27</Link></li>
                  <li><Link to="/fee-structure" onClick={() => setMenuOpen(false)}>Class-Wise Fee Structure</Link></li>
                </ul>
              </li>

              {/* Gallery & Media Dropdown */}
              <li className={`nav-dropdown-item ${openDropdown === "media" ? "dropdown-open" : ""}`}>
                <div
                  className="dropdown-trigger"
                  onClick={() => toggleDropdown("media")}
                >
                  <span>Gallery</span>
                  <span className="caret-arrow">▾</span>
                </div>
                <ul className="dropdown-menu-list">
                  <li><Link to="/gallery" onClick={() => setMenuOpen(false)}>Photo Gallery</Link></li>
                  <li><Link to="/videos" onClick={() => setMenuOpen(false)}>Video Library & Tours</Link></li>
                  <li><Link to="/music" onClick={() => setMenuOpen(false)}>Music & Arts Wing</Link></li>
                </ul>
              </li>

              {/* Notices */}
              <li>
                <NavLink to="/notices" activeClassName="nav-active" onClick={() => setMenuOpen(false)}>
                  Notices
                </NavLink>
              </li>

              {/* Contact */}
              <li>
                <NavLink to="/contact" activeClassName="nav-active" onClick={() => setMenuOpen(false)}>
                  Contact
                </NavLink>
              </li>
          
 
              {/* Apply Online Header Button */}
              <li className="nav-cta-item">
                <button
                  type="button"
                  className="nav-apply-btn"
                  onClick={() => {
                    openFormModal();
                    setMenuOpen(false);
                  }}
                >
                  <span className="pulse-dot"></span>
                  <i className="fa-solid fa-graduation-cap"></i>
                  <span>Apply Online</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Drawer Backdrop */}
          {menuOpen && (
            <div
              className="mobile-drawer-backdrop"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation drawer"
            />
          )}
        </div>
      </div>

      {/* Online Admission Application Modal (10-Digit Mobile Validated) */}
      {showForm && (
        <div className="premium-modal-overlay" onClick={closeFormModal}>
          <div className="premium-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={logo} alt="School Logo" style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #fbbf24' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, color: '#0b1c3d', fontWeight: 900 }}>Online Admission Registration 2026-27</h3>
                  <p className="modal-sub" style={{ margin: 0, fontSize: 11, color: '#64748b' }}>Lal Bihari Mahto Divine Public School • Estd. 2013</p>
                </div>
              </div>
              <button className="close-x" onClick={closeFormModal}>&times;</button>
            </div>

            <div className="modal-body">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 16px' }}>
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 style={{ color: '#0b1c3d', margin: '0 0 8px 0', fontSize: 20 }}>Application Submitted Successfully!</h3>
                  <p style={{ color: '#475569', fontSize: 14, margin: 0 }}>
                    Our admission counselor will contact you shortly regarding the verification process.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="form-row">
                    <label>
                      Student Full Name *
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Aarav Kumar"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Parent Mobile Number (10 Digits) *
                      <input
                        type="tel"
                        name="tel"
                        placeholder="10-digit number"
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={formData.tel}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Applying For Class *
                      <select name="class" required value={formData.class} onChange={handleChange}>
                        <option value="Pre-Nursery">Pre-Nursery</option>
                        <option value="Nursery">Nursery</option>
                        <option value="LKG">L.K.G</option>
                        <option value="UKG">U.K.G</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Father's / Mother's Name *
                      <input
                        type="text"
                        name="parentsName"
                        placeholder="Parent / Guardian Name"
                        required
                        value={formData.parentsName}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Date of Birth *
                      <input
                        type="date"
                        name="dob"
                        required
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Student Aadhaar Number (Optional)
                      <input
                        type="text"
                        name="aadhaar"
                        placeholder="12-digit Aadhaar"
                        value={formData.aadhaar}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Village / City *
                      <input
                        type="text"
                        name="city"
                        placeholder="e.g. Naitand / Giridih"
                        required
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      District & State
                      <input
                        type="text"
                        name="district"
                        placeholder="Giridih, Jharkhand"
                        value={formData.district}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <label>
                    Special Notes / Transport Requirement
                    <textarea
                      name="notes"
                      placeholder="Mention any transport requirement or previous school percentage..."
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </label>

                  <div className="form-actions">
                    <button type="submit" className="submit-inquiry">
                      <i className="fa-solid fa-paper-plane" style={{ marginRight: 6 }}></i> Submit Admission Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
