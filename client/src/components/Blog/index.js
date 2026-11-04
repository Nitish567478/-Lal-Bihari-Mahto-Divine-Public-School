import './index.css';
import Header from '../Header';
import Footer from '../Footer';
const blogPosts = [
  {
    title: "AI in Classrooms",
    content: "AI is transforming how teachers personalize learning, but also brings new challenges for schools. Discover the latest trends in digital education.",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Hybrid Learning Models",
    content: "Online and in-person hybrid education is now the standard for flexibility and engagement across schools worldwide.",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Microlearning for Students",
    content: "Bite-sized learning boosts retention and keeps students motivated in today’s fast-paced digital world.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd4?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Gamification in Education",
    content: "Game-based lessons make school more interactive and help motivate students to learn and participate.",
    image: "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Soft Skills for the Future",
    content: "Schools are focusing on teamwork, communication, and leadership skills to prepare students for tomorrow’s workforce.",
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=700&q=80"
  }
];

const Blog = () => {
  return (
    <>
      <Header />
      <div className="blog-container">
        <h1 className="blog-header" >Blog Page</h1>
        <p className="blog-description">Welcome to the Blog section of My School. Here you'll find the latest news, articles, and updates about our school community.</p>
        <div className="blog-cards">
          {blogPosts.map((post, index) => (
          <div className="blog-card" key={index}>
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-card-content">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Blog;
