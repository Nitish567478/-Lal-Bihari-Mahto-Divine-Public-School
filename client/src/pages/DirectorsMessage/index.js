import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "../MissionVision/index.css";

const DirectorsMessage = () => {
  return (
    <>
      <Header />
      <div className="subpage-wrapper">
        <section className="subpage-hero-banner">
          <div className="subpage-hero-inner">
            <span className="subpage-pill">Leadership Words</span>
            <h1>Director's & Principal's Message</h1>
            <p>
              Guiding thoughts and leadership philosophy from the founders and academic mentors of LBMDPS, Naitand.
            </p>
          </div>
        </section>

        <section className="subpage-content-section">
          <div className="subpage-container">
            {/* Chairman / Founder Message */}
            <div className="mv-card" style={{ borderTop: "5px solid #b45309", marginBottom: "28px" }}>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
                <img
                  src="https://i.ibb.co/wFwwXKfb/images.png"
                  alt="Principal H. P. Verma"
                  style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover", border: "2px solid #2563eb" }}
                />
                
                <div>
                  <h2 style={{ margin: "0", fontSize: "20px", color: "#0b1c3d" }}>Lal Bihari Mahto</h2>
                  <p style={{ margin: "2px 0 0 0", color: "#b45309", fontWeight: "700", fontSize: "13px" }}>
                    Founder & Chairman, Lal Bihari Mahto Divine Public School
                  </p>
                </div>
              </div>
              <p>
                "When we founded Lal Bihari Mahto Divine Public School in 2013, our singular dream was to provide world-class, value-centric, and affordable CBSE education to the aspiring youth of Naitand, Giridih, and surrounding rural regions. We believe that true education does not just fill a vessel, but kindles an everlasting flame of knowledge, curiosity, and moral rectitude."
              </p>
              <p>
                "Over the past 13+ years, witnessing our students achieve top CBSE district ranks, excel in medical/engineering entries, and develop into compassionate human beings has been the greatest fulfillment of our founding vision. We remain committed to investing in modern infrastructure, AI labs, and athletic grounds to empower every child who walks through our gates."
              </p>
            </div>

            {/* Principal's Message */}
            <div className="mv-card" style={{ borderTop: "5px solid #2563eb", marginBottom: "36px" }}>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
                <img
                  src="https://i.ibb.co/wFwwXKfb/images.png"
                  alt="Principal H. P. Verma"
                  style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover", border: "2px solid #2563eb" }}
                />
                <div>
                  <h2 style={{ margin: "0", fontSize: "20px", color: "#0b1c3d" }}>H. P. Verma (M.Sc., B.Ed.)</h2>
                  <p style={{ margin: "2px 0 0 0", color: "#2563eb", fontWeight: "700", fontSize: "13px" }}>
                    Principal & Head of Academics, LBMDPS
                  </p>
                </div>
              </div>
              <p>
                "Dear Parents and Students, Welcome to Lal Bihari Mahto Divine Public School. In this era of rapid technological transformation, education must go beyond conventional rote-learning. Our pedagogy blends the rigorous CBSE syllabus with experiential science labs, computer programming, interactive digital boards, and an active sports house system."
              </p>
              <p>
                "Our school motto, <em>'Vidya Dadati Vinayam'</em> (Knowledge Bestows Humility), serves as our daily compass. We strive to nurture curious minds, disciplined character, and courageous hearts ready to meet global challenges. I invite you to partner with us in shaping your child's radiant future."
              </p>
            </div>

            <div className="subpage-cta-box">
              <h3>Join the LBMDPS Family</h3>
              <p>Applications are open for Pre-Nursery to Class X (Class 1 to 10) for the 2026-2027 academic session.</p>
              <Link to="/admissions" className="subpage-cta-btn">Apply for Admission &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DirectorsMessage;
