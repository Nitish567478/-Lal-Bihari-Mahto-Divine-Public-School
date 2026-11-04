import React, { useState } from 'react';
import { FaCalendar, FaClock, FaSearch, FaTimes, FaPlus } from "react-icons/fa";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DragDropUploader from '../../components/DragDropUploader';
import './index.css';

const initialVideos = [
  {
    id: 'vid-1',
    title: 'LBMDPS Campus Virtual Tour 2026',
    category: 'campus',
    categoryLabel: 'Campus Tour',
    duration: '4:15',
    thumbnail: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '12.4K',
    date: 'Jan 2026',
    description: 'Explore the high-tech smart classrooms, Olympic-size sports ground, science labs, and lush green 12-acre campus of LBMDPS Naitand.',
    featured: true
  },
  {
    id: 'vid-2',
    title: 'Grand Annual Function & Cultural Night',
    category: 'events',
    categoryLabel: 'Annual Events',
    duration: '8:40',
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '8.9K',
    date: 'Dec 2025',
    description: 'Electrifying performances by school choir, drama club, classical dance troupes, and award distribution by esteemed chief guests.'
  },
  {
    id: 'vid-3',
    title: 'Annual Athletic Meet & March Past',
    category: 'sports',
    categoryLabel: 'Sports & Athletics',
    duration: '5:22',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '6.2K',
    date: 'Nov 2025',
    description: 'Exciting sprint races, relay championships, high jumps, and the synchronized 4-house march past parade.'
  },
  {
    id: 'vid-4',
    title: 'Science & Robotics Exhibition - Innovate 2025',
    category: 'academic',
    categoryLabel: 'Academic & STEM',
    duration: '6:10',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '4.8K',
    date: 'Oct 2025',
    description: 'Student-built AI models, solar energy projects, drone demonstrations, and automated robotic arms.'
  },
  {
    id: 'vid-5',
    title: 'Independence Day Celebrations & Patriotic Drill',
    category: 'events',
    categoryLabel: 'Annual Events',
    duration: '7:05',
    thumbnail: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '9.1K',
    date: 'Aug 2025',
    description: 'Flag hoisting ceremony by the Principal, patriotic musical recitals, yoga displays, and cultural dances.'
  },
  {
    id: 'vid-6',
    title: 'Kindergarten Graduation Day & Kids Carnival',
    category: 'academic',
    categoryLabel: 'Academic & STEM',
    duration: '3:50',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '5.5K',
    date: 'Mar 2025',
    description: 'Adorable performances and joyful graduation moments of our nursery and pre-primary champions.'
  }
];

const categories = [
  { id: 'all', label: 'All Videos' },
  { id: 'campus', label: 'Campus Tours' },
  { id: 'events', label: 'Annual Events' },
  { id: 'sports', label: 'Sports & Athletics' },
  { id: 'academic', label: 'Academic & STEM' },
];

