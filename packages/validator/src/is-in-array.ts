/**
in array
 */
export default  function isInArray(arr: any[], value: any): boolean {
  return !!arr.filter(a => a === value).length
}
