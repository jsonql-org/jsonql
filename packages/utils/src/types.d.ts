// specify your types here
// @TODO define different parts futher
export interface JsonqlContract {
  query?: any
  mutation?: any
  socket?: any
}

export declare type JsonqlResolver = (...args: any[]) => any
export declare type JsonqlAsyncResolver = (...args: any[]) => Promise<any>
