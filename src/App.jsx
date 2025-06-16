import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import HeaderP from "./components//header/HeaderP";
import FooterP from "./components/footerPage/FooterP";
import Home from './components/home/Home';
import PageLogin from './components/login/PageLogin';

function App() {
  const repositoryName = process.env.PUBLIC_URL ? new URL(process.env.PUBLIC_URL).pathname : '/';
  return (
    <Router basename={repositoryName}>
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
