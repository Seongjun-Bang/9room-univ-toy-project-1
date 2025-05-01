import React from 'react';
import './css/Login.css';
import BookLogo from '../assets/BookLogo.svg';
import GoogleLogo from '../assets/GoogleLogo.svg';
import TwitterLogo from '../assets/TwitterLogo.svg';
import AppleLogo from '../assets/AppleLogo.svg';
import MessengerLogo from '../assets/MessengerLogo.svg';
import FacebookLogo from '../assets/FacebookLogo.svg';

function Login() {
  const handleGoogleLogin = () => {
    console.log('▶️ handleGoogleLogin 호출됨');
    window.location.href = 'http://218.51.41.52.nip.io:9600/oauth2/authorization/google';
  };

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

        <button type="button" className="login-button">
          로그인
        </button>

        <div className="login-links">
          <a href="./main">아이디 찾기</a>
          <span>|</span>
          <a href="./SignUpOCR">비밀번호 찾기</a>
          <span>|</span>
          <a href="./Register">회원가입</a>
        </div>

        <div className="sns-divider">
          <span>SNS 계정으로 로그인</span>
        </div>

        <div className="sns-icons">
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img src={GoogleLogo} alt="google" />
          </button>
          <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img src={TwitterLogo} alt="twitter" />
          </button>
          <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img src={AppleLogo} alt="apple" />
          </button>
          <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img src={MessengerLogo} alt="message" />
          </button>
          <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img src={FacebookLogo} alt="facebook" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
