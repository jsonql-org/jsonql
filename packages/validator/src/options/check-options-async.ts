/// this is port back from the client to share across all projects

import merge from 'lodash-es/merge'
import { prepareArgsForValidation } from './prepare-args-for-validation'
import runValidation from './run-validation'

// import debug from 'debug'
// const debugFn = debug('jsonql-params-validator:check-options-async')

/**
 * Quick transform
 * @param {object} config that one
 * @param {object} appProps mutation configuration options
 * @return {object} put that arg into the args
 */
const configToArgs = (config, appProps) => {
  return Promise.resolve(
    prepareArgsForValidation(config, appProps)
  )
}

/**
 * @param {object} config user provide configuration option
 * @param {object} appProps mutation configuration options
 * @param {object} constProps the immutable configuration options
 * @param {function} cb the validateSync method
 * @return {object} Promise resolve merge config object
 */
export default function(config = {}, appProps, constProps, cb) {
  return configToArgs(config, appProps)
    .then(args1 => runValidation(args1, cb))
    // next if every thing good then pass to final merging
    .then(args2 => merge({}, args2, constProps))
}
