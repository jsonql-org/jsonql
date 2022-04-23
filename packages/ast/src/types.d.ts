// specify your types here
// Need to take the original swc types here - its kick itself in the teeth

export declare type SwcProcessedModule = {
  type: string
  span: { [key: string]: number | string }
  body: { [key: string]: any }
  interpreter: null
}




export type SwcSpanObject = {
  [key: string]: number
}
// @TODO
export type SwcDeclObject = {
  function: any // @TODO
  kind: string
  isStatic: boolean
  accessibility: string // @NOTE only take the `public` method
  isAbstract: boolean
  isOptional: boolean
  isOverride: boolean
}

export type SwcParsedBodyResult = {
  type: string
  span: SwcSpanObject
  key: {[key: string]: string | boolean | SwcSpanObject }
  decl: any // @TODO
}

export type SwcParsedResult = {
  type: string
  span: Array<SwcSpanObject>
  body: any // @TODO
  interpreter: null
}

/*
No overload matches this call. Overload 1 of 2,
'(src: string, options: ParseOptions & { isModule: false; }): Promise<Script>',
gave the following error. Argument of type 'SwcParserOptions' is not assignable to parameter of type
'ParseOptions & { isModule: false; }'.
Type 'SwcParserOptions' is not assignable to type
'EsParserConfig & {
  comments?: boolean | undefined;
  script?: boolean | undefined;
  target?: JscTarget | undefined;
} & { isModule: false; }'.
Type 'SwcParserOptions' is not assignable to type 'EsParserConfig'.
Types of property 'syntax' are incompatible.
Type 'string | undefined' is not assignable to type '"ecmascript"'.
Type 'undefined' is not assignable to type '"ecmascript"'.
Overload 2 of 2,
'(src: string, options?: ParseOptions | undefined): Promise<Module>',
gave the following error.
Argument of type 'SwcParserOptions' is not assignable to parameter of type 'ParseOptions | undefined'.
Type 'SwcParserOptions' is not assignable to type
'EsParserConfig & {
  comments?: boolean | undefined;
  script?: boolean | undefined;
  target?: JscTarget | undefined;
}'. Type 'SwcParserOptions' is not assignable to type 'EsParserConfig'.
*/

export type SwcParserOptions = {
  syntax?: string | undefined
  comments?: boolean | undefined,
  script?: boolean | undefined,
  target?: string | undefined , // @TODO find out about the JscTarget
  decorators?: boolean,
  // Input source code are treated as module by default
  isModule?: boolean | undefined,
}
