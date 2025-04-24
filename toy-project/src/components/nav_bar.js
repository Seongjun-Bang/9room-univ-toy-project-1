import React from 'react';
import './css/nav_bar.css';
import { FaListUl, FaHome, FaMapMarkerAlt } from 'react-icons/fa';

const NavBar = ({ active = '홈' }) => {
  const navItems = [
    { name: '게시판', icon: <FaListUl /> },
    { name: '홈', icon: <FaHome /> },
    { name: '과방', icon: <FaMapMarkerAlt /> },
  ];

  return (
    <nav className="nav-bar">
      {navItems.map(item => (
        <div
          key={item.name}
          className={`nav-item ${active === item.name ? 'active' : ''}`}
        >
          {item.icon}
          <span>{item.name}</span>
        </div>
      ))}
    </nav>
  );
};

export default NavBar;
