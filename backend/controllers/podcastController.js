const { Podcast, Episode, User } = require('../models');
// In any file where you need to use S3



// Function to get all podcasts with pagination and filtering options
async function getAllPodcasts(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10; // Number of podcasts per page
    const page = parseInt(req.query.page) || 1; // Current page number

    const options = {
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']], // Order by 'createdAt' in descending order (newest first)
      include: [{ model: User, as: 'user', attributes: ['username'] }] // Using the 'user' alias
    };

    const { count, rows: podcasts } = await Podcast.findAndCountAll(options);
    
    
    // Transform podcasts to include the user's username
    const transformedPodcasts = podcasts.map((podcast) => {
      const podcastPlain = podcast.get({ plain: true });
      return {
        ...podcastPlain,
        user_name: podcastPlain.user.username,
      };
    });

    res.status(200).json({
      totalPodcasts: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      podcasts: transformedPodcasts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching podcasts' });
  }
}


// Function to add a new podcast by an authenticated user.
async function createPodcast(req, res) {
    try {
      const { title, description } = req.body;
  
      // Get the user ID from the request. This assumes you have some kind of authentication in place.
      const userId = req.user.id;
      // Get the  file url from the request- this is the url of the image uploaded to S3
      const cover_image_url = req.file.location;
      // Create the podcast
      const newPodcast = await Podcast.create({
        title,
        description,
        cover_image_url,
        user_id: userId,
      });
  
      res.status(201).json(newPodcast);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the podcast', error: error.message });
    }
  }


async function getPodcastById(req, res){
    try {
        const podcast = await Podcast.findByPk(req.params.id);
        if (!podcast) {
            return res.status(404).json({ error: 'Podcast not found'});
        }
        res.status(200).json(podcast);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while fetching the podcast', error: error.message})
    }
}


async function getPodcastEpisodes(req, res){
  try {
      const podcast = await Podcast.findByPk(req.params.id, {
        include: [
          {
            model: Episode,
            as: 'episodes',
          },
        ],
      });
      if (!podcast) {
          return res.status(404).json({ error: 'Podcast not found'});
      }
      res.status(200).json(podcast.episodes);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred while fetching the podcast episodes', error: error.message})
  }
}

  

module.exports = {
  getAllPodcasts,
  createPodcast,
  getPodcastById,
  getPodcastEpisodes,
};
