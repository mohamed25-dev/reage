const userRouter = require('./src/user/router');
const postRouter = require('./src/post/router');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/posts', postRouter);

  app.use((err, req, res, next) => {
    if (err.name === 'MongoError') {
      err.status = 422;
    }

    res.status(err.status || 500).json({
      errors: [err.message || 'حدث خطأ ماالرجاء المحاولة مرة أخرى']
    });
  });
}

