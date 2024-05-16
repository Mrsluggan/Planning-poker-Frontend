import React from 'react';

function Start({ goToLogin, goToRegister }) {
  return (
    <div>
      <h1>startsidan</h1>
      <button onClick={goToLogin}>Gå till inloggning</button>
      <button onClick={goToRegister}>Registrera</button>
    </div>
  );
}

export default Start;