"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedOrder = exports.CreatedOrderType = void 0;
const CreatedOrderType = 'created_order';
exports.CreatedOrderType = CreatedOrderType;
const subject = () => {
    return 'Order Created';
};
const message = (name, order_number) => {
    return `<h2>Hi <b>${name}</b></h2>
    <p>This emai is to notify you that your order has been created successfully.</p>
    <p><b>Order Number: ${order_number}</b></p>
    <p>Thank you for shopping with us.</p>
    <p>Regards</p>`;
};
const CreatedOrder = (name, order_number) => {
    return {
        name: name,
        order_number: order_number,
        subject: subject(),
        message: message(name, order_number)
    };
};
exports.CreatedOrder = CreatedOrder;
