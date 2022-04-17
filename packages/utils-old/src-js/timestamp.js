/**
 * @param {boolean} sec return in second or not
 * @return {number} timestamp
 */
export const timestamp = (sec = false) => {
  let time = Date.now()
  return sec ? Math.floor( time / 1000 ) : time
}
