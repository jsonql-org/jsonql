// testing the regex functions
const test = require('ava')

const { isRegExp, getRegex } = require('../src/regex')

test(`isRegExp should able to work`, t => {

  t.false(isRegExp('I am not'))

  t.true(isRegExp(/I am regex/))

  t.true( isRegExp( getRegex('whatever') ) )

})
