import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  FaWifi, 
  FaUtensils, 
  FaShieldAlt, 
  FaPhoneAlt, 
  FaCheckCircle, 
  FaCalendarCheck, 
  FaMapMarkerAlt, 
  FaStar, 
  FaTimes, 
  FaSnowflake, 
  FaBolt 
} from 'react-icons/fa';
import './index.css';

const guestRooms = [
  {
    id: 'executive-suite',
    title: 'Executive Parent & VIP Suite',
    badge: 'Premium Comfort',
    badgeColor: '#F59E0B',
    rating: 4.9,
    price: '₹1,499',
    period: '/ night',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious air-conditioned master suite with king-size bed, private balcony, living lounge, and dedicated work desk.',
    amenities: ['King Size Bed', 'Split Air Conditioner', 'High-Speed Wi-Fi', 'Attached Luxury Bath', 'Smart TV & Cable', 'Complimentary Breakfast']
  },
  {
    id: 'deluxe-twin',
    title: 'Deluxe Family Guest Room',
    badge: 'Most Popular',
    badgeColor: '#2563eb',
    rating: 4.8,
    price: '₹999',
    period: '/ night',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    description: 'Modern and sanitized double twin-bed room designed for parents visiting boarding students or attending school annual functions.',
    amenities: ['Twin Comfort Beds', 'Air Conditioning', 'Free Wi-Fi', 'Hot & Cold Shower', 'Tea / Coffee Maker', 'Daily Housekeeping']
  },
  {
    id: 'standard-guest',
    title: 'Standard Visiting Faculty Room',
    badge: 'Affordable Stay',
    badgeColor: '#059669',
    rating: 4.7,
    price: '₹699',
    period: '/ night',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    description: 'Clean, well-ventilated room with study table and ergonomic bed for educational researchers, trainers, and CBSE examiners.',
    amenities: ['Single / Queen Bed', 'Ceiling Fan & Cooler', 'Work Table & Lamp', 'Clean Linens', 'RO Drinking Water', '24/7 Security']
  }
];

const hotelFeatures = [
  { icon: <FaShieldAlt />, title: "24/7 Gated Security", desc: "Monitored campus premises with CCTV surveillance and guard verification." },
  { icon: <FaUtensils />, title: "Hygienic Dining", desc: "Fresh vegetarian breakfast, lunch, and dinner prepared in clean school kitchens." },
  { icon: <FaWifi />, title: "High-Speed Internet", desc: "Seamless optical fiber Wi-Fi throughout all rooms and lounge areas." },
  { icon: <FaBolt />, title: "100% Power Backup", desc: "Uninterrupted electricity support with dedicated generator systems." },
  { icon: <FaSnowflake />, title: "Climate Control", desc: "Efficient split AC and hot water geyser systems in all premium suites." },
  { icon: <FaMapMarkerAlt />, title: "Inside Campus", desc: "Zero commute — situated right inside the lush green Naitand campus." }
];

