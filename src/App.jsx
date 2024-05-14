import React, { useState } from 'react'; 

import './App.css';
import StartMenu from './components/StartMenu';
import Login from './components/Login';
import Register from './components/Register';
import Start from './components/Start';
import Projects from './components/Projects';

function App() {
  const [page, setPage] = useState("start"); 

  return (
    <>
      <h1>Planningpoker</h1>
      <StartMenu setPage={setPage} />

      {
        {
          "register": <Register />,
          "login": <Login />,
          "projects": <Projects />,
        }[page] || <Start />
      }
    </>
  );
}

export default App;
