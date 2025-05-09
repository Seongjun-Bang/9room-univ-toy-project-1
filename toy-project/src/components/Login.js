import React, { useState, useEffect } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import BookLogo from '../assets/BookLogo.svg';
import GoogleLogo from '../assets/GoogleLogo.svg';
import TwitterLogo from '../assets/TwitterLogo.svg';
import AppleLogo from '../assets/AppleLogo.svg';
import MessengerLogo from '../assets/MessengerLogo.svg';
import FacebookLogo from '../assets/FacebookLogo.svg';

import Modal from './Modal'; // ✅ 공통 모달 컴포넌트

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // ✅ 모달 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal]);

  const handleGoogleLogin = () => {
    console.log('▶️ handleGoogleLogin 호출됨');
    window.location.href = 'http://218.51.41.52.nip.io:9600/oauth2/authorization/google';
  };

  const showModalWithMessage = (msg) => {
    setModalMessage(msg);
    setShowModal(true);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://218.51.41.52.nip.io:9600/api/users/login', {
        email,
        password
      });

      const { token, userInfo } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('email', userInfo.email);
      localStorage.setItem('id', userInfo.id);

      showModalWithMessage('🎉 로그인에 성공하였습니다!');
    } catch (error) {
      console.error('로그인 실패:', error);
      showModalWithMessage('로그인에 실패했습니다.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage.includes('성공')) {
      navigate('/main');
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

      {/* ✅ 공통 모달 */}
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Login;
