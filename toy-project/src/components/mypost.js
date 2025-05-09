import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/write.css';
import Header from './Header';
import Modal from './Modal'; // ✅ 모달 컴포넌트 import
import axios from 'axios';

const MyPost = () => {
  const { id } = useParams(); // 게시글 ID
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://218.51.41.52.nip.io:9600/api/boards/${id}?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data.data;
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
      } catch (err) {
        console.error('게시글 불러오기 실패:', err);
        openModal('게시글 정보를 불러오지 못했습니다.', () => navigate(-1));
      }
    };

    fetchPost();
  }, [id, token, email, navigate]);

  const handleBack = () => navigate(-1);

  const handleSubmit = async () => {
    if (!token) {
      openModal('로그인이 필요합니다.', () => {});
      return;
    }

    try {
      await axios.put(
        `http://218.51.41.52.nip.io:9600/api/boards/${id}?email=${email}`,
        {
          title,
          content,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      openModal('게시글이 수정되었습니다!', () => navigate(`/post/${id}`));
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      openModal('게시글 수정에 실패했습니다.', () => {});
    }
  };

  return (
    <>
      <Header
        title="글 수정"
        onClose={handleBack}
        buttonLabel="수정"
        onButtonClick={handleSubmit}
      />
      <div className="write-container">
        <div className="write-form">
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

export default MyPost;
