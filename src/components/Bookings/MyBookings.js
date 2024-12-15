import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Bookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:5555/bookings/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings');
    }
  };

  if (!user) {
    return <div className="bookings-container">Please login to view your bookings.</div>;
  }

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="bookings-grid">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.ID} className="booking-card">
              <div className="booking-header">
                <h3>Booking #{booking.ID}</h3>
              </div>
              <div className="booking-details">
                <p>Ticket ID: {booking.TICKET_ID}</p>
                <p>User ID: {booking.USER_ID}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-bookings">
            No bookings found. <a href="/search">Search for tickets</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
