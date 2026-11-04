import { FaCalendar, FaMapPin, FaFolder } from 'react-icons/fa';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.css';

const defaultNoticeList = [
  {
    id: 1,
    title: 'Admissions Open for Academic Session 2026-2027',
    category: 'Admissions',
    date: '28 Aug 2026',
    badge: 'Urgent',
    description: 'Online and offline applications are now invited for classes Pre-Nursery to Class X (Class 1 to 10). Submit registration forms before seats fill up.',
    downloadUrl: '#'
  },
  {
    id: 2,
    title: 'Term 1 Final Examination Date Sheet & Guidelines',
    category: 'Examinations',
    date: '25 Aug 2026',
    badge: 'Exam',
    description: 'Complete schedule for mid-term exams starting from 15th September. Students are advised to collect admit cards from their class teachers.',
    downloadUrl: '#'
  },
  {
    id: 3,
    title: 'Fee Payment Deadline & Online Payment Options',
    category: 'Accounts',
    date: '20 Aug 2026',
    badge: 'Notice',
    description: 'Parents can now pay 2nd Quarter school fees through the online portal or at the school fee counter without late fee until 10th September.',
    downloadUrl: '#'
  },
  {
    id: 4,
    title: 'Annual Inter-House Sports & Athletic Championship 2026',
    category: 'Sports',
    date: '18 Aug 2026',
    badge: 'Activity',
    description: 'Trials for sprint races, basketball, cricket, badminton, and yoga competitions will begin next Monday.',
    downloadUrl: '#'
  },
  {
    id: 5,
    title: 'Science Fair & Robotics Club Registration',
    category: 'Academic',
    date: '10 Aug 2026',
    badge: 'Academic',
    description: 'Students from Classes VI to X interested in science models and coding projects can submit their project synopses.',
    downloadUrl: '#'
  },
  {
    id: 6,
    title: 'List of Official School Holidays for Term 2026',
    category: 'General',
    date: '01 Aug 2026',
    badge: 'Holiday',
    description: 'Download the comprehensive calendar of gazetted and school holidays for the remaining academic session.',
    downloadUrl: '#'
  }
];

const Notices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Admissions', 'Examinations', 'Accounts', 'Sports', 'Academic', 'General'];

  const filteredNotices = defaultNoticeList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <Header />
      <div className="notices-page-wrapper">
        <section className="notices-hero">
          <div className="notices-hero-inner">
            <span className="notices-tag"><FaMapPin /> Official Circulars</span>
            <h1>School Notice Board & Announcements</h1>
            <p>
              Stay informed with the latest updates, circulars, examination schedules, fee notices, and holiday announcements from the school administration.
            </p>
          </div>
        </section>

        <div className="notices-filter-bar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search circulars by keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${selectedCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="notices-container-main">
          <div className="notices-grid-layout">
            {filteredNotices.map((notice) => (
              <div className="notice-circular-card" key={notice.id}>
                <div className="circular-top">
                  <span className={`circular-badge ${notice.badge.toLowerCase()}`}>{notice.badge}</span>
                  <span className="circular-date"><FaCalendar /> {notice.date}</span>
                </div>
                <h3>{notice.title}</h3>
                <p>{notice.description}</p>
                <div className="circular-footer">
                  <span className="circular-cat-label"><FaFolder /> {notice.category}</span>
                  <a
                    href={notice.downloadUrl}
                    className="download-circular-btn"
                    onClick={(e) => {
                      if (notice.downloadUrl === '#') {
                        e.preventDefault();
                        alert(`Downloading official notice circular: "${notice.title}"`);
                      }
                    }}
                  >
                    📥 Download Circular
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notices;