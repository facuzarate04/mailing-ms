import {Schema, model}  from 'mongoose';
import * as redisSchema from '@/template/redisSchema';
 

export interface ITemplate {
    moduleName: string;
    templateName: string;
    subject: string;
    html: string;
    connection: IConnectionSMTP;
    deletedAt?: Date;
    timestamp: Date;
}

export interface IUpdateTemplate {
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


export const Template = model<ITemplate>('Template', TemplateSchema);


export async function store(data: any): Promise<ITemplate> {
    const template = await Template.create(data);
    return Promise.resolve(template);
}

export async function update(moduleName: string, templateName: string, data: any): Promise<ITemplate | null> {
    await Template.findOneAndUpdate(
        { moduleName: moduleName, templateName: templateName, deletedAt: null },
        data,
        { new: false }
    );
    await redisSchema.deleteTemplate(`${moduleName}_${templateName}`);
    const template = await getOne(moduleName, templateName);
    return Promise.resolve(template);
}

export async function destroy(moduleName: string, templateName: string): Promise<ITemplate | null> {
    const template = await Template.findOneAndUpdate(
        { moduleName: moduleName, templateName: templateName, deletedAt: null },
        { deletedAt: Date.now() },
        { new: false }
    );
    await redisSchema.deleteTemplate(`${moduleName}_${templateName}`);
    return Promise.resolve(template);
}

export async function getOne(moduleTemplate: string, templateName: string): Promise<ITemplate | null> {
    let template = null;
    template = await redisSchema.getTemplate(`${moduleTemplate}_${templateName}`);
    if(!template) {
        template = await Template.findOne(
            { moduleName: moduleTemplate, templateName: templateName, deletedAt: null }
         );
    }
    return Promise.resolve(template);
}

export async function getMany(moduleName: string): Promise<ITemplate[]> {
    const templates = await Template.find(
        { moduleName: moduleName, deletedAt: null }
    );
    return Promise.resolve(templates);
}