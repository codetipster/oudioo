import React, { useEffect, useState } from "react";
import PodcastCard from "./PodcastCard";
import "../../styles/Podcastlist.scss";

const podcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/podcasts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // assuming the server requires an authentication token
      },
    })
      .then((response) => response.json())
      .then((data) => setPodcasts(data.podcasts))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="card-container">
      {podcasts.map((podcast) => (
        //console.log('podcastList', podcast),
        //<div>
        <PodcastCard key={podcast.id} {...podcast} />
        //</div>
      ))}
    </div>
  );
};

export default podcastList;
