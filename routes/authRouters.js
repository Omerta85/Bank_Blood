import express from 'express';
import registerController from "../controllers/authController.js";

const router = express.Router()

//routes
router.post('/register', registerController)

export default router;