import { redis } from '@/redis/redis';


export interface IEmailRedis {
    key: string;
    value: {
        type: string,
        to: string;
    };
}

async function saveEmail(email: IEmailRedis): Promise<string | null> {
    const key = email.key;
    const value = email.value;
    const response = await redis.setAsync(key, JSON.stringify(value));

    return Promise.resolve(response);
}

async function getEmail (key: string) {
    const value = await redis.getAsync(key);
    return value ? JSON.parse(value) : null;
}


async function deleteEmail(key: string) {
    await redis.delAsync(key);
}


export { saveEmail, getEmail, deleteEmail };
