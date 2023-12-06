import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import Welcome from './components/Welcome';
import RequirementList from './components/RequirementList';
import StudySection from './components/StudySection';
import ExamSimulator from './components/ExamSimulator';
import myAppLogo from './images/logo.png';
import facebookIcon from './images/facebook.png';
import instagramIcon from './images/instagram.png';
// import twitterIcon from './images/twitter.png';
// import youtubeIcon from './images/youtube.png';
import whatsappIcon from './images/whatsapp.png';
import './styles/AppStyles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="nav">
            <a href="/landing.html">
              <img src={myAppLogo} className="logo" alt="BeMex Logo" />
            </a>
            <div className="menu">
              <a href="/landing.html">Home</a>
              <Link to="/requirements">Requirements</Link>
              <Link to="/study">Study</Link>
              <Link to="/exam-simulator">Exam-Simulator</Link>
            </div>
            <div className="social-media-header">
              <a href="https://www.facebook.com/bemexcitizenship" target="_blank" rel="noopener noreferrer">
                <img src={facebookIcon} alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.instagram.com/bemexcitizenship/" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" className="social-icon" />
              </a>
              <a href="https://wa.me/+529992965121" target="_blank" rel="noopener noreferrer">
                <img src={whatsappIcon} alt="WhatsApp" className="social-icon" />
              </a>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/requirements" element={<RequirementList />} />
          <Route path="/study" element={<StudySection />} />
          <Route path="/exam-simulator" element={<ExamSimulator />} />
        </Routes>
        <footer>
          <p>Contact us:</p>
          <p><a href="mailto:hello@be-mex.com">hello@be-mex.com</a></p>
          <div className="social-media">
            <a href="https://www.facebook.com/bemexcitizenship" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/bemexcitizenship/" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://wa.me/+529992965121" target="_blank" rel="noopener noreferrer">
              <img src={whatsappIcon} alt="WhatsApp" className="social-icon" />
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
