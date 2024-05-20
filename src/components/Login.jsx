import React, { useState } from 'react';

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

 const handleSubmit = async (e) =>{
  e.preventDefult();
  try{
    const response = await fetch('http://localhost:8080/login', 
    {method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
      body:JSON.stringify({username,password})
    });
    const user = await response.json();
    if (user) {
      handleLogin(user);
    } else {

      alert('Fel användarnamn eller lösenord');
    }
  } catch (error) { 
    console.error('Error logging in:', error);
  

    
  }
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
