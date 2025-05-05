import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/post.css';
import Header from './Header';
import axios from 'axios';
import { FaPaperPlane, FaHeart } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [likeStatus, setLikeStatus] = useState('NONE');
  const [likeCount, setLikeCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const myId = localStorage.getItem('id');

  const handleBack = () => navigate('/community');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://218.51.41.52.nip.io:9600/api/boards/${id}?email=${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data.data;
        setPost(data);
        setLikeStatus(data.likeStatus);
        setLikeCount(data.likeCount);
        setIsMyPost(String(data.writerId) === String(myId));
      } catch (err) {
        console.error('게시글 조회 실패:', err);
        setError('게시글을 불러오지 못했습니다.');
      }
    };
    fetchPost();
  }, [id, token, email, myId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://218.51.41.52.nip.io:9600/api/boards/${id}/like?email=${email}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedData = response.data.data;
      setLikeStatus(updatedData.likeStatus);
      setLikeCount(updatedData.likeCount);
    } catch (err) {
      console.error('추천 실패:', err);
    }
  };

  const handleEdit = () => {
    navigate(`/mypost/${id}`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm('정말 이 게시글을 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      await axios.delete(
        `http://218.51.41.52.nip.io:9600/api/boards/${id}?email=${email}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('게시글이 삭제되었습니다.');
      navigate('/community');
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p className="loading">게시글을 불러오는 중...</p>;

  return (
    <>
      <Header title="자유게시판" onClose={handleBack} />
      <div className="post-wrapper">
        <div className="post-container">
          <div className="post-content-area">
            <div className="post-detail-header" style={{ position: 'relative' }}>
              <div>
                <h3>{post.title}</h3>
                <p className="post-meta">
                  {post.writerDepartment} · {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
              {isMyPost && (
                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '20px',
                      padding: '4px'
                    }}
                    onClick={() => setShowMenu(prev => !prev)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {showMenu && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item" onClick={handleEdit}>✏️ 수정</div>
                      <div className="dropdown-item" onClick={handleDelete}>🗑️ 삭제</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="post-detail-body">{post.content}</p>

            <div className="post-detail-footer">
              <button
                onClick={handleLike}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <FaHeart
                  style={{
                    color: likeStatus === 'LIKE' ? 'red' : '#aaa',
                    fontSize: '14px',
                    position: 'relative',
                    verticalAlign: 'middle',
                    marginRight: '4px',
                    transition: 'color 0.2s ease'
                  }}
                />
                <span style={{ fontSize: '14px' }}>추천 {likeCount}</span>
              </button>
              <span>💬 댓글 {post.commentCount || 0}</span>
            </div>
          </div>

          <div className="comment-section">
            {post.comments?.map(comment => (
              <div className="comment" key={comment.id}>
                <p className="comment-meta">{comment.writerDepartment}</p>
                <p>{comment.content}</p>
                <p className="comment-submeta">
                  {new Date(comment.createdAt).toLocaleString()} · 추천
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="comment-input">
          <input type="text" placeholder="댓글을 입력해주세요." />
          <button>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
