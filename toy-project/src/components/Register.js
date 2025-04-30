import React from 'react';
import './css//Register.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


function Register() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직
    alert("회원가입 요청이 전송되었습니다!");
  };
  const handleBack = () => {
    // 예시: 이전 페이지로 이동
    navigate(-1);
  };  

  return (
    <>
      <Header title="회원가입" onClose={handleBack} />
  
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            아이디
            <input type="text" className="register-input" required />
          </label>
          <label>
            비밀번호
            <input type="password" className="register-input" required />
          </label>
          <label>
            비밀번호 재입력
            <input type="password" className="register-input" required />
          </label>
          <label>
            닉네임
            <input type="text" className="register-input" required />
          </label>
  
          <button type="submit" className="submit-button">회원가입</button>
        </form>
      </div>
    </>
  );
  
}

export default Register;
