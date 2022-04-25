// move the index.js code here that make more sense to find where things are
import {
  checkArray,
  isArrayLike,
  arrayTypeHandler,
  objectTypeHandler,
  combineCheck,
} from '@jsonql/validator-core/src'
import {
  DEFAULT_TYPE,
  ARRAY_TYPE,
  OBJECT_TYPE,
  DATA_KEY,
  ERROR_KEY
} from '@jsonql/constants'
import {
  ARGS_NOT_ARRAY_ERR,
  PARAMS_NOT_ARRAY_ERR,
  EXCEPTION_CASE_ERR,
} from './constants'
import {
  JsonqlValidationError,
  JsonqlError
} from '@jsonql/errors'
import { notEmpty } from '@jsonql/utils'
import debug from 'debug'
const debugFn = debug('validator:main')
// import debug from 'debug'
// const debugFn = debug('jsonql-params-validator:validator')
// also export this for use in other places

/**
 * We need to handle those optional parameter without a default value
 */
const optionalHandler = function( params: any ): boolean {
  const { arg, param } = params
  if (notEmpty(arg)) {
    // debug('call optional handler', arg, params);
    // loop through the type in param
    return !(param.type.length > param.type.filter((type: string) =>
      validateHandler(type, params)
    ).length)
  }
  return false
}

/**
 * actually picking the validator
 */
const validateHandler = function(type: any, value: any): boolean {
  let tmp: any;
  switch (true) {
    case type === OBJECT_TYPE:
      // debugFn('call OBJECT_TYPE')
      return !objectTypeHandler(value)
    case type === ARRAY_TYPE:
      // debugFn('call ARRAY_TYPE')
      return !checkArray(value.arg)
    // @TODO when the type is not present, it always fall through here
    // so we need to find a way to actually pre-check the type first
    // AKA check the contract.json map before running here
    case (tmp = isArrayLike(type)) !== false:
      // debugFn('call ARRAY_LIKE: %O', value)
      return !arrayTypeHandler(value, tmp)
    default:
      return !combineCheck(type)(value.arg)
  }
}

/**
 * it get too longer to fit in one line so break it out from the fn below
 */
const getOptionalValue = function(arg: any, param: any) {
  if (arg !== undefined) {
    return arg
  }
  return (
    (
      param.optional === true ||
      param.required === false // this is the new SWC generate map
    ) &&
    param.defaultvalue !== undefined
      ? param.defaultvalue
      : null)
}

/**
 * padding the arguments with defaultValue if the arguments did not provide the value
 * this will be the name export
 * @TODO the rules will become
 */
export const normalizeArgs = function(argValues: any[], paramNames: any[]) {
  if (!checkArray(paramNames)) {
    // debugFn('params value', params)
    throw new JsonqlValidationError(PARAMS_NOT_ARRAY_ERR)
  }
  if (paramNames.length === 0) {
    return [] // when the function doesn't need to validate because no params
  }
  if (!checkArray(argValues)) {
    debugFn(argValues)
    throw new JsonqlValidationError(ARGS_NOT_ARRAY_ERR)
  }
  // debugFn(args, params);
  // fall through switch
  switch(true) {
    case argValues.length == paramNames.length: // standard
      return argValues.map((arg, i) => (
        {
          arg,
          index: i,
          param: paramNames[i]
        }
      ))
    case paramNames[0].variable === true: // using spread syntax
      return argValues.map((arg, i) => (
        {
          arg,
          index: i, // keep the index for reference
          param: paramNames[i] || { type: paramNames[0].type, name: '_' }
        }
      ))
    // with optional defaultValue parameters
    case argValues.length < paramNames.length:
      return paramNames.map((param, i) => (
        {
          param,
          index: i,
          arg: getOptionalValue(argValues[i], param),
          optional: param.optional || false,// remove soon
          required: param.required || true
        }
      ))
    // this one pass more than it should have anything after the args.length will be cast as any type
    case argValues.length > paramNames.length:
      // this happens when we have those array.<number> type
      // let _type = [ DEFAULT_TYPE ]
      // we only looking at the first one, this might be a @BUG
      /*
      if ((tmp = isArrayLike(params[0].type[0])) !== false) {
        _type = tmp;
      } */
      // if we use the params as guide then the rest will get throw out
      // which is not what we want, instead, anything without the param
      // will get a any type and optional flag
      return argValues.map((arg, i) => {
        const optional = i >= paramNames.length ? true : !!paramNames[i].optional
        const required = !optional
        const param = paramNames[i] || { type: DEFAULT_TYPE , name: `_${i}` }

        return {
          arg: optional ? getOptionalValue(arg, param) : arg,
          index: i,
          param,
          optional,
          required
        }
      })
    // @TODO find out if there is more cases not cover
    default: // this should never happen
      // debugFn('args', args)
      // debugFn('params', params)
      // this is unknown therefore we just throw it!
      throw new JsonqlError(EXCEPTION_CASE_ERR, { argValues, paramNames })
  }
}

// what we want is after the validaton we also get the normalized result
// which is with the optional property if the argument didn't provide it
/**
 * process the array of params back to their arguments
 */
const processReturn = (result: any[]) => result.map(r => r.arg)

/**
 * validator main interface
 */
export const validateSync = function(
  args: any[],
  params: any[],
  withResult = false
) {
  const cleanArgs = normalizeArgs(args, params)
  // @TODO it will become an array
  debugFn(cleanArgs)
  const checkResult = cleanArgs.filter(p => {
    // v1.4.4 this fixed the problem, the root level optional is from the last fn
    // @ts-ignore need to fix this later
    if (p.optional === true || p.param.optional === true) {
      return optionalHandler(p)
    }
    // because array of types means OR so if one pass means pass
    // @TODO this will need to change to account for Array of Array
    // also when there is a function style callback
    // therefore there will be no more validateSync and only validateAsync
    return !(p.param.type.length > p.param.type.filter(
      (type: any) => validateHandler(type, p)
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
 */
export const validateAsync = function(
  args: any[],
  params: any[],
  withResult = false
) {
  return new Promise((resolver, rejecter) => {
    const result = validateSync(args, params, withResult)
    if (withResult) {
      return result[ERROR_KEY].length ? rejecter(result[ERROR_KEY])
                                      : resolver(result[DATA_KEY])
    }
    // the different is just in the then or catch phrase
    //  @ts-ignore
    return result.length ? rejecter(result) : resolver([])
  })
}
