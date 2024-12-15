import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.admin !== 1) {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate, activeTab]);

  const fetchData = async () => {
    try {
      let endpoint = '';
      switch (activeTab) {
        case 'tickets':
          endpoint = 'ticket';
          break;
        case 'users':
          endpoint = 'users';
          break;
        case 'bookings':
          endpoint = 'bookings';
          break;
        case 'feedback':
          endpoint = 'feedback';
          break;
        default:
          return;
      }

      const response = await fetch(`http://localhost:5555/${endpoint}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${activeTab}`);
      }

      const data = await response.json();
      switch (activeTab) {
        case 'tickets':
          setTickets(data);
          break;
        case 'users':
          setUsers(data);
          break;
        case 'bookings':
          setBookings(data);
          break;
        case 'feedback':
          setFeedback(data);
          break;
        default:
          break;
      }
    } catch (err) {
      setError(`Failed to load ${activeTab}`);
    }
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ticketData = {
      origin: formData.get('origin'),
      destination: formData.get('destination'),
      date: formData.get('date'),
      quantity: parseInt(formData.get('quantity'), 10),
      price: parseInt(formData.get('price'), 10)
    };

    try {
      const response = await fetch('http://localhost:5555/ticket/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Failed to add ticket');
      }

      setSuccess('Ticket added successfully');
      e.target.reset();
      fetchData();
    } catch (err) {
      setError('Failed to add ticket');
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:5555/tickets/${ticketId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete ticket');
      }

      setSuccess('Ticket deleted successfully');
      fetchData();
    } catch (err) {
      setError('Failed to delete ticket');
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      const response = await fetch(`http://localhost:5555/feedback/${feedbackId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }

      setSuccess('Feedback deleted successfully');
      fetchData();
    } catch (err) {
      setError('Failed to delete feedback');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'tickets' ? 'active' : ''} 
          onClick={() => setActiveTab('tickets')}
        >
          Tickets
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'bookings' ? 'active' : ''} 
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
        <button 
          className={activeTab === 'feedback' ? 'active' : ''} 
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'tickets' && (
          <div className="tickets-section">
            <h3>Add New Ticket</h3>
            <form onSubmit={handleAddTicket} className="add-ticket-form">
              <div className="form-group">
                <input name="origin" type="text" placeholder="Origin" required />
              </div>
              <div className="form-group">
                <input name="destination" type="text" placeholder="Destination" required />
              </div>
              <div className="form-group">
                <input name="date" type="date" required />
              </div>
              <div className="form-group">
                <input name="quantity" type="number" placeholder="Quantity" min="1" required />
              </div>
              <div className="form-group">
                <input name="price" type="number" placeholder="Price" min="1" required />
              </div>
              <button type="submit">Add Ticket</button>
            </form>

            <h3>All Tickets</h3>
            <div className="tickets-grid">
              {tickets.map((ticket) => (
                <div key={ticket.ID} className="ticket-card">
                  <h4>{ticket.ORIGIN} → {ticket.DESTINATION}</h4>
                  <p>Date: {new Date(ticket.DATE).toLocaleDateString()}</p>
                  <p>Quantity: {ticket.QUANTITY}</p>
                  <p>Price: ${ticket.PRICE}</p>
                  <button 
                    onClick={() => handleDeleteTicket(ticket.ID)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h3>All Users</h3>
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.ID}>
                    <td>{user.ID}</td>
                    <td>{user.NAME}</td>
                    <td>{user.EMAIL}</td>
                    <td>{user.ISADMIN ? 'Admin' : 'User'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h3>All Bookings</h3>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Ticket ID</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.ID}>
                    <td>{booking.ID}</td>
                    <td>{booking.USER_ID}</td>
                    <td>{booking.TICKET_ID}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="feedback-section">
            <h3>User Feedback</h3>
            <div className="feedback-grid">
              {feedback.map((item) => (
                <div key={item.ID} className="feedback-card">
                  <p className="feedback-message">{item.MESSAGE}</p>
                  <p className="feedback-user">User ID: {item.USER_ID}</p>
                  <button 
                    onClick={() => handleDeleteFeedback(item.ID)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
