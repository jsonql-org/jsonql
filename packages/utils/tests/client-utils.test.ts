// testing the client utils methods
const test = require('ava')
const { chainPromises, VERSION } = require('../main')
const { join } = require('path')
const fsx = require('fs-extra')
const pkg = fsx.readJsonSync(join(__dirname, '..', 'package.json'))


test(`It should have the version field`, t => {
  t.is(VERSION, pkg.version)
})


test.cb('The promises should be resolve one after the other even the early one resolve in a timer', t => {
  t.plan(3)
  const results = ['first', 'second', 'third']

  const p1 = () => new Promise(resolver => {
    setTimeout(() => {
      resolver(results[0])
    }, 1000)
  })
  const p2 = () => new Promise(resolver => {
    setTimeout(() => {
      resolver(results[1])
    }, 300)
  })
  const p3 = () => new Promise(resolver => {
    resolver(results[2])
  })

  chainPromises([p1(), p2(), p3()])
    .then(res => {
      res.forEach((r, i) => {
        t.is(r, results[i])
      })
      t.end()
    })
})
