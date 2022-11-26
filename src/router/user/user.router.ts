import express, { Router } from 'express'
import { userController } from '../../controllers'
const router:Router = express.Router()

const userRouter:userController = new userController()

router.route('/registration').post(userRouter.creatUser)
router.route('/findall').get(userRouter.findAll)
router.route('/login').get(userRouter.login);
router.route('/delete').delete(userRouter.delete);
router.route('/update').put(userRouter.update);


export default router