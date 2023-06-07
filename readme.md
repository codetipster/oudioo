# Oudioo player




## Backend Server
API structure:
---
Here's a brief summary of each endpoint:

Podcasts:
GET /podcasts: Get all podcasts.
POST /podcasts: Create a new podcast.
GET /podcasts/{id}: Get a specific podcast by id.

Episodes:
GET /podcasts/{podcastId}/episodes: Get all episodes for a specific podcast.
POST /podcasts/{podcastId}/episodes: Create a new episode for a specific podcast.

Comments:
GET /podcasts/{podcastId}/episodes/{episodeId}/comments: Get all comments for a specific episode.
POST /podcasts/{podcastId}/episodes/{episodeId}/comments: Create a new comment for a specific episode.

Users:
POST /users/register: Register a new user.
POST /users/login: Login a user.
POST /users/logout: Logout a user.
GET /users/verify-email: Verify a user's email.
GET /users: Get all registered users.
POST /users/reset-password: Send a password reset email to a user.
POST /users/confirm-reset-password: Confirm and reset a user's password.
GET /users/{id}: Get a specific user by id.
GET /users/{userId}/podcasts: Get all podcasts by a specific user.










express
nodemon
jest
node
typescript
pg
eslint
sequelize, npm install --save-dev sequelize-cli