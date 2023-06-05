const models = require('../models');

const createComment = async (req, res) => {
  const { content } = req.body;
  const { episodeId } = req.params;
  const { userId } = req.user;  // assuming req.user contains authenticated user info

  try {
    const newComment = await models.Comment.create({
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

module.exports = {
  createComment,
};
