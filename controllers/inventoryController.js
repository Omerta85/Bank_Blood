import mongoose from 'mongoose';

import userModel from "../models/userModel.js";
import inventoryModel from "../models/inventoryModel.js";



//CREATE Inventory
const createInventoryController = async(req, res) => {
    try{
        const {email, inventoryType} = req.body
        //validation
        const user = await userModel.findOne({ email })
        if(!user){throw new Error('Користувача не знайдено')}
        if (inventoryType === "вхід" && user.role !== 'donor'){throw new Error('Не має акаунта донора')}
        if (inventoryType === "вихід" && user.role !== 'hospital'){throw new Error('Не має акаунта лікарні')}
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
        const inventory = await inventoryModel.find({
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
}

export { createInventoryController, getInventoryController };
