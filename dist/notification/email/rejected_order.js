"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.RejectedOrderType = void 0;
exports.RejectedOrderType = 'rejected_order';
const subject = () => {
    return 'Order Rejected';
};
const message = (name, reason) => {
    return `<h2>Hi <b>${name}</b></h2>
    <p>This emai is to notify you that your order has been rejected.</p>
    <p>Reason: ${reason}</p>
    <p>Thank you for shopping with us.</p>
    <p>Regards</p>`;
};
const template = (name, reason) => {
    return {
        name: name,
        reason: reason,
        subject: subject(),
        message: message(name, reason)
    };
};
exports.template = template;
