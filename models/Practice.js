const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PracticeSchema = new Schema({
  applyId: {
    type: Schema.Types.ObjectId,
    ref: 'creates'
  },
  // practice: [{
  //   achievement: {
  //     type: String,
  //     required: true
  //   },
  //   internship: {
  //     type: String,
  //     required: true
  //   },
  //   studentWork: {
  //     type: String,
  //     required: true
  //   },
  //   award: {
  //     type: String,
  //     required: true
  //   },
  //   other: {
  //     type: String
  //   }
  // }]
  achievement: {
    type: String,
    required: true
  },
  internship: {
    type: String,
    required: true
  },
  studentWork: {
    type: String,
    required: true
  },
  award: {
    type: String,
    required: true
  },
  other: {
    type: String
  },
  // prove: {
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   status: {
  //     type: String,
  //     required: true
  //   },
  //   phone: {
  //     type: String,
  //     required: true
  //   }
  // }
})

module.exports = Practice = mongoose.model('practices', PracticeSchema)