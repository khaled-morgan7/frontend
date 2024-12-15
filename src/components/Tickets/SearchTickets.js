import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import './Tickets.css';

function SearchTickets() {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: ''
  });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await api.searchTickets(searchParams);
      setTickets(Array.isArray(result) ? result : []);
    } catch (err) {
      setError('Failed to search tickets. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (ticket) => {
    if (!user) {
      alert('Please login to book tickets');
      navigate('/login');
      return;
    }

    try {
      const response = await api.createBooking({
        userID: user.id,
        origin: ticket.ORIGIN,
        destination: ticket.DESTINATION,
        date: ticket.DATE
      });

      if (!response.ok) {
        throw new Error(response.data || 'Booking failed');
      }

      alert('Booking successful!');
      // Refresh the search results to update quantities
      handleSearch(new Event('submit'));
    } catch (err) {
      alert(err.message || 'Failed to book ticket. Please try again.');
      console.error('Booking error:', err);
    }
  };

  return (
    <div className="search-tickets-container">
      <h2>Search Bus Tickets</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="origin">Origin:</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={searchParams.origin}
            onChange={handleInputChange}
            required
            placeholder="Enter origin city"
          />
        </div>

        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={searchParams.destination}
            onChange={handleInputChange}
            required
            placeholder="Enter destination city"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={searchParams.date}
            onChange={handleInputChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Tickets'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="tickets-list">
        {tickets.map(ticket => (
          <div key={ticket.ID} className="ticket-card">
            <div className="ticket-info">
              <h3>{ticket.ORIGIN} → {ticket.DESTINATION}</h3>
              <p>Date: {new Date(ticket.DATE).toLocaleDateString()}</p>
              <p>Departure: {ticket.DEPARTURE_TIME}</p>
              <p>Arrival: {ticket.ARRIVAL_TIME}</p>
              <p>Price: ${ticket.PRICE}</p>
              <p>Available Seats: {ticket.QUANTITY}</p>
            </div>
            <button 
              onClick={() => handleBooking(ticket)}
              disabled={ticket.QUANTITY < 1}
            >
              {ticket.QUANTITY < 1 ? 'Sold Out' : 'Book Now'}
            </button>
          </div>
        ))}
        {tickets.length === 0 && !loading && (
          <p className="no-tickets">No tickets found. Try different search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default SearchTickets;
