import React from 'react';
import './css/Header.css';
//import './css/Header.css';
import { SlArrowLeft } from "react-icons/sl";


const Header = ({ title = '', onClose, buttonLabel, onButtonClick }) => {
  return (
    <>
      <div className="header-container">
        {/* 왼쪽 닫기 버튼 */}
        <button className="header-close" onClick={onClose}>
          <SlArrowLeft />
        </button>

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
