"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mainRouter = require('./routes/routes');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: '1000mb' }));
app.use('/api/v1', mainRouter);
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
module.exports = app;
