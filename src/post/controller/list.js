const Post = require('../../../models/post');
const config = require('../../../config');

module.exports = async (req, res) => {
  const LIMIT = config.POST_PER_PAGE;
  let page = req.query.p;
  if (!page || isNaN(page)) {
    page = 1;
  }

  const skip = LIMIT * (page - 1);

  const posts = await Post
    .find({})
    .skip(skip)
    .limit(LIMIT);
  
  const postsCount = await Post.find({}).count();

  res.send({
    posts,
    count: Math.ceil(postsCount/LIMIT)
  });
}
