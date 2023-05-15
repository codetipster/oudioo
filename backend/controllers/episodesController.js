const { Episode, Podcast } = require('../models');  // Make sure to adjust the path according to your project structure

exports.getEpisodesByPodcast = async (req, res) => {
  try {
    const podcastId = parseInt(req.params.podcastId, 10);
    const episodes = await Episode.findAll({ where: { podcast_id: podcastId } });

    if (!episodes || episodes.length === 0) {
      return res.status(404).json({ message: 'No episodes found for this podcast' });
    }

    res.status(200).json(episodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the episodes' });
  }
};


exports.createEpisode = async (req, res) => {
    try {
      const { title, description, audio_url, duration, release_date } = req.body; // Get the title, description, audio_url, duration and release_date from the request body
      const podcastId = req.params.podcastId; // Get the podcast ID from the request parameters
      const userId = req.user.id; // Get the user ID from the request. This assumes you have some kind of authentication in place.
  
      // Check if the podcast exists and belongs to the user
      const podcast = await Podcast.findOne({
        where: { id: podcastId, user_id: userId },
      });
  
      if (!podcast) {
        return res.status(404).json({
          message: "Podcast not found or you're not authorized to add episodes to this podcast",
        });
      }
  
      // Create the episode
      const episode = await Episode.create({
        title,
        description,
        audio_url,
        duration,
        release_date,
        podcast_id: podcastId,
      });
  
      return res.status(201).json(episode);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while creating the episode' });
      }
    };  