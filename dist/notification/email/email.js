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
exports.rejectedOrderTemplate = exports.createdOrderTemplate = exports.send = exports.init = exports.deliveredStatus = exports.pendingStatus = exports.Email = void 0;
const nodemailer = __importStar(require("nodemailer"));
const createdOrder = __importStar(require("@/notification/email/created_order"));
const rejectedOrder = __importStar(require("@/notification/email/rejected_order"));
const mongoose_1 = require("mongoose");
/* Mongoose Schema */
const EmailSchema = new mongoose_1.Schema({
    type: String,
    from: String,
    to: String,
    status: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.Email = (0, mongoose_1.model)('Email', EmailSchema);
/* Status */
exports.pendingStatus = 'pending';
exports.deliveredStatus = 'delivered';
const init = () => {
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
    transporter.verify(function (error, success) {
        if (error) {
            throw error;
        }
        else {
            console.log('Server is ready to take our messages');
        }
    });
    return transporter;
};
exports.init = init;
const send = (transporter, mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw error;
        }
        return info.messageId;
    });
};
exports.send = send;
const createdOrderTemplate = (name, order_number) => {
    return createdOrder.template(name, order_number);
};
exports.createdOrderTemplate = createdOrderTemplate;
const rejectedOrderTemplate = (name, reason) => {
    return rejectedOrder.template(name, reason);
};
exports.rejectedOrderTemplate = rejectedOrderTemplate;
