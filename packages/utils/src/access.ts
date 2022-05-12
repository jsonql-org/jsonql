
/** access an object node by dot not path */
export function accessByPath(obj: any, path: string) {
  if (path.indexOf('.') > -1) {
    const paths = path.split('.')
    const ctn = paths.length
    let _tmp: any = null
    for (let i=0; i<ctn; ++i) {
      const p = paths[i]
      if (_tmp !== null) {
        _tmp = _tmp[p]
      } else {
        _tmp = obj[p]
      }
    }
    return _tmp
  }
  return obj[path]
}
