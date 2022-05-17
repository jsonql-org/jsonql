# @jsonql/validator-core

This library provide all the core validation functions for couple other libraries.
Also it has a plugin system, and some commonly use plugins to help with the validation.

## About the plugin system

The core library provide function to validate against primitive types and their value.
When we need to test the value in a more specific way, we can use the plugin system.
Also this plugin system allow developer to create their own plugin to suit their specific need.

A plugin file looks like this:

```ts
// test for integer
export const name = "int"

function main(value: number): boolean {
  return Number.isInteger(value)
}

export default {
  name,
  main,
}
```

## Built-in plugins



---

[JSONQL](https://jsonql.org)
