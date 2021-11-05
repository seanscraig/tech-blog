const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const postsArr = postData.map((post) => {
    return {
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    };
  });

  const post = await Post.bulkCreate(postsArr, {
    returning: true,
  });

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: post[Math.floor(Math.random() * post.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
