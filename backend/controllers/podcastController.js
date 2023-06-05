const { Podcast, Episode } = require('../models');

// Function to get all podcasts with pagination and filtering options
async function getAllPodcasts(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10; // Number of podcasts per page
    const page = parseInt(req.query.page) || 1; // Current page number

    const options = {
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']], // Order by 'createdAt' in descending order (newest first)
    };

    const { count, rows: podcasts } = await Podcast.findAndCountAll(options);

    res.status(200).json({
      totalPodcasts: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      podcasts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching podcasts' });
  }
}


// Function to add a new podcast by an authenticated user.
async function createPodcast(req, res) {
    try {
      const { title, description, cover_image_url } = req.body;
  
      // Get the user ID from the request. This assumes you have some kind of authentication in place.
      const userId = req.user.id;
  
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
