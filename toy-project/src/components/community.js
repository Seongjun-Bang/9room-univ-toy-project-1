import React, { useState, useEffect } from 'react';
import './css/community.css';
import NavBar from './nav_bar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 탭과 API 카테고리 매핑
const CATEGORY_MAPPING = {
  '자유': 'FREE',
  '정보': 'QNA',
  '홍보': 'CAMPUS_LIFE',
  '인기': 'POPULAR'
};

const TAB_DISPLAY_MAPPING = {
  'FREE': '자유',
  'QNA': '정보',
  'CAMPUS_LIFE': '홍보'
};

const TABS = ['자유', '정보', '홍보', '인기'];

const Community = () => {
  const [activeTab, setActiveTab] = useState('자유');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = 'http://218.51.41.52.nip.io:9600/api/boards';
      
      // 인기 탭이 아닐 때는 카테고리 파라미터 추가
      if (activeTab !== '인기') {
        const apiCategory = CATEGORY_MAPPING[activeTab];
        url += `?category=${apiCategory}`;
      }
      
      const response = await axios.get(url);
      const data = response.data.data.boards;
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('게시글 목록 가져오기 실패:', error);
      setError('게시글을 불러오는데 실패했습니다.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = activeTab === '인기'
    ? [...posts].sort((a, b) => b.likeCount - a.likeCount).slice(0, 10)
    : posts;

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

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
        {error ? (
          <p className="error-message">{error}</p>
        ) : filteredPosts.length === 0 ? (
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
                {post.content?.slice(0, 60)}...
              </div>
              <div className="post-footer">
                <div className="post-icons">
                  <span>💬 {post.commentCount || 0}</span>
                  <span>♥️ {post.likeCount || 0}</span>
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