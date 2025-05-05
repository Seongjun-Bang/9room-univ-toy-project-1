// src/Post.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/post.css';
import Header from './Header';
import axios from 'axios';
import { FaPaperPlane, FaHeart } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

const API_BASE_URL = 'http://218.51.41.52.nip.io:9600';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const myId = localStorage.getItem('id');

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [error, setError] = useState(null);
  const [likeStatus, setLikeStatus] = useState('NONE');
  const [likeCount, setLikeCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBack = () => navigate('/community');

  useEffect(() => {
    // 게시글 가져오기
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/boards/${id}`,
          {
            params: { email },
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const pd = data.data;
        setPost(pd);
        setLikeStatus(pd.likeStatus);
        setLikeCount(pd.likeCount);
        setIsMyPost(String(pd.writerId) === String(myId));
      } catch (err) {
        console.error('게시글 조회 실패:', err);
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
      }
    };

    // 댓글 가져오기
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/comments/board/${id}`,
          {
            params: { email },
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const cd = data.data;
        setComments(cd.comments || []);
        setTotalComments(cd.totalComments || 0);
      } catch (err) {
        console.error('댓글 조회 실패:', err);
      }
    };

    fetchPost();
    fetchComments();
  }, [id, email, token, myId, refreshTrigger]);

  // 게시글 좋아요
  const handleLike = async () => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/boards/${id}/like`,
        null,
        {
          params: { email },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setLikeStatus(data.data.likeStatus);
      setLikeCount(data.data.likeCount);
    } catch (err) {
      console.error('추천 실패:', err);
    }
  };

  // 댓글 좋아요
  const handleCommentLike = async (commentId) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/comments/${commentId}/like`,
        null,
        {
          params: { email },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const updated = data.data.comment;
      // 업데이트된 좋아요 상태를 comments 배열에 반영
      setComments(prev =>
        prev.map(c =>
          c.id === commentId
            ? { ...c, likeCount: updated.likeCount, liked: updated.liked }
            : c
        )
      );
    } catch (err) {
      console.error('댓글 좋아요 실패:', err);
    }
  };

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(
        `${API_BASE_URL}/api/comments`,
        { boardId: id, content: commentText },
        {
          params: { email },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setCommentText('');
      setRefreshTrigger(n => n + 1);
    } catch (err) {
      console.error('댓글 작성 실패:', err);
      alert('댓글 작성에 실패했습니다.');
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
            {/* 게시글 헤더 */}
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
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
                    onClick={() => setShowMenu(prev => !prev)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {showMenu && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item" onClick={() => navigate(`/mypost/${id}`)}>
                        ✏️ 수정
                      </div>
                      <div className="dropdown-item" onClick={async () => {
                        if (!window.confirm('정말 삭제할까요?')) return;
                        await axios.delete(
                          `${API_BASE_URL}/api/boards/${id}`,
                          {
                            params: { email },
                            headers: { Authorization: `Bearer ${token}` }
                          }
                        );
                        alert('삭제되었습니다.');
                        navigate('/community');
                      }}>
                        🗑️ 삭제
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 게시글 본문 */}
            <p className="post-detail-body">{post.content}</p>

            {/* 게시글 좋아요 & 댓글 수 */}
            <div className="post-detail-footer">
              <div className="like-btn" onClick={handleLike} style={{ cursor: 'pointer' }}>
                <FaHeart
                  style={{
                    color: likeStatus === 'LIKE' ? 'red' : '#aaa',
                    marginRight: '4px'
                  }}
                />
                <span>추천 {likeCount}</span>
              </div>
              <div style={{ marginLeft: '1rem', color: '#888' }}>
                💬 댓글 {totalComments}
              </div>
            </div>
          </div>

          {/* 댓글 리스트 */}
          <div className="comment-section">
            {comments.length === 0 ? (
              <p style={{ color: '#999', padding: '1rem' }}>
                아직 작성된 댓글이 없습니다.
              </p>
            ) : (
              comments.map(comment => (
                <div className="comment" key={comment.id}>
                  <p className="comment-meta">
                    {comment.writerDepartment} ·{' '}
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                  <p>{comment.content}</p>
                  <div
                    className="comment-like-btn"
                    onClick={() => handleCommentLike(comment.id)}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: '4px' }}
                  >
                    <FaHeart
                      style={{
                        color: comment.liked ? 'red' : '#aaa',
                        marginRight: '4px'
                      }}
                    />
                    <span>{comment.likeCount}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 댓글 입력창 */}
        <div className="comment-input">
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
