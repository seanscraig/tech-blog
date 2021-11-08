const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET request to show the homepage
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
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

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "body", "title", "created_at"],
      include: [
        {
          model: Comment, 
          attributes: ["id", "body", "post_id", "user_id", "created_at"],
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

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = dbPostData.get({ plain: true });

    console.log(post);
    res.render("single-post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/", withAuth, async (req, res) => {
//   try {
//     const dbPostData = await Post.findAll({
//       where: {
//         id: req.session.id,
//       },
//       attributes: ["id", "title", "body", "created_at"],
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "body", "user_id", "post_id", "created_at"],
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

//     const posts = dbPostData.map((post) => post.get({ plain: true }));

//     console.log(posts);
//     res.render("dashboard", {
//       posts,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
