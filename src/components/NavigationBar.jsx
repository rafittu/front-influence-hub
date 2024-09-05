import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

import '../styles/NavigationBar.css';

function NavigationBar() {
  const navigate = useNavigate();
  const { adminData } = useAdmin();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('metropole4');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div
        className="admin-dropdown"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button type="button" className="dropdown-button">{adminData.name}</button>
        {showDropdown && (
          <div className="dropdown-menu">
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <h1 id="nav-logo">Influence Hub</h1>

      <ul className="links-list">
        <Link to="/dashboard" id="dashboard-link">
          <li>Influenciadores</li>
        </Link>

        <Link to="/brand" id="brands-link">
          <li>Marcas</li>
        </Link>

        <span id="brand-influencers-link">
          <li>Gestão</li>
        </span>
      </ul>
    </nav>
  );
}

export default NavigationBar;
