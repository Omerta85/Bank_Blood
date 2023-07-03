const mongoose = require("mongoose");

const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");





//CREATE Inventory
const createInventoryController = async(req, res) => {
    try{
        const { email } = req.body
        //validation
        const user = await userModel.findOne({ email })
        if(!user){return res.status(500).send({
            success: false,
            message: 'Користувача не знайдено',
        });}
        // if (inventoryType === "вхід" && user.role !== 'donor'){throw new Error('Не має акаунта донора')}
        //if (inventoryType === "вихід" && user.role !== 'hospital'){throw new Error('Не має акаунта лікарні')}

        if(req.body.inventoryType === 'вихід'){
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organization = new mongoose.Schema.Types.ObjectId(req.body.userId)
            //calculate Blood Quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match:{
                    organization,
                        inventoryType:'вхід',
                        bloodGroup: requestedBloodGroup
                    }},{
                $group:{
                  _id:'$bloodGroup',
                  total:{$sum : '$quantity'}
                }
                }
            ])
            //console.log("Total In",totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;

            //calculate OUT Blood Quantity
            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: "вихід",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

            //in&OUT calculate
            const availableQuantityOfBloodGroup = totalIn - totalOut;
            //quantity validation
            if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
                })
            }
            req.body.hospital = user?._id;
        } else {
            req.body.donar = user?._id;
        }

        //save record
        const inventory = new inventoryModel(req.body)
        await inventory.save();
        return res.status(201).send({
            success:true,
            message:'Новий запис крові додано'
        })
    }catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Помилка в API створення інвентарю",
            error
        })
    }
};

//GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find({
            organization: req.body.userId
        })
            .populate('donor')
            .populate('hospital').
            sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            message: "Усі записи успішно отримано",
            inventory
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Помилка при отриманні всього інвентарю',
            error
        });
    }
};
//GET Hospital BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find(req.body.filters)
            .populate('donor')
            .populate('hospital')
            .populate('organization')
            .sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            message: "Усі записи успішно отримано",
            inventory
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Помилка при отриманні всього інвентарю',
            error
        });
    }
};
//GET DONOR RECORDS
const getDonorsController = async (req,res) => {
    try {
        const organization = req.body.userId;
        //find donors
        const donorId = await inventoryModel.distinct("donor", {
            organization,
        });
        //console.log(donorId)
        const donors = await userModel.find({_id: {$in: donorId} })

        return res.status(200).send({
            success:true,
            message:'Donor Record Fetched Successfully',
          donors,
        })
    }catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in Donor records',
            error
        })
    }
};

const getHospitalController = async (req,res) => {
    try{
        const organization = req.body.userId
        //Get Hospital ID
        const hospitalId = await inventoryModel.distinct("hospital", {organization,});
        //find Hospital
        const hospital = await userModel.find({
            _id: { $in: hospitalId},
        })
        return res.status(200).send({
            success: true,
            message: "Hospitals Data Fetched Successfully",
            hospital,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: 'Error In get Hospital API',
            error
        })
    }

};

// GET ORG
const getOrganizationController =  async (req,res) => {
    try{
        const donor = req.body.userId
        const orgId = await inventoryModel.distinct('organization', {donor})
        //find org
        const organization = await userModel.find({
            _id:{$in: orgId}
        })
        return res.status(200).send({
            success: true,
            message:"ORG DATA FETCHED Successfully",
            organization,
        })
    }catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message:'Error In ORG API',
            error
        })
    }
};

// GET ORG for Hospital
const getOrganizationForHospitalController =  async (req,res) => {
    try{
        const hospital = req.body.userId
        const orgId = await inventoryModel.distinct('organization', {hospital});
        //find org
        const organizations = await userModel.find({
            _id:{$in: orgId}
        })
        return res.status(200).send({
            success: true,
            message:"Hospital ORG DATA FETCHED Successfully",
            organizations,
        })
    }catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message:'Error In Hospital ORG API',
            error
        })
    }
};

module.exports =  {
    createInventoryController,
    getInventoryController,
    getDonorsController,
    getHospitalController,
    getOrganizationController,
    getOrganizationForHospitalController,
    getInventoryHospitalController
};
