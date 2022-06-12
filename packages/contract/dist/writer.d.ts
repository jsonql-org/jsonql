import type { JsonqlContractEntry, JsonqlContractTemplate, JsonqlContractMetaEntry, JsonqlProcessedEntry, JsonqlRouteForContract, JsonqlValidationRule, Validators } from './types';
import { JsonqlAstMap } from '@jsonql/ast/index';
import GeneralException from '@jsonql/errors/dist/general-exception';
export declare class ContractWriter {
    private _contract;
    $excludeValidation: Set<unknown>;
    /** instead of run the parser again we just load the ast map */
    constructor(routeForContract: JsonqlRouteForContract, type?: string);
    /**
     This will get call externally to prepare the map before init this object
     */
    static prepare(astMap: JsonqlAstMap): Partial<{
        [key: string]: any;
        name: string;
        params: JsonqlProcessedEntry[];
        route: string;
        method: string;
        file: string;
    }>[];
    /** insert extra data into node by name */
    data(propertyName: string, value: JsonqlContractEntry): void;
    /** this will always overwrite the last one */
    error(error: GeneralException): void;
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
    appendValidations(schema: JsonqlAstMap, checkFn: (rule: JsonqlValidationRule) => boolean): JsonqlContractTemplate;
    /** combine together to output the final public contract */
    outputPublic(validators?: Validators): JsonqlContractTemplate;
}
