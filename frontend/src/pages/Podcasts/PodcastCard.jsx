import React from 'react'

const Podcast = ({ title, description, cover }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={cover} alt={title} />
    </div>
  )
}

export default Podcast