
export declare type DummyFunction = (...args: any[]) => any

export declare type DummyAsyncFunction = (...args: any[]) => Promise<any> 

export declare type JsonqlConfigParams = {
  enumv?: any[]
  optional?: boolean
  checker?: DummyFunction,
  alias?: string
}
