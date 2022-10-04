import { model, Schema } from 'mongoose';

export interface DatabaseInterface {
    webhook: string;
    message: string;
    origin_id: string;
    destination_id: string;
}


export type DatabaseType = 'database';


/* Mongoose Schema */

const DatabaseSchema = new Schema({
    webhook: String,
    message: String,
    origin_id: String,
    destination_id: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

export const Database = model<DatabaseInterface>('Web', DatabaseSchema);