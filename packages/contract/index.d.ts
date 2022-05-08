// define your types here
// define your types here

export type JsonqlContractMeta = {
  type: string // jsonql / rest etc
  [key: string]: any // free style
}

export type JsonqlContractData = {


}


export type JsonqlContract = {
  data: any
  error: any
  meta: any
}
