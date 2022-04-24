// This is pure function style resolver

export default function resolver(
  arg1: string,
  arg2: string | number,
  arg3?: boolean,
  arg4?: Array<number | string>
) {

  return {
    arg1,
    arg2,
    arg3: arg3 ? arg3 : 'NOTHING',
    arg4: arg4 ? arg4 : []
  }
}

// also export a validator
export const validate = {
  arg1: {},
  arg2: {},
  arg3: {},
  arg4: {}
}
