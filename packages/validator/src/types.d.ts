
export declare type JsonqlConfig = {
  [key: string]: any
}

export type JsonqlAppProps = JsonqlConfig
export type JsonqlConstantProps = JsonqlConfig

export declare type DummyFunction = (...args: any[]) => any

export declare type DummyAsyncFunction = (...args: any[]) => Promise<any>

export declare type JsonqlConfigParams = {
  enumv?: any[]
  optional?: boolean
  checker?: DummyFunction,
  alias?: string
}
