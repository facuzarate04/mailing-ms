"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("@/server/config"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("@/server/routes"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api/v1', routes_1.default);
/* Mongoose connect */
mongoose_1.default.connect(config_1.default.db, {}, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Connected to database: ${config_1.default.db}`);
    }
});
/* Start server */
app.listen(config_1.default.port, () => {
    console.log(`Server listening on port ${config_1.default.port}`);
});
