import React from 'react'
import '../../styles/PodcastCard.scss'

const Podcast = ({ title, description, cover_image_url
  , user_name }) => {
  console.log('podcastCard',cover_image_url, user_name, title, description)
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <h4>By: {user_name}</h4>
      <div >
      <img src={cover_image_url} alt={title} className='img-style'/>
      </div>
    </div>
  )
}

export default Podcast