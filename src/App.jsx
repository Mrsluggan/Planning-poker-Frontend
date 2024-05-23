import React, { useState, useEffect } from 'react';
import "./App.css";
import Start from './components/Start';
import Login from './components/Login';
import ProjectsPage from './components/ProjectsPage';
import Register from './components/Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProject, setShowProjects] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  // const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUsername(user.username);
    setUserId(user.id)
    localStorage.setItem('username', user.username)
    localStorage.setItem('userId', user.id)
    localStorage.setItem('isLoggedIn', true);
  };

  const handleLogout = () => {
    alert("Du loggas ut");
    setLoggedIn(false);
    setUsername('');
    setUserId('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    goToHome();
  }

  const handleRegistration = () => {
    goToHome();
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
    setShowProjects(false);
  };

  const goToProjectsPage = () => {
    setShowProjects(true);
    setShowLogin(false);
    setShowRegister(false);
  };

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setLoggedIn(true);
      goToProjectsPage();
    }
  }, []);

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
        <ProjectsPage goToProjectsPage={goToProjectsPage} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;