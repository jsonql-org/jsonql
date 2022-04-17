/**
 * the same as above with a default JsonqlError as default
 * @param {array} errs same
 * @param {object} e error itself
 * @return {string} the name of the error
 */
export function getErrorNameByInstanceWithDefault(errs: any[], e: object): string;
/**
 * @param {array} errs list of errors to compare from
 * @param {object} e the error captured
 * @return {string} name of the error object
 */
export function getErrorNameByInstance(errs: any[], e: object): string;
//# sourceMappingURL=get-error-name-by-instance.d.mts.map