"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorFactory = void 0;
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
// main
class ValidatorFactory extends base_1.ValidatorFactoryBase {
    constructor(astMap) {
        super(astMap);
    }
    /** accept an array of plugins in one go less confusion */
    registerPlugins(plugins) {
        plugins.forEach((plugin) => {
            this.registerPlugin(plugin.name, plugin);
        });
    }
    /** takes the user define rules and generate the full map */
    createSchema(validationMap) {
        // console.log(propName, this.validationMap)
        // if this never get call, that means we just do automatic
    }
    /** this validation happens */
    validate(values) {
    }
    /** this will export the map for generate contract */
    export(server = false) {
    }
}
exports.ValidatorFactory = ValidatorFactory;
