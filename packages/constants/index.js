/* ast */

// for generate ast with SWC
export const EXPORT_TYPE = 'ExportDeclaration'
export const EXPORT_DEFAULT_TYPE = 'ExportDefaultDeclaration'

export const DECLARATION_NAME = 'declaration'
export const DECLARATION_SHORT_NAME = 'decl'
export const ANNOTATION_NAME = 'typeAnnotation'

export const CLASS_TYPE = 'ClassDeclaration'
export const CLASS_METHOD = 'ClassMethod'
// why swc came out with different key?
export const CLASS_EXP = 'ClassExpression'

export const ASSIGN_PATTERN = 'AssignmentPattern'

export const OBJ_EXP = 'ObjectExpression'
export const ARR_EXP = 'ArrayExpression'
export const BOO_LIT = 'BooleanLiteral'
export const NUM_LIT = 'NumericLiteral'
export const STR_LIT = 'StringLiteral'
// this is not very good but it's a key word from swc
export const ELEM_TYPE = 'elemType'

export const TS_KEY_TYPE = 'TsKeywordType'
export const TS_UNION_TYPE = 'TsUnionType'
export const TS_ARRAY_TYPE = 'TsArrayType'

export const TS_ANNO_NAME = 'TsTypeAnnotation'
// when they type inline along the params
export const TS_TYPE_LIT = 'TsTypeLiteral'
// when pass a type reference we just treat them as object
export const TS_TYPE_REF = 'TsTypeReference'
// this is for us to id what that is 
export const TS_TYPE_NAME = 'tstype'
/* base */

export const EXT = 'js' // we might do a ts in the future
export const TS_EXT = 'ts'

export const HELLO = 'Hello world!'
export const HELLO_FN = 'helloWorld'
// the core stuff to id if it's calling with jsonql
export const DATA_KEY = 'data'
export const ERROR_KEY = 'error'
export const HEADERS_KEY = 'headers'

export const JSONQL_PATH = 'jsonql'
// according to the json query spec
export const CONTENT_TYPE = 'application/vnd.api+json'
export const CHARSET = 'charset=utf-8'
export const DEFAULT_HEADER = {
  'Accept': CONTENT_TYPE,
  'Content-Type': [ CONTENT_TYPE, CHARSET ].join('')
}

// export const INDEX = 'index' use INDEX_KEY instead
export const DEFAULT_TYPE = 'any'
// contract file names
// export const DEFAULT_FILE_NAME = 'contract.json' // @TODO remove once all changed
// export const PUBLIC_FILE_NAME = 'public-contract.json' // @TODO remove once all changed
export const DEFAULT_CONTRACT_FILE_NAME = 'contract.json'
export const PUBLIC_CONTRACT_FILE_NAME = 'public-contract.json'
// this is for the ES6 module import and export @TODO remove later
export const DEFAULT_RESOLVER_LIST_FILE_NAME = 'resolver.js'
export const DEFAULT_RESOLVER_IMPORT_FILE_NAME = 'import.js'

export const MODULE_TYPE = 'module'
export const SCRIPT_TYPE = 'script'

// @TODO remove this is not in use
// export const CLIENT_CONFIG_FILE = '.clients.json'
// export const CONTRACT_CONFIG_FILE = 'jsonql-contract-config.js'
// type of resolvers
export const QUERY_NAME = 'query'
export const MUTATION_NAME = 'mutation'
export const SOCKET_NAME = 'socket'
// we need to add a new field to the contract so it won't create confusion
export const SOCKET_AUTH_NAME = 'socket-auth'
// the following are for the next development features
export const EXTERNAL_NAME = 'external'
export const INTERCEPTOR_NAME = 'interceptor'
export const PLUGIN_NAME = 'plugin'
export const CONTRACT_NAME = 'contract'
export const MIDDLEWARE_NAME = 'middleware'

export const RESOLVER_TYPES = [
  QUERY_NAME,
  MUTATION_NAME,
  SOCKET_NAME,
  SOCKET_AUTH_NAME
]
// for calling the mutation
export const PAYLOAD_PARAM_NAME = 'payload' // @TODO shortern them
export const CONDITION_PARAM_NAME = 'condition'
export const RESOLVER_PARAM_NAME = 'resolverName'
export const QUERY_ARG_NAME = 'args'
export const TIMESTAMP_PARAM_NAME = 'TS'
export const MUTATION_ARGS = [
  RESOLVER_PARAM_NAME,
  PAYLOAD_PARAM_NAME,
  CONDITION_PARAM_NAME
]
// new jsonp
export const JSONP_CALLBACK_NAME = 'jsonqlJsonpCallback'

// methods allow
export const API_REQUEST_METHODS = ['POST', 'PUT']
export const CONTRACT_REQUEST_METHODS = ['GET', 'HEAD']
// for  contract-cli
export const KEY_WORD = 'continue'
export const PUBLIC_KEY = 'public'
export const PRIVATE_KEY = 'private'


