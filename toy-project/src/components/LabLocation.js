import React, { useState } from 'react';
import './css/LabLocation.css';
import NavBar from './nav_bar';
import Header from './Header';

function LabLocation() {
  const allLabs = [
    { major: 'AI빅데이터전공', location: '없음' },
    { major: '스마트 모빌리티', location: '공대 5층 B109호' },
    { major: '컴퓨터공학과', location: '공대 다동 4층 A119호' },
    { major: '기계공학과', location: '공대 다동 1층 B109호' },
    { major: '산업경영공학과', location: '공대 나동 2층 A213호' },
    { major: '산업경영공학과', location: '공대 나동 2층 A213호' },
    { major: '산업경영공학과', location: '공대 나동 2층 A213호' },
  ];

  const majors = [...new Set(allLabs.map(lab => lab.major))];
  const [searchText, setSearchText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [reportMajor, setReportMajor] = useState('');
  const [reportLocation, setReportLocation] = useState('');


  const filteredMajors = majors.filter(major =>
    major.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredLabs = searchText
    ? allLabs.filter(lab =>
        lab.major.toLowerCase().includes(searchText.toLowerCase())
      )
    : allLabs;

  return (
    <>
      <Header title="우리 과방 위치는?" />

      <div className="lab-page">
        {/* 전공 선택 드롭다운 */}
        <div className="lab-select-wrapper">
          <div
            className="lab-select-box"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <input
              type="text"
              placeholder="다른 과방 찾기"
              value={searchText}
              onChange={e => {
                setSearchText(e.target.value);
                setDropdownOpen(true);
              }}
            />
            <span className="dropdown-icon">
              {dropdownOpen ? '▲' : '▼'}
            </span>
          </div>

          {dropdownOpen && (
            <div className="dropdown-list">
              <div
                className="dropdown-item"
                onClick={() => {
                  setSearchText('');
                  setDropdownOpen(false);
                }}
              >
                전체 보기
              </div>
              {filteredMajors.map((major, idx) => (
                <div
                  className="dropdown-item"
                  key={idx}
                  onClick={() => {
                    setSearchText(major);
                    setDropdownOpen(false);
                  }}
                >
                  {major}
                </div>
              ))}
              {!filteredMajors.length && (
                <div className="dropdown-item no-result">
                  검색 결과 없음
                </div>
              )}
            </div>
          )}
        </div>

        {/* 과방 리스트 */}
        <div className="lab-list">
          {filteredLabs.map((lab, idx) => (
            <div className="lab-card" key={idx}>
              <strong>{lab.major}</strong>
              <p>{lab.location}</p>
            </div>
          ))}
        </div>

        {/* 과방 제보 버튼 */}
        <button
          type="button"
          className="report"
          onClick={() => setShowModal(true)}
        >
          과방 제보
        </button>
      </div>

      {/* 모달 */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <h2>📝 과방 제보하기</h2>
                 {/* 학과 입력 */}
                 <div className="modal-input-group">
              <label>학과</label>
              <input
                type="text"
                placeholder="예: 컴퓨터공학과"
                value={reportMajor}
                onChange={e => setReportMajor(e.target.value)}
              />
            </div>

            {/* 위치 입력 */}
            <div className="modal-input-group">
              <label>위치</label>
              <input
                type="text"
                placeholder="예: 공대 다동 4층 A411호"
                value={reportLocation}
                onChange={e => setReportLocation(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => {
                  // TODO: 제출 로직 구현
                  setShowModal(false);
                }}
              >
                제출
              </button>
              <button onClick={() => setShowModal(false)}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      <NavBar active="과방" />
    </>
  );
}

export default LabLocation;
