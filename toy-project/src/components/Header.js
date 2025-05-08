import React from 'react';
//import './css/Header.css';
import './css/header.css';
import { SlArrowLeft } from "react-icons/sl";


// Header.js
const Header = ({ title = '', onClose, buttonLabel, onButtonClick }) => {
  return (
    <>
      <div className="header-wrapper">
        <div className="header-container">
          
          {/* 왼쪽 버튼 */}
          <button className="header-close" onClick={onClose}>
          <SlArrowLeft />
        </button>

          {/* 가운데 타이틀 */}
          <h2 className="header-title">{title}</h2>

          {/* 오른쪽 버튼 */}
          {buttonLabel && onButtonClick ? (
            <button className="header-button" onClick={onButtonClick}>
              {buttonLabel}
            </button>
          ) : (
            <div className="header-right-space" />
          )}
        </div>
       {/* 빨간 구분선: header-container 바로 아래에 넣기 */}
       <hr className="write-divider" />
      </div>
    </>
  );
};

export default Header;