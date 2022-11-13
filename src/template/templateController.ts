import { store, update, softDelete, getMany } from "@/template/schema";
import { Request, Response } from 'express';
import { validateStoreTemplateRequest, validateUpdateTemplateRequest } from "@/template/validation";


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

export async function deleteTemplate(req: Request, res: Response): Promise < Response > {
    try {
        const { moduleName, templateName } = req.params;
        const template = await softDelete(moduleName, templateName);
        return res.status(200).json({ template });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export async function getTemplates(req: Request, res: Response): Promise<Response> {
    try {
        const { moduleName } = req.params;
        const templates = await getMany(moduleName);
        return res.status(200).json({ templates });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}