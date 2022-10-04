import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: process.env.DB_ENDPOINT || 'mongodb://localhost:27017',
    mail_host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
    mail_port: process.env.MAIL_PORT || 2525,
    mail_user: process.env.MAIL_USER || 'user',
    mail_pass: process.env.MAIL_PASS || 'pass',
};

export default config;
