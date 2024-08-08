// models/schedule.model.ts
import { models, model, Document, Schema } from "mongoose";

export interface ISchedule extends Document {
    _id: string;
    storeName: string;
    weekNumber: number;
    department: string;
    work: {
        day: string;
        shifts: {
            userId: string;
            shiftId: string;
        }[];
    }[];
}

const ScheduleSchema = new Schema({
    storeName: {
        type: Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    weekNumber: {
        type: Number,
        required: true,
    },
    work: [{
        day: {
            type: String,
            required: true,
        },
        shifts: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            shiftId: {
                type: Schema.Types.ObjectId,
                ref: "Shift",
            }
        }]
    }]
});

// Add a unique index to ensure the combination of storeName, department, and weekNumber is unique
ScheduleSchema.index({ storeName: 1, department: 1, weekNumber: 1 }, { unique: true });

const Schedule = models.Schedule || model("Schedule", ScheduleSchema);
export default Schedule;
