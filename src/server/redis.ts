import { createClient } from 'redis';
import config from '@/server/config';

interface IRedis {
    getAsync: (key: string) => Promise<string | null>;
    setAsync: (key: string, value: string) => Promise<string | null>;
    delAsync: (key: string) => Promise<number>;
}

const client = createClient({ url: config.db_redis_uri });
client.on('error', (err) => {
    console.log('Error ' + err);
});

export const redis: IRedis = {
    getAsync: async (key: string) => {
        return await client.get(key);
    },
    setAsync: async (key: string, value: string) => {
        return await client.set(key, value);
    },
    delAsync: async (key: string) => {
        return await client.del(key);
    }
};


