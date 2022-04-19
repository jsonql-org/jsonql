// this is a collection of middleware methods
// should be good to use in Koa or Express
import fs from 'fs'
import { join } from 'path'
import { dasherize } from '../dasherize'
import {
  EXT,
  INDEX_KEY,
  RESOLVER_DIR_PROP_KEY,
  SOCKET_AUTH_NAME,
  SOCKET_NAME,
  AUTH_TYPE
} from '@jsonql/constants'

const DOT = '.'

import { JsonqlContract } from '../types'
/**
 * ported from jsonql-resolver
 * Using the contract to find the function to call
 */
export function findFromContract(type: string, name: string, contract: JsonqlContract): string | boolean {
  if (contract[type] && contract[type][name] && contract[type][name].file) {
    if (fs.existsSync(contract[type][name].file)) {

      return contract[type][name].file
    }
  }

  return false
}


/**
 * Get document (string) byte length for use in header
 */
export const getDocLen = (doc: string): number => Buffer.byteLength(doc, 'utf8')

/**
 * The koa ctx object is not returning what it said on the documentation
 * So I need to write a custom parser to check the request content-type
 */
export const headerParser = (req: any, type: string): any[] => {
  try {
    const headers = req.headers.accept.split(',')
    if (type) {

      return headers.filter((h: string) => h === type)
    }

    return headers
  } catch (e) {
    // When Chrome dev tool activate the headers become empty
    return []
  }
}

/**
 * wrapper of above method to make it easier to use
 */
export const isHeaderPresent = (req: any, type: string): boolean => (
  !!headerParser(req, type)?.length
)

/**
 * Searching for path to the resolver
 */
export const getPathToFn = function(name: string, type: string, opts: any): string | boolean {
  // we should check the type
  const dir = opts[RESOLVER_DIR_PROP_KEY]
  const fileName = dasherize(name)
  let paths: Array<string> = []
  if (opts.contract && opts.contract[type] && opts.contract[type].file) {
    paths.push(opts.contract[type].file)
  }
  // @1.2.7 when we search for the socket-auth it will have a different hard path compare to the contract
  const dirPath = type === SOCKET_AUTH_NAME ? join(SOCKET_NAME, AUTH_TYPE) : type
  paths.push(
    join(dir, dirPath, fileName, [INDEX_KEY, EXT].join(DOT)),
    join(dir, dirPath, [fileName, EXT].join(DOT))
  )
  const ctn = paths.length
  for (let i=0; i<ctn; ++i) {
    if (fs.existsSync(paths[i])) {

      return paths[i]
    }
  }

  return false
}

/**
 * Port this from the CIS App
 * Note the original call singature has a param call `key` but never used
 */
export const replaceErrors = function(value: any): any {
  if (value instanceof Error) {
    var error = {}
    Object.getOwnPropertyNames(value).forEach(function (key) {
      error[key] = value[key]
    })

    return error
  }

  return value
}

/**
 * create readible string version of the error object
 */
export const printError = function(error: Error): string {
  //return 'MASKED'; //error.toString();
  return JSON.stringify(error, replaceErrors)
  // return inspect(error, false, null, true)
}
