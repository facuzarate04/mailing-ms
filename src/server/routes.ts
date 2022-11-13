import * as express from "express";
import { NextFunction } from "connect";
import { sendEmail as send } from "@/email/emailController";
import { 
    storeTemplate as store,
    updateTemplate as update,
    deleteTemplate as softDelete,
    getTemplates as get 
} from "@/template/templateController";

const router = express.Router();

/* Middlewares */




/* Functions */

function sendEmail(req: express.Request, res: express.Response) {
    send(req, res);
};

function storeTemplate(req: express.Request, res: express.Response) {
    store(req, res);
};

function updateTemplate(req: express.Request, res: express.Response) {
    update(req, res);
};

function deleteTemplate(req: express.Request, res: express.Response) {
    softDelete(req, res);
};

function getTemplates(req: express.Request, res: express.Response) {
    get(req, res);
};


/* Routes */

router.post('/email/send', sendEmail);
router.post('/template', storeTemplate);
router.put('/:moduleName/:templateName/template', updateTemplate);
router.delete('/:moduleName/:templateName/template', deleteTemplate);
router.get('/:moduleName/template', getTemplates);


export default router;


