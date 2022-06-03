"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorBase = void 0;
const tslib_1 = require("tslib");
const validation_error_1 = tslib_1.__importDefault(require("@jsonql/errors/dist/validation-error"));
const error_1 = tslib_1.__importDefault(require("@jsonql/errors/dist/error"));
const common_1 = require("@jsonql/utils/dist/common");
const chain_promises_1 = require("@jsonql/utils/dist/chain-promises");
const validator_core_1 = require("@jsonql/validator-core");
// ----- LOCAL ---- //
const fn_1 = require("./fn");
const is_function_1 = require("@jsonql/utils/dist/is-function");
const constants_1 = require("./constants");
// ---- DEBUG ---- //
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('jsonql:validator:validator-base');
/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
class ValidatorBase {
    // main
    constructor(astMap, _validatorPluginsInstance) {
        this._validatorPluginsInstance = _validatorPluginsInstance;
        this._astWithBaseRules = (0, fn_1.createAutomaticRules)(astMap);
        // create the argument name list in order
        this._arguments = this._astWithBaseRules.map(rule => rule[validator_core_1.NAME_KEY]);
    }
    /** the main method then in it's sub class will get override */
    validate(values) {
        const queues = this._normalizeArgValues(values);
        return (0, chain_promises_1.queuePromisesProcess)(queues, undefined // the init value will now be undefined to know if its first
        );
    }
    /** just return the internal schema for validation for use, see export */
    get schema() {
        return this._schema || this._astWithBaseRules;
    }
    /** overload the addValidationRules method that allow to pass a function or async function */
    addValidationRules(input) {
        debug('addValidationRules', input);
        const clearInput = {};
        for (const propName in input) {
            // we convert this to array here now
            clearInput[propName] = (0, common_1.toArray)(input[propName])
                .map((inp) => {
                if ((0, is_function_1.isFunction)(inp)) {
                    return this._updateInput(inp);
                }
                return inp;
            });
        }
        // overload the parent method
        this._createSchema(clearInput);
    }
    /** just put the function into the right key */
    _updateInput(input) {
        // we just make it an async funtion regardless
        return {
            [validator_core_1.VALIDATE_ASYNC_KEY]: (0, validator_core_1.promisify)(input)
        };
    }
    // ----------------- validate ------------------ //
    /**
      when validate happens we check the input value
      correspond to out map, and apply the values
      argument values turn into an executable queue
    */
    _normalizeArgValues(values) {
        debug('_normalizeArgValues', values);
        // there might not be a dev provided schema
        const params = this.schema;
        const pCtn = params.length;
        if (pCtn === 0) {
            return []; // nothing to do
        }
        if (!(0, validator_core_1.checkArray)(values)) {
            debug(values);
            throw new validation_error_1.default(constants_1.ARGS_NOT_ARRAY_ERR, values);
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
                debug('spread params', vCtn, pCtn);
                return this._processSpreadLikeArg(values, params);
            default: // will not fall through here @TODO
                throw new validation_error_1.default(constants_1.EXCEPTION_CASE_ERR, [vCtn, pCtn]);
        }
    }
    /** The spread or mix with spread argument is too complicated to process in couple lines */
    _processSpreadLikeArg(values, params) {
        // if it's spread only then there should be just one param
        // now search for the mixedRule - there should only be one, if not this idiot doesn't know what is doing
        const spreadParam = params.filter(p => p.tstype === constants_1.SPREAD_ARG_TYPE)[0];
        // the problem is the type is any after the first param
        return values.map((value, i) => {
            const param = params[i] || (0, common_1.assign)(spreadParam, { name: `${constants_1.SPREAD_PREFIX}${i}` });
            const _value = (0, fn_1.getOptionalValue)(value, param);
            debug('spread param', _value, param.name);
            return this._prepareForExecution(_value, param, i);
        });
    }
    /**
      at this point we actually put the rules in the queue
      but we dont' run it yet until all rules are in the main queue
      this way, if one fail then the whole queue exited without running further
    */
    _prepareForExecution(value, param, idx) {
        const { rules, required, name } = param;
        if (rules && rules.length) {
            // we only need to return the queue
            return rules.map((rule, i) => {
                // if this is not required field and no value the we create a fake callback
                if (value === undefined && !required) {
                    debug(`skip the validation`, required);
                    return (lastResult) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        return ((0, validator_core_1.successThen)(name, value, lastResult, [idx, i])(true));
                    });
                }
                // when it fail then we return the index number
                return (lastResult) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return Reflect.apply(rule, null, [value, lastResult, [idx, i]])
                        .then((result) => {
                        debug('Post rule result', result);
                        return result;
                    });
                });
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
        if ((0, common_1.notEmpty)(input, true)) {
            astWithRules = this._applyObjectInput(astWithRules, input);
        }
        debug(`_createSchema`, astWithRules);
        this._schema = astWithRules;
    }
    /** nomalize the object style rules input */
    _applyObjectInput(astMap, input) {
        return astMap.map((ast) => {
            var _a;
            const propName = ast.name;
            if (input[propName]) {
                // there might not be a name in there and it's important
                const _input = input[propName].map((input) => {
                    input.name = propName;
                    return input;
                });
                const rules = this._transformInput(_input, propName);
                // debug('ast[RULES_KEY]', ast[RULES_KEY])
                if (rules && rules.length) {
                    ast[validator_core_1.RULES_KEY] = (_a = ast[validator_core_1.RULES_KEY]) === null || _a === void 0 ? void 0 : _a.concat(rules);
                }
            }
            return ast;
        });
    }
    /** this will transform the rules to executable */
    _transformInput(input, propName) {
        debug('_transformInput', input);
        return input.map((_input, i) => {
            const ruleKeys = (0, fn_1.checkDuplicateRules)(_input);
            if (ruleKeys.length > 1) {
                throw new Error(`You can only set one rule at a time! We found ${ruleKeys.join(',')}`);
            }
            // the name is not that important but still need one, if there is none we generate it
            const pluginName = _input.name || `customPluginName${i}`;
            switch (true) {
                case _input[validator_core_1.PLUGIN_KEY] !== undefined:
                    debug(`Should got here ----->`, _input[validator_core_1.PLUGIN_KEY]);
                    return this._lookupPlugin(_input, propName);
                case _input[validator_core_1.VALIDATE_KEY] !== undefined:
                    debug(`${validator_core_1.VALIDATE_KEY} ----->`, _input);
                    return (0, validator_core_1.constructRuleCb)(propName, (0, validator_core_1.promisify)(_input[validator_core_1.VALIDATE_KEY]), pluginName);
                case _input[validator_core_1.VALIDATE_ASYNC_KEY] !== undefined:
                    debug(`${validator_core_1.VALIDATE_ASYNC_KEY} ---->`, _input);
                    return (0, validator_core_1.constructRuleCb)(propName, _input[validator_core_1.VALIDATE_ASYNC_KEY], pluginName);
                default:
                    throw new error_1.default(`unable to find rule for ${propName},
            we expect ${validator_core_1.PLUGIN_KEY}, ${validator_core_1.VALIDATE_KEY} or ${validator_core_1.VALIDATE_ASYNC_KEY}`);
            }
        });
    }
    /** wrapper methods for ValidatorPlugins */
    _lookupPlugin(input, propName) {
        // @TODO we should allow validator to use standalone without the plugin system
        // so when this plugin instance object is undefined we should skip it
        try {
            if (this._validatorPluginsInstance) {
                debug('_lookupPlugin --->', input, propName);
                return this._validatorPluginsInstance.lookupPlugin(input, propName);
            }
        }
        catch (e) {
            // @NOTE because the lookupPlugin method actually throw errors but we don't want
            // to crash it 
            debug('catch _lookupPlugin error', e);
        }
        return (0, validator_core_1.constructRuleCb)(propName, () => tslib_1.__awaiter(this, void 0, void 0, function* () { return Promise.reject(false); }), 'NO_PLUGIN_DUMMY_FUNCTION');
    }
}
exports.ValidatorBase = ValidatorBase;
