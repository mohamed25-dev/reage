const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const likeSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    slelect: false
  },
  comments: [
    commentSchema
  ],
  likes: [
    likeSchema
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject:{
    virtuals: true
  }
});

postSchema.virtual('numberOfLikes').get(function() {
  return this.likes.length;
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;