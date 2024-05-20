import React, { useState } from 'react';

function ProjectPage({handleLogout }) {
  const [newProjectName, setNewProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

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
            console.log(data.id)
            fetchProjects();
          } else {
            console.log("Kunde inte skapa project")
          }
    } catch (error) {
      console.error("Fel vid skapning av project")
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch (`http://localhost:8080/projects/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
        if(response.ok){
          const data= await response.json();
          setProjects(data);
        } else {
          console.log("Kunde inte hämta project")
        }
    } catch (error) {
      console.error("Fel vid fetch av project")
    }
  }

  return (
    <div>
      <h1>Project Page</h1>
      {/* <button onClick={handleLogout}>Logga ut</button> */}

      <h2>Create new project</h2>
      <form onSubmit={ (e) => {
        e.preventDefault();
        handleNewProjectSubmit();
      }}>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Project name"
        />
        <button type="submit">Create project</button>
      </form>

      <h2>Projects</h2>
      {/* <ul>
        {projects?.map((project, index) => (
          <li key={index}>
            <button onClick={() => setSelectedProjectIndex(index)}>{project.name}</button>
            {selectedProjectIndex === index && (
              <div>
                <h3>Tasks</h3>
                <ul>
                  {project.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
                <form onSubmit={handleNewTaskSubmit}>
                  <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Task name"
                  />
                  <button type="submit">Add task</button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ProjectPage;