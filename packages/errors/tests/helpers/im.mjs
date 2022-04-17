// import * as constants from '@jsonql/constants'
import { NO_ERROR_MSG } from '@jsonql/constants/index.mjs'

console.log('mjs', NO_ERROR_MSG)

// if I do this then it's fuck
// even inside is a module.exports = { } named export
import constants from '@jsonql/constants'

console.log('cjs', constants.NO_ERROR_MSG)
