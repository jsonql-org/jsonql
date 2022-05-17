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

Here is an example of a normal function using our customized ast extractor

```ts
export default function baselineFn(value1: string, value2: number, value3 = false): string {

  return `${value1} with number ${value2} ${value3 ? ' fine' : ' or not'}`
}
```
_please note we our extractor only support default export - not export
this is todo with how we organize code within a jsonql project
but fear not if this doesn't work for you. The way we build our @jsonql/ast is
like many small parts, and you can easily mix and match to build one for your need_

Then it will transform into this for the validator:

```json
{
  "baselineFn": [
    {
      "name": "value1",
      "required": true,
      "type": "string"
    },
    {
      "name": "value2",
      "required": true,
      "type": "number"
    },
    {
      "name": "value3",
      "required": true,
      "type": "boolean",
      "defaultvalue": false
    }
  ]
}
```

To use with the `@jsonql/validator`

```ts
const validator = new ValidatorFactory(ast.baselineFn)
```

_Note that we take the `baselineFn` part which is an array,
because the validator only cares about the argument parameter
and nothing else_

So to use with Javascript, you can create your own ast map like the above example, and it will able to understand your parameter types.

## Register your plugin

```ts
import { ValidatorFactory } from '@jsonql/validator'
// @TODO how to get the ast
const validator = new ValidatorFactory(ast)

validator.registerPlugin('myPlugin', { main: (value: any): boolean =&lt; {
  // must return boolean
}})

validator.registerPlugin('myPluginRequireArg', {
  main: (arg1: number, arg2: number, value: any): boolean => {
    // do things with it
  },
  params: ['arg1', 'arg2']
})

```

There are required fields when you build a plugin with extra argument:

- `name: string` - the name of the plugin, and we will check if its collide with one of our own (see the complete list below)
- `main: Function: boolean` - the actual function to perform the validation. It expect a boolean return for validator to know if the validation is success or not.
- `params: Array<string>` - the parameters name used in your `main` function, see the `value` which is the value that gets validate **MUST** be the last of the argument. The reason is during run time, we curry your function first and pass into a queue system to run the value. See example below

Curry main function example:

```ts
// your function
function main(arg1: number, arg2: number, value: any) {
  return value >= arg2 && value < arg2
}
const queueFn = curry(main)(arg1, arg2) // see how we get that value from example below
queueFn(value): boolean
```

Then when you need to execute your validator

```ts

validator.addValidationRules([
  {plugin: 'myPlugin', arg1: 100, arg2: 200}
])

validator.validate([101])
          .then((result: any) => {
            // result will be an object
            // {arg: 101}
          })
          .catch((err: Array<numbebr>) => {
            // if this fail you will get an array contain two number
            // [1,0]
            // what that means is it failed the second rule (zero based index) on the first position
            // the built in type checking rule always comes first
          })

```

At first it might sound weird why the Error return `Array<number>`. The reason behind this is because we need to have a super tiny format that travel between server side / client side. Instead of adding loads of code just to deal with an Error message. We just tell you the position which rule failed. And you can map it out yourself. And the up side is - you can map it in multiple languages, in different code, your imagination is the limitation :)

## Different types

The build in rules only support all primitive types: string, number, boolean, array checking (without value check, just `Array.isArray`) and object (`typeof`) check. If you need complex array or object check - that's what the plugin is for!  

## Built-in plugins

All the built-in plugins provide by another packaage, please see [@jsonql/validator-core]('../valdiator-core/README.md') for more info.

## Server side only validation

@TODO

## Writing plugin vs writing function

@TODO

---

[Joel Chu](https://joelchu.com)

[NEWBRAN LTD](https://newbran.ch) / [TO1SOURCE CN](https://to1source.com) (c) 2022
