import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HeaderP from "./components/HeaderP";
import FooterP from "./components/FooterP";
import Home from './components/Home';
import PageLogin from './components/PageLogin';

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
