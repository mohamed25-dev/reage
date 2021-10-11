const Post = require('../../../models/post');

module.exports = async (req, res) => {
  const errors = await validate(req.body, req.params.id);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const post = await Post.findById(req.params.id);

  if (req.files?.image) {
    post.image = 'uploads/' + req.files.image[0].filename;
  }

  post.title = req.body.title;
  post.body = req.body.body;
  
  let updatedPost = await post.save();

  res.send({ post: updatedPost });
}

const validate = async (post, id) => {
  const errors = [];
  if (!post.title) {
    errors.push('الرجاء إضافة عنوان للصورة');
  }

  if (!post.body) {
    errors.push('الرجاء إضافة وصف الصورة ');
  }
  
  if (errors.length > 0) {
    return errors;
  }

  const isFound = await Post.findById(id);
  if (!isFound) {
    errors.push('لم يتم العثور على هذا المنشور')
  }

  return errors;
}