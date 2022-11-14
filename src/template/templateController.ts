import { store, update, destroy, getMany } from "@/template/schema";
import { Request, Response } from 'express';
import { validateStoreTemplateRequest, validateUpdateTemplateRequest, validateGetModuleTemplatesRequest } from "@/template/validation";


export async function storeTemplate(req: Request, res: Response): Promise<Response> {
    try {
        const body = await validateStoreTemplateRequest(req.body);
        const template = await store(body);
        return res.status(200).json({ template });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export async function updateTemplate(req: Request, res: Response): Promise<Response> {
    try {
        const { moduleName, templateName } = req.params;
        const body = await validateUpdateTemplateRequest(moduleName, templateName, req.body);
        const template = await update(moduleName, templateName, body);
        return res.status(200).json({ template });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export async function deleteTemplate(req: Request, res: Response): Promise <Response> {
    try {
        const { moduleName, templateName } = req.params;
        const template = await destroy(moduleName, templateName);
        return res.status(200).json({ template });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export async function getTemplates(req: Request, res: Response): Promise<Response> {
    try {
        const moduleName = await validateGetModuleTemplatesRequest(req);
        if(typeof moduleName === 'string') {
            const templates = await getMany(moduleName);
            return res.status(200).json({ templates });
        }
        return res.status(500).json({ message: moduleName });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}