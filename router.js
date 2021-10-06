const userRouter = require('./src/user/router');
const postRouter = require('./src/post/router');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/posts', postRouter);
} 

