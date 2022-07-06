# @jsonql/utils

> This is a dependency module for various jsonql node / browser modules.

### How to use

When using purely in browser environment, you should use `@jsonql/utils/browser`
For ESM you could include the `@jsonql/utils/esm`

When using it within your JS / TS development, most of the methods can be found in `@jsonql/utils`
~~Where the node only methods will be in `@jsonql/utils/node`@DREPRECATED~~

## Complete list of all available functions

When use with build tool, for better tree shaking. You need to import them directly.
Please reference which functions in what file below

#### dist/access

- accessByPath (obj: AnyType, path: string)

```js
const obj = { a: 1, b: { c: 2} }

const c = accessByPath(obj, 'b.c')

// c === 2
```

#### dist/array (V1.2.0 breaking)

- inArray (arr: AnyTypeArr, value: AnyType): boolean
- toArray (arg: AnyType): Array<AnyType>
- compact (arg: Array<unkonwn>): Array<AnyType>

example for compact:

```js
const result = compcat([0, 1, 2, null, false, 3])

// [ 1, 2, null, false ]
```

Basically compact will remove any non-truthy value from the value, **even 0**!

#### dist/chain-fns

- chainFns (mainFn: AnyType, ...moreFns: AnyType)

It returns a function to accept parameter for the `mainFn`, then after execute the function will pass to the next function until we get the final result. This is a sync method.

```js
const fn1 = (a) => a + 1
const fn2 = (b) => b + 2
const fn3 = (c) => c + 4

const fn = chainFns(fn1, fn2, fn3)

const result = fn(1)

// result === 8
```

You can also do this:

```js
const fn1 = (a) => a + 1
const fn2 = (b) => [b, 2]
const fn3 = (x, y) => x + y

const fn = chainFns(fn1, fn2, fn3)
const result = fn(1)

// result === 4
```

#### dist/chain-promises

- chainPromises (promies: Array<Promise<AnyType>>, asObject: boolean | object = false)
- chainProcessPromises (initPromise: JsonqlPromiseChainFn, ...promises: Array<JsonqlPromiseChainFn>)
- queuePromisesProcess (queue: Array<JsonqlPromiseChainFn>,
...initValue: AnyTypeArr)

`chainPromises` will put every promises resolve result into an array (default) or if you set the `asObject` parameter to true or pass an object, it will merge into one object. In some way this is similar to `Promise.all`. The different is when one of the promise failed, it will stop and throw immediately. And it can config to return a merge object as result.

`chainProcessPromises` will return a function that accept the argument for the first async function, then each result will pass to the next function as argument. This is the async version of the above `chainFns`.

`queuePromisesProcess` is a wrapper of the `chainProcessPromises`, the call signature makes it easier to call with `Reflect.apply`

#### dist/clone-deep

- cloneDeepCheap (obj: AnyType)
- cloneDeep (obj: AnyType)

`cloneDeepCheap` only able to clone object, internally using `JSON`
`cloneDeep` will able to clone all kinds of deep structure object even a class instance (which could be expensive operation).

#### dist/common

- parseJson (json: AnyType, t = true): JSON | json | Error
- createEvtName (...args: string[]): string
- nil () => boolean (false)
- showDeep (code: unknown): void
- formatStr (str: string, ...args: Array<AnyType>): string

`formatStr` example:

```js
const str = 'I want to go from {0} to {1}'

const output = formatStr(str, 'zero', 'one')

// I want to go from zero to one
```

#### dist/convert

- strToNum (input: string, t = false): number
- strToBool (input: string, t = false): boolean

#### dist/dasherize

- dasherize (str: string): string

#### dist/empty

- isEmptyObj (obj: AnyType): boolean
- isNotEmpty (param: unknown): boolean
- notEmpty (a: unknown, valueCheck = false): boolean
- isEmpty (value: unknown, valueCheck?: boolean): boolean

#### dist/get-dirname (node.js only!)

- getDirname (url: string): string

This is only use in ESM env in node.js

```js
// there is no __dirname in ESM env
const __dirname = getDirname(import.meta.url)
```

#### dist/is-equal

- isEqualCheap (obj1: unknown, obj2: unknown): boolean
- isEqual (obj1: unknown, obj2: unknown)

`isEqualCheap` can only compare two object, `isEqual` can compare anything

#### dist/is-function

- isFunction (prop: unknown, debug = false): boolean
- isAsyncFunction (prop: unknown): boolean

#### dist/jwt

- parseJWT (token: string): unknown

It returns typed as `unknown` is follow the standard, you have to cast it again when your own structure. In the future release, we might create our own type for a standard JWT decoded object type.

#### dist/lodash

- curry (fn: AnyType, ...args: AnyType[])
- merge (target: AnyType, ...sources: AnyType[])
- flatMap (arr: AnyType[], callback?: FlatMapCallback)
- isString (value: unknown): boolean

_These methods used to included from `lodash-es` now we implement them ourself, and cut down the library size to just 5kb_

#### dist/logger

- logger (wrapper for console.log to use in browser, set `window.DEBUG=true` then it will show)

#### dist/obj-define-props

- objDefineProps (obj: AnyType, name: string, setter: AnyType, getter = null)
- objHasProp (obj: AnyType, name: string)
- injectToFn (resolver: JsonqlResolver | JsonqlAsyncResolver, name: string, data: AnyType, overwrite = false)

#### dist/object

- isObject (o: AnyType): boolean
- isPlainObject (o: AnyType): boolean
- isClass (o: AnyType): boolean
- getConfigValue (name: string, obj: object)
- assign (...args: unknown[]): unknown
- extend (alias to `assign`)
- arrToObj (args: unknown[], processor: MapCallback, initValue = {}): AnyType
- objectHasKey (obj: object, key: string): boolean
- readOnly (config: object): AnyType

#### dist/promise

- promsie async (cb: AnyType)

`new Promise` wrapper save a bit typing

#### dist/regex

- isRegExp (pat: AnyType): boolean
- getRegex (pattern: string | RegExp): RegExp | string | boolean

#### dist/timestamp

- timestamp (sec = false): number

Default return mil-seconds

#### dist/truetypeof

- trueTypeOf (obj: AnyType): string

*Special Thank you to (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com*

#### dist/urls

- urlParams (url: string, params: AnyType): string
- cacheBurstUrl (url: string): string
- cacheBurst (name = '_cb')

---

Please check [jsonql](https://jsonql.js.org) for more information.

---

Joel Chu (c) 2022
