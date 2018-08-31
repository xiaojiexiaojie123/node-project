const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = validateRegisterInput = (data) => {

  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  if(!Validator.isLength(data.name, {min: 2, max: 30})) {
    errors.name = '名字长度不能小于2位并且不能大于30位'
  }

  if (Validator.isEmpty(data.name)) {
    console.log(222)
    errors.name = '名字不能为空'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = '邮箱不合法'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = '邮箱不能为空'
  }

  if(!Validator.isLength(data.password, {min: 6, max: 16})) {
    errors.password = '密码长度不能小于6位并且不能大于16位'
  }

  if (Validator.isEmail(data.password)) {
    errors.password = '密码不能为空'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = '两次密码输入不一致'  
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password = '确认密码不能为空'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}