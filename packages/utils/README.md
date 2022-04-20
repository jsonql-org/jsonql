# @jsonql/utils

> This is a dependency module for various jsonql node / browser modules. Not intend to use directly

Please check [jsonql](https://jsonql.js.org) for more information.

### How to use

When using purely in browser environment, you should use `@jsonql/utils/browser`

When using it within your JS / TS development, most of the methods can be found in `@jsonql/utils`
Where the node only methods will be in `@jsonql/utils/node`

## Complete list of all available functions

When use with build tool, for better tree shaking. You need to import them directly.
Please reference which functions in what file below

#### src/chain-fns.ts

- chainFns

#### src/chain-promises.ts

- chainPromises
- chainProcessPromises

#### src/contract.ts

- checkIsContract
- isContract (alias to checkIsContract but when it's true return the contract itself)
- extractSocketPart
- groupByNamespace
- getNamespaceInOrder
- extractArgsFromPayload
- extractParamsFromContract

#### src/timestamp.ts

- timestamp

#### src/dasherize.ts

- dasherize

#### src/urls.ts

- urlParams
- cacheBurstUrl
- cacheBurst

#### src/generic.ts

- inArray
- toArray
- objectHasKey
- createEvtName
- getConfigValue
- parseJson
- isNotEmpty
- isFunc
- nil (placeholder function always return false)
- assign (alias to Object.assign)
- readOnly (alias to Object.freeze)

#### src/logger.ts

- logger (wrapper for console.log to use in browser, set `window.DEBUG=true` then it will show)

#### src/obj-define-props.ts

- objDefineProps
- objHasProp
- injectToFn

#### src/params-api.ts

- toPayload
- formatPayload
- getNameFromPayload
- createDeliverable
- createQuery
- createQueryStr
- createMutation
- createMutationStr
- getQueryFromArgs
- processPayload
- getQueryFromPayload
- getMutationFromArgs
- getMutationFromPayload

#### src/results.ts

- getCallMethod
- packResult
- isJsonqlErrorObj
- packError
- resultHandler

### For node only

### src/jsonql-handler.ts

- isJsonqlPath
- isJsonqlRequest
- isJsonqlConsoleUrl

#### src/node/node-error.ts

- replaceErrors
- printError

#### src/node/node-find-from-contract.ts

- findFromContract

#### src/node/node-middleware.ts

- getDocLen
- headerParser
- isHeaderPresent
- getPathToFn


---

Joel Chu (c) 2022
