const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt') // 密码加密
const gravatar = require('gravatar') // 全球公认头像
const jwt = require('jsonwebtoken') // token
const passport = require('passport') // 验证token
const User = require('../../models/User')
const keys = require('../../config/keys')

// 引入验证方法
const validateRegisterInput = require('../../validator/register')
const validateLoginInput = require('../../validator/login')

// $route GET api/users/test
// @desc 返回请求的json数据
router.get('/test', (req, res) => {
  res.json({msg: 'login works'})
})

// 注册
router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body)
  // 判断isValid是否通过
  if (!isValid) {
    return res.status(400).json(errors)
  }
  // 查询数据中是否存在邮箱
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({email: '邮箱已经被注册了'})
    } else {
      const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      })

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err
          }

          newUser.password = hash

          newUser.save()
            .then(user => res.json({code: 0, msg: 'ok', data: user}))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// 登录
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const {errors, isValid} = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  // 查询数据库
  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({email: '找不到用户'})
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // jwt.sign('规则', '加密名字', '过期时间', '箭头函数')
            const rule = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            jwt.sign(
              rule,
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                if (err) throw err
                res.json({
                  code: 1,
                  token: 'Bearer ' + token
                })
              }
            )
          } else {
            return res.status(400).json({password: '密码错误'})
          }
        })
    })
})

// 请求数据
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router