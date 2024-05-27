import React, { useState, useEffect } from 'react';
import '../ProjectPage.css';

function ProjectPage({ handleLogout, goToTimeEstimationsPage }) {
  const [newProjectName, setNewProjectName] = useState('');
  const [findProjectId, setFindProjectId] = useState(localStorage.getItem('projectId') || '');
  const [projectId, setProjectId] = useState(localStorage.getItem('projectId') || '');
  const [project, setProject] = useState(null);
  const [joinedProjects, setJoinedProjects] = useState([])
  const [newTaskName, setNewTaskName] = useState('');
  const [userId, setUserId] = useState('');
  const [isMember, setIsMember] = useState(false);
  const [timeEstimations, setTimeEstimations] = useState('');
  const username = localStorage.getItem('username') || 'Gäst';

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchProjectsById(storedUserId);

    }
    if (findProjectId) {
      fetchProjects(findProjectId);

    }
  }, []);

  useEffect(() => {
    if (project) {
      const userIsMember = project.users.some(user => user.id === userId);
      setIsMember(userIsMember);
    }
  }, [project, userId]);

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
        alert(`Ny uppgift lades till: ${data.name}`);
        await fetchProjects(project.id);
        setNewTaskName('');
      } else {
        console.log('Kunde inte lägga till uppgift');
      }
    } catch (error) {
      console.error('Fel vid submit av uppgift', error);
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
        const userIsMember = data.users.some(user => user.id === userId);
        setIsMember(userIsMember);
      } else {
        console.log('Kunde inte hämta projekt');
      }
    } catch (error) {
      console.error('Fel vid fetch av projekt', error);
    }
  };
  const fetchProjectsById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/projects/${userId}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJoinedProjects(data)
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
        setIsMember(true);
        await fetchProjects(projectId);
      } else {
        console.log('Kunde inte gå med i projekt');
      }
    } catch (error) {
      console.error('Fel vid join av projekt', error);
    }
  };

  const leaveProject = async (projectId, userId) => {
    try {
      const response = await fetch(`http://localhost:8080/leaveProject/${projectId}/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Du lämnade projektet: ${data.projectName}`);
        setIsMember(false);
        await fetchProjects(projectId);
      } else {
        console.log('Kunde inte lämna projekt');
      }
    } catch (error) {
      console.error('Fel vid lämning av projekt', error);
    }
  };

  const handleTimeEstimationChange = (taskId, value) => {
    setTimeEstimations((prev) => ({
      ...prev,
      [taskId]: value,
    }));
  };

  const handleTimeEstimationSubmit = async (taskId) => {
    const timeEstimation = timeEstimations[taskId];
    try {
      const response = await fetch(`http://localhost:8080/timeEstimation/${taskId}/${userId}/${timeEstimation}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Tidsuppskattning sparad');
        await fetchProjects(project.id);
        setTimeEstimations((prev) => ({
          ...prev,
          [taskId]: '',
        }));
      } else if (response.status === 409) {
        alert('Du har redan sparat tidsuppskattning');
      }
    } catch (error) {
      console.error('Fel vid sparande av tidsuppskattning', error);
    }
  };

  const handleTimer = async (taskId) => {
    const response = await fetch(`http://localhost:8080/manageTaskTimer/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log(taskId, 'timerfunktion');
      await fetchProjects(project.id);
    };
  }

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/removeTask/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Uppgift borttagen');
        await fetchProjects(project.id);
      } else {
        console.log('Kunde inte ta bort uppgift');
      }
    } catch (error) {
      console.error('Fel vid borttagning av uppgift', error);
    }
  };

  return (
     <>
    <div className="top-left-box">
    <h3>Användare: {username}</h3>
    <button className="logout-button" onClick={handleLogout}>Logga ut</button>
  </div>
   
      <div>
        {project
          ? <div><div style={{ backgroundColor: "white", padding: "10px", color: "black", width: "100%", height: "100%" }}>

            {project && (
              <>
                <div style={{ color: "black" }}>
                  <h1>{project.projectName}</h1>
                  <p>Projekt ID: {project.id}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {isMember ? (
                      <button className="leave-project-button" onClick={() => leaveProject(project.id, userId)}>Gå ur projekt</button>
                    ) : (
                      <button className="join-project-button" onClick={() => joinProject(project.id, userId)}>Gå med i projekt</button>
                    )}
                    <button className="back-button" onClick={() => setProject(null)}>Tillbaka</button>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", padding: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontFamily: "Arial, sans-serif" }}>
                    <h3>Skapa uppgift:</h3>
                    {isMember && (
                      <form onSubmit={handleNewTaskSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <input
                          type="text"
                          value={newTaskName}
                          onChange={(e) => setNewTaskName(e.target.value)}
                          placeholder="Namn på uppgift"
                          style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
                        />
                        <button className="button" type="submit" style={{ padding: "0.5rem 1rem", fontSize: "1rem", borderRadius: "4px", background: "#1453b8", color: "white", border: "none" }}>
                          Skapa uppgift
                        </button>
                      </form>
                    )}

                    <h4>Uppgifter:</h4>
                    {isMember ? (
                      project.tasks && project.tasks.length > 0 ? (
                        <ul style={{ listStyleType: "none" }}>
                          {project.tasks.map((task, index) => (
                            <li key={index} style={{ marginBottom: "1rem" }}>
                              <div style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>{task.name}<button className="remove-task-button" onClick={() => removeTask(task.id)}>[x]</button></div>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleTimeEstimationSubmit(task.id);
                                }}
                                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
                              >
                                <select
                                  value={timeEstimations[task.id] || ''}
                                  onChange={(e) => handleTimeEstimationChange(task.id, e.target.value)}
                                  style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
                                >
                                  <option value="" disabled>Välj tid</option>
                                  {[...Array(16).keys()].map((i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                  ))}
                                </select>
                                <button type="submit" style={{ padding: "0.5rem 1rem", fontSize: "1rem", borderRadius: "4px", background: "#1453b8", color: "white", border: "none" }}>
                                  Uppskatta tid
                                </button>
                              </form>
                              <button
                                className={task.timerRunning ? "stopTimerButton" : "startTimerButton"}
                                onClick={() => handleTimer(task.id)}
                                style={{
                                  padding: "0.5rem 1rem",
                                  fontSize: "1rem",
                                  borderRadius: "4px",
                                  background: task.timerRunning ? "#ff0000" : "#008000",
                                  color: "white",
                                  border: "none",
                                  marginTop: "0.5rem"
                                }}
                              >
                                {task.timerRunning ? "Stoppa timer" : "Starta timer"}
                              </button>

                            </li>
                          ))}
                        </ul>
                      ) : (
                        <li>Inga uppgifter</li>
                      )
                    ) : (
                      project.tasks && project.tasks.length > 0 ? (
                        <ul style={{ listStyleType: "none", padding: "0" }}>
                          {project.tasks.map((task, index) => (
                            <li key={index} style={{ marginBottom: "1rem" }}>
                              {task.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <li>Inga uppgifter</li>
                      )
                    )}
                  </div>

                  <div style={{}}>
                    <h4>Användare:</h4>
                    <ul style={{ listStyleType: "none", padding: "0" }}>
                      {project.users && project.users.length > 0 ? (
                        project.users.map((user, index) => <li key={index}>{user.username}</li>)
                      ) : (
                        <li>Inga användare</li>
                      )}
                    </ul>
                    <button className='create-project-button' onClick={() => goToTimeEstimationsPage(project.id)}>Visa tidsuppskattningar</button>
                  </div>
                </div>
              </>
            )}
          </div> </div>
          : <div> <header>
         
          </header>
            <div className='project-page' style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", 
              gridTemplateRows: "auto auto",  
              gap: "20px",
              padding: "20px"
            }}>

              <div className="form-section">
                
                <h2>Skapa projekt</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNewProjectSubmit();
                    $('#create-project-button').addClass('onclick', 250, validate);
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
                  <button id="create-project-button" type="submit" className="create-project-button">Skapa projekt</button><br />
                </form>
                {projectId && <p className="project-id">Skapat projekt ID: {projectId}</p>}
              </div>

              <div className="form-section">
                <h2 className="search-project-title">Hitta projekt</h2>
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
                  <button type="submit" className="find-project-button">Hitta projekt</button>
                </form>
              </div>



              <div style={{ gridColumn: "1 / 3", gridRow: "2 / 3" }}>
                <h2>Anslutna projekt</h2>
                {joinedProjects.map((project) => (
                  <div key={project.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{project.projectName}</p>
                    <button style={{
                      marginLeft: '10px',
                      fontSize: '12px',
                      height: '30px',
                      backgroundColor: 'green',
                    }} onClick={() => fetchProjects(project.id)}>Öppna</button>
                  </div>
                ))}
              </div>

            </div>
          </div>
        }
      </div>



    </>
  );

}
export default ProjectPage;