const isEmpty = require('../validator/is-empty')
const score = null
const integrity = (apply) => {

}

function countProper(apply) {
  for (let item in apply) {
    if (typeof (item) === 'Object') {
      countProper(item)
    } else if (!isEmpty(item)) {
      score++
    }
  }
}

module.exports = integrity
