import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PodcastCard.scss";

const PodcastCard = ({
  id,
  title,
  description,
  cover_image_url,
  user_name,
}) => {
  return (
    <Link to={`/podcasts/${id}`} className="podcast-card-link">
      <div className="podcast-card">
        <h2>{title}</h2>
        <div>
          <img src={cover_image_url} alt={title} className="img-style" />
        </div>
        <p>{description}</p>
        <h4>By: {user_name}</h4>
      </div>
    </Link>
  );
};

export default PodcastCard;
