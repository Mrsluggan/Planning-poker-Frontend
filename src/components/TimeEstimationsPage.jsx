import React, { useState, useEffect } from 'react';
function TimeEstimationsPage({ projectId, goToProjectsPage }) {
  const [project, setProject] = useState(null);
  const [usernames, setUsernames] = useState({});

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
        fetchUsernames(data);
      } else {
        console.log('Kunde inte hämta projekt');
      }
    } catch (error) {
      console.error('Fel vid fetch av projekt', error);
    }
  };

  const handleBack = () => {
    console.log("Back button clicked");
    goToProjectsPage();
  };


  const fetchUsernames = async (projectData) => {
    try {
      const userIds = projectData.users.map(user => user.id);
      const promises = userIds.map(userId => fetch(`http://localhost:8080/user/${userId}`));
      const responses = await Promise.all(promises);
      const userData = await Promise.all(responses.map(response => response.json()));
      const usernameMap = {};
      userData.forEach(user => {
        usernameMap[user.id] = user.username;
      });
      setUsernames(usernameMap);
    } catch (error) {
      console.error('Fel vid fetch av användarnamn', error);
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0 && remainingMinutes === 0) {
      return '0 timmar';
    } else if (hours === 0) {
      return `0 timmar ${remainingMinutes} minuter`;
    } else if (remainingMinutes === 0) {
      return `${hours} timmar`;
    } else {
      return `${hours} timmar ${remainingMinutes} minuter`;
    }
  };

  return (
    <div className="time-estimations-page">
            <button className="button" onClick={handleBack}>Tillbaka</button>
      <h1>Tidsuppskattningar för Projekt</h1>
      {project ? (
        <div>
          <h2>{project.projectName}</h2>
          <h3>Uppgifter:</h3>
          <ul>
            {project.tasks && project.tasks.length > 0 ? (
              project.tasks.map((task, index) => (
                <li key={index}>
                  <p>Uppgift: {task.name}</p>
                  <p>Tidsuppskattningar:</p>
                  <ul>
                    {task.userTimeEstimations && Object.entries(task.userTimeEstimations).length > 0 ? (
                      Object.entries(task.userTimeEstimations).map(([userId, time], idx) => (
                        <li key={idx}>{usernames[userId]}: {time} Timmar</li>
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
          <h3>Totala tider för Uppgifter:</h3>
          <ul>
            {project.tasks && project.tasks.length > 0 ? (
              project.tasks.map((task, index) => (
                <li key={index}>
                  <p>Uppgift: {task.name}</p>
                  <p>Total tid: {formatTime(task.totalTime)}</p>
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