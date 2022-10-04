"use strict";
/* Validate */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringField = exports.requiredField = void 0;
function requiredField(field) {
    if (!field) {
        return { path: field, message: `${field} can not be empty` };
    }
    return;
}
exports.requiredField = requiredField;
function stringField(field) {
    if (typeof field !== 'string') {
        return { path: field, message: `${field} should be an string` };
    }
    return;
}
exports.stringField = stringField;
