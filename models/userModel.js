const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[],

    }
})