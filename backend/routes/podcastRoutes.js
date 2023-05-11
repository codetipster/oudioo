// Import your required dependencies
const express = require('express');
const { getAllPodcasts,
    createPodcast,
    getPodcastById
} = require('../controllers/podcastController');
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

// Export the router
module.exports = router;
