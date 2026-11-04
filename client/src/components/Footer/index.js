import {
  FaMapMarkerAlt, FaPhoneAlt, FaLock, FaEnvelope, FaClock,
  FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTwitter, FaLinkedinIn
} from 'react-icons/fa';
import React from "react";
import { Link } from "react-router-dom";
import logo from "../AllImage/school-logo.jpg";
import "./index.css";

const Footer = () => {
  return (
    <footer className="master-footer" aria-label="Official Website Footer">
      <div className="footer-main-container">
        <div className="footer-columns-grid">
          {/* Column 1: School Identity & Social Media */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <img src={logo} alt="LBMDPS Official Crest" className="footer-logo-img" />
              <div>
                <h3 className="footer-school-name">LAL BIHARI MAHTO</h3>
                <h4 className="footer-school-sub">DIVINE PUBLIC SCHOOL</h4>
              </div>
            </div>
            <p className="footer-brand-desc">
              CBSE Affiliated Secondary English Medium Co-Educational Institution (Affiliation No: 3430398 • UDISE Code: 20060105502 • Pre-Nursery to Class 10). Nurturing academic distinction, cultural ethics, and future-ready leadership since 2013.
            </p>
            <span className="footer-motto-badge">Motto: "Vidya Dadati Vinayam"</span>

            {/* Social Media Links Section */}
            <div className="footer-social-wrapper">
              <span className="footer-social-heading">Connect With Us:</span>
              <div className="footer-social-icons-row">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn facebook"
                  aria-label="Facebook"
                  title="Follow us on Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn instagram"
                  aria-label="Instagram"
                  title="Follow us on Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn youtube"
                  aria-label="YouTube"
                  title="Subscribe on YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://wa.me/919431378901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn whatsapp"
                  aria-label="WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn twitter"
                  aria-label="Twitter / X"
                  title="Follow on Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn linkedin"
                  aria-label="LinkedIn"
                  title="Connect on LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Page</Link></li>
              <li><Link to="/about">About School</Link></li>
              <li><Link to="/academic">Academic Curriculum</Link></li>
              <li><Link to="/admissions">Admissions 2026-27</Link></li>
              <li><Link to="/fee-structure">Fee Structure</Link></li>
              <li><Link to="/smart-classrooms">Smart Classrooms &amp; Labs</Link></li>
              <li><Link to="/transportation">School Bus Transport</Link></li>
              
            </ul>
          </div>

          {/* Column 3: Media & Highlights */}
          <div className="footer-col">
            <h4 className="footer-col-title">Campus Life</h4>
            <ul className="footer-links-list">
              <li><Link to="/gallery">Photo Gallery</Link></li>
              <li><Link to="/videos">Virtual Video Tours</Link></li>
              <li><Link to="/music">Music &amp; Cultural Arts</Link></li>
              <li><Link to="/examinations">Board Toppers (Wall of Fame)</Link></li>
              <li><Link to="/notices">Official Circulars</Link></li>
              <li><Link to="/contact">Helpdesk &amp; Inquiries</Link></li>
              <li><Link to="/student/dashboard" target="_blank">Student Portal</Link></li>
              <li><Link to="/parent/dashboard" target="_blank">Parent Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Contact &amp; Location</h4>
            <div className="footer-contact-items">
              <div className="contact-line">
                <FaMapMarkerAlt className="footer-contact-icon" />
                <span className="contact-line-text">
                  <strong>Campus:</strong> Village Naitand, Post Bandiyabad, District Giridih, Jharkhand - 815316
                </span>
              </div>
              <div className="contact-line">
                <FaPhoneAlt className="footer-contact-icon" />
                <span className="contact-line-text">
                  <strong>Helpline:</strong> <a href="tel:+919431378901">+91 94313 78901</a>
                </span>
              </div>
              <div className="contact-line">
                <FaEnvelope className="footer-contact-icon" />
                <span className="contact-line-text">
                  <strong>Email:</strong> <a href="mailto:info@lbmdps.edu.in">info@lbmdps.edu.in</a>
                </span>
              </div>
              <div className="contact-line">
                <FaClock className="footer-contact-icon" />
                <span className="contact-line-text">
                  <strong>Office Hours:</strong> Mon - Sat: 8:00 AM - 4:00 PM
                </span>
              </div>
            </div>

            <div className="footer-quick-action-cta">
              <a href="https://wa.me/919431378901" target="_blank" rel="noopener noreferrer" className="footer-wa-btn">
                <FaWhatsapp style={{ marginRight: 6 }} /> Quick WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Bottom Bar with Legal Links and Discrete Staff Portal Link */}
      <div className="footer-bottom-bar">
        <div className="footer-main-container bottom-flex-row">
          <div className="footer-copy">
            © 2026 Lal Bihari Mahto Divine Public School, Naitand (Estd. 2013). All rights reserved.
          </div>
          <div className="footer-legal-links">
            <Link to="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
            <span className="legal-sep">•</span>
            <Link to="/terms-of-service" className="footer-legal-link">Terms of Service</Link>
          </div>
          <div className="footer-credits">
            Designed &amp; Developed by Nitish Kumar
          </div>
          {/* Staff & Admin Portal Access (Opens in new tab) */}
          <div className="footer-discrete-portal">
            <Link
              to="/login"
              target="_blank"
              rel="noopener noreferrer"
              className="discrete-staff-link"
              title="Authorized Staff & Student Portal Access (Opens in new tab, or press Alt + L)"
            >
              <FaLock /> Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
