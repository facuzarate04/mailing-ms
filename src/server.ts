import 'module-alias/register';
import express from 'express';
import config from '@/server/config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from '@/server/routes';
import helmet from 'helmet';
import cors from 'cors';
import { createClient } from 'redis';


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', router);

/* Mongo DB connection */
mongoose.connect(config.db_mongo_uri, {}, (err) => {
    if (err) {
        console.log('Error connecting to MongoDB', err);
    } else {
        console.log(`Connected to mongo at ${config.db_mongo_uri}`);
    }
});

/* Redis Client connection */
export const redisClient = createClient({ url: config.db_redis_uri });
redisClient.connect();
redisClient.on('ready', () => {
    console.log(`Connected to redis: ${config.db_redis_uri}`);
});


/* Start server */
app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});