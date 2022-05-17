# @jsonql/validator

_This was call `jsonql-param-validator` now move into the `@jsonql` scope with many additional features_

**We are now making it a general purpose validation library to use with Javascript / Typescript project**

## Usage

```ts
import { ValidatorFactory } from '@jsonql/validator'
// @TODO how to get the ast
const validator = new ValidatorFactory(ast: Array<JsonqlPropertyParamMap>)

validator.validate(values)
        .then(result => {
          // a list of your method argument name with value
        })
        .catch(error => {
          console.log(error.details)
          // contains position where your validation failed
        })
```

### Type JsonqlPropertyParamMap

This is what the `ast` looks like, we use our other plugin `@jsonql/ast`
to generate this automatically, but you can write your own

```ts
declare type JsonqlPropertyParamMap = {
  name: string // the argument name
  required: boolean
  type: any
  tstype?: string
  types?: any
  optional?: boolean // alias will remove in the future
  // rules get contractured the moment we init the object
  rules: Array<JsonqlValidateCbFn> = []
  // tmp will be occasionally we MIGHT have to store it
  tmp?: Array<JsonqlValidationRule>
}
```

Example: @TODO

## Decorator

@TODO

## Register your plugin

```ts
import { ValidatorFactory } from '@jsonql/validator'
// @TODO how to get the ast
const validator = new ValidatorFactory(ast)

validator.registerPlugin('myPlugin', { main: (value: any): boolean => {
  // must return boolean
}})

validator.registerPlugin('myPluginRequireArg', {
  main: (arg1: number, arg2: number, value: any): boolean => {
    // do things with it
  },
  params: ['arg1', 'arg2']
})

```

More coming soon


---

[Joel Chu](https://joelchu.com)

[NEWBRAN LTD](https://newbran.ch) / [TO1SOURCE CN](https://to1source.com) (c) 2022
