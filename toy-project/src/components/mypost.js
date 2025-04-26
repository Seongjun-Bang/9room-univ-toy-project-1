// ✅ post.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/post.css';
import Header from './Header';
import { FaPaperPlane } from "react-icons/fa";

const MyPost = () => {
const { id } = useParams();
const navigate = useNavigate();
const handleBack = () => {
    // 예시: 이전 페이지로 이동
  navigate(-1);
};  
const handleDelete = () => {
  // 저장 로직 추가 가능
  navigate('/');
};

  const post = {
    id,
    title: '하 안되겠다',
    content: '교수님 시험범위 너무 많아요 줄여주세요\n'.repeat(8),
    author: 'AI빅데이터전공',
    date: '2025.04.19 20:34',
    comments: [
      {
        id: 1,
        author: 'AI빅데이터전공',
        content: '4학년 되면 시험 범문 안본다 준비 ㅋㅋ',
        date: '2025.04.19 21:15',
        replies: [
          { id: 11, content: '근데 니처럼 과목 많이 안들었으면 시험 많음ㅋㅋ' },
          { id: 12, content: 'ㅇㅈ' },
        ],
      },
      {
        id: 2,
        author: 'AI빅데이터전공',
        content: '4학년 되면 시험 별로 안본다 준비 ㅋㅋ',
        date: '2025.04.19 21:15',
        replies: [],
      },
    ],
  };

  return (
    <div className="post-wrapper">
      <Header
        title="자유게시판"
        onClose={handleBack}
        buttonLabel="삭제"
        onButtonClick={handleDelete}
      />

      <div className="post-container">
        <div className="post-content-area">
          <div className="post-detail-header">
            <div>
              <h3>{post.title}</h3>
              <p className="post-meta">{post.author} · {post.date}</p>
            </div>
          </div>

          <p className="post-detail-body">{post.content}</p>

          <div className="post-detail-footer">
            <span>🤍 추천</span>
            <span>💬 댓글 {post.comments.length}</span>
          </div>
        </div>

        <div className="comment-section">
          {post.comments.map(comment => (
            <div className="comment" key={comment.id}>
              <p className="comment-meta">{comment.author}</p>
              <p>{comment.content}</p>
              <p className="comment-submeta">{comment.date} · 추천 · 대댓글 {comment.replies.length}</p>

              {comment.replies.map(reply => (
                <div key={reply.id} className="reply">
                  ↳ {reply.content}
                </div>
              ))}
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
  );
};

export default MyPost;

