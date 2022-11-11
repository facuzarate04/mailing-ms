import { Request, Response } from 'express'
import { validateSendEmailRequest } from "@/email/validation";
import * as email from '@/email/email'

export interface ISendEmailRequest {
    moduleName: string;
    templateName: string;
    to: string;
    htmlData: object;
}

export async function sendEmail(req: Request, res: Response) {
    try {

        const body = await validateSendEmailRequest(req.body);

        await email.send(body);
        
        return res.status(200).json({ message: 'Email sent' });

    } catch (error) {
        return res.status(500).json({ message: error});
    }
}