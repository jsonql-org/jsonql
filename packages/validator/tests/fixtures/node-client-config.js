const { join } = require('path');
const fs = require('fs');
const {
  constructConfig,
  checkConfigAsync
} = require('../../main');
// require('../../main');
const {
  JSONQL_PATH,
  CONTENT_TYPE,
  CLIENT_STORAGE_KEY,
  CLIENT_AUTH_KEY,
  CONTRACT_KEY_NAME,
  PUBLIC_FILE_NAME,
  DEFAULT_HEADER,
  DEFAULT_RESOLVER_DIR,
  DEFAULT_CONTRACT_DIR,
  BOOLEAN_TYPE,
  STRING_TYPE,
  NUMBER_TYPE,
  ARGS_KEY,
  TYPE_KEY,
  ENUM_KEY,
  CHECKER_KEY,
  ACCEPTED_JS_TYPES,
  CJS_TYPE
} = require('jsonql-constants');
const debug = require('debug')('jsonql-node-client:config');
// properties
const constProps = {
  contentType: CONTENT_TYPE,
  contract: {},
  useDoc: true,
  returnAs: 'json'
};
const appProps = {
  hostname: constructConfig('', STRING_TYPE), // required the hostname
  jsonqlPath: constructConfig(JSONQL_PATH, STRING_TYPE), // The path on the server

  // useLocalstorage: constructConfig(true, BOOLEAN_TYPE), // should we store the contract into localStorage
  storageKey: constructConfig(CLIENT_STORAGE_KEY, STRING_TYPE),// the key to use when store into localStorage
  authKey: constructConfig(CLIENT_AUTH_KEY, STRING_TYPE),// the key to use when store into the sessionStorage

  contractKey: constructConfig(false,  [BOOLEAN_TYPE, STRING_TYPE]), // if the server side is lock by the key you need this
  contractKeyName: constructConfig(CONTRACT_KEY_NAME, STRING_TYPE),// same as above they go in pairs
  contractDir: constructConfig(
    join(process.cwd(), DEFAULT_RESOLVER_DIR),
    STRING_TYPE,
    false,
    false,
   fs.existsSync),
  contractFileName: constructConfig(PUBLIC_FILE_NAME, STRING_TYPE),
  // functions
  storeAuthToken: constructConfig(false, BOOLEAN_TYPE),
  getAuthToken: constructConfig(false, BOOLEAN_TYPE),
  defaultHeader: constructConfig(DEFAULT_HEADER, STRING_TYPE)
};
// debug('appProps', appProps);
// export just one method
module.exports = config => {
  debug('config', config);
  return checkConfigAsync(config, appProps, constProps, true);
}
