import type { AnyType } from '../types';
export declare function swcParserBase(infile: string, options: AnyType): Promise<AnyType>;
/** sync version of above method */
export declare function swcParserSync(infile: string, options: AnyType): import("@swc/core").Script;
/** breaking this out to create a api using just the file */
export declare function swcParseFileBase(code: string, options: AnyType): Promise<import("@swc/core").Script>;
/** parse file sync version */
export declare function swcParseFileSync(code: string, options: AnyType): import("@swc/core").Script;
