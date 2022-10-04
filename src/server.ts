import 'module-alias/register';
import express from 'express';
import mongoose from 'mongoose';
import config from '@/server/config';
import bodyParser from 'body-parser';
import router from '@/server/routes';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', router);

/* Mongoose connect */
mongoose.connect(config.db, {}, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`Connected to database: ${config.db}`);
    }
});


/* Start server */
app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});