declare type KoaContext = {
    [key: string]: any;
};
/**
 * @TODO need to be more flexible
 */
export declare const isJsonqlPath: (ctx: KoaContext, opts: any) => boolean;
/**
 * combine two check in one and save time
 * @return {boolean} check result
 */
export declare const isJsonqlRequest: (ctx: KoaContext, opts: any) => boolean;
/**
 * check if this is point to the jsonql console
 */
export declare const isJsonqlConsoleUrl: (ctx: KoaContext, opts: any) => boolean;
export {};
