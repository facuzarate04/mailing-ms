import {Schema, model}  from 'mongoose';
import { IStoreTemplateRequest } from './templateController';

export const TemplateSchema = new Schema({
    name: {type: String, required: true, unique: true},
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
    }
});

export interface ITemplate {
    name: string;
    subject: string;
    html: string;
    connection: IConnectionSMTP;
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


export async function getTemplate(name: string): Promise<ITemplate | null> {
    const template = await Template.findOne({name});
    if(template) {
        return Promise.resolve(template);
    }
    return null;
}


export async function storeTemplate(data: IStoreTemplateRequest): Promise<string> {
    const template = await Template.create(data);
    return Promise.resolve(template.name);
}