"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectedOrder = void 0;
const subject = () => {
    return 'Order Rejected';
};
const html = (name, reason) => {
    return `<h2>Hi <b>${name}</b></h2>
    <p>This emai is to notify you that your order has been rejected.</p>
    <p>Reason: ${reason}</p>
    <p>Thank you for shopping with us.</p>
    <p>Regards</p>`;
};
const connection = {
    from: 'sells@ecommerce.com',
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '0a4f9dd9b6b6a4',
        pass: 'ff360e0a187be7'
    }
};
const RejectedOrder = (name, reason) => {
    return {
        name: name,
        reason: reason,
        subject: subject(),
        html: html(name, reason),
        connection: connection
    };
};
exports.RejectedOrder = RejectedOrder;
