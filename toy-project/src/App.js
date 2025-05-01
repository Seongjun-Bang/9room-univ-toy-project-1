import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ✅ 라우터 컴포넌트 import
import Community from './components/community'; // 커뮤니티 페이지
import Write from './components/write';         // 글쓰기 페이지
import Post from './components/post'; // ✅ 추가
import MyPost from './components/mypost';
import Main from './components/main';
import LabLocation from './components/LabLocation';
import Login from './components/Login';
import SignUpOCR from './components/SignUpOCR';
import Register from './components/Register';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler'; // ✅ 추가


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}

        <Route path="/community" element={<Community />} />
        <Route path="/write" element={<Write />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/mypost/:id" element={<MyPost />} />
        <Route path="/LabLocation" element={<LabLocation />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Login />} />
        <Route path="/login-success" element={<OAuth2RedirectHandler />} /> {/* ✅ 추가 */}
        <Route path="/SignUpOCR" element={<SignUpOCR />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
