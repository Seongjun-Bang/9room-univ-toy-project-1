import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/write.css';
import Header from './Header';
import axios from 'axios';
import Modal from './Modal'; 

const CATEGORY_MAP = {
  '자유게시판': 'FREE',
  '정보게시판': 'QNA',
  '홍보게시판': 'CAMPUS_LIFE',
};

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('자유게시판');

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

  const handleBack = () => navigate(-1);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token) {
      // alert('로그인이 필요합니다.');
      openModal('로그인이 필요합니다.', () => {});
      return;
    }

    try {
      await axios.post(
        `http://218.51.41.52.nip.io:9600/api/boards?email=${email}`,
        {
          title,
          content,
          category: CATEGORY_MAP[selectedCategory],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert('게시글이 작성되었습니다!');
      openModal('게시글이 작성되었습니다!', () => {
        navigate('/community');
      });
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      // alert('게시글 작성에 실패했습니다.');
      openModal('게시글 작성에 실패했습니다.', () => {});
    }
  };

  return (
    <>
      <Header
        title="글쓰기"
        onClose={handleBack}
        buttonLabel="완료"
        onButtonClick={handleSubmit}
        className="write-done"
      />
      <div className="write-container">
        <div className="write-form">
          {/* 드롭다운 추가 */}
          <select
            className="write-category-select"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {Object.keys(CATEGORY_MAP).map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <input
            className="write-input-title"
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="write-input-content"
            placeholder="자유롭게 이야기 해보세요."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
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
};

export default Write;
