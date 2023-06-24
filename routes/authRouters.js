import express from 'express';
import {registerController, loginController, currentUserController} from "../controllers/authController.js";
import authMiddelware from "../middlewares/authMiddelware.js";

const router = express.Router()

//routes
//REGISTER || POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

//GET CURRENT USER || GET
router.get('/current-user', authMiddelware, currentUserController)

export default router;