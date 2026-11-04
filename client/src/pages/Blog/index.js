import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaSearch, 
  FaTag, 
  FaArrowRight, 
  FaTimes, 
  FaBookmark 
} from 'react-icons/fa';
import './index.css';

const blogCategories = [
  { id: 'all', label: 'All Articles' },
  { id: 'academics', label: 'Academics & CBSE' },
  { id: 'tech', label: 'Technology & AI' },
  { id: 'activities', label: 'Sports & Arts' },
  { id: 'campus', label: 'Campus Life' },
];

const blogPosts = [
  {
    id: 1,
    title: "AI in Modern Classrooms: Preparing Students for the Future",
    category: "tech",
    tag: "Technology & AI",
    date: "Sep 28, 2026",
    readTime: "4 min read",
    author: "Dept. of Computer Science",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
    excerpt: "How LBMDPS is integrating artificial intelligence tools, Python coding, and interactive smartboards to personalize learning for CBSE students.",
    fullContent: `Artificial Intelligence is fundamentally changing how students learn, analyze problems, and prepare for higher education. At Lal Bihari Mahto Divine Public School, our smart classrooms now incorporate interactive AI learning suites that adapt conceptual explanations to individual student pacing.

From visual physics simulations to algorithmic logic in our high-tech computer lab, students from Class 4 onwards learn practical digital problem-solving. By balancing screen-assisted learning with teacher mentorship, we cultivate analytical minds that thrive in the 21st-century technological landscape.`
  },
  {
    id: 2,
    title: "Mastering the CBSE Board Examinations: Top Strategies by Academic Mentors",
    category: "academics",
    tag: "Academics & CBSE",
    date: "Sep 20, 2026",
    readTime: "6 min read",
    author: "Academic Advisory Cell",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    excerpt: "Essential revision routines, answer structuring techniques, and stress-management tips curated by our experienced board faculty.",
    fullContent: `Success in CBSE board examinations requires structured preparation rather than rote memorization. Our faculty emphasizes conceptual clarity through NCERT exemplar problems, regular periodic mock tests, and systematic error-analysis sheets.

Key recommendations include:
1. Daily 90-minute focused revision blocks with active recall.
2. Timed practice on previous 5 years' CBSE question papers.
3. Proper diagrams and point-wise answers for science and social science.
4. Adequate sleep and mindfulness to prevent exam anxiety.`
  },
  {
    id: 3,
    title: "Holistic Development: Why Physical Sports and Yoga Matter in School",
    category: "activities",
    tag: "Sports & Arts",
    date: "Sep 15, 2026",
    readTime: "3 min read",
    author: "Sports & Wellness Dept.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    excerpt: "Physical vitality and sportsmanship build resilience, leadership, and mental stamina in young learners.",
    fullContent: `At LBMDPS, we believe that a healthy body is the foundation of an agile mind. Our 3-acre sports complex hosts regular cricket leagues, volleyball tournaments, athletics meets, and morning yoga sessions.

Participating in house sports teaches students essential life skills: team communication, graceful handling of setbacks, and unyielding discipline. Every student is encouraged to participate in at least one outdoor and one indoor sport each term.`
  },
  {
    id: 4,
    title: "Nurturing Soft Skills & Public Speaking from Early Childhood",
    category: "campus",
    tag: "Campus Life",
    date: "Sep 08, 2026",
    readTime: "5 min read",
    author: "Language & Literary Club",
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=80",
    excerpt: "Developing eloquence, active listening, and empathetic leadership through morning assembly debates and elocution contests.",
    fullContent: `Confidence on the stage translates to leadership in life. Through our weekly morning assembly speeches, inter-house elocutions, and drama workshops, students overcome stage freight and discover their unique voices.

Our English and Hindi language departments encourage spontaneous storytelling, group discussions, and creative writing to ensure students communicate persuasively in both academic and social environments.`
  },
  {
    id: 5,
    title: "The Magic of Science Laboratories: Turning Theory into Living Experiments",
    category: "academics",
    tag: "Academics & CBSE",
    date: "Aug 29, 2026",
    readTime: "4 min read",
    author: "Science Faculty",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    excerpt: "Hands-on chemistry titration, physics optics, and biology specimen studies awaken scientific inquiry.",
    fullContent: `Textbooks provide the principles, but the laboratory provides the wonder. In our composite science lab, students don lab coats to observe plant cell structures under digital microscopes, calibrate electrical circuits, and safely observe chemical reactions.

Experiential learning bridges abstract concepts with tangible reality, inspiring students towards future careers in Medicine, Biotechnology, and Engineering.`
  },
  {
    id: 6,
    title: "Music, Dance & Cultural Roots: Celebrating Diversity at LBMDPS",
    category: "activities",
    tag: "Sports & Arts",
    date: "Aug 18, 2026",
    readTime: "4 min read",
    author: "Cultural Committee",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    excerpt: "Blending Indian classical heritage with contemporary performing arts to celebrate unity in diversity.",
    fullContent: `Cultural education instills deep aesthetic appreciation and character refinement. Our music wing trains students in classical ragas, harmonium, tabla, and patriotic hymns, while the dance academy celebrates Jharkhand's rich tribal folk dances alongside classical Kathak and contemporary choreography.`
  }
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  return (
    <>
      <Header />
      <div className="blog-master-page">
        {/* Hero Section */}
        <section className="blog-hero-section">
          <div className="blog-hero-content">
            <span className="blog-hero-badge">School Editorial & News</span>
            <h1 className="blog-hero-title">LBMDPS Gazette & Articles</h1>
            <p className="blog-hero-subtitle">
              Insights, academic advice, pedagogical innovations, and campus highlights from the educators and student leaders of Divine Public School.
            </p>
          </div>
        </section>

        {/* Controls Section */}
        <section className="blog-controls-section">
          <div className="blog-page-container">
            <div className="blog-controls-bar">
              <div className="blog-cat-pills">
                {blogCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`blog-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="blog-search-wrap">
                <FaSearch className="blog-search-icon" />
                <input
                  type="text"
                  placeholder="Search articles & topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-blog-search" onClick={() => setSearchQuery('')}>×</button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Top Story Spotlight */}
        {!searchQuery && activeCategory === 'all' && (
          <section className="blog-featured-section">
            <div className="blog-page-container">
              <div className="featured-story-card" onClick={() => setSelectedArticle(featuredPost)}>
                <div className="featured-img-wrap">
                  <img src={featuredPost.image} alt={featuredPost.title} />
                  <span className="featured-tag-badge">Spotlight Story</span>
                </div>
                <div className="featured-story-content">
                  <div className="story-meta-row">
                    <span className="story-category-tag"><FaTag /> {featuredPost.tag}</span>
                    <span className="story-date"><FaCalendarAlt /> {featuredPost.date}</span>
                    <span className="story-readtime"><FaClock /> {featuredPost.readTime}</span>
                  </div>
                  <h2 className="featured-story-title">{featuredPost.title}</h2>
                  <p className="featured-story-excerpt">{featuredPost.excerpt}</p>
                  <div className="featured-story-footer">
                    <span className="story-author"><FaUser /> {featuredPost.author}</span>
                    <button type="button" className="read-featured-btn">
                      Read Full Story <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="blog-grid-section">
          <div className="blog-page-container">
            <div className="section-sub-header">
              <h3>Latest Articles & Campus News ({filteredPosts.length})</h3>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="blog-no-results">
                <h4>No Articles Match Your Search</h4>
                <p>Try searching for different keywords or explore other categories.</p>
                <button className="blog-reset-btn" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
                  View All Articles
                </button>
              </div>
            ) : (
              <div className="blog-articles-grid">
                {filteredPosts.map((post) => (
                  <article className="blog-article-card" key={post.id} onClick={() => setSelectedArticle(post)}>
                    <div className="article-img-wrap">
                      <img src={post.image} alt={post.title} loading="lazy" />
                      <span className="article-cat-badge">{post.tag}</span>
                    </div>

                    <div className="article-card-body">
                      <div className="article-meta-info">
                        <span><FaCalendarAlt /> {post.date}</span>
                        <span><FaClock /> {post.readTime}</span>
                      </div>

                      <h3 className="article-title">{post.title}</h3>
                      <p className="article-excerpt">{post.excerpt}</p>

                      <div className="article-card-footer">
                        <span className="article-author"><FaUser /> {post.author}</span>
                        <span className="article-read-link">Read More &rarr;</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Read Article Modal */}
        {selectedArticle && (
          <div className="article-modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div className="article-modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-icon" onClick={() => setSelectedArticle(null)}>
                <FaTimes />
              </button>

              <div className="modal-hero-banner">
                <img src={selectedArticle.image} alt={selectedArticle.title} />
                <div className="modal-hero-caption">
                  <span className="modal-tag">{selectedArticle.tag}</span>
                  <h2>{selectedArticle.title}</h2>
                </div>
              </div>

              <div className="modal-article-body">
                <div className="modal-meta-strip">
                  <span><FaUser /> <strong>By:</strong> {selectedArticle.author}</span>
                  <span><FaCalendarAlt /> <strong>Published:</strong> {selectedArticle.date}</span>
                  <span><FaClock /> <strong>Time:</strong> {selectedArticle.readTime}</span>
                </div>

                <div className="modal-text-content">
                  {selectedArticle.fullContent.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="modal-footer-actions">
                  <span className="share-note"><FaBookmark /> Lal Bihari Mahto Divine Public School Publications</span>
                  <button className="modal-done-btn" onClick={() => setSelectedArticle(null)}>
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Blog;
