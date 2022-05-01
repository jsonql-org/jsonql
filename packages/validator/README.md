# @jsonql/validator

_This was call `jsonql-param-validator` now move into the `@jsonql` scope with many additional features_

**We are now making it a general purpose validation library to use with Typescript project**

## Usage

```ts
import { ValidatorFactory } from '@jsonql/validator'
// @TODO how to get the ast
const validator = new ValidatorFactory(ast)

validator.validate(values)
        .then(result => {
          // a list of your method argument name with value
        })
        .catch(error => {
          console.log(error.details)
          // contains position where your validation failed
        })
```

## Decorator

## Register your plugin

```ts
import { ValidatorFactory } from '@jsonql/validator'
// @TODO how to get the ast
const validator = new ValidatorFactory(ast)

validator.registerPlugin('myPlugin', { main: (value: any): boolean => {
  // your validation the result must be boolean
}})

validator.registerPlugin('myPluginRequireArg', {
  main: (arg1: number, arg2: number, value: any): boolean => {
    // do things with it
  },
  params: ['arg1', 'arg2']
})


```




---

[Joel Chu](https://joelchu.com)

[NEWBRAN LTD](https://newbran.ch) / [TO1SOURCE CN](https://to1source.com) (c) 2022
