import express from 'express';
import authMiddelware from "../middlewares/authMiddelware.js";
import {
    createInventoryController,
    getDonorsController,
    getHospitalController,
    getInventoryController, getOrganizationController, getOrganizationForHospitalController
} from "../controllers/inventoryController.js";

const router = express.Router();

//routes
//ADD INVENTORY || POST
router.post('/create-inventory', authMiddelware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get('/get-inventory', authMiddelware, getInventoryController);

//GET Donor RECORDS
router.get('/get-donors', authMiddelware, getDonorsController)

//GET HOSPITAL RECORDS
router.get('/get-hospital', authMiddelware, getHospitalController)

//GET OrganizationPage RECORDS
router.get('/get-organization', authMiddelware, getOrganizationController)

//GET OrganizationPage RECORDS
router.get('/get-organization-for-hospital', authMiddelware, getOrganizationForHospitalController)

export default router;
