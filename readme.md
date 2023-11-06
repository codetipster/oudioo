# Oudioo

## What is it ? 
Oudioo is a digital podcast streaming platform that enables users register and sign into their account, and manage their choice podcasts.


# Table of Contents
* [Project Structure](#project-structure)
* [Getting Started/Overview](#getting-started)
    * [Project Links](#project-links)
    * [Prerequisites](#prerequisites)
* [Running the Project](#running-the-project)
* [Technologies/Frameworks Used](#technologiesframeworks-used)


# Project Structure
Oudioo is a React based application that is hosted  and servered via Railway.
It communicates with a serverless backend via an API that is entirely built with Node.js

If you have already cloned the project to your local machine, the folder structure looks like this:


### Folder Structure
This project contains two sub folders(frontend and backend), and its structured as shown:
<pre>
 backend/
├── controllers/
│   ├── userController.js
│   ├── podcastController.js
│   ├── episodeController.js
│   ├── commentController.js
│   └── subscriptionController.js
├── middleware/
│   ├── authenticate.js
│   ├── authorized.js
│   ├── verifyAccount.js
│   └── (other middleware files)
├── models/
│   ├── user.js
│   ├── podcast.js
│   ├── episode.js
│   ├── comment.js
│   └── subscription.js
├── routes/
│   ├── userRoutes.js
│   ├── podcastRoutes.js
│   ├── episodeRoutes.js
│   ├── commentRoutes.js
│   └── subscriptionRoutes.js
├── services/
│   └── mailer.js
├── tests/
│   └── (test files for your backend application)
├── app.js (or server.js or index.js, the main backend application file)
├── createTables.js (the script you provided earlier to create tables in the database)
├── db.js (the file containing the PostgreSQL pool configuration)
├── package.json
└── .env (or config file containing environment variables)

frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── (other static assets)
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── serviceWorker.ts
│   └── setupTests.ts
├── package.json
├── tsconfig.json
├── .env (or config file containing environment variables)
└── README.md
</pre>


## Frontend
![rontend Architecture](docs/diagrams/frontend_architecture.png)

The frontend of the TTS-Cockpit is a React based web application. This application is hosted on railway, a scalable and secure object storage service. The application is then delivered to end-users via a url(https://oudioo-production.up.railway.app/). This ensures that the application can be accessed quickly and reliably, regardless of where the user is located. 

Once the app is loaded in the browser, the communication within the app to the backend is then done with the help of dedicated API endpoints.

## Backend
The backend of the system is entirely built with Node.js, express.js and nodemon. The API endpoints that is provided to the frontend by this backend is documented securely via the http://localhost:3002/api-docs/  

## Database
The project uses postgrsql database.

![full architecture](docs/diagrams/overall_architecture.png)




# Getting Started
With a somewhat good knowledge of the project now under your  belt, lets get started with more actual dev stuffs.

lets begin with a list of some of the  important links to take note of.
## Project Links

- Frontend: https://oudioo-production.up.railway.app/  (hosted and functional)
 

## Prerequisites 
Before you can run or begin contributing to this project, you'll need to have the following installed. Note that you may need to request access for some of the listed tools.

  - Node.js (v14.0.0 or later)
  - Visual studio code
  - AWS CLI (Command Line Interface) 
  - An AWS account   
  - SendGrid account  
  - PostgreSQL

😊 


# Running the Project
#
To run the project, ensure that you have signed up for both an AWS account and a Sendgrid account. 

### Step 1: Clone the repository
Open your terminal and navigate to a choice directory(e.g, desktop) `cd Desktop`.
  run: ` $ git clone https://github.com/codetipster/oudioo.git `.

### Step 2: Navigate into the cloned project.
From your choice directory on the terminal;   
  run: ` $ cd oudioo`

### Step 3: Install project  dependencies
  run: `$ npm install ` (if this fails, navigate into each of the sub-folders separately nd run the install command separately for each)
  
### Step 4: Run the Frontend
  run: `$ cd frontend`
  run: `$ npm start` to lunch the local development server 

## Step 5: Run the backend 
  run: `$ cd backend``
  run: `npm start` to start the backend on localhost:3002. 


### Architecture
A documentation of the architecture can be found [here](https://axelspringer.atlassian.net/wiki/spaces/IDEASINNO/pages/64491867/Workflow) 


## Backend Server
API structure:
---
Here's a brief summary of each endpoint:

Podcasts:
- GET /podcasts: Get all podcasts.
- POST /podcasts: Create a new podcast.
- GET /podcasts/{id}: Get a specific podcast by id.

Episodes:
- GET /podcasts/{podcastId}/episodes: Get all episodes for a specific podcast.
- POST /podcasts/{podcastId}/episodes: Create a new episode for a specific podcast.

Comments:
- GET /podcasts/{podcastId}/episodes/{episodeId}/comments: Get all comments for a specific episode.
- POST /podcasts/{podcastId}/episodes/{episodeId}/comments: Create a new comment for a specific episode.

Users:
- POST /users/register: Register a new user.
- POST /users/login: Login a user.
- POST /users/logout: Logout a user.
- GET /users/verify-email: Verify a user's email.
- GET /users: Get all registered users.
- POST /users/reset-password: Send a password reset email to a user.
- POST /users/confirm-reset-password: Confirm and reset a user's password.
- GET /users/{id}: Get a specific user by id.
- GET /users/{userId}/podcasts: Get all podcasts by a specific user.
#


## Contribution Guidelines

A documentation of how to develop locally, can be found [here](local_development/README.md). - This is still a WIP


#  Technologies/Frameworks Used
- express
- nodemon
- jest
- node
- typescript
- pg
- eslint
- sequelize, npm install --save-dev sequelize-cli
- sendgrid
- AWS (S3)



# Future Direction

### Ad Configuration: 
Provide a way for your users to configure ads. This could be a form where users specify the ad's audio URL, the time during the podcast the ad should play (either a specific timestamp or intervals), and perhaps an option for how often the ad should repeat.

### Store Ad Configuration: 
Save this configuration to a database associated with the specific podcast episode. This could be a separate table or collection in your database that links ads to their respective episodes.

### Ad Retrieval: 
When the specific podcast episode is fetched to be played, also retrieve the ad configuration for that episode. You might need to make modifications to your API to ensure the ad configuration is sent along with the podcast episode data.

### Audio Player Modifications: 
Modify the audio player to include functionality for playing ads. This could involve setting up event listeners on the audio player's timeupdate event, which fires when the current playback position changed. When the event fires, check if the current playback time matches any of the configured ad times.

### Playing the Ad: 
If the playback time matches an ad time, pause the podcast, switch the audio source to the ad's audio URL, and play the ad. This will require controlling the audio player's src attribute and using the play and pause methods.

### Post-Ad Behavior: 
After the ad finishes playing (which you can detect with the ended event), switch the audio source back to the podcast, seek to the position where the podcast was paused (using the currentTime attribute), and resume playing the podcast.

### UI Indication: 
Consider adding visual indications in the player's progress bar to show when ads will play. This can be a useful feature for users.
Remember that changing audio sources can lead to small delays due to network latency, which might disrupt the user's listening experience. If this becomes a problem, you might want to look into more advanced techniques, like preloading ad audio or using the Web Audio API for more seamless transitions.
