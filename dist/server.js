"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const router_1 = __importDefault(require("./src/router"));
const models_1 = __importDefault(require("./src/models"));
const app = (0, express_1.default)();
const indexRoute = router_1.default;
dotenv_1.default.config();
app.use(express_1.default.static('public'));
app.use((0, express_2.json)());
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use('/api/v1', indexRoute);
models_1.default.sequelize.sync({ logging: false }).then(() => console.log('sync'));
const port = process.env.PORT || 3000;
const server = app.listen(port, "0.0.0.0", () => {
    console.log(`RUN SERVER ${port}`);
});
