import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/write.css';
import Header from './Header';

const Write = () => {
  const navigate = useNavigate();

  // const handleClose = () => navigate('/');
  const handleBack = () => {
    // 예시: 이전 페이지로 이동
    navigate(-1);
  };  
  const handleSubmit = () => {
    // 저장 로직 추가 가능
    navigate('/');
  };

  return (
    <>
      <Header
        title="글쓰기"
        onClose={handleBack}
        buttonLabel="완료"
        onButtonClick={handleSubmit}
      />
    <div className="write-container">

      {/* <Header title="회원가입" onClose={handleBack} /> */}

      <div className="write-form">
        <input
          className="write-input-title"
          type="text"
          placeholder="제목을 입력해주세요."
        />
        <textarea
          className="write-input-content"
          placeholder="자유롭게 이야기 해보세요."
        />
      </div>
    </div>
    </>
  );
};

export default Write;
