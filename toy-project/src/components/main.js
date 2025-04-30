import React from 'react';
import './css/main.css';
// import CarIcon from '../assets/Car.svg';
import PinIcon from '../assets/Pin.svg';
// import PersonIcon from '../assets/Person.svg';
import NavBar from './nav_bar';


function Main() {

  return (
    <div className="home-container">
            <div className="header-container">
              <h2 className="header-title">학과사전</h2>
            </div>
            <hr className="write-divider" />

      <section className="section">
        <h3>인기글</h3>
        <div className="post-list">
          <div className="post-item">
            <p className="post-title">하 안되겠다</p>
            <p className="post-sub">교수님 ....</p>
            <div className="post-meta">
              <span>💬 37</span>
              <spa className='post-heart'>❤️ 158</spa>
              <span className='post-major'>AI데이터전공</span>
            </div>
          </div>

          <div className="post-item">
            <p className="post-title">문자 뭐여 ㅋㅋㅋ</p>
            <p className="post-sub">[돔: 동막생활상담센터]</p>
            <div className="post-meta">
              <span>💬 10</span>
              <span className='post-heart'>❤️ 130</span>
              <span className='post-major'>컴퓨터공학과</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>우리 과방 위치</h3>
  <div className="small-card lab-card">
    <img src={PinIcon} alt="pin" className="lab-icon" />
    <div className="lab-info">
      <strong>컴퓨터공학과</strong>
      <p>공대 다동&nbsp;&nbsp;4층 A411호</p>
    </div>
  </div>
      </section>
      <NavBar active="홈" />
    </div>
  );
}

export default Main;
