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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCreatedOrderEmail = void 0;
const emailModel = __importStar(require("@/models/email"));
const created_order = __importStar(require("@/templates/created_order"));
const sendCreatedOrderEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, order_number, from, to } = req.body;
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
    yield transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            email.save();
            return res.status(500).json({
                message: 'Error sending email',
                error: error
            });
        }
        email.status = emailModel.deliveredStatus;
        email.save();
        return res.status(200).json({
            message: 'Email sent',
            info: info
        });
    });
});
exports.sendCreatedOrderEmail = sendCreatedOrderEmail;
/* export const sendRejectedOrderEmail = async (req: Request, res: Response) => {
    const { name, reason, from, to } = req.body;
    const transporter = email.init();
    const template = rejected_order.template(name, reason);

    const mailOptions = {
        from: from,
        to: to,
        subject: template.subject,
        html: template.message
    };


    return res.status(200).json({ message: 'Email sent' });

} */
