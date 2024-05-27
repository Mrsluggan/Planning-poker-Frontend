import React from 'react';

function Start({ goToLogin, goToRegister }) {
  return (
    <div className="backgroundContainer">
    <div className="mainContainer" style={{textAlign: 'center'}}>
        {/* Här lägger du till ditt innehåll för startsidan */}
        <div className="titleContainer">
            <h1>startsidan</h1>
            <p> Välkomen till grupp 3 planing project site</p>
        </div>
        <div className="buttonContainer" style={{display: 'flex', gap: '40px'}}>
            <button onClick={goToLogin}>Gå till inloggning</button>
            <button onClick={goToRegister}>Registrera</button>
        </div>
    </div>
</div>
  );
}

export default Start;



//    besta kanparn fas de behöver ändras https://dev.to/webdeasy/top-20-css-buttons-animations-f41