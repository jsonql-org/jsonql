import test from 'ava'


test(`When throw inside a catch should lead to another catch`, async t => {
  t.plan(1)

  function testFn() {
    return Promise.reject(false)
  }

  async function testFnWrapper() {
    return testFn()
            .catch(() => {
              throw new Error(`ooops`)
            })
            .catch((err) => {
              throw new Error(err.message + ' again!!!')
            })
  }

  return testFnWrapper()
            .then(() => {
              console.log(`Shouldn't see me here`)
            })
            .catch(err => {
              t.is('ooops again!!!', err.message)
              // t.pass()
            })
})
