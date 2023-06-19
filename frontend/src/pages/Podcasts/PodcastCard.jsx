import React from 'react'

const Podcast = ({ title, description, cover, user_name }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <h4>By: {user_name}</h4>
      <img src={cover} alt={title} />
    </div>
  )
}

export default Podcast