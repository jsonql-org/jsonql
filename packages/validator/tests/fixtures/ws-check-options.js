// create options
import { createConfig, checkConfigAsync, isContract, isNotEmpty } from '../../main'
import { JsonqlValidationError, JsonqlCheckerError } from 'jsonql-errors'
import {
  STRING_TYPE,
  BOOLEAN_TYPE,
  OBJECT_TYPE,
  ENUM_KEY,
  CHECKER_KEY,
  JSONQL_PATH
} from 'jsonql-constants'
import { SOCKET_IO, AVAILABLE_SERVERS } from './constants'
import getDebug from './get-debug'
const debug = getDebug('check-options')

const getHostName = () => (
  [window.location.protocol, window.location.host].join('//')
)

const constProps = {
  // this will be the switcher!
  nspClient: null,
  nspAuthClient: null,
  // contructed path
  wssPath: ''
}

const defaultOptions = {
  // we will use this for determine the socket.io client type as well
  useJwt: createConfig(true, [BOOLEAN_TYPE, STRING_TYPE]),
  hostname: createConfig(false, [STRING_TYPE]),
  namespace: createConfig(JSONQL_PATH, [STRING_TYPE]),
  wsOptions: createConfig({transports: ['websocket']}, [OBJECT_TYPE]),
  serverType: createConfig(SOCKET_IO, [STRING_TYPE], {[ENUM_KEY]: AVAILABLE_SERVERS}),
  // we require the contract already generated and pass here
  contract: createConfig({}, [OBJECT_TYPE], {[CHECKER_KEY]: isContract}),
  enableAuth: createConfig(false, [BOOLEAN_TYPE]),
  token: createConfig(false, [STRING_TYPE])
}
// export
export default function checkOptions(config) {
  return checkConfigAsync(config, defaultOptions, constProps)
    .then(opts => {
      if (!opts.hostname) {
        opts.hostname = getHostName()
      }
      // @TODO the contract now will supply the namespace information
      // and we need to use that to group the namespace call
      opts.wssPath = [opts.hostname, opts.namespace].join('/')
      debug('opts', opts)
      return opts;
    })
}
