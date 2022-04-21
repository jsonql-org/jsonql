// this is for use with pure function style resolver
declare type JsonqlRules = {
  name?: string
  type?: string
  rules?: any[]
  [key: string]: any
}
/**
What it does?
Dev setup their rules for validating their resolver

*/
export function Validator(rules?: JsonqlRules): void {
  console.log(rules)
}
