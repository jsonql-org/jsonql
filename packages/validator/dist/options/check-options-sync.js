"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOptionsSync = void 0;
// this is port back from the client to share across all projects
const lodash_1 = require("../lib/lodash");
const prepare_args_for_validation_1 = require("./prepare-args-for-validation");
const run_validation_1 = require("./run-validation");
/**
 * Check options
 */
function checkOptionsSync(config, appProps, constProps, cb) {
    return (0, lodash_1.merge)((0, run_validation_1.runValidation)((0, prepare_args_for_validation_1.prepareArgsForValidation)(config, appProps), cb), constProps);
}
exports.checkOptionsSync = checkOptionsSync;
