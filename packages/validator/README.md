# @jsonql/validator

_This was call `jsonql-param-validator` now move into the `@jsonql` scope with many additional features_

**We are now making it a general purpose validation library to use with Typescript project**

The follow documentation awaiting update.

---

This is for use with [jsonql](https://jsonql.js.org) server and client side for type validation, using the `contract` as reference point.

_This project has been rewritten from ground up with Typescript_

~~The default export is in `umd` format. There is also an `cjs` version in the dist folder
named `jsonql-params-validator.cjs.js` for use with node.js~~

For validation you can use the following methods:

```js
import {
  validateSync,
  validateAsync,
  normalizeArgs,
  isObject
} from '@jsonql/validator'
```

- `validateSync` this is the only one that we need to call `validate(args, params) = Array`
- `validateAsync` same as above but return a promise `validateAsync(args, params) = Promise`
- `normalizeArgs` this is export main for use on the client side `normalizeArgs(args, params)`
- `isObject` this is a wrapper of our `checkIsObject` method to check if the argument is a plain object

For detail please refer to documentation (work in progress at the moment)

If you have problem to import the module, you might need to do

```js

jsonqlParamsValidator.default

```

## Utility for checking configuration

We also have several methods for checking configuration input, and make sure they are what we expected.
The reason we create this is during years of development, how often you find a bug that you never come across
when user is using your software - and it turns out the end user is passing a wrong configuration property that
cause it? Or the wrong type of the value you expect it. And we heavily use this across our entire jsonql tool set
to ensure developer are passing the right configurations, hence to eliminated potential bug.

```js
const {
  checkConfig, // sync version
  checkConfigAsync, // return promise
  constructConfig
} = require('jsonql-params-validator')
```

**TBC about how to use them**

## Custom Errors for checking

We also export 3 custom errors that we throw from within the validation function. And you can use them to check
against your code to know what went wrong with your configuration. This will be in a separate package [jsonql-errors](https://www.npmjs.com/package/jsonql-errors)

```js
import {
  JsonqlTypeError,
  JsonqlEnumError ,
  JsonqlCheckerError
} from '@jsonql/errors'
```

Example:

```js
import { BOOLEAN_TYPE, NUMBER_TYPE, STRING_TYPE } from '@jsonql/constants'

let appProps = {
  importantProp: constructConfig(true, BOOLEAN_TYPE),
  anotherProp: constructConfig(123, NUMBER_TYPE),
  anythingProp: constructConfig('*', [NUMBER_TYPE, STRING_TYPE])
}
let constProps = {
  propDontWantToChange: 'I-must-be-here!'
}

let config = {importantProp: 'ok'}; // passing a string?!

checkConfigAsync(config, appProps, constProps)
  .then(result => {
    // do your thing
  })
  .catch(error => {
    if (error instanceof JsonqlTypeError) {
      console.error(`The config value for ${error.message} you passed is wrong!`)
    }
  })
```

---

[Joel Chu](https://joelchu.com)

[NEWBRAN LTD](https://newbran.ch) / [TO1SOURCE CN](https://to1source.com) (c) 2022
