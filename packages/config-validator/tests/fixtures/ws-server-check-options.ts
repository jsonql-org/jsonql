// there is very limited options there
const { join } = require('path')
const fsx = require('fs-extra')
const { getContract } = require('./utils')

const {
  createConfig,
  checkConfigAsync,
  isContract,
  isNotEmpty,
  isString
} = require('../../main')
const {
  HSA_ALGO,
  ENUM_KEY,
  PUBLIC_KEY,
  PRIVATE_KEY,
  STRING_TYPE,
  BOOLEAN_TYPE,
  OBJECT_TYPE,
  NUMBER_TYPE,
  CHECKER_KEY,
  PEM_EXT,
  PUBLIC_KEY_NAME,
  PRIVATE_KEY_NAME,
  DEFAULT_CONTRACT_FILE_NAME
} = require('jsonql-constants')

const SOCKET_IO = 'socket.io';
const WS = 'ws';
const AVAILABLE_SERVERS = [SOCKET_IO, WS];
const SECRET_MISSING_ERR = 'secret is not provided!';

const HANDSHAKE_TYPE = 'handshake';
const ROUNDTRIP_TYPE = 'roundtrip';

const { ValidationError } = require('jsonql-errors')

// base options
const defaultOptions = {
  // @TODO this will be moving out shortly after the test done
  // RS256 this will need to figure out how to distribute the key
  algorithm: createConfig(HSA_ALGO, [STRING_TYPE]),
  authTimeout: createConfig(15000, [NUMBER_TYPE]),

  serverType: createConfig(SOCKET_IO, [STRING_TYPE], {[ENUM_KEY]: AVAILABLE_SERVERS}),
  // we require the contract already generated and pass here
  contract: createConfig({}, [OBJECT_TYPE]),
  enableAuth: createConfig(false, [BOOLEAN_TYPE]),
  // this option now is only for passing the key
  useJwt: createConfig(true, [STRING_TYPE, BOOLEAN_TYPE]), // need to double check this
  // we don't actually use this two
  contractDir: createConfig('', [STRING_TYPE]),
  resolverDir: createConfig('', [STRING_TYPE]),
  // this is for construct the namespace
  publicMethodDir: createConfig(PUBLIC_KEY, [STRING_TYPE]),
  // just try this with string type first
  privateMethodDir: createConfig(PRIVATE_KEY, [STRING_TYPE, BOOLEAN_TYPE]),
  // we only want the keys directory then we read it back
  keysDir: createConfig(false, [STRING_TYPE]),
  socketIoAuthType: createConfig(false, [STRING_TYPE], {
    [ENUM_KEY]: [HANDSHAKE_TYPE, ROUNDTRIP_TYPE]
  })
}

const constProps = {
  contract: false,
  publicKey: false,
  privateKey: false,
  secret: false,
  publicNamespace: PUBLIC_KEY,
  privateNamespace: PRIVATE_KEY
}

/**
 * @param {object} config user supply
 * @return {object} promise resolve the opts
 */
module.exports = function(config) {
  return checkConfigAsync(config, defaultOptions, constProps)
    .then(getContract)
    // processing the key
    .then(opts => {
      if (opts.enableAuth === true) {
        if (isString(opts.useJwt)) {
          opts.secret = opts.useJwt;
        } else if (opts.keysDir) {
          opts.publicKey = fsx.readFileSync(join(opts.keysDir, [PUBLIC_KEY_NAME, PEM_EXT].join('.')))
          opts.privateKey = fsx.readFileSync(join(opts.keysDir, [PRIVATE_KEY_NAME, PEM_EXT].join('.')))
        } else {
          throw new ValidationError(SECRET_MISSING_ERR)
        }
      }
      return opts;
    })
}
