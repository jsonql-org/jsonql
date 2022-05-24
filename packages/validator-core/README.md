# @jsonql/validator-core

This library provide all the core validation functions for couple other libraries.
Also it has a plugin system, and some commonly use plugins to help with the validation.

## ValidatorPlugins

As of version 0.8.0, we move all the plugins related methods into this module. And this will be able to share between many different
`@jsonql/validator` instance to use, instead of every time we init a `ValidatorFactory` and have to load all the plugins again.

More to come 

## About the plugin system

The core library provide function to validate against primitive types and their value.
When we need to test the value in a more specific way, we can use the plugin system.
Also this plugin system allow developer to create their own plugin to suit their specific need.

A plugin file looks like this:

```ts
// test for integer
const name = "int"

function main(value: number): boolean {
  return Number.isInteger(value)
}

export default {
  name,
  main,
}
```

If you require additional parameter:

```ts
// example from our built-in plugin between

// between
import moreThan from './more-than'
import lessThan from './less-than'

const name = 'between'

function main(
  max: number,
  min: number,
  value: number | string
): boolean {

  return lessThan.main(max, value) && moreThan.main(min, value)
}

// so when we register it, we know what param we should expect
export default {
  main,
  name,
  params: ['max', 'min']
}

```

The `value` that will get validate **MUST** be the last argument. Because we will curry the main method before insert into our validation queue system.

## Built-in plugins

Here is list of available built-in plugins:

### between

```ts
{ plugin: 'between', max: 100, min: 1}
```

Check a number or string (length) is `< max` and `> min`

### email

```ts
{ plugin: 'email'}
```

Check if the input is email address

### int

```ts
{ plugin: 'int' }
```

Check if the value is an signed integer

### lessThanEqual

```ts
{ plugin: 'lessThanEqual', num: 100}
```

Check if a number or string (length) is `=< num`

### lessThan

```ts
{ plugin: 'lessThan', num: 100}
```

Check if a number or string (length) is `< num`

### moreThanEqual

```ts
{ plugin: 'moreThanEqual', num: 100}
```

Check if a number or string (length) is `>= num`

### moreThan

```ts
{ plugin: 'moreThan', num: 100}
```

Check if a number of string (length) is `> num`

### uint

```ts
{ plugin: 'uint' }
```

Check if a number is a unsigned integer (>=0)

### within

```ts
{ plugin: 'within', max: 100, min: 1}
```

Check if a number or string (length) is `<= max` and `>= min`

---

[JSONQL](https://jsonql.org)
