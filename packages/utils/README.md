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

- accessByPath

#### dist/chain-fns

- chainFns

#### dist/chain-promises

- chainPromises
- chainProcessPromises
- queuePromisesProcess

#### dist/clone-deep

- cloneDeepCheap
- cloneDeep

#### dist/common

- inArray
- toArray
- parseJson
- createEvtName
- nil
- showDeep
- formatStr

### dist/convert

- strToNum
- strToBool

#### dist/dasherize

- dasherize

### dist/empty

- isEmptyObj
- isNotEmpty
- notEmpty
- isEmpty

### dist/is-equal

- isEqualCheap
- isEqual

### dist/is-function

- isFunction
- isAsyncFunction

### dist/jwt

- parseJWT

### dist/lodash

- curry
- merge
- flatMap
- isString

_These methods used to included from `lodash-es` now we implement them ourself, and cut down the library size to just 5kb_

#### dist/logger

- logger (wrapper for console.log to use in browser, set `window.DEBUG=true` then it will show)

#### dist/obj-define-props

- objDefineProps
- objHasProp
- injectToFn

### dist/object

- isObject
- isPlainObject
- isClass
- getConfigValue
- assign
- arrToObj
- objectHasKey
- readOnly

### regex

- isRegExp
- getRegex

#### dist/timestamp

- timestamp

### dist/truetypeof

- trueTypeOf

*Special Thank you to (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com*

#### dist/urls

- urlParams
- cacheBurstUrl
- cacheBurst

---

Please check [jsonql](https://jsonql.js.org) for more information.

---

Joel Chu (c) 2022
