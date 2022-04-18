(() => {
  // src/base.mjs
  var EXT = "js";
  var TS_EXT = "ts";
  var HELLO = "Hello world!";
  var HELLO_FN = "helloWorld";
  var DATA_KEY = "data";
  var ERROR_KEY = "error";
  var HEADERS_KEY = "headers";
  var JSONQL_PATH = "jsonql";
  var CONTENT_TYPE = "application/vnd.api+json";
  var CHARSET = "charset=utf-8";
  var DEFAULT_HEADER = {
    "Accept": CONTENT_TYPE,
    "Content-Type": [CONTENT_TYPE, CHARSET].join("")
  };
  var DEFAULT_TYPE = "any";
  var DEFAULT_CONTRACT_FILE_NAME = "contract.json";
  var PUBLIC_CONTRACT_FILE_NAME = "public-contract.json";
  var DEFAULT_RESOLVER_LIST_FILE_NAME = "resolver.js";
  var DEFAULT_RESOLVER_IMPORT_FILE_NAME = "import.js";
  var MODULE_TYPE = "module";
  var SCRIPT_TYPE = "script";
  var QUERY_NAME = "query";
  var MUTATION_NAME = "mutation";
  var SOCKET_NAME = "socket";
  var SOCKET_AUTH_NAME = "socket-auth";
  var EXTERNAL_NAME = "external";
  var INTERCEPTOR_NAME = "interceptor";
  var PLUGIN_NAME = "plugin";
  var CONTRACT_NAME = "contract";
  var MIDDLEWARE_NAME = "middleware";
  var RESOLVER_TYPES = [
    QUERY_NAME,
    MUTATION_NAME,
    SOCKET_NAME,
    SOCKET_AUTH_NAME
  ];
  var PAYLOAD_PARAM_NAME = "payload";
  var CONDITION_PARAM_NAME = "condition";
  var RESOLVER_PARAM_NAME = "resolverName";
  var QUERY_ARG_NAME = "args";
  var TIMESTAMP_PARAM_NAME = "TS";
  var MUTATION_ARGS = [
    RESOLVER_PARAM_NAME,
    PAYLOAD_PARAM_NAME,
    CONDITION_PARAM_NAME
  ];
  var JSONP_CALLBACK_NAME = "jsonqlJsonpCallback";
  var API_REQUEST_METHODS = ["POST", "PUT"];
  var CONTRACT_REQUEST_METHODS = ["GET", "HEAD"];
  var KEY_WORD = "continue";
  var PUBLIC_KEY = "public";
  var PRIVATE_KEY = "private";
  var AUTH_TYPE = "auth";
  var AUTH_NAME = AUTH_TYPE;
  var LOGIN_FN_NAME = "login";
  var LOGOUT_FN_NAME = "logout";
  var VALIDATOR_FN_NAME = "validator";
  var DISCONNECT_FN_NAME = "disconnect";
  var SWITCH_USER_FN_NAME = "switch-user";
  var AUTH_HEADER = "Authorization";
  var AUTH_CHECK_HEADER = "authorization";
  var BEARER = "Bearer";
  var CREDENTIAL_STORAGE_KEY = "jsonqlcredential";
  var CLIENT_STORAGE_KEY = "jsonqlstore";
  var CLIENT_AUTH_KEY = "jsonqlauthkey";
  var INDEX_KEY = "index";
  var CONTRACT_KEY_NAME = "X-JSONQL-CV-KEY";
  var SHOW_CONTRACT_DESC_PARAM = { desc: "y" };
  var DEFAULT_RESOLVER_DIR = "resolvers";
  var DEFAULT_CONTRACT_DIR = "contracts";
  var DEFAULT_KEYS_DIR = "keys";
  var CJS_TYPE = "cjs";
  var ES_TYPE = "es";
  var TS_TYPE = "ts";
  var ACCEPTED_JS_TYPES = [
    CJS_TYPE,
    ES_TYPE
  ];
  var RETURN_AS_FILE = "file";
  var RETURN_AS_JSON = "json";
  var RETURN_AS_ENUM = [
    RETURN_AS_FILE,
    RETURN_AS_JSON
  ];
  var NO_ERROR_MSG = "No message";
  var NO_STATUS_CODE = -1;
  var SUCCESS_STATUS = 200;
  var UNAUTHORIZED_STATUS = 401;
  var FORBIDDEN_STATUS = 403;
  var NOT_FOUND_STATUS = 404;
  var NOT_ACCEPTABLE_STATUS = 406;
  var SERVER_INTERNAL_STATUS = 500;
  var DEFAULT_PORT_NUM = 6557;
  var CSRF_HEADER_KEY = "X-CSRF-Token";
  var ORIGIN_HEADER_KEYS = ["Origin"];
  var WILD_CARD_CHAR = "*";

  // src/prop.mjs
  var TYPE_KEY = "type";
  var OPTIONAL_KEY = "optional";
  var ENUM_KEY = "enumv";
  var ARGS_KEY = "args";
  var CHECKER_KEY = "checker";
  var ALIAS_KEY = "alias";
  var CHECKED_KEY = "__checked__";
  var APP_DIR_PROP_KEY = "appDir";
  var AUTH_TO_PROP_KEY = "authTimeout";
  var ENABLE_AUTH_PROP_KEY = "enableAuth";
  var USE_JWT_PROP_KEY = "useJwt";
  var RESOLVER_DIR_PROP_KEY = "resolverDir";
  var CONTRACT_DIR_PROP_KEY = "contractDir";
  var INIT_CONNECTION_FN_NAME_PROP_KEY = "initConnectionHandlerName";
  var LOGIN_FN_NAME_PROP_KEY = "loginHandlerName";
  var LOGOUT_FN_NAME_PROP_KEY = "logoutHandlerName";
  var DISCONNECT_FN_NAME_PROP_KEY = "disconnectHandlerName";
  var SWITCH_USER_FN_NAME_PROP_KEY = "switchUserHandlerName";
  var PUBLIC_FN_DIR_PROP_KEY = "publicResolverDir";
  var PRIVATE_FN_DIR_DROP_KEY = "privateResolverDir";
  var ALGORITHM_PROP_KEY = "algorithm";
  var KEYS_DIR_PROP_KEY = "keysDir";
  var SOCKET_IO_AUTH_TYPE_PROP_KEY = "socketIoAuthType";
  var SERVER_INIT_OPT_PROP_KEY = "serverInitOption";
  var SOCKET_TYPE_PROP_KEY = "serverType";
  var SOCKET_TYPE_CLIENT_ALIAS = "socketClientType";
  var SOCKET_TYPE_SERVER_ALIAS = "socketServerType";
  var CSRF_PROP_KEY = "csrf";
  var ALLOW_ORIGIN_PROP_KEY = "allowOrigin";
  var STANDALONE_PROP_KEY = "standalone";
  var DEBUG_ON_PROP_KEY = "debugOn";
  var HOSTNAME_PROP_KEY = "hostname";
  var NAMESAPCE_PROP_KEY = "namespace";
  var FILE_PROP_KEY = "file";
  var WS_OPT_PROP_KEY = "wsOptions";
  var CONTRACT_PROP_KEY = "contract";
  var TOKEN_PROP_KEY = "token";
  var INIT_CLIENT_PROP_KEY = "nodeClient";
  var INIT_CONTRACT_PROP_KEY = "initContract";
  var CONTENT_TYPE_PROP_KEY = "contentType";
  var RETURN_AS_PROP_KEY = "returnAs";
  var NAME_PROP_KEY = "appName";
  var EXPIRED_PROP_KEY = "expired";
  var APP_ROOT_DIR_PROP_KEY = "appRootDir";
  var JWT_TOKEN_OPT_PROP_KEY = "jwtTokenOption";
  var ENABLE_JSONP_PROP_KEY = "enableJsonp";
  var CONTRACT_WITH_DESC_PROP_KEY = "contractWithDesc";
  var WITH_PUBLIC_CONTRACT_PROP_KEY = "withPublicContract";
  var PUBLIC_KEY_NAME_PROP_KEY = "publicKeyFileName";
  var PRIVATE_KEY_NAME_PROP_KEY = "privateKeyFileName";
  var PUBLIC_NAMESPACE_PROP_KEY = "publicNamespace";
  var PRIVATE_NAMESPACE_PROP_KEY = "privateNamespace";
  var SECRET_PROP_KEY = "secret";
  var NSP_INFO_PROP_KEY = "nspInfo";
  var RSA_MODULE_LEN_PROP_KEY = "rsaModulusLength";
  var JSONQL_PATH_PROP_KEY = "jsonqlPath";
  var CONTRACT_KEY_PROP_KEY = "contractKey";
  var CONTRACT_KEY_NAME_PROP_KEY = "contractKeyName";
  var ENABLE_WEB_CONSOLE_PROP_KEY = "enableWebConsole";
  var JS_TYPE_PROP_KEY = "jsType";
  var EXPOSE_ERR_PROP_KEY = "exposeError";
  var CLIENT_CONFIG_PROP_KEY = "clientConfig";
  var AUTO_CONTRACT_PROP_KEY = "autoCreateContract";
  var VALIDATE_RETURNS_PROP_KEY = "validateReturns";
  var ENABLE_UPLOAD_PROP_KEY = "enableFileUpload";
  var FILE_UPLOAD_NAME_PROP_KEY = "fileUploadName";
  var FILE_UPLOAD_DIST_PROP_KEY = "fileUploadDist";
  var FILE_HANDLER_FN_NAME_PROP_KEY = "fileHandlerName";
  var ENABLE_SPLIT_TASK_PROP_KEY = "enableSplitTask";
  var CONNECTED_PROP_KEY = "connected";
  var CACHE_STORE_PROP_KEY = "cacheStore";
  var EVENT_EMITTER_PROP_KEY = "eventEmitter";
  var SUSPEND_EVENT_PROP_KEY = "suspendOnStart";
  var ENABLE_CACHE_RESOLVER_PROP_KEY = "enableCacheResolver";
  var TOKEN_DELIVER_LOCATION_PROP_KEY = "tokenDeliverLocation";
  var COOKIE_PROP_KEY = "cookie";
  var IS_READY_PROP_KEY = "isReady";
  var IS_LOGIN_PROP_KEY = "isLogin";

  // src/socket.mjs
  var SOCKET_PING_EVENT_NAME = "__ping__";
  var SWITCH_USER_EVENT_NAME = "__switch__";
  var LOGIN_EVENT_NAME = "__login__";
  var LOGOUT_EVENT_NAME = "__logout__";
  var SA_LOGIN_EVENT_NAME = "__standalone_login__";
  var SOCKET_CLIENT_ID_KEY = "__socket_client_id_key__";
  var SOCKET_CLIENT_TS_KEY = "__socket_client_ts_key__";
  var CONNECT_EVENT_NAME = "__connect__";
  var CONNECTED_EVENT_NAME = "__connected__";
  var DISCONNECT_EVENT_NAME = "__disconnect__";
  var INTERCOM_RESOLVER_NAME = "__intercom__";
  var INTER_COM_EVENT_NAMES = [
    CONNECT_EVENT_NAME,
    SWITCH_USER_EVENT_NAME,
    DISCONNECT_EVENT_NAME
  ];
  var WS_REPLY_TYPE = "__reply__";
  var WS_EVT_NAME = "__event__";
  var WS_DATA_NAME = "__data__";
  var WS_IS_REPLY_KEYS = [
    WS_REPLY_TYPE,
    WS_EVT_NAME,
    WS_DATA_NAME
  ];
  var ON_MESSAGE_FN_NAME = "onMessage";
  var ON_RESULT_FN_NAME = "onResult";
  var ON_ERROR_FN_NAME = "onError";
  var ON_READY_FN_NAME = "onReady";
  var ON_LOGIN_FN_NAME = "onLogin";
  var SEND_MSG_FN_NAME = "send";
  var EMIT_MSG_FN_NAME = "emit";
  var ON_MSG_FN_NAME = "on";
  var TO_MSG_FN_NAME = "to";
  var CLIENT_PROP_NAME = "client";
  var USERDATA_PROP_NAME = "userdata";
  var EMIT_REPLY_TYPE = "emit_reply";
  var EMIT_SEND_TYPE = "emit_send";
  var ACKNOWLEDGE_REPLY_TYPE = "emit_acknowledge";
  var INTER_EMIT_SEND_TYPE = "inter_emit_send";
  var INTER_EMIT_REPLY_TYPE = "inter_emit_reply";
  var NSP_GROUP = "nspGroup";
  var PUBLIC_NAMESPACE = "publicNamespace";
  var JS_WS_SOCKET_IO_NAME = "socket.io";
  var JS_WS_NAME = "ws";
  var JS_PRIMUS_NAME = "primus";
  var GO_WS_COOLPY7_NAME = "coolpy7";
  var DEFAULT_WS_WAIT_TIME = 5e3;
  var DEFAULT_RETRY_TIME = 3e3;
  var TIMEOUT_ERR_MSG = "timeout";
  var NOT_LOGIN_ERR_MSG = "NOT LOGIN";
  var BASE64_FORMAT = "base64";
  var HEX_FORMAT = "hex";
  var UTF8_FORMAT = "utf8";
  var RSA_FORMATS = [
    BASE64_FORMAT,
    HEX_FORMAT
  ];
  var RSA_ALGO = "RS256";
  var HSA_ALGO = "HS256";
  var JWT_SUPPORT_ALGOS = [
    RSA_ALGO,
    HSA_ALGO
  ];
  var RSA_PRIVATE_KEY_HEADER = "BEGIN RSA PRIVATE KEY";
  var RSA_MIN_MODULE_LEN = 1024;
  var RSA_MAX_MODULE_LEN = 4096;
  var TOKEN_PARAM_NAME = "token";
  var IO_ROUNDTRIP_LOGIN = "roundtip";
  var IO_HANDSHAKE_LOGIN = "handshake";
  var IO_LOGIN_METHODS = [
    IO_ROUNDTRIP_LOGIN,
    IO_HANDSHAKE_LOGIN
  ];
  var PEM_EXT = "pem";
  var PUBLIC_KEY_NAME = "publicKey";
  var PRIVATE_KEY_NAME = "privateKey";
  var DEFAULT_PUBLIC_KEY_FILE = [PUBLIC_KEY_NAME, PEM_EXT].join(".");
  var DEFAULT_PRIVATE_KEY_FILE = [PRIVATE_KEY_NAME, PEM_EXT].join(".");
  var NSP_AUTH_CLIENT = "nspAuthClient";
  var NSP_CLIENT = "nspClient";
  var TOKEN_IN_HEADER = "header";
  var TOKEN_IN_URL = "url";

  // src/validation.mjs
  var OR_SEPERATOR = "|";
  var FUNCTION_TYPE = "function";
  var STRING_TYPE = "string";
  var BOOLEAN_TYPE = "boolean";
  var ARRAY_TYPE = "array";
  var OBJECT_TYPE = "object";
  var ANY_TYPE = "any";
  var NUMBER_TYPE = "number";
  var NUMBER_TYPES = ["int", "integer", "float", "double", "decimal"];
  var SUPPORTED_TYPES = [
    NUMBER_TYPE,
    STRING_TYPE,
    BOOLEAN_TYPE,
    ARRAY_TYPE,
    OBJECT_TYPE,
    ANY_TYPE
  ];
  var ARRAY_TS_TYPE_LFT = "Array<";
  var ARRAY_TYPE_LFT = "array.<";
  var ARRAY_TYPE_RGT = ">";
})();
