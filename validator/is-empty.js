// 判断所有验证是否通过
const isEmpty = (value) => {
  return value === 'underfind' || value === null || (typeof value === 'object' && Object.keys(value ).length === 0) || (typeof value === 'string' && value.trim().length === 0)
}

module.exports = isEmpty