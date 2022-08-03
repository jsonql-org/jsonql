// specify your types here
// Need to take the original swc types here - its kick itself in the teeth
// cheat
export type AnyType = any

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
  params: Array<AnyType>
  decorators: Array<AnyType>
  span: SwcSpanObject
  body: AnyType
  generator?: boolean,
  async?: boolean,
  typeParameters?: AnyType,
  returnType?: AnyType
}

export type SwcParameterEntry = {
  type: string
  span: SwcSpanObject
  decorators: Array<AnyType>
  pat: AnyType
}

export type SwcGenericSubEntry = {
  type: string
  span: SwcSpanObject
  value: string
  left: AnyType
  right: AnyType
  optional?: boolean
  typeAnnotation?: AnyType
}

export type SwcPatEntry = {
  type: string
  span: SwcSpanObject,
  left: SwcGenericSubEntry
  right: SwcGenericSubEntry
  argument?: AnyType
  optional?: boolean
  typeAnnotation?: AnyType
  elements?: AnyType
  properties?: AnyType
  value?: AnyType
}

export declare type SwcProcessedModule = {
  type: string
  span: SwcSpanObject
  body: { [key: string]: AnyType }
  interpreter: null
}


// @TODO
export type SwcDeclObject = {
  function: AnyType // @TODO
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
  decl: AnyType // @TODO
}

export type SwcParsedResult = {
  type: string
  span: Array<SwcSpanObject>
  body: AnyType // @TODO
  interpreter: null
}

export type SwcParserOptions = {
  syntax: string // = "typescript"
  comments: boolean // = false
  script: boolean // = true
  target: string // = "es6" // @TODO find out about the JscTarget
  decorators: boolean // = true
  // Input source code are treated as module by default
  isModule?: boolean // = true
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


export type JsonqlProcessedEntry = {
  name: string
  required: boolean
  type: unknown//string | Array<string>
  tstype?: string
  defaultvalue?: unknown
  types?: unknown
  typeParams?: unknown
}

/** after ripping the ast out then transform into this object for use */
export type JsonqlParamInfo = {
  name: string
  required: boolean
  // dynanic fields
  [key: string]: AnyType
}

export type JsonqlAstMap = {
  [methodName: string]: Array<JsonqlProcessedEntry>
}
