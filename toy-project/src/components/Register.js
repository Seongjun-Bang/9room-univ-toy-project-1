import React, { useState } from 'react';
import './css/Register.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Modal from './Modal';
import axios from 'axios';

function Register() {
  // ✅ 모달 상태
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [onModalClose, setOnModalClose] = useState(() => () => {});

  // ✅ 모달 표시 함수
  const openModal = (message, onCloseCallback) => {
    setModalMessage(message);
    setOnModalClose(() => onCloseCallback); // 콜백 저장
    setShowModal(true);
  };
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // alert('비밀번호가 일치하지 않습니다.');
      openModal('비밀번호가 일치하지 않습니다.', () => {});
      return;
    }

    const { email, password, name, department } = formData;

    try {
      const res = await axios.post('http://218.51.41.52:9600/api/users/signup', {
        email,
        password,
        name,
        department
      });

      // alert('회원가입 성공!');
      // 회원가입 성공 시
      openModal('회원가입 성공!', () => {
        localStorage.setItem('email', email);
        navigate('/');
      });

      console.log('✅ 응답:', res.data);

      // // ✅ 이메일을 signupEmail이라는 key로 저장 (OCR에서 사용)
      // localStorage.setItem('email', email);
      // // OCR 인증 페이지로 이동
      // navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error.response?.data);
      // alert(error.response?.data?.message || '회원가입에 실패했습니다.');
      openModal(error.response?.data?.message || '회원가입에 실패했습니다.', () => {});
    }
  };

  return (
    <>
      <Header title="회원가입" onClose={() => navigate(-1)} />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            이메일
            <input
              type="email"
              name="email"
              className="register-input"
              required
              onChange={handleChange}
            />
          </label>

          <label>
            비밀번호
            <input
              type="password"
              name="password"
              className="register-input"
              required
              onChange={handleChange}
            />
          </label>

          <label>
            비밀번호 재입력
            <input
              type="password"
              name="confirmPassword"
              className="register-input"
              required
              onChange={handleChange}
            />
          </label>

          <label>
            닉네임
            <input
              type="text"
              name="name"
              className="register-input"
              required
              onChange={handleChange}
            />
          </label>

          <label>
            학과
            <input
              type="text"
              name="department"
              className="register-input"
              required
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-button">회원가입</button>
        </form>
      </div>
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={() => {
            setShowModal(false);
            onModalClose(); // 닫기 후 콜백 실행
          }}
        />
      )}
    </>
  );
}

export default Register;
