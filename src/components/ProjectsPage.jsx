import React, { useState, useEffect } from 'react';

function ProjectPage({handleLogout }) {
  const [newProjectName, setNewProjectName] = useState('');
  const [findProjectId, setFindProjectId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [project, setProject] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleNewTaskSubmit = (e) => {

    
  };

  const handleNewProjectSubmit = async () => {
    try{
          const response = await fetch(`http://localhost:8080/createProject`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({projectName: newProjectName}),
          });
          if (response.ok) {
            const data = await response.json();
            setProjectId(data.id)
            alert(`Skapade projectet: ${data.projectName}`)
            await joinProject(data.id, userId);
          } else {
            console.log("Kunde inte skapa project")
          }
    } catch (error) {
      console.error("Fel vid skapning av project")
    }
  };

  

  const fetchProjects = async () => {
    try {
      const response = await fetch (`http://localhost:8080/projects/${findProjectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
        if(response.ok){
          const data= await response.json();
          setProject(data);
        } else {
          console.log("Kunde inte hämta project")
        }
    } catch (error) {
      console.error("Fel vid fetch av project")
    }
  }

  const joinProject = async (projectId, userId) => {
      try {
        const response = await fetch(`http://localhost:8080/joinProject/${projectId}/user/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          alert(`Användare ${userId} gick med i projektet: ${data.projectName}`);
        } else {
          console.log('Kunde inte gå med i projekt');
        }
      } catch (error) {
        console.error('Fel vid join av projekt', error);
      }
    };

  return (
    <div>
      <h1>Project Sida</h1>
      <button onClick={handleLogout}>Logga ut</button>

      <h2>Skapa nytt projekt</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNewProjectSubmit();
        }}
      >
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Projektnamn"
        />
        <button type="submit">Skapa projekt</button>
      </form>
      {projectId && <p>Skapat projekt ID: {projectId}</p>} 

      <h2>Projekt</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchProjects();
        }}
      >
        <input
          type="text"
          value={findProjectId}
          onChange={(e) => setFindProjectId(e.target.value)}
          placeholder="Projekt ID"
        />
        <button type="submit">Hitta projekt</button>
      </form>

      {project && (
        <div>
          <h3>Projekt Detaljer</h3>
          <p>ID: {project.id}</p>
          <p>Namn: {project.projectName}</p>
          <h4>Issues:</h4>
          <ul>
            {project.tasks && project.tasks.length > 0 ? (
              project.tasks.map((task, index) => <li key={index}>{task.name}</li>)
            ) : (
              <li>Inga issues</li>
            )}
          </ul>
          <h4>Användare:</h4>
          <ul>
            {project.users && project.users.length > 0 ? (
              project.users.map((user, index) => <li key={index}>{user.username}</li>)
            ) : (
              <li>Inga användare</li>
            )}
          </ul>
          <button onClick={joinProject}>Gå med i projekt</button>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;