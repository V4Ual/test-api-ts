import express, { Router } from 'express'
import { userController } from '../../controllers'
const router:Router = express.Router()

const userRouter:userController = new userController()

router.route('/registration').post(userRouter.creatUser)
router.route('/findall').post(userRouter.findAll)
router.route('/login').post(userRouter.login);
router.route('/delete').post(userRouter.delete);
router.route('/update').post(userRouter.update);


export default router