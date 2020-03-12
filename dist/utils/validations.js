"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidString(val) {
    return typeof val === 'string' && val !== '';
}
exports.isValidString = isValidString;
function isValidNumber(val) {
    return typeof val === 'number' && !Number.isNaN(val);
}
exports.isValidNumber = isValidNumber;
