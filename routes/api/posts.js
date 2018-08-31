const express = require('express')
const router = express.Router()
const passport = require('passport') // 验证token

const User = require('../../models/User')
const Profile = require('../../models/Profiles')
const Posts = require('../../models/Posts')

router.get('/test', (req, res) => {
  res.json({msg: 'post work'})
})

// 创建评论接口
router.post('/passport', passport.authenticate('jwt', {session: false}), (req, res) => {
  const newPost = new Posts ({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })
  newPost.save().then(post => {
    res.json(post)
  })
})

// 获取评论信息
router.get('/', (req, res) => {
  Posts.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({noposts: '找不到任何评论信息'}))
})

// 根据id找评论信息
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({noposts: '找不到该评论信息'}))
})

// 根据id找评论信息
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({noposts: '找不到该评论信息'}))
})

// 删除单个评论信息
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    Posts.findById(req.params.id)
      .then(post => {
        //　判断是否本人操作
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({notauthorized: '用户非法操作'})
        }
        post.remove().then(() => res.json({success: 'true'}))
      })
      .catch(err => res.status(404).json({postnotfound: '没有该评论信息'}))
  })
})

// 点赞接口
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    Posts.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({alreadyliked: '该用户已赞过'})
        }
        post.likes.unshift({user: req.user.id})
        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({likerror: '点赞错误'}))
  })
})

// 取消点赞接口
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    Posts.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({notlike: '该用户没有赞过'})
        }
        // 获取要删掉的user id
        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({likerror: '取消点赞错误'}))
  })
})

// 添加评论接口
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }
      post.comments.unshift(newComment)
      post.save().then(post => res.json(post))
    })
    .catch(err => res.json({commenterr: '添加评论失败'}))
})

// 删除评论接口
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({commentnotexists: '评论不存在'})
      }
      const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
      post.comments.splice(removeIndex, 1)
      post.save().then(post => res.json(post))
    })
    .catch(err => res.json({commenterr: '添加评论失败'}))
})

module.exports = router