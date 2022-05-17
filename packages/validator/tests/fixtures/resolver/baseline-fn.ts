
/** baseline normal function to observe the valdiation internal */
export default function baselineFn(value1: string, value2: number, value3 = false): string {

  return `${value1} with number ${value2} ${value3 ? ' fine' : ' or not'}`
}
