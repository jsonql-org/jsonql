// here we define the type of the object that get pass to the createSchema
import type { AnyTypeArr } from '@jsonql/utils/index'

export declare type JsonqlValidatePlugin = {
  name: string,
  main: (...args: AnyTypeArr) => boolean
}

export declare type JsonqlNumberPlugin = {
  main: (num: number) => boolean
}

export declare type JsonqlNumberComparePlugin = {
  main: (value: number, arg: number) => boolean
}

export declare type JsonqlStringPlugin = {
  main: (value: string) => boolean
}

export declare type JsonqlNumberExtendPlugin = {
  main: (value: number, max: number, min: number) => boolean
}

export declare type JsonqlEmailPlugin = JsonqlValidatePlugin & JsonqlStringPlugin

export declare type JsonqlIntPlugin = JsonqlValidatePlugin & JsonqlNumberPlugin

export declare type JsonqlUintPlugin = JsonqlValidatePlugin & JsonqlNumberPlugin

export declare type JsonqlMoreThanPlugin = JsonqlValidatePlugin & JsonqlNumberComparePlugin

export declare type JsonqlLessThanPlugin = JsonqlValidatePlugin & JsonqlNumberComparePlugin

export declare type JsonqlMoreThanEqualPlugin = JsonqlValidatePlugin & JsonqlNumberComparePlugin

export declare type JsonqlLessThanEqualPlugin = JsonqlValidatePlugin & JsonqlNumberComparePlugin

export declare type JsonqlBetweenPlugin = JsonqlValidatePlugin & JsonqlNumberExtendPlugin

export declare type JsonqlWithinPlugin = JsonqlValidatePlugin & JsonqlNumberExtendPlugin
