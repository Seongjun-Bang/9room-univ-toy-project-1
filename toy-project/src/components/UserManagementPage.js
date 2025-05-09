import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/UserManagementPage.css';
import Header from './Header';
import NavBar from './nav_bar'; 
import Modal from './Modal';

const API_BASE_URL = 'http://218.51.41.52:9600';

export default function UserManagementPage() {

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
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('userInfo');
  const { email: storedEmail } = storedUser ? JSON.parse(storedUser) : {};

  const [userInfo, setUserInfo] = useState({
    id: null,
    email: '',
    name: '',
    department: '',
    verified: false,
    verificationStatus: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [oauthDept, setOauthDept] = useState('');

  useEffect(() => {
    if (!token || !storedEmail) {
      // alert('로그인이 필요합니다.');
      openModal('로그인이 필요합니다.', () => {});
      navigate('/login');
      return;
    }
    fetchUserInfo(storedEmail);
  }, [navigate, token, storedEmail]);

  // 사용자 정보 조회
  const fetchUserInfo = async email => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/users/me`,
        {
          params: { email },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const data = res.data.data || res.data;
      setUserInfo(data);
    } catch (err) {
      console.error('사용자 조회 실패', err);
      // alert('사용자 정보를 불러오는 데 실패했습니다.');
      openModal('사용자 정보를 불러오는 데 실패했습니다.', () => {});

    }
  };

  // 사용자 정보 수정
  const handleUserUpdate = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/users/me`,
        { name: userInfo.name, department: userInfo.department },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // alert('사용자 정보가 업데이트되었습니다.');
      openModal('사용자 정보가 업데이트되었습니다.', () => {});
      setEditMode(false);
      fetchUserInfo(storedEmail);
    } catch (err) {
      console.error('사용자 정보 수정 실패', err);
      // alert('수정 중 오류가 발생했습니다.');
      openModal('수정 중 오류가 발생했습니다.', () => {});
    }
  };

  // 학생증 인증 페이지로 이동
  const handleVerifyClick = () => {
    navigate('/SignUpOCR');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header title="마이페이지" onClose={handleBack} />
      <div className="user-management-container">

        <section className="section-box">
          <div className="info-row">
            <label>아이디</label>
            <span>{userInfo.email}</span>
          </div>
          <div className="info-row">
            <label>이름</label>
            {editMode ? (
              <input
                type="text"
                value={userInfo.name}
                onChange={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            ) : (
              <span>{userInfo.name}</span>
            )}
          </div>
          <div className="info-row">
            <label>학과</label>
            {editMode ? (
              <input
                type="text"
                value={userInfo.department}
                onChange={e => setUserInfo(prev => ({ ...prev, department: e.target.value }))}
              />
            ) : (
              <span>{userInfo.department}</span>
            )}
          </div>

          {/* 학생증 인증 상태 */}
          <div className="info-row">
            <label>학생증 인증</label>
            {userInfo.verified ? (
              <button type="button" className="verify completed">
                인증 완료
              </button>
            ) : (
              <button type="button" className="verify pending" onClick={handleVerifyClick}>
                <a href="./SignUpOCR">미인증 (인증하기)</a>
                
              </button>
            )}
          </div>
        </section>
        <NavBar/>
      </div>
      {/* ✅ 공통 모달 */}
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
