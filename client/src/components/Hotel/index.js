import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import useContent from '../../hooks/useContent';
import './index.css';

const Hotel = () => {
  const { content, loading } = useContent('hotels');

  const title = content?.title || 'School Guest & Hotel Services';
  const description =
    content?.description ||
    'Book a comfortable room for guests, parents, and visiting faculty near school campus.';
  const cards = content?.cards || [
    {
      title: 'Campus Guest House',
      description: 'Affordable rooms for parents and guests with easy access to school activities.',
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Hotel Comfort Stay',
      description: 'Modern rooms with clean facilities and friendly service.',
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=60',
    },
  ];

  return (
    <>
      <Header />
      <section className="hotel-intro">
        <div className="hotel-intro-card">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      <section className="hotel-listing">
        <div className="hotel-grid">
          {(loading ? cards : cards).map((hotel, idx) => (
            <article className="hotel-card" key={`${hotel.title}-${idx}`}>
              <img src={hotel.imageUrl} alt={hotel.title} />
              <div className="hotel-card-body">
                <h2>{hotel.title}</h2>
                <p>{hotel.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hotel;
