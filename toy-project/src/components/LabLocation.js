import React, { useState } from 'react';
import './css/LabLocation.css';
import PinIcon from '../assets/Pin.svg';
import NavBar from './nav_bar';

function LabLocation() {
  const allLabs = [
    { major: 'AI빅데이터전공', location: '없음' },
    { major: '스마트 모빌리티', location: '공대 5층 B109호' },
    { major: '컴퓨터공학과', location: '공대 다동 4층 A119호' },
    { major: '스마트 모빌리티', location: '공대 5층 B109호' },
    { major: 'AI빅데이터전공', location: '없음' },
    { major: '스마트 모빌리티', location: '공대 5층 B109호' }
  ];

  const majors = [...new Set(allLabs.map(lab => lab.major))];
  const [selectedMajor, setSelectedMajor] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredLabs = selectedMajor
    ? allLabs.filter(lab => lab.major === selectedMajor)
    : allLabs;

  return (
    <>
    <div className="lab-page">
      <h2 className="lab-title">우리 과방 위치는?</h2>

      
      <div className="lab-select-wrapper">
        <div
          className="lab-select-box"
          onClick={() => setDropdownOpen(prev => !prev)}
        >
          <input
            type="text"
            placeholder="다른 과방 찾기"
            readOnly
            value={selectedMajor}
          />
          <span className="dropdown-icon">{dropdownOpen ? '▲' : '▼'}</span>
        </div>

        {dropdownOpen && (
          <ul className="dropdown-list">
            <li onClick={() => { setSelectedMajor(''); setDropdownOpen(false); }}>
              전체 보기
            </li>
            {majors.map((major, idx) => (
              <li key={idx} onClick={() => { setSelectedMajor(major); setDropdownOpen(false); }}>
                {major}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lab-list">
        {filteredLabs.map((lab, idx) => (
          <div className="lab-card" key={idx}>
            <strong>{lab.major}</strong>
            <p>{lab.location}</p>
          </div>
        ))}
      </div>
    </div>
      <NavBar active="과방" />
    </>
  );
}

export default LabLocation;
