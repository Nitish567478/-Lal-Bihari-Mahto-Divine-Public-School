import React from "react";
import Header from "../Header";
import Slider from "../Slider";
import Footer from "../Footer";
import useContent from "../../hooks/useContent";

import awardIcon from "../AllImage/3.jpg";
import principalImage from "../AllImage/my_profile.png";

import "./home.css";

const Home = () => {
  const { content: homeContent = {} } = useContent('home-hero');

  const homeTitle = homeContent.title || 'Committed to Excellence in Education';
  const homeDescription =
    homeContent.description ||
    'Lal Bihari Mahto Divine Public School, Naitand, has been a beacon of quality education for nearly three decades. We believe in nurturing not just academic excellence but also character, creativity, and critical thinking.';

  const stats =
    homeContent.stats ||
    [
      { number: '1500+', name: 'Students' },
      { number: '100%', name: 'Success Rate' },
      { number: '15+', name: 'Expert Teachers' },
      { number: '15+', name: 'Years of Excellence' },
    ];

  const features =
    homeContent.features ||
    [
      'CBSE Affiliated with Modern Curriculum',
      'Experienced and Dedicated Faculty',
      'State-of-the-Art Infrastructure',
      'Holistic Development Programs',
    ];

  return (
    <div className="home-container">
      <Header />
      <Slider />

      {/* Stats Section */}
      <section>
        <div className="bgg-container">
          <div className="stats-grid">
            {stats.map((item, index) => (
              <div className="stat-block" key={index}>
                <div className="stat-number">{item.number}</div>
                <div className="stat-name">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committed Section */}
      <section className="committed-section">
        <div className="committed-section-top">
          <div className="committed-left">
            <h1 className="committed-heading">{homeTitle}</h1>
            <p className="committed-discussion">{homeDescription}</p>

            <div className="space-y-4 m-8">
              {features.map((text, index) => (
                <div className="committed-icon-name" key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-check2-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <button className="committed-button">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </button>
          </div>

          <div className="committed-outter-image">
            <img className="committed-image" src={awardIcon} alt="School Campus" />
          </div>
        </div>
      </section>

      {/* Academic Section */}
      <section className="academic-section">
        <div className="containers">
          <div className="text-center">
            <h1 className="academic-headings">Academic Excellence at Every Level</h1>
            <p className="academic-descriptions">
              From foundational learning to advanced academics, we offer comprehensive programs
              designed to unlock every student's potential.
            </p>
          </div>

          <div className="card-grids">
            {/* Primary Education */}
            <div className="academic-cards">
              <div className="card-headers">
                <div className="icon-badge-fiss">
                  <div className="award-icon-fiss">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-book"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                    </svg>
                  </div>
                </div>
                <h3 className="academic-card-header-names">Primary Education</h3>
                <p className="academic-card-header-classs">Classes Pre-Nursery – V</p>
              </div>
              <hr />
              <div className="card-bodys">
                <p>
                  Building strong foundations with play-based learning, creativity, and basic academic
                  skills.
                </p>
                <ul>
                  <li>Interactive Learning Methods</li>
                  <li>Creative Arts & Crafts</li>
                  <li>Physical Development</li>
                </ul>
              </div>
            </div>

            {/* Middle School */}
            <div className="academic-cards">
              <div className="card-headers">
                <div className="icon-badge-secs">
                  <div className="award-icon-secs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-people"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                    </svg>
                  </div>
                </div>
                <h3 className="academic-card-header-names">Middle School</h3>
                <p className="academic-card-header-classs">Classes VI – VIII</p>
              </div>
              <hr />
              <div className="card-bodys">
                <p>
                  Encouraging analytical thinking and practical knowledge to prepare for higher
                  education.
                </p>
                <ul>
                  <li>Science Experiments & Labs</li>
                  <li>Computer Education</li>
                  <li>Team Projects & Activities</li>
                </ul>
              </div>
            </div>

            {/* Senior School */}
            <div className="academic-card">
              <div className="card-header">
                <div className="icon-badge-sec">
                  <div className="award-icon-sec">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-award"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
                      <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
                    </svg>
                  </div>
                </div>
                <h3 className="academic-card-header-name">Secondary School</h3>
                <p className="academic-card-header-class">Classes IX – X</p>
              </div>
              <hr />
              <div className="card-body">
                <p>
                  Preparing students for board exams, higher education, and career readiness through
                  rigorous academics.
                </p>
                <ul>
                  <li>Advanced Curriculum & Electives</li>
                  <li>Competitive Exam Preparation</li>
                  <li>Leadership & Community Programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stand Section */}
      <section className="stand-section">
        <h1 className="stand-heading">Why Choose Us?</h1>
        <p className="stand-discussion">
          Our core values guide everything we do, shaping not just academic success but character
          development.
        </p>

        <div className="stand-container">
          <div className="stand-grid">
            <div className="stand-icon stand-icon-fis">
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
            </div>
            <h2 className="stand-grid-heading">Excellence</h2>
            <p className="stand-grid-para">Striving for the highest standards in everything we do.</p>
          </div>

          <div className="stand-grid">
            <div className="stand-icon stand-icon-sec">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            </div>
            <h2 className="stand-grid-heading">Compassion</h2>
            <p className="stand-grid-para">Fostering empathy, kindness, and care for others.</p>
          </div>

          <div className="stand-grid">
            <div className="stand-icon stand-icon-tir">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lightbulb"
                viewBox="0 0 16 16"
              >
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1" />
              </svg>
            </div>
            <h2 className="stand-grid-heading">Innovation</h2>
            <p className="stand-grid-para">Encouraging creativity and forward-thinking approaches.</p>
          </div>

          <div className="stand-grid">
            <div className="stand-icon stand-icon-for">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-shield"
                viewBox="0 0 16 16"
              >
                <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
              </svg>
            </div>
            <h2 className="stand-grid-heading">Integrity</h2>
            <p className="stand-grid-para">Building character through honesty and moral principles.</p>
          </div>
        </div>
      </section>

      <section className="principal-message-section">
        <div className="principal-message">
          <div className="left-side">
            <div className="principal-outter-image">
              <img className="principal-img" src={principalImage} alt="principal-img" />
              <h4 className="principal-name">H. P. Verma</h4>
              <p className="principal-position">School Principal</p>
            </div>
          </div>
          <div className="right-side">
            <h1 className="principal-message-heading">Principal's Message</h1>
            <p className="principal-message">Welcome to a new academic here of growth and discovery!</p>
            <p>
              We are committed to providing a Challenging and supportive Environment where every
              student can develop their potential and achieve their dream.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

