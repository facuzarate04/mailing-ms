import * as email from '@/notification/email/email'
import { CreatedOrder, ICreatedOrderRequest } from '@/notification/email/created_order'
import { IRejectedOrderRequest, RejectedOrder } from '@/notification/email/rejected_order'

export const sendCreatedOrderEmail = async (body: ICreatedOrderRequest) => {
    
    const createdOrder = CreatedOrder(body.name, body.order_number);

    const emailData = {
        from: body.from,
        to: body.to,
        subject: createdOrder.subject,
        html: createdOrder.message
    };
        
    await email.send(emailData);
}


export const sendRejectedOrderEmail = async (body: IRejectedOrderRequest) => {

    const rejectedOrder = RejectedOrder(body.name, body.reason);

    const emailData = {
        from: body.from,
        to: body.to,
        subject: rejectedOrder.subject,
        html: rejectedOrder.message
    };
        
    await email.send(emailData);
}




