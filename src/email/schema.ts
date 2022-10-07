import { redis } from '@/server/redis';
import { IEmailRedis } from './email';

const saveEmail = async (email: IEmailRedis): Promise<string | null> => {
    const key = email.key;
    const value = email.value;
   const response = await redis.setAsync(key, JSON.stringify(value));

   return Promise.resolve(response);
}

const getEmail = async (key: string) => {
    const value = await redis.getAsync(key);
    return value ? JSON.parse(value) : null;
}


const deleteEmail = async (key: string) => {
    await redis.delAsync(key);
}


export { saveEmail, getEmail, deleteEmail };
