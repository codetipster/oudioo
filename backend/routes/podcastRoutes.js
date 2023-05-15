// Import your required dependencies
const express = require('express');
const { getAllPodcasts,
    createPodcast,
    getPodcastById
} = require('../controllers/podcastController');
const { getEpisodesByPodcast, createEpisode } = require('../controllers/episodesController');
const authMiddleware = require('../middlewares/authMiddleware');



const router = express.Router();
// Get all podcasts
/**
 * @swagger
 * /podcasts:
 *   get:
 *     summary: Retrieve a list of podcasts
 *     tags: [Podcasts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to fetch (starts from 1)
 *     responses:
 *       200:
 *         description: A list of podcasts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPodcasts:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 podcasts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Podcast'
 *       500:
 *         description: An error occurred while fetching the podcasts
 */
router.get('/', getAllPodcasts);

// Create a new podcast
/**
 * @swagger
 * /podcasts:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new podcast
 *     tags: [Podcasts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               cover_image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: The podcast was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Podcast'
 *       500:
 *         description: An error occurred while creating the podcast
 */
router.post('/', authMiddleware, createPodcast);

// Get a podcast by ID
/**
 * @swagger
 * /podcasts/{id}:
 *   get:
 *     summary: Retrieve a specific podcast
 *     tags: [Podcasts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the podcast to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A specific podcast
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Podcast'
 *       404:
 *         description: Podcast not found
 *       500:
 *         description: An error occurred while fetching the podcast
 */
router.get('/:id', getPodcastById);

/**
 * @swagger
 * /podcasts/{podcastId}/episodes:
 *  get:
 *    tags: [Episodes]
 *    description: Get episodes of a specific podcast
 *    parameters:
 *      - in: path
 *        name: podcastId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: Numeric ID of the podcast to get episodes for
 *    responses:
 *      200:
 *        description: A list of episodes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  title:
 *                    type: string
 *                  description:
 *                    type: string
 *                  audio_url:
 *                    type: string
 *                  duration:
 *                    type: integer
 *                  release_date:
 *                    type: string
 *                  podcast_id:
 *                    type: integer
 *      404:
 *        description: Podcast not found
 *      500:
 *        description: Internal server error
 */
router.get('/:podcastId/episodes', getEpisodesByPodcast);

/**
 * @swagger
 * /podcasts/{podcastId}/episodes:
 *   post:
 *     summary: Create a new episode for a specific podcast
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: podcastId
 *         required: true
 *         description: Numeric ID of the podcast to create an episode for
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               audio_url:
 *                 type: string
 *               duration:
 *                 type: integer
 *               release_date:
 *                 type: string
 *                 format: date-time
 *             example:
 *               title: Episode 1
 *               description: This is the first episode
 *               audio_url: http://example.com/audio.mp3
 *               duration: 60
 *               release_date: 2023-05-14T00:00:00Z
 *     responses:
 *       201:
 *         description: The episode was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Episode'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Podcast not found or user not authorized
 *       500:
 *         description: An error occurred while creating the episode
 */

router.post('/:podcastId/episodes', authMiddleware, createEpisode);


// Export the router
module.exports = router;
