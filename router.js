const express = require('express');
const path = require('path');
const userRouter = require('./src/user/router');
const postRouter = require('./src/post/router');

module.exports = (app) => {

  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.use(express.static(__dirname + "/public"));

  app.use('/api/users', userRouter);
  app.use('/api/posts', postRouter);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
  
  app.use((err, req, res, next) => {
    if (err.name === 'MongoError') {
      err.status = 422;
    }

    res.status(err.status || 500).json({
      errors: [err.message || 'حدث خطأ ماالرجاء المحاولة مرة أخرى']
    });
  });
}

