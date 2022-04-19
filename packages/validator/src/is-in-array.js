/**
 * @param {array} arr Array for check
 * @param {*} value target
 * @return {boolean} true on successs
 */
const isInArray = function(arr, value) {
  return !!arr.filter(a => a === value).length
}

export default isInArray
