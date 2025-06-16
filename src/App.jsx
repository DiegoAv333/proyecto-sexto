//import logo from './logo.svg';
import './App.css';
import React from 'react';
import FooterP from './components/footerPage/FooterP';
import HeaderP from './components/header/HeaderP';
import Home from './components/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';

function App() {
  return (
    <Router>
    <div className="App">
      <HeaderP />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <FooterP />
    </div>
    </Router>
  );
}

export default App;
