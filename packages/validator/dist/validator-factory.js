"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const tslib_1 = require("tslib");
const validator_base_1 = require("./validator-base");
const validator_plugins_1 = require("@jsonql/validator-core/dist/validator-plugins");
const chain_promises_1 = require("@jsonql/utils/dist/chain-promises");
const fn_1 = require("./fn");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('jsonql:validator:class:index');
// main
class Validator extends validator_base_1.ValidatorBase {
    /**
      this is now change to accept an instance of ValidatorPlugins (share)
      if only call it with the astMap then it init it as a standalone like before
    */
    constructor(astMap, vp) {
        super(astMap, vp && vp instanceof validator_plugins_1.ValidatorPlugins ? vp : new validator_plugins_1.ValidatorPlugins(-1));
    }
    /** this is where validation happens */
    validate(values, raw = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // debug(`raw flag`, raw)
            // this come out with a queue then we put into the chainProcessPromises
            const queues = this._normalizeArgValues(values);
            return (0, chain_promises_1.queuePromisesProcess)(queues, undefined // the init value will now be undefined to know if its first
            )
                .then((finalResult) => raw ? finalResult : this._prepareValidateResult(finalResult));
        });
    }
    /** wrapper for the protected register plugin method */
    registerPlugin(name, plugin) {
        this._validatorPluginsInstance.registerPlugin(name, plugin);
    }
    /** create an alias for createSchema (and replace it later ) because ii make more sense */
    addValidationRules(validationMap) {
        this._createSchema(validationMap);
    }
    /** After the validation the success will get an object with
    argumentName: value object and we make it to an array matching
    the order of the call, then we can pass it directly to method that
    get validated */
    _prepareValidateResult(validateResult) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            debug('validateResult', this._arguments, validateResult);
            // @TODO need to fix the spread input type return result
            return (0, fn_1.processValidateResults)(this._arguments, validateResult)
                .then(fn_1.unwrapPreparedValidateResult);
        });
    }
}
exports.Validator = Validator;
