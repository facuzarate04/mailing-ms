import * as nodemailer from 'nodemailer';
import config from '@/server/config';

interface IEmail {
    from: string;
    to: string;
    subject: string;
    html: string;
}

function init() : nodemailer.Transporter {

    /* const transporter = nodemailer.createTransport({
        host: config.mail_host,
        port: config.mail_port,
        auth: {
            user: config.mail_user,
            pass: config.mail_pass
        }
    }); */

    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0a4f9dd9b6b6a4",
          pass: "ff360e0a187be7"
        }
    });

    transporter.verify(function(error, success) {
        if (error) {
            throw error;
        }
    });

    return transporter;
}

export function send(data: IEmail) : string | void {

    const transporter = init();
    const mailOptions = {
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw error;
        }
        return info.messageId;
    });
}






