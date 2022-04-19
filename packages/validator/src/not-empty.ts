
/**
 * Check several parameter that there is something in the param
 this is problematic should rename to isNotEmptyParam
 and we should check if its array is it empty array
 if it's object then if its empty object 
 */
 export default function isNotEmpty(a: any) {
  if (Array.isArray(a)) {

    return true
  }

  return a !== undefined && a !== null && (a+'').trim() !== ''
}