const Video = () => {
  const [videos, setVideos] = useState(initialVideos);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('events');
  const [newUrl, setNewUrl] = useState('');

  // Featured video spotlight (default to vid-1)
  const featuredVideo = videos.find(v => v.featured) || videos[0];

  const filteredVideos = videos.filter((v) => {
    const matchesCategory = activeCategory === 'all' || v.category === activeCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (catId) => {
    if (catId === 'all') return videos.length;
    return videos.filter(v => v.category === catId).length;
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry = {
      id: `vid-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      categoryLabel: categories.find(c => c.id === newCategory)?.label || 'General',
      duration: '4:00',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      videoUrl: newUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      views: 'Just added',
      date: 'Just now',
      description: 'Newly uploaded school activity video documentation.'
    };

    setVideos([newEntry, ...videos]);
    setNewTitle('');
    setNewUrl('');
    setShowUploadModal(false);
    alert('Video successfully published to the School Video Hub!');
  };

  return (
    <>
      <Header />
      <div className="video-page-root">
        {/* 1. HERO BANNER */}
        <section className="video-hero-banner">
          <div className="video-hero-inner">
            <span className="video-hero-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6 }}>
                <path d="M4 6.47L5.76 10H20V4H4.7L4 6.47M22 4v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2m-4.29 8l-6 3.5V8.5l6 3.5z"/>
              </svg>
              Official Digital Media Hub
            </span>
            <h1 className="video-hero-title">School Video Gallery &amp; Virtual Tours</h1>
            <p className="video-hero-desc">
              Experience the vibrant life at LBMDPS Naitand through our high-definition event recordings,
              virtual campus walkthroughs, and student achievement documentaries.
            </p>

            <div className="video-hero-actions">
              <button 
                type="button" 
                className="video-upload-trigger-btn"
                onClick={() => setShowUploadModal(true)}
              >
                <FaPlus style={{ marginRight: 8, fontSize: '12px' }} /> Upload / Add Video
              </button>

              <div className="video-search-box">
                <FaSearch className="video-search-icon" />
                <input
                  type="text"
                  placeholder="Search video tours, events, sports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="video-search-input"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="video-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear Search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats Strip */}
            <div className="video-hero-stats">
              <div className="v-stat-item">
                <strong>50+</strong>
                <span>Campus Videos</span>
              </div>
              <div className="v-stat-sep"></div>
              <div className="v-stat-item">
                <strong>4K HD</strong>
                <span>Virtual Walkthroughs</span>
              </div>
              <div className="v-stat-sep"></div>
              <div className="v-stat-item">
                <strong>100%</strong>
                <span>Student Powered</span>
              </div>
              <div className="v-stat-sep"></div>
              <div className="v-stat-item">
                <strong>50K+</strong>
                <span>Community Views</span>
              </div>
            </div>
          </div>
        </section>

        <div className="video-content-container">
          {/* 2. FEATURED SPOTLIGHT VIDEO (IF NO SEARCH APPLIED) */}
          {!searchQuery && activeCategory === 'all' && featuredVideo && (
            <section className="video-spotlight-section">
              <div className="spotlight-card" onClick={() => setSelectedVideo(featuredVideo)}>
                <div className="spotlight-media-wrap">
                  <img src={featuredVideo.thumbnail} alt={featuredVideo.title} />
                  <div className="spotlight-play-btn">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="spotlight-duration-pill">
                    <FaClock style={{ marginRight: 4 }} /> {featuredVideo.duration} MIN
                  </span>
                  <span className="spotlight-badge">★ Featured Video</span>
                </div>

                <div className="spotlight-content">
                  <span className="spotlight-category-tag">
                    {featuredVideo.categoryLabel || 'Campus Tour'}
                  </span>
                  <h2 className="spotlight-title">{featuredVideo.title}</h2>
                  <p className="spotlight-desc">{featuredVideo.description}</p>
                  
                  <div className="spotlight-meta-row">
                    <span>👁️ {featuredVideo.views} views</span>
                    <span><FaCalendar style={{ marginRight: 4 }} /> {featuredVideo.date}</span>
                  </div>

                  <button type="button" className="spotlight-watch-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ marginRight: 8 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Full Virtual Tour &rarr;
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* 3. CATEGORY FILTER TABS */}
          <section className="video-filter-section">
            <div className="video-filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`video-filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="filter-count-badge">{getCategoryCount(cat.id)}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 4. VIDEOS GRID */}
          <section className="videos-main-grid-section">
            {filteredVideos.length === 0 ? (
              <div className="videos-empty-state">
                <div className="empty-state-icon">📹</div>
                <h3>No Videos Found</h3>
                <p>We couldn't find any videos matching your search "{searchQuery}".</p>
                <button 
                  type="button" 
                  className="empty-reset-btn"
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                >
                  Reset Filter &amp; Show All Videos
                </button>
              </div>
            ) : (
              <div className="videos-responsive-grid">
                {filteredVideos.map((item) => (
                  <article 
                    className="video-modern-card" 
                    key={item.id} 
                    onClick={() => setSelectedVideo(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedVideo(item); }}
                  >
                    <div className="video-card-thumb-wrap">
                      <img src={item.thumbnail} alt={item.title} loading="lazy" />
                      <div className="video-card-play-hover">
                        <div className="play-circle-icon">
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <span className="video-card-duration">
                        {item.duration}
                      </span>
                    </div>

                    <div className="video-card-info">
                      <span className={`video-cat-badge ${item.category}`}>
                        {item.categoryLabel || item.category.toUpperCase()}
                      </span>
                      <h3 className="video-card-title">{item.title}</h3>
                      <p className="video-card-desc">{item.description}</p>
                      
                      <div className="video-card-footer">
                        <div className="v-card-meta">
                          <span>👁️ {item.views}</span>
                          <span><FaCalendar style={{ marginRight: 4, fontSize: '11px' }} /> {item.date}</span>
                        </div>
                        <span className="v-card-action">Play &rarr;</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* 5. CINEMA VIDEO PLAYER MODAL */}
        {selectedVideo && (
          <div className="video-cinema-overlay" onClick={() => setSelectedVideo(null)}>
            <div className="video-cinema-modal" onClick={(e) => e.stopPropagation()}>
              <div className="cinema-header">
                <div className="cinema-title-wrap">
                  <span className={`video-cat-badge ${selectedVideo.category}`}>
                    {selectedVideo.categoryLabel || selectedVideo.category.toUpperCase()}
                  </span>
                  <h3>{selectedVideo.title}</h3>
                </div>
                <button 
                  type="button" 
                  className="cinema-close-btn" 
                  onClick={() => setSelectedVideo(null)}
                  aria-label="Close Player"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="cinema-player-frame">
                <iframe
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="cinema-body">
                <p className="cinema-desc">{selectedVideo.description}</p>
                <div className="cinema-meta-strip">
                  <span><strong>Views:</strong> {selectedVideo.views}</span>
                  <span><strong>Duration:</strong> {selectedVideo.duration}</span>
                  <span><strong>Published:</strong> {selectedVideo.date}</span>
                  <span><strong>Campus:</strong> LBMDPS Naitand, Giridih</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. UPLOAD / EMBED VIDEO MODAL */}
        {showUploadModal && (
          <div className="video-cinema-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="video-upload-card-modal" onClick={(e) => e.stopPropagation()}>
              <div className="upload-modal-header">
                <div>
                  <span className="video-cat-badge events">MEDIA REPOSITORY</span>
                  <h3>Add or Embed School Video</h3>
                  <p>Publish an event recording, sports match, or academic tour to the library.</p>
                </div>
                <button 
                  type="button" 
                  className="upload-modal-close" 
                  onClick={() => setShowUploadModal(false)}
                  aria-label="Close Upload Modal"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleAddVideo} className="upload-modal-form">
                <div className="u-form-group">
                  <label>Video Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Annual Science Exhibition 2026 - Innovation Expo"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className="u-form-row">
                  <div className="u-form-group">
                    <label>Category *</label>
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                      <option value="campus">Campus Tours</option>
                      <option value="events">Annual Events &amp; Festivals</option>
                      <option value="sports">Sports &amp; Athletics</option>
                      <option value="academic">Academic &amp; STEM</option>
                    </select>
                  </div>

                  <div className="u-form-group">
                    <label>YouTube / Stream Embed Link</label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/embed/..."
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="u-form-dragdrop">
                  <label>Video Thumbnail or Clip Upload:</label>
                  <DragDropUploader
                    accept="video/*,image/*"
                    label="Drop video file or thumbnail cover here"
                    hint="MP4, WEBM, JPG, PNG (Max 50MB)"
                  />
                </div>

                <div className="upload-modal-actions">
                  <button 
                    type="button" 
                    className="btn-u-cancel" 
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-u-submit">
                    Publish Video to Gallery &rarr;
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Video;
