// move the test from ws-server-core here
// just testing the timestamp prop and see how we could develop it further 
const test = require('ava')
const { EMIT_REPLY_TYPE, EMIT_SEND_TYPE, TIMESTAMP_PARAM_NAME } = require('jsonql-constants')
const { toJson, createWsReply, extractWsPayload, createSendPayload } = require('../main')
const debug = require('debug')('jsonql-utils:test:socket')


test(`extractWsPayload should able to decode a string message`, t => {
  const stockPayload = `{"data":{"__reply__":"acknowledge_reply","__event__":"availableToEveryone","__data__":"You get a public message"},"TS":[1583992711332]}`

  const json = extractWsPayload(stockPayload)

  debug('json', json)

  t.truthy(json.data)
})


test(`It should have a timestamp property as an array`, t => {

  const type = EMIT_REPLY_TYPE
  const resolverName = 'dummyFn'
  const data = { txt: 'I just fart'}

  const payload = createWsReply(type, resolverName, data)

  const json = toJson(payload)

  // debug('payload', json)

  t.truthy(json.data, 'Should have a data property in the payload')

  t.truthy(json[TIMESTAMP_PARAM_NAME].length, 'The TS field should be on its own')

  const callback = (type, ts) => {
    debug(type, 'ts from callback', ts)
  }

  const received = extractWsPayload(payload, callback)

  debug('received payload', received)

  const receivedAgain = extractWsPayload(payload)

  debug('received payload again to test without a funciton', receivedAgain)
})

test(`test the new createSendPayload method for ws`, t => {

  const result = createSendPayload('someResolver', ['a', 'b'])

  t.is(typeof result, 'object')

  t.is(result.type, EMIT_SEND_TYPE)

  const strResult = createSendPayload('someResolver', [1,2,3], true)

  t.is(typeof strResult, 'string')
})

