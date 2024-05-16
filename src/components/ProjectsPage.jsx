import React, { useState } from 'react';

function ProjectPage({ projects, goBack }) {
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const handleNewProjectSubmit = (e) => {
    e.preventDefault();
    if (Array.isArray(projects) && newProjectName.trim() !== '') {
      const updatedProjects = [...projects, { name: newProjectName, tasks: [] }];
      setNewProjectName('');
      setProjects(updatedProjects);
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
      <button onClick={goBack}>Go back to home</button>

      <h2>Create new project</h2>
      <form onSubmit={handleNewProjectSubmit}>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Project name"
        />
        <button type="submit">Create project</button>
      </form>

      <h2>Projects</h2>
      <ul>
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
      </ul>
    </div>
  );
}

export default ProjectPage;