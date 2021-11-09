const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      body: req.body.body,
      post_id: req.params.post_id,
      user_id: req.session.user.id,
    });
    console.log(commentData);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;