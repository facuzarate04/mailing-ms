import { redis } from '@/redis/redis';
import { ITemplate } from './schema';


export interface ITemplateRedis {
    key: string;
    template: ITemplate;
}

async function saveTemplate(data: ITemplateRedis): Promise<string | null> {
    const key = data.key;
    const value = data.template;
    const response = await redis.setAsync(key, JSON.stringify(value));

    return Promise.resolve(response);
}

async function getTemplate (key: string): Promise<ITemplate | null> {
    const value = await redis.getAsync(key);
    return value ? JSON.parse(value) : null;
}


async function deleteTemplate(key: string) {
    await redis.delAsync(key);
}


export { saveTemplate, getTemplate, deleteTemplate };
