"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOptionsAsync = void 0;
const tslib_1 = require("tslib");
/// this is port back from the client to share across all projects
const lodash_1 = require("../lib/lodash");
const prepare_args_for_validation_1 = require("./prepare-args-for-validation");
const run_validation_1 = require("./run-validation");
// import debug from 'debug'
// const debugFn = debug('jsonql-params-validator:check-options-async')
/**
 * Quick transform
 */
function configToArgs(config, appProps) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return Promise.resolve((0, prepare_args_for_validation_1.prepareArgsForValidation)(config, appProps));
    });
}
/**
 * default export
 */
function checkOptionsAsync(config, appProps, constProps, cb) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return configToArgs(config, appProps)
            .then(args1 => (0, run_validation_1.runValidation)(args1, cb))
            // next if every thing good then pass to final merging
            .then(args2 => (0, lodash_1.merge)({}, args2, constProps));
    });
}
exports.checkOptionsAsync = checkOptionsAsync;
