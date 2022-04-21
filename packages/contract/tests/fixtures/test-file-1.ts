// this is a class style

export default class MyResolver {

  // @TODO @Validate 
  public main(arg1: number | boolean, arg2: string, arg3?: any[]) {
    return {
      arg1,
      arg2,
      arg3: arg3 ? arg3 : ['NOTHING']
    }
  }
}
