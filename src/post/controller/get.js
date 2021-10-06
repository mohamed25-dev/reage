const mongoose = require('mongoose');
const Post = require('../../../models/post');

module.exports = async (req, res) => {
  const errors = await validate(req.params.id);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const post = await Post.findById(req.params.id);

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