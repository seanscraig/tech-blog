const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      body: req.body.commentBody,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    console.log(commentData);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;