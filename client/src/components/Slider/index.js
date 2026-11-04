import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import img1 from '../AllImage/1.webp';
import img2 from '../AllImage/2.webp';
import img3 from '../AllImage/3.jpg';
import img4 from '../AllImage/4.jpg';
import img5 from '../AllImage/5.webp';

const slidesData = [
  {
    image: img1,
    tag: "CBSE AFFILIATED SECONDARY INSTITUTION",
    title: "Lal Bihari Mahto Divine Public School",
    sub: "Naitand, Giridih (Jharkhand) • Committed to Academic Excellence & Holistic Growth Since 2013",
    ctaText: "Explore Academics",
    ctaLink: "/academic",
    secondaryText: "Admissions 2026-27",
    secondaryLink: "/admissions"
  },
  {
    image: img2,
    tag: "NOW OPEN FOR SESSION 2026-2027",
    title: "Admissions Open: Pre-Nursery to Class X",
    sub: "Empowering Students from Nursery to Class 10 with Modern Science Labs, Smartboards, and Dedicated Mentors",
    ctaText: "Apply Online Today",
    ctaLink: "/admissions",
    secondaryText: "Fee Structure",
    secondaryLink: "/fee-structure"
  },
  {
    image: img3,
    tag: "STATE-OF-THE-ART 12-ACRE CAMPUS",
    title: "Advanced Laboratories & Digital Classrooms",
    sub: "Physics, Chemistry, Biology & AI Robotics Computer Centers with High-Speed Gigabit Connectivity",
    ctaText: "Campus Facilities",
    ctaLink: "/facility",
    secondaryText: "Smart Classrooms",
    secondaryLink: "/smart-classrooms"
  },
  {
    image: img4,
    tag: "BEYOND ACADEMICS",
    title: "Sports, Athletics & Cultural Excellence",
    sub: "State Cricket Champions, Zonal Martial Arts, School Brass Band, and Annual Festivities",
    ctaText: "Sports & Athletics",
    ctaLink: "/playground-sports",
    secondaryText: "Campus Gallery",
    secondaryLink: "/gallery"
  },
  {
    image: img5,
    tag: "PROUD BOARD TOPPERS 2026",
    title: "100% CBSE Pass Rate & District Top Scores",
    sub: "Honouring our 98.6% Board Rankers and Merit Achievers on the LBMDPS Wall of Fame",
    ctaText: "Board Exam Results",
    ctaLink: "/examinations",
    secondaryText: "Academic Wings",
    secondaryLink: "/academic"
  }
];

const Slider = () => {
  return (
    <div className="school-hero-slider-wrap">
      <Carousel interval={4500} pause="hover" controls={true} indicators={true}>
        {slidesData.map((slide, index) => (
          <Carousel.Item key={index}>
            <div className="hero-slide-media">
              <img className="d-block w-100 hero-img" src={slide.image} alt={slide.title} />
              <div className="hero-slide-overlay">
                <div className="hero-caption-content">
                  <span className="hero-slide-tag">{slide.tag}</span>
                  <h2 className="hero-slide-title">{slide.title}</h2>
                  <p className="hero-slide-sub">{slide.sub}</p>
                  <div className="hero-slide-buttons">
                    <Link to={slide.ctaLink} className="hero-cta-btn">
                      <span>{slide.ctaText}</span>
                      <span className="hero-btn-arrow">&rarr;</span>
                    </Link>
                    <Link to={slide.secondaryLink} className="hero-secondary-btn">
                      <span>{slide.secondaryText}</span>
                      <span className="hero-secondary-arrow">&rsaquo;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
