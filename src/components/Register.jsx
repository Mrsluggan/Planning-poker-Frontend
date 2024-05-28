import React, { useState } from 'react';
import Popup from './popup.jsx';
import './Popup.css';

function RegisterForm({ handleRegistration }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try { 
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const message = await response.text();
      setPopupMessage(message);
      setShowPopup(true);
      if (response.ok && message.includes("Registrering lyckades")) {
        handleRegistration();
      }
    } catch (error) {
      console.error('Error vid registering:', error);
      setPopupMessage("Ett fel inträffade vid registreringen");
      setShowPopup(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <input type="text" placeholder='Användarnamn' value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <input type="password" placeholder='Lösenord' value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Registrera</button>
      </form>
        {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div> 
  );
}

export default RegisterForm;