import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa"; // import the play icon
import { FaPauseCircle } from "react-icons/fa"; // import the pause icon
import "../../styles/detail.scss";
import { useParams, useNavigate } from "react-router-dom";
import Oudioo from "../../components/Oudioo";

const PodcastDetail = () => {
  let { id } = useParams();
  const [podcastDetail, setPodcastDetail] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  //const [creator, setCreator] = useState();
  const [currentEpisodeUrl, setCurrentEpisodeUrl] = useState(null);
  const currentUserId = Number(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/podcasts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data from /podcasts:", data);
        setPodcastDetail(data); // change from data.podcast to data
      })
      .catch((error) => console.error("Error:", error));

    fetch(`${process.env.REACT_APP_BACKEND_URL}/podcasts/${id}/episodes`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data);
        console.log("Received data from /episodes:", data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!podcastDetail) {
    return null;
  }

  const handlePlay = (episodeId, episodeUrl) => {
    console.log(
      `Play button clicked for episode with url: ${episodeUrl}, and id: ${episodeId}`
    );
    setIsPlaying(true);
    setCurrentEpisodeUrl(episodeUrl);
  };

  const handlePause = (episodeId) => {
    console.log(`Play button clicked for episode with id: ${episodeId}`);
    setIsPlaying(false);
  };

  const handleEpisodeCreation = () => {
    navigate(`/podcasts/${id}/episodes/new`);
  };

  const src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  return (
    <div className="podcast-detail-container">
      <h1>{podcastDetail.title}</h1>
      <div id="billboardWrapper">
        <div id="billboard" />
      </div>
      <img src={podcastDetail.cover_image_url} alt={podcastDetail.title} />
      <p>{podcastDetail.description}</p>
      <h3>Episodes:</h3>
      <div className="episode-list">
        {episodes.length > 0 ? (
          episodes.map((episode, index) => (
            <div key={index} className="episode">
              <div className="episode-content">
                <div>
                  <h4>{episode.title}</h4>
                  <p>{episode.description}</p>
                </div>
                {isPlaying ? (
                  <FaPauseCircle
                    className="play-icon"
                    onClick={() => handlePause(episode.id, episode.audio_url)}
                  />
                ) : (
                  <FaPlayCircle
                    className="play-icon"
                    onClick={() => handlePlay(episode.id, episode.audio_url)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No episodes available for this podcast.</p>
        )}

        {podcastDetail.user_id === currentUserId && (
          <div className="button-container">
            <button onClick={handleEpisodeCreation}>Create new episode</button>
            <button>Delete podcast</button>
          </div>
        )}
      </div>

      {currentEpisodeUrl && (
        <div className={`audio-player-container ${isPlaying ? "active" : ""}`}>
          <Oudioo src={currentEpisodeUrl} />
        </div>
      )}
    </div>
  );
};

export default PodcastDetail;
