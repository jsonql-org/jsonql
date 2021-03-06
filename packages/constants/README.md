# @jsonql/constants

This is a module export all the share constant use across all the
[jsonql](https://jsonql.org) modules.

Use it only when you want to develop your jsonql compatible module.
You can also use the included `constants.json`, if you are not using
Javascript to develop your module.

_As of 0.4.0, we no longer export the brower.js (it creates more problem then it solve)_

We split up the constants into sections:

- base
- prop
- socket
- validation

Please consult the detail break down below.

## constants


### AST

- EXPORT_TYPE
- EXPORT_DEFAULT_TYPE
- DECLARATION_NAME
- DECLARATION_SHORT_NAME
- ANNOTATION_NAME
- PARAMETER_NAME
- CLASS_TYPE
- CLASS_METHOD
- CLASS_EXP
- FUNC_EXP
- ASSIGN_PATTERN
- OBJ_EXP
- ARR_EXP
- BOO_LIT
- NUM_LIT
- STR_LIT
- ELEM_TYPE
- TYPE_NAME
- TYPE_PARAMS
- TS_KEY_TYPE
- TS_UNION_TYPE
- TS_ARRAY_TYPE
- TS_ANNO_NAME
- TS_TYPE_LIT
- TS_TYPE_REF
- TS_TYPE_NAME
- SPREAD_ARG_TYPE

### BASE

- EXT
- TS_EXT
- HELLO
- HELLO_FN
- HEADERS_KEY
- JSONQL_PATH
- CONTENT_TYPE
- CHARSET
- DEFAULT_HEADER
- DEFAULT_TYPE
- DEFAULT_RESOLVER_LIST_FILE_NAME
- DEFAULT_RESOLVER_IMPORT_FILE_NAME
- MODULE_TYPE
- SCRIPT_TYPE
- QUERY_NAME
- MUTATION_NAME
- SOCKET_NAME
- SOCKET_AUTH_NAME
- EXTERNAL_NAME
- INTERCEPTOR_NAME
- PLUGIN_NAME
- CONTRACT_NAME
- MIDDLEWARE_NAME
- RESOLVER_TYPES
- PAYLOAD_PARAM_NAME
- CONDITION_PARAM_NAME
- RESOLVER_PARAM_NAME
- QUERY_ARG_NAME
- TIMESTAMP_PARAM_NAME
- MUTATION_ARGS
- JSONP_CALLBACK_NAME
- API_REQUEST_METHODS
- CONTRACT_REQUEST_METHODS
- KEY_WORD
- PUBLIC_KEY
- PRIVATE_KEY
- AUTH_TYPE
- AUTH_NAME
- LOGIN_FN_NAME
- LOGOUT_FN_NAME
- VALIDATOR_FN_NAME
- DISCONNECT_FN_NAME
- SWITCH_USER_FN_NAME
- AUTH_HEADER
- AUTH_CHECK_HEADER
- BEARER
- CREDENTIAL_STORAGE_KEY
- CLIENT_STORAGE_KEY
- CLIENT_AUTH_KEY
- INDEX_KEY
- CONTRACT_KEY_NAME
- SHOW_CONTRACT_DESC_PARAM
- DEFAULT_RESOLVER_DIR
- DEFAULT_CONTRACT_DIR
- DEFAULT_KEYS_DIR
- CJS_TYPE
- ES_TYPE
- TS_TYPE
- ACCEPTED_JS_TYPES
- RETURN_AS_FILE
- RETURN_AS_JSON
- RETURN_AS_ENUM
- NO_ERROR_MSG
- NO_STATUS_CODE
- SUCCESS_STATUS
- UNAUTHORIZED_STATUS
- FORBIDDEN_STATUS
- NOT_FOUND_STATUS
- NOT_ACCEPTABLE_STATUS
- SERVER_INTERNAL_STATUS
- DEFAULT_PORT_NUM
- CSRF_HEADER_KEY
- ORIGIN_HEADER_KEYS
- WILD_CARD_CHAR

### CONTRACT

- DATA_KEY
- ERROR_KEY
- META_KEY
- JSONQL_NAME
- REST_NAME
- AVAILABLE_FORMATS
- DEFAULT_CONTRACT_FILE_NAME
- PUBLIC_CONTRACT_FILE_NAME

### PROP

- TYPE_KEY
- OPTIONAL_KEY
- ENUM_KEY
- ARGS_KEY
- CHECKER_KEY
- ALIAS_KEY
- CHECKED_KEY
- APP_DIR_PROP_KEY
- AUTH_TO_PROP_KEY
- ENABLE_AUTH_PROP_KEY
- USE_JWT_PROP_KEY
- RESOLVER_DIR_PROP_KEY
- CONTRACT_DIR_PROP_KEY
- INIT_CONNECTION_FN_NAME_PROP_KEY
- LOGIN_FN_NAME_PROP_KEY
- LOGOUT_FN_NAME_PROP_KEY
- DISCONNECT_FN_NAME_PROP_KEY
- SWITCH_USER_FN_NAME_PROP_KEY
- PUBLIC_FN_DIR_PROP_KEY
- PRIVATE_FN_DIR_DROP_KEY
- ALGORITHM_PROP_KEY
- KEYS_DIR_PROP_KEY
- SOCKET_IO_AUTH_TYPE_PROP_KEY
- SERVER_INIT_OPT_PROP_KEY
- SOCKET_TYPE_PROP_KEY
- SOCKET_TYPE_CLIENT_ALIAS
- SOCKET_TYPE_SERVER_ALIAS
- CSRF_PROP_KEY
- ALLOW_ORIGIN_PROP_KEY
- STANDALONE_PROP_KEY
- DEBUG_ON_PROP_KEY
- HOSTNAME_PROP_KEY
- NAMESAPCE_PROP_KEY
- FILE_PROP_KEY
- WS_OPT_PROP_KEY
- CONTRACT_PROP_KEY
- TOKEN_PROP_KEY
- INIT_CLIENT_PROP_KEY
- INIT_CONTRACT_PROP_KEY
- CONTENT_TYPE_PROP_KEY
- RETURN_AS_PROP_KEY
- NAME_PROP_KEY
- EXPIRED_PROP_KEY
- APP_ROOT_DIR_PROP_KEY
- JWT_TOKEN_OPT_PROP_KEY
- ENABLE_JSONP_PROP_KEY
- CONTRACT_WITH_DESC_PROP_KEY
- WITH_PUBLIC_CONTRACT_PROP_KEY
- PUBLIC_KEY_NAME_PROP_KEY
- PRIVATE_KEY_NAME_PROP_KEY
- PUBLIC_NAMESPACE_PROP_KEY
- PRIVATE_NAMESPACE_PROP_KEY
- SECRET_PROP_KEY
- NSP_INFO_PROP_KEY
- RSA_MODULE_LEN_PROP_KEY
- JSONQL_PATH_PROP_KEY
- CONTRACT_KEY_PROP_KEY
- CONTRACT_KEY_NAME_PROP_KEY
- ENABLE_WEB_CONSOLE_PROP_KEY
- JS_TYPE_PROP_KEY
- EXPOSE_ERR_PROP_KEY
- CLIENT_CONFIG_PROP_KEY
- AUTO_CONTRACT_PROP_KEY
- VALIDATE_RETURNS_PROP_KEY
- ENABLE_UPLOAD_PROP_KEY
- FILE_UPLOAD_NAME_PROP_KEY
- FILE_UPLOAD_DIST_PROP_KEY
- FILE_HANDLER_FN_NAME_PROP_KEY
- ENABLE_SPLIT_TASK_PROP_KEY
- CONNECTED_PROP_KEY
- CACHE_STORE_PROP_KEY
- EVENT_EMITTER_PROP_KEY
- SUSPEND_EVENT_PROP_KEY
- ENABLE_CACHE_RESOLVER_PROP_KEY
- TOKEN_DELIVER_LOCATION_PROP_KEY
- COOKIE_PROP_KEY
- IS_READY_PROP_KEY
- IS_LOGIN_PROP_KEY

### SOCKET

- SOCKET_PING_EVENT_NAME
- SWITCH_USER_EVENT_NAME
- LOGIN_EVENT_NAME
- LOGOUT_EVENT_NAME
- SA_LOGIN_EVENT_NAME
- SOCKET_CLIENT_ID_KEY
- SOCKET_CLIENT_TS_KEY
- CONNECT_EVENT_NAME
- CONNECTED_EVENT_NAME
- DISCONNECT_EVENT_NAME
- INTERCOM_RESOLVER_NAME
- INTER_COM_EVENT_NAMES
- WS_REPLY_TYPE
- WS_EVT_NAME
- WS_DATA_NAME
- WS_IS_REPLY_KEYS
- ON_MESSAGE_FN_NAME
- ON_RESULT_FN_NAME
- ON_ERROR_FN_NAME
- ON_READY_FN_NAME
- ON_LOGIN_FN_NAME
- SEND_MSG_FN_NAME
- EMIT_MSG_FN_NAME
- ON_MSG_FN_NAME
- TO_MSG_FN_NAME
- CLIENT_PROP_NAME
- USERDATA_PROP_NAME
- EMIT_REPLY_TYPE
- EMIT_SEND_TYPE
- ACKNOWLEDGE_REPLY_TYPE
- INTER_EMIT_SEND_TYPE
- INTER_EMIT_REPLY_TYPE
- NSP_GROUP
- PUBLIC_NAMESPACE
- JS_WS_SOCKET_IO_NAME
- JS_WS_NAME
- JS_PRIMUS_NAME
- GO_WS_COOLPY7_NAME
- DEFAULT_WS_WAIT_TIME
- DEFAULT_RETRY_TIME
- TIMEOUT_ERR_MSG
- NOT_LOGIN_ERR_MSG
- BASE64_FORMAT
- HEX_FORMAT
- UTF8_FORMAT
- RSA_FORMATS
- RSA_ALGO
- HSA_ALGO
- JWT_SUPPORT_ALGOS
- RSA_PRIVATE_KEY_HEADER
- RSA_MIN_MODULE_LEN
- RSA_MAX_MODULE_LEN
- TOKEN_PARAM_NAME
- IO_ROUNDTRIP_LOGIN
- IO_HANDSHAKE_LOGIN
- IO_LOGIN_METHODS
- PEM_EXT
- PUBLIC_KEY_NAME
- PRIVATE_KEY_NAME
- DEFAULT_PUBLIC_KEY_FILE
- DEFAULT_PRIVATE_KEY_FILE
- NSP_AUTH_CLIENT
- NSP_CLIENT
- TOKEN_IN_HEADER
- TOKEN_IN_URL

### VALIDATION

- OR_SEPERATOR
- BOOLEAN_TYPE
- STRING_TYPE
- NUMBER_TYPE
- ARRAY_TYPE
- OBJECT_TYPE
- FUNCTION_TYPE
- ANY_TYPE
- BASED_PRIMITIVE_TYPES
- NUMBER_TYPES
- SUPPORTED_TYPES
- ARRAY_TS_TYPE_LFT
- ARRAY_TYPE_LFT
- ARRAY_TYPE_RGT
- DEFAULT_VALUE



---

MIT

[TO1SOURCE](https://to1source.com) / [NEWBRAN LTD](https://newbran.co.uk) (c) 2022
1652082400214
