import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true,'Обов\'язково вкажіть тип'],
        enum:['вхід', 'вихід']
    },
    bloodGroup:{
        type:String,
        required:[true,'Обов\'язково вкажіть групу крові'],
        enum:['I(0+)', 'I(0-)', 'IV(AB+)', 'IV(AB-)', 'II(A+)', 'II(A-)', 'III(B+)','III(B-)']
    },
    quantity:{
        type:Number,
        required:[true,'Обов\'язково вкажіть кількість крові'],
    },
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true, 'Обов\'язково вкажіть організацію']
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: function (){
            return this.inventoryType === "вихід";
        }
    },
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: function () {
            return this.inventoryType === "вхід";
        },
    },
},
    { timestamps: true }
)

const inventoryModel = mongoose.model('Inventory', inventorySchema);

export default inventoryModel;