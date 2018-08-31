const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EducationSchema = new Schema({
  applyId: {
    type: Schema.Types.ObjectId,
    ref: 'creates'
  },
  degree: {
    type: String,
    required: true
  },
  graduateTime: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  ranking: {
    type: String,
    required: true
  },
  tutor: {
    type: String
  },
  englishLevel: {
    class: {
      type: String
    },
    score: {
      type: Number
    }
  },
  otherLevel: {
    class: {
      type: String
    },
    score: {
      type: Number
    }
  },
  extra : {
    type: String
  }
})

module.exports = Education = mongoose.model('educations', EducationSchema)