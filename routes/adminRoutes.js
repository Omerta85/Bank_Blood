const express = require('express')
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {getDonorsListController, getHospitalListController, getOrgListController, deleteDonorController} = require("../controllers/adminController");

//router object
const router = express.Router()
//ROUTES

//GET|| DONOR LIST
router.get('/donor-list',authMiddleware, adminMiddleware, getDonorsListController)

//GET|| Hospital LIST
router.get('/hospital-list',authMiddleware, adminMiddleware, getHospitalListController)

//GET|| ORG LIST
router.get('/org-list',authMiddleware, adminMiddleware, getOrgListController)

//Delete Donor ||get
route.delete('/delete-donor/:id',authMiddleware, adminMiddleware, deleteDonorController())

//EXPORT
module.exports = router;