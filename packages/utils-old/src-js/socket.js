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
} from 'jsonql-constants'
import { JsonqlError, JsonqlValidationError } from 'jsonql-errors' 
import isString from 'lodash-es/isString'
import isArray from 'lodash-es/isArray'

import { createDeliverable, formatPayload } from './params-api'
import { toJson, isObjectHasKey, nil } from './generic'
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
 * @param {string} resolverName name of resolver ot call 
 * @param {array} args for the resolver
 * @param {boolean} str true then stringify it 
 * @return {object} formatted payload
 */
export const createSendPayload = (resolverName, args, str = false) => {
  if (isString(resolverName) && isArray(args)) {
    let payload = formatPayload(args)
    // the different is we add a additonal type in the payload 
    const result = createDeliverable(resolverName, payload, {type: EMIT_SEND_TYPE})
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
 * @param {object} data for inspection
 * @return {object} { data: for the data to use, TS if there is any }
 */
const getTsFieldFromData = (data) => {
  let obj = {[TIMESTAMP_PARAM_NAME]: [], data: {}}
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
 * @param {string} type of reply
 * @param {string} resolverName which is replying
 * @param {*} data payload
 * @param {array} [ts= []] the last received ts, if any  
 * @return {string} stringify json
 */
export const createWsReply = (type, resolverName, data, ts = []) => {
  const obj = getTsFieldFromData(toJson(data))
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
export const createReplyMsg = (resolverName, data, ts = []) => (
  createWsReply(EMIT_REPLY_TYPE, resolverName, data, ts)
)

export const createAcknowledgeMsg = (resolverName, data, ts = []) => (
  createWsReply(ACKNOWLEDGE_REPLY_TYPE, resolverName, data, ts)
)

/**
 * @param {string|object} payload should be string when reply but could be transformed
 * @return {boolean} true is OK
 */
export const isWsReply = payload => {
  const json = isString(payload) ? toJson(payload) : payload
  const { data } = json
  if (data) {
    let result = WS_KEYS.filter(key => isObjectHasKey(data, key))
    return (result.length === WS_KEYS.length) ? data : false
  }
  return false
}

/**
 * @param {string|object} data received data
 * @param {function} [cb=nil] this is for extracting the TS field or when it's error
 * @return {object} false on failed
 */
export const extractWsPayload = (payload, cb = nil) => {
  try {
    const json = toJson(payload)
    // now handle the data
    let _data
    if ((_data = isWsReply(json)) !== false) {
      // note the ts property is on its own 
      cb('_data', _data)
      
      return {
        data: toJson(_data[WS_DATA_NAME]),
        resolverName: _data[WS_EVT_NAME],
        type: _data[WS_REPLY_TYPE]
      }
    }
    throw new JsonqlError(PAYLOAD_NOT_DECODED_ERR, payload)
  } catch(e) {
    return cb(ERROR_KEY, e)
  }
}
