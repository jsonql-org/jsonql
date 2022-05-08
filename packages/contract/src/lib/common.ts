// common share methods 
export function findByPath(
  obj: any,
  path: string,
) {
  const parts = path.split('.')
  const ctn = parts.length
  let lastPath: any
  for (let i = 0; i < ctn; ++i) {
    const _path = parts[i]
    if (obj[ _path ]) {
      lastPath = obj[ _path ]
    } else {
      return null
    }
  }
  return lastPath
}
