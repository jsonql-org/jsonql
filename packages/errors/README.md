# @jsonql/errors

**This package was call jsonql-errors and now publish under the @jsonql scope.
The old package offer several different format for use. But now only offer as `.mjs`
Javascript module (because this is not really a standalone package and mainly use for develop other modules)
**
---

This module exports custom Error class for developer to use.
When the server side throw error, the client side will try to throw exactly
the same error and as developer you can clearly understand what is happening.



## Example

```js
// bunch of setup
client.query.getSomething(1)
  .then(result => /* do your thing */)
  .catch(err => {
    if (err instanceof JsonqlValidateError) {
      // update your UI to show the validation error

    } else if (err instanceof Jsonql500Error) {
      // ooops the server is down
    } else {
      // then this will NOT be an error throw from jsonql system
    }
  })
```

## List of Errors

### Server side errors

- Jsonql406Error
- Jsonql500Error
- JsonqlAuthorisationError
- JsonqlContractAuthError
- JsonqlResolverAppError
- JsonqlResolverNotFoundError

### Check Options errors

- JsonqlCheckerError
- JsonqlEnumError
- JsonqlTypeError

### Share errors

- JsonqlValidationError
- JsonqlError
- JsonqlServerError

### general error

This is a standalone error type for use in a different type of module.

- GeneralError

## Functions

This package also export several useful functions, and we use this
across multiple jsonql modules.

### getErrorByStatus

Get the error class name by it's status code, use on client side

arguments:
- statusCode {number} the status code
- contract {boolean} if this is from the contract *hack*

returns:
- {string} the name of the error class

### clientErrorsHandler

Check the resolver return result for error, use on client side

arguments:
- result {object} after we call a resolver and check the result if it's contain an error

returns:
- {object} if its passed then just return the result or throw a new error

### finalCatch

Repackage the error throw from the application

arguments:
- e {object} the error we catch

returns:
- throw the correct structure in our own error classes

### getErrorNameByInstance

Compare a list of errors class with the error we catch, then get it's name

arguments:
- errs {array} list of error classes
- e {object} the error object we captured

returns:
- {string} the name of the error class or `unknown` if it's not ours

## CONSTANTS

There are two constants export from this module as well

- `JSONQL_ERRORS_INFO` gives you the version number
- `UNKNOWN_ERROR` this is to use with the `getErrorNameByInstance` when we could not determine what type of error it is.




---

ISC (c) 2019 NEWBRAN LTD / TO1SOURCE.CN
