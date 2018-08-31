const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema
const PostsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    requred: true
  },
  name: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      date: {
        type: Date,
        default: Date.now()
      },
      avatar: {
        type: String
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  },
})

module.exports = Posts = mongoose.model('posts', PostsSchema)