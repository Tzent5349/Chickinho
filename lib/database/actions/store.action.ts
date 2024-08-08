"use server"
import connectToDatabase from "@/lib/database/index";
import { createStoreParams } from "@/types";
import { Store, Schedule, Shift } from "@/lib/database/models";



export const createStore = async ({ store }: createStoreParams) => {
    try {
        await connectToDatabase();
        const newStore = await Store.create(store)
        return JSON.parse(JSON.stringify(newStore));

    } catch (error) {
        console.log(error);
    }
}

export const getAllStore = async () => {
    try {
        await connectToDatabase();
        const allStore = await Store.find();
        return JSON.parse(JSON.stringify(allStore));
    } catch (error) {
        console.log(error);
    }
}

export const getStoreById = async (storeId: string) => {
    try {
        await connectToDatabase();
        if (!storeId) throw new Error(`Store ${storeId} not found`);
        const store = await Store.findById(storeId);
        return JSON.parse(JSON.stringify(store));
    } catch (error) {
        console.log(error);
    }
}

/* export const getAllStoresWithDepartments = async () => {
    try {
        await connectToDatabase();
        const stores = await Store.find().populate("workDepartments.name");
        return JSON.parse(JSON.stringify(stores));
    } catch (error) {
        console.log(error);
    }
}; */

export const getAllStoresWithDepartments = async () => {
    try {
        await connectToDatabase();
        const stores = await Store.find().populate({
            path: 'workDepartments.name',
            model: 'Department'
        });
        return JSON.parse(JSON.stringify(stores));
    } catch (error) {
        console.log(error);
    }
};

/* export const getScheduleByStoreAndDepartment = async (storeId: string, departmentId: string) => {
    try {
        await connectToDatabase();
        const schedules = await Schedule.find({ storeName: storeId, department: departmentId });
        return JSON.parse(JSON.stringify(schedules));
    } catch (error) {
        console.log(error);
    }
}; */

export const getScheduleByStoreAndDepartment = async (storeId: string, departmentId: string) => {
    try {
        await connectToDatabase();
        const schedules = await Schedule.find({ storeName: storeId, department: departmentId })
          .populate("storeName", "name")
          .populate("department", "name")
          .populate("work.shifts.userId", "name")
          .populate("work.shifts.shiftId", "startTime endTime break totalWorkingHours");
        return JSON.parse(JSON.stringify(schedules));
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to propagate it further
    }
};