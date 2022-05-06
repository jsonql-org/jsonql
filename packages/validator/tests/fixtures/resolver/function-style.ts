// This is pure function style resolver

export default function resolver(
  email: string,
  age: string | number,
  arg3 = false
) {

  return {
    email,
    age,
    arg3: arg3 ? 'SOMETHING' : 'NOTHING'
  }
}

// also export a validator
export const validate = {
  email: [
    {plugin: 'email'}
  ],
  arg2: [],
}
