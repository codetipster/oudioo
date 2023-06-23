import React, {useEffect, useState} from 'react'
import PodcastCard  from './PodcastCard'; 



const podcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3002/podcasts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // assuming the server requires an authentication token
      },
    })
    .then(response => response.json())
    .then(data => setPodcasts(data.podcasts))
    .catch(error => console.error('Error:', error));
  }, []);
  
  
  
  return (
    <div>
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} {...podcast} />
      ))}
    </div>
  )
}

export default podcastList