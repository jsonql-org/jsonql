"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonqlContractWriter = void 0;
const tslib_1 = require("tslib");
const node_path_1 = require("node:path");
const fs_extra_1 = require("fs-extra");
const utils_1 = require("@jsonql/utils");
const constants_1 = require("./constants");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)(`jsonql:contract:class`);
// main
class JsonqlContractWriter {
    /** instead of run the parser again we just load the ast map */
    constructor(astMap, type = constants_1.REST_NAME) {
        // form the basic structure
        this._contract = {
            [constants_1.DATA_KEY]: [],
            [constants_1.META_KEY]: { type: '' },
            // [ERROR_KEY]: null // templateErrorObject
        };
        // first we make a clone of the map because when we pass
        // it to more than one object it mutatated
        const clone = (0, utils_1.cloneDeep)(astMap);
        debug('astMap', clone);
        //we are going to add props to it
        this.meta({ type });
        // @TODO jsonql
        switch (type) {
            case constants_1.REST_NAME:
                this._contract[constants_1.DATA_KEY] = this._prepareData(clone);
                break;
            default:
            // @TODO
        }
    }
    /**
     * need to change the format for our use
     */
    _prepareData(astMap) {
        // const c = stripAllTypeParams(astMap)
        const l = [];
        for (const methodName in astMap) {
            let entry = { name: methodName, params: [] };
            const params = astMap[methodName];
            if (Array.isArray(params)) {
                entry.params = params;
            }
            else if (typeof params === 'object') {
                entry = (0, utils_1.assign)({}, entry, params);
            }
            l.push(entry);
        }
        debug('prepared data', l);
        return l;
    }
    /** insert extra data into node by name */
    data(propertyName, value) {
        const contractData = this._contract[constants_1.DATA_KEY];
        // first to see if the name actually exist, we might want to add new entry
        const existed = contractData.filter((c) => c.name === propertyName);
        if (existed.length) {
            this._contract[constants_1.DATA_KEY] = contractData.map((c) => (c.name === propertyName ? (0, utils_1.assign)(c, value) : c));
        }
        else { // add new entry
            this._contract[constants_1.DATA_KEY].push(value);
        }
    }
    /** this will always overwrite the last one */
    error(error) {
        this._contract[constants_1.ERROR_KEY] = error;
    }
    /** make a shallow copy might not be enough */
    meta(entry) {
        this._contract[constants_1.META_KEY] = (0, utils_1.assign)({}, (0, utils_1.cloneDeep)(this._contract[constants_1.META_KEY]), entry);
    }
    /** generate the contract pub false then just the raw output for server use */
    output(pub = true) {
        const contract = this._contract;
        //
        if (pub) {
            // @TODO what info we need to strip out
        }
        return contract;
    }
    /** serving up the public contract */
    serve(cacheDir) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonFile = (0, node_path_1.join)(cacheDir, constants_1.PUBLIC_CONTRACT_FILE_NAME);
            if (!(0, fs_extra_1.existsSync)(jsonFile)) {
                yield this.write(cacheDir);
            }
            return (0, fs_extra_1.readJsonSync)(jsonFile);
        });
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
    /** adding validation rules to the argument */
    appendValidations(schema) {
        this._contract[constants_1.DATA_KEY] = this._contract[constants_1.DATA_KEY]
            .map((data) => {
            var _a;
            const propName = data[constants_1.NAME_KEY];
            if (propName && schema[propName]) {
                const rules = schema[propName][constants_1.RULES_KEY];
                if (rules && data[constants_1.PARAMS_KEY]) {
                    data[constants_1.PARAMS_KEY] = (_a = data[constants_1.PARAMS_KEY]) === null || _a === void 0 ? void 0 : _a.map((params) => {
                        const argName = params[constants_1.NAME_KEY];
                        if (rules[argName]) {
                            params[constants_1.RULES_KEY] = rules[argName];
                        }
                        return params;
                    });
                }
            }
            return data;
        });
        return this._contract;
    }
}
exports.JsonqlContractWriter = JsonqlContractWriter;
