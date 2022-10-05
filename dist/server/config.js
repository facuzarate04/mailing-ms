"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 3000,
    db_mongo_uri: process.env.DB_ENDPOINT || 'mongodb://localhost:27017',
    db_redis_uri: process.env.DB_REDIS || 'redis://localhost:6379',
    mail_host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
    mail_port: process.env.MAIL_PORT || 2525,
    mail_user: process.env.MAIL_USER || 'user',
    mail_pass: process.env.MAIL_PASS || 'pass',
};
exports.default = config;
