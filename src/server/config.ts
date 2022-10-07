import dotenv from 'dotenv';
dotenv.config();

interface IConfig {
    port: string | number;
    db_mongo_uri: string;
    db_redis_uri: string;
}

const config: IConfig = {
    port: process.env.PORT || 3000,
    db_mongo_uri: process.env.DB_ENDPOINT || 'mongodb://localhost:27017',
    db_redis_uri: process.env.DB_REDIS || 'redis://localhost:6379'
};

export default config;
