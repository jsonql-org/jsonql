// This is pure function style resolver

export default function resolver(arg1: string, arg2: string | number, arg3?: boolean) {

  return {
    arg1,
    arg2,
    arg3: arg3 ? arg3 : 'NOTHING'
  }
}

// also export a validator
