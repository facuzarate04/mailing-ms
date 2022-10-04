"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRejectedOrderEmail = exports.sendCreatedOrderEmail = void 0;
const emailModel = __importStar(require("@/notification/email/email"));
const created_order = __importStar(require("@/notification/email/created_order"));
const rejected_order = __importStar(require("@/notification/email/rejected_order"));
const sendCreatedOrderEmail = (data) => {
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
};
exports.sendCreatedOrderEmail = sendCreatedOrderEmail;
const sendRejectedOrderEmail = (data) => {
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
exports.sendRejectedOrderEmail = sendRejectedOrderEmail;
