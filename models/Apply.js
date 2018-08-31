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
    update: {
      type: Date
    },
    basic: {
      type: {
        type: String
      },
      job: {
        type: String
      },
      group: {
        type: String
      },
      startTime: {
        type: String
      },
      duration: {
        type: String
      },
      interviewCity: {
        type: String
      },
      eagerCity: {
        type: String
      },
      isObey: {
        type: Boolean
      }
    },
    person: {
      name: {
        type: String
      },
      cardId: {
        type: String
      },
      sex: {
        type: String
      },
      birthTime: {
        type: String
      },
      phone: {
        type: String
      },
      email: {
        type: String
      },
      wechat: {
        type: String
      },
      urgentPeople: {
        type: String
      },
      urgentPeoplePhone: {
        type: String
      },
      pic: {
        type: String
      }
    },
    education: {
      degree: {
        type: String
      },
      graduateTime: {
        type: String
      },
      school: {
        type: String
      },
      department: {
        type: String
      },
      major: {
        type: String
      },
      ranking: {
        type: String
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
        type: String
      },
      internship: {
        type: String
      },
      studentWork: {
        type: String
      },
      award: {
        type: String
      },
      other: {
        type: String
      },
      prove: {
        name: {
          type: String
        },
        status: {
          type: String
        },
        phone: {
          type: String
        }
      }
    }
  }]
})

module.exports = Apply = mongoose.model('applies', ApplySchema)
