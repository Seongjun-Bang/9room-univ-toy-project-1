import React, { useState } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import BookLogo from '../assets/BookLogo.svg';
import GoogleLogo from '../assets/GoogleLogo.svg';
import TwitterLogo from '../assets/TwitterLogo.svg';
import AppleLogo from '../assets/AppleLogo.svg';
import MessengerLogo from '../assets/MessengerLogo.svg';
import FacebookLogo from '../assets/FacebookLogo.svg';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    console.log('▶️ handleGoogleLogin 호출됨');
    window.location.href = 'http://218.51.41.52.nip.io:9600/oauth2/authorization/google';
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://218.51.41.52.nip.io:9600/api/users/login', {
        email,
        password
      });

      const token = response.data.data.token;
      const userInfo = response.data.data.userInfo;

      // 토큰과 사용자 정보 저장
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('email', userInfo.email);
      localStorage.setItem('id', userInfo.id);

      alert('로그인 성공!');
      navigate('/main'); // 로그인 후 이동할 페이지
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    }
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

        <input
          type="text"
          placeholder="아이디 입력"
          className="login-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="login-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="button" className="login-button" onClick={handleLogin}>
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
          <span>Google 계정으로 로그인</span>
        </div>

        <div className="sns-icons">
          <button onClick={handleGoogleLogin} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img src={GoogleLogo} alt="google" />
          </button>
    
        </div>
      </div>
    </div>
  );
}

export default Login;