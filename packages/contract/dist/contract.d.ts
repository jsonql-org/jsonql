import { JsonqlAstMap } from '@jsonql/ast/index';
import { JsonqlError } from '@jsonql/errors';
import { JsonqlContractEntry, JsonqlContractTemplate, JsonqlContractMetaEntry } from './types';
export declare class JsonqlContract {
    private _contract;
    /** instead of run the parser again we just load the ast map */
    constructor(astMap: JsonqlAstMap, type?: string);
    /**
     * need to change the format for our use
     */
    private _prepareData;
    /** insert extra data into node by name */
    data(name: string, value: JsonqlContractEntry): void;
    /** this will always overwrite the last one */
    error(error: JsonqlError): void;
    /** always make sure it's immutable */
    meta(entry: JsonqlContractMetaEntry): void;
    /** generate the contract pub false then just the raw output for server use */
    output(pub?: boolean): JsonqlContractTemplate;
    /** serving up the public contract */
    serve(cacheDir: string): Promise<any>;
    /** serve up the dynamic generated contract during transport */
    /** we output several different contracts all at once */
    write(outDir: string): Promise<string>;
}
