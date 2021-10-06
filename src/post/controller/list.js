const Post = require('../../../models/post');

module.exports = async (req, res) => {
  const posts = await Post.find({});

  res.send({
    posts
  });
}
