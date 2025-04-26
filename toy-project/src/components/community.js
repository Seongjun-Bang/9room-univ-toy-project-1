// ✅ community.js (카드 클릭 시 post.js로 이동하도록 수정)
import React, { useState } from 'react';
import './css/community.css';
import NavBar from './nav_bar';
import { useNavigate } from 'react-router-dom';

const TABS = ['자유', '정보', '홍보', '인기'];

const dummyPosts = [
  {
    id: 1,
    title: '하 안되겠다',
    content: '교수님 ....',
    time: '17시간 전',
    comments: 37,
    likes: 158,
    major: 'AI빅데이터전공',
    category: '자유',
  },
  {
    id: 2,
    title: '하 안되겠다',
    content: '교수님 ....',
    time: '17시간 전',
    comments: 37,
    likes: 158,
    major: 'AI빅데이터전공',
    category: '자유',
  },
  {
    id: 3,
    title: '하 안되겠다',
    content: '교수님 ....',
    time: '17시간 전',
    comments: 37,
    likes: 158,
    major: 'AI빅데이터전공',
    category: '자유',
  },
  {
    id: 4,
    title: '하 안되겠다',
    content: '교수님 ....',
    time: '17시간 전',
    comments: 37,
    likes: 158,
    major: 'AI빅데이터전공',
    category: '자유',
  },
  {
    id: 5,
    title: '하 안되겠다',
    content: '교수님 ....',
    time: '17시간 전',
    comments: 37,
    likes: 158,
    major: 'AI빅데이터전공',
    category: '자유',
  },
  {
    id: 6,
    title: '장학금 정보 공유',
    content: '2025학년도 1학기...',
    time: '3시간 전',
    comments: 12,
    likes: 30,
    major: '컴퓨터공학과',
    category: '정보',
  },
  {
    id: 7,
    title: '스터디 모집합니다',
    content: 'AI 공부 같이 하실 분!',
    time: '5시간 전',
    comments: 5,
    likes: 45,
    major: '전자공학과',
    category: '홍보',
  },
  {
    id: 8,
    title: '장학금 정보 공유',
    content: '2025학년도 1학기...',
    time: '3시간 전',
    comments: 12,
    likes: 30,
    major: '컴퓨터공학과',
    category: '정보',
  },
  {
    id: 9,
    title: '장학금 정보 공유',
    content: '2025학년도 1학기...',
    time: '3시간 전',
    comments: 12,
    likes: 30,
    major: '컴퓨터공학과',
    category: '정보',
  },
  {
    id: 10,
    title: '장학금 정보 공유',
    content: '2025학년도 1학기...',
    time: '3시간 전',
    comments: 12,
    likes: 30,
    major: '컴퓨터공학과',
    category: '정보',
  },
  {
    id: 11,
    title: '스터디 모집합니다',
    content: 'AI 공부 같이 하실 분!',
    time: '5시간 전',
    comments: 5,
    likes: 45,
    major: '전자공학과',
    category: '홍보',
  },
  {
    id: 12,
    title: '스터디 모집합니다',
    content: 'AI 공부 같이 하실 분!',
    time: '5시간 전',
    comments: 5,
    likes: 45,
    major: '전자공학과',
    category: '홍보',
  },
  {
    id: 13,
    title: '스터디 모집합니다',
    content: 'AI 공부 같이 하실 분!',
    time: '5시간 전',
    comments: 5,
    likes: 45,
    major: '전자공학과',
    category: '홍보',
  },
];

const getPopularPosts = () => {
  return [...dummyPosts].sort((a, b) => b.likes - a.likes).slice(0, 10);
};

const Community = () => {
  const [activeTab, setActiveTab] = useState('자유');
  const navigate = useNavigate();

  const postsToShow =
    activeTab === '인기'
      ? getPopularPosts()
      : dummyPosts.filter(post => post.category === activeTab);

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
        {postsToShow.length === 0 ? (
          <p className="no-posts">게시글이 없습니다.</p>
        ) : (
          postsToShow.map(post => (
            <div
              className="post-card"
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <div className="post-time">{post.time}</div>
              <div className="post-title">{post.title}</div>
              <div className="post-content">{post.content}</div>
              <div className="post-footer">
                <div className="post-icons">
                  <span>💬 {post.comments}</span>
                  <span>👍 {post.likes}</span>
                </div>
                <span className="post-major">{post.major}</span>
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


