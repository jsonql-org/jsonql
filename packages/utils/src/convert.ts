// this is mainly for the string (via url) input then convert to other two primitive type
/** convert string to number, t = true then throw and hail it */
export function strToNum(input: string, t = false) {
  const n = parseFloat(input)
  if (!isNaN(n)) {
    return n
  }
  if (t) {
    throw new Error(`${input} is not number like`)
  }
  return input
}

/** convert string to boolean, same as above */
export function strToBool(input: string, t = false) {
  const i = input.toLowerCase()
  if (i === 'false') {
    return false
  } else if (i === 'true') {
    return true
  }
  if (t) {
    throw new Error(`${input} is not boolean like`)
  }
  return input // just return the original
}
