const express = require('express')
const router = express.Router()
const passport = require('passport') // 验证token

const Apply = require('../../models/Apply')

router.get('/', (req, res) => {
  res.json('hello, apply')
})

// 创建简历
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
  Apply.findOne({ user: req.user.id }).then(result => {
    if (result) {
      let hasName = result.apply.some((item) => {
        return item.name === req.body.name
      })
      console.log(hasName)
      if (hasName) {
        res.json({ code: 1000, msg: '名字已存在' })
      }
      result.apply.push({ name: req.body.name })
      result.save().then(data => {
        res.json({ code: 0, msg: 'ok', data: data })
      })
    } else {
      const newApply = {
        user: req.user.id,
        apply: [{
          name: req.body.name
        }]
      }
      new Apply(newApply).save().then(result => {
        res.json({ code: 0, msg: 'ok', data: data })
      })
    }
  })
})

// 获取简历
router.post('/getApply', passport.authenticate('jwt', { session: false }), (req, res) => {
  Apply.findOne({ user: req.user.id }).then(result => {
    if (result) {
      let applies = result.apply.map((item) => {
        return { name: item.name, update: Date.now(), integrity: 40, id: item.id }
      })
      res.json({ code: 0, data: applies })
    } else {
      res.json({ code: 0, data: null })
    }
  })
})

// 删除简历
router.post('/deleteApply', passport.authenticate('jwt', { session: false }), (req, res) => {
  Apply.findOne({ user: req.user.id }).then(result => {
    if (result) {
      let deleteIndex = null
      result.apply.forEach((item, index) => {
        if (item.id === req.body.id) {
          deleteIndex = index
        }
      })
      result.apply.splice(deleteIndex, 1)
      result.save().then(result => {
        res.json({ code: 0, data: result })
      })
    } else {
      res.json({ code: 0, data: null })
    }
  })
})

// 更新简历
router.post('/updateApply', passport.authenticate('jwt', { session: false }), (req, res) => {
  Apply.findOne({ user: req.user.id }).then(result => {
    if (result) {
      result.apply.map((item, index) => {
        if (item.id === req.body.id) {
          item.name = req.body.name
        }
      })
      result.save().then(result => {
        res.json({ code: 0, data: result })
      })
    } else {
      res.json({ code: 0, data: null })
    }
  })
})

// 添加或更新应聘信息
router.post('/basic', passport.authenticate('jwt', { session: false }), (req, res) => {
  const basicData = {
    type: req.body.type,
    job: req.body.job,
    group: req.body.group,
    startTime: req.body.startTime,
    duration: req.body.duration,
    interviewCity: req.body.interviewCity,
    eagerCity: req.body.eagerCity,
    isObey: req.body.isObey
  }
  Apply.findOne({ user: req.user.id }).then(result => {

    const cloneData = JSON.parse(JSON.stringify(result))

    result.apply.map(item => {
      console.log(item.id === req.body.id)
      if (item.id === req.body.id) {
        item.basic = basicData
      }
    })

    cloneData.apply.forEach(item => {
      if (item._id.toString() === req.body.id) {
        if (item.basic) {
          Apply.findOneAndUpdate({ user: req.user.id }, { $set: result }, { new: true }).then(result => {
            res.json({ code: 0, msg: 'ok', data: result })
          })
        }
        result.save().then(result => {
          res.json({ code: 0, msg: 'ok', data: result })
        })
      }
    })
  })
})

// 获取应聘信息
router.post('/getBasic', passport.authenticate('jwt', { session: false }), (req, res) => {
  Apply.findOne({ user: req.user.id }).then(result => {
    let data = result.apply.filter(item => {
      return item.id === req.body.id
    })
    res.json({ code: 0, msg: 'ok', data: data[0].basic })
  })
})

