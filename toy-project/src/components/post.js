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
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [error, setError] = useState(null);
  const [likeStatus, setLikeStatus] = useState('NONE');
  const [likeCount, setLikeCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const myId = localStorage.getItem('id');

  const handleBack = () => navigate('/community');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://218.51.41.52.nip.io:9600/api/boards/${id}?email=${email}`,
          { headers: { Authorization: `Bearer ${token}` } }
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

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://218.51.41.52.nip.io:9600/api/comments/board/${id}?email=${email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data.data;
        setComments(Array.isArray(data.comments) ? data.comments : []);
        setTotalComments(data.totalComments || 0);
      } catch (err) {
        console.error('댓글 조회 실패:', err);
        setComments([]);
        setTotalComments(0);
      }
    };

    fetchPost();
    fetchComments();
  }, [id, token, email, myId, refreshTrigger]);

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
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
    try {
      await axios.delete(
        `http://218.51.41.52.nip.io:9600/api/boards/${id}?email=${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('게시글이 삭제되었습니다.');
      navigate('/community');
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(
        `http://218.51.41.52.nip.io:9600/api/comments?email=${email}`,
        { boardId: id, content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText('');
      setRefreshTrigger(prev => prev + 1);
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
                      <div className="dropdown-item" onClick={handleEdit}>✏️ 수정</div>
                      <div className="dropdown-item" onClick={handleDelete}>🗑️ 삭제</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="post-detail-body">{post.content}</p>

            <div className="post-detail-footer">
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleLike}>
                <FaHeart
                  style={{
                    color: likeStatus === 'LIKE' ? 'red' : '#aaa',
                    fontSize: '14px',
                    marginRight: '4px',
                    position: 'relative',
                  }}
                />
                <span>추천 {likeCount}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                <span style={{ fontSize: '14px', color: '#888', marginRight: '4px' }}>💬</span>
                <span>댓글 {totalComments}</span>
              </div>
            </div>
          </div>

          <div className="comment-section">
            {comments.length === 0 ? (
              <p style={{ color: '#999', fontSize: '14px', padding: '1rem' }}>아직 작성된 댓글이 없습니다.</p>
            ) : (
              comments.map(comment => (
                <div className="comment" key={comment.id}>
                  <p className="comment-meta">{comment.writerDepartment}</p>
                  <p>{comment.content}</p>
                  <p className="comment-submeta">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ✅ 댓글 입력창은 post-container 밖에 위치 */}
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
