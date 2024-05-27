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
      const response = await fetch('https://squid-app-oddmp.ondigitalocean.app/login', {
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
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder='Användarnamn'
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder='Lösenord'
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Logga in</button>
      </form>
        {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default LoginForm;