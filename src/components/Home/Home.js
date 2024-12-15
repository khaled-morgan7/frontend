import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Home.css';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to HOPIN</h1>
        <p>Your trusted partner for bus ticket bookings</p>
        
        {!user ? (
          <div className="cta-buttons">
            <Link to="/login" className="cta-button">Login</Link>
            <Link to="/register" className="cta-button secondary">Register</Link>
          </div>
        ) : (
          <div className="cta-buttons">
            <Link to="/search" className="cta-button">Search Tickets</Link>
            <Link to="/bookings" className="cta-button secondary">My Bookings</Link>
          </div>
        )}
      </div>

      <div className="features-section">
        <h2>Why Choose HOPIN?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy Booking</h3>
            <p>Book your bus tickets in just a few clicks</p>
          </div>
          <div className="feature-card">
            <h3>Wide Coverage</h3>
            <p>Access bus services across multiple cities</p>
          </div>
          <div className="feature-card">
            <h3>Secure Payments</h3>
            <p>Your transactions are always safe with us</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Our customer service team is always here to help</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Search</h3>
            <p>Enter your travel details and find available buses</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Select</h3>
            <p>Choose your preferred bus and seat</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Book</h3>
            <p>Complete your booking with secure payment</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Travel</h3>
            <p>Get your e-ticket and you're ready to go!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
