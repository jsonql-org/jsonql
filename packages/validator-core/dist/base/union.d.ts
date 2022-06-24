import type { AnyType, AnyTypeArr } from '@jsonql/utils/index';
/**
We use the chainProcessPromises fail and exit side effects to
accomplish this task fast, because it's OR so only need to
have one of them pass that means all pass
so if one pass we throw Error and it will exist
if it fail we resolve it therefore the then is actually failed
*/
export declare function generateReversePromisesFn(value: AnyType, types: Array<string>, extended?: AnyTypeArr): (() => Promise<string>)[];
/**
  because the union type is OR
  therefore it has to be check in one rule
*/
export declare function checkUnion(value: AnyType, types: Array<string>, extended?: AnyTypeArr): Promise<boolean>;
/**
 * Create a sync version of checkUnion
 */
export declare function checkUnionSync(value: AnyType, types: Array<string>): boolean;
