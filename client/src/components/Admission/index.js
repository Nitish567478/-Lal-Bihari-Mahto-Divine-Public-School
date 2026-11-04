import { FaCheck } from 'react-icons/fa';
import React, { useState } from 'react';

import Header from '../Header';
import Footer from '../Footer';

import './admission.css'

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

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'file' ? files[0] : value, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (expand as needed)
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
      setMessage('Please fill in all required fields.');
      return;
    }
    // You'll likely want to use FormData to send the form data (including the file) to your backend.
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        body: data, // Send FormData
      });

      if (response.ok) {
        setMessage('Application submitted successfully!');
        // Reset the form after successful submission
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
        setMessage(`Submission failed.  Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('An error occurred during submission.');
    }
  };

    return (
        <>
            <Header />
            <section className="school-section">
                <div className="content-wrapper">
                    <h1 className="school-heading">Join Our School Family</h1>
                    <p className="school-para">Begin your child's journey of excellence with us. We welcome students who are eager to learn, grow, and make a positive impact in the world.</p>
                </div>
            </section>

            <section className="admission-step-section">
            <div className="admission-container">
                <h2 className="admission-tittle">Admission Process</h2>
                <p className="admission-discussion">
                Our streamlined admission process is designed to be simple and transparent for parents and students.
                </p>
            </div>

            <div className="process-step">
                {/* Step 1 */}
                <div className="step-card">
                <div className="icon-wrapper-process blue-bg-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-text" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg>
                </div>
                <h3 className="admission-step">Step 1</h3>
                <h1 className="admission-step-name">Application Form</h1>
                <p className="admission-step-discussion">
                    Fill out the online application form or collect the form from school office.
                </p>
                </div>

                {/* Step 2 */}
                <div className="step-card">
                <div className="icon-wrapper-process green-bg-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                    <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                    </svg>
                </div>
                <h3 className="admission-step">Step 2</h3>
                <h1 className="admission-step-name">Document Submission</h1>
                <p className="admission-step-discussion">
                    Submit required documents along with the completed application form.
                </p>
                </div>

                {/* Step 3 */}
                <div className="step-card">
                <div className="icon-wrapper-process purple-bg-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                    </svg>
                </div>
                <h3 className="admission-step">Step 3</h3>
                <h1 className="admission-step-name">Interaction</h1>
                <p className="admission-step-discussion">
                    Student interaction and parent meeting with school administration.
                </p>
                </div>

                {/* Step 4 */}
                <div className="step-card">
                <div className="icon-wrapper-process orange-bg-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                    </svg>
                </div>
                <h3 className="admission-step">Step 4</h3>
                <h1 className="admission-step-name">Confirmation</h1>
                <p className="admission-step-discussion">
                    Admission confirmation and fee payment to secure the seat.
                </p>
                </div>
            </div>
            </section>  

            <section className="documents-section">
                <div className="documents-container">
                    <h2 className="documents-title">Required Documents</h2>
                    <p className="documents-description">
                    Please ensure you have all the necessary documents ready for a smooth admission process.
                    </p>

                    <div className="document-types">
                    {/* New Admissions */}
                    <div className="document-card">
                        <div className="doc-card-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-text" viewBox="0 0 16 16">
                            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                        </svg>
                        <h3>For New Admissions</h3>
                        </div>
                        <ul>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                            </svg>
                            Birth Certificate (Original + Photocopy)
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                            </svg>
                            Aadhar Card of Student & Parents
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                            </svg>
                            Passport Size Photographs (4 copies)
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                            </svg>
                            Address Proof (Utility Bill, Ration Card, etc.).
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                            </svg>
                            Caste Certificate (if applicable)
                        </li>
                        </ul>
                    </div>

                    {/* Transfer Students */}
                    <div className="document-card">
                        <div className="doc-card-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                        </svg>
                        <h3>For Transfer Students</h3>
                        </div>
                        <ul>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                            </svg>
                            Transfer Certificate (TC)
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                            </svg>Previous School Report Card
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                </svg>Character Certificate
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                </svg>Migration Certificate (if from different board)
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                </svg>All documents mentioned for new admissions
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </section>

            <section className="fee-section">
                <div className="fee-container">
                    <h1 className="fee-heading">Fee Structure 2024-25</h1>
                    <p className="subtitle">
                    Transparent and affordable fee structure designed to provide quality education for all.
                    </p>

                    <div className="fee-cards">
                    {/* Primary */}
                    <div className="card">
                        <div className="icon-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
                            </svg>
                        </div>
                        <h2 className="card-heading">Primary (I-V)</h2>
                        <p className="classes">Classes 1 to 5</p>
                        <p className="price">₹25,000</p>
                        <p className="per-year">Per Year</p>
                        <ul className='list-name'>
                            <li><span className="check-icon"><FaCheck />️</span>Tuition Fee</li>
                            <li><span className="check-icon"><FaCheck />️</span>Books & Stationery</li>
                            <li><span className="check-icon"><FaCheck />️</span>Activity Fee</li>
                            <li><span className="check-icon"><FaCheck />️</span>Examination Fee</li>
                        </ul>
                    </div>

                    {/* Middle */}
                    <div className="card most-popular">
                        <div className="popular-tag">Most Popular</div>
                        <div className="icon-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
                            </svg>
                        </div>
                        <h2 className="card-heading">Middle (VI-VIII)</h2>
                        <p className="classes">Classes 6 to 8</p>
                        <p className="price">₹35,000</p>
                        <p className="per-year">Per Year</p>
                        <ul className='list-name'>
                            <li><span className="check-icon"><FaCheck />️</span>Tuition Fee</li>
                            <li><span className="check-icon"><FaCheck />️</span>Books & Stationery</li>
                            <li><span className="check-icon"><FaCheck />️</span>Lab Fee</li>
                            <li><span className="check-icon"><FaCheck />️</span>Computer Fee</li>
                            <li><span className="check-icon"><FaCheck />️</span>Activity Fee</li>
                        </ul>
                    </div>

                    {/* Senior */}
                    <div className="card">
                        <div className="icon-senior">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
                            </svg>
                        </div>
                        <h2 className="card-heading">Secondary (IX-X)</h2>
                        <p className="classes">Classes 9 to 10</p>
                        <p className="price">₹45,000</p>
                        <p className="per-year">Per Year</p>
                        <ul className='list-name'>
                            <li><span className="check-icon"><FaCheck />️</span>Tuition Fee</li>
                            <li><span className="check-icon"><FaCheck />️</span>Books & Stationery</li>
                            <li><span className="check-icon"><FaCheck />️</span>Lab Fee</li>
                            <li><span className="check-icon"><FaCheck />️</span>Board Exam Fee</li>
                            <li><span className="check-icon"><FaCheck />️</span>Career Counseling</li>
                        </ul>
                    </div>
                    </div>

                    <p className="footer-note">
                    * Fee can be paid in quarterly installments. Scholarships available for meritorious students.
                    </p>

                    <button className="fee-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                    </svg>
                    Download Fee Structure
                    </button>
                </div>
            </section>

            <section className="form-section">
                <div className="form-containerss">
                    <header className="form-header">
                    <h1 className="form-heading">Online Application Form</h1>
                    <p className="form-para">
                        Fill out the form below to begin your child's admission process. Our team will contact you within 24 hours.
                    </p>
                    </header>

                    <form className="application-form" onSubmit={handleSubmit}>
                        <section>
                            <div className="form-section-header">
                            <h2 className="application-form-heading">Student Information</h2>
                            <p className="sections-description">
                                Please provide accurate information for the admission process.
                            </p>
                            </div>

                            <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="studentName">
                                Student Name <span className="form-requre">*</span>
                                </label>
                                <input
                                type="text"
                                id="studentName"
                                required
                                placeholder="Enter student's full name"
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
                                <option value="" disabled>
                                    Select a class
                                </option>
                                <option value="pre-nursery">Pre - Nursery</option>
                                <option value="nursery">Nursery</option>
                                <option value="lkg">L.K.G</option>
                                <option value="ukg">U.K.G</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                    </option>
                                ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="previousSchool">Previous School</label>
                                <input
                                type="text"
                                id="previousSchool"
                                placeholder="Name of previous school"
                                value={formData.previousSchool}
                                onChange={handleChange}
                                />
                            </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor="parentName">
                                Father's Name <span className="form-requre">*</span>
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

                            <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="phone">
                                Phone Number <span className="form-requre">*</span>
                                </label>
                                <input
                                type="tel"
                                id="phone"
                                required
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                Email Address <span className="form-requre">*</span>
                                </label>
                                <input
                                type="email"
                                id="email"
                                required
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={handleChange}
                                />
                            </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor="aadharNumber">
                                Aadhar Number <span className="form-requre">*</span>
                            </label>
                            <input
                                type="text"
                                id="aadharNumber"
                                required
                                placeholder="Enter Aadhar Number"
                                value={formData.aadharNumber}
                                onChange={handleChange}
                            />
                            </div>

                            <div className="form-group">
                            <label htmlFor="photo">
                                Photo <span className="form-requre">*</span>
                            </label>
                            <input
                                type="file"
                                id="photo"
                                required
                                accept="image/*" 
                                onChange={handleChange}
                            />
                            {formData.photo && (
                                <p>Selected File: {formData.photo.name}</p>
                            )}
                            </div>
                            <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="city">
                                City <span className="form-requre">*</span>
                                </label>
                                <input
                                type="text"
                                id="city"
                                required
                                placeholder="Enter City"
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
                                placeholder="Enter District"
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
                                placeholder="Enter State"
                                value={formData.state}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pinCode">
                                Pin Code <span className="form-requre">*</span>
                                </label>
                                <input
                                type="text"
                                id="pinCode"
                                required
                                placeholder="Enter Pin Code"
                                value={formData.pinCode}
                                onChange={handleChange}
                                />
                            </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor="category">
                                Category <span className="form-requre">*</span>
                            </label>
                            <select
                                id="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                Select Category
                                </option>
                                <option value="general">General</option>
                                <option value="obc">OBC</option>
                                <option value="sc">SC</option>
                                <option value="st">ST</option>
                                <option value="ews">EWS</option>
                            </select>
                            </div>

                            <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="fatherOccupation">
                                Father's Occupation <span className="form-requre">*</span>
                                </label>
                                <input
                                type="text"
                                id="fatherOccupation"
                                required
                                placeholder="Enter Father's Occupation"
                                value={formData.fatherOccupation}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="motherOccupation">
                                Mother's Occupation <span className="form-requre">*</span>
                                </label>
                                <input
                                type="text"
                                id="motherOccupation"
                                required
                                placeholder="Enter Mother's Occupation"
                                value={formData.motherOccupation}
                                onChange={handleChange}
                                />
                            </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="nationality">
                                    Nationality <span className="form-requre">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nationality"
                                    required
                                    placeholder="Enter Nationality (Indian)"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">
                                    Address <span className="form-requre">*</span>
                                </label>
                                <textarea
                                    id="address"
                                    required
                                    placeholder="Enter complete address"
                                    rows="4"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="additionalInfo">Additional Information</label>
                                <textarea
                                    id="additionalInfo"
                                    placeholder="Any special requirements or additional information"
                                    rows="4"
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                />
                            </div>
                        </section>

                        <button type="submit" className="submit-btn">
                            Submit Application
                        </button>
                        <div id="form-message" className="form-message">
                            {message}
                        </div>
                        <p className="terms-text">
                            By submitting this form, you agree to our terms and conditions. We will
                            contact you within 24 hours.
                        </p>
                    </form>

                </div>
            </section>

            <section className="contents-section">
                <div className="contacts-container">
                    <div className="contacts-header">
                    <h1 className="contacts-heading">Need Help with Admissions?</h1>
                    <p className="contacts-para">
                        Our admission team is here to help you with any questions or concerns
                        about the admission process.
                    </p>
                    </div>

                    <div className="contacts-details">
                    <div className="contacts-item">
                        <div className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" 
                            height="24"
                            fill="currentColor"
                            className="bi bi-telephone"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                        </svg>
                        </div>
                        <h3>Call Us</h3>
                        <p>+91 98765 43210</p>
                        <p>+91 87654 32109</p>
                    </div>

                    <div className="contacts-item">
                        <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                        </svg>
                        </div>
                        <h3>Email Us</h3>
                        <p>admissions@ibmdps.edu.in</p>
                        <p>info@ibmdps.edu.in</p>
                    </div>

                    <div className="contacts-item">
                        <div className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-clock"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                        </svg>
                        </div>
                        <h3>Office Hours</h3>
                        <p>Mon - Sat: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                    </div>

                    <div className="visit-campus">
                        <a
                            href="https://maps.app.goo.gl/4a2T6UkxDafY3xcv8"
                            className="visit-campus-button"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg> Visit Our Campus
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
            
        </>
    );
}

export default Admission
