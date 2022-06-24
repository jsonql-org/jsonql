"use strict";
// move out from lodash
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqual = exports.isEqualCheap = void 0;
// Poorman way ...
function isEqualCheap(obj1, obj2) {
    try {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    catch (e) {
        return false;
    }
}
exports.isEqualCheap = isEqualCheap;
/*
 * Check if two objects or arrays are equal
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * (c) 2022 Joel Chu rewrite in Typescript and fix styling issues
 */
function isEqual(obj1, obj2) {
    function getType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }
    function areArraysEqual() {
        // Check length
        if (obj1.length !== obj2.length) {
            return false;
        }
        // Check each item in the array
        for (let i = 0; i < obj1.length; i++) {
            if (!isEqual(obj1[i], obj2[i])) {
                return false;
            }
        }
        // If no errors, return true
        return true;
    }
    function areObjectsEqual() {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        // Check each item in the object
        for (const key in obj1) {
            if (Object.prototype.hasOwnProperty.call(obj1, key)) {
                if (!isEqual(obj1[key], obj2[key])) {
                    return false;
                }
            }
        }
        // If no errors, return true
        return true;
    }
    function areFunctionsEqual() {
        return obj1.toString() === obj2.toString();
    }
    function arePrimativesEqual() {
        return obj1 === obj2;
    }
    // Get the object type
    const type = getType(obj1);
    switch (type) {
        case 'array':
            return areArraysEqual();
        case 'object':
            return areObjectsEqual();
        case 'function':
            return areFunctionsEqual();
        default:
            if (type !== getType(obj2)) {
                return false;
            }
            return arePrimativesEqual();
    }
}
exports.isEqual = isEqual;
