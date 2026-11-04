import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaHome, FaArrowLeft, FaGraduationCap, FaBook, FaPhoneAlt } from 'react-icons/fa';
import campusBg from '../../components/AllImage/4.jpg';
import schoolLogo from '../../components/AllImage/school-logo.jpg';
import './index.css';

const NotFound = () => {
  const history = useHistory();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      history.goBack();
    } else {
      history.push('/');
    }
  };

  return (
    <div className="not-found-page-root">
      <Header />
      <main
        className="not-found-master-page"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.86) 0%, rgba(15, 23, 42, 0.90) 100%), url(${campusBg})`
        }}
      >
        <div className="not-found-container">
          <div className="not-found-card">
            <div className="not-found-school-tag">
              <img src={schoolLogo} alt="LBMDPS Logo" className="not-found-logo" />
              <div className="not-found-tag-text">
                <span className="school-name">Lal Bihari Mahto</span>
                <span className="school-affil">Divine Public School • CBSE Affiliated #3430398 • UDISE: 20060105502</span>
              </div>
            </div>

            <div className="not-found-code-wrapper">
              <span className="not-found-code">404</span>
            </div>

            <h1 className="not-found-title">Oops! We lost this page.</h1>
            <p className="not-found-description">
              The page you were trying to reach does not exist, may have moved, or the link may be broken. Let&apos;s get you back to the important things.
            </p>

            <div className="not-found-primary-actions">
              <Link to="/" className="btn-not-found-home">
                <FaHome className="btn-icon" /> Return to Homepage
              </Link>
              <button
                type="button"
                className="btn-not-found-back"
                onClick={handleGoBack}
              >
                <FaArrowLeft className="btn-icon" /> Go Back
              </button>
            </div>

            <div className="not-found-quick-links-panel">
              <span className="quick-links-heading">Popular destinations</span>
              <div className="quick-links-row">
                <Link to="/admissions" className="quick-chip-link">
                  <FaGraduationCap /> Admissions 2026–27
                </Link>
                <Link to="/academic" className="quick-chip-link">
                  <FaBook /> Academic Wings
                </Link>
                <Link to="/contact" className="quick-chip-link">
                  <FaPhoneAlt /> Contact Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
