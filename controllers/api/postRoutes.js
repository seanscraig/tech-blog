const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get("/:id", async (req, res) => {
//   try {
//     const dbPostData = Post.findOne({
//       where: {
//         id: req.params.id,
//       },
//       attributes: ["id", "body", "title", "created_at"],
//       include: [
//         {
//           model: Comment, 
//           attributes: ["id", "body", "post_id", "user_id", "created_at"],
//           include: {
//             model: User,
//             attributes: ["user_name"],
//           },
//         },
//         {
//           model: User,
//           attributes: ["user_name"],
//         },
//       ],
//     });

//     if (!dbPostData) {
//       res.status(404).json({ message: "No post found with this id" });
//       return;
//     }

//     const post = dbPostData.get({ plain: true });

//     console.log(post.comments);

//     res.render("single-post", {
//       post,
//       logged_in: req.session.logged_in,
//     });
//   } catch (error) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
