import * as nodemailer from 'nodemailer';
import * as schema from '@/email/schema';
import { getTemplate, IConnectionSMTP } from '@/template/schema';
import { ISendEmailRequest } from './emailController';



export async function send(data: ISendEmailRequest) : Promise<string | null> {

    const template = await getTemplate(data.moduleName, data.templateName);

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

            await save({
                key: info.messageId,
                value: {
                    type: data.templateName,
                    to: data.to
                }
            });

            return Promise.resolve(info.messageId);
        }
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


async function save(data: schema.IEmailRedis) : Promise<void> {

    const key = data.key;
    const value = {
        type: data.value.type,
        to: data.value.to
    };

    if (key) {
       await schema.saveEmail({ key, value });
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






