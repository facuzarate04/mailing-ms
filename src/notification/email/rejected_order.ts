interface IRejectedOrder {
    name: string;
    reason: string;
    subject: string;
    message: string;
}

export interface IRejectedOrderRequest {
    name: string;
    reason: string;
    from: string;
    to: string;
}

const RejectedOrderType = 'rejected_order';

const subject = () : string => {
    return 'Order Rejected';
}

const message = (name: string, reason: string) : string => {
    return `<h2>Hi <b>${name}</b></h2>
    <p>This emai is to notify you that your order has been rejected.</p>
    <p>Reason: ${reason}</p>
    <p>Thank you for shopping with us.</p>
    <p>Regards</p>`;
}

const RejectedOrder = (name: string, reason: string) : IRejectedOrder => {
    return {
        name: name,
        reason: reason,
        subject: subject(),
        message: message(name, reason)
    }
}

export {
    RejectedOrderType,
    RejectedOrder,
    IRejectedOrder
}
