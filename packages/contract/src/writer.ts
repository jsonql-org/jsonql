// We now use an object style to generate contract
// this is for the Velocejs FastApi
// @TODO add protobuf
import type {
  JsonqlContractEntry,
  JsonqlContractTemplate,
  JsonqlContractMetaEntry,
  JsonqlProcessedEntry,
  JsonqlRouteForContract,
  JsonqlValidationRule,
  Validators,
} from './types'
import { join } from 'node:path'
import {
  outputJson,
  readJsonSync,
  existsSync,
} from 'fs-extra'
import {
  JsonqlAstMap,
} from '@jsonql/ast/index'
import {
  chainPromises,
  assign,
  cloneDeepCheap,
  isFunction,
} from '@jsonql/utils'
import GeneralException from '@jsonql/errors/dist/general-exception'
import {
  REST_NAME,
  DATA_KEY,
  META_KEY,
  ERROR_KEY,
  DEFAULT_CONTRACT_FILE_NAME,
  PUBLIC_CONTRACT_FILE_NAME,
  RULES_KEY,
  NAME_KEY,
  PARAMS_KEY,
  SERVER_KEY,
  VALIDATE_KEY,
} from './constants'

import debugFn from 'debug'
const debug = debugFn(`jsonql:contract:class`)

// main
export class ContractWriter {
  // form the basic structure
  private _contract: JsonqlContractTemplate = {
    [DATA_KEY]: [],
    [META_KEY]: { type: ''},
    [ERROR_KEY]: null // @TODO
  }
  // save a method just call it
  public $excludeValidation = new Set()

  /** instead of run the parser again we just load the ast map */
  constructor(
    routeForContract: JsonqlRouteForContract,
    type: string = REST_NAME
  ) {
    // first we make a clone of the map because when we pass
    // it to more than one object it mutatated
    const clone = cloneDeepCheap(routeForContract)
    //we are going to add props to it
    this.meta({ type })
    // @TODO jsonql
    switch (type) {
      case REST_NAME:
        this._contract[DATA_KEY] = clone
        break
      default:
        // @TODO
    }
  }

  /**
   This will get call externally to prepare the map before init this object
   */
  static prepare(astMap: JsonqlAstMap) {
    // const c = stripAllTypeParams(astMap)
    const l: Array<JsonqlContractEntry> = []
    for (const methodName in astMap) {
      let entry: JsonqlContractEntry = { name: methodName, params: [] }
      const params = astMap[methodName]
      if (Array.isArray(params)) {
        entry.params = params
      } else if (typeof params === 'object') {
        entry = assign({}, entry, params)
      }
      l.push(entry)
    }
    debug('prepared data', l)
    return l
  }

  /** insert extra data into node by name */
  public data(propertyName: string, value: JsonqlContractEntry): void {
    const contractData = this._contract[DATA_KEY] as Array<JsonqlContractEntry>
    // first to see if the name actually exist, we might want to add new entry
    const existed = contractData.filter((c: JsonqlContractEntry) => c.name === propertyName)
    if (existed.length) {
      this._contract[DATA_KEY] = contractData.map((c: JsonqlContractEntry) => (
        c.name === propertyName ? assign(c, value) : c
      ))
    } else { // add new entry
      this._contract[DATA_KEY].push(value as JsonqlContractEntry)
    }
  }

  /** this will always overwrite the last one */
  public error(error: GeneralException): void {
    this._contract[ERROR_KEY] = error // @TODO need to transform to json for transport
  }

  /** make a shallow copy might not be enough */
  public meta(entry: JsonqlContractMetaEntry): void {
    this._contract[META_KEY] = assign({}, cloneDeepCheap(this._contract[META_KEY]), entry)
  }

  /**
    generate the contract pub false then just the raw output for server use
    in this version we might not even need a private contract anymore
    but we keep the public option just in case
  */
  public output(pub = true): JsonqlContractTemplate {
    const contract = this._contract
    if (pub) {
      // we are taking out all the server: true or pure function rules
      return {
        [DATA_KEY]: contract[DATA_KEY].map((data: JsonqlContractEntry) => {
          // if this api has no params then just excluded it by default
          if (!data[PARAMS_KEY] || data[PARAMS_KEY].length === 0) {
            data[VALIDATE_KEY] = false
            return data
          }
          // next processing the rules
          data[PARAMS_KEY] = data[PARAMS_KEY]?.map((params: JsonqlProcessedEntry) => {
            if (params[RULES_KEY]) {
              params[RULES_KEY] = params[RULES_KEY].filter((rule: object) => {
                return !isFunction(rule) && rule[SERVER_KEY] !== true
              })
            }
            return params
          })
          return data
        }),
        [META_KEY]: contract[META_KEY]
      }
    }
    return contract
  }

  /** serving up the public contract */
  public async serve(cacheDir: string) {
    const jsonFile = join(cacheDir, PUBLIC_CONTRACT_FILE_NAME)
    if (!existsSync(jsonFile)) {
      await this.write(cacheDir)
    }

    return readJsonSync(jsonFile)
  }

  /** serve up the dynamic generated contract during transport */
  // @TODO

  /** we output several different contracts all at once */
  public async write(outDir: string): Promise<string> {

    return chainPromises([
      [DEFAULT_CONTRACT_FILE_NAME, this.output(false)], // server contract
      [PUBLIC_CONTRACT_FILE_NAME, this.output()] // public contract
    ].map(async ([file, contract]) => {
      const dest = join(outDir, file as unknown as string)

      return outputJson(dest, contract, { spaces: 2})
                .then(() => dest)
    }))
  }

  /** adding validation rules to the argument */
  public appendValidations(
    schema: JsonqlAstMap,
    checkFn: (rule: JsonqlValidationRule) => boolean
  ) {
    debug('appendValidations', this._contract[DATA_KEY], schema)

    this._contract[DATA_KEY] = this._contract[DATA_KEY]
      .map((data: JsonqlContractEntry) => {
        const propName = data[NAME_KEY]
        if (propName && schema[propName]) {
          const rules = schema[propName][RULES_KEY]
          if (rules && data[PARAMS_KEY]) {
            data[PARAMS_KEY] = data[PARAMS_KEY]?.map((params: JsonqlProcessedEntry) => {
              const argName = params[NAME_KEY]
              if (rules[argName]) {
                // also check if this is built-in plugin
                const _rules = rules[argName]
                  .filter(
                    (rule: JsonqlValidationRule) => {
                      const result = checkFn(rule)
                      debug('checkFn', rule, result)
                      return result
                    }
                  )
                if (_rules.length) {
                  params[RULES_KEY] = _rules
                }
              }
              return params
            })
          }
        }
        return data
    })
    return this._contract
  }

  /** combine together to output the final public contract */
  public outputPublic(validators?: Validators) {
    // there is a possiblity that the validators it no available
    if (validators) {
      const { schema, plugins } = validators.export()
      if (process.env.DEBUG) {
        console.log('------------------------ schema -------------------------------')
        console.dir( schema, { depth: null })
        console.log('------------------------ plugins -------------------------------')
        console.dir( plugins, { depth: null })
      }
      const checkFn = validators.checkRuleCanExport(plugins)
      this.appendValidations( schema, checkFn )
    }
    // at this point should be the final call
    const contract = this.output(true)
    // add excluded validation info if any
    if (this.$excludeValidation.size) {
      contract[DATA_KEY] = contract[DATA_KEY].map((entry: JsonqlContractEntry) => {
        if (this.$excludeValidation.has(entry.name)) {
          entry[VALIDATE_KEY] = false
        }
        return entry
      })
    }
    return contract
  }

}
