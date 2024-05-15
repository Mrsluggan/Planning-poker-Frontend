import React, { useState } from 'react';

function ProjectPage({ goToHome }) {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const handleNewProjectSubmit = (e) => {
    e.preventDefault();
    if (newProjectName.trim() !== '') {
      setProjects([...projects, { name: newProjectName, tasks: [] }]);
      setNewProjectName('');
    }
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    if (newTaskName.trim() !== '' && selectedProjectIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[selectedProjectIndex].tasks.push(newTaskName);
      setProjects(updatedProjects);
      setNewTaskName('');
    }
  };

  return (
    <div>
      <h1>Project Page</h1>
      <button onClick={goToHome}>Gå tillbaka till startsidan</button>

      <h2>Skapa nytt projekt</h2>
      <form onSubmit={handleNewProjectSubmit}>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Projektnamn"
        />
        <button type="submit">Skapa projekt</button>
      </form>

      <h2>Projekt</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <button onClick={() => setSelectedProjectIndex(index)}>{project.name}</button>
            {selectedProjectIndex === index && (
              <div>
                <h3>Uppgifter</h3>
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
                    placeholder="Uppgiftsnamn"
                  />
                  <button type="submit">Lägg till uppgift</button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectPage;