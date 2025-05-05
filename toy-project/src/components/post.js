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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBack = () => navigate('/community');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/boards/${id}`, {
          params: { email },
          headers: { Authorization: `Bearer ${token}` },
        });
        const pd = data.data;
        setPost(pd);
        setLikeStatus(pd.likeStatus);
        setLikeCount(pd.likeCount);
        setIsMyPost(String(pd.writerId) === String(myId));
      } catch (err) {
        setError('게시글을 불러오지 못했습니다.');
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/comments/board/${id}`, {
          params: { email },
          headers: { Authorization: `Bearer ${token}` },
        });
        const cd = data.data;
        setComments(cd.comments || []);
        setTotalComments(cd.totalComments || 0);
      } catch (err) {
        setComments([]);
        setTotalComments(0);
      }
    };

    fetchPost();
    fetchComments();
  }, [id, email, token, myId, refreshTrigger]);

  const handleLike = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/boards/${id}/like`, null, {
        params: { email },
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikeStatus(data.data.likeStatus);
      setLikeCount(data.data.likeCount);
    } catch (err) {
      console.error('추천 실패:', err);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/comments/${commentId}/like`, null, {
        params: { email },
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = data.data.comment;
      setComments(prev =>
        prev.map(c =>
          c.id === commentId ? { ...c, likeCount: updated.likeCount, liked: updated.liked } : c
        )
      );
    } catch (err) {
      console.error('댓글 좋아요 실패:', err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(`${API_BASE_URL}/api/comments`, { boardId: id, content: commentText }, {
        params: { email },
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentText('');
      setRefreshTrigger(n => n + 1);
    } catch (err) {
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleCommentUpdate = async (commentId) => {
    if (!editingCommentContent.trim()) return;
    try {
      await axios.put(`${API_BASE_URL}/api/comments/${commentId}`, { content: editingCommentContent }, {
        params: { email },
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingCommentId(null);
      setRefreshTrigger(n => n + 1);
    } catch {
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/comments/${commentId}`, {
        params: { email },
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefreshTrigger(n => n + 1);
    } catch {
      alert('댓글 삭제 실패');
    }
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>로딩 중...</p>;

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
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowMenu(p => !p)}><BsThreeDotsVertical /></button>
                  {showMenu && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item" onClick={() => navigate(`/mypost/${id}`)}>✏️ 수정</div>
                      <div className="dropdown-item" onClick={async () => {
                        if (!window.confirm('정말 삭제할까요?')) return;
                        await axios.delete(`${API_BASE_URL}/api/boards/${id}`, {
                          params: { email },
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        alert('삭제되었습니다.');
                        navigate('/community');
                      }}>🗑️ 삭제</div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="post-detail-body">{post.content}</p>
            <div className="post-detail-footer">
              <div onClick={handleLike} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <FaHeart style={{ color: likeStatus === 'LIKE' ? 'red' : '#aaa', marginRight: 4 }} />
                <span>추천 {likeCount}</span>
              </div>
              <div style={{ marginLeft: '1rem' }}>💬 댓글 {totalComments}</div>
            </div>
          </div>

          <div className="comment-section">
            {comments.length === 0 ? (
              <p style={{ color: '#999', fontSize: '14px', padding: '1rem' }}>아직 작성된 댓글이 없습니다.</p>
            ) : (
              comments.map(comment => (
                <div className="comment" key={comment.id} style={{ position: 'relative' }}>
                  <p className="comment-meta">{comment.writerDepartment}</p>
                  {editingCommentId === comment.id ? (
                    <div style={{
                      position: 'absolute',
                      top: '24px', right: 0,
                      background: '#FEFBF5',
                      border: '1px solid #f0e6dd',
                      borderRadius: '20px',
                      padding: '0.5rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      width: 'calc(100% - 40px)',
                      maxWidth: '360px',
                      zIndex: 1000,
                    }}>
                      <input
                        value={editingCommentContent}
                        onChange={e => setEditingCommentContent(e.target.value)}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          fontSize: '0.9rem',
                          padding: '0.5rem',
                          outline: 'none'
                        }}
                      />
                      <button onClick={() => handleCommentUpdate(comment.id)} style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        color: '#b04b1f',
                        cursor: 'pointer',
                        marginLeft: '0.5rem'
                      }}>
                        <FaPaperPlane />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>{comment.content}</p>
                      <p className="comment-submeta">{new Date(comment.createdAt).toLocaleString()}</p>
                      <div className="comment-like-btn" onClick={() => handleCommentLike(comment.id)} style={{ cursor: 'pointer' }}>
                        <FaHeart style={{ color: comment.liked ? 'red' : '#aaa', marginRight: 4 }} />
                        <span>{comment.likeCount}</span>
                      </div>
                    </>
                  )}
                  {String(comment.writerId) === String(myId) && (
                    <div style={{ position: 'absolute', top: 25, right: 0 }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setActiveDropdownId(p => p === comment.id ? null : comment.id)}>
                        <BsThreeDotsVertical />
                      </button>
                      {activeDropdownId === comment.id && (
                        <div className="dropdown-menu">
                          <div className="dropdown-item" onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditingCommentContent(comment.content);
                            setActiveDropdownId(null);
                          }}>✏️ 수정</div>
                          <div className="dropdown-item" onClick={() => handleCommentDelete(comment.id)}>🗑️ 삭제</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="comment-input">
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}><FaPaperPlane /></button>
        </div>
      </div>
    </>
  );
};

export default Post;
