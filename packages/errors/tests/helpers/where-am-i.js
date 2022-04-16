/**
 * some time it's hard to tell where the error is throw from
 * because client server throw the same, therefore this util fn
 * to add a property to the error object to tell if it's throw
 * from client or server
 *
 */

const isBrowser = () => {
  try {
    if (window || document) {
      return true;
    }
  } catch(e) {}
  return false;
}

const isNode = () => {
  try {
    if (!isBrowser() && global) {
      return true;
    }
  } catch(e) {}
  return false;
}

export default function whereAmI() {
  if (isBrowser()) {
    return 'browser'
  }
  if (isNode()) {
    return 'node'
  }
  return 'unknown'
}
