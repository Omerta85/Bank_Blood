import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const registerController = async(req,res) => {
    try {
        const exisitingUser = await userModel.findOne({email:req.body.email})
        //validation
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:'Користувач уже існує'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword
        //rest data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: "Користувач успішно зареєстрований",
            user,
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Register API',
            error
        })
    }
};

//login call back
const  loginController = async (req,res) => {
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Користувача не знайдено'
            })
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message: 'Невірний пароль'
            })
        }
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
        return res.status(200).send({
            success:true,
            message:"Логанізація успішна",
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error IN Login API',
            error
        })
    }
};

export { registerController, loginController };
