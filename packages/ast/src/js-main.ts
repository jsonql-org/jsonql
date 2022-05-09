import {
  swcParserSync,
  swcParseFileSync,
} from './lib/swc-parser-base'
import {
  getOptions
} from './lib/common'

/** parse js file sync version */
export function jsParser(infile: string) {
  const opts = getOptions('js')

  return swcParserSync(infile, opts)
}

/** parse js code */
export function jsFileParser(code: string) {
  const opts = getOptions('js')

  return swcParseFileSync(code, opts)
}
