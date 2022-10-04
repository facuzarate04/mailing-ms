import { Request, Response } from 'express'
import * as email_service from '@/notification/email/email_service';

export const sendCreatedOrderNotification = async (req: Request, res: Response) => {
    const channels = req.body.channels;
    if (channels.includes('email')) {
        let data = {
            name: req.body.name,
            order_number: req.body.order_number,
            from: req.body.from,
            to: req.body.to
        }
        try {
            const response = await email_service.sendCreatedOrderEmail(data);
            return res.status(200).json({ message: 'Email sent' });
        } catch (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
    }
    if (channels.includes('web')) {

    }
};


export const sendRejectedOrderNotification = async (req: Request, res: Response) => {
    const channels = req.body.channels;
    if (channels.includes('email')) {
        let data = {
            name: req.body.name,
            reason: req.body.reason,
            from: req.body.from,
            to: req.body.to
        }
        try {
            const response = await email_service.sendRejectedOrderEmail(data);
            return res.status(200).json({ message: 'Email sent' });
        } catch (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
    }
    if (channels.includes('web')) {

    }
}
