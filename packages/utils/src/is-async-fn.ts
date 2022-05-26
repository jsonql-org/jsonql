
// from https://thewebdev.info/2022/03/03/how-to-check-a-function-is-async-with-javascript/
export function isAsyncFn(fn: unknown) {
  const AsyncFunction = (async () => { console.log(0) }).constructor

  return fn instanceof AsyncFunction
}
