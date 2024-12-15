import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';

function Feedback() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please login to submit feedback');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5555/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: user.id,
          message: message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setSuccess(true);
      setMessage('');
    } catch (err) {
      setError('Failed to submit feedback');
    }
  };

  if (success) {
    return (
      <div className="feedback-container">
        <div className="feedback-success">
          <h3>Thank you for your feedback!</h3>
          <p>We appreciate your input and will use it to improve our services.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <h2>Submit Feedback</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label>Your Feedback:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts with us..."
            rows="5"
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
