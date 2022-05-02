// this methos was in the node-koa before
// but they should be generic to use across different modules
import { isHeaderPresent } from './node-middleware'
declare type KoaContext = {
  [key: string]: any
}

/**
 * @TODO need to be more flexible
 */
export const isJsonqlPath = (ctx: KoaContext, opts: any): boolean => ctx.path === opts.jsonqlPath

/**
 * combine two check in one and save time
 * @return {boolean} check result
 */
export const isJsonqlRequest = (ctx: KoaContext, opts: any): boolean => {
  const header = isHeaderPresent(ctx.request, opts.contentType)
  if (header) {

    return isJsonqlPath(ctx, opts)
  }

  return false
}

/**
 * check if this is point to the jsonql console
 */
export const isJsonqlConsoleUrl = (ctx: KoaContext, opts: any): boolean => (
  ctx.method === 'GET' && isJsonqlPath(ctx, opts)
)
