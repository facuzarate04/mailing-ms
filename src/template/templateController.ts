import { ITemplate, Template } from "@/template/schema";
import { Request, Response } from 'express';
import { validateStoreTemplateRequest } from "@/template/validation";

export interface IStoreTemplateRequest {
    moduleName: string;
    templateName: string;
    subject: string;
    html: string;
    connection: {
        from: string;
        host: string;
        port: number;
        auth?: {
            user: string;
            pass: string;
        }
    },
    deletedAt?: Date;
    timestamp: Date;
}

export async function storeSchema(req: Request, res: Response) {
    try {
        const body = await validateStoreTemplateRequest(req.body);
        const template = await Template.create(body);
        return res.status(200).json({ message: 'Template saved', template });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}