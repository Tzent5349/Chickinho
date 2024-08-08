import { models, model, Document, Schema } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    role: 'employee' | 'admin' | 'manager' | 'sub-manager';
    branch: string;
    password: string;
    department: string;
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    role: {
        type: String, required: true, enum: ['employee', 'admin', 'manager', 'sub-manager'], default: "employee"
    },
    password: {
        type: String,
        required: true,
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "stores"
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "departments"
    },
    totalNumberOfHoursWorkedThisWeek: {
        type: Number,
    },
    totalNumberOfHoursWorkedThisMonth: {
        type: Number,
    },
    totalNumberOfHoursWorkedThisYear: {
        type: Number,
    },
    workSchedule: [{
        type: Schema.Types.ObjectId,
        ref: "schedules"
    }]
})

const User = models.User || model("User", UserSchema);
export default User