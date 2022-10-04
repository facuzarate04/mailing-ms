import * as express from "express";
import { NextFunction } from "connect";
import * as notification_controller from "@/notification/notification_controller";

const router = express.Router();

/* Middlewares */




/* Functions */

const sendCreatedOrderNotification = (req: express.Request, res: express.Response) => {
    notification_controller.sendCreatedOrderNotification(req, res);
};

const sendRejectedOrderNotification = (req: express.Request, res: express.Response) => {
    notification_controller.sendRejectedOrderNotification(req, res);
};


/* Routes */

router.post('/notify/created_order', sendCreatedOrderNotification);
router.post('/notify/rejected_order', sendRejectedOrderNotification);


export default router;


