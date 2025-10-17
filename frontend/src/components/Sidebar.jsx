import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Sidebar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/'); // store last known valid route

  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Sports', path: '/sports' },
    { name: 'Leagues', path: '/leagues' },
    { name: 'Matches', path: '/matches' },
    { name: 'Articles', path: '/articles' },
  ];

  useEffect(() => {
    // Check if the current route exists in menuItems
    const found = menuItems.some((item) => item.path === location.pathname);

    // If found, update activePath to current route
    if (found) {
      setActivePath(location.pathname);
    }
    // else: keep the previous activePath (do nothing)
  }, [location.pathname]);

  return (
    <div className='sidebar'>
      <div className='sidebar1'>
        <h2>Score Central</h2>
        <p>admin</p>
      </div>

      <button className='burger' onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar2 ${menuOpen ? 'open' : ''}`}>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`rounded-md transition ${
                activePath === item.path ? 'active' : ''
              }`}
            >
              <Link
                to={item.path}
                className=''
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
