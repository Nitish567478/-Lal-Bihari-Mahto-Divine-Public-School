import React, { useState } from "react";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";
import useContent from "../../hooks/useContent";

const Contact = () => {
  const { content: contactContent = {} } = useContent('contact-info');
  const addressLines = contactContent.address || [
    'Lal Bhari Mhattho Devine Public School',
    'Village Naitand, District Ranchi',
    'Jharkhand - 835103, India',
  ];
  const phones = contactContent.phones || [
    { label: 'Main Office', value: '+91 98765 43210' },
    { label: 'Admissions', value: '+91 87654 32109' },
    { label: 'Principal', value: '+91 76543 21098' },
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
    subject: "",
    message: "",
  });

  const [visitData, setVisitData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    preferredDate: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [visitSuccessMessage, setVisitSuccessMessage] = useState("");
  const [showVisitPopup, setShowVisitPopup] = useState(false);

  // Handle main contact form change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle campus visit form change
  const handleVisitChange = (e) => {
    const { id, value } = e.target;
    setVisitData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Submit main contact form
  const handleSubmit = (e) => {
    e.preventDefault();
    const savedData = JSON.parse(localStorage.getItem("contactForm")) || [];
    savedData.push(formData);
    localStorage.setItem("contactForm", JSON.stringify(savedData));
    setSuccessMessage("Your message has been submitted successfully!");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Submit campus visit form
  const handleVisitSubmit = (e) => {
    e.preventDefault();
    const savedVisitData =
      JSON.parse(localStorage.getItem("visitForm")) || [];
    savedVisitData.push(visitData);
    localStorage.setItem("visitForm", JSON.stringify(savedVisitData));
    setVisitSuccessMessage("Campus visit scheduled successfully!");
    setVisitData({
      name: "",
      email: "",
      phoneNumber: "",
      preferredDate: "",
      message: "",
    });
    setTimeout(() => setVisitSuccessMessage(""), 3000);
    setShowVisitPopup(false);
  };



  return (
    <>
        <Header />
        <section className="contact-head-section">
        <h1 className="contact-head-heading">Get in Touch</h1>
        <p className="contact-head-para">
          We're here to help and answer any questions you might have. We look forward to hearing from you.
        </p>
        </section>

        <section className="contact-section">
          <h2 className="contact-heading">Contact Information</h2>

          <div className="card-container">
            <div className="card">
              <div className="card-header">
                <div className="icon-wrapper co-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                  </svg>
                </div>
                <h3 className="card-title">School Address</h3>
              </div>
              <div className="card-content">
                {addressLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="icon-wrapper co-green">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                  </svg>
                </div>
                <h3 className="card-title">Phone Numbers</h3>
              </div>
              <div className="card-content">
                {phones.map((item, index) => (
                  <p key={index}>
                    <strong>{item.label}:</strong>{' '}
                    <a href={`tel:${item.value.replace(/[^0-9+]/g, '')}`}>{item.value}</a>
                  </p>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="icon-wrapper co-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                  </svg>
                </div>
                <h3 className="card-title">Email Addresses</h3>
              </div>
              <div className="card-content">
                {emails.map((item, index) => (
                  <p key={index}>
                    <strong>{item.label}:</strong>{' '}
                    <a href={`mailto:${item.value}`}>{item.value}</a>
                  </p>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="icon-wrapper co-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                  </svg>
                </div>
                <h3 className="card-title">Office Hours</h3>
              </div>
              <div className="card-content">
                {hours.map((hour, index) => (
                  <p key={index}>{hour}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="buttons-container">
      
            <button
                className="button primary"
                onClick={() => {
                const address = encodeURIComponent(addressLines.join(', '));
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, "_blank");
                }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg> Get Directions
            </button>

            <button
                className="button secondary"
                onClick={() => {
                const phoneNumber = phones[0]?.value?.replace(/[^0-9+]/g, '') || '919876543210';
                window.open(`https://wa.me/${phoneNumber}`, "_blank");
                }}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-whatsapp"
                viewBox="0 0 16 16"
                >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg> WhatsApp Us
            </button>

            <div>
              <button
                className="button primary"
                onClick={() => setShowVisitPopup(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-minus" viewBox="0 0 16 16">
                  <path d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                </svg> Schedule Campus Visit
              </button>
              {showVisitPopup && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <h2>Schedule a Campus Visit</h2>
                    <form onSubmit={handleVisitSubmit}>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        value={visitData.name}
                        onChange={handleVisitChange}
                        required
                      />
                      <input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        value={visitData.email}
                        onChange={handleVisitChange}
                        required
                      />
                      <input
                        type="tel"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        value={visitData.phoneNumber}
                        onChange={handleVisitChange}
                        required
                      />
                      <input
                        type="date"
                        id="preferredDate"
                        value={visitData.preferredDate}
                        onChange={handleVisitChange}
                        required
                      />
                      <textarea
                        id="message"
                        placeholder="Message / Notes"
                        value={visitData.message}
                        onChange={handleVisitChange}
                      />
                      <div className="popup-buttons">
                        <button type="submit">Submit</button>
                        <button
                          type="button"
                          onClick={() => setShowVisitPopup(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    {visitSuccessMessage && (
                      <p className="form-messagess">{visitSuccessMessage}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
          </div>

        </section>

        <section className="message-location-container">
        <div className="message-section">
          <div className="message-container">
            <h1 className="message-heading">Send us a Message</h1>
            <p className="message-para">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            <form className="message-form" onSubmit={handleSubmit}>
              <div className="message-form-group-row">
                <div className="message-form-group">
                  <label htmlFor="firstName">First Name <span className="form-requre">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your first name"
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
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="message-form-group">
                <label htmlFor="email">Email <span className="form-requre">*</span></label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="message-form-group">
                <label htmlFor="phoneNumber">Phone Number<span className="form-requre">*</span></label>
                <input
                  type="tel"
                  id="phoneNumber"
                  maxLength="10"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="message-form-group">
                <label htmlFor="subject">Subject <span className="form-requre">*</span></label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="message-form-group">
                <label htmlFor="message">Message <span className="form-requre">*</span></label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  required
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>
 
              <button type="submit" className="submit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg> Submit Application</button>
              {successMessage && <div className="form-messagess">{successMessage}</div>}

              <p className="terms-text">
                By submitting this form, you agree to our terms and conditions. We will contact you within 24 hours.
              </p>
            </form>
          </div>

          <div className="location-container">
            <h1 className="location-heading">Find Us Map</h1>
            <p className="location-para">
              Located in the heart of Naitand, our campus is easily accessible by road and public transportation.
            </p>
            <div className="location-card">
              <div id="map-container">
                <iframe
                  title="School Location"
                  src={mapLink}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
        </section>
        <Footer />
    </>
  );
};

export default Contact;
