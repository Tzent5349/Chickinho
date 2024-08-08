"use server"
import connectToDatabase from "@/lib/database/index";
import Schedule from "@/lib/database/models/schedule.model";
import { createScheduleParams } from "@/types";
import Store from "../models/store.model";
import Department from "../models/department.model";


/* export const createSchedule = async ({ schedule }: createScheduleParams) => {
    try {
        await connectToDatabase();
        const newSchedule = await Schedule.create(schedule)
        return JSON.parse(JSON.stringify(newSchedule));

    } catch (error) {
        console.log(error);
    }
} */

/* export const createSchedule = async ({ schedule }: createScheduleParams) => {
    try {
        await connectToDatabase();

        // Create new schedule
        const newSchedule = await Schedule.create(schedule);

        // Update the store with the new department and schedule
        await Store.findByIdAndUpdate(
            schedule.storeName,
            {
                $addToSet: {
                    "workDepartments.$[elem].schedule": newSchedule._id
                }
            },
            {
                arrayFilters: [{ "elem.name": schedule.department }],
                new: true
            }
        );

                  // Update the department with the new schedule
                  await Department.findByIdAndUpdate(
                    schedule.department,
                    {
                      $addToSet: {
                        schedule: newSchedule._id
                      }
                    },
                    { new: true }
                  );

        return JSON.parse(JSON.stringify(newSchedule));
    } catch (error) {
        console.log(error);
    }
}; */


/* export const createSchedule = async ({ schedule }: createScheduleParams) => {
    try {
        await connectToDatabase();

        // Create new schedule
        const newSchedule = await Schedule.create(schedule);

        // Find the store and check if the department already exists
        const store = await Store.findById(schedule.storeName);

        if (!store) throw new Error("Store not found");

        const departmentIndex = store.workDepartments?.findIndex(
            (dept:any) => dept.name.toString() === schedule.department
        );

        if (departmentIndex !== -1 && departmentIndex !== undefined) {
            // If the department exists, add the new schedule ID to the schedule array
            store.workDepartments[departmentIndex].schedule.push(newSchedule._id);
        } else {
            // If the department doesn't exist, add a new department with the schedule ID
            store.workDepartments.push({
                name: schedule.department,
                schedule: [newSchedule._id]
            });
        }

        // Save the updated store
        await store.save();

        return JSON.parse(JSON.stringify(newSchedule));
    } catch (error) {
        console.log(error);
    }
};
 */

export const createSchedule = async ({ schedule }: createScheduleParams) => {
    try {
        await connectToDatabase();

        // Check for an existing schedule for the same store, department, and weekNumber
        const existingSchedule = await Schedule.findOne({
            storeName: schedule.storeName,
            department: schedule.department,
            weekNumber: schedule.weekNumber,
        });

        if (existingSchedule) {
            throw new Error("A schedule for this week, store, and department already exists.");
        }

        // Create new schedule
        const newSchedule = await Schedule.create(schedule);

        // Update the store with the new department and schedule
        await Store.findByIdAndUpdate(
            schedule.storeName,
            {
                $addToSet: {
                    "workDepartments.$[elem].schedule": newSchedule._id
                },
                $setOnInsert: {
                    "workDepartments.$[elem]": { name: schedule.department, schedule: [newSchedule._id] }
                }
            },
            {
                arrayFilters: [{ "elem.name": schedule.department }],
                new: true,
                upsert: true
            }
        );

        return JSON.parse(JSON.stringify(newSchedule));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            if (error.message.includes("E11000")) {
                throw new Error("A schedule for this week, store, and department already exists.");
            } else {
                throw new Error("An error occurred while creating the schedule.");
            }
        } else {
            console.log("An unexpected error occurred", error);
            throw new Error("An unexpected error occurred.");
        }
    }
};
export const getAllSchedule = async () => {
    try {
        await connectToDatabase();
        const allSchedule = await Schedule.find();
        return JSON.parse(JSON.stringify(allSchedule));
    } catch (error) {
        console.log(error);
    }
}

export const getScheduleById = async (scheduleId: string) => {
    try {
        await connectToDatabase()
        if (!scheduleId) throw new Error("Schedule Id not found");
        const schedule = await Schedule.findById(scheduleId)
        return JSON.parse(JSON.stringify(schedule));
    } catch (error) {
        console.log(error);
    }
}

export const getAllStoresWithDepartments = async () => {
    try {
        await connectToDatabase();
        const stores = await Store.find().populate("workDepartments.name");
        return JSON.parse(JSON.stringify(stores));
    } catch (error) {
        console.log(error);
    }
};

export const getScheduleByStoreAndDepartment = async (storeId: string, departmentId: string) => {
    try {
        await connectToDatabase();
        const schedule = await Schedule.find({ storeName: storeId, department: departmentId });
        return JSON.parse(JSON.stringify(schedule));
    } catch (error) {
        console.log(error);
    }
};