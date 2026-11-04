import './index.css';
import Header from '../Header';
import Footer from '../Footer';
const facilitiesData = [
  {
    name: "Well-equipped Classrooms",
    description: "Modern classrooms with smart boards and comfortable seating for effective learning.",
    icon: "🏫",
  },
  {
    name: "Science and Computer Labs",
    description: "State-of-the-art labs for hands-on experiments and coding practice.",
    icon: "🔬",
  },
  {
    name: "Library with Extensive Resources",
    description: "A wide range of books, journals, and digital resources for research and reading.",
    icon: "📚",
  },
  {
    name: "Sports Grounds and Gymnasium",
    description: "Facilities for various sports and a well-equipped gym to promote fitness.",
    icon: "🏅",
  },
  {
    name: "Arts and Music Rooms",
    description: "Creative spaces for music, painting, and other artistic pursuits.",
    icon: "🎨",
  },
  {
    name: "Cafeteria with Healthy Meals",
    description: "Nutritious meals and snacks served in a clean and welcoming environment.",
    icon: "🍽️",
  },
  {
    name: "Transportation Services",
    description: "Safe and reliable transport options for students and staff.",
    icon: "🚌",
  },
  {
    name: "Auditorium",
    description: "A spacious auditorium for events, seminars, and cultural programs.",
    icon: "🎭",
  },
  {
    name: "Medical Room",
    description: "On-campus medical facilities for emergency care and regular check-ups.",
    icon: "🏥",
  },
  {
    name: "Computer Assisted Learning",
    description: "Interactive learning using modern software and technology tools.",
    icon: "💻",
  },
];

const Facility = () => {
  return (
    <>
        <Header />
        <div className="facility-section">
            <h1 className="facility-heading">Our Facilities</h1>
            <div className="facility-cards">
                {facilitiesData.map((facility, index) => (
                <div className="facility-card" key={index}>
                    <div className="facility-icon">{facility.icon}</div>
                    <h3 className="facility-name">{facility.name}</h3>
                    <p className="facility-description">{facility.description}</p>
                </div>
                ))}
            </div>
        </div>
        <Footer />
    </>
  );
};

export default Facility;


