"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedOrder = void 0;
const subject = () => {
    return 'Order Created';
};
const html = (name, order_number) => {
    return `<h2>Hi <b>${name}</b></h2>
    <p>This emai is to notify you that your order has been created successfully.</p>
    <p><b>Order Number: ${order_number}</b></p>
    <p>Thank you for shopping with us.</p>
    <p>Regards</p>`;
};
const connection = {
    from: 'sells@ecommerce.com',
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '',
        pass: 'ff360e0a187be7'
    }
};
const CreatedOrder = (name, order_number) => {
    return {
        name: name,
        order_number: order_number,
        subject: subject(),
        html: html(name, order_number),
        connection: connection
    };
};
exports.CreatedOrder = CreatedOrder;
