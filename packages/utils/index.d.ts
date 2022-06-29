// specify your types here
// cheating
export declare type AnyType = any

export declare type AnyTypeArr = Array<AnyType>
export declare type AnyFunc = (...args: AnyTypeArr) => AnyType
export declare type AnyAsyncFunc = (...args: AnyTypeArr) => Promise<AnyType>

export interface JsonqlContract {
  query?: AnyType
  mutation?: AnyType
  socket?: AnyType
}

export declare type JsonqlResolver = (...args: AnyType[]) => AnyType
export declare type JsonqlAsyncResolver = (...args: AnyType[]) => Promise<AnyType>

export declare type FlatMapCallback = (n: AnyType, i: number, arr: AnyType[]) => AnyType
export declare type MapCallback = (n: AnyType, i?: number) => AnyType

export declare type JsonqlPromiseChainFn = (...args: AnyTypeArr) => Promise<AnyType>
