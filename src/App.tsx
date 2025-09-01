import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokerList from './pages/PokerList';
import PokerDetail from './pages/PokerDetail';
import Board from './pages/board/index';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './App.css';

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Router basename="/best-poker">
        <div className="App">
          <Routes>
            <Route path="/" element={<PokerList />} />
            <Route path="/index.html" element={<PokerList />} />
            <Route path="/x-game.html" element={<Board />} />
            <Route path="/detail/:id" element={<PokerDetail />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;