// author
export const AUTH_TYPE = 'auth'
export const AUTH_NAME = AUTH_TYPE // alias
export const LOGIN_FN_NAME = 'login'
// export const ISSUER_NAME = LOGIN_NAME // legacy issue need to replace them later
export const LOGOUT_FN_NAME = 'logout'
export const VALIDATOR_FN_NAME = 'validator'
export const DISCONNECT_FN_NAME = 'disconnect'
export const SWITCH_USER_FN_NAME = 'switch-user'

export const AUTH_HEADER = 'Authorization'
export const AUTH_CHECK_HEADER = 'authorization' // this is for checking so it must be lowercase
export const BEARER = 'Bearer'

// for client use @TODO need to clean this up some of them are not in use
export const CREDENTIAL_STORAGE_KEY = 'jsonqlcredential'
export const CLIENT_STORAGE_KEY = 'jsonqlstore'
export const CLIENT_AUTH_KEY = 'jsonqlauthkey'
// for id the multiple storage engine
export const INDEX_KEY = 'index'
// contract key
export const CONTRACT_KEY_NAME = 'X-JSONQL-CV-KEY'
export const SHOW_CONTRACT_DESC_PARAM = {desc: 'y'}
// directories
export const DEFAULT_RESOLVER_DIR = 'resolvers'
export const DEFAULT_CONTRACT_DIR = 'contracts'
export const DEFAULT_KEYS_DIR = 'keys'
// add in V1.3.4 start supporting socket

// for validation
export const CJS_TYPE = 'cjs'
export const ES_TYPE = 'es'
export const TS_TYPE = 'ts'
export const ACCEPTED_JS_TYPES = [
  CJS_TYPE,
  ES_TYPE
] // not accept this TS_TYPE at the moment

// for contract cli
export const RETURN_AS_FILE = 'file'
export const RETURN_AS_JSON = 'json'
export const RETURN_AS_ENUM = [
  RETURN_AS_FILE,
  RETURN_AS_JSON
]

export const NO_ERROR_MSG = 'No message'
export const NO_STATUS_CODE = -1

// status
export const SUCCESS_STATUS = 200
export const UNAUTHORIZED_STATUS = 401
export const FORBIDDEN_STATUS = 403
export const NOT_FOUND_STATUS = 404
export const NOT_ACCEPTABLE_STATUS = 406
export const SERVER_INTERNAL_STATUS = 500
// just whatever
export const DEFAULT_PORT_NUM = 6557
// headers
export const CSRF_HEADER_KEY = 'X-CSRF-Token'
export const ORIGIN_HEADER_KEYS = ['Origin']
export const WILD_CARD_CHAR = '*'

/* prop */

// this is all the key name for the config check map
// all subfix with prop_key

export const TYPE_KEY = 'type'
export const OPTIONAL_KEY = 'optional'
export const ENUM_KEY = 'enumv'  // need to change this because enum is a reserved word
export const ARGS_KEY = 'args'
export const CHECKER_KEY = 'checker'
export const ALIAS_KEY = 'alias'
// @TODO remove this later
export const CHECKED_KEY = '__checked__'

// first part port from the ws-server-core
export const APP_DIR_PROP_KEY = 'appDir'

export const AUTH_TO_PROP_KEY = 'authTimeout'
export const ENABLE_AUTH_PROP_KEY = 'enableAuth'
export const USE_JWT_PROP_KEY = 'useJwt'
export const RESOLVER_DIR_PROP_KEY = 'resolverDir'
export const CONTRACT_DIR_PROP_KEY = 'contractDir'

export const INIT_CONNECTION_FN_NAME_PROP_KEY = 'initConnectionHandlerName'
export const LOGIN_FN_NAME_PROP_KEY = 'loginHandlerName'
export const LOGOUT_FN_NAME_PROP_KEY = 'logoutHandlerName'
export const DISCONNECT_FN_NAME_PROP_KEY = 'disconnectHandlerName'
export const SWITCH_USER_FN_NAME_PROP_KEY = 'switchUserHandlerName'
// this has changed and now make more sense
export const PUBLIC_FN_DIR_PROP_KEY = 'publicResolverDir'
export const PRIVATE_FN_DIR_DROP_KEY = 'privateResolverDir'

// socket specific
export const ALGORITHM_PROP_KEY = 'algorithm'
export const KEYS_DIR_PROP_KEY = 'keysDir'
export const SOCKET_IO_AUTH_TYPE_PROP_KEY = 'socketIoAuthType'
export const SERVER_INIT_OPT_PROP_KEY = 'serverInitOption'
// type name and Alias
export const SOCKET_TYPE_PROP_KEY = 'serverType' //1.9.1
export const SOCKET_TYPE_CLIENT_ALIAS = 'socketClientType' // 1.9.0
export const SOCKET_TYPE_SERVER_ALIAS = 'socketServerType' // 1.9.1

export const CSRF_PROP_KEY = 'csrf'
export const ALLOW_ORIGIN_PROP_KEY = 'allowOrigin'

export const STANDALONE_PROP_KEY = 'standalone'
export const DEBUG_ON_PROP_KEY = 'debugOn'

export const HOSTNAME_PROP_KEY = 'hostname'
export const NAMESAPCE_PROP_KEY = 'namespace'
export const FILE_PROP_KEY = 'file'

