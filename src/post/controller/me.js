const Post = require('../../../models/post');

module.exports = async (req, res) => {
  const posts = await Post.find({
    user: req.user._id
  });

  res.send({
    posts
  });
}
