


import React, { useState } from 'react';
import Start from './components/Start';
import Login from './components/Login';
import ProjectsPage from './components/ProjectsPage';
import Register from './components/Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProject, setShowProjects] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => { 
    setLoggedIn(true);
    setUsername(user.username); 
  };

  const handleRegistration = () => {
    
  };



  const goToLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowProjects(false);
  };

  const goToRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowProjects(false);
  };

  const goToHome = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowProject(false);
  };

  const goToProjectsPage = () => {
    setShowProjects(true);
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
   <div>
      {!loggedIn ? (
        showLogin ? (
          <Login handleLogin={handleLogin} goToHome={goToHome} />
        ) : showRegister ? (
          <Register handleRegistration={handleRegistration} goToHome={goToHome} />
        ) : (
          <Start goToLogin={goToLogin} goToRegister={goToRegister} />
        )
      ) : (
        showProject ? (
          <ProjectsPage goToProjectsPage={goToProjectsPage} goToHome={goToHome} />
        ) : (
          <div>
            <h1>Välkommen {username && username}</h1>
             
            <button onClick={goToHome}>Gå till hem</button>
            <button onClick={goToProjectsPage}>Gå till Project Page</button>
          </div>
        )
      )}
    </div>
  );
}

export default App;

