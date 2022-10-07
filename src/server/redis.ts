
import { redisClient } from '@/server';

interface IRedis {
    getAsync: (key: string) => Promise<string | null>;
    setAsync: (key: string, value: string) => Promise<string | null>;
    delAsync: (key: string) => Promise<number>;
}



export const redis: IRedis = {
    getAsync: async (key: string) => {
        return await redisClient.get(key);
    },
    setAsync: async (key: string, value: string) => {
        return await redisClient.set(key, value);
    },
    delAsync: async (key: string) => {
        return await redisClient.del(key);
    }
};