export const WS_OPT_PROP_KEY = 'wsOptions'

export const CONTRACT_PROP_KEY = 'contract'
export const TOKEN_PROP_KEY = 'token'

export const INIT_CLIENT_PROP_KEY = 'nodeClient'
export const INIT_CONTRACT_PROP_KEY = 'initContract'
export const CONTENT_TYPE_PROP_KEY = 'contentType'
export const RETURN_AS_PROP_KEY = 'returnAs'
export const NAME_PROP_KEY = 'appName'

export const EXPIRED_PROP_KEY = 'expired'
export const APP_ROOT_DIR_PROP_KEY = 'appRootDir'

export const JWT_TOKEN_OPT_PROP_KEY = 'jwtTokenOption'

export const ENABLE_JSONP_PROP_KEY = 'enableJsonp'

export const CONTRACT_WITH_DESC_PROP_KEY = 'contractWithDesc'
export const WITH_PUBLIC_CONTRACT_PROP_KEY = 'withPublicContract'
export const PUBLIC_KEY_NAME_PROP_KEY = 'publicKeyFileName'
export const PRIVATE_KEY_NAME_PROP_KEY = 'privateKeyFileName'

export const PUBLIC_NAMESPACE_PROP_KEY = 'publicNamespace'
export const PRIVATE_NAMESPACE_PROP_KEY = 'privateNamespace'
export const SECRET_PROP_KEY = 'secret'
export const NSP_INFO_PROP_KEY = 'nspInfo'

export const RSA_MODULE_LEN_PROP_KEY = 'rsaModulusLength'

export const JSONQL_PATH_PROP_KEY = 'jsonqlPath'

export const CONTRACT_KEY_PROP_KEY = 'contractKey'
export const CONTRACT_KEY_NAME_PROP_KEY = 'contractKeyName'

export const ENABLE_WEB_CONSOLE_PROP_KEY = 'enableWebConsole'
export const JS_TYPE_PROP_KEY = 'jsType'

export const EXPOSE_ERR_PROP_KEY = 'exposeError'

export const CLIENT_CONFIG_PROP_KEY = 'clientConfig'
// this will combine all three options together
// because they are redudant if set this to true
// then whenever start up will build a fresh new contract like now
// if false then the developer has to manually build the contract
// which is what production suppose to be
export const AUTO_CONTRACT_PROP_KEY = 'autoCreateContract'
// still under development
export const VALIDATE_RETURNS_PROP_KEY = 'validateReturns'
export const ENABLE_UPLOAD_PROP_KEY = 'enableFileUpload'
export const FILE_UPLOAD_NAME_PROP_KEY = 'fileUploadName'
export const FILE_UPLOAD_DIST_PROP_KEY = 'fileUploadDist'
export const FILE_HANDLER_FN_NAME_PROP_KEY = 'fileHandlerName'

export const ENABLE_SPLIT_TASK_PROP_KEY = 'enableSplitTask'

export const CONNECTED_PROP_KEY = 'connected'

// share naming to id the cache store object 
export const CACHE_STORE_PROP_KEY = 'cacheStore'
export const EVENT_EMITTER_PROP_KEY = 'eventEmitter'
// track this key if we want to suspend event on start
export const SUSPEND_EVENT_PROP_KEY = 'suspendOnStart'
// if we want to enable caching the resolver or not
export const ENABLE_CACHE_RESOLVER_PROP_KEY = 'enableCacheResolver'
// we could pass the token in the header instead when init the WebSocket 
export const TOKEN_DELIVER_LOCATION_PROP_KEY = 'tokenDeliverLocation'

export const COOKIE_PROP_KEY = 'cookie'
// for tracking the login and connect state for socket client 
export const IS_READY_PROP_KEY = 'isReady'
export const IS_LOGIN_PROP_KEY = 'isLogin'/* socket */

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

/* validation */

// validation related constants


export const OR_SEPERATOR = '|'

export const BOOLEAN_TYPE = 'boolean'
export const STRING_TYPE = 'string'
export const NUMBER_TYPE = 'number'
export const ARRAY_TYPE = 'array'
export const OBJECT_TYPE = 'object'

export const FUNCTION_TYPE = 'function'
export const ANY_TYPE = 'any'
// when validator need to register new types
// these will be the type that allow to based upon
export const BASED_PRIMITIVE_TYPES = [
  NUMBER_TYPE,
  STRING_TYPE,
  // BOOLEAN_TYPE, // is there anything can be extend from here? 
  ARRAY_TYPE,
  OBJECT_TYPE,
]

export const NUMBER_TYPES = ['int', 'integer', 'float', 'double', 'decimal']
// supported types
export const SUPPORTED_TYPES = [
  NUMBER_TYPE,
  STRING_TYPE,
  BOOLEAN_TYPE,
  ARRAY_TYPE,
  OBJECT_TYPE,
  ANY_TYPE
]

export const ARRAY_TS_TYPE_LFT = 'Array<'
export const ARRAY_TYPE_LFT = 'array.<'
export const ARRAY_TYPE_RGT = '>'
