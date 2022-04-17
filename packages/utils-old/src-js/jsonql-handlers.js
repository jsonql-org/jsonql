// this methos was in the node-koa before
// but they should be generic to use across different modules

import { isHeaderPresent } from './node-middleware'

/**
 * @TODO need to be more flexible
 * @param {object} ctx koa
 * @param {object} opts configuration
 * @return {boolean} if it match
 */
export const isJsonqlPath = (ctx, opts) => ctx.path === opts.jsonqlPath

/**
 * combine two check in one and save time
 * @param {object} ctx koa
 * @param {object} opts config
 * @return {boolean} check result
 */
export const isJsonqlRequest = (ctx, opts) => {
  const header = isHeaderPresent(ctx.request, opts.contentType)
  if (header) {
    return isJsonqlPath(ctx, opts)
  }
  return false
}

/**
 * check if this is point to the jsonql console
 * @param {object} ctx koa context
 * @param {object} opts config
 * @return {boolean}
 */
export const isJsonqlConsoleUrl = (ctx, opts) => (
  ctx.method === 'GET' && isJsonqlPath(ctx, opts)
)
