import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Notices = () => {
  return (
    <>
      <Header />
      <div className="notice-section">
        <section className="notice-head">
          <h1 className="notice-heading">Notice</h1>
          <p className="notice-para">All notices are available for all categories.</p>
        </section>

        <div className="all-notice-section">
          <p className="new">
            <a href="./image/Ruchi.pdf" target="_blank" rel="noopener noreferrer">
              Ruchi 10th Result
            </a>
          </p>
          <p className="new">
            <a href="./image/nitish.jpg" target="_blank" rel="noopener noreferrer">
              Nitish Image
            </a>
          </p>
          <p className="new">
            <a href="./image/ra marsite.jpg" target="_blank" rel="noopener noreferrer">
              Image
            </a>
          </p>
          <p className="new">
            <a
              href="./image/DEVNARAYAN RESUME .pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Notices