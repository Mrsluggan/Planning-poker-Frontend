import React, { useState } from 'react';

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inloggningsuppgifter:', { username, password });
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Användarnamn:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Lösenord:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Logga in</button>
    </form>
  );
}

export default LoginForm;
