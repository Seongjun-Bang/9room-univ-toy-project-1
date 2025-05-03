import React, { useState, useEffect } from 'react';
import './css/community.css';
import NavBar from './nav_bar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TABS = ['자유', '정보', '홍보', '인기'];

const Community = () => {
  const [activeTab, setActiveTab] = useState('자유');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://218.51.41.52.nip.io:9600/api/boards')
      .then(response => {
        const data = response.data.data.boards;
        setPosts(Array.isArray(data) ? data : []); // 🛠️ posts.filter 에러 방지
      })
      .catch(error => {
        console.error('게시글 목록 가져오기 실패:', error);
      });
  }, []);

  const filteredPosts =
    activeTab === '인기'
      ? [...posts].sort((a, b) => b.likeCount - a.likeCount).slice(0, 10)
      : posts.filter(post =>
          post.categoryDisplayName?.includes(activeTab)
        );

  return (
    <>
      <div className="community-header">
        <h2 className="community-title">{activeTab}게시판</h2>
        <div className="tab-bar">
          {TABS.map(tab => (
            <span
              key={tab}
              className={activeTab === tab ? 'active-tab' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="post-scroll-area">
        {filteredPosts.length === 0 ? (
          <p className="no-posts">게시글이 없습니다.</p>
        ) : (
          filteredPosts.map(post => (
            <div
              className="post-card"
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <div className="post-time">
                {new Date(post.createdAt).toLocaleString()}
              </div>
              <div className="post-title">{post.title}</div>
              <div className="post-content">
                {post.content.slice(0, 60)}...
              </div>
              <div className="post-footer">
                <div className="post-icons">
                  <span>💬 {post.commentCount}</span>
                  <span>♥️ {post.likeCount}</span>
                </div>
                <span className="post-major">{post.writerDepartment}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {activeTab !== '인기' && (
        <button className="write-button" onClick={() => navigate('/write')}>
          글쓰기
        </button>
      )}

      <NavBar active="게시판" />
    </>
  );
};

export default Community;
