"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSendRejectedOrder = exports.validateSendCreatedOrder = void 0;
function validateSendCreatedOrder(body) {
    const result = {
        messages: []
    };
    if (!body.name) {
        result.messages.push({ field: 'name', message: 'Name is required' });
    }
    if (!body.order_number) {
        result.messages.push({ field: 'order_number', message: 'Order number is required' });
    }
    if (!body.to) {
        result.messages.push({ field: 'to', message: 'To is required' });
    }
    if (result.messages.length > 0) {
        return Promise.reject(result);
    }
    return Promise.resolve(body);
}
exports.validateSendCreatedOrder = validateSendCreatedOrder;
function validateSendRejectedOrder(body) {
    const result = {
        messages: []
    };
    if (!body.name) {
        result.messages.push({ field: 'name', message: 'Name is required' });
    }
    if (!body.reason) {
        result.messages.push({ field: 'reason', message: 'Reason number is required' });
    }
    if (!body.to) {
        result.messages.push({ field: 'to', message: 'To is required' });
    }
    if (result.messages.length > 0) {
        return Promise.reject(result);
    }
    return Promise.resolve(body);
}
exports.validateSendRejectedOrder = validateSendRejectedOrder;
