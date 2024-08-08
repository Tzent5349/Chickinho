import {Schema, model, models,Document} from "mongoose"

export interface IDepartment extends Document{
    _id:string;
    name:string;
}

const DepartmentSchema = new Schema ({
    name:{
        type: String,
        required: true,
    }
})

const Department = models.Department|| model("Department", DepartmentSchema);
export default Department;

