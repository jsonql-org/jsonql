import {
  JSONQL_PATH,
  CONTENT_TYPE,
  BEARER,
  CLIENT_STORAGE_KEY,
  CLIENT_AUTH_KEY,
  CONTRACT_KEY_NAME,
  AUTH_HEADER,
  STRING_TYPE,
  NUMBER_TYPE,
  BOOLEAN_TYPE,
  ANY_TYPE,
  CHECKER_KEY,
  OPTIONAL_KEY,
  ALIAS_KEY,
  ENUM_KEY
} from 'jsonql-constants'
// also check if this works or not
import {
  createConfig
} from '../../main'

export const constProps = {
  MUTATION_ARGS: ['name', 'payload', 'conditions'],
  CONTENT_TYPE: CONTENT_TYPE,
  BEARER: BEARER,
  AUTH_HEADER: AUTH_HEADER
}

export const appProps = {
  hostname: { args: '/', type: STRING_TYPE }, // required the hostname
  jsonqlPath: { args: JSONQL_PATH, type: [STRING_TYPE] }, // The path on the server
   // the header
  useLocalstorage: { args: true, type: [BOOLEAN_TYPE] }, // should we store the contract into localStorage
  storageKey: { args: CLIENT_STORAGE_KEY, type: [STRING_TYPE] },// the key to use when store into localStorage
  authKey: { args: CLIENT_AUTH_KEY, type: [STRING_TYPE] },// the key to use when store into the sessionStorage
  contractExpired: { args: 0, type: [NUMBER_TYPE] },// -1 always fetch contract,
                      // 0 never expired,
                      // > 0 then compare the timestamp with the current one to see if we need to get contract again
  contract: { args: false, type: [BOOLEAN_TYPE] },
  contractKey: { args: false, type: [BOOLEAN_TYPE] }, // if the server side is lock by the key you need this
  contractKeyName: { args: CONTRACT_KEY_NAME, type: [STRING_TYPE] }, // same as above they go in pairs
  enableTimeout: {args: false, type: [BOOLEAN_TYPE]}, // @TODO
  timeout: { args: 5000, type: [NUMBER_TYPE] }, // 5 seconds
  returnInstance: { args: false, type: [BOOLEAN_TYPE] },
  allowReturnRawToken: { args: false, type: [BOOLEAN_TYPE] },
  debugOn: { args: false, type: [BOOLEAN_TYPE] },
  // for testing the optional value to pass
  optionalProp: createConfig('', [NUMBER_TYPE, STRING_TYPE], {[OPTIONAL_KEY]: true}),
  aliasProp: createConfig('some-default-value', [STRING_TYPE], {[ALIAS_KEY]: 'otherName'}),
  // for testing for checking against the enum value
  enumProp: {args: 1, type: [NUMBER_TYPE], [ENUM_KEY]: [1,2,3]},
  checkerProp: {
    args: 'this-is-the-right-key',
    type: STRING_TYPE,
    [CHECKER_KEY]: function(value) {
      return value === 'this-is-the-right-key';
    }
  }
}
