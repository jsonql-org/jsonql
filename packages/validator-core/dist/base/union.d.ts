/**
We use the chainProcessPromises fail and exit side effects to
accomplish this task fast, because it's OR so only need to
have one of them pass that means all pass
so if one pass we throw Error and it will exist
if it fail we resolve it therefore the then is actually failed
*/
export declare function generateReversePromisesFn(value: any, types: Array<string>, extended?: Array<any>): (() => Promise<string>)[];
/**
  because the union type is OR
  therefore it has to be check in one rule
*/
export declare function checkUnion(value: any, types: Array<string>, extended?: Array<any>): Promise<boolean>;
