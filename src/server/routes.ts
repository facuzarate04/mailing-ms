import * as express from "express";
import { 
    storeTemplate as store,
    updateTemplate as update,
    deleteTemplate as destroy,
    getTemplates as get 
} from "@/template/templateController";
import * as authorization from "@/server/auth";

const router = express.Router();


/* Middlewares */

function authMiddleware(req: any, res: express.Response, next: express.NextFunction) {
    const auth = req.header("Authorization");
    if (!auth) {
        return res.status(401).send("No token provided");
    }
    authorization.validateToken(auth)
        .then((session) => {
            if (!session) {
                return res.status(401).send("Invalid token");
            }
            req.user = session;
            next();
        }).catch((err) => {
            return res.status(401).send("Invalid token");
        });
    
}


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

router.post('/template', authMiddleware, storeTemplate);
router.put('/template/:moduleName/:templateName', authMiddleware, updateTemplate);
router.delete('/template/:moduleName/:templateName', authMiddleware, deleteTemplate);
router.get('/template', authMiddleware, getTemplates);

export default router;


