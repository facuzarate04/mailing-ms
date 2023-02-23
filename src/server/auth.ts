import { Request } from "express";
import { redis as sessionCache } from "@/redis/redis";
import config from "@/server/config";

interface IUser {
    id: string;
    name: string;
    login: string;
    permissions: string[];
}
  
interface ISession {
    token: string;
    user: IUser;
}

export interface IUserSessionRequest extends Request {
    user: ISession;
}

export async function validateToken(auth: string): Promise<ISession>  {

    /* Search session on cache */
    const cachedSession = await sessionCache.getAsync(auth);
    if (cachedSession) {
      return Promise.resolve({ 
        token: auth,
        user: (cachedSession as any) as IUser
      });
    }

    /* Search session on external microservice */
    const response = await fetch(config.authCurrentUserUrl, {
      method: 'GET',
      headers: { "Authorization": auth }
    });

    if (response.status === 200) {
      const user = await response.json();
      await sessionCache.setAsync(auth, JSON.stringify(user));
      return Promise.resolve({
        token: auth,
        user
      });
    }else {
      return Promise.reject();
    }
}