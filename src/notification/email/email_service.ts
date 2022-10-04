import * as emailModel from '@/notification/email/email'
import * as created_order from '@/notification/email/created_order'
import * as rejected_order from '@/notification/email/rejected_order'



interface SendCreatedOrderInterface {
    name: string;
    order_number: string;
    from: string;
    to: string;
}

export const sendCreatedOrderEmail = (data: SendCreatedOrderInterface) => {
    const { name, order_number, from, to } = data;
    const email = new emailModel.Email({
        type: created_order.CreatedOrderType,
        from: from,
        to: to,
        status: emailModel.pendingStatus
    });

    /* Send Email */
    const transporter = emailModel.init();
    const template = emailModel.createdOrderTemplate(name, order_number);
    const mailOptions = {
        from: email.from,
        to: email.to,
        subject: template.subject,
        html: template.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            email.save();
            throw error;
        }
        email.status = emailModel.deliveredStatus;
        email.save();
        return info;
    });

}


interface SendRejectedOrderInterface {
    name: string;
    reason: string;
    from: string;
    to: string;
}
export const sendRejectedOrderEmail = (data: SendRejectedOrderInterface) => {
    const { name, reason, from, to } = data;

    const email = new emailModel.Email({
        type: rejected_order.RejectedOrderType,
        from: from,
        to: to,
        status: emailModel.pendingStatus
    });

    /* Send Email */
    const transporter = emailModel.init();
    const template = emailModel.rejectedOrderTemplate(name, reason);

    const mailOptions = {
        from: from,
        to: to,
        subject: template.subject,
        html: template.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            email.save();
            throw error;
        }
        email.status = emailModel.deliveredStatus;
        email.save();
        return info;
    });
};






