// define your types here
// define your types here

export type JsonqlContractMeta = {
  type: string // jsonql / rest etc
  [key: string]: any // free style
}

export type JsonqlContractData = {
  routes: Array<any> // @TODO import the entry type from ast
  [key: string]: any // free style
}

export type JsonqlContractError = {
  message?: string
  detail?: any
  className?: string
}

export type JsonqlContract = {
  data: JsonqlContractData
  error: JsonqlContractError
  meta: JsonqlContractMeta
}
