import React from 'react';
import './css/nav_bar.css';
import { FaListUl, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

const NavBar = ({ active = '홈' }) => {
  const navigate = useNavigate(); // ✅ 추가

  const navItems = [
    { name: '게시판', icon: <FaListUl />, path: '/community' },           // community.js
    { name: '홈', icon: <FaHome />, path: '/main' },             // main.js
    { name: '과방', icon: <FaMapMarkerAlt />, path: '/LabLocation' },    // LabLocation.js
  ];

  return (
    <nav className="nav-bar">
      {navItems.map(item => (
        <div
          key={item.name}
          className={`nav-item ${active === item.name ? 'active' : ''}`}
          onClick={() => navigate(item.path)} // ✅ 경로 이동
        >
          {item.icon}
          <span>{item.name}</span>
        </div>
      ))}
    </nav>
  );
};

export default NavBar;
