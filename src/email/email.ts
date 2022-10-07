import * as nodemailer from 'nodemailer';
import { IConnectionSMTP } from './connection';
import * as schema from '@/email/schema';


interface IEmail {
    to: string;
    subject: string;
    html: string;
    connection: IConnectionSMTP;
}

export interface IEmailRedis {
    key: string;
    value: {
        type: string,
        to: string;
        subject: string;
    };
}


function init(connection: IConnectionSMTP) : nodemailer.Transporter {

    const transporter = nodemailer.createTransport({
        host: connection.host,
        port: connection.port,
        auth: {
          user: connection.auth.user,
          pass: connection.auth.pass
        }
    });
    transporter.verify(function(error, success) {
        if (error) {
            return Promise.reject('Transporter error');
        }
    });

    return transporter;
}

export async function send(data: IEmail) : Promise<string | null> {

    const transporter = init(data.connection);
    const mailOptions = {
        from: data.connection.from,
        to: data.to,
        subject: data.subject,
        html: data.html
    };

    const info = await transporter.sendMail(mailOptions);
    if(info.messageId) {
        return Promise.resolve(info.messageId);
    }
    return Promise.reject('Error sending email');

}


export function saveEmail(data: IEmailRedis) : Promise<void> {
    const key = data.key;
    const value = {
        type: data.value.type,
        to: data.value.to,
        subject: data.value.subject
    };

    if (key) {
        schema.saveEmail({ key, value });
    }
    return Promise.resolve();
}






