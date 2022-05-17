// a function that mix normal param with spread

// we only support default export
export default function mixSpread(arg1: number, ...arg2: string[]) {

  return `arg1 is ${arg1} with ${arg2.length} more`
}
