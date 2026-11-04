import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DragDropUploader from '../../components/DragDropUploader';

import './admission.css';

const Admission = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    classApplying: '',
    previousSchool: '',
    parentName: '',
    phone: '',
    email: '',
    address: '',
    additionalInfo: '',
    aadharNumber: '',
    photo: null,
    city: '',
    district: '',
    state: '',
    pinCode: '',
    category: '',
    fatherOccupation: '',
    motherOccupation: '',
    nationality: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;

    if (id === 'phone' || id === 'mobile' || id === 'tel') {
      const sanitized = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prevData) => ({
        ...prevData,
        [id]: sanitized,
      }));
      return;
    }

    if (id === 'aadharNumber') {
      const sanitized = value.replace(/\D/g, '').slice(0, 12);
      setFormData((prevData) => ({
        ...prevData,
        [id]: sanitized,
      }));
      return;
    }

    if (id === 'pinCode') {
      const sanitized = value.replace(/\D/g, '').slice(0, 6);
      setFormData((prevData) => ({
        ...prevData,
        [id]: sanitized,
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Validation
    if (
      !formData.studentName ||
      !formData.dob ||
      !formData.classApplying ||
      !formData.parentName ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.aadharNumber ||
      !formData.city ||
      !formData.district ||
      !formData.state ||
      !formData.pinCode ||
      !formData.category ||
      !formData.fatherOccupation ||
      !formData.motherOccupation ||
      !formData.nationality
    ) {
      setMessage('Please fill in all required fields marked with *');
      setMessageType('error');
      return;
    }

    if (formData.phone.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setMessage('Application submitted successfully! Our admissions coordinator will contact you within 24 hours.');
        setMessageType('success');
        setFormData({
          studentName: '',
          dob: '',
          classApplying: '',
          previousSchool: '',
          parentName: '',
          phone: '',
          email: '',
          address: '',
          additionalInfo: '',
          aadharNumber: '',
          photo: null,
          city: '',
          district: '',
          state: '',
          pinCode: '',
          category: '',
          fatherOccupation: '',
          motherOccupation: '',
          nationality: '',
        });
      } else {
        setMessage(`Submission failed. Error: ${response.statusText}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Network error. Please try again or call our admission desk at +91 94313 78901.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      {/* 1. HERO BANNER */}
      <section className="school-section">
        <div className="content-wrapper">
          <div className="admission-hero-badge">
            <i className="fa-solid fa-graduation-cap"></i> CBSE AFFILIATED • ACADEMIC SESSION 2026-2027
          </div>
          <h1 className="school-heading">Admissions Open: Nursery to Class X</h1>
          <p className="school-para">
            Begin your child's journey of academic distinction, moral ethics, and future-ready leadership at Lal Bihari Mahto Divine Public School, Naitand (Giridih).
          </p>
          <div className="admission-hero-actions">
            <a href="#application-form" className="hero-primary-action">
              <i className="fa-solid fa-pen-to-square"></i> Apply Online Now
            </a>
            <Link to="/fee-structure" className="hero-secondary-action">
              <i className="fa-solid fa-file-invoice-dollar"></i> View Fee Structure
            </Link>
            <a href="#required-documents" className="hero-ghost-action">
              <i className="fa-solid fa-list-check"></i> Required Documents
            </a>
          </div>
        </div>
      </section>

      {/* 2. ADMISSION PROCESS (4-STEP PATHWAY) */}
      <section className="admission-step-section">
        <div className="admission-container">
          <span className="admission-sub-badge">PROCEDURE GUIDE</span>
          <h2 className="admission-tittle">How to Get Admitted</h2>
          <p className="admission-discussion">
            Our streamlined 4-step admission process is designed to be simple, transparent, and parent-friendly.
          </p>
        </div>

        <div className="process-step">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number-tag">STEP 01</div>
            <div className="icon-wrapper-process blue-bg-light">
              <i className="fa-solid fa-file-lines" style={{ fontSize: 22 }}></i>
            </div>
            <h3 className="admission-step-name">Online / Offline Registration</h3>
            <p className="admission-step-discussion">
              Fill out the online application below or visit the school campus reception desk to obtain the official admission form.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number-tag">STEP 02</div>
            <div className="icon-wrapper-process green-bg-light">
              <i className="fa-solid fa-folder-open" style={{ fontSize: 22 }}></i>
            </div>
            <h3 className="admission-step-name">Document Verification</h3>
            <p className="admission-step-discussion">
              Submit photocopies of student birth certificate, Aadhar cards, past academic records, and passport-size photographs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-number-tag">STEP 03</div>
            <div className="icon-wrapper-process purple-bg-light">
              <i className="fa-solid fa-user-group" style={{ fontSize: 22 }}></i>
            </div>
            <h3 className="admission-step-name">Counseling & Interaction</h3>
            <p className="admission-step-discussion">
              Friendly counseling session to understand student learning preferences, interests, and parental expectations.
            </p>
          </div>

          {/* Step 4 */}
          <div className="step-card">
            <div className="step-number-tag">STEP 04</div>
            <div className="icon-wrapper-process orange-bg-light">
              <i className="fa-solid fa-circle-check" style={{ fontSize: 22 }}></i>
            </div>
            <h3 className="admission-step-name">Admission Confirmation</h3>
            <p className="admission-step-discussion">
              Fee deposit, issuance of official enrollment receipt, student ID card creation, and book/uniform kit handover.
            </p>
          </div>
        </div>
      </section>

      {/* 3. REQUIRED DOCUMENTS (BALANCED 2-COLUMN GRID) */}
      <section className="documents-section" id="required-documents">
        <div className="documents-container">
          <span className="admission-sub-badge">CHECKLIST</span>
          <h2 className="documents-title">Required Documents for Admission</h2>
          <p className="documents-description">
            Please keep original and attested photocopies ready for a swift and smooth verification process.
          </p>

          <div className="document-types">
            {/* New Admissions */}
            <div className="document-card">
              <div className="doc-card-header">
                <i className="fa-solid fa-file-circle-check doc-badge-icon blue-icon"></i>
                <div>
                  <h3>For New Admissions (Nursery - Class IX)</h3>
                  <span className="doc-card-sub">Mandatory for all fresh candidates</span>
                </div>
              </div>
              <ul className="doc-checklist">
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>Birth Certificate:</strong> Issued by Municipal Corporation or Gram Panchayat (Original + 2 copies).</span>
                </li>
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>Aadhar Card:</strong> Clear photocopy of Student's & both Parents' Aadhar Cards.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>Photographs:</strong> 4 recent passport-size colored photographs of student + 2 of parents.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>Proof of Residence:</strong> Electricity bill / Ration Card / Voter ID / Rent Agreement.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>Caste / Category Certificate:</strong> Valid government certificate if claiming category benefits.</span>
                </li>
              </ul>
            </div>

            {/* Transfer Students */}
            <div className="document-card">
              <div className="doc-card-header">
                <i className="fa-solid fa-book-bookmark doc-badge-icon amber-icon"></i>
                <div>
                  <h3>For Transfer Students (Mid-Term & Senior)</h3>
                  <span className="doc-card-sub">Required for students transferring from another school</span>
                </div>
              </div>
              <ul className="doc-checklist">
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>Transfer Certificate (TC):</strong> Original TC counter-signed by competent educational authority.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>Previous School Report Card:</strong> Marks sheet of the last qualifying examination passed.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>Character Certificate:</strong> Issued and signed by headmaster of previous institution.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>Migration Certificate:</strong> Required if shifting from State Board / ICSE to CBSE Board.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check-circle checkmark-icon"></i>
                  <span><strong>General Documents:</strong> Photos, Aadhar card copies, and address proof as listed for new admissions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEE OVERVIEW SECTION */}
      <section className="fee-section">
        <div className="fee-container">
          <span className="admission-sub-badge">ACADEMIC INVESTMENT</span>
          <h2 className="fee-heading">Fee Overview (Session 2026-2027)</h2>
          <p className="subtitle">
            Transparent, affordable, and all-inclusive academic fee structure designed to provide high-quality education for every child.
          </p>

          <div className="fee-cards">
            {/* Primary */}
            <div className="fee-pricing-card">
              <div className="pricing-icon icon-primary">
                <i className="fa-solid fa-shapes"></i>
              </div>
              <h3 className="card-heading">Primary Wing (I - V)</h3>
              <p className="classes">Classes 1 to 5 • Foundations</p>
              <div className="price-wrap">
                <span className="price-currency">₹</span>
                <span className="price">1,350</span>
                <span className="per-year">/ month</span>
              </div>
              <ul className="list-name">
                <li><i className="fa-solid fa-check check-icon"></i> Smart Digital Classrooms</li>
                <li><i className="fa-solid fa-check check-icon"></i> Foundational English & Math</li>
                <li><i className="fa-solid fa-check check-icon"></i> Co-Curricular & Sports Training</li>
                <li><i className="fa-solid fa-check check-icon"></i> Regular Assessments & Reports</li>
              </ul>
              <Link to="/fee-structure" className="card-explore-btn">Class-Wise Details &rarr;</Link>
            </div>

            {/* Middle */}
            <div className="fee-pricing-card most-popular">
              <div className="popular-tag">Most Popular</div>
              <div className="pricing-icon icon-middle">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3 className="card-heading">Middle Wing (VI - VIII)</h3>
              <p className="classes">Classes 6 to 8 • Skill Building</p>
              <div className="price-wrap">
                <span className="price-currency">₹</span>
                <span className="price">1,550</span>
                <span className="per-year">/ month</span>
              </div>
              <ul className="list-name">
                <li><i className="fa-solid fa-check check-icon"></i> Science Labs & Computer Coding</li>
                <li><i className="fa-solid fa-check check-icon"></i> CBSE Aligned Integrated Curriculum</li>
                <li><i className="fa-solid fa-check check-icon"></i> Language & Personality Wings</li>
                <li><i className="fa-solid fa-check check-icon"></i> Inter-House Competitions</li>
              </ul>
              <Link to="/fee-structure" className="card-explore-btn">Class-Wise Details &rarr;</Link>
            </div>

            {/* Senior */}
            <div className="fee-pricing-card">
              <div className="pricing-icon icon-senior">
                <i className="fa-solid fa-atom"></i>
              </div>
              <h3 className="card-heading">Secondary Wing (IX - X)</h3>
              <p className="classes">Classes 9 to 10 • CBSE Board Preparation</p>
              <div className="price-wrap">
                <span className="price-currency">₹</span>
                <span className="price">1,900</span>
                <span className="per-year">/ month</span>
              </div>
              <ul className="list-name">
                <li><i className="fa-solid fa-check check-icon"></i> Physics, Chem & Biology Labs</li>
                <li><i className="fa-solid fa-check check-icon"></i> CBSE Class X Intensive Mentorship</li>
                <li><i className="fa-solid fa-check check-icon"></i> Computer & Science Practice Labs</li>
                <li><i className="fa-solid fa-check check-icon"></i> Career & Board Guidance</li>
              </ul>
              <Link to="/fee-structure" className="card-explore-btn">Class-Wise Details &rarr;</Link>
            </div>
          </div>

          <p className="footer-note">
            * Sibling concession (15% on 2nd child tuition fee) and Merit Scholarships for 90%+ CBSE board scorers available.
          </p>

          <Link to="/fee-structure" className="fee-button">
            <i className="fa-solid fa-table-list"></i> View Complete Class-Wise Fee Schedule
          </Link>
        </div>
      </section>

      {/* 5. ONLINE APPLICATION FORM */}
      <section className="form-section" id="application-form">
        <div className="form-containerss">
          <header className="form-header">
            <span className="admission-sub-badge">REGISTRATION 2026-2027</span>
            <h2 className="form-heading">Online Admission Application Form</h2>
            <p className="form-para">
              Fill out the official student registration form below. Our academic admissions coordinator will review the application and contact you within 24 hours.
            </p>
          </header>

          <form className="application-form" onSubmit={handleSubmit}>
            {/* 1. Student Information */}
            <div className="form-group-card">
              <div className="form-section-header">
                <h3 className="application-form-heading">
                  <i className="fa-solid fa-user-graduate"></i> 1. Student Profile
                </h3>
                <p className="sections-description">
                  Please provide accurate student details as per official birth certificate.
                </p>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="studentName">
                    Student Full Name <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    required
                    placeholder="e.g. Aarav Kumar"
                    value={formData.studentName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">
                    Date of Birth <span className="form-requre">*</span>
                  </label>
                  <input
                    type="date"
                    id="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="classApplying">
                    Class Applying For <span className="form-requre">*</span>
                  </label>
                  <select
                    id="classApplying"
                    required
                    value={formData.classApplying}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Class</option>
                    <option value="Pre-Nursery">Pre - Nursery</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">L.K.G</option>
                    <option value="UKG">U.K.G</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={`Class ${i + 1}`}>
                        Class {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="previousSchool">Previous School Attended (If Any)</label>
                  <input
                    type="text"
                    id="previousSchool"
                    placeholder="Name of previous school & city"
                    value={formData.previousSchool}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="aadharNumber">
                    Student Aadhar Number <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="aadharNumber"
                    required
                    placeholder="12-digit Aadhar number"
                    maxLength={12}
                    value={formData.aadharNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">
                    Social Category <span className="form-requre">*</span>
                  </label>
                  <select
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="photo">
                  Student Passport Size Photograph <span className="form-requre">*</span>
                </label>
                <DragDropUploader
                  accept="image/*"
                  maxSizeMB={5}
                  label="Drag & drop student photo here, or click to browse"
                  hint="Passport size photograph, max 5MB (JPG, PNG, WEBP)"
                  onFileSelect={(file) => {
                    setFormData((prev) => ({ ...prev, photo: file }));
                  }}
                />
                {formData.photo && (
                  <p className="photo-selected-note">
                    <i className="fa-solid fa-circle-check"></i> Selected: <strong>{formData.photo.name}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* 2. Parent & Family Details */}
            <div className="form-group-card">
              <div className="form-section-header">
                <h3 className="application-form-heading">
                  <i className="fa-solid fa-people-roof"></i> 2. Parent & Guardian Information
                </h3>
                <p className="sections-description">
                  Contact details for school communications and official verification.
                </p>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="parentName">
                    Father's / Guardian's Full Name <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    required
                    placeholder="Enter father's full name"
                    value={formData.parentName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherOccupation">
                    Father's Occupation <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="fatherOccupation"
                    required
                    placeholder="e.g. Business, Govt Service, Teacher"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="motherOccupation">
                    Mother's Occupation <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="motherOccupation"
                    required
                    placeholder="e.g. Homemaker, Teacher, Doctor"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nationality">
                    Nationality <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    required
                    placeholder="Indian"
                    value={formData.nationality}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    Parent Contact Mobile Number (10 Digits) <span className="form-requre">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Parent Email Address <span className="form-requre">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="e.g. parent@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* 3. Address Details */}
            <div className="form-group-card">
              <div className="form-section-header">
                <h3 className="application-form-heading">
                  <i className="fa-solid fa-map-location-dot"></i> 3. Residential Address
                </h3>
                <p className="sections-description">
                  Permanent communication address for transport routes and official notices.
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  Street Address / Village & Post <span className="form-requre">*</span>
                </label>
                <textarea
                  id="address"
                  required
                  placeholder="Village / Mohalla, Post Office, Police Station"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="city">
                    City / Town <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    placeholder="e.g. Naitand / Giridih"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="district">
                    District <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="district"
                    required
                    placeholder="e.g. Giridih"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="state">
                    State <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    required
                    placeholder="e.g. Jharkhand"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pinCode">
                    PIN Code <span className="form-requre">*</span>
                  </label>
                  <input
                    type="text"
                    id="pinCode"
                    required
                    maxLength={6}
                    placeholder="e.g. 815316"
                    value={formData.pinCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalInfo">Special Needs or Medical / Transport Notes</label>
                <textarea
                  id="additionalInfo"
                  placeholder="Mention school bus transport requirement, medical allergies, or any other specific notes"
                  rows="3"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn submit-button"
              disabled={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, #07132c 0%, #0b1c3d 50%, #1e3a8a 100%)',
                color: '#fbbf24',
                border: '1.5px solid #fbbf24',
                borderRadius: '12px',
                padding: '16px 36px',
                fontSize: '1.15rem',
                fontWeight: '800',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 24px rgba(11, 28, 61, 0.3)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'all 0.25s ease',
                marginTop: '10px'
              }}
            >
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
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  <span>Submit Online Application</span>
                </>
              )}
            </button>

            {message && (
              <div className={`form-message ${messageType}`}>
                {messageType === 'success' ? (
                  <i className="fa-solid fa-circle-check"></i>
                ) : (
                  <i className="fa-solid fa-circle-exclamation"></i>
                )}
                <span>{message}</span>
              </div>
            )}

            <div
              className="terms-text"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '14px',
                fontSize: '0.85rem',
                color: '#64748b',
                textAlign: 'center'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>By submitting this registration form, you certify that all information provided is authentic. The admission desk will contact you within 24 hours.</span>
            </div>
          </form>
        </div>
      </section>

      {/* 6. HELP & CAMPUS VISIT SECTION */}
      <section
        className="contents-section admission-help-section"
        id="admissions-helpline"
        style={{
          background: 'linear-gradient(180deg, #07132c 0%, #0b1c3d 100%)',
          color: '#ffffff',
          padding: '80px 20px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div
          className="contacts-container admission-help-container"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <div className="contacts-header admission-help-header" style={{ marginBottom: '44px' }}>
            <span
              className="admission-sub-badge gold"
              style={{
                display: 'inline-block',
                background: 'rgba(251, 191, 36, 0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                padding: '4px 16px',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              ADMISSION DESK
            </span>
            <h2
              className="contacts-heading admission-help-heading"
              style={{
                fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.5rem)',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 0 12px 0',
                letterSpacing: '-0.02em'
              }}
            >
              Need Help with Admissions?
            </h2>
            <p
              className="contacts-para admission-help-para"
              style={{
                fontSize: '1.05rem',
                color: '#cbd5e1',
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}
            >
              Our dedicated academic admission desk is happy to answer your queries regarding fees, eligibility, school bus transport, or hostel accommodation.
            </p>
          </div>

          <div
            className="contacts-details admission-help-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '44px'
            }}
          >
            {/* Helpline Item */}
            <div
              className="contacts-item admission-help-card"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backdropFilter: 'blur(6px)'
              }}
            >
              <div
                className="contact-icon-circle blue"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#60a5fa',
                  border: '1.5px solid rgba(96, 165, 250, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)", fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: '0 0 10px 0' }}>
                Helpline Desk
              </h3>
              <p style={{ margin: '3px 0', fontSize: '1rem' }}>
                <a href="tel:+919431378901" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: '700' }}>+91 94313 78901</a>
              </p>
              <p style={{ margin: '3px 0', fontSize: '0.95rem' }}>
                <a href="tel:+919876543210" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600' }}>+91 98765 43210</a>
              </p>
            </div>

            {/* Email Item */}
            <div
              className="contacts-item admission-help-card"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backdropFilter: 'blur(6px)'
              }}
            >
              <div
                className="contact-icon-circle amber"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#fbbf24',
                  border: '1.5px solid rgba(251, 191, 36, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)", fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: '0 0 10px 0' }}>
                Email Inquiries
              </h3>
              <p style={{ margin: '3px 0', fontSize: '0.95rem' }}>
                <a href="mailto:info@lbmdps.edu.in" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: '700' }}>info@lbmdps.edu.in</a>
              </p>
              <p style={{ margin: '3px 0', fontSize: '0.92rem' }}>
                <a href="mailto:admissions@lbmdps.edu.in" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600' }}>admissions@lbmdps.edu.in</a>
              </p>
            </div>

            {/* Hours Item */}
            <div
              className="contacts-item admission-help-card"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backdropFilter: 'blur(6px)'
              }}
            >
              <div
                className="contact-icon-circle green"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#34d399',
                  border: '1.5px solid rgba(52, 211, 153, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)", fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: '0 0 10px 0' }}>
                Counseling Hours
              </h3>
              <p style={{ margin: '3px 0', fontSize: '0.95rem', color: '#cbd5e1' }}>
                Mon - Sat: <strong style={{ color: '#ffffff' }}>8:00 AM - 4:00 PM</strong>
              </p>
              <p style={{ margin: '3px 0', fontSize: '0.92rem', color: '#94a3b8' }}>
                Sunday: <span style={{ color: '#f87171', fontWeight: '700' }}>Closed</span>
              </p>
            </div>
          </div>

          <div className="visit-campus" style={{ marginTop: '10px' }}>
            <a
              href="https://maps.app.goo.gl/4a2T6UkxDafY3xcv8"
              className="visit-campus-button"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#0b1c3d',
                fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                fontSize: '1rem',
                fontWeight: '800',
                padding: '14px 36px',
                borderRadius: '50px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                transition: 'all 0.25s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Visit Campus on Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Admission;
