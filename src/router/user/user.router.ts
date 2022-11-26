import express, { Router } from 'express'
import { userController } from '../../controllers'
const router:Router = express.Router()

const userRouter:userController = new userController()

router.route('/registration').post(userRouter.creatUser)
router.route('/findall').get(userRouter.findAll)
router.route('/login').get(userRouter.login);


export default router