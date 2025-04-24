import React from 'react';
import './css/SingUpOCR.css';
import Camera from '../assets/Camera.svg';

function SignUpOCR() {
  const handleOCRClick = () => {
    // OCR 인증 로직 추가 예정
    alert('OCR 인증을 진행합니다.');
  };

  return (
    <div className="signupocr-container">
      <header className="signupocr-header">
        <button className="back-button">{'<'}</button>
        <h2>회원가입</h2>
      </header>

      <div className="divider-line" />

      <div className="ocr-section">
        <span>학생증을 인증해주세요</span>
        <button className="camera-button" onClick={handleOCRClick}>
          <img src={Camera} alt="카메라 아이콘" />
        </button>
      </div>
      <hr/>

      <form className="signupocr-form">
        <label>
          이름
          <input type="text" className="signupocr-input" />
        </label>
        <label>
          생년월일
          <input type="text" className="signupocr-input" />
        </label>
        <label>
          학과
          <input type="text" className="signupocr-input" />
        </label>
        <label>
          학번
          <input type="text" className="signupocr-input" />
        </label>

        <button type="submit" className="submit-button">인증 완료</button>
      </form>
    </div>
  );
}

export default SignUpOCR;
