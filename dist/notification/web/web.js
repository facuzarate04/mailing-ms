"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web = void 0;
const mongoose_1 = require("mongoose");
/* Mongoose Schema */
const WebSchema = new mongoose_1.Schema({
    webhook: String,
    message: String,
    origin_id: String,
    destination_id: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.Web = (0, mongoose_1.model)('Web', WebSchema);
