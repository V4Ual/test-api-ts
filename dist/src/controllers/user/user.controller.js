"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const User = models_1.default.User;
class userController {
    constructor() {
        this.creatUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, date_of_birth, conform_password, password, version, model, } = req.body;
            if (password == conform_password) {
                const user = yield User.create({
                    firstName,
                    lastName,
                    email,
                    password,
                    date_of_birth,
                    version,
                    model,
                });
                return res.status(200).json(user);
            }
            else {
                return res.status(500).send("internal server error");
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findAll();
            return res.status(200).json(user);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const user = yield User.findOne({ where: { email: email } });
                if (password == user.dataValues.password) {
                    const id = user.dataValues.id;
                    const secret = process.env.SECRET;
                    const token = jsonwebtoken_1.default.sign({ email, password, id }, secret);
                    (0, express_validator_1.cookie)('jwt', token);
                    res.status(200).send({ token: token });
                }
                else {
                    res.status(401).send("unauthorized ");
                }
            }
            catch (error) {
                res.send('some thing is wrong');
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cookie = req.body.token;
                const decode = jsonwebtoken_1.default.decode(cookie);
                User.destroy({ where: { id: decode.id } });
                return res.status(200).send("delete data");
            }
            catch (error) {
                return res.status(404).send("unauthorized ");
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cookie = req.body.token;
                const decode = jsonwebtoken_1.default.decode(cookie);
                if (decode.seccess = 'true') {
                    const data = yield User.update(req.body, { where: { id: decode.id } });
                    return res.status(200).send(data);
                }
            }
            catch (error) {
                return res.status(404).send("unauthorized ");
            }
        });
    }
}
exports.default = userController;
