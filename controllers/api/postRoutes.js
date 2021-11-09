const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.postTitle,
      body: req.body.postBody,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = Post.update(
      {
        title: req.body.postTitle,
        body: req.body.postBody,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // if (!dbPostData[0]) {
    //   res.status(404).json({ message: 'No post found with id'});
    //   return;
    // }

    res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // if (!res.affectedRows) {
    //   res.status(404).json({ message: 'No post found with this id!' });
    //   return;
    // }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
