"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const router = express_1.default.Router();
const userRouter = new controllers_1.userController();
router.route('/registration').post(userRouter.creatUser);
router.route('/findall').get(userRouter.findAll);
router.route('/login').get(userRouter.login);
router.route('/delete').delete(userRouter.delete);
router.route('/update').put(userRouter.update);
exports.default = router;
