// this is a collection of middleware methods
// should be good to use in Koa or Express
import fs from 'fs'
import { join } from 'path'
import { dasherize } from './dasherize'
import { 
  EXT,
  INDEX_KEY,
  RESOLVER_DIR_PROP_KEY,
  SOCKET_AUTH_NAME,
  SOCKET_NAME,
  AUTH_TYPE
} from 'jsonql-constants'

const DOT = '.'

/**
 * Get document (string) byte length for use in header
 * @param {string} doc to calculate
 * @return {number} length
 */
export const getDocLen = doc => Buffer.byteLength(doc, 'utf8')

/**
 * The koa ctx object is not returning what it said on the documentation
 * So I need to write a custom parser to check the request content-type
 * @param {object} req the ctx.request
 * @param {string} type (optional) to check against
 * @return {mixed} Array or Boolean
 */
export const headerParser = (req, type) => {
  try {
    const headers = req.headers.accept.split(',')
    if (type) {
      return headers.filter(h => h === type)
    }
    return headers;
  } catch (e) {
    // When Chrome dev tool activate the headers become empty
    return []
  }
}

/**
 * wrapper of above method to make it easier to use
 * @param {object} req ctx.request
 * @param {string} type of header
 * @return {boolean}
 */
export const isHeaderPresent = (req, type) => {
  const headers = headerParser(req, type)
  return !!headers.length;
}

/**
 * Searching for path to the resolver
 * @param {string} name of the resolver
 * @param {string} type what type of resolver
 * @param {object} opts options
 * @return {function|boolean} the resolver or FALSE
 */
export const getPathToFn = function(name, type, opts) {
  // we should check the type 
  const dir = opts[RESOLVER_DIR_PROP_KEY]
  const fileName = dasherize(name)
  let paths = []
  if (opts.contract && opts.contract[type] && opts.contract[type].file) {
    paths.push(opts.contract[type].file)
  }
  // @1.2.7 when we search for the socket-auth it will have a different hard path compare to the contract 
  const dirPath = type === SOCKET_AUTH_NAME ? join(SOCKET_NAME, AUTH_TYPE) : type 
  
  paths.push( join(dir, dirPath, fileName, [INDEX_KEY, EXT].join(DOT)) )
  paths.push( join(dir, dirPath, [fileName, EXT].join(DOT) ) )
  
  const ctn = paths.length
  for (let i=0; i<ctn; ++i) {
    if (fs.existsSync(paths[i])) {
  
      return paths[i]
    }
  }
  
  return false
}
