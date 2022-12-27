import dotenv from 'dotenv';
dotenv.config();

interface IConfig {
    port: string | number;
    mongoUrl: string;
    redisUrl: string;
    rabbitUrl: string;
    authCurrentUserUrl: string;
}

const config: IConfig = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.DB_ENDPOINT || 'mongodb://localhost:27017',
    redisUrl: process.env.DB_REDIS || 'redis://localhost:6379',
    rabbitUrl: process.env.RABBIT_URL || 'amqp://localhost:5672',
    authCurrentUserUrl: process.env.AUTH_CURRENT_USER_ENDPOINT || 'http://localhost:3000/v1/users/current',
};


export default config;