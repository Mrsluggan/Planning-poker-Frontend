import React from 'react';
import './Popup.css';

function Popup({ message, onClose }) {
  let emoji = '';

 
  if (message.includes('Registrering lyckades')) {
    emoji = '✅'; 
  } else if (message.includes('Ett fel inträffade vid registreringen')) {
    emoji = '🫤';
  } else if (message.includes('Användarnamnet är upptaget')) {
    emoji = '⚠️'; 
  }  else if (message.includes('Fel användarnamn eller lösenord')) {
    emoji = '❌'; 
  }
  

  return (
    <div className="popup-overlay">
      <div className="popup-content">
     
        {emoji && <div className="emoji">{emoji}</div>}
   
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default Popup;