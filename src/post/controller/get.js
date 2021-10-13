const mongoose = require('mongoose');
const Post = require('../../../models/post');

module.exports = async (req, res) => {
  const postId = req.params.id;

  const errors = await validate(postId);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  let post = await Post.findById(postId);
  post = post.toObject();
  post.liked = false;

  if (req.user) {
    for (let like of post.likes) {
      if (like.user.equals(req.user._id)) {
        post.liked = true;
      }
    }
  }

  res.send({
    post
  });

}

const validate = async (id) => {
  const errors = [];

  const isValidID = mongoose.isValidObjectId(id);
  if (!isValidID) {
    errors.push('المنشور غير موجود');
    return errors;
  }

  const post = await Post.findById(id);
  if (!post) {
    errors.push('المنشور غير موجود');
  }

  return errors;
}