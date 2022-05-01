/**
 * create a timestamp in seconds
 */
export const timestamp = (sec = false) => {
  const time = Date.now()

  return sec ? Math.floor( time / 1000 ) : time
}
