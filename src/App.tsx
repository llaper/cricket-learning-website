import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />} />
          {/* 可以添加更多路由 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
