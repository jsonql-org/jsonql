"use strict";
// email validator
// this is an example how to create a plugin
// one default export method accept one parameter value return boolean
// then export a named export call name: string and that's it
// or just return a string regex pattern: string
Object.defineProperty(exports, "__esModule", { value: true });
const name = 'email';
function main(value) {
    const pattern = "^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$";
    return (new RegExp(pattern)).test(value);
}
exports.default = {
    main,
    name,
};