// specify your types here
export type JsonqlCheckObjectKeys = {
  name: string
  type: Array<string>
}

export type JsonqlPluginConfig = {
  plugin: string,
  [key: string]: any
}

export type JsonqlValidateFn = (value: any) => boolean
