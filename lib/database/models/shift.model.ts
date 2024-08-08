import { models, model, Document, Schema } from "mongoose";

export interface IShift extends Document {
    _id:string;
    name:string;
    startTime:Date;
    endTime:Date;
    break?:number;
    totalWorkingHours?:number;
}

const ShiftSchema = new Schema({
    name: {
        type:String,
    },
    startTime:{
        type: Date,
        required: true,
    },
    endTime:{
        type: Date,
        required: true,
    },
    break:{
        type:Number,
        required: true,
    },
    totalWorkingHours:{
        type:Number,
    }
})



const Shift = models.Shift || model("Shift", ShiftSchema);

export default Shift;