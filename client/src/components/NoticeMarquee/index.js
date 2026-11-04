import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const defaultNotices = [
  '📢 Admissions Open for Session 2026-2027 from Pre-Nursery to Class 10 (Class X).',
  '🏆 Annual Sports Day & Cultural Fest Registrations closing soon!',
  '📋 Term Examination Schedule & Date Sheet released - Check Notices section.',
  '🎓 Scholarship Scheme 2026 for Meritorious Students: Apply now online!'
];

const NoticeMarquee = ({ items = defaultNotices }) => {
  return (
    <div className="notice-ticker-wrapper">
      <div className="ticker-badge">
        <span className="ticker-pulse"></span>
        LATEST UPDATES
      </div>
      <div className="ticker-content">
        <div className="ticker-marquee">
          {items.map((item, idx) => (
            <span key={idx} className="ticker-item">
              {item}
              <span className="ticker-separator">•</span>
            </span>
          ))}
        </div>
      </div>
      <Link to="/notices" className="ticker-link">
        View All
      </Link>
    </div>
  );
};

export default NoticeMarquee;
