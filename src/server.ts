import 'module-alias/register';
import express from 'express';
import config from '@/server/config';
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