"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorsClient = void 0;
const validators_1 = require("./validators");
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
class ValidatorsClient extends validators_1.Validators {
    /** main */
    constructor(astMap) {
        super(astMap);
    }
    /** On the client side we don't need a map */
    registerPlugins(pluginConfigs) {
        for (const name in pluginConfigs) {
            const config = pluginConfigs[name];
            this.registerPlugin(name, config);
        }
    }
}
exports.ValidatorsClient = ValidatorsClient;
