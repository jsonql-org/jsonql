import type { JsonqlContractTemplate } from './types';
export declare class ContractReader {
    private _contract;
    constructor(contract: JsonqlContractTemplate);
    private _access;
    data(path?: string): any;
    meta(path?: string): any;
    error(path?: string): any;
}
