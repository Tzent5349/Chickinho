import { models, model, Document, Schema } from "mongoose";

export interface IStore extends Document {
    _id: string;
    name: string;
    address: string;
    manager: {name:string; role:string;}[];
    workDepartments?:{name:string; schedule?:string;}[]

}
const StoreSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    managers: [{
        name: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        role: {
            type: String
        }
    }],

    workDepartments: [{
        name: {
            type: Schema.Types.ObjectId, ref: "departments",
        },
        schedule: [{
            type: Schema.Types.ObjectId, ref: "schedules"
        }],
    }]
})

const Store = models.Store || model("Store", StoreSchema);
export default Store;