import dotenv from 'dotenv';
dotenv.config();

interface IConfig {
    port: string | number;
    db_mongo_uri: string;
    db_redis_uri: string;
    mail_host: string;
    mail_port: string | number;
    mail_user: string;
    mail_pass: string;
}

const config: IConfig = {
    port: process.env.PORT || 3000,
    db_mongo_uri: process.env.DB_ENDPOINT || 'mongodb://localhost:27017',
    db_redis_uri: process.env.DB_REDIS || 'redis://localhost:6379',
    mail_host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
    mail_port: process.env.MAIL_PORT || 2525,
    mail_user: process.env.MAIL_USER || 'user',
    mail_pass: process.env.MAIL_PASS || 'pass',
};

export default config;
