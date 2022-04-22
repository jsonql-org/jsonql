// this is a class style

declare type DummyObj = {
  [key: string]: number
}

export default class MyResolver {

  // @TODO @Validate
  public main(
    arg1: number | boolean,
    arg2: string,
    arg3?: any[],
    arg4?: DummyObj
  ) {
    return {
      arg1,
      arg2,
      arg3: arg3 ? arg3 : ['NOTHING'],
      arg4: arg4 ? arg4 : {}
    }
  }
}
