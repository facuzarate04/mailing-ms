import {Schema, model}  from 'mongoose';
import { IStoreTemplateRequest } from './templateController';

export const TemplateSchema = new Schema({
    moduleName: { type: String, required: true },
    templateName: { type: String, required: true },
    subject: { type: String, required: true },
    html: { type: String, required: true },
    connection: {
        from: { type: String, required: true },
        host: { type: String, required: true },
        port: { type: Number, required: true },
        auth: {
            user: { type: String, required: false },
            pass: { type: String, required: false }
        }
    },
    deletedAt: { type: Date, required: false }
}, { timestamps: true });

export interface ITemplate {
    moduleName: string;
    templateName: string;
    subject: string;
    html: string;
    connection: IConnectionSMTP;
    deletedAt?: Date;
    timestamp: Date;
}

export interface IConnectionSMTP {
    from: string;
    host: string;
    port: number;
    auth?: {
        user: string;
        pass: string;
    }
}


export const Template = model<ITemplate>('Template', TemplateSchema);


export async function getTemplate(moduleTemplate: string, templateName: string): Promise<ITemplate | null> {
    const template = await Template.findOne(
        { moduleName: moduleTemplate, templateName: templateName }
    );
    if(template) {
        return Promise.resolve(template);
    }
    return null;
}


export async function storeTemplate(data: IStoreTemplateRequest): Promise<ITemplate> {
    const template = await Template.create(data);
    return Promise.resolve(template);
}