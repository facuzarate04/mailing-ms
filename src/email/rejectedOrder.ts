import { IConnectionSMTP} from "./connection";
import { Request, Response } from 'express'
import { validateSendRejectedOrder } from "./validation";
import * as email from '@/email/email'



export interface IRejectedOrderRequest {
    name: string;
    reason: string;
    to: string;
}

export const sendRejectedOrderEmail = async (req: Request, res: Response) => {
    try {
        const body = await validateSendRejectedOrder(req.body);
        
        const emailData = {
            to: body.to,
            subject: subject(),
            html: html(body.name, body.reason),
            connection: connection
        };

        const response = await email.send(emailData)

        if(typeof response === 'string') {
            await email.saveEmail({
                key: response,
                value: {
                    type: 'rejected_order',
                    to: emailData.to,
                    subject: emailData.subject
                }
            });
        }
        
        return res.status(200).json({ message: 'Email sent' });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending email' });
    }
};


const subject = () : string => {
    return 'Order Rejected';
}

const html = (name: string, reason: string) : string => {
    return `<h2>Hi <b>${name}</b></h2>
    <p>This emai is to notify you that your order has been rejected.</p>
    <p>Reason: ${reason}</p>
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

