"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorFactoryBase = void 0;
const tslib_1 = require("tslib");
// this is the base class for all the helper methods
const errors_1 = require("@jsonql/errors");
const utils_1 = require("@jsonql/utils");
const constants_1 = require("@jsonql/constants");
const validator_core_1 = require("@jsonql/validator-core");
// ----- LOCAL ---- //
const fn_1 = require("./fn");
const constants_2 = require("../constants");
// ---- DEBUG ---- //
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('jsonql:validator:class:base');
/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
class ValidatorFactoryBase {
    // @TODO properly type the astMap
    constructor(astMap) {
        this._plugins = new Map();
        this._internalPluginNames = [];
        this._astWithBaseRules = (0, fn_1.createAutomaticRules)(astMap);
        // create the argument list in order
        this._arguments = this._astWithBaseRules.map(rule => rule[constants_2.NAME_KEY]);
        // register internal plugins
        validator_core_1.plugins.forEach((plugin) => {
            if (!plugin[constants_2.PARAMS_KEY]) {
                // We skip those need to curry and do that JIT
                plugin[constants_2.VALIDATE_ASYNC_KEY] = (0, validator_core_1.promisify)(plugin[constants_2.PLUGIN_FN_KEY]);
            }
            const name = plugin[constants_2.NAME_KEY];
            this._internalPluginNames.push(name);
            this._registerPlugin(name, plugin, true);
        });
    }
    get schema() {
        return this._schema || this._astWithBaseRules;
    }
    /** @TODO map the index array to name */
    get errors() {
        return this._errors || null;
    }
    // ----------------- validate ------------------ //
    /**
      when validate happens we check the input value
      correspond to out map, and apply the values
      argument values turn into an executable queue
    */
    _normalizeArgValues(values) {
        // there might not be a dev provided schema
        const params = this.schema;
        const pCtn = params.length;
        if (pCtn === 0) {
            return []; // nothing to do
        }
        if (!(0, validator_core_1.checkArray)(values)) {
            debug(values);
            throw new errors_1.JsonqlValidationError(constants_2.ARGS_NOT_ARRAY_ERR, values);
        }
        const vCtn = values.length;
        switch (true) {
            case vCtn === pCtn:
                return values.map((value, i) => (this._prepareForExecution(value, params[i], i)));
            case vCtn < pCtn:
                debug(`Values pass less than params`);
                return params.map((param, i) => {
                    const _value = (0, fn_1.getOptionalValue)(values[i], param);
                    return this._prepareForExecution(_value, param, i);
                });
            case vCtn > pCtn: // this is the spread style argument
                debug('spread parameters');
                return values.map((value, i) => {
                    // const required = !(i > pCtn ? true : !!params[i].required)
                    const param = params[i] || { type: constants_1.DEFAULT_TYPE, name: `_${i}` };
                    const _value = (0, fn_1.getOptionalValue)(value, param);
                    // @TODO if it's optional field and using the provide value
                    // should we skip the validation
                    return this._prepareForExecution(_value, param, i);
                });
            default: // will not fall through here @TODO
                throw new errors_1.JsonqlValidationError(constants_2.EXCEPTION_CASE_ERR, [vCtn, pCtn]);
        }
    }
    /**
      at this point we actually put the rules in the queue
      but we dont' run it yet until all rules are in the main queue
      this way, if one fail then the whole queue exited without running
    */
    _prepareForExecution(value, param, idx) {
        const { rules } = param;
        if (rules && rules.length) {
            // we only need to return the queue
            return rules.map((rule, i) => {
                // if this is not required field and no value the we create a fake callback
                if (value === undefined && !param.required) {
                    return (lastResult) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        return ((0, fn_1.successThen)(param[constants_2.NAME_KEY], value, lastResult, [idx, i])(true));
                    });
                }
                // when it fail then we provide with the index number
                return (lastResult) => tslib_1.__awaiter(this, void 0, void 0, function* () { return Reflect.apply(rule, null, [value, lastResult, [idx, i]]); });
            });
        }
        // stuff it with a placeholder fuction?
        return () => tslib_1.__awaiter(this, void 0, void 0, function* () { return true; });
    }
    // ---------------------- schema -------------------------- //
    /** put the rule in here and make it into an async method */
    _createSchema(input) {
        let astWithRules = this._astWithBaseRules;
        // all we need to do is check if its empty input
        if ((0, utils_1.notEmpty)(input, true)) {
            if ((0, validator_core_1.checkArray)(input)) {
                astWithRules = this._applyArrayInput(astWithRules, input);
            }
            else if ((0, validator_core_1.checkObject)(input)) {
                astWithRules = this._applyObjectInput(astWithRules, input);
            }
        }
        this._schema = astWithRules;
    }
    /** normalize the array style rules input */
    _applyArrayInput(astMap, input) {
        const arrayInput = input.map(utils_1.toArray);
        // We just need to take the validate methods and concat to the rules here
        return astMap.map((ast, i) => {
            if (arrayInput[i]) { // the user didn't provide additonal rules
                const input2 = this._transformInput(arrayInput[i]);
                /*
                @TODO at this point ast[RULES_KEY] has the rule generated
                when this is run with a js file there won't be any type info
                so the first rule could provide the "override" and "type"
                then we need to override it with the type
                */
                if (input2) {
                    ast[constants_2.RULES_KEY] = ast[constants_2.RULES_KEY].concat(input2);
                }
            }
            return ast;
        });
    }
    /** nomalize the object style rules input */
    _applyObjectInput(astMap, input) {
        return astMap.map((ast) => {
            const { name } = ast;
            if (input[name]) {
                // there might not be a name in there and it's important
                const _input = (0, utils_1.toArray)(input[name]).map(input => {
                    input.name = name;
                    return input;
                });
                const rules = this._transformInput(_input);
                // debug('ast[RULES_KEY]', ast[RULES_KEY])
                if (rules && rules.length) {
                    ast[constants_2.RULES_KEY] = ast[constants_2.RULES_KEY].concat(rules);
                }
            }
            return ast;
        });
    }
    /** here is the one that will transform the rules */
    _transformInput(input) {
        debug('_transformInput', input);
        return input.map((_input) => {
            const { name } = _input;
            switch (true) {
                case _input[constants_2.PLUGIN_KEY] !== undefined:
                    debug(`Should got here`, _input[constants_2.PLUGIN_KEY]);
                    return this._lookupPlugin(_input);
                case _input[constants_2.VALIDATE_KEY] !== undefined:
                    // @TODO need to transform this
                    return (0, fn_1.constructRuleCb)(name, (0, validator_core_1.promisify)(_input[constants_2.VALIDATE_KEY]));
                case _input[constants_2.VALIDATE_ASYNC_KEY] !== undefined:
                    return (0, fn_1.constructRuleCb)(name, _input[constants_2.VALIDATE_ASYNC_KEY]);
                default:
                    throw new errors_1.JsonqlError(`unable to find rule`);
            }
        });
    }
    /// ----------------------- PLUGINS ----------------------- ///
    _lookupPlugin(input) {
        const name = input[constants_2.PLUGIN_KEY];
        if (name && this._plugins.has(name)) {
            // @TODO need to transform this
            const pluginConfig = this._plugins.get(name);
            if (pluginConfig && pluginConfig[constants_2.VALIDATE_ASYNC_KEY]) {
                return (0, fn_1.constructRuleCb)(name, pluginConfig[constants_2.VALIDATE_ASYNC_KEY]);
            }
            else if (pluginConfig && pluginConfig[constants_2.PARAMS_KEY]) {
                debug('_pluign', pluginConfig);
                debug('input', input);
                const _input = input;
                // need to check if the _plugin is internal or not
                const fn = (0, utils_1.inArray)(this._internalPluginNames, name) ?
                    (0, validator_core_1.createCoreCurryPlugin)(_input) :
                    (0, validator_core_1.curryPlugin)(_input, pluginConfig);
                return (0, fn_1.constructRuleCb)(name, (0, validator_core_1.promisify)(fn));
            }
        }
        throw new errors_1.JsonqlError(`Unable to find ${name} plugin`);
    }
    /** register plugins */
    _registerPlugin(name, pluginConfig, skipCheck = false // when register internal plugin then skip it
    ) {
        if (!skipCheck) {
            if (this._plugins.has(name)) {
                throw new errors_1.JsonqlError(`plugin ${name} already existed!`);
            }
            if (pluginConfig[constants_2.PARAMS_KEY] !== undefined) {
                if (!(0, fn_1.checkPluginArg)(pluginConfig[constants_2.PARAMS_KEY])) {
                    throw new errors_1.JsonqlError(`Your plugin config argument contains reserved keywords`);
                }
            }
            if (!(0, fn_1.hasPluginFunc)(pluginConfig)) {
                throw new errors_1.JsonqlError(`Can not find any executable within your plugin config`);
            }
        }
        // put the name back in
        pluginConfig.name = name;
        switch (true) {
            // this rule is not really in use but keep here for future
            case (!pluginConfig[constants_2.VALIDATE_ASYNC_KEY] &&
                pluginConfig[constants_2.VALIDATE_KEY] &&
                (0, utils_1.isFunction)(pluginConfig[constants_2.VALIDATE_KEY])):
                pluginConfig[constants_2.VALIDATE_ASYNC_KEY] = (0, validator_core_1.promisify)(pluginConfig[constants_2.VALIDATE_KEY]);
                break;
            // use the pattern key to generate plugin method
            case (pluginConfig[constants_2.PATTERN_KEY] &&
                (0, validator_core_1.checkString)(pluginConfig[constants_2.PATTERN_KEY])):
                pluginConfig[constants_2.VALIDATE_ASYNC_KEY] = (0, fn_1.patternPluginFanctory)(pluginConfig[constants_2.PATTERN_KEY]);
                break;
            // @NOTE we can not create the curryPlugin here because it needs to be generic
            // and the arguement provide at validation time, this need to get create at the _lookupPlugin
            default:
            // @TODO more situations
        }
        this._plugins.set(name, pluginConfig);
    }
}
exports.ValidatorFactoryBase = ValidatorFactoryBase;
