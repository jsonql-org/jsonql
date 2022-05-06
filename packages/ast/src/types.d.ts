// specify your types here
// Need to take the original swc types here - its kick itself in the teeth

export type SwcSpanObject = {
  [key: string]: number
}

export type SwcProcessedBody = {
  type: string
  identifier: {
    type: string
    span: SwcSpanObject
    value: string
    optional: boolean
  }
  params: Array<any>
  decorators: Array<any>
  span: SwcSpanObject
  body: any
  generator?: boolean,
  async?: boolean,
  typeParameters?: any,
  returnType?: any
}

export type SwcParameterEntry = {
  type: string
  span: SwcSpanObject
  decorators: Array<any>
  pat: any
}

export type SwcGenericSubEntry = {
  type: string
  span: SwcSpanObject
  value: string
  left: any
  right: any
  optional?: boolean
  typeAnnotation?: any
}

export type SwcPatEntry = {
  type: string
  span: SwcSpanObject,
  left: SwcGenericSubEntry
  right: SwcGenericSubEntry
  argument?: any
  optional?: boolean
  typeAnnotation?: any
  elements?: any
  properties?: any
  value?: any
}

export declare type SwcProcessedModule = {
  type: string
  span: SwcSpanObject
  body: { [key: string]: any }
  interpreter: null
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
  syntax: string = "typescript"
  comments: boolean = false
  script: boolean = true
  target: string = "es6" // @TODO find out about the JscTarget
  decorators: boolean = true
  // Input source code are treated as module by default
  isModule: boolean = true
}
// this should just use the SwcSpanObject instead
export type SwcParamsSpan = {
  start: number
  end: number
  ctxt: number
}

export type SwcTypeParamsEntry = {
  type: string
  span: SwcParamsSpan
  kind: string
}

/** after ripping the ast out then transform into this object for use */
export type JsonqlParamInfo = {
  name: string
  required: boolean
  // dynanic fields
  [key: string]: any
}
