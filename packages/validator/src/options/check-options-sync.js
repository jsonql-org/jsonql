// this is port back from the client to share across all projects
import merge from 'lodash-es/merge'
import { prepareArgsForValidation } from './prepare-args-for-validation'
import runValidation from './run-validation'

/**
 * @param {object} config user provide configuration option
 * @param {object} appProps mutation configuration options
 * @param {object} constProps the immutable configuration options
 * @param {function} cb the validateSync method
 * @return {object} Promise resolve merge config object
 */
export default function(config = {}, appProps, constProps, cb) {
  return merge(
    runValidation(
      prepareArgsForValidation(config, appProps),
      cb
    ),
    constProps
  )
}
