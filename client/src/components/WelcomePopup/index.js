import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTimes, FaGraduationCap, FaPhoneAlt, FaWhatsapp,
  FaCheckCircle, FaStar, FaBolt
} from "react-icons/fa";
import logo from "../AllImage/school-logo.jpg";
import "./index.css";

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    className: "Class 1",
    city: "Giridih"
  });

  // Open modal on every page load & reload after a short smooth delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const sanitized = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: sanitized });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter the student's name.");
      return;
    }
    if (!formData.mobile || formData.mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      alert(`Thank you, ${formData.name}! Your admission inquiry has been received. Our team will contact you at ${formData.mobile} shortly.`);
      setSubmitted(false);
      setIsOpen(false);
      setFormData({
        name: "",
        mobile: "",
        className: "Class 1",
        city: "Giridih"
      });
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="welcome-popup-overlay" onClick={handleClose}>
      <div className="welcome-popup-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="popup-close-btn" onClick={handleClose} aria-label="Close Popup">
          <FaTimes />
        </button>

        <div className="popup-top-banner">
          <span className="popup-badge-gold">
            <FaStar style={{ marginRight: 5 }} /> ADMISSIONS OPEN 2026-2027
          </span>
          <div className="popup-brand-row">
            <img src={logo} alt="LBMDPS Crest" className="popup-school-logo" />
            <div>
              <h2 className="popup-school-title">Lal Bihari Mahto Divine Public School</h2>
              <p className="popup-school-sub">CBSE Affiliated (Affil No. 3430398 • UDISE: 20060105502) • Naitand, Giridih</p>
            </div>
          </div>
        </div>

        <div className="popup-body-content">
          <div className="popup-highlights-grid">
            <div className="popup-highlight-item">
              <FaCheckCircle className="check-icon" />
              <span>Nursery to Class X Admissions</span>
            </div>
            <div className="popup-highlight-item">
              <FaCheckCircle className="check-icon" />
              <span>Smart LED &amp; AI Digital Labs</span>
            </div>
            <div className="popup-highlight-item">
              <FaCheckCircle className="check-icon" />
              <span>100% Board Pass Rate &amp; Toppers</span>
            </div>
            <div className="popup-highlight-item">
              <FaCheckCircle className="check-icon" />
              <span>GPS Enabled Safe Bus Transport</span>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <form className="popup-quick-form" onSubmit={handleSubmit}>
            <h3 className="popup-form-title">
              <FaBolt style={{ color: "#F59E0B", marginRight: 6 }} /> Quick Admission Inquiry
            </h3>

            <div className="popup-form-grid">
              <input
                type="text"
                name="name"
                required
                placeholder="Student Full Name *"
                value={formData.name}
                onChange={handleChange}
                className="popup-input"
              />

              <input
                type="tel"
                name="mobile"
                required
                placeholder="10-Digit Mobile / WhatsApp *"
                value={formData.mobile}
                onChange={handleChange}
                className="popup-input"
              />

              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="popup-input"
              >
                <option value="Nursery">Nursery / KG</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>

              <button type="submit" className="popup-submit-btn" disabled={submitted}>
                {submitted ? "Submitting..." : "Submit Inquiry"}
              </button>
            </div>
          </form>

          {/* Quick Contact & Action Buttons */}
          <div className="popup-actions-footer">
            <div className="popup-direct-contacts">
              <a href="tel:+919431378901" className="popup-contact-btn call">
                <FaPhoneAlt style={{ marginRight: 6 }} /> Call: +91 94313 78901
              </a>
              <a
                href="https://wa.me/919431378901?text=Hello%2C%20I%20am%20interested%20in%20LBMDPS%20Admissions%202026-27"
                target="_blank"
                rel="noopener noreferrer"
                className="popup-contact-btn whatsapp"
              >
                <FaWhatsapp style={{ marginRight: 6 }} /> WhatsApp Chat
              </a>
            </div>

            <div className="popup-close-row">
              <Link to="/admissions" className="popup-full-admission-link" onClick={handleClose}>
                <FaGraduationCap style={{ marginRight: 5 }} /> View Full Admission Details &rarr;
              </Link>
              <button type="button" className="popup-continue-btn" onClick={handleClose}>
                Explore Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
