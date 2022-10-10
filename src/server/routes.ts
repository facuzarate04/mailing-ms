import * as express from "express";
import { NextFunction } from "connect";
import { sendCreatedOrderEmail } from "@/email/createdOrder";
import { sendRejectedOrderEmail } from "@/email/rejectedOrder";

const router = express.Router();

/* Middlewares */




/* Functions */

const createdOrder = (req: express.Request, res: express.Response) => {
    sendCreatedOrderEmail(req, res);
};

const rejectedOrder = (req: express.Request, res: express.Response) => {
    sendRejectedOrderEmail(req, res);
};


/* Routes */

router.post('/email/created_order', createdOrder);
router.post('/email/rejected_order', rejectedOrder);


export default router;


