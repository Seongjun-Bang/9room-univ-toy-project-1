// src/Main.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/main.css';
import PinIcon from '../assets/Pin.svg';
import NavBar from './nav_bar';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://218.51.41.52.nip.io:9600';

export default function Main() {
  const [popularPosts, setPopularPosts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchPopular = async () => {
      if (!token) return;
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/boards`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { email }
          }
        );
        let boards = [];
        const raw = res.data?.data?.boards;
        if (Array.isArray(raw)) boards = raw;
        else if (Array.isArray(raw?.boards)) boards = raw.boards;

        boards.sort((a, b) => {
          const diff = (b.likeCount || 0) - (a.likeCount || 0);
          return diff !== 0
            ? diff
            : (b.viewCount || 0) - (a.viewCount || 0);
        });

        setPopularPosts(boards.slice(0, 2));
      } catch (err) {
        console.error('인기글 로딩 실패', err);
      }
    };

    fetchPopular();
  }, [token, email]);

  return (
    <>
      <div className="header-container">
        <h2 className="header-title">학과사전</h2>
      </div>
      <hr className="write-divider" />

      <div className="home-container">
        <section className="section">
          <h3>인기글</h3>
          <div className="post-list">
            {popularPosts.length === 0 ? (
              <p className="no-posts">인기글이 없습니다.</p>
            ) : (
              popularPosts.map(post => (
                <div
                  key={post.id}
                  className="post-item"
                  onClick={() => navigate(`/post/${post.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <p className="post-title">{post.title}</p>
                  {/* 여기만 바뀌었습니다 */}
                  <p className="post-sub">
                    조회수: {post.viewCount ?? 0}
                  </p>
                  <div className="post-meta">
                    <span>💬 {post.commentCount || 0}</span>
                    <span className="post-heart">❤️ {post.likeCount || 0}</span>
                    <span className="post-major">{post.writerDepartment}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="section">
          <h3>우리 과방 위치</h3>
          <div className="small-card lab-card">
            <img src={PinIcon} alt="pin" className="lab-icon" />
            <div className="lab-info">
              <strong>컴퓨터공학과</strong>
              <p>공대 다동 4층 A411호</p>
            </div>
          </div>
          <div className="links-row">
            <a href="/SignUpOCR">OCR인증</a>
            <a href="/UserManagementPage">사용자 페이지</a>
          </div>
        </section>

        <NavBar active="홈" />
      </div>
    </>
  );
}
