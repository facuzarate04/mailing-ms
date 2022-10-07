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
const email = __importStar(require("@/notification/email/email"));
const created_order_1 = require("@/notification/email/created_order");
const rejected_order_1 = require("@/notification/email/rejected_order");
function sendCreatedOrderEmail(body) {
    try {
        const createdOrder = (0, created_order_1.CreatedOrder)(body.name, body.order_number);
        const emailData = {
            to: body.to,
            subject: createdOrder.subject,
            html: createdOrder.html,
            connection: createdOrder.connection
        };
        Promise.resolve(email.send(emailData));
    }
    catch (error) {
        Promise.reject(error);
    }
}
exports.sendCreatedOrderEmail = sendCreatedOrderEmail;
function sendRejectedOrderEmail(body) {
    const rejectedOrder = (0, rejected_order_1.RejectedOrder)(body.name, body.reason);
    const emailData = {
        to: body.to,
        subject: rejectedOrder.subject,
        html: rejectedOrder.html,
        connection: rejectedOrder.connection
    };
    return email.send(emailData);
}
exports.sendRejectedOrderEmail = sendRejectedOrderEmail;
