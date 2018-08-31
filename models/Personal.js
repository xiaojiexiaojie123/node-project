const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
  applyId: {
    type: Schema.Types.ObjectId,
    ref: 'creates'
  },
  name: {
    type: String,
    required: true
  },
  cardId: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  birthTime: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  wechat: {
    type: String
  },
  urgentPeople: {
    type: String,
    required: true
  },
  urgentPeoplePhone: {
    type: String,
    required: true
  },
  pic: {
    type: String
  }
})

module.exports = Person = mongoose.model('person', PersonSchema)