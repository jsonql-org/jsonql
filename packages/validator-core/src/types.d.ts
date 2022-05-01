// specify your types here
export type JsonqlCheckObjectKeys = {
  name: string
  type: Array<string>
}

export type JsonqlPluginInput = {
  plugin: string,
  [key: string]: any
}

export type JsonqlPluginConfig = {
  name: string,
  main: (...arg: any[]) => boolean,
  params?: string[]
}

export type JsonqlValidateFn = (value: any) => boolean
