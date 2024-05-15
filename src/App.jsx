import React, { useState } from 'react';
import Home from './Home';
import LoginForm from './LoginForm';
import ProjectPage from './ProjectPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProject, setShowProject] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const goToLogin = () => {
    setShowLogin(true);
    setShowProject(false);
  };

  const goToHome = () => {
    setShowLogin(false);
    setShowProject(false);
  };

  const goToProjectPage = () => {
    setShowProject(true);
    setShowLogin(false);
  };

  return (
    <div>
      {!loggedIn ? (
        showLogin ? (
          <LoginForm handleLogin={handleLogin} goToHome={goToHome} />
        ) : (
          <Home goToLogin={goToLogin} goToProjectPage={goToProjectPage} />
        )
      ) : (
        showProject ? (
          <ProjectPage goToHome={goToHome} />
        ) : (
          <div>
            <h1>Du är inloggad!</h1>
            <button onClick={goToHome}>Deta vore vara logga ut</button>
            <button onClick={goToProjectPage}>Gå till Project Page</button>
          </div>
        )
      )}
    </div>
  );
}

export default App;