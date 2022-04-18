import { Context } from 'koa';
/**
 * @TODO need to be more flexible
 */
export declare const isJsonqlPath: (ctx: Context, opts: any) => boolean;
/**
 * combine two check in one and save time
 * @return {boolean} check result
 */
export declare const isJsonqlRequest: (ctx: Context, opts: any) => boolean;
/**
 * check if this is point to the jsonql console
 */
export declare const isJsonqlConsoleUrl: (ctx: Context, opts: any) => boolean;