// 添加或更新个人信息
router.post('/person', passport.authenticate('jwt', { session: false }), (req, res) => {
  const pic = ''
  if (req.body.pic) {
    pic = req.body.pic
  }
  const personData = {
    id: req.body.id,
    name: req.body.name,
    cardId: req.body.cardId,
    sex: req.body.sex,
    birthTime: req.body.birthTime,
    phone: req.body.phone,
    email: req.body.email,
    wechat: req.body.wechat,
    urgentPeople: req.body.urgentPeople,
    urgentPeoplePhone: req.body.urgentPeoplePhone,
    pic: pic
  }
  Apply.findOne({ user: req.user.id }).then(result => {

    const cloneData = JSON.parse(JSON.stringify(result))

    result.apply.map(item => {
      console.log(item.id === req.body.id)
      if (item.id === req.body.id) {
        item.person = personData
      }
    })

    cloneData.apply.forEach(item => {
      if (item._id.toString() === req.body.id) {
        if (item.person) {
          Apply.findOneAndUpdate({ user: req.user.id }, { $set: result }, { new: true }).then(result => {
            res.json({ code: 0, msg: 'ok', data: result })
          })
        }
        result.save().then(result => {
          res.json({ code: 0, msg: 'ok', data: result })
        })
      }
    })
  })
})

// 获取个人信息
router.post('/getPerson', passport.authenticate('jwt', { session: false }), (req, res) => {
  Apply.findOne({ user: req.user.id }).then(result => {
    let data = result.apply.filter(item => {
      return item.id === req.body.id
    })
    res.json({ code: 0, msg: 'ok', data: data[0].person })
  })
})

// 添加或更新教育经历信息
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  let englishLevel = req.body.englishLevel ? req.body.englishLevel : {}
  let otherLevel = req.body.otherLevel ? req.body.otherLevel : {}
  let extra = req.body.extra ? req.body.extra : ''
  const educationData = {
    degree: req.body.degree,
    graduateTime: req.body.graduateTime,
    school: req.body.school,
    department: req.body.department,
    major: req.body.major,
    ranking: req.body.ranking,
    tutor: req.body.tutor,
    englishLevel: englishLevel,
    otherLevel: otherLevel,
    extra: extra
  }
  Apply.findOne({ user: req.user.id }).then(result => {

    const cloneData = JSON.parse(JSON.stringify(result))

    result.apply.map(item => {
      console.log(item.id === req.body.id)
      if (item.id === req.body.id) {
        item.education = educationData
      }
    })

    cloneData.apply.forEach(item => {
      if (item._id.toString() === req.body.id) {
        if (item.education) {
          Apply.findOneAndUpdate({ user: req.user.id }, { $set: result }, { new: true }).then(result => {
            res.json({ code: 0, msg: 'ok', data: result })
          })
        }
        result.save().then(result => {
          res.json({ code: 0, msg: 'ok', data: result })
        })
      }
    })
  })
})

// 获取教育经历信息
router.post('/getEducation', passport.authenticate('jwt', { session: false }), (req, res) => {
  Apply.findOne({ user: req.user.id }).then(result => {
    let data = result.apply.filter(item => {
      return item.id === req.body.id
    })
    res.json({ code: 0, msg: 'ok', data: data[0].education })
  })
})

// 添加或更新实践经历信息
router.post('/practice', passport.authenticate('jwt', { session: false }), (req, res) => {
  let prove = req.body.prove ? req.body.prove : {}
  let other = req.body.other ? req.body.other : ''
  const practiceData = {
    achievement: req.body.achievement,
    internship: req.body.internship,
    studentWork: req.body.studentWork,
    award: req.body.award,
    other: other,
    prove: prove
  }
  Apply.findOne({ user: req.user.id }).then(result => {

    const cloneData = JSON.parse(JSON.stringify(result))

    result.apply.map(item => {
      console.log(item.id === req.body.id)
      if (item.id === req.body.id) {
        item.practice = practiceData
      }
    })

    cloneData.apply.forEach(item => {
      if (item._id.toString() === req.body.id) {
        if (item.practice) {
          Apply.findOneAndUpdate({ user: req.user.id }, { $set: result }, { new: true }).then(result => {
            res.json({ code: 0, msg: 'ok', data: result })
          })
        }
        result.save().then(result => {
          res.json({ code: 0, msg: 'ok', data: result })
        })
      }
    })
  })
})

// 获取实践经历信息
router.post('/getPractice', passport.authenticate('jwt', { session: false }), (req, res) => {
  Apply.findOne({ user: req.user.id }).then(result => {
    let data = result.apply.filter(item => {
      return item._id.toString() === req.body.id
    })
    res.json({ code: 0, msg: 'ok', data: data[0].practice })
  })
})

module.exports = router