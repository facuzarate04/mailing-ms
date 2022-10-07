export interface IConnectionSMTP {
    from: string;
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    }
}