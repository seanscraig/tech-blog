const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostsData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "body", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "body", "user_id", "post_id", "created_at"],
          include: {
            model: User,
            attributes: ["user_name"],
          },
        },
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });

    const posts = dbPostsData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "body", "created_at"],
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
        {
          model: Comment,
          attributes: ["id", "body", "user_id", "post_id", "created_at"],
          include: {
            model: User,
            attributes: ["user_name"],
          },
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id." });
      return;
    }

    const post = dbPostData.get({ plain: true });

    res.render("edit-post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new", withAuth, (req, res) => {
  res.render("new-post");
});

module.exports = router;
