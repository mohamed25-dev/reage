const Post = require('../../../models/post');

module.exports = async (req, res) => {
  const errors = await validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const post = {
    title: req.body.title,
    image: req.body.image,
    body: req.body.body,
    user: req.user._id
  }

  const createdPost = await Post.create(post);

  res.send({ post: createdPost });
}

const validate = async (post) => {
  const errors = [];
  if (!post.title) {
    errors.push('الرجاء إضافة عنوان للصورة');
  }

  if (!post.image) {
    errors.push('الرجاء إضافة الصورة');
  }

  if (!post.body) {
    errors.push('الرجاء إضافة وصف الصورة ');
  }

  return errors;
}