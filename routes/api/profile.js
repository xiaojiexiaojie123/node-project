const express = require('express')
const router = express.Router()
const passport = require('passport') // 验证token
const validateProfileInput = require('../../validator/profile')

const User = require('../../models/User')
const Profile = require('../../models/Profiles')

// 创建和编辑个人信息接口
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  const {errors, isValid} = validateProfileInput(req.body)

  // 判断isValid是否通过
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.handle) {
    profileFields.handle = req.body.handle
  }
  if (req.body.company) {
    profileFields.company = req.body.company
  }
  if (req.body.website) {
    profileFields.website = req.body.website
  }
  if (req.body.location) {
    profileFields.location = req.body.location
  }
  if (req.body.status) {
    profileFields.status = req.body.status
  }
  if (req.body.bio) {
    profileFields.bio = req.body.bio
  }
  if (req.body.githubusername) {
    profileFields.githubusername = req.body.githubusername
  }

  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',')
  }

  profileFields.social = {}
  if (req.body.wechat) {
    profileFields.social.wechat = req.body.wechat
  }
  if (req.body.QQ) {
    profileFields.social.QQ = req.body.QQ
  }
  if (req.body.tengxunkt) {
    profileFields.social.tengxunkt = req.body.tengxunkt
  }
  if (req.body.wangyikt) {
    profileFields.social.wangyikt = req.body.wangyikt
  }

  Profile.findOne({user: req.user.id}).then(profile => {
    if (profile) {
      // 用户信息存在,执行更新方法
      Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields
      }, {new: true}).then(profile => {
        res.json(profile)
      })
    } else {
      // 用户信息不存在,执行创建方法
      Profile.findOne({handle :profileFields.handle}).then(proflile => {
        if (profile) {
          errors.handle = '该用户的handle个人信息已经存在，请勿重新创建'
          res.status(400).json(errors)
        }

        new Profile(profileFields).save().then(profile => {
          res.json(profile)
        })
      })
    }
  })
})

// 获取当前登录用户个人信息
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}
  Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'avatart'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = '该用户信息不存在'
        return res.status(404).json(errors)
      }
    res.json(profile)
  }).catch(err => {
    res.status(404).json(err)
  })
})

// 通过handle获取个人信息
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatart'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = '该用户信息不存在'
        return res.status(404).json(errors)
      }
    res.json(profile)
  }).catch(err => {
    return res.status(404).json(err)
  })
})

// 通过user_id获取个人信息
router.get('/user/:user_id', (req, res) => {
  const errors = {}
  Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatart'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = '该用户信息不存在'
        return res.status(404).json(errors)
      }
    res.json(profile)
  }).catch(err => {
    return res.status(404).json(err)
  })
})

// 通过all获取所有人信息
router.get('/all', (req, res) => {
  const errors = {}
  Profile.find()
    .populate('user', ['name', 'avatart'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = '没有任何用户信息'
        return res.status(404).json(errors)
      }
    res.json(profile)
  }).catch(err => {
    return res.status(404).json(err)
  })
})

// 添加个人经历
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}
  Profile.findOne({user: req.user.id})
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      profile.experience.push(newExp)
      profile.save().then(profile => {
        res.json(profile)
      })
    })
    .catch(err => {
      return res.status(404).json(err)
  })
})

// 添加教育经历
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}
  Profile.findOne({user: req.user.id})
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      profile.education.push(newEdu)
      profile.save().then(profile => {
        res.json(profile)
      })
    })
    .catch(err => {
      return res.status(404).json(err)
  })
})

// 删除个人经历
router.delete('/experience/:epx_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}
  Profile.findOne({user: req.user.id})
    .then(profile => {
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.epx_id)
      profile.experience.splice(removeIndex, 1)
      profile.save().then(profile => {
        res.json(profile)
      })
    })
    .catch(err => {
      return res.status(404).json(err)
  })
})

// 删除教育经历
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}
  Profile.findOne({user: req.user.id})
    .then(profile => {
      const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)
      profile.education.splice(removeIndex, 1)
      profile.save().then(profile => {
        res.json(profile)
      })
    })
    .catch(err => {
      return res.status(404).json(err)
  })
})

// 删除用户
router.delete('/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}
  Profile.findOneAndRemove({user: req.user.id})
    .then(profile => {
      User.findOneAndRemove({_id: req.user.id}).then(() => {
        res.json({success: true})
      })
    })
    .catch(err => {
      return res.status(404).json(err)
  })
})

module.exports = router