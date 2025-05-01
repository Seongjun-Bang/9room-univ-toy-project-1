// src/OAuth3RedirectHandler.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get('token');

    if (token) {
      // 토큰 저장 (원하는 스토리지에)
      localStorage.setItem('jwtToken', token);
      // 로그인 성공 후 리다이렉트할 경로
      navigate('/main');
    } else {
      console.error('토큰이 URL에 없습니다.');
      navigate('/');
    }
  }, [search, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <p>로그인 처리 중입니다...</p>
    </div>
  );
};

export default OAuth2RedirectHandler;
