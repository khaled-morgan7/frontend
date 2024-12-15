import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">HopIn Bus</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/search">Search Tickets</Link>
        
        {user ? (
          <>
            <Link to="/bookings">My Bookings</Link>
            <Link to="/feedback">Feedback</Link>
            {user.admin === 1 && <Link to="/admin">Admin Dashboard</Link>}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
