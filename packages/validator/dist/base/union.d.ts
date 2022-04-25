/**
  because the union type is OR
  therefore it has to be check in one rule
*/
export declare function checkUnion(value: any, types: Array<string>): Promise<boolean | string>;
