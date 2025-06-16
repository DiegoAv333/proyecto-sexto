import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HeaderP from "./components//header/HeaderP";
import FooterP from "./components/footerPage/FooterP";
import Home from './components/home/Home';
import PageLogin from './components/login/PageLogin';

function App() {
  return (
    <Router>
    <div className="App">
      <HeaderP></HeaderP>
      <div className="App-main">
        <div className="App-main-text">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<PageLogin />} />
            </Routes>
        </div>
      </div>
      <FooterP></FooterP>
    </div>
    </Router>
  );
}

export default App;
