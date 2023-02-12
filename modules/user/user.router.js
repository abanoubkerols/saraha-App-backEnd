import { Router } from 'express'
import { userModel } from '../../DB/model/user.model.js'
import * as userController from './controller/user.js'
import { auth } from '../../middelwear/auth.js'
const router = Router()




router.get("/", auth(), userController.userProfile)
router.get("/:id",  userController.getShareProfile)


export default router