"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.InitValidator = exports.jsonqlValidationKey = exports.jsonqlAstKey = void 0;
require("reflect-metadata");
const src_1 = require("@jsonql/ast/src");
exports.jsonqlAstKey = Symbol('jsonqlAstKey');
exports.jsonqlValidationKey = Symbol('jsonqlValidator');
/**
 * We need this class decorator to collect all the necessary info for this class
 */
function InitValidator(constructor) {
    const file = (0, src_1.pickInputFile)(new Error());
    return class extends constructor {
        constructor(...args) {
            super(...args);
            (0, src_1.tsClassParser)(file)
                .then(astMap => {
                console.log(`AstMap here`);
                const target = constructor.prototype;
                Reflect.defineMetadata(exports.jsonqlAstKey, astMap, target);
            });
        }
    };
}
exports.InitValidator = InitValidator;
/**
When using TS to develop resolver with jsonql
dev can use the combo of class and decorator
*/
function Validate(rules) {
    return (target, propertyName, descriptor) => {
        const fn = descriptor.value;
        const astMap = (0, src_1.tsFileParser)(fn.toString());
        console.log(astMap);
        const rule = Reflect.getOwnMetadata(exports.jsonqlValidationKey, target) || {};
        console.log(rules, target, propertyName);
        rule[propertyName] = rules;
        console.log(astMap);
        Reflect.defineMetadata(exports.jsonqlValidationKey, rule, target);
    };
}
exports.Validate = Validate;
