module.exports = {
    "EXPORT_TYPE": "ExportDeclaration",
    "EXPORT_DEFAULT_TYPE": "ExportDefaultDeclaration",
    "DECLARATION_NAME": "declaration",
    "DECLARATION_SHORT_NAME": "decl",
    "ANNOTATION_NAME": "typeAnnotation",
    "CLASS_TYPE": "ClassDeclaration",
    "CLASS_METHOD": "ClassMethod",
    "CLASS_EXP": "ClassExpression",
    "FUNC_EXP": "FunctionExpression",
    "ASSIGN_PATTERN": "AssignmentPattern",
    "OBJ_EXP": "ObjectExpression",
    "ARR_EXP": "ArrayExpression",
    "BOO_LIT": "BooleanLiteral",
    "NUM_LIT": "NumericLiteral",
    "STR_LIT": "StringLiteral",
    "ELEM_TYPE": "elemType",
    "TYPE_NAME": "typeName",
    "TYPE_PARAMS": "typeParams",
    "TS_KEY_TYPE": "TsKeywordType",
    "TS_UNION_TYPE": "TsUnionType",
    "TS_ARRAY_TYPE": "TsArrayType",
    "TS_ANNO_NAME": "TsTypeAnnotation",
    "TS_TYPE_LIT": "TsTypeLiteral",
    "TS_TYPE_REF": "TsTypeReference",
    "TS_TYPE_NAME": "tstype",
    "SPREAD_ARG_TYPE": "RestElement",
    "EXT": "js",
    "TS_EXT": "ts",
    "HELLO": "Hello world!",
    "HELLO_FN": "helloWorld",
    "DATA_KEY": "data",
    "ERROR_KEY": "error",
    "HEADERS_KEY": "headers",
    "JSONQL_PATH": "jsonql",
    "CONTENT_TYPE": "application/vnd.api+json",
    "CHARSET": "charset=utf-8",
    "DEFAULT_HEADER": {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+jsoncharset=utf-8"
    },
    "DEFAULT_TYPE": "any",
    "DEFAULT_CONTRACT_FILE_NAME": "contract.json",
    "PUBLIC_CONTRACT_FILE_NAME": "public-contract.json",
    "DEFAULT_RESOLVER_LIST_FILE_NAME": "resolver.js",
    "DEFAULT_RESOLVER_IMPORT_FILE_NAME": "import.js",
    "MODULE_TYPE": "module",
    "SCRIPT_TYPE": "script",
    "QUERY_NAME": "query",
    "MUTATION_NAME": "mutation",
    "SOCKET_NAME": "socket",
    "SOCKET_AUTH_NAME": "socket-auth",
    "EXTERNAL_NAME": "external",
    "INTERCEPTOR_NAME": "interceptor",
    "PLUGIN_NAME": "plugin",
    "CONTRACT_NAME": "contract",
    "MIDDLEWARE_NAME": "middleware",
    "RESOLVER_TYPES": [
        "query",
        "mutation",
        "socket",
        "socket-auth"
    ],
    "PAYLOAD_PARAM_NAME": "payload",
    "CONDITION_PARAM_NAME": "condition",
    "RESOLVER_PARAM_NAME": "resolverName",
    "QUERY_ARG_NAME": "args",
    "TIMESTAMP_PARAM_NAME": "TS",
    "MUTATION_ARGS": [
        "resolverName",
        "payload",
        "condition"
    ],
    "JSONP_CALLBACK_NAME": "jsonqlJsonpCallback",
    "API_REQUEST_METHODS": [
        "POST",
        "PUT"
    ],
    "CONTRACT_REQUEST_METHODS": [
        "GET",
        "HEAD"
    ],
    "KEY_WORD": "continue",
    "PUBLIC_KEY": "public",
    "PRIVATE_KEY": "private",
    "AUTH_TYPE": "auth",
    "AUTH_NAME": "auth",
    "LOGIN_FN_NAME": "login",
    "LOGOUT_FN_NAME": "logout",
    "VALIDATOR_FN_NAME": "validator",
    "DISCONNECT_FN_NAME": "disconnect",
    "SWITCH_USER_FN_NAME": "switch-user",
    "AUTH_HEADER": "Authorization",
    "AUTH_CHECK_HEADER": "authorization",
    "BEARER": "Bearer",
    "CREDENTIAL_STORAGE_KEY": "jsonqlcredential",
    "CLIENT_STORAGE_KEY": "jsonqlstore",
    "CLIENT_AUTH_KEY": "jsonqlauthkey",
    "INDEX_KEY": "index",
    "CONTRACT_KEY_NAME": "X-JSONQL-CV-KEY",
    "SHOW_CONTRACT_DESC_PARAM": {
        "desc": "y"
    },
    "DEFAULT_RESOLVER_DIR": "resolvers",
    "DEFAULT_CONTRACT_DIR": "contracts",
    "DEFAULT_KEYS_DIR": "keys",
    "CJS_TYPE": "cjs",
    "ES_TYPE": "es",
    "TS_TYPE": "ts",
    "ACCEPTED_JS_TYPES": [
        "cjs",
        "es"
    ],
    "RETURN_AS_FILE": "file",
    "RETURN_AS_JSON": "json",
    "RETURN_AS_ENUM": [
        "file",
        "json"
    ],
    "NO_ERROR_MSG": "No message",
    "NO_STATUS_CODE": -1,
    "SUCCESS_STATUS": 200,
    "UNAUTHORIZED_STATUS": 401,
    "FORBIDDEN_STATUS": 403,
    "NOT_FOUND_STATUS": 404,
    "NOT_ACCEPTABLE_STATUS": 406,
    "SERVER_INTERNAL_STATUS": 500,
    "DEFAULT_PORT_NUM": 6557,
    "CSRF_HEADER_KEY": "X-CSRF-Token",
    "ORIGIN_HEADER_KEYS": [
        "Origin"
    ],
    "WILD_CARD_CHAR": "*",
    "TYPE_KEY": "type",
    "OPTIONAL_KEY": "optional",
    "ENUM_KEY": "enumv",
    "ARGS_KEY": "args",
    "CHECKER_KEY": "checker",
    "ALIAS_KEY": "alias",
    "CHECKED_KEY": "__checked__",
    "APP_DIR_PROP_KEY": "appDir",
    "AUTH_TO_PROP_KEY": "authTimeout",
    "ENABLE_AUTH_PROP_KEY": "enableAuth",
    "USE_JWT_PROP_KEY": "useJwt",
    "RESOLVER_DIR_PROP_KEY": "resolverDir",
    "CONTRACT_DIR_PROP_KEY": "contractDir",
    "INIT_CONNECTION_FN_NAME_PROP_KEY": "initConnectionHandlerName",
    "LOGIN_FN_NAME_PROP_KEY": "loginHandlerName",
    "LOGOUT_FN_NAME_PROP_KEY": "logoutHandlerName",
    "DISCONNECT_FN_NAME_PROP_KEY": "disconnectHandlerName",
    "SWITCH_USER_FN_NAME_PROP_KEY": "switchUserHandlerName",
    "PUBLIC_FN_DIR_PROP_KEY": "publicResolverDir",
    "PRIVATE_FN_DIR_DROP_KEY": "privateResolverDir",
    "ALGORITHM_PROP_KEY": "algorithm",
    "KEYS_DIR_PROP_KEY": "keysDir",
    "SOCKET_IO_AUTH_TYPE_PROP_KEY": "socketIoAuthType",
    "SERVER_INIT_OPT_PROP_KEY": "serverInitOption",
    "SOCKET_TYPE_PROP_KEY": "serverType",
    "SOCKET_TYPE_CLIENT_ALIAS": "socketClientType",
    "SOCKET_TYPE_SERVER_ALIAS": "socketServerType",
    "CSRF_PROP_KEY": "csrf",
    "ALLOW_ORIGIN_PROP_KEY": "allowOrigin",
    "STANDALONE_PROP_KEY": "standalone",
    "DEBUG_ON_PROP_KEY": "debugOn",
    "HOSTNAME_PROP_KEY": "hostname",
    "NAMESAPCE_PROP_KEY": "namespace",
    "FILE_PROP_KEY": "file",
    "WS_OPT_PROP_KEY": "wsOptions",
    "CONTRACT_PROP_KEY": "contract",
    "TOKEN_PROP_KEY": "token",
    "INIT_CLIENT_PROP_KEY": "nodeClient",
    "INIT_CONTRACT_PROP_KEY": "initContract",
    "CONTENT_TYPE_PROP_KEY": "contentType",
    "RETURN_AS_PROP_KEY": "returnAs",
    "NAME_PROP_KEY": "appName",
    "EXPIRED_PROP_KEY": "expired",
    "APP_ROOT_DIR_PROP_KEY": "appRootDir",
    "JWT_TOKEN_OPT_PROP_KEY": "jwtTokenOption",
    "ENABLE_JSONP_PROP_KEY": "enableJsonp",
    "CONTRACT_WITH_DESC_PROP_KEY": "contractWithDesc",
    "WITH_PUBLIC_CONTRACT_PROP_KEY": "withPublicContract",
    "PUBLIC_KEY_NAME_PROP_KEY": "publicKeyFileName",
    "PRIVATE_KEY_NAME_PROP_KEY": "privateKeyFileName",
    "PUBLIC_NAMESPACE_PROP_KEY": "publicNamespace",
    "PRIVATE_NAMESPACE_PROP_KEY": "privateNamespace",
    "SECRET_PROP_KEY": "secret",
    "NSP_INFO_PROP_KEY": "nspInfo",
    "RSA_MODULE_LEN_PROP_KEY": "rsaModulusLength",
    "JSONQL_PATH_PROP_KEY": "jsonqlPath",
    "CONTRACT_KEY_PROP_KEY": "contractKey",
    "CONTRACT_KEY_NAME_PROP_KEY": "contractKeyName",
    "ENABLE_WEB_CONSOLE_PROP_KEY": "enableWebConsole",
    "JS_TYPE_PROP_KEY": "jsType",
    "EXPOSE_ERR_PROP_KEY": "exposeError",
    "CLIENT_CONFIG_PROP_KEY": "clientConfig",
    "AUTO_CONTRACT_PROP_KEY": "autoCreateContract",
    "VALIDATE_RETURNS_PROP_KEY": "validateReturns",
    "ENABLE_UPLOAD_PROP_KEY": "enableFileUpload",
    "FILE_UPLOAD_NAME_PROP_KEY": "fileUploadName",
    "FILE_UPLOAD_DIST_PROP_KEY": "fileUploadDist",
    "FILE_HANDLER_FN_NAME_PROP_KEY": "fileHandlerName",
    "ENABLE_SPLIT_TASK_PROP_KEY": "enableSplitTask",
    "CONNECTED_PROP_KEY": "connected",
    "CACHE_STORE_PROP_KEY": "cacheStore",
    "EVENT_EMITTER_PROP_KEY": "eventEmitter",
    "SUSPEND_EVENT_PROP_KEY": "suspendOnStart",
    "ENABLE_CACHE_RESOLVER_PROP_KEY": "enableCacheResolver",
    "TOKEN_DELIVER_LOCATION_PROP_KEY": "tokenDeliverLocation",
    "COOKIE_PROP_KEY": "cookie",
    "IS_READY_PROP_KEY": "isReady",
    "IS_LOGIN_PROP_KEY": "isLogin",
    "SOCKET_PING_EVENT_NAME": "__ping__",
    "SWITCH_USER_EVENT_NAME": "__switch__",
    "LOGIN_EVENT_NAME": "__login__",
    "LOGOUT_EVENT_NAME": "__logout__",
    "SA_LOGIN_EVENT_NAME": "__standalone_login__",
    "SOCKET_CLIENT_ID_KEY": "__socket_client_id_key__",
    "SOCKET_CLIENT_TS_KEY": "__socket_client_ts_key__",
    "CONNECT_EVENT_NAME": "__connect__",
    "CONNECTED_EVENT_NAME": "__connected__",
    "DISCONNECT_EVENT_NAME": "__disconnect__",
    "INTERCOM_RESOLVER_NAME": "__intercom__",
    "INTER_COM_EVENT_NAMES": [
        "__connect__",
        "__switch__",
        "__disconnect__"
    ],
    "WS_REPLY_TYPE": "__reply__",
    "WS_EVT_NAME": "__event__",
    "WS_DATA_NAME": "__data__",
    "WS_IS_REPLY_KEYS": [
        "__reply__",
        "__event__",
        "__data__"
    ],
    "ON_MESSAGE_FN_NAME": "onMessage",
    "ON_RESULT_FN_NAME": "onResult",
    "ON_ERROR_FN_NAME": "onError",
    "ON_READY_FN_NAME": "onReady",
    "ON_LOGIN_FN_NAME": "onLogin",
    "SEND_MSG_FN_NAME": "send",
    "EMIT_MSG_FN_NAME": "emit",
    "ON_MSG_FN_NAME": "on",
    "TO_MSG_FN_NAME": "to",
    "CLIENT_PROP_NAME": "client",
    "USERDATA_PROP_NAME": "userdata",
    "EMIT_REPLY_TYPE": "emit_reply",
    "EMIT_SEND_TYPE": "emit_send",
    "ACKNOWLEDGE_REPLY_TYPE": "emit_acknowledge",
    "INTER_EMIT_SEND_TYPE": "inter_emit_send",
    "INTER_EMIT_REPLY_TYPE": "inter_emit_reply",
    "NSP_GROUP": "nspGroup",
    "PUBLIC_NAMESPACE": "publicNamespace",
    "JS_WS_SOCKET_IO_NAME": "socket.io",
    "JS_WS_NAME": "ws",
    "JS_PRIMUS_NAME": "primus",
    "GO_WS_COOLPY7_NAME": "coolpy7",
    "DEFAULT_WS_WAIT_TIME": 5000,
    "DEFAULT_RETRY_TIME": 3000,
    "TIMEOUT_ERR_MSG": "timeout",
    "NOT_LOGIN_ERR_MSG": "NOT LOGIN",
    "BASE64_FORMAT": "base64",
    "HEX_FORMAT": "hex",
    "UTF8_FORMAT": "utf8",
    "RSA_FORMATS": [
        "base64",
        "hex"
    ],
    "RSA_ALGO": "RS256",
    "HSA_ALGO": "HS256",
    "JWT_SUPPORT_ALGOS": [
        "RS256",
        "HS256"
    ],
    "RSA_PRIVATE_KEY_HEADER": "BEGIN RSA PRIVATE KEY",
    "RSA_MIN_MODULE_LEN": 1024,
    "RSA_MAX_MODULE_LEN": 4096,
    "TOKEN_PARAM_NAME": "token",
    "IO_ROUNDTRIP_LOGIN": "roundtip",
    "IO_HANDSHAKE_LOGIN": "handshake",
    "IO_LOGIN_METHODS": [
        "roundtip",
        "handshake"
    ],
    "PEM_EXT": "pem",
    "PUBLIC_KEY_NAME": "publicKey",
    "PRIVATE_KEY_NAME": "privateKey",
    "DEFAULT_PUBLIC_KEY_FILE": "publicKey.pem",
    "DEFAULT_PRIVATE_KEY_FILE": "privateKey.pem",
    "NSP_AUTH_CLIENT": "nspAuthClient",
    "NSP_CLIENT": "nspClient",
    "TOKEN_IN_HEADER": "header",
    "TOKEN_IN_URL": "url",
    "OR_SEPERATOR": "|",
    "BOOLEAN_TYPE": "boolean",
    "STRING_TYPE": "string",
    "NUMBER_TYPE": "number",
    "ARRAY_TYPE": "array",
    "OBJECT_TYPE": "object",
    "FUNCTION_TYPE": "function",
    "ANY_TYPE": "any",
    "BASED_PRIMITIVE_TYPES": [
        "number",
        "string",
        "array",
        "object"
    ],
    "NUMBER_TYPES": [
        "int",
        "integer",
        "float",
        "double",
        "decimal"
    ],
    "SUPPORTED_TYPES": [
        "number",
        "string",
        "boolean",
        "array",
        "object",
        "any"
    ],
    "ARRAY_TS_TYPE_LFT": "Array<",
    "ARRAY_TYPE_LFT": "array.<",
    "ARRAY_TYPE_RGT": ">",
    "DEFAULT_VALUE": "defaultvalue"
}