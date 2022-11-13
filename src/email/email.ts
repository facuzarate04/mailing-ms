import * as nodemailer from 'nodemailer';
import { saveTemplate } from '@/template/redisSchema';
import { getOne, IConnectionSMTP, ITemplate } from '@/template/schema';
import { ISendEmailRequest } from './emailController';



export async function send(data: ISendEmailRequest) : Promise<string | null> {

    const template = await getOne(data.moduleName, data.templateName);

    if(template) {
        await save(data.moduleName, data.templateName, template);
    }

    if (template) {
        const transporter = init(template.connection)
        const mailOptions = {
            from: template.connection.from,
            to: data.to,
            subject: template.subject,
            html: buildHtml(template.html, data.htmlData)
        };
    
        const info = await transporter.sendMail(mailOptions);
        if(info.messageId) {
            //Notify to rabbit that
            return Promise.resolve(info.messageId);
        }
        //Notify to rabbit that email was not sent
        return Promise.reject('Error sending email');
    }
    return Promise.reject('Template not found');
    
}



function init(connection: IConnectionSMTP) : nodemailer.Transporter {
    const transporter = nodemailer.createTransport({
        host: connection.host,
        port: connection.port,
        auth: {
          user: connection.auth?.user,
          pass: connection.auth?.pass
        }
    });
    transporter.verify(function(error, success) {
        if (error) {
            return Promise.reject('Transporter error');
        }
    });

    return transporter;
}


async function save(moduleName: string, templateName: string, template: ITemplate) : Promise<void> {

    const key = `${moduleName}_${templateName}`;

    if (key) {
       await saveTemplate({key, template});
       return Promise.resolve();
    }
    return Promise.reject('Error saving email on Redis');
    
}


function buildHtml(html: string, htmlData: object): string {

    Object.entries(htmlData).forEach(([key, value]) => {
        html = html.replace(`{{${key}}}`, value);
    });

    return html;

} 






