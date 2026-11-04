import { FaGraduationCap, FaBolt, FaBus, FaHome, FaSchool } from 'react-icons/fa';
import React, { useState } from "react";
import "./index.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useContent from "../../hooks/useContent";

const Contact = () => {
  const { content: contactContent = {} } = useContent('contact-info');
  const addressLines = contactContent.address || [
    'Lal Bihari Mahto Divine Public School',
    'Village Naitand, Post Bandiyabad, District Giridih',
    'Jharkhand - 815316, India',
  ];
  const phones = contactContent.phones || [
    { label: 'Main Office', value: '+91 94313 78901' },
    { label: 'Admissions', value: '+91 98765 43210' },
    { label: 'Principal', value: '+91 94313 78901' },
  ];
  const emails = contactContent.emails || [
    { label: 'General Inquiries', value: 'info@lbmdps.edu.in' },
    { label: 'Admissions', value: 'admissions@lbmdps.edu.in' },
    { label: 'Principal', value: 'principal@lbmdps.edu.in' },
  ];
  const hours = contactContent.hours || [
    'Monday - Friday: 8:00 AM - 4:00 PM',
    'Saturday: 9:00 AM - 2:00 PM',
    'Sunday: Closed',
  ];
  const mapLink =
    contactContent.mapLink ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.143713921765!2d86.26376391514804!3d24.296646184350465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1594bebecb4a7%3A0xa155e473b438d1fa!2sLal%20Bihari%20Mahto%20Divine%20Public%20School%20Naitand%2C%20Bandiyabad%2C%20Giridih%20815316!5e0!3m2!1sen!2sin!4v1687325254321!5m2!1sen!2sin';

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "Admissions (2026-27)",
    subject: "",
    message: "",
  });

  const [visitData, setVisitData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    studentGrade: "Class I - V",
    preferredDate: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [visitSuccessMessage, setVisitSuccessMessage] = useState("");
  const [showVisitPopup, setShowVisitPopup] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Toggle FAQ Accordion
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Handle main contact form change
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "phoneNumber" || id === "phone" || id === "mobile") {
      const sanitized = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prevData) => ({ ...prevData, [id]: sanitized }));
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle campus visit form change
  const handleVisitChange = (e) => {
    const { id, value } = e.target;
    if (id === "phoneNumber" || id === "phone" || id === "mobile") {
      const sanitized = value.replace(/\D/g, "").slice(0, 10);
      setVisitData((prevData) => ({ ...prevData, [id]: sanitized }));
      return;
    }
    setVisitData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Submit main contact form
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const savedData = JSON.parse(localStorage.getItem("contactForm")) || [];
      savedData.push({ ...formData, submittedAt: new Date().toISOString() });
      localStorage.setItem("contactForm", JSON.stringify(savedData));

      setIsSubmitting(false);
      setSuccessMessage("Thank you! Your inquiry has been sent to our administrative office. We will contact you within 24 hours.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        department: "Admissions (2026-27)",
        subject: "",
        message: "",
      });

      setTimeout(() => setSuccessMessage(""), 5000);
    }, 600);
  };

  // Submit campus visit form
  const handleVisitSubmit = (e) => {
    e.preventDefault();
    const savedVisitData = JSON.parse(localStorage.getItem("visitForm")) || [];
    savedVisitData.push({ ...visitData, bookedAt: new Date().toISOString() });
    localStorage.setItem("visitForm", JSON.stringify(savedVisitData));

    setVisitSuccessMessage("Campus visit scheduled successfully! Our coordinator will call to confirm your appointment.");
    setVisitData({
      name: "",
      email: "",
      phoneNumber: "",
      studentGrade: "Class I - V",
      preferredDate: "",
      message: "",
    });

    setTimeout(() => {
      setVisitSuccessMessage("");
      setShowVisitPopup(false);
    }, 3000);
  };

  const faqs = [
    {
      q: "What are the visiting hours for the Principal and Admissions Office?",
      a: "Our Admissions and Administrative desks are open Monday to Saturday from 8:00 AM to 4:00 PM. Parents wishing to meet the Principal personally are advised to visit between 10:00 AM and 1:00 PM or book a prior appointment through our helpline."
    },
    {
      q: "How can I schedule a guided tour of the classrooms, labs, and sports facilities?",
      a: "You can click the 'Schedule Campus Visit' button right here on this page, or call our admissions hotline at +91 94313 78901. Our student counselor will arrange a full campus walk-through on your preferred date."
    },
    {
      q: "Which areas in Giridih district are covered by the school bus network?",
      a: "LBMDPS operates a dedicated fleet of 15+ GPS-enabled school buses covering Giridih Town, Pachamba, Bengabad, Jamua, Naitand, Gandey, and surrounding rural routes with trained female bus attendants."
    },
    {
      q: "Can I pay admission or quarterly fees directly at the campus counter?",
      a: "Yes! Fees can be paid directly at our Accounts Department counter via Cash, POS Debit/Credit card, UPI, or through our secure online Parent Portal."
    }
  ];

  return (
    <div className="contact-page-root">
      <Header />

      {/* 1. HERO BANNER */}
      <section className="contact-head-section">
        <div className="contact-head-container">
          <div className="contact-badge-pill">
            <span className="badge-dot"></span>
            CBSE AFFILIATED (10+2) • HELP DESK & VISITOR INFORMATION
          </div>
          <h1 className="contact-head-heading">Connect with Lal Bihari Mahto Divine Public School</h1>
          <p className="contact-head-para">
            Whether you are inquiring about admissions for Session 2026-2027, scheduling a campus tour, or reaching out to administration, our dedicated team is here to assist you.
          </p>

          {/* Quick Action Buttons */}
          <div className="contact-hero-actions">
            <a href="tel:+919431378901" className="hero-pill-btn primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Call Admissions Desk</span>
            </a>

            <a
              href="https://wa.me/919431378901?text=Hello%20LBMDPS%2C%20I%20would%20like%20to%20inquire%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="hero-pill-btn whatsapp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.02C8.94 7.02 8.66 7.08 8.42 7.34C8.18 7.6 7.5 8.24 7.5 9.54C7.5 10.84 8.45 12.09 8.58 12.27C8.71 12.45 10.43 15.1 13.06 16.23C13.69 16.5 14.18 16.66 14.56 16.78C15.2 16.98 15.77 16.95 16.23 16.88C16.74 16.8 17.81 16.23 18.04 15.6C18.26 14.96 18.26 14.42 18.2 14.31C18.13 14.2 17.96 14.13 17.71 14C17.46 13.88 16.23 13.27 16 13.19C15.78 13.1 15.61 13.06 15.45 13.31C15.28 13.55 14.81 14.13 14.66 14.3C14.52 14.47 14.38 14.5 14.13 14.37C13.88 14.25 13.08 13.99 12.13 13.14C11.39 12.48 10.89 11.66 10.75 11.41C10.6 11.17 10.73 11.03 10.86 10.91C10.97 10.8 11.11 10.62 11.23 10.47C11.36 10.33 11.4 10.22 11.48 10.05C11.56 9.89 11.52 9.74 11.46 9.62C11.4 9.5 10.91 8.29 10.7 7.79C10.5 7.31 10.3 7.37 10.14 7.36C10 7.36 9.83 7.35 9.66 7.35C9.5 7.35 9.22 7.41 9.11 7.02Z"/>
              </svg>
              <span>WhatsApp Inquiries</span>
            </a>

            <button type="button" className="hero-pill-btn secondary" onClick={() => setShowVisitPopup(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Schedule Campus Visit</span>
            </button>

            <button
              type="button"
              className="hero-pill-btn ghost"
              onClick={() => {
                const address = encodeURIComponent(addressLines.join(', '));
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, "_blank");
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
              <span>Get Directions</span>
            </button>
          </div>

          {/* Quick Metrics KPI Strip */}
          <div className="contact-kpi-strip">
            <div className="kpi-item">
              <span className="kpi-icon"><FaBolt /></span>
              <div>
                <strong>&lt; 24h Response</strong>
                <span>Quick Inquiry Reply</span>
              </div>
            </div>
            <div className="kpi-item">
              <span className="kpi-icon"><FaSchool /></span>
              <div>
                <strong>Guided Visits</strong>
                <span>Mon – Sat 8AM–4PM</span>
              </div>
            </div>
            <div className="kpi-item">
              <span className="kpi-icon"><FaBus /></span>
              <div>
                <strong>15+ Bus Routes</strong>
                <span>Across Giridih Dist.</span>
              </div>
            </div>
            <div className="kpi-item">
              <span className="kpi-icon"><FaGraduationCap /></span>
              <div>
                <strong>Academic Help</strong>
                <span>Nursery to Class X</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT DIRECTORY CARDS SECTION */}
      <section className="contact-directory-section">
        <div className="section-header-centered">
          <span className="contact-sub-badge">OFFICIAL DIRECTORY</span>
          <h2 className="section-title-dark">Department Contacts & Key Offices</h2>
          <p className="section-subtitle-gray">
            Reach out directly to the dedicated department for prompt support and assistance.
          </p>
        </div>

        <div className="card-container">
          {/* Card 1: Campus Address */}
          <div className="directory-card">
            <div className="card-header">
              <div className="icon-wrapper co-blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="card-title">School Campus</h3>
                <span className="card-sub-tag">Headquarters & Gates</span>
              </div>
            </div>
            <div className="card-content">
              {addressLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
              <div className="card-action-link">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressLines.join(', '))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Phone Numbers */}
          <div className="directory-card">
            <div className="card-header">
              <div className="icon-wrapper co-green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h3 className="card-title">Phone & Helplines</h3>
                <span className="card-sub-tag">Direct Lines</span>
              </div>
            </div>
            <div className="card-content">
              {phones.map((item, index) => (
                <p key={index}>
                  <strong>{item.label}:</strong>{' '}
                  <a href={`tel:${item.value.replace(/[^0-9+]/g, '')}`}>{item.value}</a>
                </p>
              ))}
              <div className="card-action-link">
                <a href="tel:+919431378901">Call Main Desk Now &rarr;</a>
              </div>
            </div>
          </div>

          {/* Card 3: Email Addresses */}
          <div className="directory-card">
            <div className="card-header">
              <div className="icon-wrapper co-purple">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="card-title">Email Inquiries</h3>
                <span className="card-sub-tag">Official Inboxes</span>
              </div>
            </div>
            <div className="card-content">
              {emails.map((item, index) => (
                <p key={index}>
                  <strong>{item.label}:</strong>{' '}
                  <a href={`mailto:${item.value}`}>{item.value}</a>
                </p>
              ))}
              <div className="card-action-link">
                <a href="mailto:info@lbmdps.edu.in">Write an Email &rarr;</a>
              </div>
            </div>
          </div>

          {/* Card 4: Office Hours */}
          <div className="directory-card">
            <div className="card-header">
              <div className="icon-wrapper co-gold">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="card-title">Visiting Hours</h3>
                <span className="card-sub-tag">Academic Gates</span>
              </div>
            </div>
            <div className="card-content">
              {hours.map((hour, index) => (
                <p key={index}>{hour}</p>
              ))}
              <div className="card-action-link">
                <span className="gate-note">Security Check at Gate 1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MESSAGE FORM & INTERACTIVE MAP SPLIT SECTION */}
      <section className="message-location-container">
        <div className="message-location-grid">
          {/* Left Column: Contact Enquiry Form Card */}
          <div className="contact-form-card">
            <span className="contact-sub-badge">SEND INQUIRY</span>
            <h2 className="message-heading">Send Us a Direct Message</h2>
            <p className="message-para">
              Fill out the inquiry form below and our administrative office will respond within 24 hours.
            </p>
            
            <form className="message-form" onSubmit={handleSubmit}>
              {/* Department Selector */}
              <div className="message-form-group">
                <label htmlFor="department">Inquiry Department <span className="form-requre">*</span></label>
                <select
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="Admissions (2026-27)">Admissions Desk (Session 2026-2027)</option>
                  <option value="General Administration">General Administration & Info</option>
                  <option value="Fee & Accounts">Fee Structure & Accounts Office</option>
                  <option value="Transport & Hostel">School Bus Transport & Hostel</option>
                  <option value="Transfer Certificate">Transfer Certificate (TC) & Marksheets</option>
                  <option value="Principal Office">Principal Appointment</option>
                </select>
              </div>

              {/* 2-Column Name Row */}
              <div className="message-form-group-row">
                <div className="message-form-group">
                  <label htmlFor="firstName">First Name <span className="form-requre">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul"
                  />
                </div>
                <div className="message-form-group">
                  <label htmlFor="lastName">Last Name <span className="form-requre">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sharma"
                  />
                </div>
              </div>

              {/* 2-Column Contact Row */}
              <div className="message-form-group-row">
                <div className="message-form-group">
                  <label htmlFor="email">Email Address <span className="form-requre">*</span></label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                  />
                </div>
                <div className="message-form-group">
                  <label htmlFor="phoneNumber">Phone / WhatsApp Number <span className="form-requre">*</span></label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    maxLength="10"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="message-form-group">
                <label htmlFor="subject">Subject / Purpose of Contact <span className="form-requre">*</span></label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Admission for Class 5, Bus route inquiry"
                />
              </div>

              {/* Message */}
              <div className="message-form-group">
                <label htmlFor="message">Your Message / Query <span className="form-requre">*</span></label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="Please describe your requirements, student's current grade, or any specific questions..."
                />
              </div>
 
              {/* Submit Button */}
              <button type="submit" className="submit-btn contact-submit-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="fa-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                      <line x1="12" y1="2" x2="12" y2="6"></line>
                      <line x1="12" y1="18" x2="12" y2="22"></line>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                      <line x1="2" y1="12" x2="6" y2="12"></line>
                      <line x1="18" y1="12" x2="22" y2="12"></line>
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    <span>Submit Official Message</span>
                  </>
                )}
              </button>

              {successMessage && <div className="form-messagess success-banner">{successMessage}</div>}

              <p className="terms-text">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>We respect your privacy. All information submitted is kept strictly confidential by LBMDPS administration.</span>
              </p>
            </form>
          </div>

          {/* Right Column: Find Us Map & Campus Transit Card */}
          <div className="location-card-wrapper">
            <span className="contact-sub-badge gold">CAMPUS LOCATION</span>
            <h2 className="location-heading">Find School Campus</h2>
            <p className="location-para">
              Located in the heart of Naitand, our lush green, serene campus is easily accessible via road and public transport.
            </p>
            
            <div className="location-card">
              <div id="map-container" className="responsive-map-container">
                <iframe
                  title="School Location"
                  src={mapLink}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Transit & Visit Highlights */}
            <div className="campus-transit-grid">
              <div className="transit-item">
                <div className="transit-icon blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h4>Campus Landmark</h4>
                  <p>Naitand Chowk, Bandiyabad Road, Giridih - 815316 (Opp. Shiv Mandir)</p>
                </div>
              </div>

              <div className="transit-item">
                <div className="transit-icon green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <div>
                  <h4>School Bus Network</h4>
                  <p>Covering Giridih Town, Pachamba, Jamua, Bengabad & rural routes</p>
                </div>
              </div>

              <div className="transit-item">
                <div className="transit-icon amber">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <h4>Visitor Gates & Hours</h4>
                  <p>Monday – Saturday: 8:00 AM – 3:30 PM (Sunday Closed)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      <section className="contact-faq-section">
        <div className="section-header-centered">
          <span className="contact-sub-badge">INSTANT HELP</span>
          <h2 className="section-title-dark">Frequently Asked Questions</h2>
          <p className="section-subtitle-gray">
            Quick answers to the most common queries from parents, prospective students, and visitors.
          </p>
        </div>

        <div className="faq-accordion-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-accordion-item ${activeFaq === index ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question-row">
                <h3>{faq.q}</h3>
                <span className="faq-toggle-icon">
                  {activeFaq === index ? "−" : "+"}
                </span>
              </div>
              {activeFaq === index && (
                <div className="faq-answer-content">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. EMERGENCY CONTACT STRIP */}
      <section className="contact-emergency-strip">
        <div className="emergency-strip-container">
          <div className="emergency-title">
            <span className="emergency-pulse"></span>
            <strong>Quick Campus Support Hotlines:</strong>
          </div>
          <div className="emergency-badges">
            <a href="tel:+919431378901" className="emergency-badge">
              <span><FaBus /> Transport Incharge:</span> +91 94313 78901
            </a>
            <a href="tel:+919876543210" className="emergency-badge">
              <span><FaHome /> Hostel Office:</span> +91 98765 43210
            </a>
            <a href="tel:+919431378901" className="emergency-badge">
              <span>🛡️ Student Safety Desk:</span> +91 94313 78901
            </a>
          </div>
        </div>
      </section>

      {/* 6. CAMPUS VISIT POPUP MODAL */}
      {showVisitPopup && (
        <div className="popup-overlay" onClick={() => setShowVisitPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header-modal">
              <span className="contact-sub-badge gold">GUIDED CAMPUS WALK</span>
              <h2>Schedule a Campus Tour</h2>
              <p>Experience our smart classrooms, science labs, library, and sports complex in person.</p>
            </div>

            <form onSubmit={handleVisitSubmit}>
              <div className="popup-form-group">
                <label>Parent / Guardian Name *</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Full Name"
                  value={visitData.name}
                  onChange={handleVisitChange}
                  required
                />
              </div>

              <div className="popup-form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email Address"
                  value={visitData.email}
                  onChange={handleVisitChange}
                  required
                />
              </div>

              <div className="popup-form-row">
                <div className="popup-form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    maxLength="10"
                    placeholder="10-digit number"
                    value={visitData.phoneNumber}
                    onChange={handleVisitChange}
                    required
                  />
                </div>
                <div className="popup-form-group">
                  <label>Class of Interest *</label>
                  <select
                    id="studentGrade"
                    value={visitData.studentGrade}
                    onChange={handleVisitChange}
                    required
                  >
                    <option value="Pre-Primary (Nursery-UKG)">Pre-Primary (Nursery - UKG)</option>
                    <option value="Class I - V">Class I - V (Primary)</option>
                    <option value="Class VI - VIII">Class VI - VIII (Middle)</option>
                    <option value="Class IX - X">Class IX - X (Secondary Wing)</option>
                  </select>
                </div>
              </div>

              <div className="popup-form-group">
                <label>Preferred Visit Date *</label>
                <input
                  type="date"
                  id="preferredDate"
                  value={visitData.preferredDate}
                  onChange={handleVisitChange}
                  required
                />
              </div>

              <div className="popup-form-group">
                <label>Additional Notes / Specific Requests</label>
                <textarea
                  id="message"
                  placeholder="Any specific questions or areas you wish to tour (e.g. Hostel, Computer Labs)..."
                  value={visitData.message}
                  onChange={handleVisitChange}
                  rows="2"
                />
              </div>

              <div className="popup-buttons">
                <button type="submit" className="popup-confirm-btn">
                  Confirm Guided Tour
                </button>
                <button
                  type="button"
                  className="popup-cancel-btn"
                  onClick={() => setShowVisitPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>

            {visitSuccessMessage && (
              <p className="form-messagess success-banner">{visitSuccessMessage}</p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Contact;
