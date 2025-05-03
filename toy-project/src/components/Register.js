// src/components/Register.js
import React, { useState } from 'react';
import './css/Register.css';    // 중복된 슬래시 제거
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const API_BASE_URL = 'http://218.51.41.52:9600'; // 혹은 프로덕션/환경변수로 분리

function Register() {
  const navigate = useNavigate();

  // 1. form 입력값 state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. 비밀번호 일치 검증
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          name,
          department
        })
      });

      // 3. 응답 처리
      if (res.status === 201) {
        const data = await res.json();
        alert('회원가입 성공! 이제 로그인 페이지로 이동합니다.');
        // 회원가입 성공 직후
        localStorage.setItem('signupEmail', email);
        navigate('/SignUpOCR');  // 로그인 화면으로 리다이렉트
      } else {
        const errorBody = await res.json();
        // 400 (입력값 오류) / 409 (이메일 중복) 등 처리
        alert(`회원가입 실패: ${errorBody.message || '알 수 없는 오류'}`);
      }
    } catch (err) {
      console.error(err);
      alert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <>
      <Header title="회원가입" onClose={handleBack} />

      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            아이디(이메일)
            <input
              type="email"
              className="register-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            비밀번호
            <input
              type="password"
              className="register-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            비밀번호 재입력
            <input
              type="password"
              className="register-input"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <label>
            이름
            <input
              type="text"
              className="register-input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>

          <label>
            학과
            <input
              type="text"
              className="register-input"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="submit-button">
            회원가입
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
