import React from 'react';

function Start({ goToLogin, goToRegister }) {
  return (
        <div className="buttonContainer" style={{display: 'flex', gap: '40px'}}>
            <button onClick={goToLogin}>Gå till inloggning</button>
            <button onClick={goToRegister}>Registrera</button>
        </div>
  );
}

export default Start;
