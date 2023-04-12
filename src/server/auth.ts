import { Request } from "express";
import { redis as sessionCache } from "@/redis/redis";
import config from "@/server/config";
import axios from "axios";

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
    const response = await axios.get(`${config.authCurrentUserUrl}`, {
      headers: {
        Accept: "application/json",
      }
    });

    if (response.status === 200) {
      const user = await response.data;
      await sessionCache.setAsync(auth, JSON.stringify(user));
      return Promise.resolve({
        token: auth,
        user
      });
    }else {
      return Promise.reject();
    }
}