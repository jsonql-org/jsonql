// test with the server side throw error
import test from 'ava'
import superkoa from 'superkoa'
import server from './helpers/server-throw'
import { SERVER_INTERNAL_STATUS } from '@jsonql/constants'

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

  // also test the @jsonql/constants
  t.is(res.status, SERVER_INTERNAL_STATUS)

})
