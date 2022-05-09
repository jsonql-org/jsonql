export const EXT = 'js' // we might do a ts in the future
export const TS_EXT = 'ts'

export const HELLO = 'Hello world!'
export const HELLO_FN = 'helloWorld'

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
