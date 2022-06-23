import type { AnyType } from './types'
/*!
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 */
export function trueTypeOf (obj: AnyType): string {
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
