import React from "react";

import Header from "../Header";
import Footer from "../Footer";

import "./index.css"; // your CSS file

const About = () => {
  return (
    <>
        <Header />
      <section className="about-section">
        <div className="about-container">
          <div className="about-mission">
            <div className="about-mission-top">
              <div className="icon-heading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bullseye"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
                  <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
                <h2 className="about-heading">Our Mission</h2>
              </div>
            </div>
            <p className="about-mission-discussion">
              To provide holistic education that nurtures intellectual curiosity,
              moral values, and creative expression while preparing students to
              become responsible global citizens who contribute positively to
              society.
            </p>
          </div>

          <div className="about-vision">
            <div className="about-vision-top">
              <div className="icon-heading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
                <h2 className="about-heading">Our Vision</h2>
              </div>
            </div>
            <p className="about-vision-discussion">
              To be a leading educational institution that empowers students with
              knowledge, skills, and values necessary to excel in an ever-changing
              world while maintaining strong cultural roots and ethical foundations.
            </p>
          </div>
        </div>
      </section>

      <section className="special-section">
        <div className="special-container">
          <div className="special-top-container">
            <h1 className="special-heading">What Makes Us Special</h1>
            <p className="special-para">
              Discover the unique advantages that set Lal Bihari Mahto Divine
              Public School apart from others.
            </p>
          </div>

          <section className="content-grid" aria-label="School community features and image">
            <div className="features-list" role="list">
              {[
                {
                  title: "Experienced Faculty",
                  desc: "Our dedicated teachers bring years of experience and passion for education to every classroom.",
                },
                {
                  title: "Small Class Sizes",
                  desc: "Personalized attention with optimal teacher-to-student ratios for better learning outcomes.",
                },
                {
                  title: "Modern Infrastructure",
                  desc: "State-of-the-art facilities including smart classrooms, laboratories, and sports complexes.",
                },
                {
                  title: "Holistic Development",
                  desc: "Focus on academics, sports, arts, and character building for well-rounded development.",
                },
                {
                  title: "Strong Alumni Network",
                  desc: "Our graduates excel in various fields and maintain strong connections with the school.",
                },
              ].map((item, i) => (
                <article className="feature-item" key={i} role="listitem">
                  <span className="material-icons feature-icon" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check2-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                    </svg>
                  </span>
                  <div className="feature-text">
                    <h3 className="feature-text-heading">{item.title}</h3>
                    <p className="feature-text-para">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            <figure className="image-container" aria-label="Illustration representing school community image">
              <img src="image/4.jpg" alt="School community illustration" />
            </figure>
          </section>
        </div>
      </section>
        <Footer />
    </>
  );
};

export default About;