const Hotel = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    roomType: 'Deluxe Family Guest Room'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOpenBooking = (room) => {
    setSelectedRoom(room);
    setBookingForm((prev) => ({ ...prev, roomType: room.title }));
    setSubmitted(false);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <div className="hotel-master-page">
        {/* Hero Section */}
        <section className="hotel-hero-section">
          <div className="hotel-hero-content">
            <span className="hotel-hero-badge">Campus Hospitality</span>
            <h1 className="hotel-hero-title">Guest House & Visitor Accommodations</h1>
            <p className="hotel-hero-subtitle">
              Safe, affordable, and peaceful lodging located inside the Lal Bihari Mahto Divine Public School campus for visiting parents, alumni, and educational delegates.
            </p>
            <div className="hotel-hero-actions">
              <a href="#rooms-section" className="hotel-btn-gold">View Available Rooms</a>
              <a href="tel:+917870711904" className="hotel-btn-ghost"><FaPhoneAlt /> Desk: +91 7870711904</a>
            </div>
          </div>
        </section>

        {/* Key Amenities Banner */}
        <section className="hotel-amenities-section">
          <div className="hotel-page-container">
            <div className="amenities-grid-6">
              {hotelFeatures.map((feat, idx) => (
                <div className="amenity-card-box" key={idx}>
                  <div className="amenity-icon-circle">{feat.icon}</div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Room Suites Grid */}
        <section className="hotel-rooms-section" id="rooms-section">
          <div className="hotel-page-container">
            <div className="hotel-section-header">
              <span className="hotel-sub-pill">Choose Your Stay</span>
              <h2>Guest Suites & Room Options</h2>
              <p>All rooms include 24/7 electricity backup, daily sanitation, and campus security.</p>
            </div>

            <div className="rooms-cards-grid">
              {guestRooms.map((room) => (
                <div className="room-card-box" key={room.id}>
                  <div className="room-img-wrap">
                    <img src={room.imageUrl} alt={room.title} loading="lazy" />
                    <span className="room-badge-tag" style={{ backgroundColor: room.badgeColor }}>
                      {room.badge}
                    </span>
                    <div className="room-rating-pill">
                      <FaStar className="star-icon" /> {room.rating}
                    </div>
                  </div>

                  <div className="room-card-body">
                    <div className="room-price-row">
                      <span className="room-price">{room.price}</span>
                      <span className="room-period">{room.period}</span>
                    </div>

                    <h3 className="room-title">{room.title}</h3>
                    <p className="room-desc">{room.description}</p>

                    <div className="room-amenities-list">
                      {room.amenities.map((amenity, i) => (
                        <span className="amenity-pill" key={i}>
                          <FaCheckCircle className="check-icon" /> {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="room-card-footer">
                      <button 
                        type="button" 
                        className="room-book-btn"
                        onClick={() => handleOpenBooking(room)}
                      >
                        <FaCalendarCheck /> Book Room Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Inquiry Modal */}
        {selectedRoom && (
          <div className="hotel-modal-overlay" onClick={() => setSelectedRoom(null)}>
            <div className="hotel-modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="hotel-modal-close" onClick={() => setSelectedRoom(null)}>
                <FaTimes />
              </button>

              <div className="hotel-modal-header">
                <span className="modal-room-badge">{selectedRoom.badge}</span>
                <h3>Book {selectedRoom.title}</h3>
                <p>Tariff: <strong>{selectedRoom.price}</strong> {selectedRoom.period} (Includes Breakfast)</p>
              </div>

              {submitted ? (
                <div className="booking-success-box">
                  <FaCheckCircle className="success-big-icon" />
                  <h4>Booking Request Received!</h4>
                  <p>Our guest house manager will call you at <strong>{bookingForm.phone}</strong> shortly to confirm room availability and check-in details.</p>
                  <button className="hotel-modal-done-btn" onClick={() => setSelectedRoom(null)}>Done</button>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="hotel-booking-form">
                  <div className="form-row-2">
                    <label>
                      Guest Name
                      <input 
                        type="text" 
                        required 
                        placeholder="Full Name" 
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      />
                    </label>
                    <label>
                      Phone Number
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 Mobile Number" 
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      />
                    </label>
                  </div>

                  <div className="form-row-2">
                    <label>
                      Check-In Date
                      <input 
                        type="date" 
                        required 
                        value={bookingForm.checkIn}
                        onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                      />
                    </label>
                    <label>
                      Check-Out Date
                      <input 
                        type="date" 
                        required 
                        value={bookingForm.checkOut}
                        onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                      />
                    </label>
                  </div>

                  <label>
                    Number of Guests
                    <select 
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons (Family)</option>
                      <option value="4+">4+ Persons</option>
                    </select>
                  </label>

                  <button type="submit" className="confirm-booking-btn">
                    Confirm Reservation Request &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Hotel;
