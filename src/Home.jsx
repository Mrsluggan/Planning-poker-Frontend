

import React from 'react';

function Home({ goToLogin }) {
  return (
    <div>
      <h1>startsidan</h1>
      
      <button onClick={goToLogin}>Gå till inloggning</button>
    </div>
  );
}

export default Home;
