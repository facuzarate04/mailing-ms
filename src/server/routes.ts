import * as express from "express";
import { 
    storeTemplate as store,
    updateTemplate as update,
    deleteTemplate as destroy,
    getTemplates as get 
} from "@/template/templateController";

const router = express.Router();

/* Middlewares */




/* Functions */


function storeTemplate(req: express.Request, res: express.Response) {
    store(req, res);
};

function updateTemplate(req: express.Request, res: express.Response) {
    update(req, res);
};

function deleteTemplate(req: express.Request, res: express.Response) {
    destroy(req, res);
};

function getTemplates(req: express.Request, res: express.Response) {
    get(req, res);
};


/* Routes */

router.post('/template', storeTemplate);
router.put('/template/:moduleName/:templateName', updateTemplate);
router.delete('/template/:moduleName/:templateName', deleteTemplate);
router.get('/template', getTemplates);


export default router;


