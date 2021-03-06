"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractWriter = void 0;
const tslib_1 = require("tslib");
const node_path_1 = require("node:path");
const fs_extra_1 = require("fs-extra");
const utils_1 = require("@jsonql/utils");
const constants_1 = require("./constants");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)(`jsonql:contract:class`);
// main
class ContractWriter {
    /** instead of run the parser again we just load the ast map */
    constructor(routeForContract, type = constants_1.REST_NAME) {
        // form the basic structure
        this._contract = {
            [constants_1.DATA_KEY]: [],
            [constants_1.META_KEY]: { type: '' },
            [constants_1.ERROR_KEY]: null // @TODO
        };
        // save a method just call it
        this.$excludeValidation = new Set();
        // first we make a clone of the map because when we pass
        // it to more than one object it mutatated
        const clone = (0, utils_1.cloneDeepCheap)(routeForContract);
        //we are going to add props to it
        this.meta({ type });
        // @TODO jsonql
        switch (type) {
            case constants_1.REST_NAME:
                this._contract[constants_1.DATA_KEY] = clone;
                break;
            default:
            // @TODO
        }
    }
    /**
     This will get call externally to prepare the map before init this object
     */
    static prepare(astMap) {
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
        this._contract[constants_1.ERROR_KEY] = error; // @TODO need to transform to json for transport
    }
    /** make a shallow copy might not be enough */
    meta(entry) {
        this._contract[constants_1.META_KEY] = (0, utils_1.assign)({}, (0, utils_1.cloneDeepCheap)(this._contract[constants_1.META_KEY]), entry);
    }
    /**
      generate the contract pub false then just the raw output for server use
      in this version we might not even need a private contract anymore
      but we keep the public option just in case
    */
    output(pub = true) {
        const contract = this._contract;
        if (pub) {
            // we are taking out all the server: true or pure function rules
            return {
                [constants_1.DATA_KEY]: contract[constants_1.DATA_KEY].map((data) => {
                    var _a;
                    // if this api has no params then just excluded it by default
                    if (!data[constants_1.PARAMS_KEY] || data[constants_1.PARAMS_KEY].length === 0) {
                        data[constants_1.VALIDATE_KEY] = false;
                        return data;
                    }
                    // next processing the rules
                    data[constants_1.PARAMS_KEY] = (_a = data[constants_1.PARAMS_KEY]) === null || _a === void 0 ? void 0 : _a.map((params) => {
                        if (params[constants_1.RULES_KEY]) {
                            params[constants_1.RULES_KEY] = params[constants_1.RULES_KEY].filter((rule) => {
                                return !(0, utils_1.isFunction)(rule) && rule[constants_1.SERVER_KEY] !== true;
                            });
                        }
                        return params;
                    });
                    return data;
                }),
                [constants_1.META_KEY]: contract[constants_1.META_KEY]
            };
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
    appendValidations(schema, checkFn) {
        debug('appendValidations', this._contract[constants_1.DATA_KEY], schema);
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
                            // also check if this is built-in plugin
                            const _rules = rules[argName]
                                .filter((rule) => {
                                const result = checkFn(rule);
                                debug('checkFn', rule, result);
                                return result;
                            });
                            if (_rules.length) {
                                params[constants_1.RULES_KEY] = _rules;
                            }
                        }
                        return params;
                    });
                }
            }
            return data;
        });
        return this._contract;
    }
    /** combine together to output the final public contract */
    outputPublic(validators) {
        // there is a possiblity that the validators it no available
        if (validators) {
            const { schema, plugins } = validators.export();
            if (process.env.DEBUG) {
                console.log('------------------------ schema -------------------------------');
                console.dir(schema, { depth: null });
                console.log('------------------------ plugins -------------------------------');
                console.dir(plugins, { depth: null });
            }
            const checkFn = validators.checkRuleCanExport(plugins);
            this.appendValidations(schema, checkFn);
        }
        // at this point should be the final call
        const contract = this.output(true);
        // add excluded validation info if any
        if (this.$excludeValidation.size) {
            contract[constants_1.DATA_KEY] = contract[constants_1.DATA_KEY].map((entry) => {
                if (this.$excludeValidation.has(entry.name)) {
                    entry[constants_1.VALIDATE_KEY] = false;
                }
                return entry;
            });
        }
        return contract;
    }
}
exports.ContractWriter = ContractWriter;
