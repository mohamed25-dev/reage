const mongoose = require('mongoose');
const Post = require('../../../models/post');

module.exports = async (req, res) => {
  const errors = await validate(req.params.id, req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        comments: { 
          user: req.user._id,
          body: req.body.body
        }
      }
    }, {
      new: true
    });

  res.send({
    post
  });
}

const validate = async (id, comment) => {
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

  if (!comment.body) {
    errors.push('الرجاء إضافة محتوى التعليق');
  }

  return errors;
}