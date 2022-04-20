// move the index.js code here that make more sense to find where things are

import {
  checkIsArray,
  isArrayLike,
  arrayTypeHandler,
  objectTypeHandler,
  combineFn,
  notEmpty
} from './index'

import {
  DEFAULT_TYPE,
  ARRAY_TYPE,
  OBJECT_TYPE,
  ARGS_NOT_ARRAY_ERR,
  PARAMS_NOT_ARRAY_ERR,
  EXCEPTION_CASE_ERR,
  DATA_KEY, 
  ERROR_KEY 
} from './constants'


import JsonqlValidationError from 'jsonql-errors/src/validation-error'
import JsonqlError from 'jsonql-errors/src/error'
// import debug from 'debug'
// const debugFn = debug('jsonql-params-validator:validator')
// also export this for use in other places

/**
 * We need to handle those optional parameter without a default value
 * @param {object} params from contract.json
 * @return {boolean} for filter operation false is actually OK
 */
const optionalHandler = function( params ) {
  const { arg, param } = params
  if (notEmpty(arg)) {
    // debug('call optional handler', arg, params);
    // loop through the type in param
    return !(param.type.length > param.type.filter(type =>
        validateHandler(type, params)
    ).length)
  }
  return false
}

/**
 * actually picking the validator
 * @param {*} type for checking
 * @param {*} value for checking
 * @return {boolean} true on OK
 */
const validateHandler = function(type, value) {
  let tmp;
  switch (true) {
    case type === OBJECT_TYPE:
      // debugFn('call OBJECT_TYPE')
      return !objectTypeHandler(value)
    case type === ARRAY_TYPE:
      // debugFn('call ARRAY_TYPE')
      return !checkIsArray(value.arg)
    // @TODO when the type is not present, it always fall through here
    // so we need to find a way to actually pre-check the type first
    // AKA check the contract.json map before running here
    case (tmp = isArrayLike(type)) !== false:
      // debugFn('call ARRAY_LIKE: %O', value)
      return !arrayTypeHandler(value, tmp)
    default:
      return !combineFn(type)(value.arg)
  }
}

/**
 * it get too longer to fit in one line so break it out from the fn below
 * @param {*} arg value
 * @param {object} param config
 * @return {*} value or apply default value
 */
const getOptionalValue = function(arg, param) {
  if (arg !== undefined) {
    return arg
  }
  return (param.optional === true && param.defaultvalue !== undefined ? param.defaultvalue : null)
}

/**
 * padding the arguments with defaultValue if the arguments did not provide the value
 * this will be the name export
 * @param {array} args normalized arguments
 * @param {array} params from contract.json
 * @return {array} merge the two together
 */
export const normalizeArgs = function(args, params) {
  // first we should check if this call require a validation at all
  // there will be situation where the function doesn't need args and params
  if (!checkIsArray(params)) {
    // debugFn('params value', params)
    throw new JsonqlValidationError(PARAMS_NOT_ARRAY_ERR)
  }
  if (params.length === 0) {
    return []
  }
  if (!checkIsArray(args)) {
    console.info(args)
    throw new JsonqlValidationError(ARGS_NOT_ARRAY_ERR)
  }
  // debugFn(args, params);
  // fall through switch
  switch(true) {
    case args.length == params.length: // standard
      return args.map((arg, i) => (
        {
          arg,
          index: i,
          param: params[i]
        }
      ))
    case params[0].variable === true: // using spread syntax
      const type = params[0].type;
      return args.map((arg, i) => (
        {
          arg,
          index: i, // keep the index for reference
          param: params[i] || { type, name: '_' }
        }
      ))
    // with optional defaultValue parameters
    case args.length < params.length:
      return params.map((param, i) => (
        {
          param,
          index: i,
          arg: getOptionalValue(args[i], param),
          optional: param.optional || false
        }
      ))
    // this one pass more than it should have anything after the args.length will be cast as any type
    case args.length > params.length:
      let ctn = params.length;
      // this happens when we have those array.<number> type
      let _type = [ DEFAULT_TYPE ]
      // we only looking at the first one, this might be a @BUG
      /*
      if ((tmp = isArrayLike(params[0].type[0])) !== false) {
        _type = tmp;
      } */
      // if we use the params as guide then the rest will get throw out
      // which is not what we want, instead, anything without the param
      // will get a any type and optional flag
      return args.map((arg, i) => {
        let optional = i >= ctn ? true : !!params[i].optional
        let param = params[i] || { type: _type, name: `_${i}` }
        return {
          arg: optional ? getOptionalValue(arg, param) : arg,
          index: i,
          param,
          optional
        }
      })
    // @TODO find out if there is more cases not cover
    default: // this should never happen
      // debugFn('args', args)
      // debugFn('params', params)
      // this is unknown therefore we just throw it!
      throw new JsonqlError(EXCEPTION_CASE_ERR, { args, params })
  }
}

// what we want is after the validaton we also get the normalized result
// which is with the optional property if the argument didn't provide it
/**
 * process the array of params back to their arguments
 * @param {array} result the params result
 * @return {array} arguments
 */
const processReturn = result => result.map(r => r.arg)

/**
 * validator main interface
 * @param {array} args the arguments pass to the method call
 * @param {array} params from the contract for that method
 * @param {boolean} [withResul=false] if true then this will return the normalize result as well
 * @return {array} empty array on success, or failed parameter and reasons
 */
export const validateSync = function(args, params, withResult = false) {
  let cleanArgs = normalizeArgs(args, params)
  let checkResult = cleanArgs.filter(p => {
    // v1.4.4 this fixed the problem, the root level optional is from the last fn
    if (p.optional === true || p.param.optional === true) {
      return optionalHandler(p)
    }
    // because array of types means OR so if one pass means pass
    return !(p.param.type.length > p.param.type.filter(
      type => validateHandler(type, p)
    ).length)
  })
  // using the same convention we been using all this time
  return !withResult ? checkResult : {
    [ERROR_KEY]: checkResult,
    [DATA_KEY]: processReturn(cleanArgs)
  }
}

/**
 * A wrapper method that return promise
 * @param {array} args arguments
 * @param {array} params from contract.json
 * @param {boolean} [withResul=false] if true then this will return the normalize result as well
 * @return {object} promise.then or catch
 */
export const validateAsync = function(args, params, withResult = false) {
  return new Promise((resolver, rejecter) => {
    const result = validateSync(args, params, withResult)
    if (withResult) {
      return result[ERROR_KEY].length ? rejecter(result[ERROR_KEY])
                                      : resolver(result[DATA_KEY])
    }
    // the different is just in the then or catch phrase
    return result.length ? rejecter(result) : resolver([])
  })
}
