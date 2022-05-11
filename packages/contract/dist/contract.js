"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonqlContract = void 0;
const tslib_1 = require("tslib");
// We now use an object style to generate contract
// this is for the Velocejs FastApi
const node_path_1 = require("node:path");
const fs_extra_1 = require("fs-extra");
const ast_1 = require("@jsonql/ast");
const utils_1 = require("@jsonql/utils");
const constants_1 = require("@jsonql/constants");
const common_1 = require("./common");
// main
class JsonqlContract {
    /** instead of run the parser again we just load the ast map */
    constructor(astMap, type = constants_1.REST_NAME) {
        // form the basic structure
        this._contract = {
            [constants_1.DATA_KEY]: [],
            [constants_1.META_KEY]: { type: '' },
            // [ERROR_KEY]: null // templateErrorObject
        };
        //we are going to add props to it
        this.meta({ type });
        // @TODO jsonql
        switch (type) {
            case constants_1.REST_NAME:
                this._contract[constants_1.DATA_KEY] = this._prepareData(astMap);
                break;
            default:
            // @TODO
        }
    }
    /**
     * need to change the format for our use
     */
    _prepareData(astMap) {
        const cleanObj = (0, ast_1.stripAllTypeParams)(astMap);
        const c = (0, common_1.getObjValue)(cleanObj);
        const l = [];
        for (const methodName in c) {
            l.push({
                name: methodName,
                params: c[methodName]
            });
        }
        return l;
    }
    /** insert extra data into node by name */
    data(name, value) {
        const contractData = this._contract[constants_1.DATA_KEY];
        this._contract[constants_1.DATA_KEY] = contractData.map((c) => (c.name === name ? (0, utils_1.assign)(c, value) : c));
    }
    /** this will always overwrite the last one */
    error(error) {
        this._contract[constants_1.ERROR_KEY] = error;
    }
    /** always make sure it's immutable */
    meta(entry) {
        this._contract[constants_1.META_KEY] = (0, utils_1.assign)({}, this._contract[constants_1.META_KEY], entry);
    }
    /** generate the contract pub false then just the raw output for server use */
    output(pub = true) {
        const contract = this._contract;
        if (pub) {
            // @TODO what info we need to strip out
        }
        return contract;
    }
    /** serving up the public contract */
    serve(cacheDir) {
        return (0, fs_extra_1.readJsonSync)((0, node_path_1.join)(cacheDir, constants_1.PUBLIC_CONTRACT_FILE_NAME));
    }
    /** serve up the dynamic generated contract during transport */
    // @TODO
    /** we output several different contracts all at once */
    write(outDir) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.chainPromises)([
                [constants_1.DEFAULT_CONTRACT_FILE_NAME, this.output(false)],
                [constants_1.PUBLIC_CONTRACT_FILE_NAME, this.output()] // public contract
            ].map(([file, contract]) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const dest = (0, node_path_1.join)(outDir, file);
                return (0, fs_extra_1.outputJson)(dest, contract, { spaces: 2 })
                    .then(() => dest);
            })));
        });
    }
}
exports.JsonqlContract = JsonqlContract;
