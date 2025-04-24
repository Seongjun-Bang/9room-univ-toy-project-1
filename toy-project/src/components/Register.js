import React from 'react';
import './css//Register.css';

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직
    alert("회원가입 요청이 전송되었습니다!");
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <button className="back-button">{'<'}</button>
        <h2>회원가입</h2>
      </header>

      <div className="divider-line" />

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
  );
}

export default Register;
