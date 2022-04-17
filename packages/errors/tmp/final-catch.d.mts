/**
 * this will put into generator call at the very end and catch
 * the error throw from inside then throw again
 * this is necessary because we split calls inside and the throw
 * will not reach the actual client unless we do it this way
 * @param {object} e Error
 * @return {void} just throw
 */
export default function finalCatch(e: object): void;
//# sourceMappingURL=final-catch.d.mts.map