# jsonql-utils

> This is a dependency module for various jsonql node / browser modules. Not intend to use directly

Please check [jsonql](https://jsonql.js.org) for more information.

## complete list of all available functions

When use with build tool, for better tree shaking. You need to import them directly.
Please reference which functions in what file below

### Browser and node.js

#### src/chain-fns.js

- chainFns

#### src/chain-promises.js

- chainPromises
- chainProcessPromises

#### src/contract.js

- checkIsContract
- isContract (alias to checkIsContract but when it's true return the contract itself)
- extractSocketPart
- groupByNamespace
- getNamespaceInOrder
- extractArgsFromPayload
- extractParamsFromContract

#### src/timestamp.js

- timestamp

#### src/dasherize.js

- dasherize

#### src/urls.js

- urlParams
- cacheBurstUrl
- cacheBurst

#### src/generic.js

- inArray
- toArray
- parse
- isObjectHasKey
- createEvt
- getConfigValue
- toJson
- isNotEmpty
- isFunc
- nil (placeholder function always return false)
- assign (alias to Object.assign)
- freeze (alias to Object.freeze)

#### src/logger.js

- logger (wrapper for console.log to use in browser, set `window.DEBUG=true` then it will show)

#### src/obj-define-props.js

- objDefineProps
- objHasProp
- injectToFn

#### src/params-api.js

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

#### src/results.js

- getCallMethod
- packResult
- isJsonqlErrorObj
- packError
- resultHandler

### For node.js only

### src/jsonql-handler.js

- isJsonqlPath
- isJsonqlRequest
- isJsonqlConsoleUrl

#### src/node-error.js

- replaceErrors
- printError

#### src/node-find-from-contract.js

- findFromContract

#### src/node-koa.js

- handleOutput
- handleHtmlOutput
- ctxErrorHandler
- forbiddenHandler

#### src/node-middleware.js

- getDocLen
- headerParser
- isHeaderPresent
- getPathToFn


## Breaking change (0.6.4)

The `module` now only export the browser used modules. The `main` field comes with everything including all the node.js one.

For browser package, you want to do this

```js
import { chainFns } from 'jsonql-utils/module'
```

But this doesn't help with the tree shaking (Tree shaking is a total lie anyway). So you might want to
import like what it show in the above section.

For node/cjs then just do it like you normally would.

```js

const { chainFns } = require('jsonql-utils')

```

---

ISC

Joel Chu (c) 2020
