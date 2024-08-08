"use server";
import connectToDatabase from "@/lib/database/index";
import Shift from "@/lib/database/models/shift.model";
import { calculateTotalWorkingHours } from "@/lib/utils";
import { createShiftParams } from "@/types";

export const createShift = async ({ shift }: createShiftParams) => {
    try {
        await connectToDatabase();

        // Ensure break is defined, provide a default value if undefined
        const breakMinutes = shift.break ?? 0;

        // Calculate total working hours
        const totalWorkingMinutes = calculateTotalWorkingHours(shift.startTime, shift.endTime, breakMinutes);

        const newShift = await Shift.create({
            ...shift,
            break: breakMinutes,
            totalWorkingHours: totalWorkingMinutes
        });

        return JSON.parse(JSON.stringify(newShift));

    } catch (error) {
        console.log(error);
    }
};

export const getAllShift = async () => {
    try {
        await connectToDatabase();
        const allShifts = await Shift.find();
        return JSON.parse(JSON.stringify(allShifts));
    } catch (error) {
        console.log(error);
    }
};

/* // Utility function to calculate total working hours
const calculateTotalWorkingHours = (startTime: Date, endTime: Date, breakMinutes: number): number => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const totalMinutes = (end - start) / (1000 * 60);  // total minutes worked
    const totalWorkingMinutes = totalMinutes - breakMinutes;  // subtract break time
    return totalWorkingMinutes;
}; */

/*  */
const getShiftById = async (shiftId: string) => {
    try {
        await connectToDatabase();
        if (!shiftId) throw new Error(`Invalid shiftId: ${shiftId}`);
        const shift = await Shift.findById(shiftId);
        return JSON.parse(JSON.stringify(shift));

    } catch (error) {
        console.error(error);
    }
}