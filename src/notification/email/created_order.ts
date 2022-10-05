
interface ICreatedOrder {
    name: string;
    order_number: string;
    subject: string;
    message: string;
}

export interface ICreatedOrderRequest {
    name: string;
    order_number: string;
    from: string;
    to: string;
}

const CreatedOrderType = 'created_order';

const subject = () : string => {
    return 'Order Created';
}

const message = (name: string, order_number: string) : string => {
    return `<h2>Hi <b>${name}</b></h2>
    <p>This emai is to notify you that your order has been created successfully.</p>
    <p><b>Order Number: ${order_number}</b></p>
    <p>Thank you for shopping with us.</p>
    <p>Regards</p>`;
}

const CreatedOrder = (name: string, order_number: string) : ICreatedOrder => {
    return {
        name: name,
        order_number: order_number,
        subject: subject(),
        message: message(name, order_number)
    }
}


export {
    CreatedOrderType,
    CreatedOrder,
    ICreatedOrder
}



