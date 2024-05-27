import React, { useState, useEffect } from 'react';
function TimeEstimationsPage({ projectId, goToProjectsPage }) {
  const [project, setProject] = useState(null);
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    fetchProject(projectId);
  }, [projectId]);

  const fetchProject = async (id) => {
    try {
      const response = await fetch(`https://squid-app-oddmp.ondigitalocean.app/projects/${id}`, {
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
      const promises = userIds.map(userId => fetch(`https://squid-app-oddmp.ondigitalocean.app/user/${userId}`));
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
      <h1>Tidsuppskattningar</h1>
      {project ? (
        <div>
          <h2>{project.projectName}</h2>
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            {project.tasks && project.tasks.length > 0 ? (
              project.tasks.map((task, index) => (
                <div key={index}>
                  <li>
                    <h4>Uppgift:</h4>
                    <p>{task.name}</p>
                    <p>Total tid: {formatTime(task.totalTime)}</p>
                    <h4 style={{ margin: '0.5rem 0', paddingLeft: '0' }}>Tidsuppskattningar:</h4>
                    <ul style={{ paddingLeft: '0', listStyleType: 'none', marginLeft: '0rem' }}>
                      {task.userTimeEstimations && Object.entries(task.userTimeEstimations).length > 0 ? (
                        Object.entries(task.userTimeEstimations).map(([userId, time], idx) => (
                          <p>{usernames[userId]}: {time} Timmar</p>
                        ))
                      ) : (
                        <li>Inga tidsuppskattningar</li>
                      )}
                    </ul>
                  </li>
                  {index < project.tasks.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <li>Inga uppgifter</li>
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