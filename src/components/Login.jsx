import React, { useState } from 'react';
import Popup from './popup'; 
import './Popup.css'; 

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emoji, setEmoji] = useState('😴');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });
      const user = await response.json();
      if (user) {
        handleLogin(user);
      } else {
        setPopupMessage('Ett fel inträffade vid inloggning');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error vid inloggning:', error);
      setPopupMessage('Fel användarnamn eller lösenord');
      setShowPopup(true);
    }
  }

  return (
    <div className="background">
      <div className="login-container">
        <div className='emoji'>{emoji}</div>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>Användarnamn:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              onFocus={() => setEmoji('😀')}
            />
          </div>
          <div>
            <label>Lösenord:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setEmoji('🫣')}
            />
          </div>
          <button type="submit">Logga in</button>
        </form>
        {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
}

export default LoginForm;