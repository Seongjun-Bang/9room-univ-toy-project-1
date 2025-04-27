import React from 'react';
import './css/Header.css';


const Header = ({ title = '', onClose, buttonLabel, onButtonClick }) => {
  return (
    <>
      <div className="header-container">
        

        {/* 가운데 타이틀 */}
        <h2 className="header-title">{title}</h2>

        {/* 오른쪽 버튼 (선택적 표시) */}
        {buttonLabel && onButtonClick ? (
          <button className="header-button" onClick={onButtonClick}>
            {buttonLabel}
          </button>
        ) : (
          <div className="header-right-space" />
        )}
      </div>
      <hr className="write-divider" />
    </>
  );
};

export default Header;