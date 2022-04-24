// This is pure function style resolver

export default function resolver(
  arg1: string,
  arg2: string | number,
  arg3?: any[],
  arg4?: Array<number | string>,
  arg5?: Array<boolean>
) {

  return {
    arg1,
    arg2,
    arg3: arg3 ? arg3 : 'NOTHING',
    arg4: arg4 ? arg4 : [],
    arg5: arg5 ? arg5 : [false]
  }
}

// also export a validator
export const validate = {
  arg1: {},
  arg2: {},
  arg3: {},
  arg4: {},
  arg5: {}
}
