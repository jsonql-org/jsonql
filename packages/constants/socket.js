// the constants file is gettig too large
// we need to split up and group the related constant in one file
// also it makes the other module easiler to id what they are importing
// use throughout the clients
export const SOCKET_PING_EVENT_NAME = '__ping__' // when init connection do a ping
export const SWITCH_USER_EVENT_NAME = '__switch__'
export const LOGIN_EVENT_NAME = '__login__'
export const LOGOUT_EVENT_NAME = '__logout__'
// when ws switch on standalone mode then we add this event to allow
// perform a standalone login method
export const SA_LOGIN_EVENT_NAME = '__standalone_login__'

// when we receive the token and decode the userdata
// we will inject two more properties into the userdata object
export const SOCKET_CLIENT_ID_KEY = '__socket_client_id_key__'
export const SOCKET_CLIENT_TS_KEY = '__socket_client_ts_key__'
// at the moment we only have __logout__ regardless enableAuth is enable
// this is incorrect, because logout suppose to come after login
// and it should only logout from auth nsp, instead of clear out the
// connection, the following new event @1.9.2 will correct this edge case
// although it should never happens, but in some edge case might want to
// disconnect from the current server, then re-establish connection later
export const CONNECT_EVENT_NAME = '__connect__'
// we still need the connected event because after the connection establish 
// we need to change a state within the client to let the front end know that 
// it's current hook up to the server but we don't want to loop back the client 
// inside the setup phrase, intead just trigger a connected event and the listener 
// setup this property 
export const CONNECTED_EVENT_NAME = '__connected__'
export const DISCONNECT_EVENT_NAME = '__disconnect__'
// instead of using an event name in place of resolverName in the param
// we use this internal resolverName instead, and in type using the event names
export const INTERCOM_RESOLVER_NAME = '__intercom__'
// group the inter communcation event name in one then for the server
// to create a handler to handle this kind of event
// export const INTER_COM_EVENT_NAME = '__inter_com__'
export const INTER_COM_EVENT_NAMES = [
  CONNECT_EVENT_NAME,
  SWITCH_USER_EVENT_NAME,
  DISCONNECT_EVENT_NAME
]
// for ws servers
export const WS_REPLY_TYPE = '__reply__'
export const WS_EVT_NAME = '__event__'
export const WS_DATA_NAME = '__data__'
export const WS_IS_REPLY_KEYS = [
  WS_REPLY_TYPE,
  WS_EVT_NAME,
  WS_DATA_NAME
]

// for ws client, 1.9.3 breaking change to name them as FN instead of PROP
export const ON_MESSAGE_FN_NAME = 'onMessage'
export const ON_RESULT_FN_NAME = 'onResult' // this will need to be internal from now on
export const ON_ERROR_FN_NAME = 'onError'
export const ON_READY_FN_NAME = 'onReady'
export const ON_LOGIN_FN_NAME = 'onLogin' // new @1.8.6
// the actual method name client.resolverName.send
export const SEND_MSG_FN_NAME = 'send'
export const EMIT_MSG_FN_NAME = 'emit' // this is just an alias to send
export const ON_MSG_FN_NAME = 'on'
export const TO_MSG_FN_NAME = 'to'
// this one is for nodeClient inject into the resolver
export const CLIENT_PROP_NAME = 'client'
export const USERDATA_PROP_NAME = 'userdata'

// this is somewhat vague about what is suppose to do
export const EMIT_REPLY_TYPE = 'emit_reply'
// this is a new event for a may be feature
export const EMIT_SEND_TYPE = 'emit_send' 
export const ACKNOWLEDGE_REPLY_TYPE = 'emit_acknowledge'
// this is for inter communication 
export const INTER_EMIT_SEND_TYPE = 'inter_emit_send'
export const INTER_EMIT_REPLY_TYPE = 'inter_emit_reply'

export const NSP_GROUP = 'nspGroup'
export const PUBLIC_NAMESPACE = 'publicNamespace'

export const JS_WS_SOCKET_IO_NAME = 'socket.io'
export const JS_WS_NAME = 'ws'
export const JS_PRIMUS_NAME = 'primus'
export const GO_WS_COOLPY7_NAME = 'coolpy7'


// this is the default time to wait for reply if exceed this then we
// trigger an error --> 5 seconds
export const DEFAULT_WS_WAIT_TIME = 5000
export const DEFAULT_RETRY_TIME = 3000 // 1.9.0
export const TIMEOUT_ERR_MSG = 'timeout'
export const NOT_LOGIN_ERR_MSG = 'NOT LOGIN'
// for crypto operation
export const BASE64_FORMAT = 'base64'
export const HEX_FORMAT = 'hex'
export const UTF8_FORMAT = 'utf8'
export const RSA_FORMATS = [
  BASE64_FORMAT,
  HEX_FORMAT
]
export const RSA_ALGO = 'RS256'
export const HSA_ALGO = 'HS256'
export const JWT_SUPPORT_ALGOS = [
  RSA_ALGO,
  HSA_ALGO
]
export const RSA_PRIVATE_KEY_HEADER = 'BEGIN RSA PRIVATE KEY'
export const RSA_MIN_MODULE_LEN = 1024
export const RSA_MAX_MODULE_LEN = 4096
export const TOKEN_PARAM_NAME = 'token'
export const IO_ROUNDTRIP_LOGIN = 'roundtip'
export const IO_HANDSHAKE_LOGIN = 'handshake'
export const IO_LOGIN_METHODS = [
  IO_ROUNDTRIP_LOGIN,
  IO_HANDSHAKE_LOGIN
]

export const PEM_EXT = 'pem'
export const PUBLIC_KEY_NAME = 'publicKey'
export const PRIVATE_KEY_NAME = 'privateKey'

export const DEFAULT_PUBLIC_KEY_FILE = [PUBLIC_KEY_NAME, PEM_EXT].join('.')
export const DEFAULT_PRIVATE_KEY_FILE = [PRIVATE_KEY_NAME, PEM_EXT].join('.')

export const NSP_AUTH_CLIENT = 'nspAuthClient'
export const NSP_CLIENT = 'nspClient'

// this is the value for TOKEN_DELIVER_LOCATION_PROP_KEY
export const TOKEN_IN_HEADER = 'header'
export const TOKEN_IN_URL = 'url'

