import React from 'react';
import '../css/community.css';

const posts = [
  {
    id: 1,
    title: '하 안되겠다',
    content: '교수님 ....',
    time: '17시간 전',
    comments: 37,
    likes: 158,
    major: 'AI빅데이터전공'
  },
  {
    id: 2,
    title: '문자 뭐여 ㅋㅋㅋ',
    content: '[듣: 등록생생활상담센터] ....',
    time: '17시간 전',
    comments: 10,
    likes: 7,
    major: '컴퓨터공학과'
  },
  // 더미 데이터 복제
];

function Community() {
  return (
    <div className="community-container">
      <h2 className="community-title">자유게시판</h2>
      <div className="tab-bar">
        <span className="active-tab">자유</span>
        <span>정보</span>
        <span>홍보</span>
        <span>인기</span>
      </div>
      <div className="post-list">
        {posts.map(post => (
          <div className="post-card" key={post.id}>
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.content}</div>
            <div className="post-footer">
              <span>{post.time}</span>
              <div className="post-icons">
                <span>💬 {post.comments}</span>
                <span>👍 {post.likes}</span>
              </div>
              <span className="post-major">{post.major}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="write-button">글쓰기</button>
    </div>
  );
}

export default Community;
