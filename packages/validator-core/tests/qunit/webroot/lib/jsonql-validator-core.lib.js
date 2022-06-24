(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@jsonql/utils/dist/lodash'), require('@jsonql/utils/dist/truetypeof'), require('@jsonql/utils/dist/object'), require('@jsonql/utils/dist/chain-promises'), require('@jsonql/errors/dist/general-exception'), require('@jsonql/errors/dist/validation-error'), require('@jsonql/utils/dist/common'), require('@jsonql/utils/dist/is-function'), require('@jsonql/utils/dist/regex'), require('debug')) :
    typeof define === 'function' && define.amd ? define(['exports', '@jsonql/utils/dist/lodash', '@jsonql/utils/dist/truetypeof', '@jsonql/utils/dist/object', '@jsonql/utils/dist/chain-promises', '@jsonql/errors/dist/general-exception', '@jsonql/errors/dist/validation-error', '@jsonql/utils/dist/common', '@jsonql/utils/dist/is-function', '@jsonql/utils/dist/regex', 'debug'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JsonqlValidatorCore = {}, global.lodash, global.truetypeof, global.object, global.chainPromises, global.GeneralException, global.ValidationError, global.common, global.isFunction, global.regex, global.debugFn));
})(this, (function (exports, lodash, truetypeof, object, chainPromises, GeneralException, ValidationError, common, isFunction, regex, debugFn) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var GeneralException__default = /*#__PURE__*/_interopDefaultLegacy(GeneralException);
    var ValidationError__default = /*#__PURE__*/_interopDefaultLegacy(ValidationError);
    var debugFn__default = /*#__PURE__*/_interopDefaultLegacy(debugFn);

    // validate string type
    /**
     * double check if its string
     */
    function checkString(value) {
        return ((value + '').trim() !== '') ? lodash.isString(value) : false;
    }

    // check for boolean
    /**
     * if something is a boolean
     */
    function checkBoolean(value) {
        return truetypeof.trueTypeOf(value) === 'boolean';
    }

    // validator numbers
    /**
     * @2015-05-04 found a problem if the value is a number like string
     * it will pass, so add a check if it's string before we pass to next
     */
    function checkNumber(value) {
        return truetypeof.trueTypeOf(value) !== 'number' ? false : !isNaN(parseFloat(value + ''));
    }
    // Add more number type / value checking
    function checkInteger(value) {
        console.log(`@TODO checkInteger`, value);
    }
    function checkFloat(value) {
        console.log(`@TODO checkFloat`, value);
    }
    function checkUnsigned(value) {
        console.log(`@TODO check unsigned`, value);
    }

    /** validate any thing only check if there is something */
    function checkAny(value, checkNull = true) {
        if (value !== undefined && value !== '' && (value + '').trim() !== '') {
            if (checkNull === false || (checkNull === true && value !== null)) {
                return true;
            }
        }
        return false;
    }

    // ported from @jsonql/constants
    const OR_SEPERATOR = '|';
    const BOOLEAN_TYPE = 'boolean';
    const STRING_TYPE = 'string';
    const NUMBER_TYPE = 'number';
    const ARRAY_TYPE = 'array';
    const OBJECT_TYPE = 'object';
    // Legacy
    const ARRAY_TS_TYPE_LFT = 'Array<';
    const ARRAY_TYPE_LFT = 'array.<';
    const ARRAY_TYPE_RGT = '>';
    // local
    const VALIDATE_KEY = 'validate';
    const VALIDATE_ASYNC_KEY = 'validateAsync';
    const PLUGIN_KEY = 'plugin';
    const PLUGIN_FN_KEY = 'main';
    const PATTERN_KEY = 'pattern';
    const RULES_KEY = 'rules';
    const NAME_KEY = 'name';
    const PARAMS_KEY = 'params';
    const IDX_KEY = '$$idx';
    const VALUE_KEY = '$$value';
    const RESERVED_WORD_ERR = 'Your plugin config argument contains reserved keywords';
    const ARG_NOT_MATCH_ERR = "Your params doesn't matching your main argument list";
    const MAIN_NOT_FOUND_ERR = "Can not find 'main' method in your plugin config";
    const KEYWORDS = [
        PARAMS_KEY,
        PATTERN_KEY,
        VALIDATE_KEY,
        VALIDATE_ASYNC_KEY,
        PLUGIN_KEY,
        RULES_KEY,
        'name',
        'type',
        'types',
        'server',
        'tstype',
        'value',
        'optional',
        'tmp',
        'pos',
        'lastResult',
    ];

    // primitive types
    /**
     * this is a wrapper method to call different one based on their type
     */
    function combineCheck(type) {
        switch (type) {
            case NUMBER_TYPE:
                return checkNumber;
            case STRING_TYPE:
                return checkString;
            case BOOLEAN_TYPE:
                return checkBoolean;
            default:
                return checkAny;
        }
    }

    const STYLES = {
        ts: ARRAY_TS_TYPE_LFT,
        jsdoc: ARRAY_TYPE_LFT
    };
    /**
     * check if its array or array like
     * why the type is a not a boolean?
     */
    function checkArray(value, type // @TODO more combination
    ) {
        if (Array.isArray(value)) {
            if (!type) {
                return true;
            }
            // we test it in reverse
            // @TODO if the type is an array (OR) then what?
            // we need to take into account this could be an array
            let c;
            if (Array.isArray(type)) { // Union type
                c = value.filter((v) => {
                    // only need one is correct
                    const ctn = type.length;
                    for (let i = 0; i < ctn; ++i) {
                        const t = type[i];
                        if ((t === ARRAY_TYPE && Array.isArray(v)) ||
                            (t === OBJECT_TYPE && object.isPlainObject(v)) ||
                            combineCheck(t)(v)) {
                            return false;
                        }
                    }
                    return true;
                });
            }
            else {
                c = value.filter(v => !combineCheck(type)(v));
            }
            return !(c.length > 0);
        }
        return false;
    }
    /** Take the string type like array.<T> or Array<T> apart */
    function destructArrayStr(type, syntax = 'ts') {
        const left = STYLES[syntax];
        if (!left) {
            throw new Error(`Syntax not supported! ${Object.keys(STYLES)}`);
        }
        if (type.indexOf(left) > -1 && type.indexOf(ARRAY_TYPE_RGT) > -1) {
            const _type = type.replace(left, '').replace(ARRAY_TYPE_RGT, '');
            if (_type.indexOf(OR_SEPERATOR)) {
                // return as array
                return _type.split(OR_SEPERATOR);
            }
            // return as array
            return [_type];
        }
        return false;
    }
    /**
     * check if it matches the array.<T> pattern
     * This method will be deprecated soon - we are not using the jsdoc to get the type any more
     * @TODO 2022-04-23 Instead of deprecated this we need to expand this method to use the swc generated map
     * also make it compatible between the array.<T> and the array<T> style (jsdoc or ts)
     */
    function isArrayLike(type) {
        // debugFn(type)
        // check ts first
        const check1 = destructArrayStr(type);
        if (!check1) {
            return destructArrayStr(type, 'jsdoc');
        }
        /**
        Todo read the swc generate map here
      
        **/
        return false;
    }
    /**
     * we might encounter something like array.<T> then we need to take it apart
     @TODO_deprecated This method is no longer needed here
     */
    function arrayTypeHandler(p, type) {
        const { arg } = p;
        // need a special case to handle the OR type
        // we need to test the args instead of the type(s)
        if (type.length > 1) {
            return !arg.filter((v) => (!(type.length > type.filter((t) => !combineCheck(t)(v)).length))).length;
        }
        // type is array so this will be or!
        return type.length > type.filter((t) => !checkArray(arg, t)).length;
    }

    /**
     * check if the input is object also able to check if key(s) existed in that object
     @TODO need to rethink about how this checkObject keys should be
     */
    function checkObject(value, keys) {
        if (object.isPlainObject(value)) {
            if (!keys) {
                return true;
            }
            // bs about ts
            if (typeof keys === 'string') {
                return keys in value;
            }
            // @TODO we might have to break it up into a different method
            else if (checkArray(keys)) {
                if (typeof keys[0] === 'string') {
                    return checkIfKeysInObj(value, keys);
                }
                return checkIfNameTypeInObj(value, keys);
            }
        }
        return false;
    }
    /** check if the keys existed in the object */
    function checkIfKeysInObj(value, keys) {
        return !keys.filter((key) => {
            return !(key in value);
        }).length;
    }
    /** check if JsonqlCheckObjectKeys is in the object */
    function checkIfNameTypeInObj(value, keys) {
        // please note we DON'T care if some is optional
        // please refer to the contract.json for the keys
        return !keys.filter((key) => {
            const _value = value[key.name];
            return !(key.type.length > key.type.filter((type) => {
                let tmp;
                if (_value !== undefined) {
                    if ((tmp = isArrayLike(type)) !== false) {
                        return !arrayTypeHandler({ arg: _value }, tmp);
                        // return tmp.filter(t => !checkArray(_value, t)).length;
                        // @TODO there might be an object within an object with keys as well :S
                    }
                    return !combineCheck(type)(_value);
                }
                return true;
            }).length);
        }).length;
    }
    /**
     * fold this into it's own function to handler different object type
     */
    const objectTypeHandler = function (p) {
        const { arg, param } = p;
        const _args = [arg];
        if (Array.isArray(param.keys) && param.keys.length) {
            _args.push(param.keys);
        }
        // just simple check
        return Reflect.apply(checkObject, null, _args);
    };
    /** check if an object is empty */
    const isEmptyObject = function (value) {
        if (object.isPlainObject(value)) {
            const keys = Object.keys(value);
            return !keys.length;
        }
        return false;
    };

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    /** wrap the or return result together */
    function typeAsFail(result, type) {
        return result || type;
    }
    /**
    We use the chainProcessPromises fail and exit side effects to
    accomplish this task fast, because it's OR so only need to
    have one of them pass that means all pass
    so if one pass we throw Error and it will exist
    if it fail we resolve it therefore the then is actually failed
    */
    function generateReversePromisesFn(value, types, extended // this will be check keys
    ) {
        // we return it as a function therefore
        // if the last one fail the next one no need to get exeucte
        return types.map((type, i) => {
            const args = [value];
            if (extended && extended[i]) {
                args.push(extended[i]);
            }
            switch (type) {
                case ARRAY_TYPE:
                    return () => typeAsFail(Reflect.apply(checkArray, null, args), type);
                case OBJECT_TYPE:
                    return () => typeAsFail(Reflect.apply(checkObject, null, args), type);
                default:
                    return () => typeAsFail(combineCheck(type)(value), type);
            }
        })
            .map(fn => (
        // this treat result in opposite way because once one pass
        // then we want to exit the queue (it's OR just need one to pass)
        () => __awaiter(this, void 0, void 0, function* () {
            const result = fn();
            // @TODO may be push them together in one array?
            return result === true ? Promise.reject(true) : Promise.resolve(result);
        })));
    }
    /**
      because the union type is OR
      therefore it has to be check in one rule
    */
    function checkUnion(value, types, extended) {
        return __awaiter(this, void 0, void 0, function* () {
            const ps = generateReversePromisesFn(value, types, extended);
            // we wrap this in another promise to reverse the result
            return new Promise((resolver, rejecter) => {
                /**
                There is a weird behavior here, if we call the catch first
                the 'then' always get call, it might be a promise A behavior
                */
                chainPromises.queuePromisesProcess(ps, types[0])
                    .then((type) => {
                    // console.log('failed', type)
                    rejecter(type);
                })
                    .catch((res) => {
                    // console.log('passed', res)
                    resolver(res);
                });
            });
        });
    }
    /**
     * Create a sync version of checkUnion
     */
    function checkUnionSync(value, types) {
        const ctn = types.length;
        for (let i = 0; i < ctn; ++i) {
            const type = types[i];
            switch (type) {
                case ARRAY_TYPE:
                    if (checkArray(value)) {
                        return true;
                    }
                    break;
                case OBJECT_TYPE:
                    if (checkObject(value)) {
                        return true;
                    }
                    break;
                default:
                    if (combineCheck(type)(value)) {
                        return true;
                    }
            }
        }
        return false;
    }

    // create our own promisify method here
    /** it's quite annoying Typescript Function type is useless */
    function promisify(fn) {
        return (...args) => __awaiter(this, void 0, void 0, function* () {
            const result = yield Reflect.apply(fn, null, args);
            return result ? Promise.resolve(result) : Promise.reject(result);
        });
    }
    /** When the result is true get rejected and vice vesa */
    function reversePromisifyResult(fn) {
        return (...args) => __awaiter(this, void 0, void 0, function* () {
            const result = yield Reflect.apply(fn, null, args);
            return result ? Promise.reject(result) : Promise.resolve(result);
        });
    }

    // import { isString } from '@jsonql/utils/dist/lodash'
    // @NOTE can not use the isString method because stupid Typescript complaint it's not string
    // even you cast it again
    function len(value) {
        return typeof value === 'string'
            ? value.length
            : value;
    }

    const name$8 = 'moreThan';
    function main$8(num, value) {
        return len(value) > num;
    }
    var moreThan = {
        name: name$8,
        main: main$8,
        params: ['num']
    };

    const name$7 = "lessThan";
    function main$7(num, value) {
        return len(value) < num;
    }
    var lessThan = {
        name: name$7,
        main: main$7,
        params: ['num']
    };

    // between
    const name$6 = 'between';
    function main$6(max, min, value) {
        return lessThan.main(max, value) && moreThan.main(min, value);
    }
    // so when we register it, we know what param we should expect
    var between = {
        main: main$6,
        name: name$6,
        params: ['max', 'min']
    };

    // email validator
    // this is an example how to create a plugin
    // one default export method accept one parameter value return boolean
    // then export a named export call name: string and that's it
    // or just return a string regex pattern: string
    const name$5 = 'email';
    function main$5(value) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value);
    }
    var email = {
        main: main$5,
        name: name$5,
    };

    // test for integer
    const name$4 = "int";
    function main$4(value) {
        return Number.isInteger(value);
    }
    var int = {
        name: name$4,
        main: main$4,
    };

    const name$3 = 'lessThanEqual';
    function main$3(num, value) {
        return len(value) <= num;
    }
    var lessThanEqual = {
        name: name$3,
        main: main$3,
        params: ['num']
    };

    const name$2 = 'moreThanEqual';
    function main$2(num, value) {
        return len(value) >= num;
    }
    var moreThanEqual = {
        name: name$2,
        main: main$2,
        params: ['num']
    };

    const name$1 = "unit";
    function main$1(value) {
        return Number.isInteger(value) && value >= 0;
    }
    var unit = {
        name: name$1,
        main: main$1,
    };

    const name = 'main';
    function main(max, min, value) {
        return lessThanEqual.main(max, value) && moreThanEqual.main(min, value);
    }
    var within = {
        name,
        main,
        params: ['max', 'min']
    };

    // This export files also will get build individually for the client side
    const plugins = [
        between,
        email,
        int,
        lessThanEqual,
        lessThan,
        moreThanEqual,
        moreThan,
        unit,
        within,
    ];

    /**
      construct the curry plugin method
      @0.5.0 we make this generic
    */
    function curryPlugin(input, pluginConfig) {
        const { plugin } = input;
        if (plugin) {
            const params = pluginConfig[PARAMS_KEY]; // if we use pluginExport.params then TS complain!
            if (params) {
                // @BUG if the input missing the key then it wont throw for example
                // we expect `arg` but pass the `min` then it will run but just failed
                if (!checkArgKeys(input, params)) {
                    throw new GeneralException__default["default"](`Expected params: ${params.join(',')} not found!`);
                }
                const args = params.map((param) => input[param]);
                return Reflect.apply(lodash.curry(pluginConfig.main), null, args);
            }
            else {
                throw new GeneralException__default["default"](`This plugin ${pluginConfig.name} can not be curry`);
            }
        }
        throw new GeneralException__default["default"](`Unable to find plugin in config`);
    }
    /** check if the expected key presented in the config */
    function checkArgKeys(config, params) {
        return params.filter(key => config[key]).length === params.length;
    }

    const debug$1 = debugFn__default["default"]('jsonql:validator-core:common');
    /** check plugin argument against keywords list */
    function checkPluginArg(params) {
        return !(params.filter(param => KEYWORDS.includes(param)).length > 0);
    }
    /** now simply it with just one prop check main */
    function pluginHasFunc(rule) {
        return rule[PLUGIN_FN_KEY] && isFunction.isFunction(rule[PLUGIN_FN_KEY]);
    }
    /** Just take the keys without the value */
    function getArgsKey(rule) {
        const params = extractFnArgs(rule.main.toString());
        params.pop();
        return params;
    }
    /** instead of just checking the user params, we go one step further to extract it for them */
    function searchParamsKey(rule) {
        const params = getArgsKey(rule);
        const l = params.length;
        if (l === 0) {
            return rule; // nothing to do
        }
        // now we check if the params has reserved word
        if (!checkPluginArg(params)) {
            throw new GeneralException__default["default"](RESERVED_WORD_ERR);
        }
        rule[PARAMS_KEY] = params;
        return rule;
    }
    /** check if the params they provide is matching their main method */
    function paramMatches(rule) {
        const params = getArgsKey(rule);
        const l = params.length;
        if (l === 0 && !rule[PARAMS_KEY]) {
            return true; // nothing to check
        }
        const _params = rule.params !== undefined && Array.isArray(rule.params)
            ? rule.params : false;
        if (_params === false) {
            return false;
        }
        if (l > 0 && l === _params.length) {
            if (!params.filter((param, i) => param !== _params[i]).length) {
                return true;
            }
        }
        return false;
    }
    /** take a function string and return its argument names */
    function extractFnArgs(fnStr) {
        return fnStr.split('(')[1]
            .split(')')[0]
            .split(',')
            .map(t => t.trim())
            .filter(t => t !== '');
    }
    /**
    this will get re-use in the class to create method for the queue execution
     */
    function constructRuleCb(argName, ruleFn, ruleName) {
        return (value, lastResult, pos) => __awaiter(this, void 0, void 0, function* () {
            // @NOTE keep getting problem with ruleFn is not a async funtion pass here
            // so we need to first execute it then check if is thenable
            return Reflect.apply(ruleFn, null, [value])
                .then(successThen(argName, value, lastResult, pos))
                .catch((error) => {
                debug$1('failed', argName, value, error, pos);
                // the name should be the validator name - not the property name
                // because the pos already indicator the property
                return Promise.reject(new ValidationError__default["default"](ruleName, pos));
            });
        });
    }
    /** This is taken out from the above then call for re-use when we want to fall through a rule */
    function successThen(argName, value, lastResult, pos // for internal debug use only
    ) {
        return (result) => {
            const idx = pos[0];
            debug$1('passed', argName, value, result, pos);
            debug$1('lastResult', lastResult);
            const newResult = { [IDX_KEY]: idx, [VALUE_KEY]: value };
            if (lastResult === undefined) { // init
                return { [argName]: newResult };
            }
            // here is the problem with spread result - they have the same name
            if (argName in lastResult) { // we need to check if the key exist this is import NOT VALUE check
                const lr = lastResult[argName];
                if (isResultPackage(lr)) {
                    if (!lr.includes(newResult)) {
                        lastResult[argName].push(newResult);
                    }
                }
                else if (lr[IDX_KEY] !== idx) {
                    lastResult[argName] = common.toArray(lastResult[argName]).concat([newResult]);
                }
                // if it's the same then do nothing
                return lastResult;
            }
            // return the argument name with the value
            return object.assign(lastResult, { [argName]: newResult });
        };
    }
    /** check to see if the lastResult contain our lastResult package format or just their value */
    function isResultPackage(lastResult, key = IDX_KEY) {
        try {
            if (Array.isArray(lastResult)) {
                return !!lastResult.filter((res) => key in res).length;
            }
        }
        catch (e) {
            debug$1('isResultPackage', e);
        }
        return false;
    }
    /** If the plugin provide a pattern and we construct a function out of it */
    function patternPluginFanctory(pattern) {
        const regex$1 = regex.getRegex(pattern);
        return (value) => __awaiter(this, void 0, void 0, function* () { return regex$1.test(value) ? Promise.resolve(true) : Promise.reject(false); });
    }

    const debug = debugFn__default["default"]('jsonql:validator-core:validator-plugin');
    // main
    class ValidatorPlugins {
        /** with a idx to id this instance */
        constructor($version) {
            this.$version = $version;
            this._plugins = new Map();
            this._internalPluginNames = [];
            // register internal plugins
            plugins.forEach((plugin) => {
                // we don't do the convert here anymore, and wait until the look up
                // then we store it back JIT
                const name = plugin[NAME_KEY];
                this._internalPluginNames.push(name);
                this._registerPlugin(name, plugin, true);
            });
        }
        /**
        find the plugin internal or external
        argName is the argument name
        */
        lookupPlugin(input, argName) {
            const pluginName = input[PLUGIN_KEY];
            if (pluginName && this._plugins.has(pluginName)) {
                const pluginConfig = this._plugins.get(pluginName);
                // unconverted
                if (pluginConfig[PLUGIN_FN_KEY] && !pluginConfig[PARAMS_KEY]) {
                    // let it fall to the next
                    pluginConfig[VALIDATE_ASYNC_KEY] = promisify(pluginConfig[PLUGIN_FN_KEY]);
                }
                // already converted
                if (pluginConfig && pluginConfig[VALIDATE_ASYNC_KEY] && !pluginConfig[PARAMS_KEY]) {
                    return constructRuleCb(argName, pluginConfig[VALIDATE_ASYNC_KEY], pluginName);
                }
                // needs to curry
                if (pluginConfig && pluginConfig[PARAMS_KEY]) {
                    debug('pluginConfig --->', pluginConfig);
                    debug('input----------->', input);
                    const _input = input;
                    return constructRuleCb(argName, promisify(curryPlugin(_input, pluginConfig)), pluginName);
                }
            }
            debug('lookupPlugin', 'unable to find', pluginName);
            throw new GeneralException__default["default"](`Unable to find plugin: ${pluginName}`);
        }
        /** The public api to register a plugin */
        registerPlugin(name, pluginConfig) {
            this._registerPlugin(name, pluginConfig);
        }
        /** call this when loading external plugin, not allow to use directly */
        _registerExternalPlugin(name, pluginConfig) {
            this._registerPlugin(name, pluginConfig, false, true);
        }
        /** this is no longer in use and we change the usage to export list of names that can be add to contract */
        export(external = true) {
            const plugins = [];
            this._plugins.forEach((p, n) => {
                if (!this.isBuiltIn(n) && p.external === external) {
                    plugins.push(p);
                }
            });
            return plugins;
        }
        /** just check if this plugin is built-in */
        isBuiltIn(pluginName) {
            return this._internalPluginNames.includes(pluginName);
        }
        // ------------------------- PRIVATE --------------------------//
        /** register plugins */
        _registerPlugin(name, pluginConfig, skipCheck = false, // when register internal plugin then skip it
        external = false // new in 0.9.11
        ) {
            if (!skipCheck) {
                if (this._plugins.has(name)) {
                    throw new GeneralException__default["default"](`plugin ${name} already existed!`);
                }
                if (!pluginHasFunc(pluginConfig)) {
                    debug('registerPlugin', MAIN_NOT_FOUND_ERR);
                    throw new GeneralException__default["default"](MAIN_NOT_FOUND_ERR);
                }
                // Here we could extract the params instead of just checking
                if (pluginConfig[PARAMS_KEY] === undefined) {
                    pluginConfig = searchParamsKey(pluginConfig);
                    debug('auto generate params for plugin', pluginConfig);
                }
                else if (pluginConfig[PARAMS_KEY] !== undefined) { // if they provide the keys then we check
                    if (!checkPluginArg(pluginConfig[PARAMS_KEY])) {
                        debug('registerPlugin', RESERVED_WORD_ERR);
                        throw new GeneralException__default["default"](RESERVED_WORD_ERR);
                    }
                    if (!paramMatches(pluginConfig)) {
                        debug('registerPlugin', ARG_NOT_MATCH_ERR);
                        throw new GeneralException__default["default"](ARG_NOT_MATCH_ERR);
                    }
                }
            }
            pluginConfig.name = name;
            pluginConfig.external = external;
            /**
            At this point it should only contain a main (or plus params) so we
            do nothing and just store it, we convert it only when they call it
            */
            this._plugins.set(name, pluginConfig);
        }
    }

    exports.ARRAY_TS_TYPE_LFT = ARRAY_TS_TYPE_LFT;
    exports.ARRAY_TYPE = ARRAY_TYPE;
    exports.ARRAY_TYPE_LFT = ARRAY_TYPE_LFT;
    exports.ARRAY_TYPE_RGT = ARRAY_TYPE_RGT;
    exports.BOOLEAN_TYPE = BOOLEAN_TYPE;
    exports.IDX_KEY = IDX_KEY;
    exports.KEYWORDS = KEYWORDS;
    exports.NAME_KEY = NAME_KEY;
    exports.NUMBER_TYPE = NUMBER_TYPE;
    exports.OBJECT_TYPE = OBJECT_TYPE;
    exports.OR_SEPERATOR = OR_SEPERATOR;
    exports.PARAMS_KEY = PARAMS_KEY;
    exports.PATTERN_KEY = PATTERN_KEY;
    exports.PLUGIN_FN_KEY = PLUGIN_FN_KEY;
    exports.PLUGIN_KEY = PLUGIN_KEY;
    exports.RULES_KEY = RULES_KEY;
    exports.STRING_TYPE = STRING_TYPE;
    exports.VALIDATE_ASYNC_KEY = VALIDATE_ASYNC_KEY;
    exports.VALIDATE_KEY = VALIDATE_KEY;
    exports.VALUE_KEY = VALUE_KEY;
    exports.ValidatorPlugins = ValidatorPlugins;
    exports.arrayTypeHandler = arrayTypeHandler;
    exports.checkAny = checkAny;
    exports.checkArray = checkArray;
    exports.checkBoolean = checkBoolean;
    exports.checkFloat = checkFloat;
    exports.checkInteger = checkInteger;
    exports.checkNumber = checkNumber;
    exports.checkObject = checkObject;
    exports.checkPluginArg = checkPluginArg;
    exports.checkString = checkString;
    exports.checkUnion = checkUnion;
    exports.checkUnionSync = checkUnionSync;
    exports.checkUnsigned = checkUnsigned;
    exports.combineCheck = combineCheck;
    exports.constructRuleCb = constructRuleCb;
    exports.curryPlugin = curryPlugin;
    exports.generateReversePromisesFn = generateReversePromisesFn;
    exports.isArrayLike = isArrayLike;
    exports.isEmptyObject = isEmptyObject;
    exports.isResultPackage = isResultPackage;
    exports.objectTypeHandler = objectTypeHandler;
    exports.patternPluginFanctory = patternPluginFanctory;
    exports.pluginHasFunc = pluginHasFunc;
    exports.plugins = plugins;
    exports.promisify = promisify;
    exports.reversePromisifyResult = reversePromisifyResult;
    exports.successThen = successThen;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
