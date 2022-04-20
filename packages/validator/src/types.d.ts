
export declare type JsonqlConfig = {
  [key: string]: any
}

export type JsonqlAppProps = JsonqlConfig
export type JsonqlConstantProps = JsonqlConfig

export declare type CallbackFunction = (...args: any[]) => any

export declare type AsyncCallbackFunction = (...args: any[]) => Promise<any>

export declare type JsonqlConfigParams = {
  enumv?: any[]
  optional?: boolean
  checker?: CallbackFunction,
  alias?: string
}
