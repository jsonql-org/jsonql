import { JsonqlError } from '@jsonql/errors';
export declare class JsonqlContract {
    private _contract;
    /** instead of run the parser again we just load the ast map */
    constructor(astMap: any, type?: "rest");
    /**
     * need to change the format for our use
     */
    private _prepareData;
    /** insert extra data */
    data(name: string, value: any): void;
    /** this will always overwrite the last one */
    error(error: JsonqlError): void;
    /** always make sure it's immutable */
    meta(entry: any): void;
    /** generate the contract pub false then just the raw output for server use */
    output(pub?: boolean): any;
    /** we output several different contracts all at once */
    write(outDir: string): Promise<any>;
}
