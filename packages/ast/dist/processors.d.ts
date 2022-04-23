import { SwcProcessedModule } from './types';
/** the first one to get call to take the body out from Class module */
export declare function processClassModuleBody(module: SwcProcessedModule): any;
export declare function processFunctionModuleBody(module: SwcProcessedModule): any;
export declare function normalize(body: Array<any>): any;
/** process the function argument params */
export declare function processArgParams(body: any): {
    [x: number]: any;
};
/** processing the class methods arguments **/
export declare function processArgs(classBody: any): any;
export declare function extractAssignmentPattern(pat: any): {
    name: any;
    required: boolean;
    type: string;
    value: any;
};
/** extract value from the pat */
export declare function extractValue(pat: any): any;
/** translate the type name from an AssignmentPattern */
export declare function translateType(swcType: string): string;
/** wrap this in one method to make the code cleaner */
export declare function extractIdentifier(pat: any): {
    name: any;
    required: boolean;
    type: any;
};
export declare function extractTypeAnnotation(pat: any): any;
