// test with the server side throw error
const test = require('ava')
const server = require('./helpers/server-throw')
const superkoa = require('superkoa')
const { SERVER_INTERNAL_STATUS } = require('jsonql-constants')
test.before( t => {
  t.context.app = server(true)
})

test('It should able to catch the 500 and extract a payload', async t => {
  let res = await superkoa(t.context.app)
    .post('/jsonql')
    .query({_cb: Date.now()})
    // .set(thisHeader)
    .send({
      helloWorld: {
        args: []
      }
    })

  
    // also test the jsonql-constants
  t.is(res.status, SERVER_INTERNAL_STATUS)

})
