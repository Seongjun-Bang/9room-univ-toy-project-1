import React from 'react';
import './css/Login.css';
import BookLogo from '../assets/BookLogo.svg';
import GoogleLogo from '../assets/GoogleLogo.svg';
import Twitter from '../assets/TwitterLogo.svg';
import AppleLogo from '../assets/AppleLogo.svg';
import MessengerLogo from '../assets/MessengerLogo.svg';
import FacebookLogo from '../assets/FacebookLogo.svg';


function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-section">
          <img src={BookLogo} alt="logo" className="logo-icon" />
          <div>
            <h1 className="app-name">학과사전</h1>
            <p className="app-subtitle">진짜 정보, 진짜 사람, 진짜 캠퍼스</p>
          </div>
        </div>

        <input type="text" placeholder="아이디 입력" className="login-input" />
        <input type="password" placeholder="비밀번호 입력" className="login-input" />
        
        <button className="login-button">로그인</button>

        <div className="login-links">
          <a href="./main">아이디 찾기</a>
          <span>|</span>
          <a href="./SignUpOCR">비밀번호 찾기</a>
          <span>|</span>
          <a href="./Register">회원가입</a>
        </div>

        <div className="sns-divider"><span>SNS 계정으로 로그인</span></div>

        <div className="sns-icons">
          <img src={GoogleLogo} alt="google" />
          <img src={Twitter} alt="twitter" />
          <img src={AppleLogo} alt="apple" />
          <img src={MessengerLogo} alt="message" />
          <img src={FacebookLogo} alt="facebook" />
        </div>
      </div>
    </div>
  );
}

export default Login;
