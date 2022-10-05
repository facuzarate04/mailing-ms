import { Request, Response } from 'express'
import * as email_service from '@/notification/email/email_service';
import { validateSendCreatedOrder, validateSendRejectedOrder } from './email/validation';

export const sendCreatedOrderNotification = async (req: Request, res: Response) => {
    const channels = req.body.channels;
    if (channels.includes('email')) {
        try {
            const body = await validateSendCreatedOrder(req.body);
            const response = await email_service.sendCreatedOrderEmail(body);
            return res.status(200).json({ message: 'Email sent' });
        } catch (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
    }
    if (channels.includes('database')) {

    }
};


export const sendRejectedOrderNotification = async (req: Request, res: Response) => {
    const channels = req.body.channels;
    if (channels.includes('email')) {
        try {
            const body = await validateSendRejectedOrder(req.body);
            const response = await email_service.sendRejectedOrderEmail(body);
            return res.status(200).json({ message: 'Email sent' });
        } catch (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
    }
    if (channels.includes('database')) {

    }
}
