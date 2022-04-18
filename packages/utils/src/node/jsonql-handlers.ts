// this methos was in the node-koa before
// but they should be generic to use across different modules
import { isHeaderPresent } from './node-middleware'
import { Context } from 'koa'

/**
 * @TODO need to be more flexible
 */
export const isJsonqlPath = (ctx: Context, opts: any): boolean => ctx.path === opts.jsonqlPath

/**
 * combine two check in one and save time
 * @return {boolean} check result
 */
export const isJsonqlRequest = (ctx: Context, opts: any): boolean => {
  const header = isHeaderPresent(ctx.request, opts.contentType)
  if (header) {

    return isJsonqlPath(ctx, opts)
  }

  return false
}

/**
 * check if this is point to the jsonql console
 */
export const isJsonqlConsoleUrl = (ctx: Context, opts: any): boolean => (
  ctx.method === 'GET' && isJsonqlPath(ctx, opts)
)
