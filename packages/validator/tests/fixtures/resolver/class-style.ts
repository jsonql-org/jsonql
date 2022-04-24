// this is a class style

declare type DummyObj = {
  [key: string]: number
}

declare type StupidType = string

export default class MyResolver {

  // @TODO @Validate
  public main(
    arg1: number | boolean,
    arg2: string,
    arg3?: any[],
    arg4?: DummyObj,
    arg5?: {[key: string]: string},
    arg6?: StupidType
  ) {
    return {
      arg1,
      arg2,
      arg3: arg3 ? arg3 : ['NOTHING'],
      arg4: arg4 ? arg4 : {},
      arg5: arg5 ? arg5 : {},
      arg6: arg6 ? arg6 : 'REALLY???'
    }
  }

  /** test a method without argument */
  public another() {
    return 'This has no params!'
  }

  /* @TODO test to reject the private and protected methods
  private aPrivateMethod() {

  }
  */
}