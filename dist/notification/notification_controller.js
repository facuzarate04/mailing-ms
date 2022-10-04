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
exports.sendRejectedOrderNotification = exports.sendCreatedOrderNotification = void 0;
const email_service = __importStar(require("@/notification/email/email_service"));
const sendCreatedOrderNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channels = req.body.channels;
    if (channels.includes('email')) {
        let data = {
            name: req.body.name,
            order_number: req.body.order_number,
            from: req.body.from,
            to: req.body.to
        };
        try {
            const response = yield email_service.sendCreatedOrderEmail(data);
            return res.status(200).json({ message: 'Email sent' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
    }
    if (channels.includes('web')) {
    }
});
exports.sendCreatedOrderNotification = sendCreatedOrderNotification;
const sendRejectedOrderNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channels = req.body.channels;
    if (channels.includes('email')) {
        let data = {
            name: req.body.name,
            reason: req.body.reason,
            from: req.body.from,
            to: req.body.to
        };
        try {
            const response = yield email_service.sendRejectedOrderEmail(data);
            return res.status(200).json({ message: 'Email sent' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
    }
    if (channels.includes('web')) {
    }
});
exports.sendRejectedOrderNotification = sendRejectedOrderNotification;
