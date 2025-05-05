// Post.js (요약된 코드, 전체 복사해도 무방)
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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState(null);
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
      } catch {
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
    } catch {}
  };

  const handleEdit = () => navigate(`/mypost/${id}`);

  const handleDelete = async () => {
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
    try {
      await axios.delete(
        `http://218.51.41.52.nip.io:9600/api/boards/${id}?email=${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('게시글이 삭제되었습니다.');
      navigate('/community');
    } catch {
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
    } catch {
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleCommentUpdate = async (commentId) => {
    if (!editingCommentContent.trim()) return;
    try {
      await axios.put(
        `http://218.51.41.52.nip.io:9600/api/comments/${commentId}?email=${email}`,
        { content: editingCommentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingCommentId(null);
      setRefreshTrigger(prev => prev + 1);
    } catch {
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await axios.delete(
        `http://218.51.41.52.nip.io:9600/api/comments/${commentId}?email=${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRefreshTrigger(prev => prev + 1);
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
                  <button onClick={() => setShowMenu(prev => !prev)}>
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
              <div onClick={handleLike} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <FaHeart style={{ color: likeStatus === 'LIKE' ? 'red' : '#aaa', marginRight: 4 }} />
                <span>추천 {likeCount}</span>
              </div>
              <div style={{ marginLeft: '1rem' }}>💬 댓글 {totalComments}</div>
            </div>
          </div>

          <div className="comment-section">
            {comments.map((comment) => (
              <div className="comment" key={comment.id} style={{ position: 'relative' }}>
                <p className="comment-meta">{comment.writerDepartment}</p>

                {editingCommentId === comment.id ? (
                  <div className="comment-edit-area">
                    <input
                      value={editingCommentContent}
                      onChange={(e) => setEditingCommentContent(e.target.value)}
                      style={{ width: '70%' }}
                    />
                    <button onClick={() => handleCommentUpdate(comment.id)}>수정</button>
                  </div>
                ) : (
                  <>
                    <p>{comment.content}</p>
                    <p className="comment-submeta">{new Date(comment.createdAt).toLocaleString()}</p>
                  </>
                )}

                {String(comment.writerId) === String(myId) && (
                  <div style={{ position: 'absolute', top: 0, right: 0 }}>
                    <button
                      onClick={() => setActiveDropdownId(prev => prev === comment.id ? null : comment.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
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
            ))}
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
