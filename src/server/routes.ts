import * as express from "express";
import { NextFunction } from "connect";
import { sendEmail as send } from "@/email/emailController";
import { storeSchema as store } from "@/template/templateController";

const router = express.Router();

/* Middlewares */




/* Functions */

const sendEmail = (req: express.Request, res: express.Response) => {
    send(req, res);
};

const storeSchema = (req: express.Request, res: express.Response) => {
    store(req, res);
};


/* Routes */

router.post('/email/send', sendEmail);
router.post('/template/store', storeSchema);


export default router;


