import { Router } from 'express'
import * as authController from './controller/auth.js'
const router = Router()



router.get("/", (req, res) => {
    res.json({ message: "Auth module" })
})


router.post("/signup", authController.signup)

router.get("/confirmEmail/:token", authController.confirmEmail)

router.post("/signin", authController.signin)



export default router