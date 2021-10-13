const mongoose = require('mongoose');
const Post = require('../../../models/post');

module.exports = async (req, res) => {
  const errors = await validate(req.params.id, req.user._id);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const post = await Post.findByIdAndDelete(req.params.id);

  res.send({
    post
  });
}

const validate = async (id, userId) => {
  const errors = [];

  const isValidID = mongoose.isValidObjectId(id);
  if (!isValidID) {
    errors.push('المنشور غير موجود');
    return errors;
  }

  const post = await Post.findById(id).lean();
  if (!post) {
    errors.push('المنشور غير موجود');
    return errors;
  }

  if (!userId.equals(post.user)) {
    errors.push('لا يمكن حذف المنشور إلا من قبل صاحبه');
  }

  return errors;
}