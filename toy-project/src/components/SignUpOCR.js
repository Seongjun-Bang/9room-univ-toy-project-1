// src/components/SignUpOCR.js
import React, { useState, useEffect, useRef } from 'react';
import './css/SignUpOCR.css';
import Camera from '../assets/Camera.svg';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

// 실제 백엔드 주소
const API_BASE_URL = 'http://218.51.41.52:9600';

// 발급받은 JWT 토큰 (예시)
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaW4wMjAyMjdAZ21haWwuY29tIiwiaWF0IjoxNzQ2MjU3NjI3LCJleHAiOjE3NDYyNjEyMjd9.P8FJSbUzc1NeG9dohmaC1A_LlX1bzDXrJ72z2zlE02w';

function SignUpOCR() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 1) Register.js에서 저장해 둔 이메일 꺼내기
  const [email, setEmail] = useState('');
  useEffect(() => {
    const savedEmail = localStorage.getItem('signupEmail');
    if (!savedEmail) {
      alert('이메일 정보가 없습니다. 로그인 화면으로 이동합니다.');
      return navigate('/');
    }
    setEmail(savedEmail);
  }, [navigate]);

  // 2) 선택된 파일(state)
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 3) 카메라 버튼 클릭 → 숨겨진 file input 트리거
  const handleOCRClick = () => {
    fileInputRef.current?.click();
  };

  // 4) 폼 제출(인증완료) → OCR API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔔 handleSubmit 호출됨, file:', file);

    if (!file) {
      alert('학생증 이미지를 먼저 선택해 주세요.');
      return;
    }

    // FormData 구성
    const formData = new FormData();
    formData.append('studentIdCard', file);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/verify-department/ocr?email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: {
            // JWT 토큰을 Authorization 헤더에 담아 보냅니다
            'Authorization': `Bearer ${JWT_TOKEN}`
          },
          body: formData,
        }
      );

      console.log('▶️ OCR 응답 상태:', res.status);
      const json = await res.json();
      console.log('▶️ OCR 응답 본문:', json);

      if (res.status === 200) {
        alert('학과 인증 성공! 로그인 화면으로 이동합니다.');
        localStorage.removeItem('signupEmail');
        navigate('/');  // 로그인 화면(“/”)으로 이동
      } else {
        alert(`인증 실패: ${json.message || '알 수 없는 오류'}`);
      }
    } catch (err) {
      console.error('▶️ 네트워크 에러 상세:', err);
      alert(`네트워크 오류: ${err.message}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header title="회원가입" onClose={handleBack} />

      <div className="signupocr-container">
        <div className="ocr-section">
          <span>학생증을 인증해주세요</span>
          <button
            type="button"
            className="camera-button"
            onClick={handleOCRClick}
          >
            <img src={Camera} alt="카메라 아이콘" />
          </button>
          {file && <p>선택된 파일: {file.name}</p>}

          {/* 숨겨진 파일 입력 */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        <hr />

        <form className="signupocr-form" onSubmit={handleSubmit}>
          <button type="submit" className="submit-button">
            인증 완료
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUpOCR;
