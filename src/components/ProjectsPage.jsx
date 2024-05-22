import React, { useState, useEffect } from 'react';
import '../ProjectPage.css';  // Import the CSS file


function ProjectPage({ handleLogout }) {
  const [newProjectName, setNewProjectName] = useState('');
  const [findProjectId, setFindProjectId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [project, setProject] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleNewTaskSubmit = async (e) => {
    e.preventDefault();
    if (!project) {
      alert('Inget projekt valt');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/newTask/${project.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTaskName }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(`Ny task lades till: ${data.name}`);
        await fetchProjects(project.id); 
        setNewTaskName('');
      } else {
        console.log('Kunde inte lägga till task');
      }
    } catch (error) {
      console.error('Fel vid submit av task', error);
    }
  };

  const handleNewProjectSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/createProject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName: newProjectName }),
      });
      if (response.ok) {
        const data = await response.json();
        setProjectId(data.id);
        alert(`Skapade projektet: ${data.projectName}`);
        await joinProject(data.id, userId);
        setNewProjectName('');
      } else {
        console.log('Kunde inte skapa projekt');
      }
    } catch (error) {
      console.error('Fel vid skapning av projekt', error);
    }
  };

  const fetchProjects = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProject(data);
        setFindProjectId('');
      } else {
        console.log('Kunde inte hämta projekt');
      }
    } catch (error) {
      console.error('Fel vid fetch av projekt', error);
    }
  };

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
        alert(`Du gick med i projektet: ${data.projectName}`);
        await fetchProjects(projectId); 
      } else {
        console.log('Kunde inte gå med i projekt');
      }
    } catch (error) {
      console.error('Fel vid join av projekt', error);
    }
  };

  return (
    <div className="project-page">
      <h1 className="page-title">Project Sida</h1>
      <button className="logout-button" onClick={handleLogout}>Logga ut</button>

      <div className="forms-container">
        <div className="form-section">
          <h2 className="create-project-title">Skapa nytt projekt</h2>
         <form
  onSubmit={(e) => {
    e.preventDefault();
    handleNewProjectSubmit();
    $('#create-project-button').addClass('onclic', 250, validate);
  }}
  className="form-inline"
>
      <input
       type="text"
        value={newProjectName}
       onChange={(e) => setNewProjectName(e.target.value)}
        placeholder="Projektnamn"
        className="create-project-input"
      />
        <button id="create-project-button" type="submit" className="create-project-button">Skapa projekt</button>
       </form>
          {projectId && <p className="project-id">Skapat projekt ID: {projectId}</p>}
        </div>

        <div className="form-section">
          <h2 className="search-project-title">Projekt</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchProjects(findProjectId);
            }}
            className="form-inline"
          >
            <input
              type="text"
              value={findProjectId}
              onChange={(e) => setFindProjectId(e.target.value)}
              placeholder="Projekt ID"
              className="search-project-input"
            />
            <button type="submit" className="search-project-button">Hitta projekt</button>
          </form>
        </div>
      </div>


      {project && (
        <div>
          <h3>Projekt Detaljer</h3>
          <p>ID: {project.id}</p>
          <p>Namn: {project.projectName}</p>

          <form onSubmit={(e) => {
            handleNewTaskSubmit(e);
          }}>
            <input
              type='text'
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder='Tasknamn'
              />
              <button type="submit">Skapa Task</button>
          </form>

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
          <button onClick={() => joinProject(project.id, userId)}>Gå med i projekt</button>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;