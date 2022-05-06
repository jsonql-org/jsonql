// take out some of the common methods to keep the processor files size down
/** remove all the span props they are no use to us */
export function stripSpan(obj: any) {
  const tmp = {}
  for (const key in obj) {
    if (key !== 'span') {
      if (Array.isArray(obj[key])) {
        tmp[key] = obj[key].map((o: any) => {
          if (typeof o === 'object') {
            return stripSpan(o)
          }
          return o
        })
      } else if (typeof obj[key] === 'object') {
        tmp[key] = stripSpan(obj[key])
      } else {
        tmp[key] = obj[key]
      }
    }
  }
  return tmp
}

/** take the error stack processor here and see if it works correctly */
export function pickInputFile(e: Error, pattern = '__decorateClass'): string {
  const stacks = e.stack?.split('\n').filter(line => line.indexOf(pattern) > -1)
  const where = stacks ? stacks[stacks.length - 1].split('(')[1].split(':')[0] : ''

  return where
}
