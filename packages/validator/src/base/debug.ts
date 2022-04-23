// just a wrapper
import debugFn from 'debug'

export function debug(name: string) {
  return debugFn('jsonql:validator:' + name)
}
