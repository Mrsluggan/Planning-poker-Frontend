import React, { useState, useEffect } from 'react';

function TimeEstimationsPage({ projectId, handleBack }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchProject(projectId);
  }, [projectId]);

  const fetchProject = async (id) => {
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
      } else {
        console.log('Kunde inte hämta projekt');
      }
    } catch (error) {
      console.error('Fel vid fetch av projekt', error);
    }
  };

  return (
    <div className="time-estimations-page">
      <button onClick={handleBack}>Tillbaka</button>
      <h1>Tidsuppskattningar för Projekt</h1>
      {project ? (
        <div>
          <h2>{project.projectName}</h2>
          <h3>Tasks:</h3>
          <ul>
            {project.tasks && project.tasks.length > 0 ? (
              project.tasks.map((task, index) => (
                <li key={index}>
                  <p>Task: {task.name}</p>
                  <p>Tidsuppskattningar:</p>
                  <ul>
                    {task.userTimeEstimations && Object.entries(task.userTimeEstimations).length > 0 ? (
                      Object.entries(task.userTimeEstimations).map(([userId, time], idx) => (
                        <li key={idx}>{userId}: {time} Timmar</li>
                      ))
                    ) : (
                      <li>Inga tidsuppskattningar</li>
                    )}
                  </ul>
                </li>
              ))
            ) : (
              <li>Inga tasks</li>
            )}
          </ul>
        </div>
      ) : (
        <p>Laddar...</p>
      )}
    </div>
  );
}

export default TimeEstimationsPage;