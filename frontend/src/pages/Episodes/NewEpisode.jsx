import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/CreateEpisode.scss'

const NewEpisode = () => {
  let { id } = useParams(); // Podcast ID
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audio, setAudio] = useState(null);
  const [duration, setDuration] = useState(null);
  //console.log("duration", duration);
  const onSubmit = async (event) => {
    event.preventDefault();
    
    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('audio', audio); // Make sure the server can handle file upload
    formData.append('duration', duration);
    console.log('client', duration)
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3002/podcasts/${id}/episodes`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
  
      // You can add additional response handling logic here
      // For example, if the server sends back the created episode data, you can use it to update the local state
  
      // Clear the form
      setTitle('');
      setDescription('');
      setAudio(null);
  
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    const audioUrl = URL.createObjectURL(file);
  
    const audio = new Audio();
    audio.src = audioUrl;
    audio.addEventListener('loadedmetadata', function() {
      setDuration(audio.duration);
    });
  
    setAudio(file);
  }

  return (
    <div className="new-episode-container">
      <h1>New Episode</h1>
      <form onSubmit={onSubmit} className="new-episode-form">
        <label>
          Title:
          <input 
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Audio File:
          <input 
            type="file"
            name="audio"
            onChange={handleAudioChange}
            required
          />
        </label>

        <button type="submit">Create New Episode</button>
      </form>
    </div>
  );
}

export default NewEpisode;
