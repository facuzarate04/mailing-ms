import * as nodemailer from 'nodemailer';
import * as createdOrder from '@/notification/email/created_order';
import * as rejectedOrder from '@/notification/email/rejected_order';
import { NotificationInterface } from '@/notification/notification';
import { model, Schema } from 'mongoose';

export interface EmailInterface extends NotificationInterface {
    type: typeof createdOrder.CreatedOrderType | typeof rejectedOrder.RejectedOrderType;
    from: string;
    to: string;
    status: typeof pendingStatus | typeof deliveredStatus;
}

/* Mongoose Schema */
const EmailSchema = new Schema({
    type: String,
    from: String,
    to: String,
    status: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

export const Email = model<EmailInterface>('Email', EmailSchema);


/* Used to save type as String attribute*/
export type EmailType = typeof createdOrder.CreatedOrderType | typeof rejectedOrder.RejectedOrderType;


/* Status */
export const pendingStatus = 'pending';
export const deliveredStatus = 'delivered';

export const init = () : nodemailer.Transporter => {

    /* const transport = nodemailer.createTransport({
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
        } else {
              console.log('Server is ready to take our messages');
        }
    });

    return transporter;
}

export const send = (transporter: nodemailer.Transporter, mailOptions: nodemailer.SendMailOptions) : void | any => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw error;
        }
        return info.messageId;
    });
}


export const createdOrderTemplate = (name: string, order_number: string) : createdOrder.CreatedOrderTemplate => {
    return createdOrder.template(name, order_number);
}
export const rejectedOrderTemplate = (name: string, reason: string) : rejectedOrder.RejectedOrderTemplate => { 
    return rejectedOrder.template(name, reason);
}



