import { IConnectionSMTP } from "./connection";
import { Request, Response } from 'express'
import { validateSendCreatedOrder } from "./validation";
import * as email from '@/email/email'

export interface ICreatedOrderRequest {
    name: string;
    order_number: string;
    to: string;
}


export const sendCreatedOrderEmail = async (req: Request, res: Response) => {
    try {
        const body = await validateSendCreatedOrder(req.body);
        
        const emailData = {
            to: body.to,
            subject: subject(),
            html: html(body.name, body.order_number),
            connection: connection
        };

        const response = await email.send(emailData);

        if(typeof response === 'string') {
            await email.save({
                key: response,
                value: {
                    type: 'created_order',
                    to: emailData.to,
                    subject: emailData.subject
                }
            });
        }
        
        return res.status(200).json({ message: 'Email sent' });

    } catch (error) {
        return res.status(500).json({ message: error});
    }
};


const subject = () : string => {
    return 'Order Created';
}

const html = (name: string, order_number: string) : string => {
    return `<h2>Hi <b>${name}</b></h2>
    <p>This emai is to notify you that your order has been created successfully.</p>
    <p><b>Order Number: ${order_number}</b></p>
    <p>Thank you for shopping with us.</p>
    <p>Regards</p>`;
}

const connection: IConnectionSMTP = {
    from: 'sells@ecommerce.com',
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '0a4f9dd9b6b6a4',
        pass: 'ff360e0a187be7'
    }
}




