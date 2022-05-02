import * as swc from '@swc/core';
export declare function swcParserBase(infile: string, options: any): Promise<any>;
/** breaking this out to create a api using just the file */
export declare function swcParseFileBase(code: string, options: any): Promise<swc.Script>;
export declare function swcParseFileSync(code: string, options: any): swc.Script;
