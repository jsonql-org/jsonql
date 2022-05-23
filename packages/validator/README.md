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
          // The same that comes in - if there is default value then nit will be apply
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
// @TODO should we have two different types map 1 for external use?
declare type JsonqlPropertyParamMap = {
  name: string // the argument name
  required: boolean
  type: any
  tstype?: string
  types?: any // this is internal generated
  optional?: boolean // alias will remove in the future
  validate?: (value: unknown) => boolean
  validateAsync?: (value: unknown) => Promise<boolean>
  // rules get create the moment we init the object
  rules?: Array<JsonqlValidateCbFn> = []
  // Internal use only, we MIGHT have to store it for reference later
  tmp?: Array<JsonqlValidationRule>
}
```

Here is an example of a normal function using our customized ast extractor

```ts
export default function baselineFn(value1: string, value2: number, value3 = false): string {

  return `${value1} with number ${value2} ${value3 ? ' fine' : ' or not'}`
}
```
_please note our extractor only support default export - not export
this is to do with how we organize code within a `jsonql` project
but fear not if this doesn't work for you. The way we build our `@jsonql/ast` is
like many small parts, and you can easily mix and match to build one for your need_

Then it will transform into this for the `validator`:

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

_Note that we **ONLY** use the `ast.baselineFn` part which is an array,
because the `validator` only cares about the argument parameter
and nothing else_

When use with Javascript, you can create your own AST map like the above example,
and it will able to understand your parameter types.

## Register your plugin

```ts
import { ValidatorFactory } from '@jsonql/validator'
// See above example how to get the ast
const validator = new ValidatorFactory(ast)

validator.registerPlugin('myStandardPlugin', {
  main: (value: any): boolean => {
  // must return boolean
  }
})

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

Then when you need to execute your `validator`

```ts

validator.addValidationRules([
  {plugin: 'myPlugin', arg1: 100, arg2: 200}
])

validator.validate([101])
          .then((result: any) => {
            // result will be an object
            // {arg: 101}
          })
          .catch((err: JsonqlValidationError) => {
            // look for err.detail

            // if this fail you will get an array contain two number
            // [1,0]
            // what that means is it failed the second rule (zero based index) on the first position
            // the built in type checking rule always comes first
          })

```

At first it might sound weird why the Error return `[argNameIndex, validationRuleIndex]`.
The reason behind this is because we need to have a super tiny format that travel between server side / client side. Instead of adding loads of code just to deal with an Error message. We just tell you the position which rule failed. And you can map it out yourself. And the up side is - you can map it in multiple languages, in different code, your imagination is the limitation :)

## mapErrorsMessage method

@TODO we will provide a method for you to map the `[argNameIndex, validationRuleIndex]` to a message you specify. This will be particularly useful in the <abbr title="User Interface">UI</abbr>.

## The built-in rule supported types

The build in rules only support primitive types: `string`, `number`, `boolean`, `array` checking (without value check, just `Array.isArray`) and `object` (`typeof`) check. If you need complex array or object key/value check, please <abbr title="Do It Yourself">DIY</abbr> that's what the plugin is for!  

## Built-in plugins

All the built-in plugins provide by another packaage, please see [@jsonql/validator-core]('../valdiator-core/README.md') for more info.

## Writing plugin vs writing function

Apart from creating a plugin, you could just pass a function or Async function directly.

```ts
// continue from previous example
// using name parameter
validator.addValidationRules({
  value2: {
    name: 'myExtraRule1', // you can omit this and we provide a automatically generate name
    validate: function(value: number) {
      return value > 1000
    }
  }
})
```

The above method will automatically insert into the validation sequence right after the built-in rule (in our example, which is checking if your input value is a number)

If this fail then you will get `[1,1]` as an error result.

You could also add async method (all rules convert to async internally):

```ts
// let say we want to validate an email address against the database
validator.addValidatorRules({
  email: {
    name: 'MyServerSideCheck',
    validateAsync: async function(value: string) {
      return db.checkIfExists(value)
        .then(result => {
          return true
        })
        .catch(error => {
          return false
        })
    }
  }
})
```

All the function(s) expect a true / false `boolean` return result and nothing else.  

Next will explain more when we use with our jsonql / velocejs system, and how you can fine tune your client / server side validation.



## Server side only validation rule

**@TODO will be available in next release**

By default, all your inline plugin, `validate`, `validateAsync` function will treat as `server: true`
what that means is, when using our jsonql / velocejs system, the contract will not contain (@TODO in the next release) those validation info.

The reason is, very often on a SPA system, you validate user input on your <abbr title="User Interface">UI</abbr> once then the same rule will run again on the server side. Which is a lot of duplicate, and in our example about validate a email address, you might want to do some server side only check (i.e. check against the database). We provide this mapping to separate rules for front end / back end. Hence improve the overall performance.  

More to come.

---

[Joel Chu](https://joelchu.com)

[NEWBRAN LTD](https://newbran.ch) / [TO1SOURCE CN](https://to1source.com) (c) 2022
