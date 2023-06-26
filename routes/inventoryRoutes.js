import express from 'express';
import authMiddelware from "../middlewares/authMiddelware.js";
import {createInventoryController, getInventoryController} from "../controllers/inventoryController.js";

const router = express.Router();

//routes
//ADD INVENTORY || POST
router.post('/create-inventory', authMiddelware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get('/get-inventory', authMiddelware, getInventoryController)

export default router;
