import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ✅ 라우터 컴포넌트 import
import Community from './components/community'; // 커뮤니티 페이지
import Write from './components/write';         // 글쓰기 페이지

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Community />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </Router>
  );
}

export default App;
