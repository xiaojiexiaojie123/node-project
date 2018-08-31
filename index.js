const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

// 引入接口
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const apply = require('./routes/api/apply')

// db
const db = require('./config/keys').mongoURL

// 使用body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//connect db
mongoose.connect(db, { useNewUrlParser: true }, (err, res) => {
  if (err) { 
    console.log(err)
  } else {
    console.log('mongodb connected')
  }
})

// 使用中间件实现允许跨域
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Content-Type')
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE')
//   next()
// })

// passport初始化
app.use(passport.initialize())

require('./config/passport')(passport)

const port = process.env.PORT || 5000

// 使用routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)
app.use('/api/apply', apply)

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})