import React from 'react';
import './css/write.css';
import { FaTimes } from 'react-icons/fa';

const write = () => {
  return (
    <div className="write-container">
      {/* 상단 바 */}
      <div className="write-header">
        <button className="write-close"><FaTimes /></button>
        <h2 className="write-title">글쓰기</h2>
        <button className="write-submit">완료</button>
      </div>

      <hr className="write-divider" />

      {/* 입력 폼 */}
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
  );
};

export default write;
