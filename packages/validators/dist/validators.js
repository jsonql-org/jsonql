"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const tslib_1 = require("tslib");
const validator_1 = require("@jsonql/validator");
const validator_core_1 = require("@jsonql/validator-core");
const common_1 = require("@jsonql/utils/dist/common");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:validator:main');
/**
  Instead of one ast per init
   we now pass the entire ast here
   then get it back via the propertyName
**/
class Validators {
    /** main */
    constructor(_astMap) {
        this._astMap = _astMap;
        this._validationRules = new Map();
        this._validators = new Map();
        this._plugin = new validator_core_1.ValidatorPlugins();
        for (const propertyName in this._astMap) {
            this._validators.set(propertyName, new validator_1.Validator(this._astMap[propertyName], this._plugin));
        }
    }
    /** get the validator */
    getValidator(propertyName) {
        if (this._validators.has(propertyName)) {
            const obj = this._validators.get(propertyName);
            // overload the method here
            return {
                addValidationRules: this._addValidationRules(propertyName, obj),
                validate: obj.validate.bind(obj)
            };
        }
        throw new Error(`${propertyName} validator is not registered!`);
    }
    // ------------------- OVERLOAD ----------------------//
    /** overload the ValidatorPlugin registerPlugin method */
    registerPlugin(name, pluginConfig) {
        // this._appendRules(name, pluginConfig)
        this._plugin.registerPlugin(name, pluginConfig);
    }
    /** export for contract */
    export() {
        const schema = {};
        this._validationRules.forEach((value, propName) => {
            const obj = this._validators.get(propName);
            schema[propName] = { rule: value, schema: obj.schema };
        });
        debug('export schema', schema);
        const plugins = this._plugin.export();
        debug('plugin configs', plugins);
        return { schema, plugins };
    }
    /*
    @TODO
    When to add
    1. when a rule is add we check if this is internal plugin and not mark as `server`
    2. When a rule is insert via loadExtPlugin and the original plugin was not mark as server
  
    IDEA
    we could extract the inline code and store it in file (or just in memeory)
    and insert a new url (e.g. /veloce/plugin) then serve it up to the client
    */
    /** store the rules for later export */
    _appendRules(propertyName, input) {
        if (this._validationRules.has(propertyName)) {
            const existingRules = this._validationRules.get(propertyName);
            for (const propName in existingRules) {
                if (input[propName]) {
                    if (Array.isArray(input[propName])) {
                        existingRules[propName] = existingRules[propName].concat(input[propName]);
                    }
                    else {
                        existingRules[propName].push(input[propName]);
                    }
                }
            }
            this._validationRules.set(propertyName, existingRules);
        }
        else {
            const cleanInput = {};
            for (const argName in input) {
                cleanInput[argName] = (0, common_1.toArray)(input[argName]);
            }
            debug('adding new rule', input, cleanInput);
            this._validationRules.set(propertyName, cleanInput);
        }
    }
    /** overload the Validator addValidationRules */
    _addValidationRules(propertyName, obj) {
        return (input) => {
            this._appendRules(propertyName, input);
            return Reflect.apply(obj.addValidationRules, obj, [input]);
        };
    }
}
exports.Validators = Validators;
