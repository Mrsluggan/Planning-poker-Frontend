import React, { useState } from 'react';

function RegisterForm({ handleRegistration }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registreringsuppgifter: ', { username, password });
    handleRegistration();
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
      <button type="submit">Registrera</button>
    </form>
  );
}

export default RegisterForm;