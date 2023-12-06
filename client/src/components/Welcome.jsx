import React from 'react';
import welcomeImage from '../images/welcome.png';

function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to BeMex</h1>
      <img src={welcomeImage} alt="Welcome" className="welcome-image" />
    </div>
  );
}

export default Welcome;
