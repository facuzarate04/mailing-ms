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
exports.send = void 0;
const nodemailer = __importStar(require("nodemailer"));
function init() {
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
    transporter.verify(function (error, success) {
        if (error) {
            throw error;
        }
    });
    return transporter;
}
function send(data) {
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
exports.send = send;
