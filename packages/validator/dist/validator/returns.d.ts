/**
 * Basically it's an alias to the validateSync
 */
export declare function checkReturns(value: any[], params: any[], async?: boolean): any;
export declare const checkReturnsAsync: (value: any[], params: any) => any;
/**
 * The combine method for use to check the resolver returns with contract
 */
export declare function checkResolverReturns(resolverType: string, resolverName: string, contract: any, value: any[]): any;
/**
 * The async version of checkResolverReturns
 */
export declare function checkResolverReturnsAsync(resolverType: string, resolverName: string, contract: any, value: any[]): any;
