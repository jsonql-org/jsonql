declare module "@jsonql/constants" {
export const EXPORT_TYPE: "ExportDeclaration";
export const EXPORT_DEFAULT_TYPE: "ExportDefaultDeclaration";
export const DECLARATION_NAME: "declaration";
export const DECLARATION_SHORT_NAME: "decl";
export const ANNOTATION_NAME: "typeAnnotation";
export const PARAMETER_NAME: "Parameter";
export const CLASS_TYPE: "ClassDeclaration";
export const CLASS_METHOD: "ClassMethod";
export const CLASS_EXP: "ClassExpression";
export const FUNC_EXP: "FunctionExpression";
export const ASSIGN_PATTERN: "AssignmentPattern";
export const OBJ_EXP: "ObjectExpression";
export const ARR_EXP: "ArrayExpression";
export const BOO_LIT: "BooleanLiteral";
export const NUM_LIT: "NumericLiteral";
export const STR_LIT: "StringLiteral";
export const ELEM_TYPE: "elemType";
export const TYPE_NAME: "typeName";
export const TYPE_PARAMS: "typeParams";
export const TS_KEY_TYPE: "TsKeywordType";
export const TS_UNION_TYPE: "TsUnionType";
export const TS_ARRAY_TYPE: "TsArrayType";
export const TS_ANNO_NAME: "TsTypeAnnotation";
export const TS_TYPE_LIT: "TsTypeLiteral";
export const TS_TYPE_REF: "TsTypeReference";
export const TS_TYPE_NAME: "tstype";
export const SPREAD_ARG_TYPE: "RestElement";
//# sourceMappingURL=ast.d.mts.map
export const EXT: "js";
export const TS_EXT: "ts";
export const HELLO: "Hello world!";
export const HELLO_FN: "helloWorld";
export const HEADERS_KEY: "headers";
export const JSONQL_PATH: "jsonql";
export const CONTENT_TYPE: "application/vnd.api+json";
export const CHARSET: "charset=utf-8";
export const DEFAULT_HEADER: {
    Accept: string;
    'Content-Type': string;
};
export const DEFAULT_TYPE: "any";
export const DEFAULT_RESOLVER_LIST_FILE_NAME: "resolver.js";
export const DEFAULT_RESOLVER_IMPORT_FILE_NAME: "import.js";
export const MODULE_TYPE: "module";
export const SCRIPT_TYPE: "script";
export const QUERY_NAME: "query";
export const MUTATION_NAME: "mutation";
export const SOCKET_NAME: "socket";
export const SOCKET_AUTH_NAME: "socket-auth";
export const EXTERNAL_NAME: "external";
export const INTERCEPTOR_NAME: "interceptor";
export const PLUGIN_NAME: "plugin";
export const CONTRACT_NAME: "contract";
export const MIDDLEWARE_NAME: "middleware";
export const RESOLVER_TYPES: string[];
export const PAYLOAD_PARAM_NAME: "payload";
export const CONDITION_PARAM_NAME: "condition";
export const RESOLVER_PARAM_NAME: "resolverName";
export const QUERY_ARG_NAME: "args";
export const TIMESTAMP_PARAM_NAME: "TS";
export const MUTATION_ARGS: string[];
export const JSONP_CALLBACK_NAME: "jsonqlJsonpCallback";
export const API_REQUEST_METHODS: string[];
export const CONTRACT_REQUEST_METHODS: string[];
export const KEY_WORD: "continue";
export const PUBLIC_KEY: "public";
export const PRIVATE_KEY: "private";
export const AUTH_TYPE: "auth";
export const AUTH_NAME: "auth";
export const LOGIN_FN_NAME: "login";
export const LOGOUT_FN_NAME: "logout";
export const VALIDATOR_FN_NAME: "validator";
export const DISCONNECT_FN_NAME: "disconnect";
export const SWITCH_USER_FN_NAME: "switch-user";
export const AUTH_HEADER: "Authorization";
export const AUTH_CHECK_HEADER: "authorization";
export const BEARER: "Bearer";
export const CREDENTIAL_STORAGE_KEY: "jsonqlcredential";
export const CLIENT_STORAGE_KEY: "jsonqlstore";
export const CLIENT_AUTH_KEY: "jsonqlauthkey";
export const INDEX_KEY: "index";
export const CONTRACT_KEY_NAME: "X-JSONQL-CV-KEY";
export namespace SHOW_CONTRACT_DESC_PARAM {
    const desc: string;
}
export const DEFAULT_RESOLVER_DIR: "resolvers";
export const DEFAULT_CONTRACT_DIR: "contracts";
export const DEFAULT_KEYS_DIR: "keys";
export const CJS_TYPE: "cjs";
export const ES_TYPE: "es";
export const TS_TYPE: "ts";
export const ACCEPTED_JS_TYPES: string[];
export const RETURN_AS_FILE: "file";
export const RETURN_AS_JSON: "json";
export const RETURN_AS_ENUM: string[];
export const NO_ERROR_MSG: "No message";
export const NO_STATUS_CODE: -1;
export const SUCCESS_STATUS: 200;
export const UNAUTHORIZED_STATUS: 401;
export const FORBIDDEN_STATUS: 403;
export const NOT_FOUND_STATUS: 404;
export const NOT_ACCEPTABLE_STATUS: 406;
export const SERVER_INTERNAL_STATUS: 500;
export const DEFAULT_PORT_NUM: 6557;
export const CSRF_HEADER_KEY: "X-CSRF-Token";
export const ORIGIN_HEADER_KEYS: string[];
export const WILD_CARD_CHAR: "*";
//# sourceMappingURL=base.d.mts.map
export const DATA_KEY: "data";
export const ERROR_KEY: "error";
export const META_KEY: "meta";
export const JSONQL_NAME: "jsonql";
export const REST_NAME: "rest";
export const AVAILABLE_FORMATS: string[];
export const DEFAULT_CONTRACT_FILE_NAME: "contract.json";
export const PUBLIC_CONTRACT_FILE_NAME: "public-contract.json";
//# sourceMappingURL=contract.d.mts.map
export const TYPE_KEY: "type";
export const OPTIONAL_KEY: "optional";
export const ENUM_KEY: "enumv";
export const ARGS_KEY: "args";
export const CHECKER_KEY: "checker";
export const ALIAS_KEY: "alias";
export const CHECKED_KEY: "__checked__";
export const APP_DIR_PROP_KEY: "appDir";
export const AUTH_TO_PROP_KEY: "authTimeout";
export const ENABLE_AUTH_PROP_KEY: "enableAuth";
export const USE_JWT_PROP_KEY: "useJwt";
export const RESOLVER_DIR_PROP_KEY: "resolverDir";
export const CONTRACT_DIR_PROP_KEY: "contractDir";
export const INIT_CONNECTION_FN_NAME_PROP_KEY: "initConnectionHandlerName";
export const LOGIN_FN_NAME_PROP_KEY: "loginHandlerName";
export const LOGOUT_FN_NAME_PROP_KEY: "logoutHandlerName";
export const DISCONNECT_FN_NAME_PROP_KEY: "disconnectHandlerName";
export const SWITCH_USER_FN_NAME_PROP_KEY: "switchUserHandlerName";
export const PUBLIC_FN_DIR_PROP_KEY: "publicResolverDir";
export const PRIVATE_FN_DIR_DROP_KEY: "privateResolverDir";
export const ALGORITHM_PROP_KEY: "algorithm";
export const KEYS_DIR_PROP_KEY: "keysDir";
export const SOCKET_IO_AUTH_TYPE_PROP_KEY: "socketIoAuthType";
export const SERVER_INIT_OPT_PROP_KEY: "serverInitOption";
export const SOCKET_TYPE_PROP_KEY: "serverType";
export const SOCKET_TYPE_CLIENT_ALIAS: "socketClientType";
export const SOCKET_TYPE_SERVER_ALIAS: "socketServerType";
export const CSRF_PROP_KEY: "csrf";
export const ALLOW_ORIGIN_PROP_KEY: "allowOrigin";
export const STANDALONE_PROP_KEY: "standalone";
export const DEBUG_ON_PROP_KEY: "debugOn";
export const HOSTNAME_PROP_KEY: "hostname";
export const NAMESAPCE_PROP_KEY: "namespace";
export const FILE_PROP_KEY: "file";
export const WS_OPT_PROP_KEY: "wsOptions";
export const CONTRACT_PROP_KEY: "contract";
export const TOKEN_PROP_KEY: "token";
export const INIT_CLIENT_PROP_KEY: "nodeClient";
export const INIT_CONTRACT_PROP_KEY: "initContract";
export const CONTENT_TYPE_PROP_KEY: "contentType";
export const RETURN_AS_PROP_KEY: "returnAs";
export const NAME_PROP_KEY: "appName";
export const EXPIRED_PROP_KEY: "expired";
export const APP_ROOT_DIR_PROP_KEY: "appRootDir";
export const JWT_TOKEN_OPT_PROP_KEY: "jwtTokenOption";
export const ENABLE_JSONP_PROP_KEY: "enableJsonp";
export const CONTRACT_WITH_DESC_PROP_KEY: "contractWithDesc";
export const WITH_PUBLIC_CONTRACT_PROP_KEY: "withPublicContract";
export const PUBLIC_KEY_NAME_PROP_KEY: "publicKeyFileName";
export const PRIVATE_KEY_NAME_PROP_KEY: "privateKeyFileName";
export const PUBLIC_NAMESPACE_PROP_KEY: "publicNamespace";
export const PRIVATE_NAMESPACE_PROP_KEY: "privateNamespace";
export const SECRET_PROP_KEY: "secret";
export const NSP_INFO_PROP_KEY: "nspInfo";
export const RSA_MODULE_LEN_PROP_KEY: "rsaModulusLength";
export const JSONQL_PATH_PROP_KEY: "jsonqlPath";
export const CONTRACT_KEY_PROP_KEY: "contractKey";
export const CONTRACT_KEY_NAME_PROP_KEY: "contractKeyName";
export const ENABLE_WEB_CONSOLE_PROP_KEY: "enableWebConsole";
export const JS_TYPE_PROP_KEY: "jsType";
export const EXPOSE_ERR_PROP_KEY: "exposeError";
export const CLIENT_CONFIG_PROP_KEY: "clientConfig";
export const AUTO_CONTRACT_PROP_KEY: "autoCreateContract";
export const VALIDATE_RETURNS_PROP_KEY: "validateReturns";
export const ENABLE_UPLOAD_PROP_KEY: "enableFileUpload";
export const FILE_UPLOAD_NAME_PROP_KEY: "fileUploadName";
export const FILE_UPLOAD_DIST_PROP_KEY: "fileUploadDist";
export const FILE_HANDLER_FN_NAME_PROP_KEY: "fileHandlerName";
export const ENABLE_SPLIT_TASK_PROP_KEY: "enableSplitTask";
export const CONNECTED_PROP_KEY: "connected";
export const CACHE_STORE_PROP_KEY: "cacheStore";
export const EVENT_EMITTER_PROP_KEY: "eventEmitter";
export const SUSPEND_EVENT_PROP_KEY: "suspendOnStart";
export const ENABLE_CACHE_RESOLVER_PROP_KEY: "enableCacheResolver";
export const TOKEN_DELIVER_LOCATION_PROP_KEY: "tokenDeliverLocation";
export const COOKIE_PROP_KEY: "cookie";
export const IS_READY_PROP_KEY: "isReady";
export const IS_LOGIN_PROP_KEY: "isLogin";
//# sourceMappingURL=prop.d.mts.map
export const SOCKET_PING_EVENT_NAME: "__ping__";
export const SWITCH_USER_EVENT_NAME: "__switch__";
export const LOGIN_EVENT_NAME: "__login__";
export const LOGOUT_EVENT_NAME: "__logout__";
export const SA_LOGIN_EVENT_NAME: "__standalone_login__";
export const SOCKET_CLIENT_ID_KEY: "__socket_client_id_key__";
export const SOCKET_CLIENT_TS_KEY: "__socket_client_ts_key__";
export const CONNECT_EVENT_NAME: "__connect__";
export const CONNECTED_EVENT_NAME: "__connected__";
export const DISCONNECT_EVENT_NAME: "__disconnect__";
export const INTERCOM_RESOLVER_NAME: "__intercom__";
export const INTER_COM_EVENT_NAMES: string[];
export const WS_REPLY_TYPE: "__reply__";
export const WS_EVT_NAME: "__event__";
export const WS_DATA_NAME: "__data__";
export const WS_IS_REPLY_KEYS: string[];
export const ON_MESSAGE_FN_NAME: "onMessage";
export const ON_RESULT_FN_NAME: "onResult";
export const ON_ERROR_FN_NAME: "onError";
export const ON_READY_FN_NAME: "onReady";
export const ON_LOGIN_FN_NAME: "onLogin";
export const SEND_MSG_FN_NAME: "send";
export const EMIT_MSG_FN_NAME: "emit";
export const ON_MSG_FN_NAME: "on";
export const TO_MSG_FN_NAME: "to";
export const CLIENT_PROP_NAME: "client";
export const USERDATA_PROP_NAME: "userdata";
export const EMIT_REPLY_TYPE: "emit_reply";
export const EMIT_SEND_TYPE: "emit_send";
export const ACKNOWLEDGE_REPLY_TYPE: "emit_acknowledge";
export const INTER_EMIT_SEND_TYPE: "inter_emit_send";
export const INTER_EMIT_REPLY_TYPE: "inter_emit_reply";
export const NSP_GROUP: "nspGroup";
export const PUBLIC_NAMESPACE: "publicNamespace";
export const JS_WS_SOCKET_IO_NAME: "socket.io";
export const JS_WS_NAME: "ws";
export const JS_PRIMUS_NAME: "primus";
export const GO_WS_COOLPY7_NAME: "coolpy7";
export const DEFAULT_WS_WAIT_TIME: 5000;
export const DEFAULT_RETRY_TIME: 3000;
export const TIMEOUT_ERR_MSG: "timeout";
export const NOT_LOGIN_ERR_MSG: "NOT LOGIN";
export const BASE64_FORMAT: "base64";
export const HEX_FORMAT: "hex";
export const UTF8_FORMAT: "utf8";
export const RSA_FORMATS: string[];
export const RSA_ALGO: "RS256";
export const HSA_ALGO: "HS256";
export const JWT_SUPPORT_ALGOS: string[];
export const RSA_PRIVATE_KEY_HEADER: "BEGIN RSA PRIVATE KEY";
export const RSA_MIN_MODULE_LEN: 1024;
export const RSA_MAX_MODULE_LEN: 4096;
export const TOKEN_PARAM_NAME: "token";
export const IO_ROUNDTRIP_LOGIN: "roundtip";
export const IO_HANDSHAKE_LOGIN: "handshake";
export const IO_LOGIN_METHODS: string[];
export const PEM_EXT: "pem";
export const PUBLIC_KEY_NAME: "publicKey";
export const PRIVATE_KEY_NAME: "privateKey";
export const DEFAULT_PUBLIC_KEY_FILE: string;
export const DEFAULT_PRIVATE_KEY_FILE: string;
export const NSP_AUTH_CLIENT: "nspAuthClient";
export const NSP_CLIENT: "nspClient";
export const TOKEN_IN_HEADER: "header";
export const TOKEN_IN_URL: "url";
//# sourceMappingURL=socket.d.mts.map
export const OR_SEPERATOR: "|";
export const BOOLEAN_TYPE: "boolean";
export const STRING_TYPE: "string";
export const NUMBER_TYPE: "number";
export const ARRAY_TYPE: "array";
export const OBJECT_TYPE: "object";
export const FUNCTION_TYPE: "function";
export const ANY_TYPE: "any";
export const BASED_PRIMITIVE_TYPES: string[];
export const NUMBER_TYPES: string[];
export const SUPPORTED_TYPES: string[];
export const ARRAY_TS_TYPE_LFT: "Array<";
export const ARRAY_TYPE_LFT: "array.<";
export const ARRAY_TYPE_RGT: ">";
export const DEFAULT_VALUE: "defaultvalue";
//# sourceMappingURL=validation.d.mts.map
}
