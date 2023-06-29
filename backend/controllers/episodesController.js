const { URL } = require('url'); // Built-in Node.js package for parsing URLs
const { Episode, Podcast, Comment } = require('../models'); // Make sure to adjust the path according to your project structure
const { getPresignedUrl } = require('../services/s3Service');

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
    const {
      title, description, duration, release_date,
    } = req.body; // Get the title, description, duration and release_date from the request body
    const audio_url = req.file.location;
    const { podcastId } = req.params;
    const userId = req.user.id; // Get the user ID from the request object
    console.log('server', duration);
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
      duration: Math.round(duration),
      release_date: new Date(),
      podcast_id: podcastId,
    });

    return res.status(201).json(episode);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while creating the episode' });
  }
};

// Function to get all comments for a particular episode
exports.getEpisodeComments = async (req, res) => {
  try {
    const episodeId = parseInt(req.params.episodeId, 10);
    const episode = await Episode.findByPk(episodeId, {
      include: [
        {
          model: Comment,
          as: 'comments', // Assuming 'comments' is the association alias you have set in your models
        },
      ],
    });

    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    res.status(200).json(episode.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the comments' });
  }
};

exports.createEpisodeComment = async (req, res) => {
  const { content } = req.body;
  const { episodeId } = req.params;
  const { id: userId } = req.user;
  // const { token } = req.query;
  // In your createEpisodeComment function
  // console.log('USER_ID FROM EPISODE CONTROLLER',userId);

  // Check if content is not empty
  if (!content || content.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Content is required',
    });
  }

  try {
    // Check if the episode exists
    const episode = await Episode.findByPk(episodeId);
    if (!episode) {
      return res.status(404).json({
        success: false,
        message: 'Episode not found',
      });
    }

    const newComment = await Comment.create({
      content,
      episode_id: episodeId,
      user_id: userId,
      created_at: new Date(),
    });

    res.status(201).json({
      success: true,
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error,
    });
  }
};
