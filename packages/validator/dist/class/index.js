"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorFactory = void 0;
const tslib_1 = require("tslib");
/**
  this is the new class style Validator
  const validator = new Validator(map)
  validator.run(propName arguments)
  This class will support an plugin architecture
  something like
  validator.register(typeName: string, rule: any)
  so it their map they could write
  validationMap = {
    someMethod: [{
      type: 'mySpecialMethod'
    }]
  }
  validator.register('mySpecialMethod', {
    check(value): boolean {
      // do your validation here
    }
  })
  @TODO how to integrete this into the contract generator
*/
const base_1 = require("./base");
const src_1 = require("@jsonql/utils/src");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('jsonql:validator:class:index');
// main
class ValidatorFactory extends base_1.ValidatorFactoryBase {
    // @TODO need to properly type this astMap
    constructor(astMap) {
        super(astMap);
    }
    /** accept an object name => plugin in one go */
    registerPlugins(plugins) {
        for (const name in plugins) {
            this._registerPlugin(name, plugins[name]);
        }
    }
    /** wrapper for the protected register plugin method */
    registerPlugin(name, plugin) {
        this._registerPlugin(name, plugin);
    }
    /** takes the user define rules and generate the full map */
    createSchema(validationMap) {
        this._createSchema(validationMap);
    }
    /** this is where validation happens */
    validate(values) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // this come out with a queue then we put into the chainProcessPromises
            const queues = this._normalizeArgValues(values);
            debug('queues', queues);
            return (0, src_1.queuePromisesProcess)(queues, {});
        });
    }
    /** After the validation the success will get an object with
    argumentName: value object and we make it to an array matching
    the order of the call, then we can pass it directly to method that
    get validated */
    prepareValidateResult(validateResult) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._arguments.map(name => validateResult[name]);
        });
    }
    /** this will export the map for generate contract */
    export(server = false) {
        console.log(`@TODO`, server);
    }
}
exports.ValidatorFactory = ValidatorFactory;
