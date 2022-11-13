import dotenv from 'dotenv';
dotenv.config();

interface IConfig {
    port: string | number;
    mongoUrl: string;
    redisUrl: string;
    rabbitUrl: string;
}

const config: IConfig = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.DB_ENDPOINT || 'mongodb://localhost:27017',
    redisUrl: process.env.DB_REDIS || 'redis://localhost:6379',
    rabbitUrl: process.env.RABBIT_URL || 'amqp://localhost:5672'
};


export default config;