import test from 'ava'

import { tsFileParser } from '../src'

test(`Test the tsFileParser`, async t => {
  t.plan(1)

  const code = `function login(username: string, password: string) {
    return { username, password }
  }`
  // here is the catch if we try to use toString() then we lost
  // the type info because it's already compiled as javascript
  return tsFileParser(code)
            .then(result => {
              console.log(result)
              t.truthy(result)
            })

})
