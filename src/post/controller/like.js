const mongoose = require('mongoose');
const Post = require('../../../models/post');

module.exports = async (req, res) => {
  const errors = await validate(req.params.id);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  let post = await Post.findOneAndUpdate(
    {
      _id: req.params.id,
      'likes.user': req.user._id
    },
    {
      $pull: {
        likes: { user: req.user._id }
      }
    }, {
    new: true
  });

  if (post) {
    return res.send({
      post
    });
  }

  post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        likes: { user: req.user._id }
      }
    }, {
    new: true
  });

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