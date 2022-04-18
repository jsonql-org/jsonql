/**
 * create a timestamp in seconds 
 */
export const timestamp = (sec = false) => {
  let time = Date.now()

  return sec ? Math.floor( time / 1000 ) : time
}
