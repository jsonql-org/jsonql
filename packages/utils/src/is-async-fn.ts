/*eslint no-empty-function: ["error", {"allow": ["arrrowFunction", "asyncFunction"]}] */
// from https://thewebdev.info/2022/03/03/how-to-check-a-function-is-async-with-javascript/
export function isAsyncFn(fn: unknown) {
  const AsyncFunction = (async () => {}).constructor

  return fn instanceof AsyncFunction
}
