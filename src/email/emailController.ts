import { validateSendEmailRequest } from "@/email/validation";
import * as email from '@/email/email'
import { send } from '@/rabbit/sender';

export interface ISendEmailReceived {
    moduleName: string;
    templateName: string;
    to: string;
    htmlData: object;
    referenceId?: string;
}

export async function sendEmail(data: ISendEmailReceived) {
    try {

        const body = await validateSendEmailRequest(data);
        await email.send(body);

        let message =  {
            moduleName: body.moduleName,
            templateName: body.templateName,
            sent: true,
            referenceId: body.referenceId
        }
        send(message);
        

    } catch (error) {
        let message = {
            moduleName: data.moduleName,
            templateName: data.templateName,
            sent: false,
            referenceId: data.referenceId
        };
        send(message);
    }
}