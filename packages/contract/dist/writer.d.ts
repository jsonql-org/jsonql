import type { JsonqlContractEntry, JsonqlContractTemplate, JsonqlContractMetaEntry } from './types';
import { JsonqlAstMap } from '@jsonql/ast/index';
import { JsonqlError } from '@jsonql/errors';
export declare class JsonqlContractWriter {
    private _contract;
    /** instead of run the parser again we just load the ast map */
    constructor(astMap: JsonqlAstMap, type?: string);
    /**
     * need to change the format for our use
     */
    private _prepareData;
    /** insert extra data into node by name */
    data(propertyName: string, value: JsonqlContractEntry): void;
    /** this will always overwrite the last one */
    error(error: JsonqlError): void;
    /** make a shallow copy might not be enough */
    meta(entry: JsonqlContractMetaEntry): void;
    /**
      generate the contract pub false then just the raw output for server use
      in this version we might not even need a private contract anymore
      but we keep the public option just in case
    */
    output(pub?: boolean): JsonqlContractTemplate;
    /** serving up the public contract */
    serve(cacheDir: string): Promise<any>;
    /** serve up the dynamic generated contract during transport */
    /** we output several different contracts all at once */
    write(outDir: string): Promise<string>;
    /** adding validation rules to the argument */
    appendValidations(schema: JsonqlAstMap): JsonqlContractTemplate;
}
