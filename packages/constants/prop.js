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
export const IS_LOGIN_PROP_KEY = 'isLogin'