"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
require("reflect-metadata");
// const validationKey = Symbol('jsonqlValidator')
/**
When using TS to develop resolver with jsonql
dev can use the combo of class and decorator
*/
function Validate(rules) {
    return (target, propertyName) => {
        console.log(rules, target, propertyName);
    };
}
exports.Validate = Validate;
