const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  apply: [{
    name: {
      type: String,
      required: true
    },
    basic: {
      type: {
        type: String,
        required: true
      },
      job: {
        type: String,
        required: true
      },
      group: {
        type: String,
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      duration: {
        type: String,
        required: true
      },
      interviewCity: {
        type: String,
        required: true
      },
      eagerCity: {
        type: String,
        required: true
      },
      isObey: {
        type: Boolean,
        required: true
      }
    },
    person: {
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
    },
    education: {
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
      extra: {
        type: String
      }
    },
    practice: {
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
      }
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
    }
  }]
  
})

module.exports = Apply = mongoose.model('applies', ApplySchema)