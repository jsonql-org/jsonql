/** validate any thing only check if there is something */
export function checkAny(value: unknown, checkNull = true): boolean {
  if (value !== undefined && value !== '' && (value+'').trim() !== '') {
    if (checkNull === false || (checkNull === true && value !== null)) {
      return true
    }
  }
  return false
}
