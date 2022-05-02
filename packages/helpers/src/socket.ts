// There are the socket related methods ported back from
// ws-server-core and ws-client-core
import {
  WS_REPLY_TYPE,
  WS_EVT_NAME,
  WS_DATA_NAME,
  TIMESTAMP_PARAM_NAME,
  ERROR_KEY,
  EMIT_REPLY_TYPE,
  EMIT_SEND_TYPE,
  ACKNOWLEDGE_REPLY_TYPE
} from '@jsonql/constants'
import {
  JsonqlError,
  JsonqlValidationError
} from '@jsonql/errors'
import { isString } from './lodash'
import { createDeliverable, formatPayload } from './params-api'
import { parseJson, objectHasKey, nil } from './common'
import { timestamp } from './timestamp'

const PAYLOAD_NOT_DECODED_ERR = 'payload can not decoded'
const WS_KEYS = [
  WS_REPLY_TYPE,
  WS_EVT_NAME,
  WS_DATA_NAME
]

/////////////////////////////////////
//         REPLY FROM SERVER       //
/////////////////////////////////////

/**
 * This will be a event emit from the client using the send method
 * But we have to change the server to understand it
 */
export const createSendPayload = (
  resolverName: string,
  args: any[],
  str = false
) => {
  if (isString(resolverName) && Array.isArray(args)) {
    const payload = formatPayload(args)
    // the different is we add a additonal type in the payload
    const result = createDeliverable(resolverName, payload, { type: EMIT_SEND_TYPE })

    return str ? JSON.stringify(result) : result
  }

  throw new JsonqlValidationError(`utils:socket:createSendMsg`, {
    resolverName,
    args,
    message: 'expect resolverName to be string and args to be array!'
  })
}

/**
 * We need to find the TS field and take it out from the previous payload
 * otherwise it will keep on rolling into the structure which is not what we wanted
 * @BUG this never works, the new version of the contract will have a META field to hold this info
 */
const getTsFieldFromData = (data: any) => {
  const obj = {
    data: {}
  }
  obj[TIMESTAMP_PARAM_NAME] = []
  if (data[TIMESTAMP_PARAM_NAME]) {
    const ts = data[TIMESTAMP_PARAM_NAME]
    obj[TIMESTAMP_PARAM_NAME] = Array.isArray(ts) ? ts : [ts]

    delete data[TIMESTAMP_PARAM_NAME]
  }
  obj.data = data

  return obj
}


/**
 * The ws doesn't have a acknowledge callback like socket.io
 * so we have to DIY one for ws and other that doesn't have it
 */
export const createWsReply = (
  type: string,
  resolverName: string,
  data: any,
  ts: any[] = []): string => {
  const obj = getTsFieldFromData(parseJson(data))
  ts = ts.concat(obj[TIMESTAMP_PARAM_NAME])
  if (!ts.length) {
    ts.push(timestamp())
  }
  return JSON.stringify({
    data: {
      [WS_REPLY_TYPE]: type,
      [WS_EVT_NAME]: resolverName,
      [WS_DATA_NAME]: obj.data
    },
    [TIMESTAMP_PARAM_NAME]: ts
  })
}

// extended function
export const createReplyMsg = (resolverName: string, data: any, ts = []) => (
  createWsReply(EMIT_REPLY_TYPE, resolverName, data, ts)
)

export const createAcknowledgeMsg = (resolverName: string, data: any, ts = []) => (
  createWsReply(ACKNOWLEDGE_REPLY_TYPE, resolverName, data, ts)
)

/**
 * Check if this is a ws reply
 */
export const isWsReply = (payload: any): any => {
  const json = isString(payload) ? parseJson(payload) : payload
  const { data } = json
  if (data) {
    const result = WS_KEYS.filter(key => objectHasKey(data, key))

    return (result.length === WS_KEYS.length) ? data : false
  }

  return false
}

/**
 * Extract data from ws payload
 */
export const extractWsPayload = (payload: any, cb = nil) => {
  try {
    const json = parseJson(payload)
    // now handle the data
    let _data: any
    if ((_data = isWsReply(json)) !== false) {
      // note the ts property is on its own
      Reflect.apply(cb, null, ['_data', _data])

      return {
        data: parseJson(_data[WS_DATA_NAME]),
        resolverName: _data[WS_EVT_NAME],
        type: _data[WS_REPLY_TYPE]
      }
    }
    throw new JsonqlError(PAYLOAD_NOT_DECODED_ERR, payload)
  } catch(e) {

    return Reflect.apply(cb, null, [ERROR_KEY, e])
  }
}
